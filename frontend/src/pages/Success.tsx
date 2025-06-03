import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Success = () => {
  const location = useLocation();
  const sessionId = new URLSearchParams(location.search).get('session_id');
  const [paymentIntent, setPaymentIntent] = useState<string | null>(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (sessionId) {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/session/${sessionId}`)
        .then(res => res.json())
        .then(data => {
          setPaymentIntent(data.paymentIntentId);
        })
        .catch(() => setMessage("⚠️ فشل في جلب تفاصيل الدفع"));
    }
  }, [sessionId]);

  const handleRefund = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/refund`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paymentIntentId: paymentIntent }),
      });

      const data = await response.json();
      if (data.success) {
        setMessage('✅ تم استرجاع المبلغ بنجاح');
      } else {
        setMessage('❌ فشل الاسترجاع');
      }
    } catch (err) {
      setMessage('⚠️ حدث خطأ أثناء العملية');
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-10">
      <h1 className="text-2xl font-bold text-green-700">✅ تم الدفع بنجاح</h1>
      {paymentIntent && (
        <>
          <button
            onClick={handleRefund}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            استرجاع المبلغ
          </button>
          <p className="text-gray-700">{message}</p>
        </>
      )}
    </div>
  );
};

export default Success;
