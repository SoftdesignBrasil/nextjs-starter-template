import { Row, Col, Form, Container, Button } from "react-bootstrap";
import SimpleFormLayout from '../components/generics/SimpleFormLayout'
import React from 'react'
import { Router } from '../config/routes'
import fetch from 'isomorphic-unfetch'
import cookie from 'js-cookie'

const buildErrorState = errorMsg => ({
  showAlert: true,
  alertMsg: errorMsg,
  submitSuccess: false
})

export default class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      showAlert: false,
      alertMsg: '',
      submitSuccess: false
    }
    this.onUsernameChange = this.onUsernameChange.bind(this)
    this.onPasswordChange = this.onPasswordChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onAlertClose = this.onAlertClose.bind(this)
  }

  onUsernameChange(event) {
    this.setState({
      username: event.target.value
    })
  }

  onPasswordChange(event) {
    this.setState({
      password: event.target.value
    })
  }

  async onSubmit(event) {
    event.preventDefault()

    try{
      const response = await fetch(`${process.env.CLIENT_API_HOST}/authenticate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password
        })
      })

      if (response.ok) {
        const payload = await response.json()
        cookie.set('token', payload.token, {
          expires: 1,
          path: '/'
        })
        Router.pushRoute('/')
      } else {
        this.setState(buildErrorState('Usuario/Senha incorretos'))
      }
    } catch(err) {
      this.setState(buildErrorState('Erro ao realizar login'))
    }
  }

  onAlertClose() {
    this.setState({
      showAlert: false
    })
  }

  render() {
    return (
      <Container>
        <Row className="justify-content-center">
          <Col xs={10} md={9} lg={6}>
            <SimpleFormLayout
              formLabel="Login"
              showAlert={this.state.showAlert}
              formSubmitSuccess={this.state.submitSuccess}
              onAlertClose={this.onAlertClose}
              alertMsg={this.state.alertMsg}
              onSubmit={this.onSubmit}
            >
              <Form.Group controlId="formName">
                <Form.Label>Usuário</Form.Label>
                <Form.Control
                  type="text"
                  value={this.state.username}
                  placeholder="Informe o usuário"
                  onChange={this.onUsernameChange}
                />
              </Form.Group>
              <Form.Group controlId="formDate">
                <Form.Label>Senha</Form.Label>
                <Form.Control
                  type="password"
                  value={this.state.password}
                  onChange={this.onPasswordChange}
                />
              </Form.Group>
              <Row>
                <Col className="text-center">
                  <Button className="w-25" variant="primary" type="submit">
                    Login
                  </Button>
                </Col>
              </Row>
            </SimpleFormLayout>
          </Col>
        </Row>
      </Container>
    )
  }
}
