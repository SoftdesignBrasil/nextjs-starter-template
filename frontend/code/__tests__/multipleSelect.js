import { shallow } from 'enzyme'
import MultipleSelect from '../components/generics/MultipleSelect'

const createMockSelectList = () => {
  const mockList = []
  for(let i = 1; i <= 10; i++) {
    mockList.push({
      value: i,
      label: `Value ${i}`
    })
  }
  return mockList
}

const createMockSelectedData = () => {
  const mockData = []
  for(let i = 1; i <= 4; i++) {
    mockData.push({
      value: i,
      label: `Data ${i}`
    })
  }
  return mockData
}

describe('"MultipleSelect" test suite', () => {
  it('must render select list data', () => {
    const defaultOption = 'default'
    const selectListDataMock = createMockSelectList()

    const component = (
      <MultipleSelect
        defaultSelectValue={defaultOption} defaultSelectLabel={defaultOption}
        selectList={selectListDataMock} selectValueKey="value" selectLabelKey="label"
        selectedData={createMockSelectedData()} selectedDataValueKey="value" selectedDataLabelKey="label"
      />
    )

    const app = shallow(component)
    expect(app.find('option').length).toEqual(selectListDataMock.length + 1)
    expect(app.find(`option[value="${defaultOption}"]`).length).toEqual(1)
  })

  it('must render selected data', () => {
    const selectDataMock = createMockSelectedData()
    const component = (
      <MultipleSelect
        selectList={createMockSelectList()} selectValueKey="value" selectLabelKey="label"
        selectedData={selectDataMock} selectedDataValueKey="value" selectedDataLabelKey="label"
      />
    )

    const app = shallow(component)
    const renderedSelectedData = app.findWhere((shallowElem) => (
      selectDataMock.some(dataMock => shallowElem.prop('children') === dataMock.label)
    ))
    expect(renderedSelectedData.length).toEqual(selectDataMock.length)
  })
})
