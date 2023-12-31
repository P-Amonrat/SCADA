import { Modal, Table, Spin } from "antd"
import { useState, useMemo, useEffect } from "react"
import {
  Card,
  CardBody,
  FormGroup,
  Row,
  Col,
  Button,
  Label,
  CustomInput,
  Input
} from 'reactstrap'
import { selectThemeColors } from '@utils'
import Select from 'react-select'
import DataTable from "react-data-table-component"
import { ChevronDown } from 'react-feather'
import FilterComponent from "../AddProfile/FilterComponent"
import ProfileService from "../../profiles/Service"
import { popupConfirm } from "@src/views/components/sweetalert"
import { notifySuccess, notifyFailed } from "@src/views/components/toasts/notifyTopCenter"
import ModalForm from "../../components/modal/modal-form"

const ProfileManual = (props) => {

  const { isOpenModal, setIsOpenModal, rtuOptions, arrayProfile, fetchData } = props

  const [gmdrType, setGmdrType] = useState(1)
  const [selectRtuName, setSelectRtuName] = useState()
  const [selectTagName, setSelectTagName] = useState()
  const [addDataTable, setAddDataTable] = useState()
  const [addedProfile, setAddedProfile] = useState([])
  const [loading, setLoading] = useState(false)
  const [filterText, setFilterText] = useState("")
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false)
  const [loadingAddedData, setLoadingAddedData] = useState(false)

  useEffect(() => {
    setLoading(false)
    setSelectRtuName("")
    setSelectTagName("")
    setLoadingAddedData(true)
    setAddDataTable()
    if (arrayProfile) {
      // **Get profile data
      const obj = arrayProfile.map((item) => {
        return {
          tag: item.profile_config,
          descr: item.tag_desc
        }
      })
      setLoadingAddedData(false)
      setAddedProfile(obj)
    }
  }, [arrayProfile])

  const filteredItems = addDataTable?.filter(
    item => JSON.stringify(item).toLowerCase().indexOf(filterText.toLowerCase()) !== -1
  )

  const subHeaderComponent = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle)
        setFilterText("")
      }
    }

    return (
        <FilterComponent
          onFilter={e => setFilterText(e.target.value)}
          onClear={handleClear}
          filterText={filterText}
        />
    )
  }, [filterText, resetPaginationToggle])

  const onAddProfileData = (value) => {
    if (!addedProfile.includes(value)) {
      setAddedProfile(current => [...current, value])
    }
  }

  const onRemoveProfileData = (value) => {
    setAddedProfile((current) => current.filter((list) => list.tag !== value.tag))
  }

  const onSaveProfile = async () => {
    popupConfirm(`Do you want to save ${arrayProfile[0].profile_name} profile?`, async (type) => {
      if (type === "confirm") {
        try {
          setLoading(true)

          const req = {
            profile_id: arrayProfile[0].profile_id,
            profile_name: arrayProfile[0].profile_name,
            tag_pf: `,${addedProfile.map(item => item.tag)}`,
            desc_pf: `,${addedProfile.map(item => item.descr)}`
          }
          // //** Call api save profile */
          const response = await ProfileService.saveProfile(req)
          if (response.message === "ok") {
            setAddedProfile([])
            notifySuccess("Success!!, Save profile successfully")
          } else {
            setAddedProfile([])
            notifyFailed("Failed!!, Save profile Failed")
          }
          setIsOpenModal(false)
          setLoading(false)
          fetchData()
        } catch (err) {
          console.log(err)
          notifyFailed("Failed!!, Save profile Failed")
        }
      }
    }, 'warning')
  }

  const DataColumn = [
    {
      name: 'RTU name',
      selector: 'rtu',
      sortable: true,
      maxWidth: '400px'
    },
    {
      name: 'Tag name',
      selector: 'tag',
      sortable: true,
      maxWidth: '400px'
    },
    {
      name: 'Description',
      selector: 'descr',
      sortable: true,
      maxWidth: '400px'
    },
    {
      name: 'Select',
      selector: 'select',
      sortable: true,
      maxWidth: '400px',
      cell: (row) => (
        <div>
          <Button onClick={() => onAddProfileData(row)}>
            Add
          </Button>
        </div>
      )
    }
  ]

  const AddedDataColumn = [
    {
      title: 'Tag name',
      dataIndex: 'tag',
      key: 'tag',
      maxWidth: '400px'
    },
    {
      title: 'Description',
      dataIndex: 'descr',
      key: 'descr',
      maxWidth: '400px'
    },
    {
      title: 'Remove',
      dataIndex: 'remove',
      key: 'remove',
      maxWidth: '400px',
      render: (_, record) => (
        <div key={record.value}>
          <Button color='danger' onClick={() => onRemoveProfileData(record)}>
            Remove
          </Button>
        </div>
      )
    }
  ]

  const onSearch = async () => {
    // ** Call api search data
    try {
      setLoading(true)
      const req = {
        searchType: gmdrType === 1 ? "rtu" : gmdrType === 2 ? "tag" : "cal",
        rtu_name: gmdrType === 1 ? selectRtuName.label : gmdrType === 2 ? selectTagName : ""
      }

      const response = await ProfileService.searchProfileManual(req)
      if (response.message === "ok") {
        setAddDataTable(response.data)
        setLoading(false)
      } else {
        setLoading(false)
        notifyFailed("Failed!!, Get profile data Failed")
      }
    } catch (err) {
      console.log(err)
      notifyFailed("Failed!!, Get profile data Failed")
    }
  }

  return (
    <>
      <ModalForm
        openModal={isOpenModal}
        setOpenModal={setIsOpenModal}
        title=""
      >
        <Card>
          <CardBody>
            <Row style={{ justifyContent: 'center' }}>
              <Col sm='12'>
                <FormGroup>
                  <Row>
                    <Col sm='3'>
                      <Label>GMDR Type</Label>
                      <div className='demo-inline-spacing'>
                        <CustomInput
                          type='radio'
                          id='exampleCustomRadio'
                          name='customRadio'
                          inline
                          label='RTU Name'
                          value={1}
                          onClick={() => { setGmdrType(1); setSelectRtuName(); setSelectTagName("") }}
                          defaultChecked
                        />
                      </div>
                    </Col>
                    <Col sm='3'>
                      <Label></Label>
                      <div className='demo-inline-spacing'>
                        <CustomInput
                          type='radio'
                          id='exampleCustomRadio2'
                          name='customRadio'
                          inline
                          label='Tag Name'
                          value={2}
                          onClick={() => { setGmdrType(2); setSelectRtuName(""); setSelectTagName("") }}
                        />
                      </div>
                    </Col>
                    <Col sm='3'>
                      <Label></Label>
                      <div className='demo-inline-spacing'>
                        <CustomInput
                          type='radio'
                          id='exampleCustomRadio3'
                          name='customRadio'
                          inline
                          label='Calculation'
                          value={3}
                          onClick={() => { setGmdrType(3); setSelectRtuName(""); setSelectTagName() }}
                        />
                      </div>
                    </Col>
                    <Col sm='3'>
                      <Label></Label>
                      {gmdrType === 1 ? (
                        <Select
                          theme={selectThemeColors}
                          className='react-select mt-1'
                          classNamePrefix='select'
                          placeholder={"RTU Name"}
                          options={rtuOptions}
                          isSearchable={true}
                          isClearable={false}
                          onChange={(val) => setSelectRtuName(val)}
                          value={selectRtuName}

                        />) : gmdrType === 2 ? (
                          <Input
                            className="mt-1"
                            value={selectTagName}
                            onChange={(e) => setSelectTagName(e.target.value)}
                          />
                        ) : (
                        <div style={{ marginTop: "17px" }}>
                          Calculation
                        </div>
                      )
                      }

                    </Col>

                  </Row>
                  <Row style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Col sm='10' style={{ justifyContent: 'center', alignItems: 'center' }}>
                      <FormGroup className='d-flex mb-0 mt-2' style={{ justifyContent: 'center', alignItems: 'center' }} >
                        <Button.Ripple
                          className='mr-1'
                          color='primary'
                          type='submit'
                          disabled={gmdrType !== 3 && !selectRtuName && !selectTagName}
                          onClick={onSearch}
                        >
                          Search
                        </Button.Ripple>
                        <Button.Ripple
                          outline
                          color='primary'
                          disabled={addedProfile.length === 0}
                          onClick={onSaveProfile}>
                          Save
                        </Button.Ripple>
                      </FormGroup>
                    </Col>
                  </Row>
                </FormGroup>
              </Col>
            </Row>
          </CardBody>
        </Card>

        {/* {addDataTable || (gmdrType !== gmdrType) ? ( */}
        <>
          <Spin spinning={loading}>
            <Card>
              <CardBody>
                <DataTable
                  noHeader
                  pagination
                  data={filteredItems}
                  defaultSortField="name"
                  striped
                  subHeader
                  subHeaderComponent={addDataTable ? subHeaderComponent : null}
                  columns={DataColumn}
                  className='react-dataTable'
                  sortIcon={<ChevronDown size={10} />}
                  paginationRowsPerPageOptions={[10, 25, 50, 100]}
                />
              </CardBody>
            </Card>
          </Spin>

          <Spin spinning={loadingAddedData}>
            <Card>
              <CardBody>
                <Table
                  rowKey={(record) => record.tag}
                  columns={AddedDataColumn}
                  dataSource={addedProfile ? addedProfile : arrayProfile}
                />
              </CardBody>
            </Card>
          </Spin>
        </>
        <Row style={{ margin: "20px 10px", flot: "right" }}>
          <Col xs="8" sm="10" lg="10"></Col>
          <Col xs="2" sm="2" lg="2">
            <Button outline color='primary' onClick={() => setIsOpenModal(false)}>
              Discard
            </Button>
          </Col>
        </Row>
        {/* ) : null} */}

      </ModalForm>
    </>
  )
}

export default ProfileManual