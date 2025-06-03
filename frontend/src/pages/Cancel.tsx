import { Link } from 'react-router-dom';

const Cancel = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-red-50 text-red-800">
      <h1 className="text-3xl font-bold mb-4">❌ Payment Cancelled</h1>
      <p className="mb-6">Your payment was not completed. Please try again later.</p>
      <Link to="/" className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700">
        Go Back to Shop
      </Link>
    </div>
  );
};

export default Cancel;
