import React from 'react';
import { ShoppingCart, Cake } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const { state } = useCart();
  const itemCount = state.items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="bg-pink-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Cake className="h-8 w-8" />
            <span className="font-bold text-xl">Sweet Delights</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Link to="/" className="hover:text-pink-200 transition-colors">
              Menu
            </Link>
            <Link to="/cart" className="relative hover:text-pink-200 transition-colors">
              <ShoppingCart className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-pink-600 rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};