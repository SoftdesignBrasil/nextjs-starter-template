import { Link } from '../../config/routes'
import { Row, Col, Button } from 'react-bootstrap'

const PrimarySecondaryBtn = (props) => (
  <Row className="pb-3">
    <Col>
      <Link prefetch route={props.goBackHref}>
        <Button variant="secondary">
          {props.secondaryLabel}
        </Button>
      </Link>
    </Col>
    <Col>
      <Button className="float-right" variant="primary" type="submit">
        {props.primaryLabel}
      </Button>
    </Col>
  </Row>
)

export default PrimarySecondaryBtn
