type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
};

interface Props {
  product: Product;
  addToCart: (product: Product) => void;
}

export const ProductCard: React.FC<Props> = ({ product, addToCart }) => (
  <div className="border rounded-md p-4 w-60 shadow hover:shadow-md transition">
    <img src={product.image} alt={product.title} className="h-40 w-full object-contain mb-2" />
    <h3 className="font-semibold">{product.title}</h3>
    <p className="text-sm text-gray-700">${product.price.toFixed(2)}</p>
    <button
      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 mt-2 rounded"
      onClick={() => addToCart(product)}
    >
      Add to Cart
    </button>
  </div>
);
