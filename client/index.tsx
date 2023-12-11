import React, { useState } from 'react';
import Image from 'next/image';
import HomePage from './components/HomePage';
import HelpDeskForm from './components/HelpDeskForm';
import AdminPanel from './components/AdminPanel';
import ComingSoon from './components/ComingSoon';
import LogoImage from './assets/bioverse_newyork_logo.jpeg';
import MenuIcon from './assets/menu-4-16.ico';
import ShoppingIcon from './assets/cart-73-16.ico';
import UserIcon from './assets/user-16.ico';

const Home: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [currentPage, setCurrentPage] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollY(e.currentTarget.scrollTop);
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    setIsMenuOpen(false);
  };

  const navbarHeight = '32px';

  let currentComponent;

  switch (currentPage) {
    case 'home':
      currentComponent = <HomePage />;
      break;
    case 'help-desk-form':
      currentComponent = <HelpDeskForm />;
      break;
    case 'admin-panel':
      currentComponent = <AdminPanel />;
      break;
    case 'coming-soon':
      currentComponent = <ComingSoon />;
      break;
    default:
      currentComponent = <HomePage />;
  }

  return (
    <div style={{ position: 'relative' }}>
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, backgroundColor: '#333', height: navbarHeight, zIndex: 1000 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ marginRight: '20px', cursor: 'pointer' }} onClick={() => handleNavigate('home')}>
              <Image src={LogoImage} alt="Bioverse Logo" width={32} height={32} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ marginRight: '10px', cursor: 'pointer' }} onClick={() => handleNavigate('coming-soon')}>
              <Image src={ShoppingIcon} alt="Shopping" width={16} height={16} />
            </div>
            <div style={{ marginRight: '10px', cursor: 'pointer' }} onClick={() => handleNavigate('admin-panel')}>
              <Image src={UserIcon} alt="User" width={16} height={16} />
            </div>
            <div style={{ marginRight: '10px', cursor: 'pointer' }} onClick={() => handleNavigate('help-desk-form')}>
              <Image src={MenuIcon} alt="Menu" width={16} height={16} />
            </div>
          </div>
        </div>
      </nav>
      <div onScroll={handleScroll} style={{ overflowY: 'auto', height: 'calc(100vh - ' + navbarHeight + ')', marginTop: navbarHeight }}>
        {currentComponent}
      </div>
    </div>
  );
};

export default Home;