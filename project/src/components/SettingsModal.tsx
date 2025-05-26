import React, { useState } from 'react';
import { X, Save } from 'lucide-react';
import { useLoyalty } from '../context/LoyaltyContext';
import { LoyaltySettings } from '../types';

interface SettingsModalProps {
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ onClose }) => {
  const { settings, updateSettings } = useLoyalty();
  const [formValues, setFormValues] = useState<LoyaltySettings>({ ...settings });
  const [saveSuccess, setSaveSuccess] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'rewardThreshold') {
      // Ensure reward threshold is a number between 1 and 100
      const numberValue = parseInt(value);
      if (isNaN(numberValue) || numberValue < 1) return;
      if (numberValue > 100) return;
      
      setFormValues(prev => ({
        ...prev,
        [name]: numberValue
      }));
    } else {
      setFormValues(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formValues);
    setSaveSuccess(true);
    
    // Reset success message after 2 seconds
    setTimeout(() => {
      setSaveSuccess(false);
      onClose();
    }, 2000);
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Business Settings</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-1">
                Business Name
              </label>
              <input
                type="text"
                id="businessName"
                name="businessName"
                value={formValues.businessName}
                onChange={handleChange}
                className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="rewardThreshold" className="block text-sm font-medium text-gray-700 mb-1">
                Visits Required for Reward
              </label>
              <input
                type="number"
                id="rewardThreshold"
                name="rewardThreshold"
                value={formValues.rewardThreshold}
                onChange={handleChange}
                min="1"
                max="100"
                className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="rewardMessage" className="block text-sm font-medium text-gray-700 mb-1">
                Reward Message
              </label>
              <textarea
                id="rewardMessage"
                name="rewardMessage"
                value={formValues.rewardMessage}
                onChange={handleChange}
                rows={3}
                className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>
          
          <div className="mt-6">
            <button
              type="submit"
              className={`
                w-full flex items-center justify-center py-2 px-4 
                ${saveSuccess ? 'bg-green-500' : 'bg-blue-600 hover:bg-blue-700'} 
                text-white font-medium rounded-lg shadow-md transition-colors
              `}
            >
              {saveSuccess ? (
                <>
                  <Save size={20} className="mr-2" />
                  Settings Saved!
                </>
              ) : (
                <>
                  <Save size={20} className="mr-2" />
                  Save Settings
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SettingsModal;