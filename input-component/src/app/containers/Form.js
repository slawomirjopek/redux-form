import React from "react"
import {reduxForm, Field} from "redux-form"
import { InputComponent } from "../components/Input/Input"

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
    }
  }

  makeTouched = () => this.setState({ touched: true })

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
            name: 'fieldTwo',
            defaultValue: 'Default value'
          }}
          meta={{
            error: ['Error1', 'Error2'],
            touched: this.state.touched,
          }}
          type="text"
          placeholder="any values"
          onClick={this.makeTouched}
          onChange={() => console.log('change!')}
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
