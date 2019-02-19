import { Form, Row, Col } from 'react-bootstrap'
import React from 'react'
import fetch from 'isomorphic-unfetch'
import SimpleFormLayout from '../components/generics/SimpleFormLayout'
import MultipleSelect from '../components/generics/MultipleSelect'

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

const createNewSectorInitialState = () => (
  {
    id: '',
    name: '',
    type: '',
    sectorEmployees: [],
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

export default class Sector extends React.Component {
  constructor(props) {
    super(props)

    if (props.isUpdateSector) {
      this.state = createUpdateSectorInitialState(props)
    } else {
      this.state = createNewSectorInitialState()
    }
    this.onTypeChange = this.onTypeChange.bind(this)
    this.onAddSectorEmployee = this.onAddSectorEmployee.bind(this)
    this.onEmployeeChange = this.onEmployeeChange.bind(this)
    this.onClose = this.onClose.bind(this)
    this.onNameChange = this.onNameChange.bind(this)
    this.onFormSubmit = this.onFormSubmit.bind(this)
  }

  static async getInitialProps(context) {
    const isUpdateSector = !!context.query.id
    let sector = {}
    let sectorEmployees = []
    let res

    res = await fetch('http://localhost:3000/api/sectorType')
    const sectorTypes = await res.json()
    console.log(`Fetched Sector Types: ${JSON.stringify(sectorTypes)}`)

    res = await fetch(`http://localhost:3000/api/employee`)
    const employees = await res.json()
    console.log(`Fecthed Employees: ${JSON.stringify(employees)}`)

    if (isUpdateSector) {
      let res = await fetch(`http://localhost:3000/api/sector/${context.query.id}`)
      sector = await res.json()
      console.log(`Fetched Sector: ${JSON.stringify(sector)}`)
      sectorEmployees = filterSectorEmployees(employees, sector.employees)
    }

    return {
      sector,
      sectorEmployees,
      sectorTypeSelectList: createSectorTypeSelectList(sectorTypes),
      employeeSelectList: createEmployeeSelectList(employees),
      employees,
      isUpdateSector
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
    const isEmployeeNotSelected = !this.state.selectedEmployeeId

    const isEmployeeAlreadyAdded = this.state.sectorEmployees.some(emp => (
      emp.id === Number(this.state.selectedEmployeeId)
    ))

    if (isEmployeeAlreadyAdded || isEmployeeNotSelected) {
      return this.setState({
        showAlert: true,
        alertMsg: isEmployeeAlreadyAdded ? 'Funcionário já vinculado' : 'Selecione um Funcionário',
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
      method: this.props.isUpdateSector ? 'PUT' : 'POST',
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
    return (
      <SimpleFormLayout
        goBackHref="/listSector"
        onSubmit={this.onFormSubmit}
        showAlert={this.state.showAlert}
        formSubmitSuccess={this.state.formSuccess}
        onAlertClose={this.onClose}
        alertDismissible={true}
        alertMsg={this.state.alertMsg}
        formLabel="Novo Setor"
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
            <MultipleSelect
              label="Funcionários Vínculados"
              value={this.state.selectedEmployeeId}
              onValueChange={this.onEmployeeChange}
              defaultSelectValue=""
              defaultSelectLabel="Selecione para víncular"
              selectList={this.props.employeeSelectList}
              selectValueKey="value"
              selectLabelKey="display"
              onAddValue={this.onAddSectorEmployee}
              addValueLabel="Víncular Funcionário"
              selectedData={this.state.sectorEmployees}
              selectedDataValueKey="id"
              selectedDataLabelKey="name"
            />
          </Col>
        </Row>
      </SimpleFormLayout>
    )
  }
}
