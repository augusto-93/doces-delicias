import React, { useState } from 'react';
import { CupcakeCard } from '../components/CupcakeCard';
import { cupcakes } from '../data/cupcakes';

export const Menu: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredCupcakes = activeCategory === 'all'
    ? cupcakes
    : cupcakes.filter(cupcake => cupcake.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">
        Our Delicious Cupcakes
      </h1>
      
      <div className="flex justify-center space-x-4 mb-8">
        {['all', 'classic', 'premium', 'seasonal'].map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-full ${
              activeCategory === category
                ? 'bg-pink-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            } transition-colors`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCupcakes.map(cupcake => (
          <CupcakeCard key={cupcake.id} cupcake={cupcake} />
        ))}
      </div>
    </div>
  );
};