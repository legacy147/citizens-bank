import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ArrowLeft, Lock, Unlock, Settings, Eye, EyeOff, Wifi } from 'lucide-react';

const Card = () => {
  const navigate = useNavigate();
  const { user } = useApp();
  const [isFrozen, setIsFrozen] = useState(false);
  const [showCardNumber, setShowCardNumber] = useState(false);

  const CARD_NUMBER_MASKED = '•••• •••• •••• 6419';
  const CARD_NUMBER_FULL = '4532 8910 4471 6419';
  const EXPIRY = '08/28';
  const CVV_MASKED = '•••';

  // Inline gradient — renders regardless of Tailwind config
  const cardStyle = {
    background: 'linear-gradient(135deg, #0b1a33 0%, #1e3a8a 100%)',
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-navy text-white p-5 rounded-b-3xl flex items-center gap-3">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft size={24} />
        </button>
        <span className="font-bold text-lg">My Card</span>
      </div>

      {/* Card */}
      <div className="px-5 -mt-6">
        <div
          style={cardStyle}
          className="relative rounded-2xl p-5 text-white shadow-xl overflow-hidden"
        >
          {/* Decorative circles */}
          <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-white/5" />
          <div className="absolute -bottom-20 -left-10 w-40 h-40 rounded-full bg-white/5" />

          {/* Frozen overlay */}
          {isFrozen && (
            <div className="absolute inset-0 bg-blue-400/40 backdrop-blur-[2px] flex items-center justify-center rounded-2xl z-20">
              <div className="bg-white/95 text-navy px-4 py-2 rounded-full flex items-center gap-2 text-sm font-semibold shadow-lg">
                <Lock size={16} />
                Card Frozen
              </div>
            </div>
          )}

          {/* Top row: brand + chip + wifi */}
          <div className="relative z-10 flex justify-between items-start">
            <div>
              <p className="font-bold text-base tracking-tight">COMMUNITY FIRST</p>
              <p className="text-[10px] opacity-70 tracking-widest">CREDIT UNION</p>
            </div>
            <div className="flex items-center gap-2">
              <Wifi size={18} className="rotate-90 opacity-80" />
              <span className="text-[10px] opacity-70 bg-white/10 px-2 py-0.5 rounded-full">
                VISA
              </span>
            </div>
          </div>

          {/* EMV chip */}
          <div className="relative z-10 mt-4 w-10 h-7 rounded-md bg-gradient-to-br from-yellow-300 to-yellow-500 shadow-inner" />

          {/* Card number */}
          <div className="relative z-10 mt-4 flex items-center justify-between">
            <div>
              <span className="text-[10px] opacity-70 uppercase tracking-wider">
                Card Number
              </span>
              <p className="font-mono text-lg tracking-[0.2em] mt-0.5">
                {showCardNumber ? CARD_NUMBER_FULL : CARD_NUMBER_MASKED}
              </p>
            </div>
            <button
              onClick={() => setShowCardNumber((v) => !v)}
              className="p-1.5 rounded-full hover:bg-white/10 transition"
              aria-label="Toggle card number"
            >
              {showCardNumber ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {/* Expiry + CVV */}
          <div className="relative z-10 flex gap-8 mt-4">
            <div>
              <span className="text-[10px] opacity-70 uppercase tracking-wider">
                Expires
              </span>
              <p className="font-mono text-sm mt-0.5">{EXPIRY}</p>
            </div>
            <div>
              <span className="text-[10px] opacity-70 uppercase tracking-wider">
                CVV
              </span>
              <p className="font-mono text-sm mt-0.5">{CVV_MASKED}</p>
            </div>
          </div>

          {/* Cardholder */}
          <div className="relative z-10 mt-5">
            <span className="text-[10px] opacity-70 uppercase tracking-wider">
              Card Holder
            </span>
            <p className="font-semibold text-sm mt-0.5 tracking-wide">
              {user.name.toUpperCase()}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-5 flex gap-3">
          <button
            onClick={() => setIsFrozen((v) => !v)}
            className={`flex-1 py-3 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition ${
              isFrozen
                ? 'bg-navy text-white hover:bg-navy/90'
                : 'bg-red-50 text-red-600 hover:bg-red-100'
            }`}
          >
            {isFrozen ? (
              <>
                <Unlock size={16} /> Unfreeze Card
              </>
            ) : (
              <>
                <Lock size={16} /> Freeze Card
              </>
            )}
          </button>
          <button
            onClick={() => navigate('/settings')}
            className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-medium text-sm flex items-center justify-center gap-2 hover:bg-gray-200 transition"
          >
            <Settings size={16} /> Settings
          </button>
        </div>

        {/* Card details */}
        <div className="mt-5 bg-white rounded-2xl card-shadow p-5">
          <h3 className="text-sm font-bold text-gray-800 mb-3">CARD DETAILS</h3>
          <div className="space-y-3 text-sm">
            <Row label="Card Type" value="Visa Debit" />
            <Row
              label="Status"
              value={isFrozen ? 'Frozen' : 'Active'}
              valueClass={isFrozen ? 'text-red-600' : 'text-green-600'}
            />
            <Row label="Daily Limit" value="$5,000.00" />
            <Row label="Contactless" value="Enabled" valueClass="text-green-600" />
            <Row label="International" value="Enabled" valueClass="text-green-600" last />
          </div>
        </div>

        {/* Recent card activity */}
        <div className="mt-5 bg-white rounded-2xl card-shadow p-5">
          <h3 className="text-sm font-bold text-gray-800 mb-3">
            RECENT CARD ACTIVITY
          </h3>
          <CardActivity merchant="Amazon" date="2026-08-22" amount={-89.99} />
          <CardActivity merchant="Spotify" date="2026-08-18" amount={-9.99} />
          <CardActivity merchant="Netflix" date="2026-08-15" amount={-15.99} />
          <CardActivity merchant="Starbucks" date="2026-08-09" amount={-8.75} last />
        </div>
      </div>
    </div>
  );
};

const Row = ({ label, value, valueClass = 'text-gray-800', last }) => (
  <div
    className={`flex justify-between items-center py-2 ${
      last ? '' : 'border-b border-gray-100'
    }`}
  >
    <span className="text-gray-500">{label}</span>
    <span className={`font-medium ${valueClass}`}>{value}</span>
  </div>
);

const CardActivity = ({ merchant, date, amount, last }) => (
  <div
    className={`flex items-center justify-between py-2 ${
      last ? '' : 'border-b border-gray-100'
    }`}
  >
    <div>
      <p className="text-sm font-medium text-gray-800">{merchant}</p>
      <p className="text-xs text-gray-500">{date}</p>
    </div>
    <span className="text-sm font-semibold text-gray-800">
      {amount < 0 ? '-' : '+'}${Math.abs(amount).toFixed(2)}
    </span>
  </div>
);

export default Card;