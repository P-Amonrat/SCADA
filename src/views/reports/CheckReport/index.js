import { useState } from 'react'
import { useHistory } from "react-router-dom"
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  FormGroup,
  Row,
  Col,
  Form,
  Button,
  Label,
  CustomInput
} from 'reactstrap'
import PickerDateTime from '../../forms/form-elements/datepicker/PickerDateTime'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import { Spin } from 'antd'
import DataTable from 'react-data-table-component'
import { ChevronDown } from 'react-feather'
import { viewCheckGMDRReport } from '../constants/tableData'
import { ViewCheckGMDRColumn } from '../TableColumn'
import moment from 'moment'
import { popupConfirm } from "@src/views/components/sweetalert"
import { notifySuccess, notifyFailed } from "@src/views/components/toasts/notifyTopCenter"
import * as XLSX from "xlsx"
import Flatpickr from 'react-flatpickr'

const VerticalForm = () => {
  const history = useHistory()
  const [type, setType] = useState(1)
  const [dateTime, setDateTime] = useState()

  const onSearchReport = () => {
    try {
      const req = {
        type,
        dateTime: moment(dateTime).format("YYYY/MM/DD HH:mm")
      }
      console.log(req)

      history.push({
        pathname: "/report/check-report-gmdr/table",
        state: req
      })

    } catch (err) {
      console.log(err)
    }
  }

  const optionsStartDate = {
    maxDate: new Date()
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle tag='h4'>PLHSSVR1N View Check GMDR</CardTitle>
        </CardHeader>

        <CardBody className="pr-3 pl-3">
          <Form>
            <Row style={{ justifyContent: 'center' }}>
              <Col>
                <FormGroup>
                  <Row>
                    <Col xl='4' md='4' sm='4'>
                      <Label>GMDR Type</Label>
                      <div className='demo-inline-spacing' style={{ marginBottom: "15px" }}>
                        <CustomInput
                          type='radio'
                          id='exampleCustomRadio'
                          name='customRadio'
                          inline
                          label='Daily GMDR'
                          value='1'
                          onClick={() => setType(1)}
                          defaultChecked
                        />
                      </div>
                    </Col>
                    <Col xl='4' md='4' sm='4'>
                      <Label></Label>
                      <div className='demo-inline-spacing' >
                        <CustomInput
                          type='radio'
                          id='exampleCustomRadio2'
                          name='customRadio'
                          inline
                          label='Hourly GMDR'
                          value='2'
                          onClick={() => setType(2)}
                        />
                      </div>
                    </Col>
                    <Col xl='4' md='4' sm='4'>
                      <Label className="mb-1" >Datetime</Label>
                      {/* <PickerDateTime setDate={setDateTime} date={dateTime} /> */}
                      <Flatpickr
                        // value={reqData.dateTime}
                        data-enable-time
                        id='date-time-picker'
                        className='form-control'
                        defaultValue={moment(new Date()).startOf('day').format("YYYY-MM-DD HH:mm")}
                        options={optionsStartDate}
                        onChange={(value) => setDateTime(value[0])}
                      />
                    </Col>

                  </Row>
                </FormGroup>
              </Col>
            </Row>

            <Row style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Col sm='10' style={{ justifyContent: 'center', alignItems: 'center' }}>
                <FormGroup className='d-flex mb-0 mt-2' style={{ justifyContent: 'center', alignItems: 'center' }} >
                  <Button.Ripple
                    className='mr-1'
                    color='primary'
                    onClick={onSearchReport}
                  >
                    Submit
                  </Button.Ripple>
                  <Button.Ripple
                    outline
                    color='secondary'
                    type='reset'
                    onClick={() => { setType(1); setDateTime(new Date()) }}
                  >
                    Reset
                  </Button.Ripple>
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </>
  )
}
export default VerticalForm
