import { useEffect, useState } from 'react';
import { ProductCard } from './ProductCard';
import  Basket  from './Basket';

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
};

type CartItem = {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
};


export const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(`${process.env.REACT_APP_STRIPE_STORE_URL}`);
      const data = await res.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);

const addToCart = (product: Product) => {
  setCart(prev => {
    const found = prev.find(p => p.id === product.id);
    if (found) {
      return prev.map(p =>
        p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
      );
    }
    return [
      ...prev,
      {
        id: product.id,
        title: product.title,
        price: product.price,
        quantity: 1,
        image: product.image, // ✅ Add image
      },
    ];
  });
};


  const updateQuantity = (id: number, delta: number) => {
    setCart(prev =>
      prev
        .map(p =>
          p.id === id ? { ...p, quantity: p.quantity + delta } : p
        )
        .filter(p => p.quantity > 0)
    );
  };

  const removeItem = (id: number) => {
    setCart(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">🛒  E-Commerce</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} addToCart={addToCart} />
          ))}
        </div>

        <div>
          <Basket
            cartItems={cart}
            updateQuantity={updateQuantity}
            removeItem={removeItem}
           
          />
        </div>
      </div>
    </div>
  );
};
