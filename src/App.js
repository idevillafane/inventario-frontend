import React, { useState, useEffect } from 'react';
import './styles/App.css';
import ProductData from './components/ProductData';
import ProductList from './components/ProductList';

function App() {
  const [products, setProducts] = useState([]);
  const [showProductData, setShowProductData] = useState(false); // Estado para controlar la visibilidad de ProductData

  useEffect(() => {
    fetch('http://localhost:8080/api/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const handleAddProduct = (newProduct) => {
    fetch('http://localhost:8080/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct),
    })
      .then(response => response.json())
      .then(data => {
        setProducts([...products, data]);
      })
      .catch(error => console.error('Error adding product:', error));
  };

  const handleOpenProductData = () => {
    setShowProductData(true);
  };

  const handleCloseProductData = () => {
    setShowProductData(false);
  };

  return (
    <div className="App">
      <h1>Inventario de Stock</h1>

      {showProductData && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseProductData}>&times;</span>
            <ProductData onAddProduct={handleAddProduct} />
          </div>
        </div>
      )}
      <ProductList products={products} />
      <div className='herramientas'>
        <button onClick={handleOpenProductData}>Nuevo Producto</button>
        <button onClick={handleOpenProductData}>Ver movimientos</button>
      </div>  
    </div>
  );
}

export default App;
