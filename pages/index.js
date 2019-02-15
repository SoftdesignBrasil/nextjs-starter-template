// TODO See how to import this css globally
import 'bootstrap/dist/css/bootstrap.css'
import { Container, Row, Col } from 'react-bootstrap'
import fetch from 'isomorphic-unfetch'
import SimpleTable from '../components/generics/SimpleTable'

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
    <Row>
      <SimpleTable
        visibleDataProps={['name', 'createdAt']}
        tableHeaders={['Nome', 'Criado Em']}
        dataIdKey="id"
        detailUrlKey="detailUrl"
        data={props.employees}
        striped="true"
        hover="true"
      />
    </Row>
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
