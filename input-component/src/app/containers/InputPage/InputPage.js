import React from 'react'
import { reduxForm, Field } from 'redux-form'
import { InputComponent } from "../../components/Input/Input"

const c = require('./inputPage.scss')

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

class InputPageComponent extends React.Component {
  render() {
    return (
      <div>
        <h1 className={c.pageTitle}>InputPage</h1>

        <Field
          label={{
            label: 'first field',
            position: 'left',
          }}
          name="fieldOne"
          component={InputComponent}
          type="text"
          placeholder="any values"
          onChange={() => console.log('change')}
        />

        <div>
          <button
            type="submit"
          >Submit</button>
        </div>
      </div>
    )
  }
}

export const InputPage = reduxForm({
  form: "InputPageForm",
  validate: validation,
  initialValues: {
    fieldOne: 'Default value'
  }
})(InputPageComponent)

