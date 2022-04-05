import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { addShippingAddress } from '../../actions';
import CheckoutSteps from '../CheckoutSteps';

const ShippingAddress = ({ signin, shipping, addShippingAddress }) => {
  const [fullName, setFullName] = useState(
    shipping.shippingAddress.fullName || ''
  );
  const [address, setAddress] = useState(
    shipping.shippingAddress.address || ''
  );
  const [city, setCity] = useState(shipping.shippingAddress.city || '');
  const [postalCode, setPostalCode] = useState(
    shipping.shippingAddress.postalCode || ''
  );
  const [country, setCountry] = useState(
    shipping.shippingAddress.country || ''
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (!signin.userInfo) {
      navigate('/signin?redirect=/shipping');
    }
  }, [signin.userInfo, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    const shippingAddress = { fullName, address, city, postalCode, country };
    addShippingAddress(shippingAddress);
    navigate('/payment');
  };

  return (
    <div>
      <Helmet>
        <title>Shipping Address</title>
      </Helmet>
      <CheckoutSteps step1 step2 />
      <div className="container small-container">
        <h1 className="my-3">Shipping Address</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="fullName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="postalCode">
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="country">
            <Form.Label>Country</Form.Label>
            <Form.Control
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </Form.Group>
          <div className="mb-3">
            <Button variant="primary" type="submit">
              Continue
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    shipping: state.shippingReducer,
    signin: state.signinReducer,
  };
};

export default connect(mapStateToProps, { addShippingAddress })(
  ShippingAddress
);
