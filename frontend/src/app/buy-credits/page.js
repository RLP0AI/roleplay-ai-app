'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { paymentAPI } from '@/lib/api';
import { ArrowLeft, Coins, CreditCard } from 'lucide-react';
import Link from 'next/link';

export default function BuyCredits() {
  const { user, credits, refreshCredits } = useAuth();
  const router = useRouter();
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const CREDITS_PER_RUPEE = 15;

  const handlePayment = async (e) => {
    e.preventDefault();
    setError('');

    const amountValue = parseFloat(amount);

    if (!amountValue || amountValue < 1) {
      setError('Minimum amount is ₹1');
      return;
    }

    if (amountValue > 100000) {
      setError('Maximum amount is ₹100,000');
      return;
    }

    setLoading(true);

    try {
      // Create order
      const orderResponse = await paymentAPI.createOrder(amountValue);
      const { orderId, amount: orderAmount, currency, credits: creditsToAdd } = orderResponse.data;

      // Initialize Razorpay
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderAmount,
        currency: currency,
        name: 'Roleplay AI',
        description: `Purchase ${creditsToAdd} credits`,
        order_id: orderId,
        handler: async function (response) {
          try {
            // Verify payment
            const verifyResponse = await paymentAPI.verifyPayment({
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature
            });

            // Refresh credits
            await refreshCredits();

            // Show success message
            alert(`Success! ${verifyResponse.data.creditsAdded} credits added to your account.`);
            router.push('/dashboard');
          } catch (err) {
            console.error('Payment verification failed:', err);
            setError('Payment verification failed. Please contact support.');
          }
        },
        prefill: {
          email: user?.email
        },
        theme: {
          color: '#2563eb'
        },
        modal: {
          ondismiss: function() {
            setLoading(false);
          }
        }
      };

      // Check if Razorpay is loaded
      if (typeof window.Razorpay === 'undefined') {
        setError('Payment gateway not loaded. Please refresh the page.');
        setLoading(false);
        return;
      }

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      console.error('Payment error:', err);
      setError(err.response?.data?.error || 'Failed to initiate payment');
      setLoading(false);
    }
  };

  const calculateCredits = (amt) => {
    const value = parseFloat(amt);
    return isNaN(value) ? 0 : Math.floor(value * CREDITS_PER_RUPEE);
  };

  if (!user) {
    router.push('/login');
    return null;
  }

  return (
    <>
      {/* Load Razorpay Script */}
      <script src="https://checkout.razorpay.com/v1/checkout.js" async></script>

      <div className="min-h-screen bg-gray-50">
        <Navbar />

        <div className="container mx-auto px-4 py-8 max-w-2xl">
          <Link 
            href="/dashboard" 
            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </Link>

          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="flex items-center space-x-3 mb-6">
              <Coins className="w-8 h-8 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-900">Buy Credits</h1>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-800 font-semibold">Current Balance</p>
              <p className="text-3xl font-bold text-blue-600">{credits} Credits</p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handlePayment} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter Amount (₹)
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  min="1"
                  max="100000"
                  step="1"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-lg"
                  placeholder="Enter any amount"
                  required
                />
              </div>

              {amount && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-sm text-green-800">You will receive</p>
                  <p className="text-3xl font-bold text-green-600">
                    {calculateCredits(amount)} Credits
                  </p>
                  <p className="text-sm text-green-700 mt-1">
                    ₹{amount} × {CREDITS_PER_RUPEE} credits per rupee
                  </p>
                </div>
              )}

              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900">Quick Select</h3>
                <div className="grid grid-cols-3 gap-3">
                  {[100, 500, 1000].map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setAmount(value.toString())}
                      className="px-4 py-3 border-2 border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition"
                    >
                      <p className="font-bold text-gray-900">₹{value}</p>
                      <p className="text-xs text-gray-600">{value * CREDITS_PER_RUPEE} credits</p>
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || !amount}
                className="w-full flex items-center justify-center space-x-2 px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <CreditCard className="w-5 h-5" />
                <span>{loading ? 'Processing...' : 'Proceed to Payment'}</span>
              </button>
            </form>

            <div className="mt-8 space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Payment Information</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>✓ Secure payment via Razorpay</li>
                  <li>✓ ₹1 = {CREDITS_PER_RUPEE} credits</li>
                  <li>✓ 1 credit = 1 message</li>
                  <li>✓ Instant credit delivery</li>
                </ul>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h3 className="font-semibold text-yellow-800 mb-2">Important Notice</h3>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Credits are non-refundable</li>
                  <li>• Credits have no cash value</li>
                  <li>• For entertainment purposes only</li>
                  <li>• Must be 18+ to use this service</li>
                </ul>
              </div>

              <p className="text-xs text-gray-500 text-center">
                By making a purchase, you agree to our{' '}
                <Link href="/terms" className="text-blue-600 hover:underline" target="_blank">
                  Terms & Conditions
                </Link>{' '}
                and{' '}
                <Link href="/refund" className="text-blue-600 hover:underline" target="_blank">
                  Refund Policy
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
