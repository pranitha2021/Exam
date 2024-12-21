import React, { useEffect, useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../redux/productSlice';
import withSpinner from './withSpinner';
import "./ProductComparision.css"

const comparisonReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_PRODUCT':
      return [...state, action.payload];
    case 'REMOVE_PRODUCT':
      return state.filter((product) => product.id !== action.payload.id);
    default:
      return state;
  }
};

function ProductComparison() {
  const dispatch = useDispatch();
  const { catalog, status } = useSelector((state) => state.products);
  const [selectedProducts, dispatchComparison] = useReducer(comparisonReducer, []);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const ProductSelection = (product) => {
    if (selectedProducts.find((p) => p.id === product.id)) {
      dispatchComparison({ type: 'REMOVE_PRODUCT', payload: product });
    } else {
      dispatchComparison({ type: 'ADD_PRODUCT', payload: product });
    }
  };

  return (<>
    <div class='productsDisplay'>
      <h1>Product Comparison Tool</h1>
      <div className="product-list">
        {catalog.map((product) => (
          <div key={product.id}>
            <h2>{product.name}</h2>
            <button onClick={() => ProductSelection(product)}>
              {selectedProducts.find((p) => p.id === product.id) ? 'Remove' : 'Compare'}
            </button>
          </div>
        ))}
      </div>
      {selectedProducts.length > 0 && (
        <div className="comparison-table">
          <h2>Comparison</h2>
          <table>
            <thead>
              <tr>
                <th>Feature</th>
                {selectedProducts.map((product) => (
                  <th key={product.id}>{product.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Price</td>
                {selectedProducts.map((product) => (
                  <td key={product.id}>{product.price}</td>
                ))}
              </tr>
              <tr>
                <td>Rating</td>
                {selectedProducts.map((product) => (
                  <td key={product.id}>{product.rating}</td>
                ))}
              </tr>
              <tr>
                <td>Features</td>
                {selectedProducts.map((product) => (
                  <td key={product.id}>{product.features}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  </>);
}

export default withSpinner(ProductComparison);


