import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Cupcake, cupcakes as initialCupcakes } from '../data/cupcakes';

interface AdminState {
  cupcakes: Cupcake[];
  orders: Order[];
  isLoading: boolean;
  error: string | null;
}

export interface Order {
  id: string;
  customerName: string;
  items: { cupcake: Cupcake; quantity: number }[];
  total: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  createdAt: string;
}

type AdminAction =
  | { type: 'ADD_CUPCAKE'; payload: Cupcake }
  | { type: 'UPDATE_CUPCAKE'; payload: Cupcake }
  | { type: 'DELETE_CUPCAKE'; payload: number }
  | { type: 'UPDATE_ORDER_STATUS'; payload: { orderId: string; status: Order['status'] } }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean };

const AdminContext = createContext<{
  state: AdminState;
  dispatch: React.Dispatch<AdminAction>;
} | null>(null);

const adminReducer = (state: AdminState, action: AdminAction): AdminState => {
  switch (action.type) {
    case 'ADD_CUPCAKE':
      return {
        ...state,
        cupcakes: [...state.cupcakes, action.payload],
      };
    case 'UPDATE_CUPCAKE':
      return {
        ...state,
        cupcakes: state.cupcakes.map(cupcake =>
          cupcake.id === action.payload.id ? action.payload : cupcake
        ),
      };
    case 'DELETE_CUPCAKE':
      return {
        ...state,
        cupcakes: state.cupcakes.filter(cupcake => cupcake.id !== action.payload),
      };
    case 'UPDATE_ORDER_STATUS':
      return {
        ...state,
        orders: state.orders.map(order =>
          order.id === action.payload.orderId
            ? { ...order, status: action.payload.status }
            : order
        ),
      };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};

const mockOrders: Order[] = [
  {
    id: '1',
    customerName: 'João Silva',
    items: [
      { cupcake: initialCupcakes[0], quantity: 2 },
      { cupcake: initialCupcakes[1], quantity: 1 },
    ],
    total: 27.97,
    status: 'pending',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    customerName: 'Maria Santos',
    items: [
      { cupcake: initialCupcakes[2], quantity: 3 },
    ],
    total: 38.97,
    status: 'processing',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
];

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(adminReducer, {
    cupcakes: initialCupcakes,
    orders: mockOrders,
    isLoading: false,
    error: null,
  });

  return (
    <AdminContext.Provider value={{ state, dispatch }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};