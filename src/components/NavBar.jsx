import React from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import '../styles/navBar.css'
import user from '../images/user.png'
import home from '../images/home.png'
import cart from '../images/cart.png'

const NavBar = () => {
    return (
        <Navbar bg="light" expand="lg">
      <Container>
        <div className='title'>
        <Navbar.Brand className='navbar' href="#/">
         <h2> e-commerce</h2>
        </Navbar.Brand>
        </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link className='home' href="#/">
              <img className='home-img' src={home} alt="home" />
            </Nav.Link>
            <Nav.Link className='login' href="#/Login">
              <img className='login-img' src={user} alt="login" />
            </Nav.Link>
            <Nav.Link className='cart' href="#/Purchases">
              <img className='cart-img' src={cart} alt="cart" />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    );
};

export default NavBar;