import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import Product from "../components/product/Product";
import NotFoundProduct from "../components/product/NotFoundProduct";
import { useDispatch, useSelector } from "react-redux";
import { getById } from "../services/store/apis/productsApi";
import Message from "../components/interactions/Message";
import Loader from "../components/interactions/Loader";

const ProductPage = () => {
    const id = useParams().id;
    const [product, setProduct] = useState(null);
    const dispatch = useDispatch();

    const fetchedProduct = useSelector((state) => state.productsApi?.getById);

    useEffect(() => {
        console.log("Fetching products");
        dispatch(getById({ id }));
    }, [dispatch, id]);

    useEffect(() => {
        console.log({ fetchedProduct });
        if (fetchedProduct?.data) {
            setProduct(fetchedProduct?.data);
        }
    }, [fetchedProduct]);

    return (
        <div>
            <Container>
                <Link to="/" className="btn btn-light my-3">
                    <i className="fas fa-arrow-left"></i> Go Back
                </Link>
                {fetchedProduct?.error && (
                    <Message variant="danger">{fetchedProduct.error}</Message>
                )}
                {fetchedProduct?.loading && <Loader />}
                {product && <Product product={product} />}
                {!product && <NotFoundProduct id={id} />}
            </Container>
        </div>
    );
};

export default ProductPage;
