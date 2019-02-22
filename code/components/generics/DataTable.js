import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'

const createSizePerPageList = () => (
  [
    { text: '10', value: 10 },
    { text: '20', value: 20 },
    { text: '30', value: 30 },
  ]
)

const clickableRowStyle = (
  <style global jsx>{`
      .dtTable tr {
        cursor: pointer
      }
  `}</style>
)

const DataTable = (props) => (
  <div className="table-responsive-sm">
    <BootstrapTable
      keyField={props.keyField}
      data={props.data}
      bootstrap4={true}
      striped={true}
      hover={props.hover}
      pagination={ paginationFactory({
        page: props.startPage,
        sizePerPageList: createSizePerPageList()
      }) }
      rowEvents={props.onRowClick ? { onClick: props.onRowClick } : null}
      columns={props.visibleColumns}
      noDataIndication="Nenhum resultado"
      wrapperClasses="dtTable"
    />
    { props.onRowClick ? clickableRowStyle : null }
    <style global jsx>{`
      .table-responsive-sm table {
        table-layout: auto;
      }
    `}</style>
  </div>
)

export default DataTable
