import { Container, Row, Col, Button } from 'react-bootstrap'
import fetch from 'isomorphic-unfetch'
import { Link, Router } from '../config/routes'
import DataTable from '../components/generics/DataTable'
import { formatDate } from '../utils/FormatUtil'
import { buildAuthorizationHeader } from '../utils/authentication'

const correctDateFormat = (data) => {
  data.forEach((obj) => {
    obj.modifiedAt = obj.updatedAt ? formatDate(obj.updatedAt) : formatDate(obj.createdAt)
  })
  return data
}

const onRowClick = (event, row, rowIndex) => {
  Router.pushRoute(`/employee/${row.id}`)
}

const Index = (props) => (
  <Container>
    <Row className="mb-5 mt-3">
      <Col>
        <h4 className="text-center">Lista de Funcionários</h4>
      </Col>
    </Row>
    <Row className="pb-3">
      <Col>
        <Link route="/employee">
          <Button className="float-right" variant="primary">Novo Funcionário</Button>
        </Link>
      </Col>
    </Row>
    <DataTable
      keyField="id"
      data={props.employees}
      onRowClick={onRowClick}
      hover={true}
      startPage={1}
      visibleColumns={[
        { dataField: 'id', text: 'ID' },
        { dataField: 'name', text: 'Nome', sort: true },
        { dataField: 'modifiedAt', text: 'Modificado Em', sort: true }
      ]}
    />
  </Container>
)

Index.getInitialProps = async (context, jwtToken) => {
  const API_HOST = process.browser ? process.env.CLIENT_API_HOST : process.env.SERVER_API_HOST
  const res = await fetch(`${API_HOST}/employee`, {
    headers: buildAuthorizationHeader(jwtToken)
  })

  const employees = await res.json()

  return {
    employees: correctDateFormat(employees)
  }
}

export default Index
