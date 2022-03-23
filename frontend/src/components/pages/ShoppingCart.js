import React from 'react';
import { connect } from 'react-redux';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Helmet } from 'react-helmet-async';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import MessageBox from '../MessageBox';
import Button from 'react-bootstrap/Button';

import {
  addItemToCart,
  subtractItemFromCart,
  removeItemFromCart,
} from '../../actions';

const ShoppingCart = ({
  cart,
  addItemToCart,
  subtractItemFromCart,
  removeItemFromCart,
}) => {
  const navigate = useNavigate();
  const displayCartItems = (items) => {
    if (items.length === 0) {
      return (
        <MessageBox>
          Cart is Empty.
          <Link to="/">Go Shoping</Link>
        </MessageBox>
      );
    } else {
      return (
        <ListGroup>
          {items.map((item) => (
            <ListGroup.Item key={item._id}>
              <Row className="align-items-center">
                <Col md={4}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="img-fluid rounded img-thumbnail"
                  />{' '}
                  <Link to={`/product/${item.slug}`}>{item.name}</Link>
                </Col>
                <Col md={3}>
                  <Button
                    variant="light"
                    disabled={item.quantity === 1}
                    onClick={() => {
                      subtractItemFromCart(item);
                    }}
                  >
                    <i className="fas fa-minus-circle" />
                  </Button>
                  <span> {item.quantity} </span>
                  <Button
                    variant="light"
                    disabled={item.quantity === item.countInStock}
                    onClick={() => {
                      addItemToCart(item);
                    }}
                  >
                    <i className="fas fa-plus-circle" />
                  </Button>
                </Col>
                <Col md={3}>${item.price}</Col>
                <Col md={2}>
                  <Button onClick={() => removeItemFromCart(item)}>
                    <i className="fas fa-trash" />
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      );
    }
  };

  const checkoutCart = () => {
    navigate('/signin?redirect=/shipping');
  };

  return (
    <div>
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>
      <h1>Shopping Cart</h1>
      <Row>
        <Col md={8}>{displayCartItems(cart.cartItems)}</Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>
                    Subtotal (
                    {cart.cartItems.reduce((a, c) => a + c.quantity, 0)} items)
                    : $
                    {cart.cartItems.reduce(
                      (a, c) => a + c.price * c.quantity,
                      0
                    )}
                  </h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      type="button"
                      variant="primary"
                      onClick={checkoutCart}
                      disabled={cart.cartItems.length === 0}
                    >
                      Proceed to Checkout
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    cart: state.cartReducer,
  };
};

export default connect(mapStateToProps, {
  addItemToCart,
  subtractItemFromCart,
  removeItemFromCart,
})(ShoppingCart);
