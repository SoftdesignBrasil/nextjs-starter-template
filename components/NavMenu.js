import { Navbar, Nav, NavDropdown } from 'react-bootstrap'

const NavMenu = (props) => (
  <Navbar bg="dark" variant="dark" expand="sm">
    <Navbar.Brand href="/">Employee Manager</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link href="/">Home</Nav.Link>
        <NavDropdown title="Employee" id="basic-nav-dropdown">
          <NavDropdown.Item href="/employee">New</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default NavMenu
