import React, { useEffect, useState } from "react"
import { Card, CardBody, Col, FormGroup, Form, Row, Button } from "reactstrap"
import Select from 'react-select'
import { selectThemeColors } from '@utils'
import { userNameSearch } from '../FakeData'
import axios from 'axios'
import { notifySuccess, notifyFailed } from "@src/views/components/toasts/notifyTopCenter"

const UserFilter = ({ searchUsername, setSearchUsername, onsearchUserData }) => {
  const [usernameList, setUsernameList] = useState()

  useEffect(() => {
    //**call api get user for search
    try {
      // axios.get('get/userList')
      // .then(res => {
      //   console.log(res)
      // })
      setUsernameList(userNameSearch)
    } catch (err) {
      console.log(err)
    }
  }, [])

  return (
    <Card>
      <CardBody>
        <Form>
          <Row>
            <Col xs="12" sm="10" md="10">
              <FormGroup>
                <Select
                  theme={selectThemeColors}
                  classNamePrefix='select'
                  isClearable={false}
                  isSearchable={true}
                  options={usernameList}
                  onChange={(value) => setSearchUsername(value.value)}
                />
              </FormGroup>
            </Col>
            <Col xs="12" sm="2" md="2" className="d-flex align-item-center justify-content-center">
              <FormGroup>
                <Button.Ripple
                  className='mr-1'
                  color='primary'
                  disabled={!searchUsername}
                  onClick={onsearchUserData}
                >
                  Search
                </Button.Ripple>
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </CardBody>
    </Card>
  )
}

export default UserFilter