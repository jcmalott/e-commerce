import React from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

import Rating from './Rating';
import InStockButton from '../helper/InStockButton';

const ProductCard = ({ product }) => {
  return (
    <Card>
      <Link to={`/product/${product.slug}`}>
        <img className="card-img-top" src={product.image} alt={product.name} />
      </Link>
      <Card.Body>
        <Link to={`/product/${product.slug}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <Card.Text>${product.price}</Card.Text>
        {/* if item is in stock then display add to cart button */}
        <InStockButton count={product.countInStock} />
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
