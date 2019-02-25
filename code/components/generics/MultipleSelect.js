import { Form, Row, Col, Button, Badge } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const createOptionsSelectList = (selectListData, selectValueKey, selectLabelKey) => (
  selectListData.map((data) => (
    <option 
      key={data[selectValueKey]}
      value={data[selectValueKey]}>
      { data[selectLabelKey] }
    </option>
  ))
)

const createSelectedDataListGroupItems = (selectedData, selectValueKey, selectLabelKey, onRemove) => (
  selectedData.map(data => (
    <h5 
      key={data[selectValueKey]}
      className="d-sm-inline-block mr-sm-2"
    >
      <Badge pill variant="secondary">
        <span className="pr-2">{ data[selectLabelKey] }</span>
        <span onClick={onRemove} data-id={data[selectValueKey]} className="remove">
          <FontAwesomeIcon icon="times-circle" pointerEvents="none" size="lg" />
        </span>
      </Badge>
      <style jsx>{`
        :global(.remove) {
          cursor: pointer;
        }
      `}</style>
    </h5>
  ))
)

const MultipleSelect = (props) => (
  <div>
    <Form.Group>
      <Form.Label>{props.label}</Form.Label>
      <Row>
        <Col className="pb-2">
          {createSelectedDataListGroupItems(
            props.selectedData, props.selectedDataValueKey, props.selectedDataLabelKey, props.onRemove
          )}
        </Col>
      </Row>
      <Row>
        <Col xs="auto" className="flex-fill pt-2 pt-sm-0">
          <Form.Control
            as="select"
            value={props.value}
            onChange={props.onValueChange}
          >
            <option value={props.defaultSelectValue}>{props.defaultSelectLabel}</option>
            {createOptionsSelectList(props.selectList, props.selectValueKey, props.selectLabelKey)}
          </Form.Control>
        </Col>
        <Col className="pt-2 pt-sm-0" xs="auto">
          <Button
            className="float-right"
            variant="secondary"
            onClick={props.onAddValue}
          >
            {props.addValueLabel}
          </Button>
        </Col>
      </Row>
    </Form.Group>
  </div>
)

export default MultipleSelect
