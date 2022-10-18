import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
const linkStyle = {
  textDecoration: 'none',
  color: 'white'
}
const Header = ({ user, handleLogOut }) => (
  <Navbar
    collapseOnSelect
    expand="lg"
    bg="dark"
    variant="dark"
    className='"navbar-static-top"'
  >
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link href="#" as="span">
          <Link to="/" style={linkStyle}>
            Blogs
          </Link>
        </Nav.Link>
        <Nav.Link href="#" as="span">
          <Link to="/users" style={linkStyle}>
            Users
          </Link>
        </Nav.Link>

        {user ? (
          <NavDropdown
            title={`Logged in as ${user.name}`}
            id="basic-nav-dropdown"
          >
            <NavDropdown.Item href="#" onClick={handleLogOut}>
              Log Out
            </NavDropdown.Item>
          </NavDropdown>
        ) : (
          <Nav.Link href="#" as="span">
            <em>Not Logged In</em>
          </Nav.Link>
        )}
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
