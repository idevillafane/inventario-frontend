import React, { useState } from 'react';
import '../styles/ProductData.css';

const ProductData = ({ product, onClose, onAddProduct }) => {

  const [quantity, setQuantity] = useState('45');

  const [operation, setOperation] = useState('Ingreso')





  const handleSubmit = (e) => {
    e.preventDefault();


   
      fetch(`http://localhost:8080/api/products/${product.id}/updateQuantity?operation=${operation}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(Number(quantity)),
      })
        .then(response => response.json())
        .then(data => {
          // Llamar a la función onAddProduct para agregar el nuevo producto localmente

          // Restaurar los valores predeterminados después de agregar el producto
          onClose();
          window.location.reload();
        })
        .catch(error => console.error('Error adding product:', error));
    
  };

  return (
    <div className="modal-content">
      <h2 className="modal-title">Agregar Producto</h2>
      <h3 className="product-name">{product.name}</h3>
      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-group">
          <label className="operation-label">Operación:</label>
          <select
            value={operation}
            onChange={(e) => setOperation(e.target.value)}
            className="operation-select"
          >
            <option value="ingreso">Ingreso</option>
            <option value="venta">Venta</option>
            <option value="corrección">Corrección</option>
          </select>
        </div>
        <div className="form-group">
          <label className="quantity-label">Cantidad:</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="quantity-input"
          />
        </div>
        <button type="submit" className="submit-button">
          Aceptar
        </button>
      </form>
    </div>
  );
};

export default ProductData;