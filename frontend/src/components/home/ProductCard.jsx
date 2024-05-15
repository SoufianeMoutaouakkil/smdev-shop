import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "../product/Rating";

const ProductCard = ({ product }) => {
  return (
    <Card
      className="my-3 p-3 rounded d-flex flex-column"
      style={{ height: "95%" }}
    >
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant="top" />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div" className="product-title">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="div">
          <div className="mt-3">
            {/* <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
            /> */}
          </div>
        </Card.Text>
      </Card.Body>
      <Card.Text as="h3" className="mt-auto">
        ${product.price}
      </Card.Text>
    </Card>
  );
};

export default ProductCard;
