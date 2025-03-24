import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Logo, LogoutBtn, Container } from '../index';
import { useNavigate, Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', path: '/', active: true },
    { name: 'Login', path: '/login', active: !authStatus },
    { name: 'Signup', path: '/signup', active: !authStatus },
    { name: 'Price', path: '/price', active: authStatus },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-red-600 to-purple-700 backdrop-blur-xl shadow-lg">
        <Container>
          <nav className="flex items-center justify-between py-3">
            {/* Logo with hover effect */}
            <Link 
              to="/" 
              className="hover:scale-105 transition-transform duration-300"
            >
              <Logo width="70px" className="drop-shadow-lg" />
            </Link>

            {/* Desktop Navigation */}
            <ul className="hidden md:flex items-center space-x-6">
              {navItems.map((item) =>
                item.active && (
                  <li key={item.name}>
                    <button
                      onClick={() => handleNavigation(item.path)}
                      className="px-4 py-2 text-white/90 hover:text-white font-medium rounded-lg
                        hover:bg-white/10 transition-all duration-300 relative group"
                    >
                      {item.name}
                      <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-white 
                        transition-all duration-300 group-hover:w-full"></span>
                    </button>
                  </li>
                )
              )}
              {authStatus && (
                <li className="ml-4">
                  <LogoutBtn className="bg-white/10 hover:bg-white/20 px-6 py-2 rounded-lg 
                    text-white transition-all duration-300" />
                </li>
              )}
            </ul>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white p-2 rounded-lg hover:bg-white/20 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? (
                <X size={28} className="animate-rotate-in" />
              ) : (
                <Menu size={28} className="animate-fade-in" />
              )}
            </button>
          </nav>
        </Container>

        {/* Mobile Navigation Menu */}
        <div className={`md:hidden absolute top-full left-0 w-full bg-white/5 backdrop-blur-lg
          overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-96' : 'max-h-0'}`}
        >
          <ul className="flex flex-col p-4 space-y-2">
            {navItems.map((item) =>
              item.active && (
                <li key={item.name}>
                  <button
                    onClick={() => handleNavigation(item.path)}
                    className="w-full px-6 py-3 text-left text-white/90 rounded-lg
                      hover:bg-white/10 hover:text-white transition-colors duration-200"
                  >
                    {item.name}
                  </button>
                </li>
              )
            )}
            {authStatus && (
              <li className="mt-4 border-t border-white/20 pt-4">
                <LogoutBtn className="w-full px-6 py-3 text-left text-white/90 
                  hover:text-white rounded-lg hover:bg-white/10" />
              </li>
            )}
          </ul>
        </div>
      </header>

      {/* Spacer */}
      <div className="pt-24"></div>
    </>
  );
};

export default Header;
