import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import React from 'react'
import EmployeeForm from '../components/EmployeeForm'

class EmployeeDetail extends React.Component {
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

EmployeeDetail.getInitialProps = async (context) => {
  const res = await fetch(`http://localhost:3000/api/employee/${context.query.id}`)
  const employee = await res.json()

  console.log(`Fetched Employee: ${JSON.stringify(employee)}`)

  return {
    employee
  }
}

export default EmployeeDetail
