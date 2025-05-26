import React from 'react';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-800 text-gray-300 py-4">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm">
          © {year} Loyalty Rewards System | All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;