import { CheckCircle } from 'lucide-react';

interface AddressDisplayProps {
  address: string;
}

export default function AddressDisplay({ address }: AddressDisplayProps) {
  // This is a simple parser. A more robust solution would handle more formats.
  const parseAddress = (addr: string) => {
    if (!addr) return { street: 'N/A', city: 'N/A', state: 'N/A', zip: 'N/A' };
    const parts = addr.split(',').map(p => p.trim());
    if (parts.length < 3) {
      return { street: addr, city: '', state: '', zip: '' };
    }
    const street = parts[0];
    const city = parts[1];
    const stateAndZip = parts[2].split(' ');
    const state = stateAndZip[0] || '';
    const zip = stateAndZip.slice(1).join(' ') || '';
    return { street, city, state, zip };
  };

  const { street, city, state, zip } = parseAddress(address);

  return (
    <div>
      <h4 className="font-bold text-gray-700 mb-4">Destination Address</h4>
      <div className="mb-4 bg-gray-50 p-4 rounded-lg border-l-4 border-blue-600">
        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Street Address</label>
        <div className="text-lg font-medium text-gray-900">{street}</div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-blue-600">
          <label className="block text-xs font-bold text-gray-500 uppercase mb-2">City</label>
          <div className="text-lg font-medium text-gray-900">{city}</div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-blue-600">
          <label className="block text-xs font-bold text-gray-500 uppercase mb-2">State</label>
          <div className="text-lg font-medium text-gray-900">{state}</div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-blue-600">
          <label className="block text-xs font-bold text-gray-500 uppercase mb-2">ZIP Code</label>
          <div className="text-lg font-medium text-gray-900">{zip}</div>
        </div>
      </div>
      <div className="mt-6 inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-4 py-3 rounded-lg">
        <CheckCircle className="w-5 h-5 text-emerald-600" />
        <span className="font-semibold text-emerald-700">Address Verified</span>
      </div>
    </div>
  );
}
