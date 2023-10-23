import { popupConfirm } from "@src/views/components/sweetalert"
import { notifyFailed, notifySuccess } from "@src/views/components/toasts/notifyTopCenter"
import { Spin } from 'antd'
import queryString from 'query-string'
import { useEffect, useMemo, useState } from "react"
import DataTable from 'react-data-table-component'
import { ChevronDown } from 'react-feather'
import {
  Button,
  Card,
  CardBody,
  Col,
  FormGroup,
  Row
} from 'reactstrap'
import * as XLSX from "xlsx"
import FilterComponent from "../ProfileManual/FilterComponent"
import "../report-styling.scss"
import ReportService from "../service"

const CheckReportTable = () => {
  const [loading, setLoading] = useState(false)
  const [reportData, setReportData] = useState([])
  const [columnsTable, setColumnTable] = useState()
  const [filterText, setFilterText] = useState("")
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false)

  const filteredItems = reportData?.filter(
    item => JSON.stringify(item).toLowerCase().indexOf(filterText.toLowerCase()) !== -1
  )

  const subHeaderComponent = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle)
        setFilterText("")
      }
    }

    return (
      <FilterComponent
        onFilter={e => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    )
  }, [filterText, resetPaginationToggle])

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

    reportData.forEach((item) => {
      Object.keys(item).forEach((key) => {
        const columnItem = columnsTable.find((col) => col.selector === key)
        if (columnItem) {
          item[columnItem.name] = item[key]
          delete item[key]
        }
      })
    })

    popupConfirm('Do you want to export this report?', async (type) => {
      if (type === "confirm") {
        try {
          setLoading(true)
          const date = new Date()
          const getDate = formatDate(date)
          const worksheet = XLSX.utils.json_to_sheet(reportData)
          const workbook = XLSX.utils.book_new()
          XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')

          await XLSX.writeFile(workbook, `PLHSSVR1N_View_Check_GMDR_Report${getDate}.xlsx`)
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


  useEffect(async () => {
    try {
      setLoading(true)
      const data = queryString.parse(location.search)
      const status = data.status
      if (data) {
        const req = {
          type: data.type,
          from_date: data.dateTime,
          from_hour: data.dateTime
        }

        //**Call api Get report List */
        const response = await ReportService.getCheckGmdrReport(req)
        if (response?.message === "ok") {

          let filterStatus
          if (status !== "Default") {
            filterStatus = response?.data?.table?.data
              .filter((item) => item.c3 === status)
          } else {
            filterStatus = response?.data?.table?.data
              .map((item) => item)
          }

          const checkStatus = filterStatus.map((item) => ({
            c0: item.c0,
            c1: item.c1,
            c2: item.c2,
            c3: (
              <div style={{ color: item.c3 === "Fail" ? "red" : "green" }}>
                {item.c3}
              </div>
            )
          }))

          setColumnTable(response.data.table.title)
          setReportData(checkStatus)
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
  }, [])

  return (
    <Card>
      <Row >
        <Col sm={12}>
          <FormGroup className='d-flex mb-0 mt-2 ml-2' style={{ justifyContent: 'start', alignItems: 'center' }}>
            <Button.Ripple
              className='mr-2'
              color='primary'
              onClick={onExportReport}
              disabled={reportData.length === 0}
            >
              Export
            </Button.Ripple>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col sm={12}>
          <Spin spinning={loading}>
            <DataTable
              noHeader
              pagination
              data={filteredItems}
              columns={columnsTable}
              defaultSortField="name"
              striped
              subHeader
              subHeaderComponent={subHeaderComponent}
              className='react-dataTable'
              sortIcon={<ChevronDown size={10} />}
              paginationRowsPerPageOptions={[10, 25, 50, 100]}
            />
          </Spin>
        </Col>
      </Row>
      <CardBody>
      </CardBody>
    </Card>
  )
}

export default CheckReportTable