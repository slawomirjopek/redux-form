import React from 'react'
import { NavLink } from 'react-router-dom'

const c = require('./header.scss')

const Header = () => {
  return (
    <header className={c.wrapper}>
      <ul className={c.list}>
        <li className={c.listItem}>
          <NavLink to="/" activeClassName="active" className="nav-link" exact>Input</NavLink>
        </li>
        <li className={c.listItem}>
          <NavLink to="/input-select" activeClassName="active" className="nav-link" exact>Input Select</NavLink>
        </li>
      </ul>
    </header>
  )
};

export default Header;