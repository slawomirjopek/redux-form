import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import c from './InputLanguage.scss'
import Tooltip from '../Tooltip'

const LangLabel = ({ label, code, current, onClick }) => (
  <span
    className={cn(c.label, {
      [c.current]: current,
    })}
    lang={code}
    onClick={onClick}
  >{label}</span>
)

export default class InputLanguage extends React.Component {
  static propTypes = {
    lang: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        code: PropTypes.string.isRequired,
        active: PropTypes.bool.isRequired,
        current: PropTypes.bool.isRequired,
      })
    ),
    onClick: PropTypes.func,
  }

  static defaultProps = {
    lang: [],
    onClick: () => {},
  }

  onClick = e => {
    const {
      onClick,
    } = this.props

    onClick && (e.target.lang ? onClick(e.target.lang) : onClick())
  }

  render () {
    const {
      lang,
    } = this.props

    return (
      <div className={c.wrapper}>
        <Tooltip title='ADD TRANSLATIONS'>
          <span className={cn(c.icon, c.iconInfo)}/>
        </Tooltip>

        <div className={c.lang}>
          <span className={cn(c.icon, c.iconActive)}></span>
          {lang.map(({ label, code, active, current }, i) => (
            active &&
              <LangLabel
                key={`${label}-${i}`}
                label={label}
                code={code}
                current={current}
                onClick={this.onClick}
              />
          ))}
        </div>

        <div className={c.lang}>
          <span className={cn(c.icon, c.iconInactive)}></span>
          {lang.map(({ label, code, active, current }, i) => (
            !active &&
              <LangLabel
                key={`${label}-${i}`}
                label={label}
                code={code}
                current={current}
                onClick={this.onClick}
              />
          ))}
        </div>
      </div>
    )
  }
}
