import { Container, Row, Col, Button } from 'react-bootstrap'
import fetch from 'isomorphic-unfetch'
import SimpleTable from '../components/generics/SimpleTable'
import Link from 'next/link'

const injectDetailUrls = (data) => {
  data.forEach((obj) => {
    obj.detailUrl = `/employee?id=${obj.id}`
  })
  return data
}

const Index = (props) => (
  <Container>
    <Row className="mb-5 mt-3">
      <Col>
        <p className="text-center">Sample Application With React/Bootstrap \o/</p>
      </Col>
    </Row>
    <Row className="pb-3">
      <Col>
        <Link href="/employee">
          <Button className="float-right" variant="primary">New Employee</Button>
        </Link>
      </Col>
    </Row>
    <SimpleTable
      visibleDataProps={['name', 'createdAt', 'id']}
      tableHeaders={['Name', 'Created At', 'ID']}
      dataIdKey="id"
      detailUrlKey="detailUrl"
      data={props.employees}
      striped="true"
      hover="true"
      border="true"
    />
  </Container>
)

Index.getInitialProps = async (context) => {
  const res = await fetch('http://localhost:3000/api/employees')
  const employees = await res.json()

  console.log(`Fetched ${employees.length} employees`)

  return {
    employees: injectDetailUrls(employees)
  }
}

export default Index
