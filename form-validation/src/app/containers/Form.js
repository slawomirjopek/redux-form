import React from "react"
import {reduxForm, Field} from "redux-form"

const validation = values => {
  const errors = {}

  if (!values.fieldOne) {
    errors.fieldOne = "Required"
  }

  if (!values.fieldTwo) {
    errors.fieldTwo = "Required"
  } else if (values.fieldTwo.length < 5) {
    errors.fieldTwo = "Min. length 5"
  }

  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.fieldThree)) {
    errors.fieldThree = "Invalid email"
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
    {touched &&
      (error && <span className="error">{error}</span>)
    }
  </div>
)

const Form = props => {
  const {
    handleSubmit,
    reset,
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

      <Field
        name="fieldTwo"
        component={field}
        type="text"
        placeholder="any values"
      />

      <Field
        name="fieldThree"
        component={field}
        type="email"
        placeholder="email"
      />

      <div>
        <button
          type="submit"
          disabled={pristine || submitting}
        >Submit</button>

        <button
          type="button"
          disabled={pristine || submitting}
          onClick={reset}
        >Reset</button>
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
