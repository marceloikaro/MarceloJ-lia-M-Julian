import React from 'react';
import { Plus } from 'lucide-react';
import { Cake } from '../types';
import Button from './Button';

interface CakeCardProps {
  cake: Cake;
  onAddToCart: (cake: Cake) => void;
}

const CakeCard: React.FC<CakeCardProps> = ({ cake, onAddToCart }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full border border-pink-100">
      <div className="relative h-56 overflow-hidden group">
        <img 
          src={cake.image} 
          alt={cake.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-accent uppercase tracking-wide">
          {cake.category}
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-serif font-bold text-gray-800 leading-tight">{cake.name}</h3>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
          {cake.description}
        </p>
        
        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">
            R$ {cake.price.toFixed(2).replace('.', ',')}
          </span>
          
          <Button 
            onClick={() => onAddToCart(cake)}
            size="sm"
            className="group"
            aria-label={`Adicionar ${cake.name} ao carrinho`}
          >
            <Plus size={18} className="mr-1 transition-transform group-hover:rotate-90" />
            Adicionar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CakeCard;