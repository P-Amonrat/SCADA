import React, { useState, useEffect } from "react"
import { Card, CardBody, CardHeader, CardTitle, Row, Col } from "reactstrap"
import UserTableColumn from "./UserTableColumn"
import UserFilter from "./UserFilter"
import EditUserModal from "./EditUserModal"
import { userNameListMock, LevelDropdown } from '../FakeData'
import { notifySuccess, notifyFailed } from "@src/views/components/toasts/notifyTopCenter"

const UserList = () => {

  const [usernameList, setUsernameList] = useState([])
  const [loading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [levelList, setLevelList] = useState([])
  const [searchUsername, setSearchUsername] = useState()
  const [data, setData] = useState({
    name: "",
    password: "",
    level: ""
  })

  useEffect(() => {
    //**Call Api Get Level for display on Select Level */
    try {
      // axios.get('get/levelList')
      //   .then(response => {
      //     console.log(response)
      //   })
      setLevelList(LevelDropdown)
    } catch (err) {
      console.log(err)
    }

  }, [])

  const onsearchUserData = () => {
    setLoading(true)
    try {
      //**Call api get user list */
      console.log(searchUsername)
      // axios.post(`get/userData/${searchUsername}`)
      //   .then(response => {
      //     console.log(response)
      setUsernameList(userNameListMock)
      setLoading(false)
      // })
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    onsearchUserData()
  }, [])

  const onSaveUser = () => {

    //**call api to save new Edit
    console.log(data)
    setIsOpen(false)
    setLoading(true)
    try {

      // const req = {
      //   name: data.name,
      //   password: data.password,
      //   level: data.level.value
      // }
      // axios.post('save/addUser', req)
      //   .then(response =>
      // 
      //     console.log(response)
      setLoading(false)
      notifySuccess('Success!, Save user successfully')
    } catch (err) {
      console.log(err)
      notifyFailed('Failed!, Save user Failed')
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>PLHSSVR1N List Users</CardTitle>
      </CardHeader>
      <CardBody>
        <Row>
          <Col>
            <UserFilter
              searchUsername={searchUsername}
              setSearchUsername={setSearchUsername}
              onsearchUserData={onsearchUserData}
            />
          </Col>
          <Col sm={12}>
            <UserTableColumn
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              data={data}
              setData={setData}
              levelList={levelList}
              loading={loading}
              setLoading={setLoading}
              usernameList={usernameList}
            />
            <EditUserModal
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              data={data}
              setData={setData}
              onSaveUser={onSaveUser}
              levelList={levelList}
            />
          </Col>
        </Row>
      </CardBody>
    </Card>
  )
}

export default UserList