import React, { useEffect, useState } from "react";
import { Row, Col, Image, ListGroup, Button } from "react-bootstrap";
import Rating from "./Rating";

const Product = ({ product }) => {
  const [isInStock, setIsInStock] = useState(false);

  useEffect(() => {
    if (product) {
      setIsInStock(product.countInStock > 0);
    }
  }, [product]);

  return (
    <>
      {product && (
        <>
          <Row className="mb-3">
            <Col md={6} lg={3} className="mt-3 ms-auto">
              <ListGroup>
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                  <Row>
                    <Col>Status:</Col>
                    <Col className={isInStock ? "text-success" : "text-danger"}>
                      <strong>{isInStock ? "In Stock" : "Out of Stock"}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                {isInStock && (
                  <ListGroup.Item>
                    <Button
                      className="btn btn-outline-success w-100"
                      type="button"
                    >
                      Add to Cart
                    </Button>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Col>
          </Row>
          <Row>
            <Col md={12} lg={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={12} lg={6}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      Price: <strong>${product.price}</strong>
                    </Col>
                    <Col>
                      <Rating
                        value={product.rating}
                        text={`${product.numReviews} reviews`}
                      />
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  Description: {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default Product;
