import React from 'react';
import Image from 'next/image';
import LogoImage from '../assets/bioverse_newyork_logo.jpeg';

const ComingSoon = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-900">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-300">Coming Soon</h1>
        <p className="text-gray-300 mt-4">We are working on something amazing. Stay tuned!</p>
        <div className="mt-8">
          <Image
            src={LogoImage}
            alt="Logo"
            width={200}
            height={200}
            className="mx-auto rounded-full shadow-lg"
          />
        </div>
        <div className="mt-8">
          <p className="text-gray-500">Follow us for updates:</p>
          <div className="flex justify-center mt-2">
            <a
              className="text-blue-500 hover:underline mx-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
            </a>
            <span className="text-gray-400">•</span>
            <a
              className="text-blue-500 hover:underline mx-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
