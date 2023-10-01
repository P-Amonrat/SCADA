import { popupConfirm } from "@src/views/components/sweetalert"
import { notifyFailed, notifySuccess } from "@src/views/components/toasts/notifyTopCenter"
import { selectThemeColors } from '@utils'
import { Spin, Table } from 'antd'
import React, { useEffect, useState } from "react"
import { Edit, Trash } from 'react-feather'
import Select from 'react-select'
import { Button, Card, CardBody, CardHeader, CardTitle, Col, FormGroup, Row } from "reactstrap"
import { LevelDropdown } from '../FakeData'
import UsersService from "../service"
import EditUserModal from "./EditUserModal"

const UserList = () => {

  const [usernameList, setUsernameList] = useState([])
  const [loading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [levelList, setLevelList] = useState([])
  const [searchUsername, setSearchUsername] = useState()
  const [usernameForSearch, setUsernameForSearch] = useState()
  const [password, setPassword] = useState()
  const [usernameOptions, setUsernameOptions] = useState()
  const [getUserData, setGetUserData] = useState({})

  const fetchData = async () => {
        //**call api get user for search
        try {
          setLoading(true)
          const response = await UsersService.getUserList()
          const obj = response.data.map(item => {
            return {
              value: item.user_id,
              label: item.user_name
            }
          })
          setSearchUsername("")
          setUsernameList([])
          setLevelList(LevelDropdown)
          setUsernameForSearch(response.data)
          setUsernameOptions(obj)
          setLoading(false)
        } catch (err) {
          console.log(err)
          setLoading(false)
          notifyFailed('Failed!, Get user list Failed')
        }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const onsearchUserData = async () => {
    setLoading(true)
    try {
      const filteredData = usernameForSearch.filter((obj) => obj.user_name.includes(searchUsername.label))
      setUsernameList(filteredData)
      setLoading(false)
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  }

  const onSaveUser = async () => {

    //**call api to save new Edit
    setIsOpen(false)
    setLoading(true)
    try {
      const req = {
        user_id: getUserData.user_id,
        username: getUserData.user_name,
        password,
        user_lavel: getUserData.user_lavel
      }
      const response = await UsersService.saveUser(req)
      if (response.message === "ok") {
        notifySuccess('Success!, Save user successfully')
        setLoading(false)
      } else {
        notifyFailed('Failed!, Save user Failed')
        setLoading(false)
      }
      //**call api Delete Data and call api get Data
      await fetchData()
    } catch (err) {
      console.log(err)
      setLoading(false)
      notifyFailed('Failed!, Save user Failed')
    }
  }

  const onGetDataUser = async (value) => {
    setLoading(true)
    try {
      //**call api and get Data to show
      const response = await UsersService.getUserById(value)
      setGetUserData(response.data[0])
      setIsOpen(true)
      setLoading(false)
    } catch (err) {
      console.log(err)
      setLoading(false)
      notifyFailed('Failed!, Get user data Failed')
    }
  }

  const onDeleteUser = (value) => {
    popupConfirm('Do you want to delete this user?', async (type) => {
      if (type === "confirm") {
        try {
          //**call api Delete Data and call api get Data
          setLoading(true)
          await UsersService.deleteUser(value)

          //**call api Delete Data and call api get Data
          await fetchData()
          setLoading(false)
          notifySuccess('Success!, Delete user successfully')
        } catch (err) {
          console.log(err)
          notifyFailed('Failed!, Delete user failed')
        }
      }
    }, 'warning')
  }

  const columns = [
    {
      title: 'Users',
      dataIndex: 'user_name',
      key: 'user_name'
    },
    {
      title: 'Level',
      dataIndex: 'user_lavel',
      key: 'user_lavel',
      render: (_, record) => (
        <div>
          {LevelDropdown.find((item) => item.value === record.user_lavel)?.label}
        </div>
      )
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <div key={record.user_id}>
          <Edit
            className='mr-50'
            size={15}
            color='#070D7E'
            style={{ cursor: 'pointer' }}
            onClick={() => onGetDataUser(record.user_id)}
          />
          <Trash
            className='mr-50'
            size={15}
            color='#070D7E'
            style={{ cursor: 'pointer' }}
            onClick={() => onDeleteUser(record.user_id)}
          />
        </div>
      )
    }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>PLHSSVR1N List Users</CardTitle>
      </CardHeader>
      <CardBody>
        <Row>
          <Col>
            <Row>
              <Col xs="12" sm="10" md="10">
                <FormGroup>
                  <Select
                    theme={selectThemeColors}
                    classNamePrefix='select'
                    isClearable={false}
                    isSearchable={true}
                    options={usernameOptions ? [
                      { value: "0", label: "All" },
                      ...usernameOptions.map((list) => ({ value: list.value, label: list.label }))
                    ] : null
                    }
                    value={searchUsername}
                    onChange={(value) => setSearchUsername(value)}
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
          </Col>
          <Col sm={12}>
            <div>
              <Spin spinning={loading}>
                <Table
                  rowKey={(usernameList) => usernameList.user_id}
                  columns={columns}
                  dataSource={usernameList.length > 0 ? usernameList : usernameForSearch}
                />
              </Spin>
            </div>
            <EditUserModal
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              password={password}
              setPassword={setPassword}
              onSaveUser={onSaveUser}
              levelList={levelList}
              getUserData={getUserData}
              setGetUserData={setGetUserData}
            />
          </Col>
        </Row>
      </CardBody>
    </Card>
  )
}

export default UserList