import React, { useState } from 'react';
import PhoneEntry from './PhoneEntry';
import CustomerInfo from './CustomerInfo';
import RewardNotification from './RewardNotification';
import { useLoyalty } from '../context/LoyaltyContext';

const LoyaltySystem: React.FC = () => {
  const { currentCustomer, clearCurrentCustomer } = useLoyalty();
  const [showReward, setShowReward] = useState(false);
  
  // Check if customer just earned a reward
  React.useEffect(() => {
    if (currentCustomer && currentCustomer.visits > 0 && 
        currentCustomer.visits % currentCustomer.rewards === 0 &&
        currentCustomer.rewards > 0) {
      setShowReward(true);
    }
  }, [currentCustomer]);

  const handleCloseReward = () => {
    setShowReward(false);
  };

  const handleReset = () => {
    clearCurrentCustomer();
  };

  return (
    <div className="max-w-md mx-auto">
      {!currentCustomer ? (
        <PhoneEntry />
      ) : (
        <CustomerInfo customer={currentCustomer} onReset={handleReset} />
      )}
      
      {showReward && currentCustomer && (
        <RewardNotification 
          customer={currentCustomer}
          onClose={handleCloseReward}
        />
      )}
    </div>
  );
};

export default LoyaltySystem;