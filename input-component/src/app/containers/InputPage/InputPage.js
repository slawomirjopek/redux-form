import React from 'react'
import { reduxForm, Field } from 'redux-form'
import { InputComponent } from '../../components/Input/Input'
import SearchInput from '../../components/SearchInput/SearchInput'

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

        <br/>

        <Field
          options={[
            {
              label: 'value1',
              value: 'value1',
            },
            {
              label: 'value2',
              value: 'value2',
            },
          ]}
          name="fieldTwo"
          component={SearchInput}
          placeholder="placeholder"
          onChange={() => console.log('change')}
        />
      </div>
    )
  }
}

export const InputPage = reduxForm({
  form: "InputPageForm",
  validate: validation,
  initialValues: {
    fieldOne: 'Default value',
    fieldTwo: 'Default value 2'
  }
})(InputPageComponent)

