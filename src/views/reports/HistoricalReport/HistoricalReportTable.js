import { popupConfirm } from "@src/views/components/sweetalert"
import { notifyFailed, notifySuccess } from "@src/views/components/toasts/notifyTopCenter"
import { Checkbox, Spin } from 'antd'
import queryString from 'query-string'
import { useEffect, useState } from "react"
import DataTable from 'react-data-table-component'
import { ChevronDown } from 'react-feather'
import { useLocation } from "react-router-dom"
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
import ReportService from '../service'

const HistoricalReportTable = () => {
  const location = useLocation()
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
        return selectCheck.some(arrItem => arrItem.id === key && arrItem.check)
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
          newObj[matchingDataItem.name.replace(/<\/?b>/g, '').replace(/<br>/g, ':')] = item[key]
        }
      }
      return newObj
    })

    popupConfirm('Do you want to export this report?', async (type) => {
      if (type === "confirm") {
        try {
          setLoading(true)
          const date = new Date()
          const getDate = formatDate(date)
          const worksheet = XLSX.utils.json_to_sheet(convertedList)
          const workbook = XLSX.utils.book_new()
          XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')

          await XLSX.writeFile(workbook, `PLHSSVR1N_Data_Historical_Report${getDate}.xlsx`)
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

  const onCheckExport = (check, value) => {
    const arr = [{ id: value, check }]

    const indexToRemove = selectCheck.findIndex(item => item.id === value)

    if (indexToRemove !== -1) {
      selectCheck.splice(indexToRemove, 1) //at position of indexToRemove, remove 1 item
    }
    setSelectCheck(current => [...current, ...arr])
  }

  const columns = columnsTable?.map((item) => {
    if (item.name !== 'Datetime') {
      return {
        name: (
          <>
            <Checkbox
              checked={selectCheck.find(items => items.id === item.selector)?.check}
              onChange={(e) => onCheckExport(e.target.checked, item.selector)}
            >
              {item.name.replace(/<\/?b>/g, '').split('<br>').map((text, index) => (
                <div key={index} className="column-name">
                  {text}
                  {index !== item.name.split('<br>').length - 1 && <br />}
                </div>
              ))}
            </Checkbox>
          </>
        ),
        selector: item.selector,
        sorttable: item.sorttable,
        maxWidth: item.maxWidth
      }
    } else {
      return {
        name: (
          <>
            <div style={{ fontSize: "14px" }}>
              {item.name}
            </div>
          </>
        ),
        selector: item.selector,
        sorttable: item.sorttable,
        maxWidth: item.maxWidth
      }
    }
  })

  useEffect(async () => {
    try {
      setLoading(true)
      const data = queryString.parse(location.search)
      if (data) {
        const req = {
          pf: data.profileName,
          pf_name: `{${data.tagName}}`,
          type_m: "1",
          type_mnemo: data.type, // type type     
          freq_mnemo: Number(data.achiveType), // archrive type     
          from_date: data.from,
          to_date: data.to,
          compare_box: JSON.parse(data.compareAllType)
        }

        // ** Call api Submit Report
        const response = await ReportService.getHistoricalReport(req)
        if (response?.message === "ok") {
          setColumnTable(response.data.table.header)
          setReportData(response.data.table.data)
          setHeaderData(response.data.title)
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
    }
  }, [])

  const customStyles = {
    rows: {
      style: {
        minHeight: '72px' // override the row height
      }
    },
    headCells: {
      style: {
        paddingLeft: '8px', // override the cell padding for head cells
        paddingRight: '8px',
        display: "flex",
        justifyContent: "center"
      }
    },
    cells: {
      style: {
        paddingLeft: '8px', // override the cell padding for data cells
        paddingRight: '8px',
        display: "flex",
        justifyContent: "center"
      }
    }
  }

  return (
    <Card>
      <div className="header-report-table">
        <p>Profile name: <b>{headerData?.profile}</b></p>
        <p>Tag name: <b>{headerData?.tagName}</b></p>
        <p>Archiving type: <b>{headerData?.archiveType}</b></p>
        <p>Type value: <b>{headerData?.typeValue}</b></p>
        <p>Start date: <b>{headerData?.startDate}</b></p>
        <p>Finish date: <b>{headerData?.endDate}</b></p>
      </div>
      <Row >
        <Col sm={12}>
          <FormGroup className='d-flex mb-0 mt-2' style={{ justifyContent: 'end', alignItems: 'center' }}>
            <Button.Ripple
              className='mr-2'
              color='primary'
              onClick={onExportReport}
            >
              Export
            </Button.Ripple>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col sm={12}>
          {/* <TableAdvSearch /> */}
          <Spin spinning={loading}>
            <DataTable
              noHeader
              // pagination
              customStyles={customStyles}
              fixedHeader={true}
              fixedHeaderScrollHeight="800px"
              data={reportData}
              columns={columns}
              className='react-dataTable'
              sortIcon={<ChevronDown size={10} />}
            // paginationRowsPerPageOptions={[10, 25, 50, 100]}
            // selectableRows // Enable row selection
            // onSelectedRowsChange={({ selectedRows }) => setSelectedRows(selectedRows.map(row => row.selector))}
            />
          </Spin>
        </Col>
      </Row>
      <CardBody>
      </CardBody>
    </Card>
  )
}

export default HistoricalReportTable