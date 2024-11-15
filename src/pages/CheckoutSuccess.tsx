import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';

export const CheckoutSuccess: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-md mx-auto">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
          <Check className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Pedido Confirmado!
        </h2>
        <p className="text-gray-600 mb-8">
          Obrigado pela sua compra! Seu pedido foi recebido e está sendo preparado com muito carinho.
        </p>
        <button
          onClick={() => navigate('/')}
          className="bg-pink-600 text-white px-6 py-2 rounded-md hover:bg-pink-700 transition-colors"
        >
          Voltar para o Cardápio
        </button>
      </div>
    </div>
  );
};