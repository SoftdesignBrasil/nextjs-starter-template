import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'

const DataTable = (props) => (
  <div className="table-responsive-sm">
    <BootstrapTable
      keyField={props.keyField}
      data={props.data}
      bootstrap4={true}
      striped={true}
      hover={true}
      pagination={paginationFactory({
        page: 1,
        sizePerPage: 5,
        sizePerPageList: [{
          text: '5', value: 5
        }, {
          text: '10', value: 10
        }]
      })}
      rowEvents={{
        onClick: props.onRowClick
      }}
      columns={props.visibleColumns}
    />
  </div>
)

export default DataTable
