import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import React from 'react'
import Link from 'next/link'

class EmployeeForm extends React.Component {
  render() {
    return (
      <Form>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" defaultValue={this.props.employee.name} placeholder="Enter name" />
        </Form.Group>
        <Form.Group controlId="formDate">
          <Form.Label>Modified At</Form.Label>
          <Form.Control type="text" defaultValue={this.props.employee.createdAt} />
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
    )
  }
}

export default EmployeeForm
