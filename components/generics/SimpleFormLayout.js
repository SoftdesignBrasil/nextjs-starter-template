import { Form, Button, Alert, Col, Row, Container } from 'react-bootstrap'
import Link from 'next/link'

export default class SimpleFormLayout extends React.Component {
  render() {
    return (
      <Container className="pt-5">
        <Row>
          <Col>
            <Alert
              show={this.props.showAlert}
              variant={this.props.formSubmitSuccess ? 'success' : 'danger'}
              onClose={this.props.onAlertClose}
              dismissible={this.props.alertDismissible}
            >
              {this.props.alertMsg}
            </Alert>
          </Col>
        </Row>
        <Form onSubmit={this.props.onSubmit}>
          {this.props.children}
          <Row>
            <Col>
              <Link prefetch href={this.props.goBackHref}>
                <Button variant="secondary">
                  Voltar
                </Button>
              </Link>
            </Col>
            <Col>
              <Button className="float-right" variant="primary" type="submit">
                Salvar
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    )  
  }
}
