import { Form, Row, Col } from 'react-bootstrap'
import React from 'react'
import fetch from 'isomorphic-unfetch'
import SimpleFormLayout from '../components/generics/SimpleFormLayout'
import MultipleSelect from '../components/generics/MultipleSelect'
import PrimarySecondaryBtn from '../components/generics/PrimarySecondaryBtn'
import { buildAuthorizationHeader, extractJwtFromCookie } from '../utils/authentication'

const createUpdateSectorInitialState = ({sector, sectorEmployees, employeeSelectList}) => (
  {
    id: sector.id,
    name: sector.name,
    type: sector.type,
    sectorEmployees: sectorEmployees,
    selectedEmployeeId: '',
    showAlert: false,
    formSuccess: false,
    alertMsg: '',
    employeeSelectList
  }
)

const createNewSectorInitialState = ({employeeSelectList}) => (
  {
    id: '',
    name: '',
    type: '',
    sectorEmployees: [],
    selectedEmployeeId: '',
    showAlert: false,
    formSuccess: false,
    alertMsg: '',
    employeeSelectList
  }
)

const createOptionsSelectList = (selectListData) => (
  selectListData.map((data) => (
    <option key={data.value} value={data.value}>{ data.display }</option>
  ))
)

const buildErrorState = errorMsg => ({
  showAlert: true,
  formSuccess: false,
  alertMsg: errorMsg
})

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

const addOnEmployeeSelectList = (employees, employeeSelectListState, employeeId) => {
  const employeeSelectList = [ ...employeeSelectListState ]
  const selectedEmployee = employees.filter(employee => employee.id === employeeId)
  return [...employeeSelectList, ...createEmployeeSelectList(selectedEmployee)]
}

const removeFromSelectList = (employeeSelectListState, employeeId) => {
  const employeeSelectList = [ ...employeeSelectListState ]
  return employeeSelectList.filter(employee => employee.value !== employeeId)
}

export default class Sector extends React.Component {
  constructor(props) {
    super(props)

    if (props.isUpdateSector) {
      this.state = createUpdateSectorInitialState(props)
    } else {
      this.state = createNewSectorInitialState(props)
    }
    this.onTypeChange = this.onTypeChange.bind(this)
    this.onAddSectorEmployee = this.onAddSectorEmployee.bind(this)
    this.onEmployeeChange = this.onEmployeeChange.bind(this)
    this.onClose = this.onClose.bind(this)
    this.onNameChange = this.onNameChange.bind(this)
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onRemove = this.onRemove.bind(this)
  }

  static async getInitialProps(context, jwtToken) {
    const isUpdateSector = !!context.query.id
    let sector = {}
    let sectorEmployees = []
    let res

    const API_HOST = process.browser ? process.env.POC_NEXTJS_CLIENT_API_HOST : process.env.POC_NEXTJS_SERVER_API_HOST

    res = await fetch(`${API_HOST}/sectorType`, {
      headers: buildAuthorizationHeader(jwtToken)
    })
    const sectorTypes = await res.json()

    res = await fetch(`${API_HOST}/employee`, {
      headers: buildAuthorizationHeader(jwtToken)
    })
    const employees = await res.json()

    res = await fetch(`${API_HOST}/employee/free`, {
      headers: buildAuthorizationHeader(jwtToken)
    })
    const freeEmployees = await res.json()

    if (isUpdateSector) {
      res = await fetch(`${API_HOST}/sector/${context.query.id}`, {
        headers: buildAuthorizationHeader(jwtToken)
      })
      sector = await res.json()
      sectorEmployees = filterSectorEmployees(employees, sector.employees)
    }

    return {
      sector,
      sectorEmployees,
      sectorTypeSelectList: createSectorTypeSelectList(sectorTypes),
      employeeSelectList: createEmployeeSelectList(freeEmployees),
      employees,
      isUpdateSector
    }
  }

  onRemove(event) {
    const sectorEmployeeId = Number(event.target.dataset.id)
    const newSectorEmployees = this.state.sectorEmployees.filter(emp => (
      emp.id !== sectorEmployeeId
    ))
    this.setState({
      sectorEmployees: newSectorEmployees,
      employeeSelectList: addOnEmployeeSelectList(
        this.props.employees, this.state.employeeSelectList, sectorEmployeeId
      )
    })
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
      sectorEmployees: [...this.state.sectorEmployees, selectedEmployee],
      employeeSelectList: removeFromSelectList(
        this.state.employeeSelectList, Number(this.state.selectedEmployeeId)
      ),
      selectedEmployeeId: ''
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

    try {
      const jwtToken = extractJwtFromCookie('token')
      const response = await fetch(`${process.env.POC_NEXTJS_CLIENT_API_HOST}/sector`, {
        method: this.props.isUpdateSector ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...buildAuthorizationHeader(jwtToken)
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
        this.setState(buildErrorState('Falha ao salvar'))
      }
    } catch(err) {
      this.setState(buildErrorState('Falha ao salvar'))
    }
  }

  render() {
    return (
      <SimpleFormLayout
        onSubmit={this.onFormSubmit}
        showAlert={this.state.showAlert}
        formSubmitSuccess={this.state.formSuccess}
        onAlertClose={this.onClose}
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
                {createOptionsSelectList(this.props.sectorTypeSelectList)}
              </Form.Control>
            </Form.Group>
            <MultipleSelect
              label="Funcionários Vínculados"
              value={this.state.selectedEmployeeId}
              onValueChange={this.onEmployeeChange}
              defaultSelectValue=""
              defaultSelectLabel="Selecione para víncular"
              selectList={this.state.employeeSelectList}
              selectValueKey="value"
              selectLabelKey="display"
              onAddValue={this.onAddSectorEmployee}
              addValueLabel="Víncular Funcionário"
              selectedData={this.state.sectorEmployees}
              selectedDataValueKey="id"
              selectedDataLabelKey="name"
              onRemove={this.onRemove}
            />
          </Col>
        </Row>
        <PrimarySecondaryBtn
          goBackHref="/listSector"
          secondaryLabel="Voltar"
          primaryLabel="Salvar"
        />
      </SimpleFormLayout>
    )
  }
}
