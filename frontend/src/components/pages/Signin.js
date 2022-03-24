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

const Signin = ({ signinUser, signin }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const redirect = searchParams.get('redirect');
  const page = redirect ? redirect : '/';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (signin.userInfo) {
      navigate(page);
    }
  }, [navigate, page, signin.userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    await axios
      .post('/api/users/signin', {
        email,
        password,
      })
      .then((res) => {
        signinUser(res.data);
        localStorage.setItem('userInfo', JSON.stringify(res.data));
        navigate(page);
      })
      .catch((err) => {
        toast.error(getError(err));
      });
  };

  return (
    <Container className="small-container">
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <h1 className="my-3">Sign In</h1>
      <Form onSubmit={submitHandler}>
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
        <div className="mb-3">
          <Button type="submit">Sign In</Button>
        </div>
        <div className="mb-3">
          New Customer?{' '}
          <Link to={`/signup?redirect=${page}`}>Create you account</Link>
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

export default connect(mapStateToProps, { signinUser })(Signin);
