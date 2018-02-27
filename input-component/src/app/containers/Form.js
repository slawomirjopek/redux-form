import React from "react"
import {reduxForm, Field} from "redux-form"

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

const field = ({
  input,
  name,
  type,
  placeholder,
  meta: { touched, error }
}) => (
  <div className="field-container">
    <input {...input} placeholder={placeholder} type={type} />
    {touched && (
      error && error.map((error, i) => (
        <span
          className="error"
          key={`index-${i}`}
        >{error}</span>
      ))
    )}
  </div>
)

const Form = props => {
  const {
    handleSubmit,
    submitting,
    pristine,
  } = props

  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="fieldOne"
        component={field}
        type="text"
        placeholder="any values"
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

const handleSubmit = values => {
  console.log(values);
}

export default reduxForm({
  form: "SimpleForm",
  validate: validation,
  onSubmit: handleSubmit,
})(Form)
