import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Search, Send, Receipt, User } from 'lucide-react';

const navItems = [
  { icon: Home,    label: 'Home',      path: '/dashboard' },
  { icon: Search,  label: 'Search',    path: '/search' },
  { icon: Send,    label: 'Transfer',  path: '/transfer' },
  { icon: Receipt, label: 'Pay Bills', path: '/paybills' },
  { icon: User,    label: 'Profile',   path: '/profile' },
];

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200/60 px-2 py-2 flex justify-around items-center z-50">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center text-xs py-1 px-3 rounded-xl transition ${
              isActive ? 'text-navy font-semibold bg-navy/5' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <item.icon size={22} strokeWidth={isActive ? 2.5 : 1.8} />
            <span className="mt-0.5 text-[10px]">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default BottomNav;