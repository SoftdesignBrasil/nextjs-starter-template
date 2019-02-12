import Table from 'react-bootstrap/Table'
import Badge from 'react-bootstrap/Badge'
import Link from 'next/link'
import Button from 'react-bootstrap/Button'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'

const getEmployeeRows = (employees, rightAligmentCss) => {
  return employees.map((emp) => (
      <tr key={emp.id}>
        <td>{emp.name}</td>
        <td>{emp.createdAt}</td>
        <td>
          <Link prefetch href={`/employee?id=${emp.id}`}>
            <a>
              <Badge className={rightAligmentCss} variant="info" pill="true">Edit</Badge>
            </a>
          </Link>
        </td>
      </tr>
    )
  )
}

const EmployeeTable = (props) => {
  const rightAligmentCss = 'float-right mr-3'
  const employees = props.employees ? props.employees : []
  const employeeRows = getEmployeeRows(employees, rightAligmentCss)

  return (
    <Table striped="true">
      <thead>
        <tr>
          <th>Employee Name</th>
          <th>Created At</th>
          <th>
            <Link prefetch href={`/employee`}>
              <a>
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>New Employee</Tooltip>}
                >
                    <Button className={rightAligmentCss} variant="primary">
                      <span className="font-weight-bold">+</span>
                    </Button>
                </OverlayTrigger>
              </a>
          </Link>
          </th>
        </tr>
      </thead>
      <tbody>
        { employeeRows }
      </tbody>
    </Table>
  )
}

export default EmployeeTable
