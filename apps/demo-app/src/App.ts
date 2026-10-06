import React from 'react';
import { ReplaySDK } from '@replay/sdk';

const sdk = new ReplaySDK({
  apiKey: 'demo_key_123',
  appId: '11111111-1111-1111-1111-111111111111',
  endpoint: 'http://localhost:4000',
});

export default function App() {
  const handleBuy = async () => {
    sdk.track('CHECKOUT_STARTED', { cartId: 'cart_99' });
    sdk.track('PAYMENT_SUCCESS', { amount: 1500, currency: 'NPR' });

    try {
      const res = await fetch('http://localhost:4000/api/checkout', { method: 'POST' });
      if (!res.ok) throw new Error('Database timeout during order creation');
    } catch (err: any) {
      sdk.track('ORDER_FAILED', { error: err.message });
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div style={{ padding: 40, fontFamily: 'sans-serif', background: '#f8fafc', minHeight: '100vh' }}>
      <h1>ElectroShop (Demo E-Commerce App)</h1>
      <div style={{ background: 'white', border: '1px solid #cbd5e1', padding: 20, width: 300, borderRadius: 8 }}>
        <h3>Wireless Headphones</h3>
        <p>Price: Rs. 1,500</p>
        <button onClick={handleBuy} style={{ background: '#2563eb', color: 'white', padding: '10px 15px', border: 'none', borderRadius: 4, cursor: 'pointer' }}>
          Buy Now
        </button>
      </div>
    </div>
  );
}