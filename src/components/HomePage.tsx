import React from 'react';
import { ProductCard } from './ProductCard';
import { useFirecrackers } from '../hooks/useFirecrackers';
import { Loader2, Sparkles } from 'lucide-react';

export const HomePage: React.FC = () => {
  const { firecrackers, loading } = useFirecrackers();

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-orange-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading firecrackers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Sparkles className="h-8 w-8 text-orange-600" />
            <h2 className="text-4xl font-bold text-gray-800">Premium Firecracker Collection</h2>
            <Sparkles className="h-8 w-8 text-orange-600" />
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Celebrate with our premium collection of firecrackers. Safe, high-quality, and spectacular effects guaranteed!
          </p>
        </div>

        {firecrackers.length === 0 ? (
          <div className="text-center py-16">
            <Sparkles className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No firecrackers available</h3>
            <p className="text-gray-500">Please check back later or contact admin to add products.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {firecrackers.map((firecracker) => (
              <ProductCard key={firecracker.id} firecracker={firecracker} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};