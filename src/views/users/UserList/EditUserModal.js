import { selectThemeColors } from '@utils'
import React from "react"
import Select from 'react-select'
import {
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row
} from 'reactstrap'

const EditUserModal = ({ isOpen, setIsOpen, password, setPassword, onSaveUser, levelList, setGetUserData, getUserData }) => {

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
                  value={getUserData?.user_name}
                  disabled
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
                  // value={data.password}
                  onChange={(e) => setPassword(e.target.value)}
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
                  value={levelList.filter((item) => item.value === getUserData?.user_lavel)}
                  options={levelList}
                  onChange={(value) => setGetUserData({ ...getUserData, user_lavel: value.value })}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col className='d-flex align-item-center justify-content-center'>
              <Button
                className='mr-1'
                color='primary'
                disabled={!getUserData.user_name || !password || !getUserData.user_lavel}
                onClick={onSaveUser}
              >
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