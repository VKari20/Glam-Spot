import React from 'react';
import { Check, ArrowLeft, Star, Gift } from 'lucide-react';
import { Customer, REWARD_TIERS } from '../types';
import { useLoyalty } from '../context/LoyaltyContext';
import VisitCounter from './VisitCounter';
import { formatDate } from '../utils/formatters';

interface CustomerInfoProps {
  customer: Customer;
  onReset: () => void;
}

const CustomerInfo: React.FC<CustomerInfoProps> = ({ customer, onReset }) => {
  const { checkIn, claimReward, getNextReward, getRewardProgress } = useLoyalty();
  const [checkInSuccess, setCheckInSuccess] = React.useState(false);
  
  const handleCheckIn = () => {
    checkIn(customer.phoneNumber);
    setCheckInSuccess(true);
    
    setTimeout(() => {
      setCheckInSuccess(false);
    }, 2000);
  };
  
  const handleClaimReward = () => {
    claimReward(customer.phoneNumber);
  };
  
  const nextReward = getNextReward(customer.visits);
  const progress = getRewardProgress(customer.visits);
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 transition-all">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={onReset}
          className="text-gray-500 hover:text-gray-700 flex items-center"
        >
          <ArrowLeft size={18} className="mr-1" />
          <span>Back</span>
        </button>
        <div className="flex items-center">
          <Star size={18} className="text-yellow-500 mr-1" />
          <span className="text-gray-700">{customer.visits} visits</span>
        </div>
      </div>
      
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">
          {customer.name || customer.phoneNumber}
        </h2>
        {customer.name && (
          <p className="text-gray-600">{customer.phoneNumber}</p>
        )}
        <p className="text-sm text-gray-500 mt-1">
          Last visit: {formatDate(customer.lastVisit)}
        </p>
      </div>
      
      <div className="mb-8">
        <div className="bg-gray-100 rounded-lg p-4 mb-4">
          <h3 className="text-lg font-semibold mb-3">Reward Progress</h3>
          <div className="space-y-4">
            {REWARD_TIERS.map((tier, index) => {
              const isCompleted = customer.visits >= tier.visits;
              const isNext = !isCompleted && !REWARD_TIERS.slice(0, index).some(t => customer.visits < t.visits);
              
              return (
                <div key={tier.reward} className="flex items-center">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                    isCompleted ? 'bg-green-500 text-white' : isNext ? 'bg-blue-500 text-white' : 'bg-gray-300'
                  }`}>
                    {isCompleted ? '✓' : index + 1}
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-center">
                      <span className={`font-medium ${isCompleted ? 'text-green-600' : isNext ? 'text-blue-600' : 'text-gray-600'}`}>
                        {tier.reward}
                      </span>
                      <span className="text-sm text-gray-500">
                        {tier.visits} visits
                      </span>
                    </div>
                    {isNext && (
                      <div className="mt-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        {customer.rewardStatus !== 'None' && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Gift size={20} className="text-yellow-500 mr-2" />
                <div>
                  <h4 className="font-semibold text-yellow-800">
                    Reward Available!
                  </h4>
                  <p className="text-sm text-yellow-600">
                    {customer.rewardStatus}
                  </p>
                </div>
              </div>
              <button
                onClick={handleClaimReward}
                className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
              >
                Claim Reward
              </button>
            </div>
          </div>
        )}
      </div>
      
      <button
        onClick={handleCheckIn}
        disabled={checkInSuccess}
        className={`
          w-full flex items-center justify-center py-3 px-4 
          ${checkInSuccess ? 'bg-green-500' : 'bg-blue-600 hover:bg-blue-700'} 
          text-white font-medium rounded-lg shadow-md transition-all
        `}
      >
        {checkInSuccess ? (
          <>
            <Check size={24} className="mr-2" />
            Check-In Recorded!
          </>
        ) : (
          <>
            <Check size={20} className="mr-2" />
            Check In
          </>
        )}
      </button>
    </div>
  );
};

export default CustomerInfo;