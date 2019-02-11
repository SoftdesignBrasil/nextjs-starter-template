import Table from 'react-bootstrap/Table'
import Badge from 'react-bootstrap/Badge'

const EmployeeTable = () => (
  <Table striped="true">
    <thead>
      <tr>
        <th>Employee Name</th>
        <th>Created At</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Name 1</td>
        <td>22/05/2015</td>
        <td>
          <Badge className="float-right mr-3" variant="info" pill="true">Edit</Badge>
        </td>
      </tr>
      <tr>
        <td>Name 2</td>
        <td>22/05/2017</td>
        <td>
          <Badge className="float-right mr-3" variant="info" pill="true">Edit</Badge>
        </td>
      </tr>
    </tbody>
  </Table>
)

export default EmployeeTable
