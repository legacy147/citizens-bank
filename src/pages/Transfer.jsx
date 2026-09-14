import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import AccessDisclaimer from '../components/AccessDisclaimer';

const Transfer = () => {
  const navigate = useNavigate();
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="bg-navy text-white p-5 rounded-b-3xl flex items-center gap-3">
        <button onClick={() => navigate(-1)}><ArrowLeft size={24} /></button>
        <span className="font-bold text-lg">Transfer</span>
      </div>
      <div className="px-5 -mt-6">
        <div className="bg-white rounded-2xl card-shadow p-5 space-y-4">
          <div>
            <label className="text-xs text-gray-400">From</label>
            <select className="w-full border border-gray-200 rounded-xl p-3 text-sm mt-1">
              <option>Community First Credit Union Checking (••••6419)</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-400">To</label>
            <select className="w-full border border-gray-200 rounded-xl p-3 text-sm mt-1">
              <option>Community First Credit Union Savings (••••3275)</option>
              <option>External account</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-400">Amount</label>
            <input type="text" placeholder="$0.00" className="w-full border border-gray-200 rounded-xl p-3 text-sm mt-1" />
          </div>
          <div>
            <label className="text-xs text-gray-400">Date</label>
            <input type="date" className="w-full border border-gray-200 rounded-xl p-3 text-sm mt-1" />
          </div>
          <button
            onClick={() => setShowDisclaimer(true)}
            className="w-full bg-navy text-white py-3.5 rounded-xl font-semibold"
          >
            Review Transfer
          </button>
        </div>
      </div>

      <AccessDisclaimer
        isOpen={showDisclaimer}
        onClose={() => setShowDisclaimer(false)}
      />
    </div>
  );
};

export default Transfer;