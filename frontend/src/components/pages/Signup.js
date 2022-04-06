import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import { signinUser } from '../../actions';
import { getError } from '../../utils';

const Signup = ({ signinUser, signin }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const redirect = searchParams.get('redirect');
  const page = redirect ? redirect : '/';
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (signin.userInfo) {
      navigate(page);
    }
  }, [navigate, page, signin.userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }

    await axios
      .post('/api/users/signup', {
        name,
        email,
        password,
      })
      .then((res) => {
        signinUser(res.data);
        localStorage.setItem('userInfo', JSON.stringify(res.data));
        navigate(page);
      })
      .catch((err) => {
        console.log('error');
        toast.error(getError(err));
      });
  };

  return (
    <Container className="small-container">
      <Helmet>
        <title>Sign Up</title>
      </Helmet>
      <h1 className="my-3">Sign Up</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control onChange={(e) => setName(e.target.value)} required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </Form.Group>
        <div className="mb-3">
          <Button type="submit">Sign Up</Button>
        </div>
        <div className="mb-3">
          Already have an account?{' '}
          <Link to={`/signup?redirect=${page}`}>Sign-In</Link>
        </div>
      </Form>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    signin: state.signinReducer,
  };
};

export default connect(mapStateToProps, { signinUser })(Signup);
