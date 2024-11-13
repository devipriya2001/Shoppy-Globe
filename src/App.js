import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import Header from './components/Header';
import { store } from './redux/store';

const ProductList = lazy(() => import('./components/ProductList'));
const ProductDetail = lazy(() => import('./components/ProductDetail'));
const Cart = lazy(() => import('./components/Cart'));
const NotFound = lazy(() => import('./components/NotFound'));

function App() {
  return (
    <Provider store={store}>
      <Router> {/* Sets up routing for the application */}
        <Header />
        <main className="main-content">
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              {/* Home Page Route */}
              <Route path="/" element={<ProductList />} />
               {/* Product Detail Route */}
              <Route path="/product/:id" element={<ProductDetail />} />
              {/* Cart Page Route */}
              <Route path="/cart" element={<Cart />} />
              {/* not found page Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
      </Router>
    </Provider>
  );
}

export default App;


