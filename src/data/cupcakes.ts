export interface Cupcake {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'classico' | 'premium' | 'sazonal';
}

export const cupcakes: Cupcake[] = [
  {
    id: 1,
    name: "Baunilha dos Sonhos",
    description: "Massa leve de baunilha coberta com buttercream suave e confeitos coloridos",
    price: 8.99,
    image: "https://images.unsplash.com/photo-1519869325930-281384150729?w=500",
    category: "classico"
  },
  {
    id: 2,
    name: "Duplo Chocolate",
    description: "Massa rica de chocolate com ganache e raspas de chocolate belga",
    price: 9.99,
    image: "https://images.unsplash.com/photo-1599785209707-a456fc1337bb?w=500",
    category: "classico"
  },
  {
    id: 3,
    name: "Morango com Champagne",
    description: "Massa premium de champagne com buttercream de morango e pó dourado",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=500",
    category: "premium"
  },
  {
    id: 4,
    name: "Caramelo Salgado",
    description: "Massa de caramelo recheada com caramelo salgado e cobertura de buttercream",
    price: 11.99,
    image: "https://images.unsplash.com/photo-1587668178277-295251f900ce?w=500",
    category: "premium"
  },
  {
    id: 5,
    name: "Brigadeiro Especial",
    description: "Massa de chocolate com recheio de brigadeiro gourmet e granulado belga",
    price: 10.99,
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500",
    category: "sazonal"
  }
];