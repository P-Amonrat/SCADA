import { popupConfirm } from "@src/views/components/sweetalert"
import { notifyFailed, notifySuccess } from "@src/views/components/toasts/notifyTopCenter"
import '@styles/react/libs/flatpickr/flatpickr.scss'
import { Spin, Table } from 'antd'
import { useEffect, useState } from 'react'
import { Edit, Trash } from 'react-feather'
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Input,
  Row
} from 'reactstrap'
import ProfileManual from '../ProfileManual/ProfileManual'
import ProfileService from '../Service'

const VerticalForm = () => {
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [searchData, setSearchData] = useState([])
  const [data, setData] = useState()
  const [inputValue, setinputValue] = useState("")
  const [rtuOptions, setRtuOptions] = useState([])
  const [arrayProfile, setArrayProfile] = useState()

  const fetchData = async () => {
    try {
      // ** Call api get List data table 
      setLoading(true)
      const response = await ProfileService.getProfileByUser()
      if (response.message === "ok") {
        setinputValue("")
        setSearchData([])
        setData(response.data)
      } else {
        notifyFailed('Failed!, Get profile Failed')
      }
      setLoading(false)
    } catch (err) {
      console.log(err)
      notifyFailed('Failed!, Get profile Failed')
    }
  }

  const onGetRtuOptions = async () => {
    try {
      const response = await ProfileService.getRtuDropdown()
      if (response.message === "ok") {
        const obj = response?.data.map((item) => {
          return {
            value: item.pkey,
            label: item.libelle
          }
        })
        setRtuOptions(obj)
      } else {
        notifyFailed("Failed!, Get Rtu list failed")
      }
    } catch (err) {
      console.log(err)
      notifyFailed("Failed!, Get Rtu list failed")
    }
  }

  useEffect(() => {
    fetchData()
    onGetRtuOptions()
  }, [])

  const onEditProfile = async (id) => {
    try {
      setIsOpenModal(true)
      const response = await ProfileService.getProfileByProfileId(id)
      if (response.message === "ok") {
        const profileConfigArray = response?.data.profile_config.replace(/{|}/g, '').split(',')
        const tagDescArray = response?.data.tag_desc.replace(/{|}/g, '').split(',')
        const formatResponse = profileConfigArray?.map((profile_config, index) => ({
          profile_id : response.data.profile_id,
          profile_name : response.data.profile_name,
          user_id : response.data.user_id,
          profile_config,
          tag_desc: tagDescArray[index]
        }))
        setArrayProfile(formatResponse)
      } else {
        notifyFailed("Failed!, Edit profile failed")
      }
    } catch (err) {
      console.log(err)
      notifyFailed("Failed!, Edit profile failed")
    }
  }

  const onDeleteProfile = async (value) => {
    popupConfirm('Do you want to delete this profile?', async (type) => {
      if (type === "confirm") {
        try {
          //**call api Delete Data and call api get Data
          setLoading(true)
          const response = await ProfileService.deleteProfile(value)

          if (response.message === "ok") {
            notifySuccess('Success!, Delete user successfully')
          } else {
            notifyFailed('Failed!, Delete user failed')
          }
          await fetchData()
          setLoading(false)
        } catch (err) {
          console.log(err)
          notifyFailed('Failed!, Delete user failed')
        }
      }
    }, 'warning')
  }

  const onSearchData = (value) => {
    setinputValue(value)
    const filteredData = data.filter((entry) => entry.profile_name.toLowerCase().includes(value.toLowerCase()))
    setSearchData(filteredData)
  }

  const profileColumn = [
    {
      title: 'Profile Name',
      dataIndex: 'profile_name',
      key: 'profile_name',
      width: '100px'
    },
    {
      title: 'Tag name',
      dataIndex: 'profile_config',
      key: 'profile_config',
      maxWidth: '400px',
      render: (_, record) => (
        <div key={record.profile_id}>
          {record.profile_config.slice(1, -1)}
        </div>
      )
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      width: '100px',
      render: (_, record) => (
        <div key={record.value}>
          <Edit
            className='mr-50'
            size={15}
            color='#070D7E'
            style={{ cursor: 'pointer' }}
            onClick={() => onEditProfile(record.profile_id)}
          />
          <Trash
            className='mr-50'
            size={15}
            color='#070D7E'
            style={{ cursor: 'pointer' }}
            onClick={() => onDeleteProfile(record.profile_id)}
          />
        </div>
      )
    }
  ]

  return (

    <Card>
      <CardHeader>
        <CardTitle tag='h4'>PLHSSVR1N List Profiles</CardTitle>
      </CardHeader>

      <Spin spinning={loading}>
        <CardBody>
          <Row style={{ marginBottom: "20px", flot: "right" }}>
            <Col></Col>
            <Col xs="4" sm="4" md="4">
              <Input
                placeholder="Search Name"
                value={inputValue}
                onChange={(e) => onSearchData(e.target.value)}
              />
            </Col>
          </Row>
          <Row>
            <Col sm={12}>
              <Table
                rowKey={(record) => record.profile_id}
                dataSource={searchData.length > 0 ? searchData : data}
                columns={profileColumn}
              />
            </Col>
          </Row>

          <ProfileManual
            isOpenModal={isOpenModal}
            setIsOpenModal={setIsOpenModal}
            rtuOptions={rtuOptions}
            setRtuOptions={setRtuOptions}
            arrayProfile={arrayProfile}
            setArrayProfile={setArrayProfile}
            fetchData={fetchData}
          />
        </CardBody>
      </Spin>
    </Card>
  )
}
export default VerticalForm
