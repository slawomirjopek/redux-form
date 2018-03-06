import React from 'react'
import PropTypes from 'prop-types'
import { Select } from 'antd'
import 'antd/lib/select/style/css'
import c from './singleSelect.scss'

const Option = Select.Option

export default class SingleSelect extends React.Component {
  static propTypes = {
    options: PropTypes.arrayOf(
      PropTypes.shape({
        disabled: PropTypes.bool,
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
      })
    ),
    input: PropTypes.shape({
      name: PropTypes.string,
      onChange: PropTypes.func,
      onBlur: PropTypes.func,
    }),
    disabled: PropTypes.bool,
    selectedValue: PropTypes.string,
    placeholder: PropTypes.string,
  }

  static defaultProps = {
    options: [],
    disabled: false,
    selectedValue: '',
    showArrow: true,
    mode: '',
    filterOption: true,
    placeholder: '',
    input: {
      name: '',
      onChange: () => {},
      onBlur: () => {},
    },
  }

  onChange = value => {
    const { input } = this.props
    if (!!input) {
      const { onChange } = input
      onChange && onChange(value)
    }
  }

  onBlur = () => {
    const { input } = this.props
    if (!!input) {
      const { onBlur, value } = input
      onBlur && onBlur(value)
    }
  }

  render () {
    const {
      selectedValue,
      options,
      disabled,
      input,
      mode,
      filterOption,
      placeholder,
    } = this.props

    return (
      <div className={c.wrapper}>
        <Select
          {...input}
          size='large'
          disabled={disabled}
          className={c.select}
          onBlur={this.onBlur}
          onChange={this.onChange}
          defaultValue={selectedValue}
          showArrow={true}
          mode={mode}
          filterOption={filterOption}
          placeholder={placeholder}
        >
          {options.map(({ label, value, disabled }) =>
            <Option
              key={value}
              value={value}
              disabled={disabled}
              className={c.option}
            >{label}
            </Option>
          )}
        </Select>
      </div>
    )
  }
}
