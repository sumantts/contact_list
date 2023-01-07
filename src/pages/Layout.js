import { Outlet, Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const Layout = () => {
  return (
    <>
      {/* Without page load nav bar start */}
      <Container>
      <nav  className="navbar navbar-expand-lg navbar-light bg-light">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          <li className="nav-item active">
            <Link className="nav-link" to="/blogs">Blogs</Link>
          </li>
          <li className="nav-item active">
            <Link className="nav-link" to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
      </Container>
      {/* Without page load nav bar end */}

      
      {/* With page load nav bar start */}
      {/* <Navbar bg="light" expand="lg">
      <Container>
        <Nav className="me-auto">
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/blogs">Blogs</Nav.Link>
        <Nav.Link href="/contact">Contact</Nav.Link>
        </Nav>
      </Container>
      </Navbar>       */}
      {/* With page load nav bar start */}

      <Outlet />
    </>
  )
};

export default Layout;