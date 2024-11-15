import React from 'react';
import { useAdmin } from '../context/AdminContext';
import { CheckCircle, Clock, RefreshCcw } from 'lucide-react';

export const AdminOrders: React.FC = () => {
  const { state, dispatch } = useAdmin();

  const handleStatusChange = (orderId: string, status: 'pending' | 'processing' | 'completed') => {
    dispatch({
      type: 'UPDATE_ORDER_STATUS',
      payload: { orderId, status },
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'processing':
        return <RefreshCcw className="h-5 w-5 text-blue-500" />;
      default:
        return <Clock className="h-5 w-5 text-yellow-500" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Gerenciar Pedidos</h1>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pedido
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cliente
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Itens
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {state.orders.map((order) => (
              <tr key={order.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">#{order.id}</div>
                  <div className="text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString('pt-BR')}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{order.customerName}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">
                    {order.items.map((item, index) => (
                      <div key={index}>
                        {item.quantity}x {item.cupcake.name}
                      </div>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    R$ {order.total.toFixed(2)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {getStatusIcon(order.status)}
                    <span className="ml-2 text-sm text-gray-900">
                      {order.status === 'completed' ? 'Concluído' :
                       order.status === 'processing' ? 'Em Processo' :
                       'Pendente'}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value as any)}
                    className="text-sm rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                  >
                    <option value="pending">Pendente</option>
                    <option value="processing">Em Processo</option>
                    <option value="completed">Concluído</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};