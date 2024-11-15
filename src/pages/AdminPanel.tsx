import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';
import { ShoppingBag, Package, TrendingUp, Users } from 'lucide-react';

export const AdminPanel: React.FC = () => {
  const { state } = useAdmin();
  const navigate = useNavigate();

  const stats = [
    {
      name: 'Pedidos Pendentes',
      value: state.orders.filter(order => order.status === 'pending').length,
      icon: ShoppingBag,
      color: 'bg-yellow-500',
    },
    {
      name: 'Total de Produtos',
      value: state.cupcakes.length,
      icon: Package,
      color: 'bg-blue-500',
    },
    {
      name: 'Vendas do Dia',
      value: `R$ ${state.orders
        .filter(order => new Date(order.createdAt).toDateString() === new Date().toDateString())
        .reduce((acc, order) => acc + order.total, 0)
        .toFixed(2)}`,
      icon: TrendingUp,
      color: 'bg-green-500',
    },
    {
      name: 'Clientes Ativos',
      value: new Set(state.orders.map(order => order.customerName)).size,
      icon: Users,
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className={`${stat.color} p-3 rounded-full`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Últimos Pedidos</h2>
          <div className="space-y-4">
            {state.orders.slice(0, 5).map((order) => (
              <div key={order.id} className="flex items-center justify-between border-b pb-4">
                <div>
                  <p className="font-medium text-gray-800">{order.customerName}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString('pt-BR')}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-800">
                    R$ {order.total.toFixed(2)}
                  </p>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    order.status === 'completed' ? 'bg-green-100 text-green-800' :
                    order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {order.status === 'completed' ? 'Concluído' :
                     order.status === 'processing' ? 'Em Processo' :
                     'Pendente'}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => navigate('/admin/orders')}
            className="mt-4 text-pink-600 hover:text-pink-700 font-medium"
          >
            Ver todos os pedidos
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Produtos Populares</h2>
          <div className="space-y-4">
            {state.cupcakes.slice(0, 5).map((cupcake) => (
              <div key={cupcake.id} className="flex items-center space-x-4">
                <img
                  src={cupcake.image}
                  alt={cupcake.name}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{cupcake.name}</p>
                  <p className="text-sm text-gray-500">{cupcake.category}</p>
                </div>
                <p className="font-medium text-gray-800">
                  R$ {cupcake.price.toFixed(2)}
                </p>
              </div>
            ))}
          </div>
          <button
            onClick={() => navigate('/admin/products')}
            className="mt-4 text-pink-600 hover:text-pink-700 font-medium"
          >
            Gerenciar produtos
          </button>
        </div>
      </div>
    </div>
  );
};