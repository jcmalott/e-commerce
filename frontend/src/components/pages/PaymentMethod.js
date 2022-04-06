import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import CheckoutSteps from '../CheckoutSteps';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

import { addPaymentMethod } from '../../actions';

const PaymentMethod = ({ shipping, addPaymentMethod }) => {
  const navigate = useNavigate();
  const [payMethodName, setPaymentMethod] = useState(
    shipping.paymentMethod || 'PayPal'
  );

  useEffect(() => {
    if (!shipping.shippingAddress.address) {
      navigate('/shipping');
    }
  }, [shipping.shippingAddress, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    addPaymentMethod(payMethodName);
    navigate('/placeorder');
  };

  return (
    <div>
      <CheckoutSteps step1 step2 step3 />
      <div className="container small-container">
        <Helmet>
          <title>PayMent Method</title>
        </Helmet>
        <h1 className="my-3">Payment Method</h1>

        <Form onSubmit={submitHandler}>
          <div className="mb-3">
            <Form.Check
              type="radio"
              id="PayPal"
              label="PayPal"
              value="PayPal"
              checked={payMethodName === 'PayPal'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <Form.Check
              type="radio"
              id="Stripe"
              label="Stripe"
              value="Stripe"
              checked={payMethodName === 'Stripe'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <Button type="submit">Continue</Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    shipping: state.shippingReducer,
  };
};

export default connect(mapStateToProps, { addPaymentMethod })(PaymentMethod);
