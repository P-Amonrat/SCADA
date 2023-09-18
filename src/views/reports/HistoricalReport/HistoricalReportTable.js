import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import {
  Card,
  CardBody,
  FormGroup,
  Row,
  Col,
  Button,
  CustomInput
} from 'reactstrap'
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'
import { Spin, Checkbox } from 'antd'
import { data } from '../../tables/data-tables/data'
import * as XLSX from "xlsx"
import { popupConfirm } from "@src/views/components/sweetalert"
import { notifySuccess, notifyFailed } from "@src/views/components/toasts/notifyTopCenter"
import "../report-styling.scss"

const HistoricalReportTable = () => {
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const [reportData, setReportData] = useState()
  const [headerData, setHeaderData] = useState()
  const [selectCheck, setSelectCheck] = useState([])

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
    const result = reportData.map(item => {
      const matchingKeys = Object.keys(item).filter(key => {
        return selectCheck.some(arrItem => arrItem.id === key && arrItem.check);
      });

      matchingKeys.unshift('datetime')
      const keyValues = {}

      matchingKeys.forEach(key => {
        keyValues[key] = item[key]
      })

      return keyValues
    })

    popupConfirm('Do you want to export this report?', async (type) => {
      if (type === "confirm") {
        try {
          setLoading(true)
          const date = new Date()
          const getDate = formatDate(date)
          const worksheet = XLSX.utils.json_to_sheet(result)
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

  const customStyles = {
    rows: {
      style: {
        minHeight: '72px', // override the row height
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

  const onCheckExport = (check, value) => {
    const arr = [{ id: value, check }]

    const indexToRemove = selectCheck.findIndex(item => item.id === value)

    if (indexToRemove !== -1) {
      selectCheck.splice(indexToRemove, 1) //at position of indexToRemove, remove 1 item
    }
    setSelectCheck(current => [...current, ...arr])
  }

  const columns = [
    {
      name:
        <div style={{fontSize: "14px"}}>
            Datetime
        </div>
      ,
      selector: "datetime",
      sortable: true,
      maxWidth: '500px'
    },
    {
      name:
        <>
          <Checkbox
            checked={selectCheck.find(item => item.id === "c1")?.check}
            onChange={(e) => onCheckExport(e.target.checked, "c1")}
          >
            NSA4000-SAT-BUF
          </Checkbox>
        </>
      ,
      selector: "c1",
      sortable: true,
      maxWidth: '500px'
    },
    {
      name:
        <>
          <Checkbox
            checked={selectCheck.find(item => item.id === "c2")?.check}
            onChange={(e) => onCheckExport(e.target.checked, "c2")}
          >
            NA4000-XT810591
          </Checkbox>
        </>
      ,
      selector: "c2",
      sortable: true,
      maxWidth: '500px'
    },
    {
      name:
        <>
          <Checkbox
            checked={selectCheck.find(item => item.id === "c3")?.check}
            onChange={(e) => onCheckExport(e.target.checked, "c3")}
          >
            SA4450-HG S-702
          </Checkbox>
        </>
      ,
      selector: "c3",
      sortable: true,
      maxWidth: '500px'
    },
    {
      name:
        <>
          <Checkbox
            checked={selectCheck.find(item => item.id === "c4")?.check}
            onChange={(e) => onCheckExport(e.target.checked, "c4")}
          >
            NSA4300-GHV-001
          </Checkbox>
        </>
      ,
      selector: "c4",
      sortable: true,
      maxWidth: '500px'
    }
  ]

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