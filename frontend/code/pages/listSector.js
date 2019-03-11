import { Container, Row, Col, Button } from 'react-bootstrap'
import fetch from 'isomorphic-unfetch'
import { Link } from '../config/routes'
import { Router } from '../config/routes'
import DataTable from '../components/generics/DataTable'
import { buildAuthorizationHeader } from '../utils/authentication'

const onRowClick = (event, row, rowIndex) => {
  Router.pushRoute(`/sector/${row.id}`)
}

const ListSector = (props) => (
  <Container>
    <Row className="mb-5 mt-3">
      <Col>
        <h4 className="text-center">Lista de Setores</h4>
      </Col>
    </Row>
    <Row className="pb-3">
      <Col>
        <Link route="/sector">
          <Button className="float-right" variant="primary">Novo Setor</Button>
        </Link>
      </Col>
    </Row>
    <DataTable
      keyField="id"
      data={props.sectors}
      onRowClick={onRowClick}
      hover={true}
      startPage={1}
      visibleColumns={[
        { dataField: 'id', text: 'ID' },
        { dataField: 'name', text: 'Nome', sort: true },
        { dataField: 'type', text: 'Tipo', sort: true }
      ]}
    />
  </Container>
)

ListSector.getInitialProps = async (context, jwtToken) => {
  const API_HOST = process.browser ? process.env.POC_NEXTJS_CLIENT_API_HOST : process.env.POC_NEXTJS_SERVER_API_HOST
  const res = await fetch(`${API_HOST}/sector`, {
    headers: buildAuthorizationHeader(jwtToken)
  })
  const sectors = await res.json()

  return {
    sectors
  }
}

export default ListSector
