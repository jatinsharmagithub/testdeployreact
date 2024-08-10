import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductList from './features/products/ProductList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="text-center mt-4">Product Management</h1>
      </header>
      <ProductList />
    </div>
  );
}

export default App;
