import React from 'react';
import { X, Trash2, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';
import Button from './Button';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, delta: number) => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, items, onRemove, onUpdateQuantity }) => {
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      <div className="absolute inset-y-0 right-0 max-w-md w-full flex">
        <div className="w-full h-full bg-white shadow-2xl flex flex-col animate-slide-in-right">
          <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-pink-50/50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="text-primary" size={24} />
              <h2 className="text-xl font-serif font-bold text-gray-800">Seu Carrinho</h2>
            </div>
            <button 
              onClick={onClose} 
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-gray-500 space-y-4">
                <ShoppingBag size={64} className="text-gray-200" />
                <p className="text-lg">Seu carrinho está vazio.</p>
                <Button variant="outline" onClick={onClose}>
                  Ver Cardápio
                </Button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="flex gap-4 p-3 rounded-xl border border-gray-100 hover:border-pink-200 transition-colors">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-bold text-gray-800 line-clamp-1">{item.name}</h4>
                      <p className="text-sm text-primary font-medium">R$ {item.price.toFixed(2).replace('.', ',')}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 bg-gray-50 rounded-lg px-2 py-1">
                        <button 
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="text-gray-500 hover:text-primary w-5 h-5 flex items-center justify-center"
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="text-sm font-semibold w-4 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="text-gray-500 hover:text-primary w-5 h-5 flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>
                      <button 
                        onClick={() => onRemove(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-1"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {items.length > 0 && (
            <div className="p-6 bg-gray-50 border-t border-gray-100 space-y-4">
              <div className="flex justify-between items-center text-lg font-bold text-gray-800">
                <span>Total</span>
                <span>R$ {total.toFixed(2).replace('.', ',')}</span>
              </div>
              <Button className="w-full py-4 text-lg shadow-lg" onClick={() => alert('Funcionalidade de checkout não implementada neste demo!')}>
                Finalizar Compra
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;