import { Card } from "react-bootstrap";
const Product = ({ product }) => {
  return (
    <Card
      className="my-3 p-3 rounded d-flex flex-column"
      style={{ height: "95%" }}
    >
      <a href={`/product/${product._id}`}>
        <Card.Img src={product.image} variant="top" />
      </a>
      <Card.Body>
        <a href={`/product/${product._id}`}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </a>
        <Card.Text as="div">
          <div className="mt-3">
            {product.rating} from {product.numReviews} reviews
          </div>
        </Card.Text>
      </Card.Body>
      <Card.Text as="h3"
        className="mt-auto"
      >${product.price}</Card.Text>
    </Card>
  );
};

export default Product;
