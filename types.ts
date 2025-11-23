export interface Cake {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'Clássico' | 'Frutas' | 'Chocolate' | 'Premium';
  image: string;
  ingredients: string[];
}

export interface CartItem extends Cake {
  quantity: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}
