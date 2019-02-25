import { Form, Alert, Col, Row, Container } from 'react-bootstrap'

export default class SimpleFormLayout extends React.Component {
  constructor(props) {
    super(props)
    this.state = { timeoutId: 0 }
  }

  componentWillUnmount() {
    clearTimeout(this.state.timeoutId)
  }

  componentDidUpdate(prevProps) {
    const alertIsAboutToShow = (!prevProps.showAlert)
      && this.props.showAlert !== prevProps.showAlert

    if (alertIsAboutToShow) {
      const timeoutId = setTimeout(() => { this.props.onAlertClose() }, 5000)
      this.setState({ timeoutId })
    }
  }

  render() {
    return (
      <Container>
        <Row className="mb-5 mt-3">
          <Col>
            <h4 className="text-center">{this.props.formLabel}</h4>
          </Col>
        </Row>
        <Row>
          <Col>
            <Alert
              show={this.props.showAlert}
              variant={this.props.formSubmitSuccess ? 'success' : 'danger'}
              onClose={this.props.onAlertClose}
            >
              {this.props.alertMsg}
            </Alert>
          </Col>
        </Row>
        <Form onSubmit={this.props.onSubmit}>
          {this.props.children}
        </Form>
      </Container>
    )  
  }
}
