import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';
import Nav from 'react-bootstrap/Nav';
import Badge from 'react-bootstrap/Badge';
import { signoutUser } from '../actions';

const Header = ({ cart, signin, signoutUser }) => {
  const signoutHandler = () => {
    signoutUser();
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>E-Commerce</Navbar.Brand>
          </LinkContainer>
          <Nav className="me-auto">
            <Link to="/cart" className="nav-link">
              Cart
              {cart.cartItems.length > 0 && (
                <Badge pill bg="danger">
                  {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                </Badge>
              )}
            </Link>
            {signin.userInfo ? (
              <NavDropdown title={signin.userInfo.name} id="basic-nav-dropdown">
                <LinkContainer to="/profile">
                  <NavDropdown.Item>User Profile</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/orderHistory">
                  <NavDropdown.Item>Order History</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Divider />
                <Link
                  className="dropdown-item"
                  to="#signout"
                  onClick={signoutHandler}
                >
                  Sign Out
                </Link>
              </NavDropdown>
            ) : (
              <Link className="nav-link" to="/signin">
                Sign In
              </Link>
            )}
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
};

const mapStateToProps = (state) => {
  return {
    cart: state.cartReducer,
    signin: state.signinReducer,
  };
};

export default connect(mapStateToProps, { signoutUser })(Header);
