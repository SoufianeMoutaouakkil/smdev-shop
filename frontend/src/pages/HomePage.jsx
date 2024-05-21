import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/home/ProductCard";
import { search as productsSearch } from "../services/store/apis/productsApi";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/interactions/Loader";
import Message from "../components/interactions/Message";

const HomePage = () => {
    const dispatch = useDispatch();
    const [products, setProducts] = useState(null);
    const fetchedProducts = useSelector((state) => state.productsApi?.search);
    useEffect(() => {
        console.log("Fetching products");
        dispatch(productsSearch());
    }, [dispatch]);

    useEffect(() => {
        console.log({ fetchedProducts });
        if (fetchedProducts?.data) {
            setProducts(fetchedProducts?.data);
        }
    }, [fetchedProducts]);

    return (
        <>
            <h1>Latest Products</h1>
            <Row>
                {products && products.length === 0 && <Message>No products found</Message>}
                {fetchedProducts?.error && (
                    <Message variant="danger">{fetchedProducts.error}</Message>
                )}
                {fetchedProducts?.loading && <Loader />}
                {products && products.map((product) => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={product} />
                    </Col>
                ))}
            </Row>
        </>
    );
};

export default HomePage;
