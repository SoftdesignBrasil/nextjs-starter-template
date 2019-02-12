import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import React from 'react'
import Link from 'next/link'

class EmployeeForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: this.props.employee.name,
      modifiedAt: this.props.employee.createdAt
    }
    this.onNameChange = this.onNameChange.bind(this)
  }

  onNameChange(event) {
    this.setState({
      name: event.target.value
    }, () => {
      console.log(`New State: ${JSON.stringify(this.state)}`)
    })
  }

  render() {
    return (
      <Form>
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
    )
  }
}

export default EmployeeForm
