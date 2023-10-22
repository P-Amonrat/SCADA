import { popupConfirm } from "@src/views/components/sweetalert"
import { notifyFailed, notifySuccess } from "@src/views/components/toasts/notifyTopCenter"
import { Checkbox, Spin } from 'antd'
import { useEffect, useState } from "react"
import DataTable from 'react-data-table-component'
import { ChevronDown } from 'react-feather'
import { useHistory } from "react-router-dom"
import {
  Button,
  Card,
  CardBody,
  Col,
  FormGroup,
  Row
} from 'reactstrap'
import * as XLSX from "xlsx"
import "../report-styling.scss"
import ReportService from "../service"
import queryString from 'query-string'

const HourlyReportTable = () => {
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const [reportData, setReportData] = useState()
  const [headerData, setHeaderData] = useState()
  const [selectCheck, setSelectCheck] = useState([])
  const [columnsTable, setColumnTable] = useState()

  const formatDate = (date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    const seconds = String(date.getSeconds()).padStart(2, '0')

    return `${year}${month}${day}${hours}${minutes}${seconds}`
  }

  const onExportReport = () => {
    const result = reportData.map(item => {
      const matchingKeys = Object.keys(item).filter(key => {
        return selectCheck.length > 0 ? !selectCheck.some(arrItem => arrItem.id === key && arrItem.check === false) : reportData
      })

      matchingKeys.unshift('datetime')
      const keyValues = {}

      matchingKeys.forEach(key => {
        keyValues[key] = item[key]
      })

      return keyValues
    })

    const convertedList = result.map(item => {
      const newObj = {}
      for (const key in item) {
        const matchingDataItem = columnsTable.find(dataItem => dataItem.selector === key)
        if (matchingDataItem) {
          newObj[matchingDataItem.name.replace(/<\/?b>/g, '')] = item[key]
        }
      }
      return newObj
    })

    popupConfirm('Do you want to export this report?', async (type) => {
      if (type === "confirm") {
        setLoading(true)
        try {
          const date = new Date()
          const getDate = formatDate(date)
          
          const worksheet = XLSX.utils.json_to_sheet(convertedList, {origin: 'A8'})

          const headerRow1 = ['REGION:', `${headerData.region.toUpperCase()}`]
          const headerRow2 = ['RTU NAME:', `${headerData.rtuName}`]
          const headerRow3 = ['FLOWCOMP NAME: ', `${headerData.flowcompName}`]
          const headerRow4 = ['TYPE:', `${headerData.type}`]
          const headerRow5 = ['START DATE:', `${headerData.startDate}`]
          const headerRow6 = ['FINISH DATE:', `${headerData.endDate}`]

          XLSX.utils.sheet_add_aoa(worksheet, [headerRow1], { origin: 'A1' })
          XLSX.utils.sheet_add_aoa(worksheet, [headerRow2], { origin: 'A2' })
          XLSX.utils.sheet_add_aoa(worksheet, [headerRow3], { origin: 'A3' })
          XLSX.utils.sheet_add_aoa(worksheet, [headerRow4], { origin: 'A4' })
          XLSX.utils.sheet_add_aoa(worksheet, [headerRow5], { origin: 'A5' })
          XLSX.utils.sheet_add_aoa(worksheet, [headerRow6], { origin: 'A6' })

          const workbook = XLSX.utils.book_new()
          XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')

          await XLSX.writeFile(workbook, `PLHSSVR1N_View_Daily_GMDR_Report${getDate}.xlsx`)
          await setLoading(false)
          await notifySuccess('Success!, Export report successfully')
        } catch (err) {
          console.log(err)
          setLoading(false)
          notifyFailed('Failed!, Export report failed')
        }
      }
    }, 'warning')
  }

  const onCheckExport = async (check, value) => {
    const arr = [{ id: value, check }]

    const indexToRemove = selectCheck.findIndex(item => item.id === value)

    if (indexToRemove !== -1) {
      selectCheck.splice(indexToRemove, 1) //at position of indexToRemove, remove 1 item
    }
    await setSelectCheck(current => [...current, ...arr])
  }

  const colums = columnsTable?.map((item) => {
    if (item.name !== 'Datetime') {
      return {
        name: (
          <>
            <Checkbox
              checked={selectCheck.find(items => items.id === item.selector)?.check}
              defaultChecked
              onChange={(e) => onCheckExport(e.target.checked, item.selector)}
            >
              {item.name.replace(/<\/?b>/g, '')}
            </Checkbox>
          </>
        ),
        selector: item.selector,
        sorttable: item.sorttable,
        maxWidth: item.maxWidth
      }
    } else {
      return item
    }
  })

  useEffect(async() => {
    try {
      setLoading(true)
      const data = queryString.parse(location.search)
      if (data) {
        const req = {
          rtuRadio: data.region,
          typeRtu: data.rtu,
          compare: JSON.parse(data.compareAllType), // case false ผ่านแล้ว
          flowcomm: data.flowComp ? data.flowComp : "",
          from: data.from.split(' ')[0],
          to: data.to.split(' ')[0]
        }

        // ** Call api Submit Report
        const response = await ReportService.getHourlyReport(req)
        if (response?.message === "ok") {
          setHeaderData(response.data.title)
          setColumnTable(response.data.table.header)
          const resData = response?.data?.table?.data

          const res = ['MIN', 'AVG', 'MAX'].map(item => {
            const newObj = { datetime: item }
            Array.from({ length: Object.keys(resData[0]).length - 1 }, (o, i) => {
              const key = Object.keys(resData[0])[i + 1]
              const value = resData?.map(x => {
                const rawValue = x[key]
                // Check if rawValue is a string before replacing commas
                const parsedValue = typeof rawValue === 'string' ? parseFloat(rawValue.replace(',', ''), 10) : rawValue
                return parsedValue
              })
              if (item === 'MIN') {
                newObj[key] = Math.min(...value).toFixed(4)
              } else if (item === 'MAX') {
                newObj[key] = Math.max(...value).toFixed(4)
              } else {
                const sum = value.reduce((acc, currentValue) => acc + currentValue, 0)
                const average = sum / value.length
                newObj[key] = average.toFixed(4)
              }
            })
            resData.push(newObj)
          })

          setReportData(response.data.table.data)
          setLoading(false)
          notifySuccess('Success!, Get report successfully')
        }

        if (response.status === 500) {
          notifyFailed("An error occurred. Please try again.")
          setLoading(false)
        }
      }
    } catch (err) {
      console.log(err)
      notifyFailed("An error occurred. Please try again.")
    }
  }, [history.location.state])

  return (
    <Card>
      <div className="header-report-table">
        <p>REGION: <b>{headerData?.region.toUpperCase()}</b></p>
        <p>RTU NAME: <b>{headerData?.rtuName}</b></p>
        <p>FLOWCOMP NAME: <b>{headerData?.flowcompName}</b></p>
        <p>TYPE: <b>{headerData?.type}</b></p>
        <p>START DATE: <b>{headerData?.startDate}</b></p>
        <p>FINISH DATE: <b>{headerData?.endDate}</b></p>
      </div>
      <Row >
        <Col sm={12}>
          <FormGroup className='d-flex mb-0 mt-2' style={{ justifyContent: 'end', alignItems: 'center' }}>
            <Button.Ripple className='mr-2' color='primary' onClick={onExportReport}>Export</Button.Ripple>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col sm={12}>
          <Spin spinning={loading}>
            <DataTable
              noHeader
              // pagination
              data={reportData}
              columns={colums}
              className='react-dataTable'
              sortIcon={<ChevronDown size={10} />}
              // paginationRowsPerPageOptions={[10, 25, 50, 100]}
            />
          </Spin>
        </Col>
      </Row>
      <CardBody>
      </CardBody>
    </Card>
  )
}

export default HourlyReportTable