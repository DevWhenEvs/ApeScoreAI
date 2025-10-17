'use client';

import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import './ScoreDisplay.css';

export default function ScoreDisplay({ score = 0, maxScore = 1000 }) {
  const { connected } = useWallet();
  const [displayScore, setDisplayScore] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Animate score counting up
  useEffect(() => {
    if (connected && score > 0) {
      setIsAnimating(true);
      const duration = 2000; // 2 seconds
      const steps = 60;
      const increment = score / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= score) {
          current = score;
          clearInterval(timer);
          setIsAnimating(false);
        }
        setDisplayScore(Math.floor(current));
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [connected, score]);

  const getScoreLevel = (score) => {
    if (score >= 900) return { level: 'Degen God', color: 'var(--neon-purple)' };
    if (score >= 750) return { level: 'Ape Legend', color: 'var(--neon-orange)' };
    if (score >= 600) return { level: 'Diamond Hands', color: 'var(--neon-blue)' };
    if (score >= 400) return { level: 'Paper Hands', color: 'var(--neon-green)' };
    if (score >= 200) return { level: 'Ape Cadet', color: 'var(--foreground-tertiary)' };
    return { level: 'Ape Novice', color: 'var(--foreground-muted)' };
  };

  const getScorePercentage = () => (displayScore / maxScore) * 100;
  const { level, color } = getScoreLevel(displayScore);

  if (!connected) {
    return (
      <div className="score-display disconnected">
        <div className="score-placeholder">
          <h3>Connect Wallet</h3>
          <p>to see your ApeScore</p>
        </div>
      </div>
    );
  }

  return (
    <div className="score-display">
      <div className="score-container">
        <div className="score-circle">
          <svg className="score-ring" viewBox="0 0 120 120">
            <circle
              className="score-ring-background"
              cx="60"
              cy="60"
              r="54"
              fill="transparent"
              stroke="var(--background-secondary)"
              strokeWidth="6"
            />
            <circle
              className="score-ring-progress"
              cx="60"
              cy="60"
              r="54"
              fill="transparent"
              stroke={color}
              strokeWidth="6"
              strokeLinecap="round"
              style={{
                strokeDasharray: `${2 * Math.PI * 54}`,
                strokeDashoffset: `${2 * Math.PI * 54 * (1 - getScorePercentage() / 100)}`,
                transition: 'stroke-dashoffset 0.5s ease-in-out'
              }}
            />
          </svg>
          <div className="score-content">
            <div className={`score-number ${isAnimating ? 'animating' : ''}`}>
              {displayScore}
            </div>
            <div className="score-max">/ {maxScore}</div>
          </div>
        </div>
        
        <div className="score-level" style={{ color }}>
          <h4>{level}</h4>
          <div className="level-badges">
            {[...Array(Math.ceil(displayScore / 200))].map((_, i) => (
              <div key={i} className="level-badge" style={{ backgroundColor: color }}>
                🦍
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="score-breakdown">
        <div className="score-metric">
          <span className="metric-label">Trading Success</span>
          <div className="metric-bar">
            <div 
              className="metric-fill" 
              style={{ 
                width: `${Math.min((displayScore * 0.4) / maxScore * 100, 40)}%`,
                backgroundColor: 'var(--neon-green)'
              }}
            ></div>
          </div>
          <span className="metric-value">{Math.floor(displayScore * 0.4)}</span>
        </div>
        
        <div className="score-metric">
          <span className="metric-label">Wallet Activity</span>
          <div className="metric-bar">
            <div 
              className="metric-fill" 
              style={{ 
                width: `${Math.min((displayScore * 0.3) / maxScore * 100, 30)}%`,
                backgroundColor: 'var(--neon-blue)'
              }}
            ></div>
          </div>
          <span className="metric-value">{Math.floor(displayScore * 0.3)}</span>
        </div>
        
        <div className="score-metric">
          <span className="metric-label">Risk Taking</span>
          <div className="metric-bar">
            <div 
              className="metric-fill" 
              style={{ 
                width: `${Math.min((displayScore * 0.3) / maxScore * 100, 30)}%`,
                backgroundColor: 'var(--neon-orange)'
              }}
            ></div>
          </div>
          <span className="metric-value">{Math.floor(displayScore * 0.3)}</span>
        </div>
      </div>
    </div>
  );
}