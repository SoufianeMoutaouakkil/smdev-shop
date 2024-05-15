import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
// import products from "../products";
import Product from "../components/home/ProductCard";
import { productsSearch } from "../services/store/slices/productsSlice";
import { useDispatch, useSelector } from "react-redux";
const HomePage = () => {
    const dispatch = useDispatch();
    const [products, setProducts] = useState([]);
    const fetchedProducts = useSelector((state) => state.products?.search);
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
                {products.map((product) => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={product} />
                    </Col>
                ))}
            </Row>
        </>
    );
};

export default HomePage;
