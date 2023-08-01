import React, { useState } from 'react';
import '../styles/ProductList.css';
import ProductData from './ProductData';

const ProductList = ({ products }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filterType, setFilterType] = useState(null);
  const [filterOrder, setFilterOrder] = useState('asc');
  const tableHeaders = ["Nombre", "Categoría", "Cantidad", "Precio"]

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleFilterChange = (field) => {
    if (field === filterType) {
      setFilterOrder(filterOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setFilterType(field);
      setFilterOrder('asc');
    }
  };

  const filteredProducts = () => {
    if (filterType) {
      return [...products].sort((a, b) => {
        const fieldA = a[filterType];
        const fieldB = b[filterType];

        if (filterOrder === 'asc') {
          return fieldA < fieldB ? -1 : 1;
        } else {
          return fieldA > fieldB ? -1 : 1;
        }
      });
    } else {
      return products;
    }
  };

  const sortedProducts = filteredProducts();

  return (
    <div>
      <table className="product-list">
      <thead>
          <tr className="product-list-item">
          {tableHeaders.map((header) => (
            <th key="headers">              
              <div className="column-header">
                {header}
                <button onClick={() => handleFilterChange('name')} className="filter-button">🔍︎</button>
              </div>
            </th>
            ))}
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {sortedProducts.map((product, index) => (
            <tr key={index} className="product-list-item">
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>{product.quantity}</td>
              <td>${product.price.toFixed(2)}</td>
              <td>
                <button onClick={() => openModal(product)}>Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="modal-background">
          <div className="modal-content">
            <ProductData product={selectedProduct} onClose={closeModal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
