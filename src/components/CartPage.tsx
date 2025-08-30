import React, { useState } from 'react';
import { ShoppingCart, MessageCircle, Sparkles } from 'lucide-react';
import { CartItem } from './CartItem';
import { useCart } from '../context/CartContext';

export const CartPage: React.FC = () => {
  const { state, dispatch } = useCart();
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = () => {
    if (!customerName.trim() || !customerPhone.trim()) {
      alert('Please enter your name and phone number');
      return;
    }

    if (state.items.length === 0) {
      alert('Your cart is empty');
      return;
    }

    setIsProcessing(true);

    // Format the WhatsApp message
    const orderDetails = state.items.map(item => 
      `*${item.name}*\n  - Quantity: ${item.quantity}\n  - Price: ₹${(item.price * item.quantity).toFixed(2)}`
    ).join('\n\n');

    const message = `--------------------------
New Firecracker Order!

Hello! I would like to place the following order:
My name: ${customerName}
My number: ${customerPhone}
-----------------------
${orderDetails}

*Total Amount: ₹${state.total.toFixed(2)}*

Please confirm the order and provide payment details.
Thank you!
--------------------------`;

    const whatsappNumber = '919003356047';
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Clear cart after a short delay
    setTimeout(() => {
      dispatch({ type: 'CLEAR_CART' });
      setCustomerName('');
      setCustomerPhone('');
      setIsProcessing(false);
    }, 1000);
  };

  if (state.items.length === 0) {
    return (
      <div className="min-h-[60vh] bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <ShoppingCart className="h-24 w-24 text-gray-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Your Cart is Empty</h2>
            <p className="text-gray-600 text-lg mb-8">
              Add some amazing firecrackers to your cart to get started!
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center space-x-3 mb-8">
          <ShoppingCart className="h-8 w-8 text-orange-600" />
          <h2 className="text-3xl font-bold text-gray-800">Your Cart</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {state.items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
              <div className="flex items-center space-x-2 mb-6">
                <Sparkles className="h-6 w-6 text-orange-600" />
                <h3 className="text-xl font-bold text-gray-800">Order Summary</h3>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Items ({state.items.reduce((sum, item) => sum + item.quantity, 0)})</span>
                  <span className="font-semibold">₹{state.total.toFixed(2)}</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span className="text-orange-600">₹{state.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="Enter your phone number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={isProcessing}
                className={`w-full py-4 px-6 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2 ${
                  isProcessing
                    ? 'bg-green-500 text-white'
                    : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl'
                }`}
              >
                <MessageCircle className="h-5 w-5" />
                <span>{isProcessing ? 'Processing...' : 'Checkout via WhatsApp'}</span>
              </button>
              
              <p className="text-xs text-gray-500 text-center mt-3">
                Your order will be sent to our WhatsApp for confirmation
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};