import { Form, Row, Col, Button, ListGroup } from 'react-bootstrap'

const createOptionsSelectList = (selectListData, selectValueKey, selectLabelKey) => (
  selectListData.map((data) => (
    <option 
      key={data[selectValueKey]}
      value={data[selectValueKey]}>
      { data[selectLabelKey] }
    </option>
  ))
)

const createSelectedDataListGroupItems = (selectedData, selectValueKey, selectLabelKey) => (
  selectedData.map(data => (
    <ListGroup.Item
      variant="info"
      key={data[selectValueKey]}
    >
      { data[selectLabelKey] }
    </ListGroup.Item>
  ))
)

const MultipleSelect = (props) => (
  <Form.Group controlId="formEmployeeList">
    <Form.Label>{ props.label }</Form.Label>
    <Row className="pb-2">
      <Col xs="auto" className="flex-fill">
        <Form.Control
          as="select"
          value={props.value}
          onChange={props.onValueChange}
        >
          <option value={props.defaultSelectValue}>{props.defaultSelectLabel}</option>
          {createOptionsSelectList(props.selectList, props.selectValueKey, props.selectLabelKey)}
        </Form.Control>
      </Col>
      <Col xs="auto">
        <Button
          className="float-right"
          variant="info"
          onClick={props.onAddValue}
        >
          {props.addValueLabel}
        </Button>
      </Col>
    </Row>
    <ListGroup>
      {createSelectedDataListGroupItems(
        props.selectedData, props.selectedDataValueKey, props.selectedDataLabelKey
      )}
    </ListGroup>
  </Form.Group>
)

export default MultipleSelect
