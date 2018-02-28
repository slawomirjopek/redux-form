import React from "react"
import {reduxForm, Field} from "redux-form"
import { InputComponent } from "../components/Input/Input"
import { SearchInput } from "../components/SearchInput/SearchInput"

const validation = values => {
  const errors = {
    fieldOne: [],
  }

  if (!values.fieldOne || !/[a-z]/g.test(values.fieldOne)) {
    errors.fieldOne.push('Field should contain at least one lowercase')
  }

  if (!values.fieldOne || !/[0-9]/g.test(values.fieldOne)) {
    errors.fieldOne.push('Field should contain at least one number')
  }

  if (!errors.fieldOne.length) {
    errors.fieldOne = ''
  }

  return errors
}

class Form extends React.Component {
  constructor() {
    super()

    this.state = {
      touched: false,
      inputValue: 'defaultValue',
    }
  }

  makeTouched = () => this.setState({ touched: true })

  updateValue = ({ target: { value } }) => this.setState({ inputValue: value })

  render() {
    const {
      handleSubmit,
      submitting,
      pristine,
    } = this.props

    return (
      <form onSubmit={handleSubmit}>
        <Field
          label={{
            label: 'first field',
            position: 'left',
          }}
          name="fieldOne"
          component={InputComponent}
          type="text"
          placeholder="any values"
          onClick={() => console.log('click')}
        />

        <InputComponent
          label={{
            label: 'second field',
          }}
          input={{
            value: this.state.inputValue,
            name: 'fieldTwo',
            onClick: this.makeTouched,
            onChange: this.updateValue,
          }}
          meta={{
            error: ['Error1', 'Error2'],
            touched: this.state.touched,
          }}
          type="text"
          placeholder="any values"
        />

        <SearchInput
          data={[
            {
              value: 'value1',
              text: 'value1',
            },
            {
              value: 'value2',
              text: 'value2',
            },
          ]}
          input={{
            name: 'name',
            onChange: () => {},
            onBlur: () => {},
          }}
          placeholder='placeholder'
          meta={{
            error: 'Error',
            touched: false,
          }}
        />

        <Field
          input={{
            onBlur: () => { console.log('onBlur') },
            onChange: (value) => { console.log(value) },
          }}
          data={[
            {
              value: 'value1',
              text: 'value1',
            },
            {
              value: 'value2',
              text: 'value2',
            },
          ]}
          name="searchField"
          component={SearchInput}
          placeholder="Search..."
        />

        <div>
          <button
            type="submit"
            disabled={pristine || submitting}
          >Submit</button>
        </div>
      </form>
    )
  }
}

export default reduxForm({
  form: "SimpleForm",
  validate: validation,
  initialValues: {
    fieldOne: 'Default value redux-form'
  }
})(Form)
