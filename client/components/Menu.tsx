// import React from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/router';

// interface MenuProps {
//   isOpen: boolean;
//   menuIconPosition: { top: number; left: number };
// }

// const Menu: React.FC<MenuProps> = ({ isOpen, menuIconPosition }) => {
//   const router = useRouter();

//   if (!isOpen) {
//     return null;
//   }

//   const { left } = menuIconPosition;

//   return (
//     <div
//       style={{
//         position: 'fixed',
//         top: `calc(64px + 4px)`,
//         right: `calc(min(100vw - 280px, max(8px, ${left}px)))`,
//         zIndex: 50,
//       }}
//       className="bg-gray-800 border border-neutral-900 rounded p-2 shadow-md text-right"
//     >
//       <Link href="/coming-soon">
//         <a className="text-white font-bold mb-2">Healthspan</a>
//       </Link>
//       <Link href="/coming-soon">
//         <a className="text-white font-bold mb-2">Vibrant Living</a>
//       </Link>
//       <Link href="/coming-soon">
//         <a className="text-white font-bold mb-2">Longevity</a>
//       </Link>
//       <Link href="/coming-soon">
//         <a className="text-white font-bold mb-2">Science Backed Tools</a>
//       </Link>
//       <Link href="/coming-soon">
//         <a className="text-white font-bold mb-2">General Health</a>
//       </Link>
//       <Link href="/help-desk-form">
//         <a className="text-blue-500 font-bold no-underline">Contact Us</a>
//       </Link>
//     </div>
//   );
// };

// export default Menu;
