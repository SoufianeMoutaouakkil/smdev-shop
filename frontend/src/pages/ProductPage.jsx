import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Image, ListGroup, Button } from "react-bootstrap";
import products from "../products";
import { Link } from "react-router-dom";
import Product from "../components/product/Product";
import NotFoundProduct from "../components/product/NotFoundProduct";

const ProductPage = () => {
  // get the id from the URL as integer
  const id = parseInt(useParams().id);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const product = products.find((p) => {
      console.log({ id, pId: p._id });
      console.log({ "id === p._id": id === p._id });
      return id === p._id;
    });
    setProduct(product);
    console.log({ products });
  }, [id]);

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
