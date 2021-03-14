import React from 'react'
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../../actions';

const Header = (props) => {

    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const signout = () => {
        dispatch(signOut());
    }

    const renderLoggedInUser = () => {
        return(
            <Nav>
                <li className="nav-item">
                    <span className="nav-link" onClick={signout}>Sign Out</span>
                </li>
            </Nav>
        )
    }

    const renderNotLoggetInUser = () => {
        return(
            <Nav>
                <li className="nav-item">
                    <NavLink to="signIn" className="nav-link">Sign In</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="signUp" className="nav-link">Sign Up</NavLink>
                </li>
            </Nav>
        )
    }

    return (
        <div>
           <Navbar fixed="top" collapseOnSelect expand="lg" bg="dark" variant="dark" style={{zIndex: 1}}>
            <Container fluid>
                {/* <Navbar.Brand href="#home">Admin Dashboard</Navbar.Brand> */}
                <Link to="/" className="navbar-brand">Admin Dashboard</Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                    {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown> */}
                    </Nav>
                </Navbar.Collapse>
                {auth.authenticate ? renderLoggedInUser() : renderNotLoggetInUser()}
            </Container>
            </Navbar> 
        </div>
    )
}

export default Header;
