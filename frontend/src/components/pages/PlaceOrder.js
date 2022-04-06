import React, { useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import { Helmet } from 'react-helmet-async';
import CheckoutSteps from '../CheckoutSteps';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

const PlaceOrder = ({ shipping, cart }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!shipping.paymentMethod) {
      navigate('/payment');
    }
  }, [shipping, navigate]);

  const displayCartItem = (item) => {
    return (
      <ListGroup.Item key={item._id}>
        <Row className="align-items-center">
          <Col md={6}>
            <img
              src={item.image}
              alt={item.name}
              className="img-fluid rounded img-thumbnail"
            ></img>{' '}
            <Link to={`/product/${item.slug}`}>{item.name}</Link>
          </Col>
          <Col md={3}>
            <span>{item.quantity}</span>
          </Col>
          <Col md={3}>$ {item.price}</Col>
        </Row>
      </ListGroup.Item>
    );
  };

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;
  cart.itemsPrice = round2(
    cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  );
  cart.shippingPrice = cart.itemsPrice > 100 ? round2(0) : round2(10);
  cart.taxPrice = round2(0.15 * cart.itemsPrice);
  cart.orderTotalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  const placeOrderHandler = async () => {};

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />
      <Helmet>
        <title>Preview Order</title>
      </Helmet>
      <h1 className="my-3">Preview Order</h1>
      <Row>
        <Col md={8}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Shipping</Card.Title>
              <Card.Text>
                <strong>Name: </strong> {shipping.shippingAddress.fullName}{' '}
                <br />
                <strong>Address: </strong> {shipping.shippingAddress.address},{' '}
                {shipping.shippingAddress.city},{' '}
                {shipping.shippingAddress.postalCode},{' '}
                {shipping.shippingAddress.country}
              </Card.Text>
              <Link to="/shipping">Edit</Link>
            </Card.Body>
          </Card>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Payment</Card.Title>
              <Card.Text>
                <strong>Method: </strong> {shipping.paymentMethod}{' '}
              </Card.Text>
              <Link to="/payment">Edit</Link>
            </Card.Body>
          </Card>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Items</Card.Title>
              <ListGroup variant="flush">
                {cart.cartItems.map((item) => displayCartItem(item))}
              </ListGroup>
              <Link to="/cart">Edit</Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Order Summary</Card.Title>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>$ {cart.itemsPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>$ {cart.shippingPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>$ {cart.taxPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong>Order Total</strong>
                  </Col>
                  <Col>
                    <strong>$ {cart.orderTotalPrice.toFixed(2)}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <div className="d-grid">
                  <Button
                    type="button"
                    onClick={placeOrderHandler}
                    disable={cart.cartItems.length === 0}
                  >
                    Place Order
                  </Button>
                </div>
              </ListGroup.Item>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    shipping: state.shippingReducer,
    cart: state.cartReducer,
  };
};

export default connect(mapStateToProps)(PlaceOrder);
