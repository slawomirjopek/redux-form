// @flow
import * as React from 'react'
import PropTypes from 'prop-types'
import SearchInput from '../SearchInput/SearchInput'
import c from './headerSearch.scss'

export default class HeaderSearch extends React.Component<Props> {
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
  }

  render () {
    return (
      <SearchInput
        {...this.props}
        classes={{
          wrapper: c.wrapper,
          button: c.searchIcon,
        }}
      />
    )
  }
}
