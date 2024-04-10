import { NavLink, Outlet } from "react-router-dom";
import './navbar.css'
function Navbar() {
    return (
        <>
            <nav id="navbar">
                <NavLink to="/" className='navbar-header'>Home</NavLink>
                <div className="nav-items">
                    <NavLink to="/courses">Courses</NavLink>
                    <NavLink to="/enrolled">Enrolled</NavLink>
                    <NavLink to="/user">User</NavLink>
                </div>
            </nav>
            <main>
                <Outlet />
            </main>
        </>
    )
}

export default Navbar;