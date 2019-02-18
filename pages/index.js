import { Container, Row, Col, Button } from 'react-bootstrap'
import fetch from 'isomorphic-unfetch'
import Link from 'next/link'
import Router from 'next/router'
import DataTable from '../components/DataTable'
import { formatDate } from '../utils/FormatUtil'

const correctDateFormat = (data) => {
  data.forEach((obj) => {
    obj.modifiedAt = formatDate(obj.createdAt)
  })
  return data
}

const onRowClick = (event, row, rowIndex) => {
  Router.push(`/employee?id=${row.id}`)
}

const Index = (props) => (
  <Container>
    <Row className="mb-5 mt-3">
      <Col>
        <p className="text-center">Gerenciador de Funcionários</p>
      </Col>
    </Row>
    <Row className="pb-3">
      <Col>
        <Link href="/employee">
          <Button className="float-right" variant="primary">Novo Funcionário</Button>
        </Link>
      </Col>
    </Row>
    <DataTable
      keyField="id"
      data={props.employees}
      onRowClick={onRowClick}
      visibleColumns={[
        {
          dataField: 'id',
          text: 'ID'
        },
        {
          dataField: 'name',
          text: 'Nome',
          sort: true
        },
        {
          dataField: 'modifiedAt',
          text: 'Modificado Em',
          sort: true
        }
      ]}
    />
  </Container>
)

Index.getInitialProps = async (context) => {
  const res = await fetch('http://localhost:3000/api/employees')
  const employees = await res.json()

  console.log(`Fetched ${employees.length} employees`)

  return {
    employees: correctDateFormat(employees)
  }
}

export default Index
