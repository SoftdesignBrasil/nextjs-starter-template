import { Form, Row, Col } from 'react-bootstrap'
import React from 'react'
import fetch from 'isomorphic-unfetch'
import SimpleFormLayout from '../components/generics/SimpleFormLayout'

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

class Employee extends React.Component {
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
      <SimpleFormLayout
        goBackHref="/"
        onSubmit={this.onFormSubmit}
        showAlert={this.state.showAlert}
        formSubmitSuccess={this.state.updateSucceeded}
        onAlertClose={this.onClose}
        alertDismissible={true}
        alertMsg={this.state.alertMsg}
      >
        <Row>
          <Col>
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
          </Col>
        </Row>
      </SimpleFormLayout>
    )
  }
}

Employee.getInitialProps = async (context) => {
  const isUpdateEmployee = context.query && context.query.id
  if (isUpdateEmployee) {
    const res = await fetch(`http://localhost:3000/api/employee/${context.query.id}`)
    const employee = await res.json()

    console.log(`Fetched Employee: ${JSON.stringify(employee)}`)

    return {
      employee
    }
  }
  return {}
}

export default Employee
