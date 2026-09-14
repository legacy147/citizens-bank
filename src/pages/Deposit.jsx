import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, DollarSign } from 'lucide-react';
import BottomNav from '../components/BottomNav';

const Deposit = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 pb-28">
      <div className="bg-navy text-white p-5 rounded-b-3xl flex items-center gap-3">
        <button onClick={() => navigate(-1)}><ArrowLeft size={24} /></button>
        <span className="font-bold text-lg">Deposit</span>
      </div>
      <div className="px-5 -mt-6">
        <div className="bg-white rounded-2xl card-shadow p-8 text-center text-gray-500">
          <DollarSign className="mx-auto mb-2 text-navy" size={40} />
          <p className="text-sm font-medium text-gray-700">Deposit</p>
          <p className="text-xs text-gray-400 mt-1">Deposit checks or cash here</p>
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default Deposit;