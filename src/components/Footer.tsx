import React from 'react';
import { Facebook, Instagram, Twitter, Phone } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-orange-400">Contact Us</h3>
            <div className="flex items-center space-x-2 mb-2">
              <Phone className="h-4 w-4" />
              <span>+91 9003356047</span>
            </div>
            <p className="text-gray-300">
              Quality firecrackers for all your celebrations
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 text-orange-400">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 text-orange-400">Safety First</h3>
            <p className="text-gray-300 text-sm">
              Always follow safety guidelines when using firecrackers. 
              Keep away from children and use in open spaces.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-gray-400">
            © 2025 SanCrackers. All rights reserved. | 
            <span className="text-orange-400 font-semibold"> Developed By Santhosh_A</span>
          </p>
        </div>
      </div>
    </footer>
  );
};