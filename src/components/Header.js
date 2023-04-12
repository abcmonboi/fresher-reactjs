import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../assets/images/logo192.png";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Header = (props) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    toast.success("Logout success");
  };
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <img
            src={logo}
            style={{
              marginRight: "10px",
            }}
            alt="logo"
            width="40"
            height="40"
            className="d-inline-block"
          ></img>
          <Navbar.Brand>
            {" "}
            <NavLink to="/" className="nav-link">
              {"Practice"}
            </NavLink>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink to="/" className="nav-link" activeclassname="active">
                Home
              </NavLink>
              <NavLink
                to="/users"
                className="nav-link"
                activeclassname="active"
              >
                Manage User
              </NavLink>
            </Nav>
            <Nav>
              <NavDropdown title="Settings" id="basic-nav-dropdown">
                  <NavLink                
                    to="/login"
                    className="dropdown-item"
                  >
                    Login
                  </NavLink>
                <NavDropdown.Item onClick={() => handleLogout()}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
