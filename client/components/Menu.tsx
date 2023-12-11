import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface MenuProps {
  isOpen: boolean;
  menuIconPosition: { top: number; left: number };
}

const Menu: React.FC<MenuProps> = ({ isOpen, menuIconPosition }) => {
  const navigate = useNavigate();

  if (!isOpen) {
    return null;
  }

  const { top, left } = menuIconPosition;

  const redirectToComingSoon = () => {
    navigate('/coming-soon');
  };

  return (
    <div
      className="fixed top-[calc(64px+4px)] right-[calc(min(100vw-280px, max(8px, left)))] z-50 bg-gray-800 border border-neutral-900 rounded p-2 shadow-md text-right"
    >
      <div className="text-white font-bold mb-2" onClick={redirectToComingSoon}>
        Healthspan
      </div>
      <div className="text-white font-bold mb-2" onClick={redirectToComingSoon}>
        Vibrant Living
      </div>
      <div className="text-white font-bold mb-2" onClick={redirectToComingSoon}>
        Longevity
      </div>
      <div className="text-white font-bold mb-2" onClick={redirectToComingSoon}>
        Science Backed Tools
      </div>
      <div className="text-white font-bold mb-2" onClick={redirectToComingSoon}>
        General Health
      </div>
      <Link
        to="/help-desk-form"
        className="text-blue-500 font-bold no-underline"
      >
        Contact Us
      </Link>
    </div>
  );
};

export default Menu;
