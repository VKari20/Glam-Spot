import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Customer, LoyaltySettings, REWARD_TIERS, SURPRISE_REWARDS, RewardStatus } from '../types';
import { formatPhoneNumber } from '../utils/formatters';

interface LoyaltyContextType {
  customers: Customer[];
  currentCustomer: Customer | null;
  settings: LoyaltySettings;
  findCustomer: (phoneNumber: string) => Customer | null;
  checkIn: (phoneNumber: string) => void;
  updateSettings: (settings: Partial<LoyaltySettings>) => void;
  clearCurrentCustomer: () => void;
  claimReward: (phoneNumber: string) => void;
  getNextReward: (visits: number) => string | null;
  getRewardProgress: (visits: number) => number;
}

const defaultSettings: LoyaltySettings = {
  businessName: 'Beauty Salon',
  rewardMessage: 'You\'ve earned a special reward!'
};

const LoyaltyContext = createContext<LoyaltyContextType | undefined>(undefined);

const determineRewardStatus = (visits: number): RewardStatus => {
  const eligibleTier = REWARD_TIERS
    .slice()
    .reverse()
    .find(tier => visits >= tier.visits);
    
  return eligibleTier ? eligibleTier.reward as RewardStatus : 'None';
};

const getRandomSurpriseReward = (): string => {
  const randomIndex = Math.floor(Math.random() * SURPRISE_REWARDS.length);
  return SURPRISE_REWARDS[randomIndex];
};

export const LoyaltyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [currentCustomer, setCurrentCustomer] = useState<Customer | null>(null);
  const [settings, setSettings] = useState<LoyaltySettings>(defaultSettings);

  useEffect(() => {
    const storedCustomers = localStorage.getItem('loyaltyCustomers');
    const storedSettings = localStorage.getItem('loyaltySettings');
    
    if (storedCustomers) {
      setCustomers(JSON.parse(storedCustomers));
    }
    
    if (storedSettings) {
      setSettings(JSON.parse(storedSettings));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('loyaltyCustomers', JSON.stringify(customers));
  }, [customers]);

  useEffect(() => {
    localStorage.setItem('loyaltySettings', JSON.stringify(settings));
  }, [settings]);

  const findCustomer = (phoneNumber: string): Customer | null => {
    const formattedNumber = formatPhoneNumber(phoneNumber);
    return customers.find(c => c.phoneNumber === formattedNumber) || null;
  };

  const getNextReward = (visits: number): string | null => {
    const nextTier = REWARD_TIERS.find(tier => tier.visits > visits);
    return nextTier ? nextTier.reward : null;
  };

  const getRewardProgress = (visits: number): number => {
    const nextTier = REWARD_TIERS.find(tier => tier.visits > visits);
    if (!nextTier) return 100;
    
    const previousTier = REWARD_TIERS
      .slice()
      .reverse()
      .find(tier => visits >= tier.visits);
    
    const start = previousTier ? previousTier.visits : 0;
    const target = nextTier.visits;
    
    return ((visits - start) / (target - start)) * 100;
  };

  const checkIn = (phoneNumber: string) => {
    const formattedNumber = formatPhoneNumber(phoneNumber);
    const existingCustomer = findCustomer(formattedNumber);
    const currentDate = new Date().toISOString();
    
    if (existingCustomer) {
      // Update existing customer
      const newVisits = existingCustomer.visits + 1;
      const newRewardStatus = determineRewardStatus(newVisits);
      
      // Check for surprise reward
      const isSurpriseVisit = newVisits === 4 || newVisits === 7;
      const surpriseReward = isSurpriseVisit ? getRandomSurpriseReward() : null;
      
      const updatedCustomers = customers.map(customer => {
        if (customer.phoneNumber === formattedNumber) {
          return {
            ...customer,
            visits: newVisits,
            lastVisit: currentDate,
            rewardStatus: surpriseReward || newRewardStatus,
            rewardClaimed: false
          };
        }
        return customer;
      });
      
      const updatedCustomer = updatedCustomers.find(c => c.phoneNumber === formattedNumber)!;
      setCurrentCustomer(updatedCustomer);
      setCustomers(updatedCustomers);
    } else {
      // Create new customer
      const newCustomer: Customer = {
        phoneNumber: formattedNumber,
        visits: 1,
        lastVisit: currentDate,
        rewardStatus: 'None',
        rewardClaimed: false
      };
      
      setCustomers([...customers, newCustomer]);
      setCurrentCustomer(newCustomer);
    }
  };

  const claimReward = (phoneNumber: string) => {
    const formattedNumber = formatPhoneNumber(phoneNumber);
    const updatedCustomers = customers.map(customer => {
      if (customer.phoneNumber === formattedNumber) {
        return {
          ...customer,
          rewardStatus: 'None',
          rewardClaimed: true
        };
      }
      return customer;
    });
    
    const updatedCustomer = updatedCustomers.find(c => c.phoneNumber === formattedNumber)!;
    setCurrentCustomer(updatedCustomer);
    setCustomers(updatedCustomers);
  };

  const updateSettings = (newSettings: Partial<LoyaltySettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const clearCurrentCustomer = () => {
    setCurrentCustomer(null);
  };

  return (
    <LoyaltyContext.Provider
      value={{
        customers,
        currentCustomer,
        settings,
        findCustomer,
        checkIn,
        updateSettings,
        clearCurrentCustomer,
        claimReward,
        getNextReward,
        getRewardProgress
      }}
    >
      {children}
    </LoyaltyContext.Provider>
  );
};

export const useLoyalty = () => {
  const context = useContext(LoyaltyContext);
  if (context === undefined) {
    throw new Error('useLoyalty must be used within a LoyaltyProvider');
  }
  return context;
};