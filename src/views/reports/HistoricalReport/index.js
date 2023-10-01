import { notifyFailed } from "@src/views/components/toasts/notifyTopCenter"
import '@styles/react/libs/flatpickr/flatpickr.scss'
import { selectThemeColors } from '@utils'
import { Spin } from 'antd'
import moment from 'moment'
import { useEffect, useState } from 'react'
import Flatpickr from 'react-flatpickr'
import { useHistory } from "react-router-dom"
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
import ProfileService from '../../profiles/Service'
import ProfileManual from '../ProfileManual/ProfileManual'
import { TypeOptions, achiveOptions } from '../constants/data'
import "../report-styling.scss"

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
  const [loading, setLoading] = useState(false)
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [addedProfile, setAddedProfile] = useState([])
  const [fromDate, setFromDate] = useState(moment(new Date()).startOf('day').format("YYYY-MM-DD HH:mm"))
  const [toDate, setToDate] = useState(moment(new Date()).endOf('day').format("YYYY-MM-DD HH:mm"))

  const fetchData = async () => {
    try {
      //** Call api get Profile name Dropdown */
      const response = await ProfileService.getProfileByUser()
      const obj = await response.data.map((item) => {
        return {
          value: item.profile_id,
          label: item.profile_name
        }
      })
      await setProfileOptions(obj)
    } catch (error) {
      console.error('Error fetching data:', error)
      notifyFailed('Failed!, Get profile list failed')
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // const optionsStartDate = {
  //   maxDate: new Date()
  // }

  // const optionsEndDate = {
  //   minDate: moment(fromDate).format("YYYY/MM/DD HH:mm"),
  //   maxDate: moment(fromDate).add(1, 'months').endOf('day').format("YYYY/MM/DD HH:mm")
  // }

  const onSubmitData = () => {
    try {
      const req = {
        profileName: reqData.profileName.label,
        tagName: addedProfile.filter(list => list.tag).length === 0 ? addedProfile.map(item => item).join(',') : addedProfile.map(list => list.tag).join(','),
        type: reqData.type.value,
        compareAllType: reqData.compareAllType,
        achiveType: reqData.achiveType.value,
        from: moment(fromDate).format("YYYY/MM/DD HH:mm"),
        to: moment(toDate).format("YYYY/MM/DD HH:mm")
      }

      const queryParams = new URLSearchParams(req).toString()      
      const url = `/report/historical-report-gmdr/table?${queryParams}`
      window.open(url, '_blank')

    } catch (err) {
      console.log(err)
      notifyFailed('Failed!, Get report failed')
    }
  }

  const onResetData = () => {
    setReqData(initialState)
    setAddedProfile([])
  }

  const onChangeProfileName = async (value) => {
    setReqData({ ...reqData, profileName: value })
    setAddedProfile([])
    setLoading(true)
    if (value.value !== 0) {
      try {
        const response = await ProfileService.getProfileByProfileId(value.value)
        if (response.message === "ok") {
          const profileConfig = await response.data.profile_config.slice(1, -1).split(',')
          setAddedProfile(profileConfig)
        }
      } catch (err) {
        console.log(err)
        notifyFailed('Failed!, Get tag failed')
      }
    }
    setLoading(false)
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
                <Col>
                  <FormGroup>
                    <Label>Profile Name</Label>
                    <Select
                      theme={selectThemeColors}
                      className='react-select'
                      classNamePrefix='select'
                      options={profileOptions ? [
                        { value: 0, label: "Manual" },
                        ...profileOptions.map((list) => ({ value: list.value, label: list.label }))
                      ] : []}
                      isClearable={false}
                      isSearchable={true}
                      onChange={(value) => onChangeProfileName(value)}
                      value={reqData.profileName}
                    >
                    </Select>
                    <Spin spinning={loading}>
                      {reqData.profileName.value === 0 ? (
                        <div className='profile-card'>
                          {addedProfile.map((list, index) => <div key={index}><p>- {list.tag}</p></div>)}
                        </div>
                      ) : (
                        <div className='profile-card'>
                          {addedProfile.map((list, index) => <div key={index}><p>- {list}</p></div>)}
                        </div>
                      )}
                    </Spin>

                    <Button
                      className='mt-1'
                      color='primary'
                      onClick={() => { setIsOpenModal(true); setAddedProfile([]) }}
                      disabled={reqData.profileName.value !== 0}
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
                      />
                    </div>
                  </FormGroup>
                </Col>
                {/* </Row> */}
              </div>


              <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
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
                    <Label for='date-time-picker'></Label>
                    <Flatpickr
                      // value={reqData.dateTimeFrom}
                      data-enable-time
                      id='date-time-picker'
                      className='form-control'
                      defaultValue={moment(new Date()).startOf('day').format("YYYY-MM-DD HH:mm")}
                      // options={optionsStartDate}
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
                      // options={optionsEndDate}
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
                  {/* <Link
                    to={{
                      pathname: "/report/historical-report-gmdr/table",
                      state: {
                        fromNotifications: true,
                      }
                    }}
                    target="_blank"
                    rel="noopener noreferrer"
                  > */}
                    <Button.Ripple
                      className='mr-1'
                      color='primary'
                      disabled={!(reqData.profileName.value === 0 && addedProfile.length > 0) && !reqData.profileName.value}
                      onClick={onSubmitData}
                    >
                      Submit
                    </Button.Ripple>
                  {/* </Link> */}
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
