'use client';

import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import './DegenModeToggle.css';

const DegenModeToggle = () => {
  const [degenMode, setDegenMode] = useState(false);
  const [lottie, setLottie] = useState(null);
  const lottieRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    import("lottie-web").then((lottieModule) => {
      setLottie(lottieModule.default);
    });
  }, []);

  useEffect(() => {
    if (!lottie || !containerRef.current) return;

    const animation = lottie.loadAnimation({
      container: containerRef.current,
      renderer: "svg",
      loop: true,
      autoplay: false,
      path: "/animations/neon-pulse.json", // Custom neon pulse animation
    });

    lottieRef.current = animation;

    return () => {
      animation.destroy();
    };
  }, [lottie]);

  useEffect(() => {
    // Apply degen mode effects to the entire page
    if (degenMode) {
      document.body.classList.add('degen-mode');
    } else {
      document.body.classList.remove('degen-mode');
    }

    return () => {
      document.body.classList.remove('degen-mode');
    };
  }, [degenMode]);

  const toggleDegenMode = () => {
    if (lottieRef.current) {
      if (!degenMode) {
        lottieRef.current.play();
      } else {
        lottieRef.current.stop();
      }
    }
    
    setDegenMode(!degenMode);
    
    // Add some haptic feedback (if supported)
    if (navigator.vibrate) {
      navigator.vibrate(100);
    }
  };

  return (
    <div className={`degen-toggle ${degenMode ? 'active' : ''}`}>
      <div className="degen-toggle-btn" onClick={toggleDegenMode}>
        <div className="degen-icon">
          {degenMode ? '🦍' : '🐒'}
        </div>
        <div
          ref={containerRef}
          className="neon-pulse"
          style={{ width: "20px", height: "20px" }}
        />
        <p className="degen-label">
          {degenMode ? "DEGEN" : "NORMAL"}
        </p>
      </div>
      
      {degenMode && (
        <div className="degen-particles">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                '--delay': `${i * 0.2}s`,
                '--x': `${Math.random() * 100}px`,
                '--y': `${Math.random() * 100}px`
              }}
            >
              💎
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default dynamic(() => Promise.resolve(DegenModeToggle), {
  ssr: false,
});