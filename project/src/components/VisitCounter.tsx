import React from 'react';
import { Coffee } from 'lucide-react';

interface VisitCounterProps {
  visits: number;
  threshold: number;
}

const VisitCounter: React.FC<VisitCounterProps> = ({ visits, threshold }) => {
  // Calculate how many full rows we need
  const fullRewards = Math.floor(visits / threshold);
  
  // Calculate the progress in the current row
  const currentProgress = visits % threshold;
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center">
        <h3 className="text-lg font-medium text-gray-700 mb-2">Visit Progress</h3>
        <div className="text-3xl font-bold text-blue-600">{visits} visits</div>
      </div>
      
      <div className="flex justify-center items-center space-x-2">
        {Array.from({ length: threshold }).map((_, index) => (
          <div
            key={index}
            className={`
              w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300
              ${index < currentProgress
                ? 'bg-blue-500 text-white scale-100'
                : 'bg-gray-200 text-gray-400 scale-90'
              }
            `}
          >
            <Coffee size={20} />
          </div>
        ))}
      </div>
      
      {fullRewards > 0 && (
        <div className="text-center text-sm text-gray-600 mt-2">
          + {fullRewards} completed reward{fullRewards > 1 ? 's' : ''}
        </div>
      )}
    </div>
  );
};

export default VisitCounter;