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
  const user = userData?.data?.user;

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
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="w-full h-16 bg-white shadow-md flex items-center justify-between px-20 relative z-50">
      <div className="text-2xl font-bold text-primary font-mono">PrepAI</div>
      <div className="flex space-x-12">
        {userData?.data?.user && navItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={`text-gray-600 font-mono hover:text-primary transition-colors duration-300 ${isActive(item.href) ? 'text-primary-700 font-bold border-b border-primary' : ''}`}
          >
            {item.name}
          </Link>
        ))}
      </div>
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="w-10 h-10 bg-primary hover:bg-primary-600 transition-colors rounded-full flex items-center justify-center text-sm font-bold text-white uppercase focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
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
    </nav>
  );
}

export default Navbar;