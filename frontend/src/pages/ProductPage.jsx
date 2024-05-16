import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import Product from "../components/product/Product";
import NotFoundProduct from "../components/product/NotFoundProduct";
import { useDispatch, useSelector } from "react-redux";
import { productsGetById } from "../services/store/slices/productsSlice";

const ProductPage = () => {
  const id = useParams().id;
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();

  const fetchedProducts = useSelector((state) => state.products?.getById);

  useEffect(() => {
    console.log("Fetching products");
    dispatch(productsGetById({id}));
  }, [dispatch, id]);

  useEffect(() => {
    console.log({ fetchedProducts });
    if (fetchedProducts?.data) {
      setProduct(fetchedProducts?.data);
    }
  }, [fetchedProducts]);

  return (
    <div>
      <Container>
        <Link to="/" className="btn btn-light my-3">
          <i className="fas fa-arrow-left"></i> Go Back
        </Link>
        {product && <Product product={product} />}
        {!product && <NotFoundProduct id={id} />}
      </Container>
    </div>
  );
};

export default ProductPage;
