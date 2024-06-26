import { Link, Outlet } from 'react-router-dom'

const NavBar = () => {
  return (
    <div className="navbar-container">
      <nav className="sidebar">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/budget-app">Budget</Link></li>
        </ul>
      </nav>
      <div className="content">
        <Outlet />
      </div>
    </div>
  )
}

export default NavBar
