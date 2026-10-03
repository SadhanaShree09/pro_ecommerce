import Home from './pages/Home';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductDetail from './pages/ProductDetail';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cart from './pages/Cart';

function App() {
  const [cartItems, setCartItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('ecomcart') || '[]');
    } catch {
      return [];
    }
  });

  const updateCart = (items) => {
    setCartItems(items);
    localStorage.setItem('ecomcart', JSON.stringify(items));
  };

  const cartQuantity = cartItems.reduce((total, item) => total + item.qty, 0);

  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer theme="dark" position="top-center" />
        <Header cartQuantity={cartQuantity} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail cartItems={cartItems} setCartItems={updateCart} />} />
          <Route path="/cart" element={<Cart cartItems={cartItems} setCartItems={updateCart} />} />
        </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
