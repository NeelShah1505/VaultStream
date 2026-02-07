'use client';

import { motion } from 'framer-motion';
import { FiGithub } from 'react-icons/fi';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export function Header() {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80; // Header height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-indigo-500/20"
    >
      <nav className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <a 
          href="#" 
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center space-x-3 group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-600 flex items-center justify-center font-bold text-white text-lg group-hover:scale-110 transition-transform">
            VS
          </div>
          <div>
            <div className="font-bold text-lg gradient-text">VaultStream</div>
            <div className="text-xs text-slate-400">Invoice Factoring</div>
          </div>
        </a>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          <a
            href="#demo"
            onClick={(e) => handleScroll(e, 'demo')}
            className="text-slate-300 hover:text-indigo-400 transition-colors font-medium"
          >
            Demo
          </a>
          <a
            href="#features"
            onClick={(e) => handleScroll(e, 'features')}
            className="text-slate-300 hover:text-indigo-400 transition-colors font-medium"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            onClick={(e) => handleScroll(e, 'how-it-works')}
            className="text-slate-300 hover:text-indigo-400 transition-colors font-medium"
          >
            How It Works
          </a>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
          <a
            href="https://github.com/NeelShah1505/VaultStream"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-indigo-400 transition-colors"
          >
            <FiGithub size={20} />
          </a>
          <ConnectButton />
        </div>
      </nav>
    </motion.header>
  );
}
