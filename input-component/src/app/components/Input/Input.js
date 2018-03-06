import React from 'react'
import PropTypes from 'prop-types'
import { Input as AntInput } from 'antd'
import cn from 'classnames'
import 'antd/lib/input/style/css'
import c from './input.scss'

export class InputComponent extends React.Component {
  static propTypes = {
    label: PropTypes.shape({
      label: PropTypes.string.isRequired,
      position: PropTypes.oneOf(['top', 'left']),
    }),
    type: PropTypes.oneOf(['text', 'number', 'password']),
    id: PropTypes.string,
    disabled: PropTypes.bool,
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
  }

  static defaultProps = {
    type: 'text',
    disabled: false,
    label: {
      label: '',
      position: 'top',
    },
    input: {
      value: '',
    },
    meta: {
      error: '',
      touched: false,
    },
  }

  onChange = () => {
    const {
      input: {
        value,
        onChange,
      }
    } = this.props

    if (onChange) onChange(value)
  }

  render() {
    const {
      input,
      label: {
        label,
        position,
      },
      type,
      id,
      disabled,
      placeholder,
      meta: {
        error,
        touched,
      },
    } = this.props

    return (
      <div className={cn(c.container, {
        [c.containerRow]: position === 'left',
      })}>
        {label &&
        <div
          htmlFor={id}
          className={c.label}
        >
          {label}
        </div>
        }

        <div className={c.inputContainer}>
          <AntInput
            {...input}
            id={id}
            className={cn(c.input, {
              [c.inputError]: error && touched,
            })}
            placeholder={placeholder}
            type={type}
            disabled={disabled}
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
