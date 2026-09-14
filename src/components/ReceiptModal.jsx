import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Check, Clock, ArrowDownLeft, ArrowUpRight, 
  Building2, FileText, Calendar, User, Hash, Share2, Download
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const ReceiptModal = ({ transaction, onClose }) => {
  const { user } = useApp();

  if (!transaction) return null;

  const isCredit = transaction.amount > 0;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4"
      >
        <motion.div
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl shadow-2xl max-h-[92vh] overflow-y-auto hide-scrollbar"
        >
          <div className="sticky top-0 bg-white z-10 px-5 pt-4 pb-3 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-base font-bold text-gray-800">Transaction Receipt</h2>
            <button onClick={onClose} className="p-1.5 rounded-full hover:bg-gray-100 transition">
              <X size={20} className="text-gray-500" />
            </button>
          </div>

          <div className="px-5 py-6 text-center bg-gradient-to-b from-navy/5 to-transparent">
            <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-3 ${isCredit ? 'bg-green-100' : 'bg-red-100'}`}>
              {isCredit ? <ArrowDownLeft size={28} className="text-green-600" /> : <ArrowUpRight size={28} className="text-red-500" />}
            </div>
            <p className={`text-3xl font-bold tracking-tight ${isCredit ? 'text-green-600' : 'text-gray-800'}`}>
              {isCredit ? '+' : '-'}${Math.abs(transaction.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </p>
            <div className="mt-2 inline-flex items-center gap-1.5 bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
              <Check size={12} />
              {transaction.status}
            </div>
          </div>

          <div className="px-5 pb-5">
            <div className="bg-gray-50 rounded-2xl p-4 space-y-3.5">
              {transaction.sentFrom && (
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-white rounded-full shadow-sm"><Building2 size={16} className="text-navy" /></div>
                  <div className="flex-1">
                    <p className="text-[11px] uppercase tracking-wide text-gray-400 font-medium">Sent From</p>
                    <p className="text-sm font-semibold text-gray-800">{transaction.sentFrom}</p>
                  </div>
                </div>
              )}

              {transaction.description && (
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-white rounded-full shadow-sm"><FileText size={16} className="text-navy" /></div>
                  <div className="flex-1">
                    <p className="text-[11px] uppercase tracking-wide text-gray-400 font-medium">Description</p>
                    <p className="text-sm font-semibold text-gray-800">{transaction.description}</p>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-3">
                <div className="p-2 bg-white rounded-full shadow-sm"><Calendar size={16} className="text-navy" /></div>
                <div className="flex-1">
                  <p className="text-[11px] uppercase tracking-wide text-gray-400 font-medium">Date</p>
                  <p className="text-sm font-semibold text-gray-800">{transaction.date}</p>
                </div>
              </div>

              {transaction.time && (
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-white rounded-full shadow-sm"><Clock size={16} className="text-navy" /></div>
                  <div className="flex-1">
                    <p className="text-[11px] uppercase tracking-wide text-gray-400 font-medium">Time</p>
                    <p className="text-sm font-semibold text-gray-800">{transaction.time}</p>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-3">
                <div className="p-2 bg-white rounded-full shadow-sm"><User size={16} className="text-navy" /></div>
                <div className="flex-1">
                  <p className="text-[11px] uppercase tracking-wide text-gray-400 font-medium">Receiver</p>
                  <p className="text-sm font-semibold text-gray-800">{user.name}</p>
                  <p className="text-xs text-gray-500">Community First Credit Union • Classic Checking</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-white rounded-full shadow-sm"><Hash size={16} className="text-navy" /></div>
                <div className="flex-1">
                  <p className="text-[11px] uppercase tracking-wide text-gray-400 font-medium">Transaction ID</p>
                  <p className="text-sm font-mono text-gray-800">
                    TXN-{String(transaction.id).padStart(6, '0')}-{transaction.date.replace(/-/g, '')}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 flex gap-3">
              <button className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium text-sm flex items-center justify-center gap-2 hover:bg-gray-200 transition">
                <Share2 size={16} /> Share
              </button>
              <button className="flex-1 py-3 bg-navy text-white rounded-xl font-medium text-sm flex items-center justify-center gap-2 hover:bg-navy/90 transition">
                <Download size={16} /> Download
              </button>
            </div>

            <p className="text-center text-[11px] text-gray-400 mt-4 leading-relaxed">
              This is an official receipt from Community First Credit Union.<br />
              Keep it for your records.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ReceiptModal;