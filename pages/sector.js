import { Form, Row, Col, Button, ListGroup } from 'react-bootstrap'
import React from 'react'
import fetch from 'isomorphic-unfetch'
import SimpleFormLayout from '../components/generics/SimpleFormLayout'

const createUpdateSectorInitialState = ({sector, sectorEmployees}) => (
  {
    id: sector.id,
    name: sector.name,
    type: sector.type,
    sectorEmployees: sectorEmployees,
    selectedEmployeeId: '',
    showAlert: false,
    formSuccess: false,
    alertMsg: ''
  }
)

const createOptionsSelectList = (selectListData) => (
  selectListData.map((data) => (
    <option key={data.value} value={data.value}>{ data.display }</option>
  ))
)

const filterSectorEmployees = (employees, sectorEmployeeIds) => {
  if(!employees || !sectorEmployeeIds) {
    return []
  }
  
  return sectorEmployeeIds.map(employeeId => (
    employees.find(emp => (
      emp.id === employeeId
    ))
  ))
}

const createSectorTypeSelectList = (sectorTypes) => (
  sectorTypes.map((sector, index) => ({
    value: sector,
    display: sector
  }))
)

const createEmployeeSelectList = (employees)=> (
  employees.map(employee => ({
    value: employee.id,
    display: employee.name
  }))
)

const createSectorEmployeesListGroupItems = (sectorEmployees) => (
  sectorEmployees.map(data => (
    <ListGroup.Item
      variant="info"
      key={data.id}
    >
      { data.name }
    </ListGroup.Item>
  ))
)

export default class Sector extends React.Component {
  constructor(props) {
    super(props)
    this.state = createUpdateSectorInitialState(props)

    this.onTypeChange = this.onTypeChange.bind(this)
    this.onAddSectorEmployee = this.onAddSectorEmployee.bind(this)
    this.onEmployeeChange = this.onEmployeeChange.bind(this)
    this.onClose = this.onClose.bind(this)
    this.onNameChange = this.onNameChange.bind(this)
    this.onFormSubmit = this.onFormSubmit.bind(this)
  }

  static async getInitialProps(context) {
    let res = await fetch(`http://localhost:3000/api/sector/${context.query.id}`)
    const sector = await res.json()

    res = await fetch('http://localhost:3000/api/sectorType')
    const sectorTypes = await res.json()

    res = await fetch(`http://localhost:3000/api/employees`)
    const employees = await res.json()

    const sectorEmployees = filterSectorEmployees(employees, sector.employees)

    console.log(`Fetched Sector: ${JSON.stringify(sector)}`)
    console.log(`Fetched Sector Types: ${JSON.stringify(sectorTypes)}`)
    console.log(`Fecthed Employees: ${JSON.stringify(employees)}`)
    console.log(`Fetched Sector Employees: ${JSON.stringify(sectorEmployees)}`)

    return {
      sector,
      sectorEmployees,
      sectorTypeSelectList: createSectorTypeSelectList(sectorTypes),
      employeeSelectList: createEmployeeSelectList(employees),
      employees
    }
  }

  onClose() {
    this.setState({
      showAlert: false
    })
  }

  onNameChange(event) {
    this.setState({
      name: event.target.value
    })
  }

  onAddSectorEmployee() {
    const isEmployeeAlreadyAdded = this.state.sectorEmployees.some(emp => (
      emp.id === Number(this.state.selectedEmployeeId)
    ))

    if (isEmployeeAlreadyAdded) {
      return this.setState({
        showAlert: true,
        alertMsg: 'Funcionário já vinculado',
        formSuccess: false
      })
    }

    const selectedEmployee = this.props.employees.find(emp => (
      emp.id === Number(this.state.selectedEmployeeId)
    ))
    this.setState({
      sectorEmployees: [...this.state.sectorEmployees, selectedEmployee]
    })
  }

  onEmployeeChange(event) {
    this.setState({
      selectedEmployeeId: event.target.value
    })
  }

  onTypeChange(event) {
    this.setState({
      type: event.target.value
    })
  }

  async onFormSubmit(event) {
    event.preventDefault()

    const response = await fetch('http://localhost:3000/api/sector', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: this.state.id,
        name: this.state.name,
        type: this.state.type,
        employees: this.state.sectorEmployees.map(emp => emp.id)
      })
    })

    if (response.ok) {
      this.setState({
        showAlert: true,
        formSuccess: true,
        alertMsg: 'Salvo com sucesso'
      })
    } else {
      this.setState({
        showAlert: true,
        formSuccess: false,
        alertMsg: 'Falha ao salvar'
      })
    }
  }

  render() {
    console.log(this.state)
    return (
      <SimpleFormLayout
        goBackHref="/listSector"
        onSubmit={this.onFormSubmit}
        showAlert={this.state.showAlert}
        formSubmitSuccess={this.state.formSuccess}
        onAlertClose={this.onClose}
        alertDismissible={true}
        alertMsg={this.state.alertMsg}
      >
        <Row>
          <Col>
            <Form.Group controlId="formName">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                value={this.state.name}
                placeholder="Informe o nome"
                onChange={this.onNameChange}
              />
            </Form.Group>
            <Form.Group controlId="formType">
              <Form.Label>Tipo</Form.Label>
              <Form.Control
                as="select"
                value={this.state.type}
                onChange={this.onTypeChange}
              >
                { createOptionsSelectList(this.props.sectorTypeSelectList) }
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formEmployeeList">
              <Form.Label>Funcionários Vínculados</Form.Label>
              <Row className="pb-2">
                <Col xs={9}>
                  <Form.Control
                    as="select"
                    value={this.state.selectedEmployeeId}
                    onChange={this.onEmployeeChange}
                  >
                    <option value="">Selecione para víncular</option>
                    { createOptionsSelectList(this.props.employeeSelectList) }
                  </Form.Control>
                </Col>
                <Col xs={3}>
                  <Button
                    className="float-right"
                    variant="info"
                    onClick={this.onAddSectorEmployee}
                  >
                    Víncular Funcionário
                  </Button>
                </Col>
              </Row>
              <ListGroup>
                { createSectorEmployeesListGroupItems(this.state.sectorEmployees) }
              </ListGroup>
            </Form.Group>
          </Col>
        </Row>
      </SimpleFormLayout>
    )
  }
}
