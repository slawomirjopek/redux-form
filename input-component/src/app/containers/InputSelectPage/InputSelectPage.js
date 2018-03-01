import React from 'react'
import { reduxForm, Field } from 'redux-form'
import SingleSelect from '../../components/SingleSelect/SingleSelect'

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

        <div className={c.section}>
          <h3>redux-form</h3>

          <Field
            name='fieldOne'
            component={SingleSelect}
            options={[
              {
                label: 'test label enabled',
                value: '0',
              },
              {
                label: 'test label disabled',
                value: '1',
                disabled: true
              },
              {
                label: 'test label initially selected',
                value: '2',
              },
            ]}
            selectedValue='2'
            onChange={(v) => { console.log('onChange: ', v) }}
            onBlur={(v) => { console.log('onBlur: ', v) }}
          />
        </div>

        <div className={c.section}>
          <h3>standard</h3>

          <SingleSelect
            name='fieldOne'
            input={{
              onChange: (v) => { console.log('onChange: ', v) },
              onBlur: (v) => { console.log('onBlur: ', v) },
            }}
            options={[
              {
                label: 'test label enabled',
                value: '0',
              },
              {
                label: 'test label disabled',
                value: '1',
                disabled: true
              },
              {
                label: 'test label initially selected',
                value: '2',
              },
            ]}
            selectedValue='2'
          />
        </div>
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

