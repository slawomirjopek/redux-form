import React from 'react'
import { reduxForm, Field } from 'redux-form'

const c = require('./inputSelectPage.scss')

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

class InputSelectPageComponent extends React.Component {
  render() {
    return (
      <div>
        <h1 className={c.pageTitle}>InputSelectPage</h1>
      </div>
    )
  }
}

export const InputSelectPage = reduxForm({
  form: "InputSelectForm",
  validate: validation,
  initialValues: {
    fieldOne: 'Default value'
  }
})(InputSelectPageComponent)

