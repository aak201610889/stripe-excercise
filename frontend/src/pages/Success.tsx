import { Link } from 'react-router-dom';

const Success = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-green-50 text-green-800">
      <h1 className="text-3xl font-bold mb-4">🎉 Payment Successful!</h1>
      <p className="mb-6">Thank you for your purchase. Your order has been confirmed.</p>
      <Link to="/" className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
        Go Back to Shop
      </Link>
    </div>
  );
};

export default Success;
