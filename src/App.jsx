import React, { useContext } from 'react';
import { Provider } from 'react-redux';
import { ThemeContext, ThemeProvider } from './themeContext';
import Store from './Redux/store';
import ProductComparision from './Components/ProductComparision';

function App() {
  const { theme } = useContext(ThemeContext);

  return (
    <Provider store={Store}>
      <div className={`app ${theme}`}>
        <ProductComparision />
      </div>
    </Provider>
  );
}

export default function ThemedApp() {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
}


