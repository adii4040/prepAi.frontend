import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import useCurrentUser from "../modules/auth/query/useCurrentUser";
import { useLogout } from "../modules/auth/mutation/useLogout";

const navItems = [
  { name: "Analyze", href: "/analyze" },
  { name: "Dashboard", href: "/dashboard" },
]

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { data: userData } = useCurrentUser();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const user = userData?.data?.user

  const { mutateAsync: logoutUser } = useLogout()

  const isActive = (href: string) => {
    return location.pathname === href;
  }

  const getInitials = (name?: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate('/');
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (
        mobileMenuRef.current && 
        !mobileMenuRef.current.contains(event.target as Node) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="w-full h-16 bg-white shadow-md relative z-50">
      <div className="flex items-center justify-between h-full px-4 sm:px-6 md:px-10 lg:px-20">
        
        {/* Logo and Hamburger Container */}
        <div className="flex items-center gap-4">
          {userData?.data?.user && (
            <button
              ref={hamburgerRef}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-secondary hover:text-primary focus:outline-none transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {isMobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          )}
          <div className="text-xl md:text-2xl font-bold text-primary font-mono">PrepAI</div>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex space-x-8 lg:space-x-12">
          {userData?.data?.user && navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`text-sm lg:text-base text-gray-600 font-mono hover:text-primary transition-colors duration-300 ${isActive(item.href) ? 'text-primary-700 font-bold border-b-[2px] border-primary pb-0.5' : ''}`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* User Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-8 h-8 md:w-10 md:h-10 bg-primary hover:bg-primary-600 transition-colors rounded-full flex items-center justify-center text-xs md:text-sm font-bold text-white uppercase focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            {getInitials(user?.fullname)}
          </button>

          {userData?.data?.user && isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-[0_4px_20px_rgba(0,0,0,0.08)] py-1 border border-border overflow-hidden">
              <div className="px-4 py-3 border-b border-border/60 bg-tertiary">
                <p className="text-sm font-medium text-secondary truncate">{user?.fullname}</p>
                <p className="text-[11px] font-label tracking-wide text-muted truncate mt-0.5">{user?.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2.5 text-[13px] font-semibold text-danger hover:bg-red-50 hover:text-red-700 transition-colors"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Slide-down */}
      {userData?.data?.user && isMobileMenuOpen && (
        <div ref={mobileMenuRef} className="absolute top-16 left-0 w-full bg-white shadow-lg border-t border-border md:hidden flex flex-col items-start px-4 py-4 space-y-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block w-full text-lg font-mono transition-colors ${isActive(item.href) ? 'text-primary-700 font-bold' : 'text-gray-600 hover:text-primary'}`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}

export default Navbar;