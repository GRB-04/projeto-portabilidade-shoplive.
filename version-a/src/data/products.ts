/**
 * ShopLive — Dados dos Produtos
 * Catálogo compartilhado entre Versão A e Versão B.
 */

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  image: string;
  badge: string;
  rating: number;
  reviews: number;
  discount: number;
  soldCount: number;
}

export const products: Product[] = [
  {
    id: 1,
    name: 'ProAudio X1 Headphones',
    description: 'Cancelamento de ruído profissional com 40h de bateria. Engenharia de som premium com design minimalista.',
    price: 299.99,
    originalPrice: 599.99,
    image: 'product_headphones.png',
    badge: '🔥 Black Friday',
    rating: 4.9,
    reviews: 2847,
    discount: 50,
    soldCount: 1243,
  },
  {
    id: 2,
    name: 'SmartWatch Ultra',
    description: 'Caixa em titânio, tela AMOLED sempre ativa, sensores de saúde avançados. O relógio que pensa à frente.',
    price: 449.99,
    originalPrice: 899.99,
    image: 'product_smartwatch.png',
    badge: '⚡ Oferta Relâmpago',
    rating: 4.8,
    reviews: 1523,
    discount: 50,
    soldCount: 876,
  },
  {
    id: 3,
    name: 'UltraBook Pro 14',
    description: 'Performance de chip classe M em um chassi de 14" extremamente fino. Produtividade sem compromissos.',
    price: 1299.99,
    originalPrice: 2499.99,
    image: 'product_laptop.png',
    badge: '💎 Escolha Premium',
    rating: 4.9,
    reviews: 892,
    discount: 48,
    soldCount: 421,
  },
  {
    id: 4,
    name: 'SoundSphere Speaker',
    description: 'Áudio espacial 360°, resistência IP67, 30h de reprodução. Encha qualquer ambiente com som de nível concerto.',
    price: 199.99,
    originalPrice: 399.99,
    image: 'product_speaker.png',
    badge: '🎵 Mais Vendido',
    rating: 4.7,
    reviews: 3201,
    discount: 50,
    soldCount: 2109,
  },
];

export const chatMessages = [
  { id: 1, user: 'Alex_M', avatar: '🧑', message: 'Cara, esse desconto no fone é absurdo!! 🔥', time: '11:42' },
  { id: 2, user: 'Sarah_K', avatar: '👩', message: 'Já comprei 2 de presente 😍', time: '11:42' },
  { id: 3, user: 'TechGuru', avatar: '🧑‍💻', message: 'O UltraBook Pro vale cada centavo', time: '11:43' },
  { id: 4, user: 'Mike_R', avatar: '👨', message: 'O relógio monitora o sono?', time: '11:43' },
  { id: 5, user: 'LiveHost', avatar: '🎙️', message: 'SIM Mike — 8 estágios de sono rastreados!', time: '11:43' },
  { id: 6, user: 'Priya_D', avatar: '👩‍🦱', message: 'Carrinho cheio, carteira chorando 😂💀', time: '11:44' },
  { id: 7, user: 'Carlos_V', avatar: '🧔', message: 'ENTREGA NO BRASIL?? Por favorrr', time: '11:44' },
  { id: 8, user: 'Jen_W', avatar: '👧', message: 'O speaker está INCRÍVEL na demo!', time: '11:44' },
];
