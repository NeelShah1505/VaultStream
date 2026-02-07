'use client';

import { FiGithub, FiTwitter, FiMail } from 'react-icons/fi';

export function Footer() {
  return (
    <footer className="relative border-t border-indigo-500/20 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-600 to-blue-600 flex items-center justify-center font-bold text-lg">
                VS
              </div>
              <div>
                <h3 className="text-xl font-bold gradient-text">VaultStream</h3>
                <p className="text-xs text-slate-400">Powered by iExec</p>
              </div>
            </div>
            <p className="text-sm text-slate-300">
              Privacy-first invoice factoring using iExec confidential computing on Arbitrum.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-slate-200 mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#demo" className="text-slate-300 hover:text-indigo-400 transition-colors">
                  Try Demo
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="text-slate-300 hover:text-indigo-400 transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#features" className="text-slate-300 hover:text-indigo-400 transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="https://iex.ec" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-indigo-400 transition-colors">
                  Learn About iExec
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold text-slate-200 mb-4">Connect</h4>
            <div className="flex items-center space-x-4">
              <a
                href="https://github.com/NeelShah1505/VaultStream"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg glass-card flex items-center justify-center hover:border-indigo-400/40 transition-all"
              >
                <FiGithub className="text-slate-300" size={20} />
              </a>
              <a
                href="https://twitter.com/NeelShah1505"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg glass-card flex items-center justify-center hover:border-indigo-400/40 transition-all"
              >
                <FiTwitter className="text-slate-300" size={20} />
              </a>
              <a
                href="mailto:neelshah1505@gmail.com"
                className="w-10 h-10 rounded-lg glass-card flex items-center justify-center hover:border-indigo-400/40 transition-all"
              >
                <FiMail className="text-slate-300" size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-indigo-500/20 flex flex-col md:flex-row justify-between items-center text-sm text-slate-400">
          <p>© 2026 VaultStream. Built for iExec Hackathon.</p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <span className="text-xs">Powered by</span>
            <span className="text-indigo-400 font-semibold">iExec Protocol</span>
            <span className="text-blue-400 font-semibold">Arbitrum L2</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
