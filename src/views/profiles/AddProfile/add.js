import { Modal, Table } from "antd"
import { useState, useMemo } from "react"
import {
  Card,
  CardHeader,
  CardTitle,
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
import { dataTableSearch, rtuOptions, tagOptions } from "../constants/data"
import { ChevronDown } from 'react-feather'
import FilterComponent from "./FilterComponent"
import { notifySuccess, notifyFailed } from "@src/views/components/toasts/notifyTopCenter"

const VerticalForm = () => {

  const [gmdrType, setGmdrType] = useState(1)
  const [selectRtuName, setSelectRtuName] = useState()
  const [selectTagName, setSelectTagName] = useState()
  const [addDataTable, setAddDataTable] = useState()
  const [addedProfile, setAddedProfile] = useState([])
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [profileName, setProfileName] = useState()

  const [filterText, setFilterText] = useState("")
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false)
  const filteredItems = dataTableSearch.filter(
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
    setAddedProfile((current) => current.filter((list) => list.id !== value.id))
  }

  const DataColumn = [
    {
      name: 'RTU name',
      selector: 'rtuName',
      sortable: true,
      maxWidth: '400px'
    },
    {
      name: 'Tag name',
      selector: 'tagName',
      sortable: true,
      maxWidth: '400px'
    },
    {
      name: 'Description',
      selector: 'description',
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

  const onSearch = () => {
    // ** Call api search data
    try {
      setAddDataTable(dataTableSearch)
    } catch (err) {
      console.log(err)
    }
  }

  const onSaveProfile = () => {
    try {
      setIsOpenModal(false)
      console.log("addProfile", addedProfile)
      console.log("profileName", profileName)

      //** Call api save profile */
      setAddedProfile([])
      notifySuccess("Success!!, Save profile successfully")
    } catch (err) {
      console.log(err)
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
                        onClick={() => { setGmdrType(1); setAddDataTable(""); setSelectRtuName(); setSelectTagName() }}
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
                        onClick={() => { setGmdrType(2); setAddDataTable(""); setSelectRtuName(""); setSelectTagName("") }}
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
                        onClick={() => { setGmdrType(3); setAddDataTable(""); setSelectRtuName(""); setSelectTagName("") }}
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
                        <Select
                          theme={selectThemeColors}
                          className='react-select mt-1'
                          classNamePrefix='select'
                          placeholder="Tag Name"
                          options={tagOptions}
                          isSearchable={true}
                          isClearable={false}
                          onChange={(val) => setSelectTagName(val)}
                          value={selectTagName}

                        />) : (
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
                        onClick={onSearch}
                      >
                        Search
                      </Button.Ripple>
                      <Button.Ripple outline color='secondary' disabled={addedProfile.length === 0} type='reset' onClick={() => setIsOpenModal(true)}>
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

      {addDataTable || (gmdrType !== gmdrType) ? (
        <>
          <Card>
            <CardBody>
              <DataTable
                noHeader
                pagination
                data={filteredItems}
                defaultSortField="name"
                striped
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
          </Card>
        </>
      ) : null}


      <Modal
        open={isOpenModal}
        footer={null}
        onCancel={() => setIsOpenModal(false)}
        width={500}
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
      </Modal>
    </>
  )
}

export default VerticalForm