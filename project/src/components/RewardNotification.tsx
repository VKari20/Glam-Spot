import React, { useEffect, useRef } from 'react';
import { Award, X } from 'lucide-react';
import { Customer } from '../types';
import { useLoyalty } from '../context/LoyaltyContext';
import confetti from '../utils/confetti';

interface RewardNotificationProps {
  customer: Customer;
  onClose: () => void;
}

const RewardNotification: React.FC<RewardNotificationProps> = ({ customer, onClose }) => {
  const { settings } = useLoyalty();
  const modalRef = useRef<HTMLDivElement>(null);
  
  // Trigger confetti effect on mount
  useEffect(() => {
    confetti();
    
    // Add event listener for clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    
    // Auto-close after 10 seconds
    const timer = setTimeout(() => {
      onClose();
    }, 10000);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      clearTimeout(timer);
    };
  }, [onClose]);
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div 
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full animate-bounce-in"
      >
        <div className="absolute top-2 right-2">
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="text-center">
          <div className="mx-auto w-20 h-20 rounded-full bg-yellow-100 flex items-center justify-center mb-4">
            <Award size={40} className="text-yellow-500" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Congratulations!
          </h2>
          
          <p className="text-lg text-gray-600 mb-4">
            {settings.rewardMessage}
          </p>
          
          <div className="bg-gray-100 rounded-lg p-4 mb-4">
            <p className="font-medium text-gray-800">
              {customer.name || customer.phoneNumber} has earned a reward after {customer.visits} visits!
            </p>
          </div>
          
          <button
            onClick={onClose}
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md transition-colors"
          >
            Awesome!
          </button>
        </div>
      </div>
    </div>
  );
};

export default RewardNotification;