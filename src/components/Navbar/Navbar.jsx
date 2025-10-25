"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import dynamic from "next/dynamic";

import "./Navbar.css";


const Navbar = () => {
  const [time, setTime] = useState("");
  const [isClient, setIsClient] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === "/";

  useEffect(() => {
    setIsClient(true);
    
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      setTime(timeString);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleNavigation = (event, sectionId) => {
    event.preventDefault();
    setIsMobileMenuOpen(false); // Close mobile menu when navigating

    if (isHomePage) {
      const lenis = window.lenis;
      if (lenis) {
        const element = document.getElementById(sectionId);
        if (element) {
          lenis.scrollTo(element, {
            offset: 0,
            immediate: false,
            duration: 1.5,
          });
        }
      }
    } else {
      router.push(`/#${sectionId}`);
    }
  };

  return (
    <>
      <div className="navbar">
        <div className="navbar-col">
          <div className="navbar-sub-col logo">
            <Link href="/">
              <h3>🦍 ApeScoreAI</h3>
            </Link>
          </div>
          <div className="navbar-sub-col time">
            <p suppressHydrationWarning>{isClient ? time : '--:--:-- --'}</p>
          </div>
        </div>
        <div className="navbar-col">
          {/* Desktop nav items */}
          <div className="navbar-sub-col nav-items desktop-nav">
            <a href="#intro" onClick={(e) => handleNavigation(e, "intro")}>
              <p>How It Works</p>
            </a>
            <a
              href="#case-studies"
              onClick={(e) => handleNavigation(e, "case-studies")}
            >
              <p>Features</p>
            </a>
            <a href="#works" onClick={(e) => handleNavigation(e, "works")}>
              <p>Tokenomics</p>
            </a>
            <a href="https://t.me/ApeScoreAI_bot" target="_blank" rel="noopener noreferrer">
              <p>Telegram Bot</p>
            </a>
          </div>
          {/* Mobile hamburger menu */}
          <div className="mobile-menu-toggle">
            <button 
              className="hamburger-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="mobile-menu-content">
            <a href="#intro" onClick={(e) => handleNavigation(e, "intro")}>
              <p>How It Works</p>
            </a>
            <a
              href="#case-studies"
              onClick={(e) => handleNavigation(e, "case-studies")}
            >
              <p>Features</p>
            </a>
            <a href="#works" onClick={(e) => handleNavigation(e, "works")}>
              <p>Tokenomics</p>
            </a>
            <a href="https://t.me/ApeScoreAI_bot" target="_blank" rel="noopener noreferrer" onClick={() => setIsMobileMenuOpen(false)}>
              <p>Telegram Bot</p>
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
