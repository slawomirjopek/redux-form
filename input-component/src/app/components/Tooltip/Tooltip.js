// @flow
import * as React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import 'antd/lib/tooltip/style/css'
import c from './tooltip.scss'
import { Tooltip as AntTooltip } from 'antd';

export default class Tooltip extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  }

  static defaultProps = {
    classes: {
      overlay: '',
    },
  }

  render () {
    const {
      title,
      children,
      classes,
    } = this.props

    return (
      <AntTooltip
        title={title}
        overlayClassName={cn(c.overlay, classes.overlay)}
      >
        {children}
      </AntTooltip>
    )
  }
}
