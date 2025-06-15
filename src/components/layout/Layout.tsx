import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  // The header is fixed and is h-16 (64px), so we add pt-16 to create the "safe area"
  return (
    <div className="min-h-screen bg-cyber-dark">
      <Header />
      <div className="flex pt-16">
        <Sidebar />
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
