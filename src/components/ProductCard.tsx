import React, { useState } from 'react';
import { Plus, Minus, ShoppingCart } from 'lucide-react';
import { Firecracker } from '../types/firecracker';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  firecracker: Firecracker;
}

export const ProductCard: React.FC<ProductCardProps> = ({ firecracker }) => {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const { dispatch } = useCart();

  const handleAddToCart = () => {
    setIsAdding(true);
    dispatch({
      type: 'ADD_ITEM',
      payload: { firecracker, quantity }
    });
    
    setTimeout(() => {
      setIsAdding(false);
      setQuantity(1);
    }, 600);
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
      <div className="relative overflow-hidden">
        <img
          src={firecracker.image}
          alt={firecracker.name}
          className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{firecracker.name}</h3>
        <p className="text-gray-600 text-sm mb-4">{firecracker.description}</p>
        
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-orange-600">₹{firecracker.price.toFixed(2)}</span>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
            >
              <Minus className="h-4 w-4" />
            </button>
            
            <span className="w-12 text-center font-semibold text-lg">{quantity}</span>
            
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>

          <div className="text-right">
            <p className="text-sm text-gray-500">Total</p>
            <p className="font-bold text-lg text-gray-800">₹{(firecracker.price * quantity).toFixed(2)}</p>
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={isAdding}
          className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2 ${
            isAdding
              ? 'bg-green-500 text-white'
              : 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-md hover:shadow-lg'
          }`}
        >
          <ShoppingCart className="h-5 w-5" />
          <span>{isAdding ? 'Added!' : 'Add to Cart'}</span>
        </button>
      </div>
    </div>
  );
};