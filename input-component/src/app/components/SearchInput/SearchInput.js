import * as React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import SingleSelect from '../SingleSelect/SingleSelect'
import c from './searchInput.scss'

export default class SearchInput extends React.Component {
  static propTypes = {
    options: PropTypes.arrayOf(
      PropTypes.shape({
        disabled: PropTypes.bool,
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
      })
    ),
    placeholder: PropTypes.string,
    meta: PropTypes.shape({
      error: PropTypes.node,
      touched: PropTypes.bool,
    }),
  }

  static defaultProps = {
    options: [],
    placeholder: '',
    meta: {
      error: '',
      touched: false,
    },
    classes: {
      wrapper: '',
      button: '',
    }
  }

  render () {
    const {
      input,
      options,
      placeholder,
      meta: {
        error,
        touched,
      },
      classes,
    } = this.props

    return (
      <div className={cn(c.wrapper, classes.wrapper)}>
        <div className={c.selectContainer}>
          <SingleSelect
            input={input}
            className={c.select}
            options={options}
            mode='combobox'
            size='large'
            placeholder={placeholder}
            filterOption={false}
          />

          <button
            className={cn(c.searchIcon, classes.button)}
            type='submit'
          />
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
