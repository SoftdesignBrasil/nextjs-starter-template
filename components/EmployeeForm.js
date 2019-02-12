import { Form, Button, Alert, Col, Row } from 'react-bootstrap'
import React from 'react'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'

const createNewEmployeeInitialState = () => (
  {
    id: undefined,
    name: '',
    modifiedAt: '',
    showAlert: false,
    updateSucceeded: false,
    alertMsg: '',
    isNewEmployee: true
  }
)

const createUpdateEmployeeInitalState = (employee) => (
  {
    id: employee.id,
    name: employee.name,
    modifiedAt: employee.createdAt,
    showAlert: false,
    updateSucceeded: false,
    alertMsg: '',
    isNewEmployee: false
  }
)

class EmployeeForm extends React.Component {
  constructor(props) {
    super(props)
    const isUpdateEmployee = this.props.employee
    if (isUpdateEmployee) {
      this.state = createUpdateEmployeeInitalState(this.props.employee)
    } else {
      this.state = createNewEmployeeInitialState()
    }
    this.onNameChange = this.onNameChange.bind(this)
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onClose = this.onClose.bind(this)
  }

  async onFormSubmit(event) {
    event.preventDefault()

    const response = await fetch('http://localhost:3000/api/employee', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: this.state.id,
        name: this.state.name
      })
    })

    if (response.ok) {
      const payload = await response.json()
      this.setState({
        id: payload.id,
        name: payload.name,
        modifiedAt: payload.createdAt,
        showAlert: true,
        updateSucceeded: true,
        alertMsg: 'Updated employee'
      })
    } else {
      this.setState({
        showAlert: true,
        updateSucceeded: false,
        alertMsg: 'Fail to update employee'
      })
    }
  }

  onNameChange(event) {
    this.setState({
      name: event.target.value
    }, () => {
      console.log(`New State: ${JSON.stringify(this.state)}`)
    })
  }

  onClose(event) {
    this.setState({
      showAlert: false
    })
  }

  render() {
    return (
      <Row>
        <Col>
          <Alert
            show={this.state.showAlert}
            variant={this.state.updateSucceeded ? 'success' : 'danger'}
            onClose={this.onClose}
            dismissible={true}
          >
            {this.state.alertMsg}
          </Alert>
          <Form onSubmit={this.onFormSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={this.state.name}
                placeholder="Enter name"
                onChange={this.onNameChange}
              />
            </Form.Group>
            <Form.Group controlId="formDate">
              <Form.Label>Modified At</Form.Label>
              <Form.Control
                type="text"
                value={this.state.modifiedAt}
                readOnly={true}
              />
            </Form.Group>
            <Form.Group>
              <Link prefetch href={`/`}>
                <Button variant="secondary">
                  Go Back
                </Button>
              </Link>
              <Button className="float-right" variant="primary" type="submit">
                Submit
              </Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    )
  }
}

export default EmployeeForm
