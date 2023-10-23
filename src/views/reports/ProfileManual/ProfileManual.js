import { notifyFailed } from "@src/views/components/toasts/notifyTopCenter"
import { selectThemeColors } from '@utils'
import { Spin, Table, Modal } from "antd"
import { useEffect, useMemo, useState } from "react"
import DataTable from "react-data-table-component"
import { ChevronDown } from 'react-feather'
import Select from 'react-select'
import {
  Button,
  Card,
  CardBody,
  Col,
  CustomInput,
  FormGroup,
  Input,
  Label,
  Row
} from 'reactstrap'
import ProfileService from "../../profiles/Service"
import FilterComponent from "./FilterComponent"
import ModalForm from "../../components/modal/modal-form"

const ProfileManual = (props) => {

  const { isOpenModal, setIsOpenModal, addedProfile, setAddedProfile } = props

  const [gmdrType, setGmdrType] = useState(1)
  const [selectRtuName, setSelectRtuName] = useState()
  const [selectTagName, setSelectTagName] = useState()
  const [addDataTable, setAddDataTable] = useState()
  const [loading, setLoading] = useState(false)
  const [filterText, setFilterText] = useState("")
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false)
  const [rtuOptions, setRtuOptions] = useState([])

  const fetchData = async () => {
    try {
      const getRtuResponse = await ProfileService.getRtuDropdown()
      const getRtuObj = getRtuResponse?.data.map((item) => {
        return {
          value: item.pkey,
          label: item.libelle
        }
      })
      setRtuOptions(getRtuObj)
    } catch (err) {
      console.log(err)
      notifyFailed('Failed!, Get rtu list failed')
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const filteredItems = addDataTable?.filter(
    item => JSON.stringify(item).toLowerCase().indexOf(filterText.toLowerCase()) !== -1
  )

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
    try {
      setLoading(true)
      const req = {
        searchType: gmdrType === 1 ? "rtu" : gmdrType === 2 ? "tag" : "cal",
        rtu_name: gmdrType === 1 ? selectRtuName.label : gmdrType === 2 ? selectTagName : ""
      }
      // ** Call api search data
      const response = await ProfileService.searchProfileManual(req)
      setAddDataTable(response.data)
      setLoading(false)
    } catch (err) {
      console.log(err)
      notifyFailed("Failed!!, Get profile data Failed")
    }
  }

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

  return (
    <ModalForm
      openModal={isOpenModal}
      setOpenModal={setIsOpenModal}
      title=""
    >
      <Card style={{ width: "100%" }}>
        <CardBody>
          <Row style={{ justifyContent: 'center' }}>
            <Col sm='12' xl="12">
              <FormGroup>
                <Row>
                  <Col sm='3'>
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
                        onClick={() => setIsOpenModal(false)}
                        disabled={addedProfile.length === 0}
                      >
                        OK
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
      <Row style={{ margin: "20px 10px", flot: "right" }}>
        <Col xs="8" sm="10" lg="10"></Col>
        <Col xs="2" sm="2" lg="2">
          <Button outline color='primary' onClick={() => { setIsOpenModal(false); setAddedProfile([]) }}>
            Discard
          </Button>
        </Col>
      </Row>
      {/* ) : null} */}
    </ModalForm>
  )
}

export default ProfileManual