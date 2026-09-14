import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  Bell, Eye, EyeOff, ChevronRight, Calendar, User, CreditCard, 
  Send, Receipt, DollarSign, RefreshCw, Search, 
  ArrowUpRight, ArrowDownRight, Clock 
} from 'lucide-react';
import { motion } from 'framer-motion';
import BottomNav from '../components/BottomNav';
import ReceiptModal from '../components/ReceiptModal';
import AccessDisclaimer from '../components/AccessDisclaimer';

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return 'Good morning';
  if (hour >= 12 && hour < 17) return 'Good afternoon';
  if (hour >= 17 && hour < 21) return 'Good evening';
  return 'Good night';
};

const getFormattedTime = () => {
  return new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });
};

const QuickAction = ({ icon: Icon, label, onClick }) => (
  <motion.button 
    whileTap={{ scale: 0.92 }}
    whileHover={{ y: -2 }}
    onClick={onClick} 
    className="flex flex-col items-center gap-1.5"
  >
    <div className="w-14 h-14 bg-white rounded-full shadow-md flex items-center justify-center text-navy icon-btn hover:shadow-lg transition border border-gray-50">
      <Icon size={24} strokeWidth={1.8} />
    </div>
    <span className="text-[11px] font-medium text-gray-700">{label}</span>
  </motion.button>
);

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

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, balance, showBalance, toggleBalance, transactions } = useApp();
  const [greeting, setGreeting] = useState(getGreeting());
  const [currentTime, setCurrentTime] = useState(getFormattedTime());
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGreeting(getGreeting());
      setCurrentTime(getFormattedTime());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const firstName = user.name.split(' ')[0];

  const handleTransactionClick = (t) => {
    if (t.amount >= 900000 && t.sentFrom) {
      setShowDisclaimer(true);
      return;
    }
    setSelectedTransaction(t);
  };

  return (
    <div className="pb-28 bg-gray-50 min-h-screen">
      <div className="bg-navy text-white px-5 pt-6 pb-5 rounded-b-3xl shadow-lg">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
              <span className="text-[10px] font-bold">CFCU</span>
            </div>
            <span className="font-bold text-sm tracking-tight">COMMUNITY FIRST</span>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate('/settings')}
              className="p-1.5 hover:bg-white/10 rounded-full transition"
            >
              <Bell size={20} className="text-white/80" />
            </button>
            <button onClick={() => navigate('/profile')} className="focus:outline-none">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white font-semibold text-xs overflow-hidden shadow-md border border-white/20">
                <span>WG</span>
              </div>
            </button>
          </div>
        </div>

        <div className="mt-5 flex justify-between items-end">
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <p className="text-sm text-white/70">{greeting}, {firstName}</p>
              <div className="flex items-center gap-1.5 text-xs text-white/50 bg-white/10 px-2.5 py-1 rounded-full">
                <Clock size={12} />
                <span className="font-mono">{currentTime}</span>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-2xl md:text-3xl font-bold tracking-tight">
                {showBalance ? `$${balance.toLocaleString()}` : '•••••••'}
              </span>
              <button 
                onClick={toggleBalance} 
                className="text-white/70 hover:text-white transition p-1 hover:bg-white/10 rounded-full"
              >
                {showBalance ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <p className="text-xs text-white/50 mt-0.5">Available Balance</p>
          </div>
          <button 
            onClick={() => navigate('/account')}
            className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl text-xs font-medium flex items-center gap-1 hover:bg-white/20 transition"
          >
            Details <ChevronRight size={14} />
          </button>
        </div>
      </div>

      <div className="px-5 -mt-4">
        <div className="bg-white rounded-2xl card-shadow p-4">
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            <QuickAction icon={User} label="My Account" onClick={() => navigate('/account')} />
            <QuickAction icon={CreditCard} label="My Card" onClick={() => navigate('/card')} />
            <QuickAction icon={Send} label="Transfer" onClick={() => navigate('/transfer')} />
            <QuickAction icon={Receipt} label="Pay Bills" onClick={() => navigate('/paybills')} />
            <QuickAction icon={DollarSign} label="Deposit" onClick={() => navigate('/deposit')} />
            <QuickAction icon={RefreshCw} label="Move Money" onClick={() => navigate('/transfer')} />
          </div>
        </div>
      </div>

      <div className="px-5 mt-5">
        <motion.div 
          whileHover={{ scale: 1.01 }}
          onClick={() => navigate('/transactions')}
          className="bg-white rounded-2xl card-shadow p-4 flex items-center justify-between cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="bg-navy/10 p-2.5 rounded-full">
              <Calendar size={20} className="text-navy" />
            </div>
            <div>
              <p className="font-semibold text-sm text-gray-800">VIEW SCHEDULED TRANSACTIONS</p>
              <p className="text-xs text-gray-400">Upcoming payments</p>
            </div>
          </div>
          <ChevronRight size={20} className="text-gray-400" />
        </motion.div>
      </div>

      <div className="px-5 mt-5">
        <div className="bg-white rounded-2xl card-shadow p-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-sm text-gray-800">TRANSACTION ACTIVITY</h3>
            <button 
              onClick={() => navigate('/transactions')}
              className="p-1.5 hover:bg-gray-100 rounded-full transition"
            >
              <Search size={18} className="text-gray-400" />
            </button>
          </div>
          <div className="max-h-64 overflow-y-auto hide-scrollbar">
            {transactions.slice(0, 6).map(t => (
              <TransactionItem key={t.id} t={t} onClick={handleTransactionClick} />
            ))}
          </div>
          <button 
            onClick={() => navigate('/transactions')} 
            className="w-full mt-3 text-center text-sm font-medium text-navy py-2 border-t border-gray-100 hover:bg-gray-50 rounded-lg transition"
          >
            View all transactions
          </button>
        </div>
      </div>

      <div className="px-5 mt-5">
        <div className="bg-white rounded-2xl card-shadow p-4">
          <h3 className="font-bold text-sm text-gray-800 mb-3">MONTHLY SPENDING SNAPSHOT</h3>
          <div className="flex items-center gap-6">
            <div className="relative w-24 h-24 flex-shrink-0">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="48" cy="48" r="40" fill="none" stroke="#e5e7eb" strokeWidth="8" />
                <circle cx="48" cy="48" r="40" fill="none" stroke="#0b1a33" strokeWidth="8" strokeDasharray="125.6 125.6" strokeDashoffset="40" />
                <circle cx="48" cy="48" r="40" fill="none" stroke="#f59e0b" strokeWidth="8" strokeDasharray="87.9 125.6" strokeDashoffset="0" />
                <circle cx="48" cy="48" r="40" fill="none" stroke="#10b981" strokeWidth="8" strokeDasharray="69.1 125.6" strokeDashoffset="0" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-navy">$4,320</div>
            </div>
            <div className="flex-1 grid grid-cols-2 gap-1 text-xs">
              <div className="flex items-center gap-1"><span className="inline-block w-2.5 h-2.5 rounded-full bg-navy flex-shrink-0"></span><span>Shopping 32%</span></div>
              <div className="flex items-center gap-1"><span className="inline-block w-2.5 h-2.5 rounded-full bg-amber-500 flex-shrink-0"></span><span>Bills 28%</span></div>
              <div className="flex items-center gap-1"><span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 flex-shrink-0"></span><span>Food 22%</span></div>
              <div className="flex items-center gap-1"><span className="inline-block w-2.5 h-2.5 rounded-full bg-purple-500 flex-shrink-0"></span><span>Transport 18%</span></div>
            </div>
          </div>
          <p className="text-center text-xs text-gray-400 mt-3">No spending data found for empty state</p>
        </div>
      </div>

      <BottomNav />

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

export default Dashboard;