import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Globe, Zap, Users } from 'lucide-react';

export default function Home() {
  const [shipmentId, setShipmentId] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (shipmentId.trim()) {
      navigate(`/track/${shipmentId.trim()}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <header className="bg-gradient-to-r from-blue-900 to-blue-600 text-white text-center py-16 px-4">
        <div className="text-6xl mb-4">🌐</div>
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">Premier Stace Group</h1>
        <p className="text-xl sm:text-2xl opacity-95">Global Asset Tracking</p>
        <p className="text-sm mt-2 opacity-90">📞 +1 (234) 830-9579 | 📧 support@premierstacegroup.com</p>
      </header>
      <div className="max-w-2xl mx-auto px-4 -mt-12 relative z-10">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Track Your Shipment</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={shipmentId}
              onChange={(e) => setShipmentId(e.target.value)}
              placeholder="Enter Shipment ID (e.g., LUX-CA-NJ-001)"
              className="w-full px-4 py-3 text-lg border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none mb-4"
              required
            />
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg text-lg">
              Track Shipment
            </button>
          </form>
        </div>
      </div>
       <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white rounded-xl p-8 text-center shadow-lg"><Lock className="w-12 h-12 mx-auto mb-4 text-blue-600" /><h3>Secure Tracking</h3><p className="text-gray-600 text-sm">Bank-level encryption protects your shipment data.</p></div>
          <div className="bg-white rounded-xl p-8 text-center shadow-lg"><Globe className="w-12 h-12 mx-auto mb-4 text-blue-600" /><h3>Global Coverage</h3><p className="text-gray-600 text-sm">Track shipments in over 150 countries.</p></div>
          <div className="bg-white rounded-xl p-8 text-center shadow-lg"><Zap className="w-12 h-12 mx-auto mb-4 text-blue-600" /><h3>Real-Time Updates</h3><p className="text-gray-600 text-sm">Live GPS tracking with instant notifications.</p></div>
          <div className="bg-white rounded-xl p-8 text-center shadow-lg"><Users className="w-12 h-12 mx-auto mb-4 text-blue-600" /><h3>24/7 Support</h3><p className="text-gray-600 text-sm">Expert assistance whenever you need it.</p></div>
        </div>
      </div>
      <footer className="bg-gray-900 text-white text-center py-12">
        <p className="text-lg">&copy; 2025 Premier Stace Group</p>
        <p className="text-sm mt-2 opacity-80">Democratizing Fleet Technology</p>
      </footer>
    </div>
  );
}
