import { notifyFailed, notifySuccess } from "@src/views/components/toasts/notifyTopCenter"
import { selectThemeColors } from '@utils'
import { Spin, Table } from "antd"
import { useEffect, useMemo, useState } from "react"
import DataTable from "react-data-table-component"
import { ChevronDown } from 'react-feather'
import Select from 'react-select'
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  CustomInput,
  FormGroup,
  Input,
  Label,
  Row
} from 'reactstrap'
import ProfileService from "../Service"
import FilterComponent from "./FilterComponent"
import ModalForm from "../../components/modal/modal-form"

const AddProfile = () => {
  const [gmdrType, setGmdrType] = useState(1)
  const [selectRtuName, setSelectRtuName] = useState()
  const [selectTagName, setSelectTagName] = useState()
  const [addDataTable, setAddDataTable] = useState()
  const [addedProfile, setAddedProfile] = useState([])
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [profileName, setProfileName] = useState()
  const [filterText, setFilterText] = useState("")
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false)
  const [rtuOptions, setRtuOptions] = useState([])
  const [loading, setLoading] = useState(false)

  const filteredItems = addDataTable?.filter(
    item => JSON.stringify(item).toLowerCase().indexOf(filterText.toLowerCase()) !== -1
  )

  useEffect(async () => {
    try {
      const response = await ProfileService.getRtuDropdown()
      const obj = response?.data.map((item) => {
        return {
          value: item.pkey,
          label: item.libelle
        }
      })
      setRtuOptions(obj)
    } catch (err) {
      console.log(err)
    }
  }, [])

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
    setAddedProfile((current) => current.filter((list) => list.id !== value.id))
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
        <div key={row.id}>
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
      setAddDataTable(response.data)
      setLoading(false)
    } catch (err) {
      console.log(err)
      notifyFailed("Failed!!, Get profile Failed")
    }
  }

  const onSaveProfile = async () => {
    try {
      setLoading(true)
      setIsOpenModal(false)

      const req = {
        profile_id: null, // if insert set null
        profile_name: profileName,
        tag_pf: `,${addedProfile.map(item => item.tag)}`,
        desc_pf: `,${addedProfile.map(item => item.descr)}`
      }
      //** Call api save profile */
      const response = await ProfileService.saveProfile(req)
      if (response.message === "ok") {
        setAddedProfile([])
        setLoading(false)
        notifySuccess("Success!!, Save profile successfully")
      } else {
        setAddedProfile([])
        setLoading(false)
        notifyFailed("Failed!!, Save profile Failed")
      }
    } catch (err) {
      console.log(err)
      notifyFailed("Failed!!, Save profile Failed")
    }
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle tag='h4'>PLHSSVR1N Add Profiles</CardTitle>
        </CardHeader>
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
                        onClick={() => { setGmdrType(1); setSelectRtuName(); setSelectTagName() }}
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
                        onClick={() => { setGmdrType(3); setSelectRtuName(""); setSelectTagName("") }}
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
                        placeholder="RTU Name"
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
                        onClick={() => setIsOpenModal(true)}>
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

      <Spin spinning={loading}>
        {addDataTable || (gmdrType !== gmdrType) ? (
          <>
            <Card>
              <CardBody>
                <DataTable
                  noHeader
                  pagination
                  data={filteredItems}
                  defaultSortField="name"
                  stripedF
                  subHeader
                  subHeaderComponent={subHeaderComponent}
                  columns={DataColumn}
                  className='react-dataTable'
                  sortIcon={<ChevronDown size={10} />}
                  paginationRowsPerPageOptions={[10, 25, 50, 100]}
                />
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <Table
                  rowKey={(record) => record.id}
                  columns={AddedDataColumn}
                  dataSource={addedProfile}
                />
              </CardBody>
            </Card>F
          </>
        ) : null}
      </Spin>

      <ModalForm
        openModal={isOpenModal}
        setOpenModal={setIsOpenModal}
        title=""
      >
        <Card>
          <CardBody>
            <Row>
              <Col xl='4' md="4" sm="4" xs="4" style={{ display: "flex", alignItems: "center" }}>
                <b>Profile Name:</b>
              </Col>
              <Col xl='8' md="8" sm="8" xs="8" style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Input
                  id='save'
                  type='text'
                  style={{ width: "100%" }}
                  onChange={(e) => setProfileName(e.target.value)}
                />
              </Col>
            </Row>
            <Row style={{ justifyContent: "end", alignItems: 'center', marginTop: "10px" }}>
              <Col style={{ textAlign: "right" }}>
                <Button
                  outline
                  color='primary'
                  style={{marginRight: "10px"}}
                  onClick={() => setIsOpenModal(false)}
                >
                  Discard
                </Button>
                <Button
                  color='primary'
                  onClick={onSaveProfile}
                  disabled={!profileName}
                >
                  Save
                </Button>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </ModalForm>
    </>
  )
}

export default AddProfile