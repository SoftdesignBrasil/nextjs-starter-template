import 'bootstrap/dist/css/bootstrap.css'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import fetch from 'isomorphic-unfetch'

import EmployeeTable from '../components/EmployeeTable'

const Index = (props) => (
  <Container>
    <Row className="mb-5 mt-3">
      <Col>
        <p className="text-center">Sample Application With React/Bootstrap \o/</p>
      </Col>
    </Row>
    <Row>
      <EmployeeTable employees={props.employees} />
    </Row>
  </Container>
)

Index.getInitialProps = async (context) => {
  const res = await fetch('http://localhost:3000/api/employees')
  const employees = await res.json()

  console.log(`Fetched ${employees.length} employees`)

  return {
    employees
  }
}

export default Index
