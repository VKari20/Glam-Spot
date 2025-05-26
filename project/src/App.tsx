import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoyaltyProvider } from './context/LoyaltyContext';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import LoyaltySystem from './components/LoyaltySystem';
import CustomerListPage from './components/CustomerListPage';
import LoginPage from './components/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <LoyaltyProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<LoyaltySystem />} />
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/customers"
                element={
                  <ProtectedRoute>
                    <CustomerListPage />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Layout>
        </BrowserRouter>
      </LoyaltyProvider>
    </AuthProvider>
  );
}

export default App;