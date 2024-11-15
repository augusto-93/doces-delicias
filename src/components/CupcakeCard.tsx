import React from 'react';
import { useCart } from '../context/CartContext';
import { Cupcake } from '../data/cupcakes';
import { PlusCircle } from 'lucide-react';

interface CupcakeCardProps {
  cupcake: Cupcake;
}

export const CupcakeCard: React.FC<CupcakeCardProps> = ({ cupcake }) => {
  const { dispatch } = useCart();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <img
        src={cupcake.image}
        alt={cupcake.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{cupcake.name}</h3>
        <p className="text-sm text-gray-600 mt-1">{cupcake.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-bold text-pink-600">
            ${cupcake.price.toFixed(2)}
          </span>
          <button
            onClick={() => dispatch({ type: 'ADD_ITEM', payload: cupcake })}
            className="flex items-center space-x-1 bg-pink-600 text-white px-3 py-2 rounded-md hover:bg-pink-700 transition-colors"
          >
            <PlusCircle className="h-5 w-5" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};