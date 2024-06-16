import React from 'react'
import { Link, NavLink } from 'react-router-dom';

function Header() {
  return (
    <header>

        <Link to='/' className = 'logo'>
            Diary
        </Link>

        <nav>
            <NavLink to="/"> Home </NavLink>
            <NavLink to="/books"> Books </NavLink>
            <NavLink to="/about"> About </NavLink>
        </nav>
    </header>
  )
}

export default Header
