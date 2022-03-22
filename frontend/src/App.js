import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './components/pages/Home';
import Product from './components/pages/Product';
import Header from './components/Header';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:slug" element={<Product />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
