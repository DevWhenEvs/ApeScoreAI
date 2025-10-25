"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ReactLenis, useLenis } from "@studio-freight/react-lenis";
import { MdArrowOutward } from "react-icons/md";
import Marquee from "@/components/Marquee/Marquee";
import Footer from "@/components/Footer/Footer";
import ShuffleText from "@/components/ShuffleText/ShuffleText";
import GeometricBackground from "@/components/GeometricBackground/GeometricBackground";

import "./home.css";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const container = useRef();
  const videoRef = useRef();
  const [isMuted, setIsMuted] = useState(true);

  // initialize Lenis smooth scrolling instance on window
  const lenis = useLenis();
  useEffect(() => {
    if (lenis) {
      window.lenis = lenis;
    }

    return () => {
      window.lenis = null;
    };
  }, [lenis]);

  // controls geometric background animation on scroll
  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: ".intro",
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const yMove = -750 * progress;
          const rotation = 360 * progress;

          gsap.to(".geo-bg", {
            y: yMove,
            rotation: rotation,
            duration: 0.1,
            ease: "none",
            overwrite: true,
          });
        },
      });

      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    },
    { scope: container }
  );

  // handles case studies image pinning and scale animations on scroll
  useGSAP(
    () => {
      // Refresh ScrollTrigger to recalculate after DOM changes
      ScrollTrigger.refresh();
      
      const images = gsap.utils.toArray(".case-studies-img");

      images.forEach((img, i) => {
        const imgElement = img.querySelector("img") || img.querySelector("video");

        ScrollTrigger.create({
          trigger: img,
          start: "top bottom",
          end: "top top",
          onUpdate: (self) => {
            if (imgElement) {
              gsap.to(imgElement, {
                scale: 2 - self.progress,
                duration: 0.1,
                ease: "none",
              });
            }
          },
        });

        ScrollTrigger.create({
          trigger: img,
          start: "top top",
          end: () =>
            `+=${
              document.querySelector(".case-studies-item")?.offsetHeight *
              (images.length - i - 1) || 0
            }`,
          pin: true,
          pinSpacing: false,
          invalidateOnRefresh: true,
        });
      });

      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    },
    { scope: container }
  );


  return (
    <ReactLenis
      root
      options={{
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: "vertical",
        gestureDirection: "vertical",
        smooth: true,
        smoothTouch: false,
        touchMultiplier: 2,
      }}
    >
      <div className="app" ref={container}>
        <section className="hero">
          <div className="hero-img">
            <img src="/images/background.jpeg" alt="" />
          </div>
          <div className="hero-img-overlay"></div>
          <div className="hero-img-gradient"></div>
          <div className="container hero-text-container">
            <div className="hero-copy" style={{ justifyContent: 'flex-end', textAlign: 'right', flexDirection: 'column' }}>
              <div className="hero-copy-col" style={{ textAlign: 'right', width: '100%' }}>
                <ShuffleText as="h3" text="Your Degen Credit Score On" />
                <ShuffleText as="h1" text="APESCOREAI:" />
                <ShuffleText as="div" text="The Solana Blockchain" className="hero-subtitle" style={{ marginTop: '0.2em' }} />
              </div>
            </div>
          </div>
        </section>

        <section className="video-section" style={{ position: 'relative', height: '100vh', width: '100%' }}>
          <video
            ref={videoRef}
            src="/videos/rich.mp4"
            autoPlay
            loop
            muted={isMuted}
            playsInline
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              zIndex: -1
            }}
          />
          <button
            onClick={() => setIsMuted(!isMuted)}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              zIndex: 10,
              background: 'rgba(0, 0, 0, 0.7)',
              color: 'white',
              border: 'none',
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px'
            }}
          >
            {isMuted ? '🔇' : '🔊'}
          </button>
          <Marquee />
        </section>

        <section className="intro" id="intro">
          <div className="intro-bg">
            <img src="/images/apescore_sign.png" alt="" style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              zIndex: -3,
              opacity: 0.6
            }} />
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'rgba(255, 255, 255, 0.4)',
              zIndex: -2
            }} />
          </div>
          <div className="geo-bg">
            <GeometricBackground />
          </div>
          <div className="intro-container" style={{ color: 'black' }}>
            <div className="container">
              <div className="col">
                <p className="primary" style={{ color: 'black', fontWeight: 'bold', fontSize: '1.5em' }}>[ How It Works ]</p>
              </div>
              <div className="col">
                <div className="intro-copy">
                  <p style={{ color: 'black', fontWeight: 'bold', fontSize: '1.1em' }}>
                    ApeScoreAI revolutionizes DeFi credit scoring by gamifying your trading performance on Solana. Our AI analyzes your wallet activity, trading success, and risk-taking behavior to generate a comprehensive "Ape Score" from 0-100.
                  </p>
                  <p style={{ color: 'black', fontWeight: 'bold', fontSize: '1.1em' }}>
                    Connect your Solana wallet and our algorithm immediately begins analyzing trades from Jupiter, Raydium, and other major DEXs. Your score unlocks exclusive rewards, $APEAI token airdrops, and access to higher-tier trading opportunities in the degen ecosystem.
                  </p>
                </div>
                <div className="key-features">
                  <ul style={{ 
                    color: 'black', 
                    fontWeight: 'bold', 
                    fontSize: '1.3em',
                    listStyleType: 'disc',
                    paddingLeft: '20px',
                    marginTop: '2em'
                  }}>
                    <li style={{ marginBottom: '1em' }}>Powerful AI Blockchain Analysis</li>
                    <li>Unlock your full Degen Potential</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="case-studies" id="case-studies">
          <div className="case-studies-header">
            <div className="container">
              <ShuffleText
                as="h2"
                text="Unlock Your Degen Potential"
                triggerOnScroll={true}
              />
            </div>
          </div>
          <div className="case-studies-content">
            <div className="container">
              <div className="col">
                <p className="primary">[ Features & Gamification ]</p>
              </div>
              <div className="col">
                <div className="case-studies-copy">
                  <h2>How Does ApeScore Track Your Trading Mastery?</h2>
                  <p>
                    Our gamification system transforms your Solana trading activity into an engaging experience with scores, badges, levels, leaderboards, and challenges. From "Ape Novice" to "Degen God," climb the ranks and earn $APEAI rewards.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="case-studies-items">
          <div className="case-studies-items-content col">
            <div className="case-studies-item case-studies-item-1">
              <div className="container">
                <h3>Trading Success Metrics</h3>
                <p className="primary">[ PNL Tracking — Win/Loss Analysis ]</p>
                <div className="case-studies-item-inner-img">
                  <video
                    src="/videos/success.mp4"
                    alt="Trading success visualization"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                </div>
                <p>
                  Our AI analyzes your trading performance across Jupiter, Raydium, and major Solana DEXs. Track your profit/loss ratios, success rates, and identify patterns in your trading behavior to maximize your ApeScore.
                </p>
              </div>
            </div>

            <div className="case-studies-item case-studies-item-2">
              <div className="container">
                <h3>Wallet Activity Analysis</h3>
                <p className="primary">[ Transaction Volume — DeFi Engagement ]</p>
                <div className="case-studies-item-inner-img">
                  <video
                    src="/videos/wallet2.mp4"
                    alt="Wallet activity demonstration"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                </div>
                <p>
                  Monitor transaction frequency, volume, and DeFi protocol interactions. Our algorithm tracks your engagement with liquidity pools, yield farming, and token swaps to build a comprehensive activity profile for your ApeScore.
                </p>
              </div>
            </div>
            <div className="case-studies-item case-studies-item-3">
              <div className="container">
                <h3>Risk-Taking Behavior</h3>
                <p className="primary">
                  [ Leverage Analysis — Memecoin Investments ]
                </p>
                <div className="case-studies-item-inner-img">
                  <video
                    src="/videos/risk3.mp4"
                    alt="Risk analysis dashboard"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                </div>
                <p>
                  Evaluate your appetite for high-risk trades, memecoin investments, and leveraged positions. Our scoring algorithm rewards calculated risks while identifying patterns that separate true degens from paper hands.
                </p>
              </div>
            </div>
          </div>
          <div className="case-studies-items-images col">
            <div className="case-studies-img case-studies-img-1">
              <video src="/videos/success.mp4" alt="" autoPlay loop muted playsInline />
              <div className="hero-img-overlay"></div>
            </div>
            <div className="case-studies-img case-studies-img-2">
              <video
                src="/videos/wallet2.mp4"
                alt="Wallet activity demonstration"
                autoPlay
                loop
                muted
                playsInline
              />
              <div className="hero-img-overlay"></div>
            </div>
            <div className="case-studies-img case-studies-img-3">
              <video
                src="/videos/risk3.mp4"
                alt="Risk analysis dashboard"
                autoPlay
                loop
                muted
                playsInline
              />
              <div className="hero-img-overlay"></div>
            </div>
          </div>
        </section>

        <section className="abstract-bg">
          <div className="strip"></div>
          <div className="strip"></div>
          <div className="strip"></div>
          <div className="strip"></div>
          <div className="strip"></div>
          <div className="strip"></div>
          <div className="strip"></div>
          <div className="strip"></div>
        </section>

        <section className="works" id="works">
          <div className="works-header">
            <div className="container">
              <ShuffleText
                as="h2"
                text="ApeScoreAI runs on pure degen energy"
                triggerOnScroll={true}
              />
            </div>
          </div>

          <div className="works-content">
            <div className="container">
              <div className="col">
                <h3>TOKENOMICS:</h3>
                <p className="primary">[Token: $APEAI<br/>Total Supply: 800,000,000 (Fixed)<br/>Taxes: 0% (Because we're not here to nickel-and-dime the jungle)<br/>Chain: Solana<br/>Launchpad: Pump.fun]</p>
              </div>
              <div className="col">
                <div className="works-copy">
                  <h2>Rewards that Keep Swinging</h2>
                  <p>
                    Every 2 days, random airdrops and holder rewards go out to the community. The longer you hold, the higher your ApeScore, and the more likely you are to get rewarded for staying diamond-handed.
                  </p>
                  <h2>Fair, Fun, and Fully Transparent</h2>
                  <p>
                    &nbsp;&nbsp;• Fixed supply means no inflation monkey business<br/><br/>
                    &nbsp;&nbsp;• No buy/sell taxes — what you earn is what you keep<br/><br/>
                    &nbsp;&nbsp;• Locked dev allocation for trust and transparency<br/><br/>
                    &nbsp;&nbsp;• Rewards cycle every 48 hours for active holders<br/><br/>
                    ApeScoreAI isn't just a token — it's a reputation game for the Solana jungle. Degens earn their score. Legends build it.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>


        <Footer />
      </div>
    </ReactLenis>
  );
}
