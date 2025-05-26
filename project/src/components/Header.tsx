import React from 'react';
import { Coffee, Settings } from 'lucide-react';
import { useLoyalty } from '../context/LoyaltyContext';
import SettingsModal from './SettingsModal';

interface HeaderProps {
  businessName: string;
}

const Header: React.FC<HeaderProps> = ({ businessName }) => {
  const [showSettings, setShowSettings] = React.useState(false);

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Coffee size={28} className="text-white" />
          <h1 className="text-2xl font-bold">{businessName}</h1>
        </div>
        <button 
          onClick={() => setShowSettings(true)}
          className="p-2 rounded-full hover:bg-blue-700 transition-colors"
          aria-label="Settings"
        >
          <Settings size={24} />
        </button>
      </div>
      
      {showSettings && (
        <SettingsModal onClose={() => setShowSettings(false)} />
      )}
    </header>
  );
};

export default Header;