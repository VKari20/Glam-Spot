import React, { useState } from 'react';
import { User, Search } from 'lucide-react';
import { Customer } from '../types';
import { formatDate } from '../utils/formatters';

interface CustomerListProps {
  customers: Customer[];
  onSelect: (phoneNumber: string) => void;
}

const CustomerList: React.FC<CustomerListProps> = ({ customers, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredCustomers = customers.filter(customer => 
    customer.phoneNumber.includes(searchTerm) || 
    (customer.name && customer.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  // Sort by most recent visit
  const sortedCustomers = [...filteredCustomers].sort((a, b) => 
    new Date(b.lastVisit).getTime() - new Date(a.lastVisit).getTime()
  );
  
  if (customers.length === 0) {
    return (
      <div className="text-center py-4 text-gray-500">
        No customers yet
      </div>
    );
  }
  
  return (
    <div className="mb-6 bg-white rounded-lg border border-gray-200">
      <div className="p-2 border-b border-gray-200">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={16} className="text-gray-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search customers..."
            className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
      
      <div className="max-h-60 overflow-y-auto">
        {sortedCustomers.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {sortedCustomers.map((customer) => (
              <li 
                key={customer.phoneNumber}
                className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => onSelect(customer.phoneNumber)}
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <User size={20} className="text-blue-600" />
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                      {customer.name || customer.phoneNumber}
                    </p>
                    <p className="text-xs text-gray-500">
                      {customer.name ? customer.phoneNumber : `${customer.visits} visits`}
                    </p>
                    <p className="text-xs text-gray-400">
                      Last visit: {formatDate(customer.lastVisit)}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-4 text-gray-500">
            No matching customers found
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerList;