import { StripeCheckoutButton } from "./StripeCheckoutButton";

type Props = {
  cartItems: {
    image: string | undefined;
    id: number;
    title: string;
    price: number;
    quantity: number;
  }[];
  updateQuantity: (id: number, delta: number) => void;
  removeItem: (id: number) => void;
};

const Basket: React.FC<Props> = ({ cartItems, updateQuantity, removeItem }) => {
  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">🧺 Your Basket</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="flex items-center gap-4 border-b pb-3"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-16 object-contain"
                />
                <div className="flex-grow">
                  <p className="font-medium text-gray-800">{item.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="bg-gray-200 px-2 rounded"
                    >
                      -
                    </button>
                    <span className="px-2">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="bg-gray-200 px-2 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p>${(item.price * item.quantity).toFixed(2)}</p>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-sm text-red-500 mt-1"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="border-t mt-4 pt-4 flex justify-between text-lg font-semibold">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <div className="mt-6">
            <StripeCheckoutButton cartItems={cartItems} />
          </div>
        </>
      )}
    </div>
  );
};
export default Basket;
