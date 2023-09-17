import React from "react"
import {
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from 'reactstrap'
import Select from 'react-select'
import { selectThemeColors } from '@utils'

const EditUserModal = ({ isOpen, setIsOpen, data, setData, onSaveUser, levelList }) => {

  return (
    <Modal isOpen={isOpen}>
      <ModalHeader>Edit User</ModalHeader>
      <ModalBody>
        <Form>
          <Row>
            <Col xs="12" sm="12" md="12">
              <FormGroup>
                <Label for="username">
                  Username:
                </Label>
                <Input
                  id="username"
                  name="username"
                  placeholder="Username"
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                />
              </FormGroup>
            </Col>
            <Col xs="12" sm="12" md="12">
              <FormGroup>
                <Label for="password">
                  Password:
                </Label>
                <Input
                  id="password"
                  name="password"
                  placeholder="Password"
                  type="password"
                  value={data.password}
                  onChange={(e) => setData({ ...data, password: e.target.value })}
                />
              </FormGroup>
            </Col>
            <Col xs="12" sm="12" md="12">
              <FormGroup>
                <Label for="level">
                  Level:
                </Label>
                <Select
                  theme={selectThemeColors}
                  classNamePrefix='select'
                  value={data.level}
                  options={levelList}
                  onChange={(value) => setData({ ...data, level: value })}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col className='d-flex align-item-center justify-content-center'>
              <Button className='mr-1' color='primary' onClick={onSaveUser}>
                Edit User
              </Button>
              <Button outline color='secondary' type='reset' onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
            </Col>
          </Row>
        </Form>
      </ModalBody>
    </Modal>
  )
}

export default EditUserModal