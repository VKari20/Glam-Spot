import React, { ReactNode } from 'react';
import Header from './Header';
import Navigation from './Navigation';
import Footer from './Footer';
import { useLoyalty } from '../context/LoyaltyContext';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { settings } = useLoyalty();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header businessName={settings.businessName} />
      <Navigation />
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;