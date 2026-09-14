import { ArrowUpRight, ArrowDownRight, ArrowLeftRight, RefreshCw, FileText, CircleDollarSign } from 'lucide-react';

export function formatCurrency(amount) {
  return (amount < 0 ? '-$' : '$') + Math.abs(amount).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function getTxIcon(type) {
  switch (type) {
    case 'deposit': return ArrowUpRight;
    case 'payment': return ArrowDownRight;
    case 'transfer': return ArrowLeftRight;
    case 'refund': return RefreshCw;
    case 'bills': return FileText;
    default: return CircleDollarSign;
  }
}

export function getTxColor(type) {
  switch (type) {
    case 'deposit': return 'text-emerald-600';
    case 'payment': return 'text-rose-600';
    case 'transfer': return 'text-blue-600';
    case 'refund': return 'text-amber-600';
    case 'bills': return 'text-indigo-600';
    default: return 'text-gray-600';
  }
}

export function getStatusColor(status) {
  switch (status) {
    case 'Completed': return 'text-emerald-600 bg-emerald-50';
    case 'Pending': return 'text-amber-600 bg-amber-50';
    case 'Scheduled': return 'text-blue-600 bg-blue-50';
    default: return 'text-gray-500 bg-gray-50';
  }
}

export function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function getRecentTx(txs, n = 5) {
  return [...txs].reverse().slice(0, n);
}

export function getFilteredTx(search, type, status, sort, txs) {
  let result = [...txs];
  if (search.trim()) {
    const q = search.trim().toLowerCase();
    result = result.filter(t =>
      t.description.toLowerCase().includes(q) ||
      t.merchant.toLowerCase().includes(q)
    );
  }
  if (type !== 'all') {
    result = result.filter(t => t.type === type);
  }
  if (status !== 'all') {
    result = result.filter(t => t.status === status);
  }
  if (sort === 'newest') {
    result.sort((a, b) => new Date(b.date) - new Date(a.date));
  } else {
    result.sort((a, b) => new Date(a.date) - new Date(b.date));
  }
  return result;
}