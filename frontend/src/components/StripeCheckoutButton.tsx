import { useState } from 'react';

type Props = {
  cartItems: { title: string; price: number; quantity: number }[];
};

export const StripeCheckoutButton: React.FC<Props> = ({ cartItems }) => {
console.log("===========>",cartItems)


  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ products:cartItems }),
      });
      const data = await res.json();
      window.location.href = data.url;
    } catch (error) {
      alert('Checkout failed!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition"
    >
      {loading ? 'Processing...' : 'Checkout with Stripe'}
    </button>
  );
};
