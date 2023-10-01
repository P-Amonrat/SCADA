import { popupConfirm } from "@src/views/components/sweetalert"
import { notifyFailed, notifySuccess } from "@src/views/components/toasts/notifyTopCenter"
import { selectThemeColors } from '@utils'
import { Spin } from "antd"
import React, { useEffect, useState } from "react"
import Select from 'react-select'
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Form,
  FormGroup,
  Label,
  Row
} from "reactstrap"
import ProfileService from "../Service"
import "../profile-styling.scss"

const AuthorizeProfile = () => {

  const [profileNameOptions, setProfileNameOptions] = useState([])
  const [userNameOptions, setUserNameOptions] = useState([])
  const [loading, setLoading] = useState(false)
  const [profile, setProfile] = useState()
  const [userSelected, setUserSelected] = useState()
  const [profileSelected, setProfileSelected] = useState()
  const [loadingPage, setLoadingPage] = useState(false)

  const fechData = async () => {
    try {
      // **Call api get profile list
      const response = await ProfileService.getProfileByUser()
      const obj = response.data.map((item) => {
        return {
          value: item.profile_id,
          label: item.profile_name
        }
      })
      setProfileNameOptions(obj)

      const authenrResponse = await ProfileService.getUserForAuthen()
      const objUser = authenrResponse.data.map((item) => {
        return {
          value: item.user_id,
          label: item.user_name
        }
      })
      setUserNameOptions(objUser)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fechData()
  }, [])

  const onSelectProfileName = async (value) => {
    try {
      setProfileSelected(value)
      setLoading(true)
      const response = await ProfileService.getProfileByProfileId(value.value)
      if (response.message === "ok") {
        setProfile(response.data)
      } else {
        notifyFailed('Failed!, Get profile Failed')
      }
      setLoading(false)
    } catch (err) {
      console.log(err)
      notifyFailed('Failed!, Get profile Failed')
    }
  }

  const onCopy = async () => {
    popupConfirm('Do you want to copy this authorize profile?', async (type) => {
      if (type === "confirm") {
        setLoadingPage(true)
        try {
          const req = {
            type: "COPY",
            user: userSelected.value,
            pf_name: profile.profile_id
          }
          const response = await ProfileService.authenProfile(req)
          if (response.message === "ok") {
            notifySuccess('Success!, Copy authorize profile successfully')
          } else {
            notifyFailed('Failed!, Copy authorize profile Failed')
          }
          setProfile()
          setUserSelected("")
          setProfileSelected("")
          setLoadingPage(false)
        } catch (err) {
          console.log(err)
          setLoadingPage(false)
          notifyFailed('Failed!, Copy authorize profile Failed')
        }
      }
    }, 'warning')
  }

  const onMove = () => {
    popupConfirm('Do you want to move this authorize profile?', async (type) => {
      if (type === "confirm") {
        setLoadingPage(true)
        try {
          const req = {
            type: "REMOVE",
            user: userSelected.value,
            pf_name: profile.profile_id
          }
          const response = await ProfileService.authenProfile(req)
          if (response.message === "ok") {
            notifySuccess('Success!, Remove authorize profile successfully')
          } else {
            notifyFailed('Failed!, Remove authorize profile Failed')
          }
          setProfile()
          setUserSelected("")
          setProfileSelected("")
          setLoadingPage(false)
        } catch (err) {
          console.log(err)
          setLoadingPage(false)
          notifyFailed('Failed!, Move authorize profile Failed')
        }
      }
    }, 'warning')
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>PLHSSVR1N Authorize Profile</CardTitle>
      </CardHeader>
      <CardBody>
        <Spin spinning={loadingPage}>
          <Form>
            <Row style={{ justifyContent: 'center' }}>
              <Col xs="12" sm="8" md="8">
                <Label>Profile Name:</Label>
                <FormGroup>
                  <Select
                    theme={selectThemeColors}
                    className='react-select'
                    classNamePrefix='select'
                    options={profileNameOptions}
                    isClearable={false}
                    isSearchable={true}
                    value={profileSelected}
                    onChange={(value) => onSelectProfileName(value)}
                  />
                  <Spin spinning={loading}>
                    <div className='profile-card'>
                      {profile?.profile_config.slice(1, -1).split(',').map((list) => (
                        <p key={list}>- {list}</p>
                      ))}
                    </div>
                  </Spin>

                </FormGroup>
              </Col>
            </Row>
            <Row style={{ justifyContent: 'center' }}>
              <Col xs="12" sm="8" md="8">
                <Label>To User:</Label>
                <FormGroup>
                  <Select
                    theme={selectThemeColors}
                    className='react-select'
                    classNamePrefix='select'
                    options={userNameOptions}
                    isClearable={false}
                    isSearchable={true}
                    value={userSelected}
                    onChange={(value) => setUserSelected(value)}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row style={{ justifyContent: 'center' }}>
              <Col xs="12" sm="8" md="8" style={{ display: "flex", justifyContent: 'space-around' }}>
                <Button
                  color='primary'
                  disabled={!profile || !userSelected}
                  onClick={onCopy}
                >
                  COPY
                </Button>
                <Button
                  color='primary'
                  disabled={!profile || !userSelected}
                  onClick={onMove}
                >
                  MOVE
                </Button>
              </Col>
            </Row>
          </Form>
        </Spin>
      </CardBody>
    </Card>
  )
}

export default AuthorizeProfile
