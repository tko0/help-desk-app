// import React, { useState } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import LogoImage from '../assets/bioverse_newyork_logo.jpeg';
// import MenuIcon from '../assets/menu-4-16.ico';
// import ShoppingIcon from '../assets/cart-73-16.ico';
// import UserIcon from '../assets/user-16.ico';
// import Menu from './Menu';

// interface NavBarProps {
//   isScrolled: boolean;
// }

// const NavBar: React.FC<NavBarProps> = ({ isScrolled }) => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [menuIconPosition, setMenuIconPosition] = useState({ top: 0, left: 0 });

//   const handleUserClick = () => {
//     handleNavigate('admin-panel')
//   };

//   const handleShoppingCartClick = () => {
//     handleNavigate('coming-soon')
//   };

//   const handleToggleMenu = () => {
//     setIsMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen);
//   };

//   return (
//     <div className="relative z-10">
//       <nav className={`fixed top-0 left-0 right-0 bg-neutral-900 shadow-md z-10 ${isScrolled ? 'pt-0 pb-1 transition-all duration-300' : 'pt-0 pb-1'}`}>
//         <div className="nav-bar bg-neutral-900 text-neutral-500 p-4 flex items-center justify-between relative">
//           <div className="logo-container flex items-center">
//             <Link href="/">
//               <a>
//                 <div>
//                   <Image src={LogoImage} alt="Bioverse Logo" width={32} height={32} />
//                 </div>
//               </a>
//             </Link>
//           </div>
//           <div className="search-bar flex-1 mx-4">
//             <input
//               type="text"
//               placeholder="Search our product selection"
//               className="w-2/3 bg-gray-200 text-black border-2 border-white p-2 rounded"
//             />
//           </div>
//           <div className="flex items-center space-x-8 relative">
//             <div className="relative">
//               <Menu isOpen={isScrolled || isMenuOpen} menuIconPosition={menuIconPosition} />
//             </div>
//             <div className="relative" onClick={handleUserClick}>
//               <Image src={UserIcon} alt="User" width={16} height={16} />
//             </div>
//             <div className="relative" onClick={handleShoppingCartClick}>
//               <Image src={ShoppingIcon} alt="Shop" width={16} height={16} />
//             </div>
//             <div className="pr-8 relative" onClick={handleToggleMenu}>
//               <div>
//                 <Image src={MenuIcon} alt="Menu" width={16} height={16} />
//               </div>
//             </div>
//           </div>
//         </div>
//       </nav>
//     </div>
//   );
// };

// export default NavBar;
