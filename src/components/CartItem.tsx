import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '../types/firecracker';
import { useCart } from '../context/CartContext';

interface CartItemProps {
  item: CartItemType;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { dispatch } = useCart();

  const updateQuantity = (newQuantity: number) => {
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { id: item.id, quantity: newQuantity }
    });
  };

  const removeItem = () => {
    dispatch({
      type: 'REMOVE_ITEM',
      payload: item.id
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex items-center space-x-4">
      <img
        src={item.image}
        alt={item.name}
        className="w-20 h-20 object-cover rounded-lg"
      />
      
      <div className="flex-1">
        <h3 className="font-semibold text-gray-800">{item.name}</h3>
        <p className="text-orange-600 font-bold">₹{item.price.toFixed(2)}</p>
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={() => updateQuantity(item.quantity - 1)}
          className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
        >
          <Minus className="h-4 w-4" />
        </button>
        
        <span className="w-12 text-center font-semibold">{item.quantity}</span>
        
        <button
          onClick={() => updateQuantity(item.quantity + 1)}
          className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      <div className="text-right">
        <p className="font-bold text-lg">₹{(item.price * item.quantity).toFixed(2)}</p>
        <button
          onClick={removeItem}
          className="text-red-500 hover:text-red-700 transition-colors mt-1"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};