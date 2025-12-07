import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Package, AlertCircle } from 'lucide-react';
import { ShipmentResponse } from '@/shared/types';
import Map from '@/components/Map';
import AddressDisplay from '@/components/AddressDisplay';
import LocationHistoryList from '@/components/LocationHistoryList';

export default function Tracking() {
  const { shipmentId } = useParams<{ shipmentId: string }>();
  const [data, setData] = useState<ShipmentResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!shipmentId) return;
    const fetchShipment = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/shipments/${shipmentId}`);
        if (!response.ok) {
          throw new Error('Shipment not found or API error.');
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load shipment data.');
      } finally {
        setLoading(false);
      }
    };
    fetchShipment();
  }, [shipmentId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <Package className="w-16 h-16 mx-auto mb-4 text-blue-600 animate-pulse" />
          <p className="text-xl text-gray-600">Fetching Live Shipment Data...</p>
        </div>
      </div>
    );
  }

  if (error || !data || !data.shipment) {
    return (
      <div className="min-h-screen bg-slate-50">
        <header className="bg-gradient-to-r from-blue-900 to-blue-600 text-white py-8 text-center">
          <h1 className="text-3xl font-bold">🌐 Premier Stace Group</h1>
        </header>
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <AlertCircle className="w-16 h-16 mx-auto mb-4 text-red-500" />
          <h2 className="text-2xl font-bold mb-4">Shipment Not Found</h2>
          <p className="text-gray-600 mb-8">Could not find tracking information for <strong>{shipmentId}</strong>.</p>
          <Link to="/" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg">
            ← Try Another Search
          </Link>
        </div>
      </div>
    );
  }

  const { shipment, history } = data;
  const statusColor = shipment.status === 'Hold' ? 'text-amber-600' : shipment.status === 'Delivered' ? 'text-green-600' : 'text-blue-600';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <header className="bg-gradient-to-r from-blue-900 to-blue-600 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">🌐 Premier Stace Group</h1>
          <Link to="/" className="text-white hover:underline text-sm">← Track Another</Link>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-6"><h2 className="text-3xl font-bold">Tracking ID: {shipment.shipment_id}</h2></div>
        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-l-4 border-amber-500 rounded-xl shadow-lg p-6 mb-8">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">📦 Shipment Status</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div><p className="text-sm font-semibold text-gray-600 mb-1">Status</p><p className={`text-2xl font-bold ${statusColor}`}>{shipment.status}</p></div>
            <div><p className="text-sm font-semibold text-gray-600 mb-1">Location</p><p className="text-xl font-semibold text-gray-800">{shipment.current_location_city}</p></div>
            <div><p className="text-sm font-semibold text-gray-600 mb-1">ETA</p><p className="text-xl font-semibold text-gray-800">{shipment.etd || 'TBD'}</p></div>
          </div>
          {shipment.hold_reason && <div className="mt-4 p-4 bg-amber-100 rounded-lg"><p className="text-sm font-semibold text-amber-900"><AlertCircle className="inline w-4 h-4 mr-1" />Hold Reason: {shipment.hold_reason}</p></div>}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden"><div className="bg-gray-50 px-6 py-4 border-b"><h3 className="text-xl font-bold flex items-center gap-2"><MapPin className="w-5 h-5 text-blue-600" />Live Map</h3></div><div className="p-6"><Map lat={shipment.current_location_lat || 0} lon={shipment.current_location_lon || 0} city={shipment.current_location_city || ''} shipmentId={shipment.shipment_id} /></div></div>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden"><div className="bg-gray-50 px-6 py-4 border-b"><h3 className="text-xl font-bold flex items-center gap-2">📋 Details</h3></div><div className="p-6"><div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8"><div><h4 className="font-bold text-gray-700 mb-2">Sender</h4><p className="text-lg">{shipment.sender}</p></div><div><h4 className="font-bold text-gray-700 mb-2">Recipient</h4><p className="text-lg">{shipment.recipient}</p></div></div>{(shipment.verified_address || shipment.recipient_address) && <AddressDisplay address={shipment.verified_address || shipment.recipient_address!} />}</div></div>
          </div>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden h-fit"><div className="bg-gray-50 px-6 py-4 border-b"><h3 className="text-xl font-bold flex items-center gap-2">🗺️ History</h3></div><div className="p-6"><LocationHistoryList history={history} /></div></div>
        </div>
      </main>
    </div>
  );
}
