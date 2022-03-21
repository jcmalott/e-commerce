import React from "react";
import { useParams } from "react-router-dom";

const Product = () => {
  const params = useParams();
  const { slug } = params;

  return <div>{slug}</div>;
};

export default Product;
