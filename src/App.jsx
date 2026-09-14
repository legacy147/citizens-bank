import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Profile from './pages/Profile';
import Account from './pages/Account';
import Card from './pages/Card';
import Transfer from './pages/Transfer';
import PayBills from './pages/PayBills';
import Deposit from './pages/Deposit';
import Settings from './pages/Settings';

const Search = () => (
  <div className="min-h-screen bg-gray-50 p-5">
    <div className="bg-white rounded-2xl p-8 text-center text-gray-500">Search</div>
  </div>
);

function App() {
  return (
    <AppProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/account" element={<Account />} />
        <Route path="/card" element={<Card />} />
        <Route path="/transfer" element={<Transfer />} />
        <Route path="/paybills" element={<PayBills />} />
        <Route path="/deposit" element={<Deposit />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </AppProvider>
  );
}

export default App;