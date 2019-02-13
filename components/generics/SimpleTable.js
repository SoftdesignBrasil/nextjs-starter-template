import { Table } from 'react-bootstrap'
import Link from 'next/link'

const createRowColumns = (dataObj, visibleProps, dataIdKey) => (
  visibleProps.map((visibleProp) => (
    <td key={`${dataObj[dataIdKey]}${visibleProp}`}>
        {dataObj[visibleProp]}
    </td>
  ))
)

const tableRowWithDetail = (rowColumns, rowUrl, rowKey) => (
  <Link key={rowKey} href={rowUrl}>
    <tr
      style={{ cursor: 'pointer' }}
    >
      {rowColumns}
    </tr>
  </Link>
)

const tableRow = (rowColumns, rowKey) => (
  <tr
    key={rowKey}
  >
    {rowColumns}
  </tr>
)

const createTableRow = (dataObj, visibleProps, dataIdKey, detailUrlKey) => {
  const rowColumns = createRowColumns(dataObj, visibleProps, dataIdKey)
  const rowKey = `${dataObj[dataIdKey]}`

  return detailUrlKey
    ? tableRowWithDetail(rowColumns, `${dataObj[detailUrlKey]}`, rowKey)
    : tableRow(rowColumns, rowKey)
}

const SimpleTable = (props) => {
  return (
    <Table
      hover={props.hover}
      striped={props.striped}
      responsive
      className={props.border ? 'table-bordered' : ''}
    >
      <thead>
        <tr>
            {
              props.tableHeaders.map((header, i) => (
                <th key={i}>
                    {header}
                </th>
              ))
            }
        </tr>
      </thead>
      <tbody>
        {
          props.data.map(
            (dataObj) => createTableRow(dataObj, props.visibleDataProps, props.dataIdKey, props.detailUrlKey)
          )
        }
      </tbody>
    </Table>
  )
}

export default SimpleTable
