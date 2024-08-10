// src/components/ProductList.js
import React from 'react';
import { useGetProductsQuery, useDeleteProductMutation } from '../products/productApi';
import ProductForm from './ProductForm';

const ProductList = () => {

  const { data: products, error, isLoading, refetch } = useGetProductsQuery();
  const [deleteProduct] = useDeleteProductMutation();

  const [selectedProduct, setSelectedProduct] = React.useState(null);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleFormSubmit = () => {
    setSelectedProduct(null);
    refetch();
  };

  return (
    <div className="container mt-4">
      <ProductForm product={selectedProduct} onFormSubmit={handleFormSubmit} />
      <table className="table table-bordered mt-4">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.description}</td>
              <td>
                <button
                  className="btn btn-warning me-2"
                  onClick={() => setSelectedProduct(product)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteProduct(product._id).then(() => refetch())}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
