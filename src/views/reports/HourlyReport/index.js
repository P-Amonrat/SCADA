import { useState, useEffect } from 'react'
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
import { selectThemeColors } from '@utils'
import Select from 'react-select'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import axios from 'axios'
import Flatpickr from 'react-flatpickr'
import moment from 'moment'
import { popupConfirm } from "@src/views/components/sweetalert"
import { notifySuccess, notifyFailed } from "@src/views/components/toasts/notifyTopCenter"
import { viewDailyGMDRReport } from '../constants/tableData'
import { ViewDailyGMDRColumn } from '../TableColumn'
import { RTUChonbutiDropdawn, RTUGSPDropdawn, FlowCompChonDropdown, FlowCompGSPDropdown, TagNameDropdown } from '../constants/Dropdawn'

const rtuRegionOptions = [
  { value: 1, label: 'Chonburi' },
  { value: 2, label: 'GSP' }
]

const initialState = {
  rtu: "",
  flowComp: "",
  compareAllType: false
}

const VerticalForm = () => {
  const history = useHistory()
  const [reqData, setReqData] = useState(initialState)
  const [data, setData] = useState()
  const [rtuDropdown, setRtuDropdawn] = useState([])
  const [rtuRegions, setRtuRegions] = useState(rtuRegionOptions[0])
  const [flowCompDropdown, setFlowCompDropdown] = useState([])
  const [tagNameDropdown, setTagNameDropdown] = useState([])
  const [loading, setLoading] = useState(false)
  const [fromDate, setFromDate] = useState(moment(new Date()).startOf('day').format("YYYY-MM-DD HH:mm"))
  const [toDate, setToDate] = useState(moment(new Date()).endOf('day').format("YYYY-MM-DD HH:mm"))
  
  const onSelectRTU = (value) => {
    try {
      //** Call api get RTU Region detail (default chonburi) */
      // axios.get('get/region')
      //   .then(res => {
      //     console.log(res)
      //   })
      if (value) {
        setReqData(initialState)
        if (value.value === 1) {
          setRtuDropdawn(RTUChonbutiDropdawn)
          setFlowCompDropdown(FlowCompChonDropdown)
        } else {
          setRtuDropdawn(RTUGSPDropdawn)
          setFlowCompDropdown(FlowCompGSPDropdown)
        }
      } else {
        setRtuDropdawn(RTUChonbutiDropdawn)
        setFlowCompDropdown(FlowCompChonDropdown)
        // setTagNameDropdown(TagNameDropdown)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const onSearchReport = () => {
    //**Call api get Report */
    try {
      const req = {
        region: rtuRegions,
        rtu: reqData.rtu,
        flowComp: reqData.flowComp,
        compareAllType: reqData.compareAllType,
        from: moment(fromDate).format("YYYY/MM/DD HH:mm"),
        to: moment(toDate).format("YYYY/MM/DD HH:mm")
      }

      history.push({
        pathname: "/report/hourly-report-gmdr/table",
        state: req
      })
    } catch (err) {
      console.log(err)
      setLoading(false)
      notifyFailed('Failed!, Get report failed')
    }
  }

  useEffect(() => {
    try {
      onSelectRTU()
      //** Call api get Head RTU Region */
      // axios.get('get/region')
      //   .then(res => {
      //     console.log(res)
      //   })

    } catch (err) {
      console.log(err)
    }
  }, [])

  const optionsStartDate = {
    maxDate: new Date()
  }

  const optionsEndDate = {
    minDate: moment(fromDate).format("YYYY/MM/DD HH:mm"),
    maxDate: moment(fromDate).add(1, 'months').endOf('day').format("YYYY/MM/DD HH:mm")
  }
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle tag='h4'>PLHSSVR1N View Hourly GMDR</CardTitle>
        </CardHeader>

        <CardBody>
          <Form>
            <Row>
              <Col sm='4'>
                <FormGroup>
                  <Label>RTU Region</Label>
                  <Select
                    theme={selectThemeColors}
                    className='react-select'
                    classNamePrefix='select'
                    options={rtuRegionOptions}
                    isClearable={false}
                    isSearchable={true}
                    onChange={(value) => { onSelectRTU(value); setRtuRegions(value) }}
                    value={rtuRegions}
                  />
                </FormGroup>
              </Col>

            </Row>

            <Row style={{ justifyContent: 'center' }}>

              <Col sm='4'>
                <FormGroup>
                  <Label>RTU Name</Label>
                  <Select
                    theme={selectThemeColors}
                    className='react-select'
                    classNamePrefix='select'
                    placeholder={rtuRegions.value === 1 ? '---RTU Chonburi---' : '---RTU GSP---'}
                    options={[
                      {
                        label: rtuRegions.value === 1 ? '---RTU Chonburi---' : '---RTU GSP---',
                        options: rtuDropdown
                      }
                    ]}
                    isClearable={false}
                    isSearchable={true}
                    onChange={(value) => setReqData({ ...reqData, rtu: value })}
                    value={reqData.rtu}
                  />

                </FormGroup>
              </Col>

              <Col sm='4'>
                <FormGroup>
                  <Label>Flow Comp</Label>
                  <Select
                    theme={selectThemeColors}
                    className='react-select'
                    classNamePrefix='select'
                    placeholder={'---Flow Comp---'}
                    options={flowCompDropdown}
                    isClearable={false}
                    isSearchable={true}
                    isDisabled={reqData.compareAllType}
                    onChange={(value) => setReqData({ ...reqData, flowComp: value })}
                    value={reqData.flowComp}
                  />

                </FormGroup>
              </Col>

              <Col sm='4'>
                <FormGroup style={{ height: '50%' }}>
                  <Label>Compare all flowcomp</Label>
                  <div style={{ display: 'flex', alignItems: 'center', height: '100%', position: "relative", zIndex: 0 }}>
                    <CustomInput
                      type='checkbox'
                      id='exampleCustomCheckbox'
                      label='Checked'
                      checked={reqData.compareAllType}
                      onChange={(e) => setReqData({ ...reqData, compareAllType: e.target.checked })}
                    /> 
                  </div>
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col sm='4'>
                <FormGroup>
                  <Label>From</Label>
                  <Flatpickr
                    // value={reqData.dateTimeFrom}
                    data-enable-time
                    id='date-time-picker'
                    className='form-control'
                    defaultValue={moment(new Date()).startOf('day').format("YYYY-MM-DD HH:mm")}
                    options={optionsStartDate}
                    onChange={(value) => setFromDate(value[0])}
                  />
                </FormGroup>
              </Col>

              <Col sm='4'>
                <FormGroup>
                  <Label>To</Label>
                  <Flatpickr
                    // value={reqData.dateTimeTo}
                    data-enable-time
                    id='date-time-picker'
                    className='form-control'
                    defaultValue={moment(new Date()).endOf('day').format("YYYY-MM-DD HH:mm")}
                    options={optionsEndDate}
                    onChange={(value) => setToDate(value[0])}
                  />
                </FormGroup>
              </Col>
            </Row>

            <Row style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Col sm='10' style={{ justifyContent: 'center', alignItems: 'center' }}>
                <FormGroup className='d-flex mb-0 mt-2' style={{ justifyContent: 'center', alignItems: 'center' }} >
                  <Button.Ripple
                    className='mr-1'
                    color='primary'
                    disabled={!reqData.rtu || !reqData.flowComp}
                    onClick={onSearchReport}
                  >
                    Submit
                  </Button.Ripple>
                  <Button.Ripple
                    outline
                    color='secondary'
                    type='reset'
                    onClick={() => { setReqData(initialState); setRtuRegions(rtuRegionOptions[0]) }}
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
