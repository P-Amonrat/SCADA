import { useEffect, useState } from 'react'
import { Edit, Trash } from 'react-feather'
import { Table, Spin } from 'antd'
import axios from 'axios'
import { popupConfirm } from "@src/views/components/sweetalert"
import { notifySuccess, notifyFailed } from "@src/views/components/toasts/notifyTopCenter"

const UserTableColumn = ({ usernameList, setIsOpen, data, setData, loading, setLoading }) => {

  const onGetDataUser = (value) => {
    console.log(value)
    //**call api and get Data to show
    setLoading(true)
    try {
      // axios.get('')
      //   .then(response =>
      //     setData(response.data))
      setIsOpen(true)
      setLoading(false)
    } catch (err) {
      console.log(err)
    }
  }

  const onDeleteUser = (value) => {
    console.log(value)
    popupConfirm('Do you want to delete this user?', async (type) => {
      if (type === "confirm") {
        try {
          //**call api Delete Data and call api get Data
          // axios.get('')
          //   .then(response =>
          //     console.log(response)
          notifySuccess('Success!, Delete user successfully')
          setLoading(true)
          //**call api Delete Data and call api get Data
          // axios.get('')
          //   .then(response =>
          //     console.log(response)
          setLoading(false)
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
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Level',
      dataIndex: 'level',
      key: 'level'
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <div key={record.value}>
          <Edit
            className='mr-50'
            size={15}
            color='#070D7E'
            style={{ cursor: 'pointer' }}
            onClick={() => onGetDataUser(record.value)}
          />
          <Trash
            className='mr-50'
            size={15}
            color='#070D7E'
            style={{ cursor: 'pointer' }}
            onClick={() => onDeleteUser(record.value)}
          />
        </div>
      )
    }
  ]

  return (
    <div>
      <Spin spinning={loading}>
        <Table
          rowKey={(usernameList) => usernameList.value}
          columns={columns}
          dataSource={usernameList}
        />
      </Spin>
    </div>
  )
}

export default UserTableColumn