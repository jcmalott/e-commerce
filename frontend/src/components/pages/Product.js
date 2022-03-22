import axios from 'axios';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import { Helmet } from 'react-helmet-async';

import { fetchFail, fetchRequest, fetchSuccess } from '../../actions';
import Rating from '../Rating';
import InStockButton from '../../helper/InStockButton';
import LoadingWidget from '../LoadingWidget';
import MessageBox from '../MessageBox';

const Product = ({ productRequest, fetchRequest, fetchFail, fetchSuccess }) => {
  const params = useParams();
  const { slug } = params;
  const { result, loading, error } = productRequest;

  useEffect(() => {
    (async () => {
      fetchRequest();
      await axios
        .get(`/api/products/slug/${slug}`)
        .then((res) => fetchSuccess(res.data))
        .catch((err) => fetchFail(err));
    })();
  }, [slug]);

  return loading ? (
    <LoadingWidget />
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <Row>
      <Col md={6}>
        <img className="img-large" src={result.image} alt={result.name} />
      </Col>
      {displayDescription(result)}
      <Col md={3}>
        <Card>
          <Card.Body>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>{result.price}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    {result.countInStock > 0 ? (
                      <Badge bg="success">In Stock</Badge>
                    ) : (
                      <Badge bg="danger">Out Stock</Badge>
                    )}
                  </Col>
                </Row>
              </ListGroup.Item>

              {/* if item is in stock then display add to cart button */}
              <ListGroup.Item>
                <div className="d-grid">
                  {<InStockButton count={result.countInStock} />}
                </div>
              </ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

const displayDescription = (product) => {
  return (
    <Col md={3}>
      <ListGroup variant="flush">
        <ListGroup.Item>
          <Helmet>
            <title>{product.name}</title>
          </Helmet>
          <h1>{product.name}</h1>
        </ListGroup.Item>
        <ListGroup.Item>
          <Rating rating={product.rating} numReviews={product.numReviews} />
        </ListGroup.Item>
        <ListGroup.Item>Price: {product.price}</ListGroup.Item>
        <ListGroup.Item>Description: {product.description}</ListGroup.Item>
      </ListGroup>
    </Col>
  );
};

const mapStateToProps = (state) => {
  return {
    productRequest: state.requestReducer,
  };
};

export default connect(mapStateToProps, {
  fetchRequest,
  fetchFail,
  fetchSuccess,
})(Product);
