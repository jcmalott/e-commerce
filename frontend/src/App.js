import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './components/pages/Home';
import Product from './components/pages/Product';
import Header from './components/Header';
import Footer from './components/Footer';
import ShoppingCart from './components/pages/ShoppingCart';
import Signin from './components/pages/Signin';

const App = () => {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column min-vh-100">
        <ToastContainer position="bottom-center" limit={1} />
        <Header />
        <Container className="mt-3">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<ShoppingCart />} />
            <Route path="/product/:slug" element={<Product />} />
            <Route path="/signin" element={<Signin />} />
          </Routes>
        </Container>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
