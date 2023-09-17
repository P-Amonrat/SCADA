import React, { useEffect, useState } from "react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Col,
  FormGroup,
  Form,
  Row,
  Button,
  Label
} from "reactstrap"
import Select from 'react-select'
import { selectThemeColors } from '@utils'
import { nameOptions, TypeOptions, achiveOptions } from '../constants/data'
import "../profile-styling.scss"

const AuthorizeProfile = () => {

  useEffect(() => {
    try {
      // **Call api get profile list

      //**Call api get User list */
    } catch (err) {
      console.log(err)
    }
  }, [])

  const onCopy = () => {

  }

  const onMove = () => {
    
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>PLHSSVR1N Authorize Profile</CardTitle>
      </CardHeader>
      <CardBody>
        <Form>
          <Row style={{ justifyContent: 'center' }}>
            <Col xs="12" sm="8" md="8">
              <Label>Profile Name:</Label>
              <FormGroup>
                <Select
                  theme={selectThemeColors}
                  className='react-select'
                  classNamePrefix='select'
                  options={nameOptions}
                  isClearable={false}
                  isSearchable={true}
                // onChange={(value) => setSearchUsername(value.value)}
                />
                <div className='profile-card-empty'>

                </div>
              </FormGroup>
            </Col>
          </Row>
          <Row style={{ justifyContent: 'center' }}>
            <Col xs="12" sm="8" md="8">
              <Label>To User:</Label>
              <FormGroup>
                <Select
                  theme={selectThemeColors}
                  className='react-select'
                  classNamePrefix='select'
                  options={nameOptions}
                  isClearable={false}
                  isSearchable={true}
                // onChange={(value) => setSearchUsername(value.value)}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row style={{ justifyContent: 'center' }}>
            <Col xs="12" sm="8" md="8" style={{ display: "flex", justifyContent: 'space-around' }}>
              <Button
                color='primary'
                onClick={onCopy}
              >
                COPY
              </Button>
              <Button
                color='primary'
                onClick={onMove}
              >
                MOVE
              </Button>
            </Col>
          </Row>
        </Form>
      </CardBody>
    </Card>
  )
}

export default AuthorizeProfile
