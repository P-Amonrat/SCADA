import { useEffect, useState, useMemo } from "react"
import { useHistory } from "react-router-dom"
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  FormGroup,
  Row,
  Col,
  Input,
  Form,
  Button,
  Label,
  CustomInput
} from 'reactstrap'
import { Spin } from 'antd'
import * as XLSX from "xlsx"
import DataTable from 'react-data-table-component'
import { ChevronDown } from 'react-feather'
import { viewCheckGMDRReport } from '../constants/tableData'
import { ViewCheckGMDRColumn } from '../TableColumn'
import { notifySuccess, notifyFailed } from "@src/views/components/toasts/notifyTopCenter"
import "../report-styling.scss"
import FilterComponent from "../ProfileManual/FilterComponent"

const CheckReportTable = () => {
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const [reportData, setReportData] = useState()
  const [headerData, setHeaderData] = useState()

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

  useEffect(() => {
    try {
      if (history?.location?.state) {
        console.log("History", history.location.state)
        setHeaderData(history.location.state)
        // ** Call api Submit Report
        // axios.post('/get/report', req)
        //   .then(res => (
        //     console.log(res)
        //      setData(data)
        setReportData(viewCheckGMDRReport)
      //**Call api Get report List */
      // axios.post('/get/viewCheck/report', req)
      // .then(res => {
      //   console.log(res)
      // })
      setLoading(false)
      notifySuccess('Success!, Get report successfully')
      }
    } catch (err) {
      console.log(err)
    }
  }, [])

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
    popupConfirm('Do you want to export this report?', async (type) => {
      if (type === "confirm") {
        try {
          setLoading(true)
          const date = new Date()
          const getDate = formatDate(date)
          const worksheet = XLSX.utils.json_to_sheet(data)
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

  return (
    <Card>
      <Row >
        <Col sm={12}>
          <FormGroup className='d-flex mb-0 mt-2 ml-2' style={{ justifyContent: 'start', alignItems: 'center' }}>
            <Button.Ripple
              className='mr-2'
              color='primary'
              onClick={onExportReport}
              disabled={!reportData}
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
              columns={ViewCheckGMDRColumn}
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