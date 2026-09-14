import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ArrowLeft, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import ReceiptModal from '../components/ReceiptModal';
import AccessDisclaimer from '../components/AccessDisclaimer';

const TransactionItem = ({ t, onClick }) => {
  const isCredit = t.amount > 0;
  return (
    <button
      onClick={() => onClick?.(t)}
      className="w-full text-left flex items-start justify-between py-3 border-b border-gray-100 last:border-0 hover:bg-gray-50/70 transition px-2 rounded-lg active:scale-[0.99]"
    >
      <div className="flex items-start gap-3 min-w-0 flex-1">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${isCredit ? 'bg-green-50' : 'bg-red-50'}`}>
          {isCredit ? <ArrowUpRight size={18} className="text-green-600" /> : <ArrowDownRight size={18} className="text-red-500" />}
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-sm text-gray-800 truncate">{t.merchant}</p>

          {t.description && (
            <p className="text-xs text-gray-600 mt-0.5 truncate">{t.description}</p>
          )}
          {t.sentFrom && (
            <p className="text-xs text-gray-500 mt-0.5 truncate">
              From: <span className="font-medium text-gray-700">{t.sentFrom}</span>
            </p>
          )}

          <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
            <span className="whitespace-nowrap">
              {t.date}{t.time ? ` · ${t.time}` : ''}
            </span>
            <span className={`inline-block w-1.5 h-1.5 rounded-full flex-shrink-0 ${t.status === 'Pending' ? 'bg-amber-400' : 'bg-green-500'}`} />
            <span className="whitespace-nowrap">{t.status}</span>
          </div>
        </div>
      </div>
      <span className={`font-semibold text-sm flex-shrink-0 ml-2 mt-0.5 ${isCredit ? 'text-green-600' : 'text-gray-800'}`}>
        {isCredit ? '+' : ''}{t.amount.toFixed(2)}
      </span>
    </button>
  );
};

const Account = () => {
  const navigate = useNavigate();
  const { balance, transactions } = useApp();
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  const handleTransactionClick = (t) => {
    if (t.amount >= 900000 && t.sentFrom) {
      setShowDisclaimer(true);
      return;
    }
    setSelectedTransaction(t);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="bg-navy text-white p-5 rounded-b-3xl flex items-center gap-3">
        <button onClick={() => navigate(-1)}><ArrowLeft size={24} /></button>
        <span className="font-bold text-lg">My Account</span>
      </div>
      <div className="px-5 -mt-6 space-y-4">
        <div className="bg-white rounded-2xl card-shadow p-5">
          <p className="text-sm text-gray-400">Community First Credit Union Classic Checking</p>
          <h3 className="text-2xl font-bold mt-1">${balance.toLocaleString()}</h3>
          <p className="text-sm text-gray-500">Available balance</p>
          <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
            <div><span className="text-gray-400">Current</span><br /><span className="font-semibold">$980,371.00</span></div>
            <div><span className="text-gray-400">Account #</span><br /><span className="font-mono">•••• 6419</span></div>
            <div><span className="text-gray-400">Routing</span><br /><span className="font-mono">021000021</span></div>
            <div><span className="text-gray-400">Type</span><br /><span>Classic</span></div>
          </div>
          <button className="w-full mt-4 bg-navy text-white py-2.5 rounded-xl text-sm font-medium">View Statements</button>
        </div>
        <div className="bg-white rounded-2xl card-shadow p-4">
          <h4 className="font-semibold text-sm mb-1">Recent Activity</h4>
          {transactions.slice(0, 4).map(t => (
            <TransactionItem key={t.id} t={t} onClick={handleTransactionClick} />
          ))}
        </div>
      </div>

      <ReceiptModal
        transaction={selectedTransaction}
        onClose={() => setSelectedTransaction(null)}
      />

      <AccessDisclaimer
        isOpen={showDisclaimer}
        onClose={() => setShowDisclaimer(false)}
      />
    </div>
  );
};

export default Account;