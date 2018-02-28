import * as React from 'react'
import PropTypes from 'prop-types'
import { Select } from 'antd'
import c from './searchInput.scss'

const Option = Select.Option

export class SearchInput extends React.Component {
  static propTypes = {
    data: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
      })
    ),
    placeholder: PropTypes.string,
    meta: PropTypes.shape({
      error: PropTypes.node,
      touched: PropTypes.bool,
    }),
  }

  static defaultProps = {
    input: {
      name: '',
      onChange: () => {},
      onBlur: () => {},
    },
    data: [],
    meta: {
      error: '',
      touched: false,
    },
  }

  onChange = (value) => {
    const { input } = this.props
    if (!!input) {
      const { onChange } = input
      onChange(value)
    }
  }

  onBlur = () => {
    const { input } = this.props
    if (!!input) {
      const { onBlur, value } = input
      onBlur(value)
    }
  }

  render () {
    const {
      input,
      data,
      placeholder,
      meta: {
        error,
        touched,
      },
    } = this.props

    return (
      <div className={c.wrapper}>
        <div className={c.selectContainer}>
          <Select
            {...input}
            className={c.select}
            mode='combobox'
            size='large'
            placeholder={placeholder}
            filterOption={false}
            onBlur={this.onBlur}
            onChange={this.onChange}
          >
            {data.map(({ value, text }) =>
              <Option key={value}>{text}</Option>
            )}
          </Select>

          <span className={c.searchIcon}/>
        </div>

        {(error && touched) &&
          <div className={c.errorsContainer}>
            {error}
          </div>
        }
      </div>
    )
  }
}
