import { Form, Row, Col } from 'react-bootstrap'
import React from 'react'
import fetch from 'isomorphic-unfetch'
import SimpleFormLayout from '../components/generics/SimpleFormLayout'
import { formatDate } from '../utils/FormatUtil'
import PrimarySecondaryBtn from '../components/generics/PrimarySecondaryBtn'
import { extractJwtFromCookie, buildAuthorizationHeader } from '../utils/authentication'

const createNewEmployeeInitialState = () => (
  {
    id: undefined,
    name: '',
    modifiedAt: '',
    showAlert: false,
    updateSucceeded: false,
    alertMsg: '',
    isNewEmployee: true
  }
)

const createUpdateEmployeeInitalState = (employee) => (
  {
    id: employee.id,
    name: employee.name,
    modifiedAt: employee.createdAt,
    showAlert: false,
    updateSucceeded: false,
    alertMsg: '',
    isNewEmployee: false
  }
)

class Employee extends React.Component {
  constructor(props) {
    super(props)
    const isUpdateEmployee = this.props.employee
    if (isUpdateEmployee) {
      this.state = createUpdateEmployeeInitalState(this.props.employee)
    } else {
      this.state = createNewEmployeeInitialState()
    }
    this.onNameChange = this.onNameChange.bind(this)
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onClose = this.onClose.bind(this)
  }

  async onFormSubmit(event) {
    event.preventDefault()

    const jwtToken = extractJwtFromCookie('token')
    const response = await fetch(`${process.env.API_HOST}/employee`, {
      method: this.state.isNewEmployee ? 'POST' : 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...buildAuthorizationHeader(jwtToken)
      },
      body: JSON.stringify({
        id: this.state.id,
        name: this.state.name
      })
    })

    if (response.ok) {
      const payload = await response.json()
      this.setState({
        id: payload.id,
        name: payload.name,
        modifiedAt: formatDate(payload.createdAt),
        showAlert: true,
        updateSucceeded: true,
        alertMsg: 'Salvo com sucesso'
      })
    } else {
      this.setState({
        showAlert: true,
        updateSucceeded: false,
        alertMsg: 'Falha ao salvar'
      })
    }
  }

  onNameChange(event) {
    this.setState({
      name: event.target.value
    })
  }

  onClose(event) {
    this.setState({
      showAlert: false
    })
  }

  render() {
    return (
      <SimpleFormLayout
        onSubmit={this.onFormSubmit}
        showAlert={this.state.showAlert}
        formSubmitSuccess={this.state.updateSucceeded}
        onAlertClose={this.onClose}
        alertMsg={this.state.alertMsg}
        formLabel="Novo Funcionário"
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
            <Form.Group controlId="formDate">
              <Form.Label>Modificado Em</Form.Label>
              <Form.Control
                type="text"
                value={this.state.modifiedAt}
                readOnly={true}
              />
            </Form.Group>
          </Col>
        </Row>
        <PrimarySecondaryBtn
          goBackHref="/"
          secondaryLabel="Voltar"
          primaryLabel="Salvar"
        />
      </SimpleFormLayout>
    )
  }
}

Employee.getInitialProps = async (context, jwtToken) => {
  const isUpdateEmployee = context.query && context.query.id
  if (isUpdateEmployee) {
    const res = await fetch(`${process.env.API_HOST}/employee/${context.query.id}`, {
      headers: buildAuthorizationHeader(jwtToken)
    })
    const employee = await res.json()
    employee.createdAt = formatDate(employee.createdAt)

    return {
      employee
    }
  }
  return {}
}

export default Employee
