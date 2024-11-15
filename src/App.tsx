import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AdminProvider } from './context/AdminContext';
import { Navbar } from './components/Navbar';
import { Menu } from './pages/Menu';
import { Cart } from './pages/Cart';
import { CheckoutSuccess } from './pages/CheckoutSuccess';
import { AdminPanel } from './pages/AdminPanel';
import { AdminOrders } from './pages/AdminOrders';
import { AdminProducts } from './pages/AdminProducts';
import { AdminLogin } from './pages/AdminLogin';

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <AdminProvider>
          <div className="min-h-screen bg-pink-50">
            <Navbar />
            <Routes>
              <Route path="/" element={<Menu />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout-success" element={<CheckoutSuccess />} />
              <Route path="/admin" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminPanel />} />
              <Route path="/admin/orders" element={<AdminOrders />} />
              <Route path="/admin/products" element={<AdminProducts />} />
            </Routes>
          </div>
        </AdminProvider>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;