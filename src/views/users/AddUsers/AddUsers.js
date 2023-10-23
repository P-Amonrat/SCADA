import React, { useEffect, useState } from "react"
import { Card, CardHeader, CardTitle, CardBody, FormGroup, Form, Label, Input, Row, Col, Button } from "reactstrap"
import Select from 'react-select'
import { selectThemeColors } from '@utils'
import { LevelOptions } from '../FakeData'
import { notifySuccess, notifyFailed } from "@src/views/components/toasts/notifyTopCenter"
import { popupConfirm } from "@src/views/components/sweetalert"
import UsersService from "../service"
import { Spin } from "antd"

const initialState = {
  name: "",
  password: "",
  level: ""
}

const AddUsers = () => {

  const [levelList, setLevelList] = useState([])
  const [data, setData] = useState(initialState)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    //**Call Api Get Level for display on Select Level */
    try {
      setLevelList(LevelOptions)
    } catch (err) {
      console.log(err)
    }
  }, [])

  const onSaveUser = () => {
    popupConfirm('Do you want to add user?', async (type) => {
      if (type === "confirm") {
        try {
          setLoading(true)
          //**call api to save new Edit
          const req = {
            user_id: null, // กรณี update ถ้า insert ใส่ null มา
            username: data.name,
            password: data.password,
            user_lavel: data.level.value
          }
          const response = await UsersService.saveUser(req)
          if (response.message === "ok") {
            notifySuccess('Success!, Save user successfully')
            setLoading(false)
          } else {
            notifyFailed('Failed!, Save user Failed')
            setLoading(false)
          }
          setData(initialState)
        } catch (err) {
          console.log(err)
          notifyFailed('Failed!, Save user Failed')
          setLoading(false)
        }
      }
    }, 'warning')
  }

  const onResetdata = () => {
    setData(initialState)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>PLHSSVR1N Add User</CardTitle>
      </CardHeader>
      <CardBody>
        <Spin spinning={loading}>
          <Form>
            <Row style={{ justifyContent: 'center' }}>
              <Col xs="12" sm="8" md="8">
                <FormGroup>
                  <Label for="username">
                    Username:
                  </Label>
                  <Input
                    id="username"
                    name="username"
                    placeholder="Username"
                    value={data.name}
                    onChange={(e) => setData({ ...data, name: e.target.value })}
                  />
                </FormGroup>
              </Col>
              <Col xs="12" sm="8" md="8">
                <FormGroup>
                  <Label for="password">
                    Password:
                  </Label>
                  <Input
                    id="password"
                    name="password"
                    placeholder="Password"
                    type="password"
                    value={data.password}
                    onChange={(e) => setData({ ...data, password: e.target.value })}
                  />
                </FormGroup>
              </Col>
              <Col xs="12" sm="8" md="8">
                <FormGroup>
                  <Label for="level">
                    Level:
                  </Label>
                  <Select
                    theme={selectThemeColors}
                    classNamePrefix='select'
                    options={levelList}
                    isClearable={false}
                    isSearchable={true}
                    value={data.level}
                    onChange={(value) => setData({ ...data, level: value })}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row style={{ justifyContent: 'center' }}>
              <Col xs="12" sm="8" md="8" style={{ display: "flex", justifyContent: 'space-around' }}>
                <Button.Ripple
                  className='mr-1'
                  color='primary'
                  onClick={onSaveUser}
                  disabled={!data.name || !data.password || data.level.length === 0}
                >
                  Add User
                </Button.Ripple>
                <Button.Ripple outline color='secondary' type='reset' onClick={onResetdata}>
                  Reset
                </Button.Ripple>
              </Col>
            </Row>
          </Form>
        </Spin>

      </CardBody>
    </Card>
  )
}

export default AddUsers