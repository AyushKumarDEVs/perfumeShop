import React from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import CallToActionBanner from './CallToActionBanner';

const HomePage = () => {
  return (
    <div className="dark:bg-gray-800 bg-white h-screen w-screen overflow-hidden">
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>

      {/* Scrollable Outlet Content */}
      <div className="pt-[72px] h-full overflow-y-auto scrollbar-none">
        {/* 72px = navbar height (adjust if your navbar height is different) */}
        <Outlet />
        <div>
          <CallToActionBanner/>
        </div>
        
      </div>
      <Footer/>
    </div>
  );
};

export default HomePage;
