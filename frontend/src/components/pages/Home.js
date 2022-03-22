import React, { useEffect } from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { connect } from 'react-redux';

import { fetchRequest, fetchFail, fetchSuccess } from '../../actions';
import ProductCard from '../ProductCard';
import { Helmet } from 'react-helmet-async';

/**
 * Display products from server to site.
 *
 * @param productsRequest products: products stored in server, loading: true if request successed; false otherwise
 * @returns products to display
 */
const Home = ({ productsRequest, fetchRequest, fetchFail, fetchSuccess }) => {
  const { result, loading, error } = productsRequest;

  // gets products from server
  useEffect(() => {
    (async () => {
      fetchRequest();
      await axios
        .get('/api/products')
        .then((res) => fetchSuccess(res.data))
        .catch((err) => fetchFail(err.message));
    })();
  }, []);

  // display products to site
  return (
    <div className="home">
      <Helmet>
        <title>E-Commerce</title>
      </Helmet>
      <h1>Featured Products</h1>
      <div className="products">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <Row>
            {result.map((product) => (
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
