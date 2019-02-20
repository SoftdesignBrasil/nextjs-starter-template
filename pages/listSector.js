import { Container, Row, Col, Button } from 'react-bootstrap'
import fetch from 'isomorphic-unfetch'
import { Link } from '../config/routes'
import { Router } from '../config/routes'
import DataTable from '../components/DataTable'

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
          dataField: 'type',
          text: 'Tipo',
          sort: true
        }
      ]}
    />
  </Container>
)

ListSector.getInitialProps = async (context) => {
  const res = await fetch('http://localhost:3000/api/sector')
  const sectors = await res.json()

  console.log(`Fetched ${sectors.length} sectors`)

  return {
    sectors
  }
}

export default ListSector
