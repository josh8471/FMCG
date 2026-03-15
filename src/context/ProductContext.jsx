import React, { createContext, useState, useContext } from 'react';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "",
      sku: "",
      type: "",
      category: "",
      tax: "",
      active: true,
      imageUrl: "",
      variants: [],
      

    }
  ]);

  const addProduct = (newProduct) => {
    setProducts((prev) => [...prev, { ...newProduct, id: Date.now() }]);
  };

  const updateProduct = (id, updatedData) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === parseInt(id) ? { ...p, ...updatedData } : p))
    );
  };

  const getProduct = (id) => {
    return products.find((p) => p.id === parseInt(id));
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, updateProduct, getProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);