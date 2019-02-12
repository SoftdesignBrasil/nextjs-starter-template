import { Container, Row, Col } from 'react-bootstrap'
import React from 'react'
import EmployeeForm from '../components/EmployeeForm'
import fetch from 'isomorphic-unfetch'

class Employee extends React.Component {
  render() {
    return (
      <Container>
        <Row className="mb-5 mt-3">
          <Col>
            <p className="text-center">Employee Data</p>
            <EmployeeForm employee={this.props.employee} />
          </Col>
        </Row>
      </Container>
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
