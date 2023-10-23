import '@styles/react/libs/flatpickr/flatpickr.scss'
import moment from 'moment'
import { useState } from 'react'
import Flatpickr from 'react-flatpickr'
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  CustomInput,
  Form,
  FormGroup,
  Label,
  Row
} from 'reactstrap'
import Select from 'react-select'
import { selectThemeColors } from '@utils'

const statusOptions = [
  { value: 0, label: "Default" },
  { value: 1, label: "Success" },
  { value: 2, label: "Fail" }
]

const VerticalForm = () => {
  const [type, setType] = useState(1)
  const [dateTime, setDateTime] = useState()
  const [filterStatus, setFilterStatus] = useState()

  const onSearchReport = () => {
    try {
      const req = {
        type: type === 1 ? "daily_gmdr" : "hourly_gmdr",
        dateTime: moment(dateTime).format("YYYY/MM/DD HH:mm"),
        status : filterStatus.label
      }

      const queryParams = new URLSearchParams(req).toString()
      const url = `/report/check-report-gmdr/table?${queryParams}`
      window.open(url, '_blank')

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
                    <Col xl='3' md='3' sm='3'>
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
                    <Col xl='3' md='3' sm='3'>
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
                    <Col xl='3' md='3' sm='3'>
                      <Label className="mb-1" >Status</Label>
                      <Select
                        theme={selectThemeColors}
                        className='react-select'
                        classNamePrefix='select'
                        placeholder="Select status"
                        options={statusOptions}
                        onChange={(value) => setFilterStatus(value)}
                      />
                    </Col>
                    <Col xl='3' md='3' sm='3'>
                      <Label className="mb-1" >Datetime</Label>
                      <Flatpickr
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
                    disabled={!filterStatus}
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
