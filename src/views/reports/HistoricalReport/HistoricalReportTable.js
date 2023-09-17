import { useEffect, useState } from "react"
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
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'
import { Modal, Spin } from 'antd'
import { data, basicColumns } from '../../tables/data-tables/data'
import * as XLSX from "xlsx"
import { popupConfirm } from "@src/views/components/sweetalert"
import { notifySuccess, notifyFailed } from "@src/views/components/toasts/notifyTopCenter"
import "../report-styling.scss"
import { useRowSelect } from '@table-library/react-table-library/select'

const HistoricalReportTable = () => {
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const [reportData, setReportData] = useState()
  const [headerData, setHeaderData] = useState()

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
        setReportData(data)
        setLoading(false)
        //   ))
        // notifySuccess('Success!, Get report successfully')
      }
    } catch (err) {
      console.log(err)
    }
  }, [history])

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

  const [selectedColumns, setSelectedColumns] = useState(basicColumns.map((col) => col.selector))
  const handleColumnToggle = (columnId) => {
    if (selectedColumns.includes(columnId)) {
      setSelectedColumns(selectedColumns.filter((col) => col !== columnId));
    } else {
      setSelectedColumns([...selectedColumns, columnId]);
    }
  }
  const filteredColumns = basicColumns.filter((col) => selectedColumns.includes(col.selector))

  return (
    <Card>
      <div className="header-report-table">
        {/* <Col> */}
        <p>Profile name: <b>{headerData?.profileName.label}</b></p>
        <p>Tag name: {headerData?.tagName.map((list) => <b key={list.id}>{list.tagName}, </b>)}</p>
        <p>Archiving type: <b>{headerData?.achiveType.label}</b></p>
        <p>Type value: <b>{headerData?.type.label}</b></p>
        <p>Start date: <b>{headerData?.from}</b></p>
        <p>Finish date: <b>{headerData?.to}</b></p>
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
      {/* <Row> */}
        {/* <Col sm={12}> */}
          {/* <TableAdvSearch/> */}
          <Spin spinning={loading}>
            {/* <DataTable
              noHeader
              pagination
              selectableRows
              // selectableRowsHighlight
              // selectableRowsNoSelectAll
              selectableRowsHeader
              data={reportData}
              columns={basicColumns}
              className='react-dataTable'
              sortIcon={<ChevronDown size={10} />}
              paginationRowsPerPageOptions={[10, 25, 50, 100]}
            /> */}

            <table style={{width: "100%"}}>
              <thead>
                <tr>
                  <div className="table">
                    {basicColumns.map((column) => (
                      <div key={column.selector} className="column-table">
                        <input type="checkbox" class="column-selector" data-column="0" />
                        <th>
                          {column.name}
                        </th>
                      </div>
                    ))}
                  </div>
                </tr>
              </thead>
              <tbody>
                <tr>

                </tr>
              </tbody>
            </table>

          </Spin>
        {/* </Col> */}
      {/* </Row> */}
      <CardBody>
      </CardBody>
    </Card>
  )
}

export default HistoricalReportTable