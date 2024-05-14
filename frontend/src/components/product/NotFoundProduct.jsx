import React from 'react';

const NotFoundProduct = ({id}) => {
    return (
        <div>
            <h1>Product Not Found</h1>
            <p>Sorry, the product with id {id} was not found.</p>
        </div>
    );
}

export default NotFoundProduct;
