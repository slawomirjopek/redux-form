import React from 'react'
import { reduxForm, Field, formValueSelector } from 'redux-form'
import { findIndex, propEq } from 'ramda'
import { InputComponent } from '../../components/Input/Input'
import { connect } from 'react-redux'
import SearchInput from '../../components/SearchInput/SearchInput'
import HeaderSearch from '../../components/HeaderSearch'
import TranslationInput from '../../components/TranslationInput'

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
  constructor() {
    super()

    this.state = {
      lang: [
        {label: 'EN', code: 'en', active: false, current: false},
        {label: 'FR', code: 'fr', active: false, current: false},
        {label: 'NL', code: 'nl', active: false, current: false},
      ],
      currentLang: 'en',
    }
  }

  getFieldName = () => `fieldName_${this.state.currentLang}`

  setLang = lang => this.setState({ currentLang: lang })

  onChangeLang = newLang => this.setLang(newLang)

  render() {
    return (
      <div>
        <h1 className={c.pageTitle}>InputPage</h1>

        <form onSubmit={this.props.handleSubmit}>
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
            name="fieldThree"
            component={HeaderSearch}
            placeholder="placeholder"
            onChange={() => console.log('change')}
          />

          <br/>

          <div className={c.padding}>
            <TranslationInput
              input={{
                name: 'name-en',
              }}
              lang={[
                {label: 'EN', code: 'en', active: false, current: false},
                {label: 'FR', code: 'fr', active: false, current: false},
                {label: 'NL', code: 'nl', active: false, current: false},
              ]}
              defaultLang='en'
              placeholder='theme: theme-1, label top'
              langHidden={false}
              theme='theme-1'
            />

            <br/>

            <TranslationInput
              input={{
                name: 'name-en',
              }}
              lang={[
                {label: 'EN', code: 'en', active: false, current: false},
                {label: 'FR', code: 'fr', active: false, current: false},
                {label: 'NL', code: 'nl', active: false, current: false},
              ]}
              defaultLang='en'
              placeholder='theme: theme-1, label top'
              langHidden={false}
            />

            <br/>

            <TranslationInput
              input={{
                name: 'name-en',
                onChange: value => { console.log('onChange: ', value) },
              }}
              lang={[
                {label: 'EN', code: 'en', active: false, current: false},
                {label: 'FR', code: 'fr', active: false, current: false},
                {label: 'NL', code: 'nl', active: false, current: false},
              ]}
              label={{
                label: 'label',
                position: 'left',
              }}
              defaultLang='en'
              placeholder='theme: theme-1, label top'
              langHidden={false}
              onClick={value => { console.log('onClick: ', value) }}
              onChangeLang={value => { console.log('onChangeLang: ', value) }}
            />

            <br/>

            <Field
              lang={this.state.lang}
              name={this.getFieldName()}
              component={TranslationInput}
              placeholder='placeholder'
              defaultLang='en'
              props={{
                onClick: () => { console.log('onClick') },
                onChangeLang: this.onChangeLang,
              }}
              onChange={() => { console.log('onChange') }}
              langHidden={false}
            />
          </div>
        </form>
      </div>
    )
  }
}

const selector = formValueSelector('InputPageForm')

const mapStateToProps = state => ({
  fields: selector(state, 'fieldName_en', 'fieldName_fr', 'fieldName_nl'),
})

export const InputPage = connect(mapStateToProps, {})(reduxForm({
  form: "InputPageForm",
  validate: validation,
  onSubmit: (v) => { console.log(v) },
  initialValues: {
    fieldOne: 'Default value',
    fieldTwo: 'Default value 2',
    fieldThree: 'Default value 3',
    fieldName_en: 'Default value EN',
  }
})(InputPageComponent))

