import * as React from 'react'
import PropTypes from 'prop-types'
import { Input as AntInput } from 'antd'
import InputLanguage from '../InputLanguage'
import cn from 'classnames'
import 'antd/lib/input/style/css'
import c from './TranslationInput.scss'
import { findIndex, propEq } from 'ramda'

export default class TranslationInput extends React.Component {
  static propTypes = {
    label: PropTypes.shape({
      label: PropTypes.string,
      position: PropTypes.oneOf(['top', 'left']),
    }),
    lang: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        code: PropTypes.string.isRequired,
        active: PropTypes.bool.isRequired,
        current: PropTypes.bool.isRequired,
      })
    ),
    id: PropTypes.string,
    placeholder: PropTypes.string,
    input: PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.string,
      onClick: PropTypes.func,
      onChange: PropTypes.func,
    }).isRequired,
    meta: PropTypes.shape({
      error: PropTypes.node,
      touched: PropTypes.bool,
    }),
    defaultLang: PropTypes.string.isRequired,
    theme: PropTypes.oneOf(['standard', 'theme-1']),
    langHidden: PropTypes.bool,
    onChangeLang: PropTypes.func,
  }

  static defaultProps = {
    label: {
      label: '',
      position: 'top',
    },
    lang: [],
    input: {
      value: '',
    },
    meta: {
      error: '',
      touched: false,
    },
    theme: 'standard',
    langHidden: true,
  }

  constructor(props) {
    super(props)

    this.state = {
      lang: props.lang,
      langHidden: props.langHidden,
    }
  }

  componentDidMount() {
    const {
      defaultLang,
    } = this.props

    this.setCurrentLang(defaultLang)
  }

  onChange = e => {
    const {
      input: {
        value,
        onChange,
      }
    } = this.props

    if (onChange) onChange(e.target.value || value)
  }

  onClick = () => {
    const {
      input: {
        value,
        onClick,
      }
    } = this.props

    this.showLang()

    if (onClick) onClick(value)
  }

  onChangeLang = lang => {
    const {
      onChangeLang,
    } = this.props

    this.setCurrentLang(lang)

    if (onChangeLang) onChangeLang(lang)
  }

  setCurrentLang = currentLang => {
    const {
      lang,
    } = this.state

    const index = findIndex(propEq('code', currentLang))(lang)

    const newLangState = lang.map((lang, i) => {
      lang.current = i === index
      return lang
    })

    this.setState({
      lang: newLangState,
    })
  }

  showLang = () => {
    this.setState({
      langHidden: false,
    })
  }

  render() {
    const {
      input,
      label: {
        label,
        position,
      },
      id,
      placeholder,
      theme,
      meta: {
        error,
        touched,
      },
    } = this.props

    const {
      lang,
      langHidden,
    } = this.state

    return (
      <div className={cn(c.container, {
        [c.containerRow]: position === 'left',
        [c.themeOne]: theme === 'theme-1',
      })}>
        <div
          htmlFor={id}
          className={c.label}
        >
          {label && label.length > 0 && <span className={c.labelText}>{label}</span>}
          {!langHidden &&
            <InputLanguage
              lang={lang}
              onClick={this.onChangeLang}
            />
          }
        </div>

        <div className={c.inputContainer}>
          <AntInput
            {...input}
            className={cn(c.input, {
              [c.inputError]: error && touched,
            })}
            placeholder={placeholder}
            onChange={this.onChange}
            onClick={this.onClick}
            type='text'
            size='large'
          />

          {(error && touched) &&
            <div className={c.errorsContainer}>
              {error}
            </div>
          }
        </div>
      </div>
    )
  }
}
