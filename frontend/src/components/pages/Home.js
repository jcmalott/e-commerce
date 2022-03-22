import React, { useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchRequest, fetchFail, fetchSuccess } from '../../actions';
import ProductCard from '../ProductCard';

const Home = ({ productsRequest, fetchRequest, fetchFail, fetchSuccess }) => {
  const { products, loading, error } = productsRequest;

  useEffect(() => {
    (async () => {
      fetchRequest();
      await axios
        .get('/api/products')
        .then((res) => {
          // setProducts(res.data);
          fetchSuccess(res.data);
        })
        .catch((err) => {
          fetchFail(err.message);
        });
    })();
  }, []);

  return (
    <div className="home">
      <h1>Featured Products</h1>
      <div className="products">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    productsRequest: state.requestReducer,
  };
};

export default connect(mapStateToProps, {
  fetchRequest,
  fetchFail,
  fetchSuccess,
})(Home);
