// src/components/ProductForm.js
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useCreateProductMutation, useUpdateProductMutation } from '../products/productApi';

const ProductSchema = Yup.object().shape({
  name: Yup.string().required('Required name'),
  price: Yup.number().required('Required').positive('Must be positive'),
  description: Yup.string().required('Required'),
});

const ProductForm = ({ product, onFormSubmit }) => {

  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {

    console.log(`values `, values);
    console.log(`product `, product);

    if (product) {
      await updateProduct({ id: product._id, ...values });
    } else {
      await createProduct(values);
    }

    setSubmitting(false);
    resetForm();
    onFormSubmit();
  };

  return (
    <div className="container mt-4">
      <Formik
        initialValues={{
          name: product ? product.name : '',
          price: product ? product.price : '',
          description: product ? product.description : '',
        }}
        enableReinitialize
        validationSchema={ProductSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <Field type="text" name="name" className="form-control" />
              <ErrorMessage name="name" component="div" className="text-danger" />
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="form-label">Price</label>
              <Field type="number" name="price" className="form-control" />
              <ErrorMessage name="price" component="div" className="text-danger" />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <Field as="textarea" name="description" className="form-control" />
              <ErrorMessage name="description" component="div" className="text-danger" />
            </div>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {product ? 'Update Product' : 'Create Product'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ProductForm;
