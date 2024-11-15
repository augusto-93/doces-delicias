import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import { Plus, Pencil, Trash2 } from 'lucide-react';

export const AdminProducts: React.FC = () => {
  const { state, dispatch } = useAdmin();
  const [isEditing, setIsEditing] = useState(false);
  const [editingProduct, setEditingProduct] = useState({
    id: 0,
    name: '',
    description: '',
    price: 0,
    image: '',
    category: 'classico' as const,
  });

  const handleEdit = (cupcake: typeof editingProduct) => {
    setEditingProduct(cupcake);
    setIsEditing(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      dispatch({
        type: 'UPDATE_CUPCAKE',
        payload: editingProduct,
      });
    } else {
      dispatch({
        type: 'ADD_CUPCAKE',
        payload: {
          ...editingProduct,
          id: state.cupcakes.length + 1,
        },
      });
    }
    setIsEditing(false);
    setEditingProduct({
      id: 0,
      name: '',
      description: '',
      price: 0,
      image: '',
      category: 'classico',
    });
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      dispatch({
        type: 'DELETE_CUPCAKE',
        payload: id,
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Gerenciar Produtos</h1>
        <button
          onClick={() => {
            setIsEditing(false);
            setEditingProduct({
              id: 0,
              name: '',
              description: '',
              price: 0,
              image: '',
              category: 'classico',
            });
          }}
          className="bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700 transition-colors flex items-center"
        >
          <Plus className="h-5 w-5 mr-2" />
          Novo Produto
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            {isEditing ? 'Editar Produto' : 'Novo Produto'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nome</label>
              <input
                type="text"
                required
                value={editingProduct.name}
                onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Descrição</label>
              <textarea
                required
                value={editingProduct.description}
                onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Preço</label>
              <input
                type="number"
                required
                step="0.01"
                value={editingProduct.price}
                onChange={(e) => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">URL da Imagem</label>
              <input
                type="url"
                required
                value={editingProduct.image}
                onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Categoria</label>
              <select
                required
                value={editingProduct.category}
                onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value as any })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
              >
                <option value="classico">Clássico</option>
                <option value="premium">Premium</option>
                <option value="sazonal">Sazonal</option>
              </select>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700 transition-colors"
              >
                {isEditing ? 'Atualizar' : 'Adicionar'} Produto
              </button>
            </div>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Produtos Existentes</h2>
          <div className="space-y-4">
            {state.cupcakes.map((cupcake) => (
              <div key={cupcake.id} className="flex items-center space-x-4 border-b pb-4">
                <img
                  src={cupcake.image}
                  alt={cupcake.name}
                  className="h-16 w-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800">{cupcake.name}</h3>
                  <p className="text-sm text-gray-500">{cupcake.category}</p>
                  <p className="text-sm font-medium text-gray-800">
                    R$ {cupcake.price.toFixed(2)}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(cupcake)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-md"
                  >
                    <Pencil className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(cupcake.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};