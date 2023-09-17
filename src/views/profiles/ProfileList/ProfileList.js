import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  FormGroup,
  Row,
  Col,
  Button
} from 'reactstrap'
import { useHistory } from "react-router-dom"
import { selectThemeColors } from '@utils'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component'
import { data, basicColumns } from '../../tables/data-tables/data'
import { Table } from 'antd'
import { profileData } from "../FakeData"
import { Edit, Trash } from 'react-feather'
import ProfileManual from '../../reports/ProfileManual/ProfileManual'
import { popupConfirm } from "@src/views/components/sweetalert"
import { notifySuccess, notifyFailed } from "@src/views/components/toasts/notifyTopCenter"

const VerticalForm = () => {
  const history = useHistory()
  const [gmdrType, setGmdrType] = useState(1)
  const [dateTime, setDateTime] = useState(new Date())
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [profileListData, setProfileListData] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // ** Call api get List data table 
  }, [])

  const onEditProfile = (row) => {
    // history.push({
    //   pathname: "/report/historical-report-gmdr/table",
    //   state: row
    // })
    setIsOpenModal(true)
    setProfileListData(row)
  }

  const onDeleteProfile = (value) => {
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

  const profileColumn = [
    {
      title: 'Profile Name',
      dataIndex: 'profileName',
      key: 'profileName',
      maxWidth: '400px'
    },
    {
      title: 'Tag name',
      dataIndex: 'tagName',
      key: 'tagName',
      maxWidth: '400px'
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      maxWidth: '400px'
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      maxWidth: '400px',
      render: (_, record) => (
        <div key={record.value}>
          <Edit
            className='mr-50'
            size={15}
            color='#070D7E'
            style={{ cursor: 'pointer' }}
            onClick={() => onEditProfile(record)}
          />
          <Trash
            className='mr-50'
            size={15}
            color='#070D7E'
            style={{ cursor: 'pointer' }}
            onClick={() => onDeleteProfile(record.value)}
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

      <CardBody>
        <Row>
          <Col sm={12}>
            {/* <DataTable
              noHeader
              pagination
              data={data}
              columns={basicColumns}
              className='react-dataTable'
              sortIcon={<ChevronDown size={10} />}
              paginationRowsPerPageOptions={[10, 25, 50, 100]}
            /> */}
            <Table
              rowKey={(record) => record.id}
              dataSource={profileData}
              columns={profileColumn}
            />
          </Col>
        </Row>

        <ProfileManual
            isOpenModal={isOpenModal}
            setIsOpenModal={setIsOpenModal}
            profileListData={profileListData}
            setProfileListData={setProfileListData}
          />
      </CardBody>
    </Card>
  )
}
export default VerticalForm
