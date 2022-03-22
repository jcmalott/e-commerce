import React, { useEffect } from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
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
          <Row>
            {products.map((product) => (
              <Col sm={6} md={4} lg={3} className="mb-3" key={product.slug}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
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
