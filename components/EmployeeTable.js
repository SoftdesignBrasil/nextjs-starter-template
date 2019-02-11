import Table from 'react-bootstrap/Table'
import Badge from 'react-bootstrap/Badge'

const getEmployeeRows = (employees) => {
  return employees.map((emp) => (
      <tr key={emp.id}>
        <td>{emp.name}</td>
        <td>{emp.createdAt}</td>
        <td>
          <Badge className="float-right mr-3" variant="info" pill="true">Edit</Badge>
        </td>
      </tr>
    )
  )
}

const EmployeeTable = (props) => {
  const employees = props.employees ? props.employees : []
  const employeeRows = getEmployeeRows(employees)

  return (
    <Table striped="true">
      <thead>
        <tr>
          <th>Employee Name</th>
          <th>Created At</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        { employeeRows }
      </tbody>
    </Table>
  )
}

export default EmployeeTable
