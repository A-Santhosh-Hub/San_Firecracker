import React from 'react';
import { ShoppingCart, Sparkles, Clock } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useDateTime } from '../hooks/useDateTime';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  const { state } = useCart();
  const { time, date } = useDateTime();

  return (
    <header className="bg-gradient-to-r from-orange-600 via-red-600 to-yellow-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center space-x-3 mb-4 lg:mb-0">
            <Sparkles className="h-8 w-8 text-yellow-300" />
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold tracking-wide">SanCrackers</h1>
              <p className="text-orange-100 text-sm">Premium Firecracker Collection</p>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-8">
            <div className="text-center lg:text-right mb-4 lg:mb-0">
              <div className="flex items-center justify-center lg:justify-end space-x-2 mb-1">
                <Clock className="h-4 w-4" />
                <span className="font-mono text-lg">{time}</span>
              </div>
              <p className="text-orange-100 text-sm">{date}</p>
            </div>

            <nav className="flex items-center space-x-6">
              <button
                onClick={() => onNavigate('home')}
                className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                  currentPage === 'home'
                    ? 'bg-white text-orange-600 font-semibold'
                    : 'hover:bg-orange-500'
                }`}
              >
                Home
              </button>
              
              <button
                onClick={() => onNavigate('cart')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  currentPage === 'cart'
                    ? 'bg-white text-orange-600 font-semibold'
                    : 'hover:bg-orange-500'
                }`}
              >
                <ShoppingCart className="h-5 w-5" />
                <span>Cart</span>
                {state.items.length > 0 && (
                  <span className="bg-yellow-400 text-orange-800 rounded-full px-2 py-1 text-xs font-bold">
                    {state.items.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                )}
              </button>

              <button
                onClick={() => onNavigate('admin')}
                className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                  currentPage === 'admin'
                    ? 'bg-white text-orange-600 font-semibold'
                    : 'hover:bg-orange-500'
                }`}
              >
                Admin
              </button>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};