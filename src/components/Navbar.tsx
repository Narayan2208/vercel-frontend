import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, User, Briefcase, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import logo from "../assets/mysktilogo.png";
const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut, isLoading } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMobileMenuOpen(false);
    setIsProfileMenuOpen(false);
  }, [location.pathname]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Find Jobs", path: "/jobs" },
    // { name: "Companies", path: "/companies" },
    { name: "About", path: "/about" },
  ];

  const renderAuthLinks = () => {
    if (isLoading) {
      return (
        <div className="h-10 w-20 bg-accent/10 animate-pulse rounded-lg"></div>
      );
    }

    if (user) {
      return (
        <div className="flex items-center gap-4">
          <div className="relative">
            <button
              onClick={toggleProfileMenu}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-accent/10 transition-all duration-200"
            >
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                {user.name?.charAt(0) || user.email?.charAt(0) || "U"}
              </div>
              <span className="hidden md:block font-medium">
                {user.name || user.email?.split("@")[0]}
              </span>
            </button>

            <AnimatePresence>
              {isProfileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-48 bg-background rounded-lg shadow-lg border border-border overflow-hidden z-50"
                >
                  <div className="p-2">
                    <div className="px-3 py-2 text-sm font-medium text-muted-foreground">
                      Signed in as{" "}
                      <span className="text-foreground">{user.email}</span>
                    </div>
                    <div className="h-px bg-border my-1"></div>
                    <Link
                      to={
                        user.role === "employer"
                          ? "/employer/dashboard"
                          : "/dashboard"
                      }
                      className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-accent/10 transition-colors"
                    >
                      <User size={16} />
                      Dashboard
                    </Link>
                    <Link
                      to="/profile"
                      className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-accent/10 transition-colors"
                    >
                      <User size={16} />
                      Profile
                    </Link>
                    <div className="h-px bg-border my-1"></div>
                    <button
                      onClick={handleSignOut}
                      className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-500 rounded-md hover:bg-red-500/10 transition-colors"
                    >
                      <LogOut size={16} />
                      Sign out
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      );
    }

    return (
      <div className="flex items-center gap-4">
        <Link
          to="/auth"
          className="text-sm font-medium px-4 py-2 rounded-lg subtle-glass hover:bg-accent/10 transition-all duration-200"
        >
          Login
        </Link>
        <Link
          to="/auth?view=register"
          className="bg-[#ffa500] hover:bg-[#ffa500] text-primary-foreground text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200"
        >
          Register
        </Link>
      </div>
    );
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border/50 py-3"
          : "py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-9 h-9 rounded-lg bg-[#ffa500] hover:bg-[#ffa500] flex items-center justify-center">
                  {/* <Briefcase className="w-5 h-5 text-white" /> */}
                  <img
                    src={ logo}
                    alt="MySakti Logo"
                    className="absolute w-6 h-6 rounded-full"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </motion.div>
              <motion.span
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="text-xl font-semibold"
              >
                MySakti
              </motion.span>
            </Link>

            <nav className="hidden md:flex ml-10 space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "text-sm font-medium transition-colors",
                    location.pathname === link.path
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {renderAuthLinks()}
          </div>

          <div className="flex md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent/10 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-background border-b border-border/50"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "block px-3 py-2 rounded-lg text-base font-medium transition-colors",
                    location.pathname === link.path
                      ? "bg-accent/10 text-foreground"
                      : "text-muted-foreground hover:bg-accent/5 hover:text-foreground"
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-2 pb-1 border-t border-border/50 mt-3"></div>
              {user ? (
                <>
                  <Link
                    to={
                      user.role === "employer"
                        ? "/employer/dashboard"
                        : "/dashboard"
                    }
                    className="block px-3 py-2 rounded-lg text-base font-medium text-muted-foreground hover:bg-accent/5 hover:text-foreground transition-colors"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/profile"
                    className="block px-3 py-2 rounded-lg text-base font-medium text-muted-foreground hover:bg-accent/5 hover:text-foreground transition-colors"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left px-3 py-2 rounded-lg text-base font-medium text-red-500 hover:bg-red-500/10 transition-colors"
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/auth"
                    className="block px-3 py-2 rounded-lg text-base font-medium text-muted-foreground hover:bg-accent/5 hover:text-foreground transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/auth?view=register"
                    className="block px-3 py-2 rounded-lg text-base font-medium text-primary hover:bg-accent/5 transition-colors"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
