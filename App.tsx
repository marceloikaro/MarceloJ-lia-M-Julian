import React, { useState, useMemo } from 'react';
import { ShoppingBag, Menu, X, Search, Cake as CakeIcon, Instagram, Facebook, Twitter, Sparkles } from 'lucide-react';
import { CAKES } from './constants';
import { Cake, CartItem } from './types';
import CakeCard from './components/CakeCard';
import CartDrawer from './components/CartDrawer';
import AIChatWidget from './components/AIChatWidget';
import Button from './components/Button';

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');

  const categories = ['Todos', ...new Set(CAKES.map(c => c.category))];

  const filteredCakes = useMemo(() => {
    return CAKES.filter(cake => {
      const matchesSearch = cake.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            cake.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'Todos' || cake.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const addToCart = (cake: Cake) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === cake.id);
      if (existing) {
        return prev.map(item => 
          item.id === cake.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...cake, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }));
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-cream flex flex-col font-sans text-gray-800">
      
      {/* Navigation */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md shadow-sm border-b border-pink-50">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center">
              <CakeIcon size={24} />
            </div>
            <span className="text-2xl font-serif font-bold text-accent tracking-tight">Doce Sonho</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-gray-600 hover:text-primary font-medium transition-colors">Início</a>
            <a href="#cardapio" className="text-gray-600 hover:text-primary font-medium transition-colors">Cardápio</a>
            <a href="#sobre" className="text-gray-600 hover:text-primary font-medium transition-colors">Sobre</a>
            <a href="#contato" className="text-gray-600 hover:text-primary font-medium transition-colors">Contato</a>
          </nav>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-gray-600 hover:text-primary transition-colors rounded-full hover:bg-pink-50"
            >
              <ShoppingBag size={24} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 w-5 h-5 bg-primary text-white text-xs font-bold flex items-center justify-center rounded-full border-2 border-white">
                  {cartCount}
                </span>
              )}
            </button>
            <button 
              className="md:hidden p-2 text-gray-600"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 p-4 space-y-4 shadow-lg animate-fade-in">
            <a href="#" className="block text-gray-600 hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}>Início</a>
            <a href="#cardapio" className="block text-gray-600 hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}>Cardápio</a>
            <a href="#sobre" className="block text-gray-600 hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}>Sobre</a>
            <a href="#contato" className="block text-gray-600 hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}>Contato</a>
          </div>
        )}
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-pink-50 overflow-hidden">
          <div className="container mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 text-center md:text-left space-y-6 z-10">
              <div className="inline-block px-4 py-1 bg-white rounded-full text-primary text-sm font-semibold shadow-sm mb-2">
                ✨ Confeitaria Artesanal Premium
              </div>
              <h1 className="text-4xl md:text-6xl font-serif font-bold text-gray-900 leading-tight">
                Sabor que transforma <br/><span className="text-primary">momentos em memórias</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 max-w-lg mx-auto md:mx-0">
                Bolos feitos à mão com ingredientes selecionados e muito amor. Experimente a verdadeira doçura da vida.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
                <Button size="lg" onClick={() => document.getElementById('cardapio')?.scrollIntoView({behavior: 'smooth'})}>
                  Ver Cardápio
                </Button>
                <Button variant="outline" size="lg">
                  Fazer Encomenda
                </Button>
              </div>
            </div>
            <div className="flex-1 relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-[120%] bg-gradient-to-br from-pink-200/50 to-transparent rounded-full blur-3xl -z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Bolo delicioso" 
                className="w-full max-w-md mx-auto rounded-3xl shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-700"
              />
            </div>
          </div>
        </section>

        {/* Menu Section */}
        <section id="cardapio" className="py-16 md:py-24 bg-white relative">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-800 mb-4">Nosso Cardápio</h2>
              <p className="text-gray-500 max-w-2xl mx-auto">
                Cada bolo é uma obra de arte. Escolha entre nossos clássicos atemporais ou experimente algo novo.
              </p>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10">
              <div className="flex flex-wrap justify-center gap-2">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedCategory === cat 
                        ? 'bg-primary text-white shadow-md' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              
              <div className="relative w-full md:w-72">
                <input
                  type="text"
                  placeholder="Buscar sabores..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:border-primary focus:ring-2 focus:ring-pink-100 outline-none"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>

            {/* Grid */}
            {filteredCakes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCakes.map(cake => (
                  <CakeCard key={cake.id} cake={cake} onAddToCart={addToCart} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-gray-50 rounded-3xl">
                <p className="text-gray-500 text-lg">Nenhum bolo encontrado com esses critérios. 🎂</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('Todos');
                  }}
                >
                  Limpar Filtros
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Features/About Mini Section */}
        <section id="sobre" className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
                <div className="w-16 h-16 bg-pink-100 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <Sparkles size={32} />
                </div>
                <h3 className="text-xl font-bold mb-2">Ingredientes Frescos</h3>
                <p className="text-gray-600">Trabalhamos apenas com frutas da estação e chocolates importados de alta qualidade.</p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
                <div className="w-16 h-16 bg-pink-100 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <ShoppingBag size={32} />
                </div>
                <h3 className="text-xl font-bold mb-2">Entrega Rápida</h3>
                <p className="text-gray-600">Embalagens seguras e entrega refrigerada para garantir que seu bolo chegue perfeito.</p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
                <div className="w-16 h-16 bg-pink-100 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <CakeIcon size={32} />
                </div>
                <h3 className="text-xl font-bold mb-2">Feito com Amor</h3>
                <p className="text-gray-600">Cada receita carrega a tradição e o carinho de nossa família para a sua.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="contato" className="bg-accent text-pink-100 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <CakeIcon size={24} className="text-white" />
                <span className="text-2xl font-serif font-bold text-white">Doce Sonho</span>
              </div>
              <p className="opacity-80">Adoçando vidas desde 2010 com o melhor da confeitaria artesanal.</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Contato</h4>
              <p className="opacity-80 mb-2">Rua dos Confeiteiros, 123</p>
              <p className="opacity-80 mb-2">(11) 99999-8888</p>
              <p className="opacity-80">contato@docesonho.com.br</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Siga-nos</h4>
              <div className="flex gap-4">
                <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors">
                  <Instagram size={20} />
                </a>
                <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors">
                  <Facebook size={20} />
                </a>
                <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors">
                  <Twitter size={20} />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-sm opacity-60">
            &copy; {new Date().getFullYear()} Confeitaria Doce Sonho. Todos os direitos reservados.
          </div>
        </div>
      </footer>

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cartItems}
        onRemove={removeFromCart}
        onUpdateQuantity={updateQuantity}
      />

      <AIChatWidget />
    </div>
  );
}

export default App;