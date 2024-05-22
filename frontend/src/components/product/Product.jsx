import React, { useEffect, useState } from "react";
import { Form, Row, Col, Image, ListGroup, Button } from "react-bootstrap";
import Rating from "./Rating";
import { useDispatch } from "react-redux";
import { addToCart } from "../../services/store/slices/cartsSlice";

const Product = ({ product }) => {
    const [isInStock, setIsInStock] = useState(false);
    const dispatch = useDispatch();
    const [qty, setQty] = useState(1);
    useEffect(() => {
        if (product) {
            setIsInStock(product.quantity > 0);
        }
    }, [product]);

    const handleAddToCart = () => {
        dispatch(addToCart({ ...product, quantity: qty }));
    };

    return (
        <>
            {product && (
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
                                        <Rating productId={product._id} />
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Description: {product.description}
                            </ListGroup.Item>
                        </ListGroup>
                        <Row>
                            <Col md={6} className="mt-3 ms-auto">
                                <ListGroup>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Price:</Col>
                                            <Col>
                                                <strong>
                                                    ${product.price}
                                                </strong>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>Status:</Col>
                                            <Col
                                                className={
                                                    isInStock
                                                        ? "text-success"
                                                        : "text-danger"
                                                }
                                            >
                                                <strong>
                                                    {isInStock
                                                        ? "In Stock"
                                                        : "Out of Stock"}
                                                </strong>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    {isInStock && (
                                        <ListGroup.Item>
                                            <Row className="mb-3">
                                                <Col>Qty</Col>
                                                <Col>
                                                    <Form.Control
                                                        as="select"
                                                        value={qty}
                                                        onChange={(e) =>
                                                            setQty(
                                                                Number(
                                                                    e.target
                                                                        .value
                                                                )
                                                            )
                                                        }
                                                    >
                                                        {[
                                                            ...Array(
                                                                product.quantity
                                                            ).keys(),
                                                        ].map((x) => (
                                                            <option
                                                                key={x + 1}
                                                                value={x + 1}
                                                            >
                                                                {x + 1}
                                                            </option>
                                                        ))}
                                                    </Form.Control>
                                                </Col>
                                            </Row>
                                            <Button
                                                className="btn btn-outline-success w-100"
                                                type="button"
                                                onClick={handleAddToCart}
                                            >
                                                Add to Cart
                                            </Button>
                                        </ListGroup.Item>
                                    )}
                                </ListGroup>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            )}
        </>
    );
};

export default Product;
