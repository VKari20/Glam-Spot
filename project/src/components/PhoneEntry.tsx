import React, { useState } from 'react';
import { Phone, Search, UserPlus } from 'lucide-react';
import { useLoyalty } from '../context/LoyaltyContext';
import { formatPhoneNumber } from '../utils/formatters';
import CustomerList from './CustomerList';

const PhoneEntry: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const { checkIn, findCustomer, customers } = useLoyalty();
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const formatted = formatPhoneNumber(value);
    setPhoneNumber(formatted);
    setError('');
  };

  const handleCheckIn = () => {
    // Validate phone number (at least 10 digits)
    const digits = phoneNumber.replace(/\D/g, '');
    
    if (digits.length < 10) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }
    
    checkIn(phoneNumber);
  };

  const toggleSearch = () => {
    setIsSearching(!isSearching);
  };

  const handleCustomerSelect = (customer: string) => {
    setPhoneNumber(customer);
    setIsSearching(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 transition-all">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Customer Check-In
      </h2>
      
      <div className="mb-6">
        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
          Enter Customer Phone Number
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Phone size={18} className="text-gray-400" />
          </div>
          <input
            type="tel"
            id="phoneNumber"
            value={phoneNumber}
            onChange={handleChange}
            className={`block w-full pl-10 pr-12 py-3 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-blue-500 focus:border-blue-500`}
            placeholder="(555) 123-4567"
          />
          <div className="absolute inset-y-0 right-0 flex items-center">
            <button
              type="button"
              onClick={toggleSearch}
              className="p-2 text-gray-500 hover:text-blue-600 focus:outline-none"
            >
              <Search size={20} />
            </button>
          </div>
        </div>
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
      
      {isSearching && (
        <CustomerList 
          customers={customers} 
          onSelect={handleCustomerSelect} 
        />
      )}
      
      <div className="flex flex-col space-y-4">
        <button
          onClick={handleCheckIn}
          className="w-full flex items-center justify-center py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md transition-colors"
        >
          <UserPlus size={20} className="mr-2" />
          Check In Customer
        </button>
      </div>
    </div>
  );
};

export default PhoneEntry;