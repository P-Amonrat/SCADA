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
import Select from 'react-select'
import { notifySuccess, notifyFailed } from "@src/views/components/toasts/notifyTopCenter"
// third party
import PickerDateTime from '../../forms/form-elements/datepicker/PickerDateTime'
import PickerDefault from '../../forms/form-elements/datepicker/PickerDefault'
import PickerTime from '../../forms/form-elements/datepicker/PickerTime'
import moment from 'moment'
import Flatpickr from 'react-flatpickr'
import * as XLSX from "xlsx"
import { popupConfirm } from "@src/views/components/sweetalert"
import { nameOptions, TypeOptions, achiveOptions } from '../constants/data'

// mockup data
import { data, basicColumns } from '../../tables/data-tables/data'

// css
import '@styles/react/libs/flatpickr/flatpickr.scss'
import "../report-styling.scss"

// utils
import { selectThemeColors } from '@utils'

// not use
import PickerHour from '../../forms/form-elements/datepicker/PickerHour'
import PickerMinute from '../../forms/form-elements/datepicker/PickerMinute'
import TableAdvSearch from '../../tables/data-tables/advance/TableAdvSearch'
import axios from 'axios'
import ProfileManual from '../ProfileManual/ProfileManual'

const dateFormat = "DD/MM/YYYY"

const initialState = {
  profileName: "",
  type: TypeOptions[0],
  compareAllType: false,
  achiveType: achiveOptions[0]
}

const VerticalForm = () => {
  const history = useHistory()
  const [reqData, setReqData] = useState(initialState)
  const [profileOptions, setProfileOptions] = useState()
  const [typeOptions, setTypeOptions] = useState()
  const [achiveTypeOptions, setAchiveTypeOptions] = useState()
  const [loading, setLoading] = useState(false)
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [addedProfile, setAddedProfile] = useState([])
  const [fromDate, setFromDate] = useState(moment(new Date()).startOf('day').format("YYYY-MM-DD HH:mm"))
  const [toDate, setToDate] = useState(moment(new Date()).endOf('day').format("YYYY-MM-DD HH:mm"))

  useEffect(async () => {
    try {
      //** Call api get Profile name Dropdown */
      // await axios.get('get/profileName/dropdown')
      //   .then(res => {
      //     console.log(res)
      // nameOptions.unshift(manual)
      setProfileOptions(nameOptions)
      // })
    } catch (error) {
      console.error('Error fetching data:', error)
      //   setLoading(false)
    }
  }, [])

  const optionsStartDate = {
    maxDate: new Date()
  }

  const optionsEndDate = {
    minDate: moment(fromDate).format("YYYY/MM/DD HH:mm"),
    maxDate: moment(fromDate).add(1, 'months').endOf('day').format("YYYY/MM/DD HH:mm")
  }

  const onSubmitData = () => {
    setLoading(true)
    try {
      const req = {
        profileName: reqData.profileName,
        tagName: addedProfile,
        type: reqData.type,
        compareAllType: reqData.compareAllType,
        achiveType: reqData.achiveType,
        from: moment(fromDate).format("YYYY/MM/DD HH:mm"),
        to: moment(toDate).format("YYYY/MM/DD HH:mm")
      }
      console.log(req)

      history.push({
        pathname: "/report/historical-report-gmdr/table",
        state: req
      })

    } catch (err) {
      console.log(err)
      setLoading(false)
      notifyFailed('Failed!, Get report failed')
    }
  }

  const onResetData = () => {
    setReqData(initialState)
    setAddedProfile([])
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle tag='h4'>PLHSSVR1N Data Historical Report</CardTitle>
        </CardHeader>

        <CardBody>
          <Form>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                {/* <Row style={{ justifyContent: 'center' }}> */}
                <Col>
                  <FormGroup>
                    <Label>Profile Name</Label>
                    <Select
                      theme={selectThemeColors}
                      className='react-select'
                      classNamePrefix='select'
                      options={profileOptions ? [
                        { value: "0", label: "Manual" },
                        ...profileOptions.map((list) => ({ value: list.value, label: list.label }))
                      ] : null}
                      isClearable={false}
                      isSearchable={true}
                      onChange={(value) => { setReqData({ ...reqData, profileName: value }); setAddedProfile([]) }}
                      // onChange={(value) => setAddedProfile(value)}
                      value={reqData.profileName}
                    >
                    </Select>
                    {addedProfile.length > 0 ? (
                      <div className='profile-card'>
                        {addedProfile.map((list, index) => <div key={index}><p>{list.tagName}</p></div>)}
                      </div>
                    ) : (
                      <div className='profile-card-empty'>
                        {reqData.profileName.value !== "0" ? <p>{reqData.profileName.label}</p> : null}
                      </div>
                    )}

                    <Button
                      className='mt-1'
                      color='primary'
                      onClick={() => { setIsOpenModal(true); setAddedProfile([]) }}
                    // disabled={addedProfile.value}
                    >
                      Manual
                    </Button>
                  </FormGroup>
                </Col>

                <Col>
                  <FormGroup style={{ height: '50%' }}>
                    <Label>Compare All Type</Label>
                    <div style={{ display: 'flex', alignItems: 'center', height: '100%', position: "relative", zIndex: 0 }}>
                      <CustomInput
                        type='checkbox'
                        id='exampleCustomCheckbox'
                        label='Checked'
                        onClick={(e) => setReqData({ ...reqData, compareAllType: e.target.checked })}
                      />  { /* defaultChecked */}
                    </div>
                  </FormGroup>
                </Col>
                {/* </Row> */}
              </div>


              <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                {/* <Row style={{ justifyContent: 'center' }}> */}
                <Col >
                  <FormGroup>
                    <Label>Type Value</Label>
                    <Select
                      theme={selectThemeColors}
                      className='react-select'
                      classNamePrefix='select'
                      // defaultValue={TypeOptions[0]}
                      options={TypeOptions}
                      isClearable={false}
                      isSearchable={true}
                      onChange={(value) => setReqData({ ...reqData, type: value })}
                      value={reqData.type}
                    />
                  </FormGroup>
                </Col>

                <Col>
                  <FormGroup>
                    <Label>Achive Type</Label>
                    <Select
                      theme={selectThemeColors}
                      className='react-select'
                      classNamePrefix='select'
                      // defaultValue={achiveOptions[0]}
                      options={achiveOptions}
                      isClearable={false}
                      isSearchable={true}
                      isDisabled={reqData.compareAllType}
                      onChange={(value) => setReqData({ ...reqData, achiveType: value })}
                      value={reqData.achiveType}
                    />
                  </FormGroup>
                </Col>

                <Col>
                  <FormGroup>
                    <Label>From</Label>
                    {/* <PickerDateTime setDate={setDateTimeFrom} date={dateTimeFrom} /> */}
                    <Label for='date-time-picker'></Label>
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

                <Col>
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
                {/* </Row> */}
              </div>
            </div>

            <Row style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Col sm='12' style={{ justifyContent: 'center', alignItems: 'center' }}>
                <FormGroup className='d-flex mb-0 mt-2' style={{ justifyContent: 'center', alignItems: 'center' }} >
                  <Button.Ripple
                    className='mr-1'
                    color='primary'
                    disabled={addedProfile.length === 0 && !reqData.profileName}
                    onClick={onSubmitData}
                  >
                    Submit
                  </Button.Ripple>
                  <Button.Ripple outline color='secondary' type='reset' onClick={onResetData}>
                    Reset
                  </Button.Ripple>
                </FormGroup>
              </Col>
            </Row>
          </Form>

          <ProfileManual
            isOpenModal={isOpenModal}
            setIsOpenModal={setIsOpenModal}
            addedProfile={addedProfile}
            setAddedProfile={setAddedProfile}
          />

        </CardBody>
      </Card>


    </>
  )
}
export default VerticalForm
