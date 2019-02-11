import 'bootstrap/dist/css/bootstrap.css'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import EmployeeTable from '../components/EmployeeTable'

const Index = () => (
  <Container>
    <Row className="mb-5 mt-3">
      <Col>
        <p className="text-center">Sample Application With React/Bootstrap \o/</p>
      </Col>
    </Row>
    <Row>
      <EmployeeTable />
    </Row>
  </Container>
)

export default Index
