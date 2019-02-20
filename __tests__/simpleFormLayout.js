import { shallow } from 'enzyme'
import SimpleFormLayout from '../components/generics/SimpleFormLayout'

describe('"SimpleFormLayout" test suite', () => {
  it('render children', () => {
    const child = (
      <div>
        <span>Child Component</span>
      </div>
    )
    const form = (
      <SimpleFormLayout>
        { child }
      </SimpleFormLayout>
    )

    const app = shallow(form)
    expect(app.contains(child)).toBeTruthy()
  })

  it('must show alert', () => {
    const alertMsg = 'alert jest test message'
    const form = (
      <SimpleFormLayout
        showAlert="true"
        alertMsg={alertMsg}
        onAlertClose={() => {}}
      />
    )

    const app = shallow(form)
    expect(app.contains(alertMsg)).toBeTruthy()
  })
})
