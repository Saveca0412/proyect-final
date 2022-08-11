import React, { useState } from "react";
import { Navbar, Container, Nav, NavDropdown, Button, Offcanvas } from 'react-bootstrap';
import '../styles/navBar.css'
import user from '../images/user.png'
import cart from '../images/cart.png'
import home from '../images/home.png'
import shop from '../images/shop.png'
import Logout from '../images/logout.png'
import { useNavigate } from "react-router-dom";
import Cart from './Cart'

const NavBar = () => {
  const navigate = useNavigate();

  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    if (token) {
      setShow(true);
    } else {
      navigate("/login");
    }
  };

  const logout = () => {
    localStorage.setItem("token", "");
    navigate("/login");
  };

  const token = localStorage.getItem("token");



  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <div className='title'>
          <Navbar.Brand className='navbar' href="#/">
            <h2 className='title'> e-commerce</h2>
          </Navbar.Brand>
        </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link className='home' href="#/">
              <img className='home-img' src={home} alt="home" />
            </Nav.Link>
            <Nav.Link className='shop' href="#/Purchases">
              <img className='shop-img' src={shop} alt="shop" />
            </Nav.Link>
            {token ? (
              <Nav.Link className='logout' as={Button} onClick={logout}>
                <img className='logout-img' src={Logout} alt="logout" />
              </Nav.Link>
            ) : (
              <Nav.Link className='login' href="#/Login">
                <img className='login-img' src={user} alt="login" />
              </Nav.Link>
            )}
            <Nav.Link className="cart" as={Button} onClick={handleShow}>
            <img className='cart-img' src={cart} alt="cart" />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
      <Cart show={show} handleClose={handleClose} />
    </Navbar>
  );
};

export default NavBar;