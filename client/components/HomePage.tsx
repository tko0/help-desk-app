import React from 'react';
import Image from 'next/image';
import backgroundImg from '../assets/background.png';

const BackgroundImage: React.FC = () => {
  return (
    <div className="w-screen h-screen">
      <Image src={backgroundImg} alt="Background" priority={true}/>
    </div>
  );
};

export default BackgroundImage;