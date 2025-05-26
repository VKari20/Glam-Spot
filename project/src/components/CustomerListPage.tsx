import React, { useState } from 'react';
import { Phone, Clock, Gift, Check, Search, Filter } from 'lucide-react';
import { useLoyalty } from '../context/LoyaltyContext';
import { formatDate } from '../utils/formatters';

const CustomerListPage: React.FC = () => {
  const { customers, claimReward } = useLoyalty();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRewards, setFilterRewards] = useState(false);
  
  const filteredCustomers = customers
    .filter(customer => {
      const matchesSearch = 
        customer.phoneNumber.includes(searchTerm) ||
        (customer.name && customer.name.toLowerCase().includes(searchTerm.toLowerCase()));
        
      const matchesRewards = !filterRewards || customer.rewardStatus !== 'None';
      
      return matchesSearch && matchesRewards;
    })
    .sort((a, b) => new Date(b.lastVisit).getTime() - new Date(a.lastVisit).getTime());
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search customers..."
                className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button
              onClick={() => setFilterRewards(!filterRewards)}
              className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                filterRewards 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Filter size={18} className="mr-2" />
              Show Rewards Only
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center">
                    <Phone size={14} className="mr-2" />
                    Customer
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center">
                    <Clock size={14} className="mr-2" />
                    Last Visit
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Visits
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center">
                    <Gift size={14} className="mr-2" />
                    Reward Status
                  </div>
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCustomers.map((customer) => (
                <tr key={customer.phoneNumber} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {customer.name || customer.phoneNumber}
                    </div>
                    {customer.name && (
                      <div className="text-sm text-gray-500">
                        {customer.phoneNumber}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(customer.lastVisit)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {customer.visits}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {customer.rewardStatus !== 'None' ? (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {customer.rewardStatus}
                      </span>
                    ) : (
                      <span className="text-sm text-gray-500">No reward available</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {customer.rewardStatus !== 'None' && (
                      <button
                        onClick={() => claimReward(customer.phoneNumber)}
                        className="flex items-center justify-center px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors ml-auto"
                      >
                        <Check size={14} className="mr-1" />
                        Mark Claimed
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredCustomers.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No customers found
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerListPage;