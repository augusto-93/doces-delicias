import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Minus, Plus, Trash2, CreditCard, QrCode } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Cart: React.FC = () => {
  const { state, dispatch } = useCart();
  const navigate = useNavigate();
  const [showCheckout, setShowCheckout] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'cartao' | 'pix'>('cartao');
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    endereco: '',
    numero: '',
    cartao: '',
    validade: '',
    cvv: ''
  });

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity < 1) {
      dispatch({ type: 'REMOVE_ITEM', payload: id });
    } else {
      dispatch({
        type: 'UPDATE_QUANTITY',
        payload: { id, quantity: newQuantity },
      });
    }
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({ type: 'CLEAR_CART' });
    navigate('/checkout-success');
  };

  if (state.items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Seu carrinho está vazio</h2>
        <button
          onClick={() => navigate('/')}
          className="bg-pink-600 text-white px-6 py-2 rounded-md hover:bg-pink-700 transition-colors"
        >
          Ver Cardápio
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Carrinho de Compras</h1>

      {!showCheckout ? (
        <>
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            {state.items.map((item) => (
              <div key={item.id} className="flex items-center py-4 border-b last:border-b-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-md"
                />
                <div className="ml-4 flex-grow">
                  <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-gray-600">R$ {item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    className="p-1 rounded-md hover:bg-gray-100"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    className="p-1 rounded-md hover:bg-gray-100"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item.id })}
                    className="p-1 text-red-500 hover:bg-red-50 rounded-md ml-4"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center mb-8">
            <div className="text-2xl font-bold text-gray-800">
              Total: R$ {state.total.toFixed(2)}
            </div>
            <button
              onClick={() => setShowCheckout(true)}
              className="bg-pink-600 text-white px-8 py-3 rounded-md hover:bg-pink-700 transition-colors"
            >
              Finalizar Compra
            </button>
          </div>
        </>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Informações de Pagamento</h2>
          <form onSubmit={handleCheckout} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nome Completo</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-800">Método de Pagamento</h3>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cartao')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md ${
                    paymentMethod === 'cartao'
                      ? 'bg-pink-600 text-white'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  <CreditCard className="h-5 w-5" />
                  <span>Cartão de Crédito</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('pix')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md ${
                    paymentMethod === 'pix'
                      ? 'bg-pink-600 text-white'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  <QrCode className="h-5 w-5" />
                  <span>PIX</span>
                </button>
              </div>
            </div>

            {paymentMethod === 'cartao' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Número do Cartão
                  </label>
                  <input
                    type="text"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                    value={formData.cartao}
                    onChange={(e) => setFormData({ ...formData, cartao: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Validade</label>
                    <input
                      type="text"
                      required
                      placeholder="MM/AA"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                      value={formData.validade}
                      onChange={(e) => setFormData({ ...formData, validade: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">CVV</label>
                    <input
                      type="text"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                      value={formData.cvv}
                      onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'pix' && (
              <div className="text-center p-8">
                <QrCode className="h-48 w-48 mx-auto mb-4" />
                <p className="text-gray-600">
                  Escaneie o QR Code acima para pagar com PIX
                </p>
              </div>
            )}

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setShowCheckout(false)}
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Voltar
              </button>
              <button
                type="submit"
                className="bg-pink-600 text-white px-8 py-2 rounded-md hover:bg-pink-700 transition-colors"
              >
                Confirmar Pedido
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};