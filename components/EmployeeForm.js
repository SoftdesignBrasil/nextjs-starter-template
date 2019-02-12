import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import Col from 'react-bootstrap/Col'
import React from 'react'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import Row from 'react-bootstrap/Row';

class EmployeeForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: this.props.employee.id,
      name: this.props.employee.name,
      modifiedAt: this.props.employee.createdAt,
      showAlert: false,
      updateSucceeded: false,
      alertMsg: ''
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
