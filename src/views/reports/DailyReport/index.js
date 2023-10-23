import { notifyFailed } from "@src/views/components/toasts/notifyTopCenter"
import '@styles/react/libs/flatpickr/flatpickr.scss'
import { selectThemeColors } from '@utils'
import moment from 'moment'
import { useEffect, useState } from 'react'
import Flatpickr from 'react-flatpickr'
import Select from 'react-select'
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
import ReportService from '../service'

const rtuRegionOptions = [
  { value: 1, label: 'CHONBURI' },
  { value: 2, label: 'GSP' }
]

const initialState = {
  rtu: "",
  flowComp: "",
  compareAllType: false
}

const VerticalForm = () => {
  const [reqData, setReqData] = useState(initialState)
  const [rtuDropdown, setRtuDropdawn] = useState([])
  const [rtuRegions, setRtuRegions] = useState(rtuRegionOptions[0])
  const [flowCompDropdown, setFlowCompDropdown] = useState([])
  const [loading, setLoading] = useState(false)
  const [fromDate, setFromDate] = useState()
  const [toDate, setToDate] = useState()

  const onSelectRTU = async (value) => {
    try {
      //** Call api get RTU Region detail (default chonburi) */
      const responseRtu = await ReportService.getRtuNameByRegion(value.value)
      const objRtu = responseRtu.data.map((item, index) => {
        return {
          value: index,
          label: item.rtu
        }
      })
      setReqData(initialState)
      setRtuDropdawn(objRtu)
    } catch (err) {
      console.log(err)
      notifyFailed('Failed!, Get RTU failed')
    }
  }

  const onChangeRtuName = async (value) => {
    setReqData({ ...reqData, rtu: value })
    try {
      const responseFlowCamp = await ReportService.getFlowCampByRegion(value.label)
      const objFlowCamp = responseFlowCamp.data.map((item, index) => {
        return {
          value: index,
          label: item.name
        }
      })
      setFlowCompDropdown(objFlowCamp)
    } catch (err) {
      console.log(err)
      notifyFailed('Failed!, Get Flow Comp failed')
    }
  }

  const onSearchReport = () => {
    //**Call api get Report */
    try {
      const req = {
        region: rtuRegions.label.toLowerCase(),
        rtu: reqData.rtu.label,
        flowComp: reqData.flowComp.label,
        compareAllType: reqData.compareAllType,
        from: moment(fromDate).format("DD/MM/YYYY"),
        to: moment(toDate).format("DD/MM/YYYY")
      }

      const queryParams = new URLSearchParams(req).toString()
      const url = `/report/daily-report-gmdr/table?${queryParams}`
      window.open(url, '_blank')

    } catch (err) {
      console.log(err)
      setLoading(false)
      notifyFailed('Failed!, Get report failed')
    }
  }

  useEffect(() => {
    try {
      onSelectRTU({ value: 1, label: "CHONBURI" })
    } catch (err) {
      console.log(err)
    }
  }, [])

  const onChangeCompare = (checked) => {
    setReqData((prevState) => ({
      ...prevState,
      compareAllType: checked,
      flowComp: checked ? "" : prevState.flowComp
    }))
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle tag='h4'>PLHSSVR1N View Daily GMDR</CardTitle>
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
                    placeholder={rtuRegions.value === 1 ? '---RTU CHONBURI---' : '---RTU GSP---'}
                    options={[
                      {
                        label: rtuRegions.value === 1 ? '---RTU CHONBURI---' : '---RTU GSP---',
                        options: rtuDropdown
                      }
                    ]}
                    isClearable={false}
                    isSearchable={true}
                    onChange={(value) => onChangeRtuName(value)}
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
                    isDisabled={reqData.compareAllType}
                    isSearchable={true}
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
                      onChange={(e) => onChangeCompare(e.target.checked)}
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
                    data-enable-time
                    id='date-time-picker'
                    className='form-control'
                    defaultValue={moment(new Date()).startOf('day').format("YYYY-MM-DD HH:mm")}
                    options={{
                      dateFormat: "Y-m-d H:i",
                      maxDate: "today"
                    }}
                    onChange={(value) => setFromDate(value[0])}
                  />
                </FormGroup>
              </Col>

              <Col sm='4'>
                <FormGroup>
                  <Label>To</Label>
                  <Flatpickr
                    data-enable-time
                    id='date-time-picker'
                    className='form-control'
                    defaultValue={moment(new Date()).endOf('day').format("YYYY-MM-DD HH:mm")}
                    options={{
                      dateFormat: "Y-m-d H:i",
                      minDate: moment(new Date(fromDate)).format("YYYY-MM-DD HH:mm"),
                      maxDate: moment(new Date(fromDate)).add(1, 'months').format("YYYY-MM-DD HH:mm")
                    }}
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
                    disabled={!reqData.rtu || (!reqData.compareAllType && !reqData.flowComp)}
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
