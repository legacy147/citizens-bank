import React, { createContext, useContext, useState } from 'react';
import { TRANSACTIONS } from '../data/transactions';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: 'William Garrett',
    email: 'unitedcommand574@gmail.com',
  });
  const [balance] = useState(980371.00); // updated
  const [showBalance, setShowBalance] = useState(true);
  const [transactions] = useState(TRANSACTIONS);

  const VALID_CREDENTIALS = {
    username: 'unitedcommand574@gmail.com',
    password: 'william2026',
  };

  const toggleBalance = () => setShowBalance(!showBalance);

  return (
    <AppContext.Provider value={{
      user, setUser, balance, showBalance, toggleBalance, transactions, VALID_CREDENTIALS
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);