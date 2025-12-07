import { LocationHistory } from '@/shared/types';
import { Clock } from 'lucide-react';

interface LocationHistoryListProps {
  history: LocationHistory[];
}

export default function LocationHistoryList({ history }: LocationHistoryListProps) {
  if (!history || history.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <Clock className="w-12 h-12 mx-auto mb-2 opacity-50" />
        <p>No location history available.</p>
      </div>
    );
  }
  return (
    <div className="space-y-4">
      {history.map((entry) => (
        <div key={entry.id} className="border-l-4 border-blue-600 pl-4 py-2 hover:bg-gray-50 transition-colors rounded-r-lg">
          <div>
            <p className="font-bold text-gray-900">{new Date(entry.timestamp).toLocaleString()} - {entry.location_city}</p>
            <p className="text-sm text-gray-600 mt-1">Status: <span className="font-medium">{entry.status}</span></p>
            {entry.notes && <p className="text-sm text-gray-500 mt-1 italic">{entry.notes}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}
