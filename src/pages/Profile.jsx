import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, UserCircle, Settings, Shield, BellRing, HelpCircle, 
  LogOut, PenLine, ChevronRight, Mail, MapPin, Save, FileText, MessageCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import BottomNav from '../components/BottomNav';

export default function Profile() {
  const navigate = useNavigate();
  const { user, setUser, balance } = useApp();
  const [activeModal, setActiveModal] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const [personalInfo, setPersonalInfo] = useState({
    name: user.name,
    email: 'Unitedcommand574@gmail.com',
    address: '120 E Alder StFort Bragg, CA 95437 United States'
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactor: true,
    biometrics: false,
    faceId: true,
    fingerprint: false,
    deviceManagement: true
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailAlerts: true,
    pushNotifications: true,
    smsAlerts: false,
    transactionAlerts: true,
    securityAlerts: true,
    promotionalEmails: false
  });

  const [accountSettings, setAccountSettings] = useState({
    language: 'English',
    currency: 'USD ($)',
    timezone: 'EST (UTC-5)',
    darkMode: false,
    autoSave: true
  });

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      navigate('/');
    }
  };

  const handleSavePersonalInfo = () => {
    setUser({ ...user, name: personalInfo.name, email: personalInfo.email });
    alert('Personal information updated successfully');
    setEditMode(false);
  };

  const toggleSetting = (setting, setter) => {
    setter(prev => ({ ...prev, [setting]: !prev[setting] }));
  };

  // ─── Edit Profile Modal ───
  if (editMode) {
    return (
      <div className="min-h-screen bg-[#f5f7fb] pb-28">
        <div className="sticky top-0 z-10 bg-[#f5f7fb] px-4 pt-4 pb-2 flex items-center gap-3">
          <button onClick={() => setEditMode(false)} className="p-2 rounded-full bg-white shadow-sm hover:bg-gray-50 transition">
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <h2 className="text-lg font-bold text-gray-800">Edit Profile</h2>
        </div>
        <div className="px-4 space-y-4 pt-4">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex flex-col items-center mb-6">
              <div className="w-24 h-24 rounded-full bg-navy flex items-center justify-center text-white text-3xl font-bold shadow-lg relative">
                WG
                <button className="absolute bottom-0 right-0 p-2 bg-navy rounded-full text-white border-2 border-white shadow-md">
                  <PenLine className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-gray-500">Full Name</label>
                <div className="mt-1 flex items-center gap-2 bg-gray-50 rounded-xl px-4 py-3 border border-gray-200">
                  <UserCircle className="w-4 h-4 text-gray-400" />
                  <input type="text" value={personalInfo.name}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, name: e.target.value })}
                    className="flex-1 bg-transparent text-sm focus:outline-none" />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500">Email Address</label>
                <div className="mt-1 flex items-center gap-2 bg-gray-50 rounded-xl px-4 py-3 border border-gray-200">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <input type="email" value={personalInfo.email}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                    className="flex-1 bg-transparent text-sm focus:outline-none" />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500">Address</label>
                <div className="mt-1 flex items-center gap-2 bg-gray-50 rounded-xl px-4 py-3 border border-gray-200">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <input type="text" value={personalInfo.address}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, address: e.target.value })}
                    className="flex-1 bg-transparent text-sm focus:outline-none" />
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setEditMode(false)} className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold text-sm hover:bg-gray-200 transition">Cancel</button>
              <button onClick={handleSavePersonalInfo} className="flex-1 py-3 bg-navy text-white rounded-xl font-semibold text-sm shadow-lg shadow-navy/20 hover:bg-navy/90 transition flex items-center justify-center gap-2">
                <Save className="w-4 h-4" /> Save Changes
              </button>
            </div>
          </div>
        </div>
        <BottomNav />
      </div>
    );
  }

  // ─── Personal Information Modal ───
  if (activeModal === 'personal') {
    return (
      <div className="min-h-screen bg-[#f5f7fb] pb-28">
        <div className="sticky top-0 z-10 bg-[#f5f7fb] px-4 pt-4 pb-2 flex items-center gap-3">
          <button onClick={() => setActiveModal(null)} className="p-2 rounded-full bg-white shadow-sm hover:bg-gray-50 transition">
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <h2 className="text-lg font-bold text-gray-800">Personal Information</h2>
        </div>
        <div className="px-4 pt-4 space-y-4">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-gray-50">
                <div><p className="text-sm font-medium text-gray-800">Full Name</p><p className="text-sm text-gray-500">{personalInfo.name}</p></div>
                <button onClick={() => setEditMode(true)} className="text-navy text-sm font-medium">Edit</button>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-gray-50">
                <div><p className="text-sm font-medium text-gray-800">Email</p><p className="text-sm text-gray-500">{personalInfo.email}</p></div>
                <button onClick={() => setEditMode(true)} className="text-navy text-sm font-medium">Edit</button>
              </div>
              <div className="flex items-center justify-between py-3">
                <div><p className="text-sm font-medium text-gray-800">Address</p><p className="text-sm text-gray-500">{personalInfo.address}</p></div>
                <button onClick={() => setEditMode(true)} className="text-navy text-sm font-medium">Edit</button>
              </div>
            </div>
          </div>
          <button onClick={() => setEditMode(true)} className="w-full py-3 bg-navy text-white rounded-xl font-semibold text-sm shadow-lg shadow-navy/20 hover:bg-navy/90 transition">
            Edit All Information
          </button>
        </div>
        <BottomNav />
      </div>
    );
  }

  // ─── Account Settings Modal ───
  if (activeModal === 'account') {
    return (
      <div className="min-h-screen bg-[#f5f7fb] pb-28">
        <div className="sticky top-0 z-10 bg-[#f5f7fb] px-4 pt-4 pb-2 flex items-center gap-3">
          <button onClick={() => setActiveModal(null)} className="p-2 rounded-full bg-white shadow-sm hover:bg-gray-50 transition">
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <h2 className="text-lg font-bold text-gray-800">Account Settings</h2>
        </div>
        <div className="px-4 pt-4 space-y-4">
          <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
            <div>
              <label className="text-xs font-medium text-gray-500">Language</label>
              <select value={accountSettings.language} onChange={(e) => setAccountSettings({ ...accountSettings, language: e.target.value })}
                className="w-full mt-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm">
                <option>English</option><option>Spanish</option><option>French</option><option>German</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500">Currency</label>
              <select value={accountSettings.currency} onChange={(e) => setAccountSettings({ ...accountSettings, currency: e.target.value })}
                className="w-full mt-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm">
                <option>USD ($)</option><option>EUR (€)</option><option>GBP (£)</option><option>CAD ($)</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500">Timezone</label>
              <select value={accountSettings.timezone} onChange={(e) => setAccountSettings({ ...accountSettings, timezone: e.target.value })}
                className="w-full mt-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm">
                <option>EST (UTC-5)</option><option>CST (UTC-6)</option><option>PST (UTC-8)</option><option>GMT (UTC+0)</option>
              </select>
            </div>
            <div className="flex items-center justify-between py-3 border-t border-gray-50">
              <div><p className="text-sm font-medium text-gray-800">Dark Mode</p><p className="text-xs text-gray-400">Switch to dark theme</p></div>
              <div onClick={() => setAccountSettings({ ...accountSettings, darkMode: !accountSettings.darkMode })}
                className={`w-12 h-7 rounded-full cursor-pointer transition ${accountSettings.darkMode ? 'bg-navy' : 'bg-gray-300'}`}>
                <div className={`w-5 h-5 rounded-full bg-white shadow-md transition transform ${accountSettings.darkMode ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </div>
            </div>
            <div className="flex items-center justify-between py-3 border-t border-gray-50">
              <div><p className="text-sm font-medium text-gray-800">Auto-Save</p><p className="text-xs text-gray-400">Automatically save transactions</p></div>
              <div onClick={() => setAccountSettings({ ...accountSettings, autoSave: !accountSettings.autoSave })}
                className={`w-12 h-7 rounded-full cursor-pointer transition ${accountSettings.autoSave ? 'bg-navy' : 'bg-gray-300'}`}>
                <div className={`w-5 h-5 rounded-full bg-white shadow-md transition transform ${accountSettings.autoSave ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </div>
            </div>
          </div>
          <button onClick={() => alert('Settings saved successfully')} className="w-full py-3 bg-navy text-white rounded-xl font-semibold text-sm shadow-lg shadow-navy/20">
            Save Settings
          </button>
        </div>
        <BottomNav />
      </div>
    );
  }

  // ─── Security Modal ───
  if (activeModal === 'security') {
    return (
      <div className="min-h-screen bg-[#f5f7fb] pb-28">
        <div className="sticky top-0 z-10 bg-[#f5f7fb] px-4 pt-4 pb-2 flex items-center gap-3">
          <button onClick={() => setActiveModal(null)} className="p-2 rounded-full bg-white shadow-sm hover:bg-gray-50 transition">
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <h2 className="text-lg font-bold text-gray-800">Security</h2>
        </div>
        <div className="px-4 pt-4 space-y-4">
          <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
            {[
              { key: 'twoFactor', label: 'Two-Factor Authentication', desc: 'Extra security layer' },
              { key: 'biometrics', label: 'Biometrics', desc: 'Use fingerprint or face' },
              { key: 'faceId', label: 'Face ID', desc: 'Unlock with Face ID' },
              { key: 'fingerprint', label: 'Fingerprint', desc: 'Unlock with fingerprint' },
              { key: 'deviceManagement', label: 'Device Management', desc: 'Manage trusted devices' },
            ].map(item => (
              <div key={item.key} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                <div><p className="text-sm font-medium text-gray-800">{item.label}</p><p className="text-xs text-gray-400">{item.desc}</p></div>
                <div onClick={() => toggleSetting(item.key, setSecuritySettings)}
                  className={`w-12 h-7 rounded-full cursor-pointer transition ${securitySettings[item.key] ? 'bg-navy' : 'bg-gray-300'}`}>
                  <div className={`w-5 h-5 rounded-full bg-white shadow-md transition transform ${securitySettings[item.key] ? 'translate-x-5' : 'translate-x-0.5'}`} />
                </div>
              </div>
            ))}
            <button className="w-full py-3 border border-rose-200 text-rose-600 rounded-xl font-semibold text-sm hover:bg-rose-50 transition">
              Change Password
            </button>
          </div>
          <button onClick={() => alert('Security settings updated')} className="w-full py-3 bg-navy text-white rounded-xl font-semibold text-sm shadow-lg shadow-navy/20">
            Save Security Settings
          </button>
        </div>
        <BottomNav />
      </div>
    );
  }

  // ─── Notification Settings Modal ───
  if (activeModal === 'notifications') {
    return (
      <div className="min-h-screen bg-[#f5f7fb] pb-28">
        <div className="sticky top-0 z-10 bg-[#f5f7fb] px-4 pt-4 pb-2 flex items-center gap-3">
          <button onClick={() => setActiveModal(null)} className="p-2 rounded-full bg-white shadow-sm hover:bg-gray-50 transition">
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <h2 className="text-lg font-bold text-gray-800">Notification Settings</h2>
        </div>
        <div className="px-4 pt-4 space-y-4">
          <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
            {[
              { key: 'emailAlerts', label: 'Email Alerts', desc: 'Receive notifications via email' },
              { key: 'pushNotifications', label: 'Push Notifications', desc: 'Receive push notifications' },
              { key: 'smsAlerts', label: 'SMS Alerts', desc: 'Receive alerts via SMS' },
              { key: 'transactionAlerts', label: 'Transaction Alerts', desc: 'Alert for every transaction' },
              { key: 'securityAlerts', label: 'Security Alerts', desc: 'Alert for suspicious activity' },
              { key: 'promotionalEmails', label: 'Promotional Emails', desc: 'Receive offers and updates' },
            ].map(item => (
              <div key={item.key} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                <div><p className="text-sm font-medium text-gray-800">{item.label}</p><p className="text-xs text-gray-400">{item.desc}</p></div>
                <div onClick={() => toggleSetting(item.key, setNotificationSettings)}
                  className={`w-12 h-7 rounded-full cursor-pointer transition ${notificationSettings[item.key] ? 'bg-navy' : 'bg-gray-300'}`}>
                  <div className={`w-5 h-5 rounded-full bg-white shadow-md transition transform ${notificationSettings[item.key] ? 'translate-x-5' : 'translate-x-0.5'}`} />
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => alert('Notification settings updated')} className="w-full py-3 bg-navy text-white rounded-xl font-semibold text-sm shadow-lg shadow-navy/20">
            Save Notification Settings
          </button>
        </div>
        <BottomNav />
      </div>
    );
  }

  // ─── Help & Support Modal ───
  if (activeModal === 'help') {
    return (
      <div className="min-h-screen bg-[#f5f7fb] pb-28">
        <div className="sticky top-0 z-10 bg-[#f5f7fb] px-4 pt-4 pb-2 flex items-center gap-3">
          <button onClick={() => setActiveModal(null)} className="p-2 rounded-full bg-white shadow-sm hover:bg-gray-50 transition">
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <h2 className="text-lg font-bold text-gray-800">Help & Support</h2>
        </div>
        <div className="px-4 pt-4 space-y-4">
          <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition">
              <div className="p-2 bg-navy/10 rounded-full text-navy"><FileText className="w-5 h-5" /></div>
              <div><p className="text-sm font-semibold text-gray-800">FAQs</p><p className="text-xs text-gray-400">Find answers to common questions</p></div>
              <ChevronRight className="w-4 h-4 text-gray-300 ml-auto" />
            </div>
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition">
              <div className="p-2 bg-navy/10 rounded-full text-navy"><MessageCircle className="w-5 h-5" /></div>
              <div><p className="text-sm font-semibold text-gray-800">Live Chat</p><p className="text-xs text-gray-400">Chat with our support team</p></div>
              <ChevronRight className="w-4 h-4 text-gray-300 ml-auto" />
            </div>
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition">
              <div className="p-2 bg-navy/10 rounded-full text-navy"><Mail className="w-5 h-5" /></div>
              <div><p className="text-sm font-semibold text-gray-800">Email Support</p><p className="text-xs text-gray-400">citizenfirstcustomerservice@gmail.com</p></div>
              <ChevronRight className="w-4 h-4 text-gray-300 ml-auto" />
            </div>
          </div>
        </div>
        <BottomNav />
      </div>
    );
  }

  // ─── Main Profile Page ───
  return (
    <div className="min-h-screen bg-[#f5f7fb] pb-28">
      <div className="sticky top-0 z-10 bg-[#f5f7fb] px-4 pt-4 pb-2 flex items-center gap-3">
        <button onClick={() => navigate('/dashboard')} className="p-2 rounded-full bg-white shadow-sm hover:bg-gray-50 transition">
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        <h2 className="text-lg font-bold text-gray-800">Profile</h2>
      </div>

      <div className="px-4 space-y-5">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 shadow-sm text-center">
          <div className="w-24 h-24 mx-auto rounded-full bg-navy flex items-center justify-center text-white text-3xl font-bold shadow-lg">WG</div>
          <h3 className="text-xl font-bold text-gray-800 mt-3">{user.name}</h3>
          <p className="text-sm text-gray-400">Community First Credit Union Classic Checking</p>
          <p className="text-xs text-gray-500 mt-1">Balance: ${balance.toLocaleString()}</p>
          <button onClick={() => setEditMode(true)} className="mt-4 text-xs text-navy font-medium flex items-center gap-1 mx-auto hover:underline">
            <PenLine className="w-3.5 h-3.5" /> Edit Profile
          </button>
        </motion.div>

        <div className="space-y-2">
          <motion.div initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.04 }}
            onClick={() => setActiveModal('personal')}
            className="bg-white rounded-xl p-4 shadow-sm flex items-center gap-3 cursor-pointer hover:bg-gray-50/80 transition">
            <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-navy"><UserCircle className="w-5 h-5" /></div>
            <div className="flex-1"><p className="text-sm font-semibold text-gray-800">Personal Information</p><p className="text-xs text-gray-400">Name, email, address</p></div>
            <ChevronRight className="w-4 h-4 text-gray-300" />
          </motion.div>

          <motion.div initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.08 }}
            onClick={() => setActiveModal('account')}
            className="bg-white rounded-xl p-4 shadow-sm flex items-center gap-3 cursor-pointer hover:bg-gray-50/80 transition">
            <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-navy"><Settings className="w-5 h-5" /></div>
            <div className="flex-1"><p className="text-sm font-semibold text-gray-800">Account Settings</p><p className="text-xs text-gray-400">Preferences, language</p></div>
            <ChevronRight className="w-4 h-4 text-gray-300" />
          </motion.div>

          <motion.div initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.12 }}
            onClick={() => setActiveModal('security')}
            className="bg-white rounded-xl p-4 shadow-sm flex items-center gap-3 cursor-pointer hover:bg-gray-50/80 transition">
            <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-navy"><Shield className="w-5 h-5" /></div>
            <div className="flex-1"><p className="text-sm font-semibold text-gray-800">Security</p><p className="text-xs text-gray-400">Password, 2FA, devices</p></div>
            <ChevronRight className="w-4 h-4 text-gray-300" />
          </motion.div>

          <motion.div initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.16 }}
            onClick={() => setActiveModal('notifications')}
            className="bg-white rounded-xl p-4 shadow-sm flex items-center gap-3 cursor-pointer hover:bg-gray-50/80 transition">
            <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-navy"><BellRing className="w-5 h-5" /></div>
            <div className="flex-1"><p className="text-sm font-semibold text-gray-800">Notification Settings</p><p className="text-xs text-gray-400">Alerts, reminders</p></div>
            <ChevronRight className="w-4 h-4 text-gray-300" />
          </motion.div>

          <motion.div initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.20 }}
            onClick={() => setActiveModal('help')}
            className="bg-white rounded-xl p-4 shadow-sm flex items-center gap-3 cursor-pointer hover:bg-gray-50/80 transition">
            <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-navy"><HelpCircle className="w-5 h-5" /></div>
            <div className="flex-1"><p className="text-sm font-semibold text-gray-800">Help & Support</p><p className="text-xs text-gray-400">FAQs, contact us</p></div>
            <ChevronRight className="w-4 h-4 text-gray-300" />
          </motion.div>
        </div>

        <button onClick={handleLogout} className="w-full py-3.5 bg-rose-50 text-rose-600 font-semibold rounded-xl text-sm flex items-center justify-center gap-2 hover:bg-rose-100 transition">
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </div>
      <BottomNav />
    </div>
  );
}