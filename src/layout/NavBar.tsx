import { Outlet } from 'react-router-dom'

const NavBar = () => {
  return (
    <nav>
        <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/budget-app">Budget-App</a></li>
        </ul>
        <Outlet />
    </nav>
  )
}

export default NavBar
