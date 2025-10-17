"use client";

import { useEffect, useRef } from "react";
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
import { carouselItems } from "./carouselItems";

import "./home.css";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const container = useRef();

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
      const images = gsap.utils.toArray(".case-studies-img");

      images.forEach((img, i) => {
        const imgElement = img.querySelector("img");

        ScrollTrigger.create({
          trigger: img,
          start: "top bottom",
          end: "top top",
          onUpdate: (self) => {
            gsap.to(imgElement, {
              scale: 2 - self.progress,
              duration: 0.1,
              ease: "none",
            });
          },
        });

        ScrollTrigger.create({
          trigger: img,
          start: "top top",
          end: () =>
            `+=${
              document.querySelector(".case-studies-item").offsetHeight *
              (images.length - i - 1)
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

  // handles carousel slide transitions with clip-path animations
  useGSAP(
    () => {
      if (typeof window === "undefined") return;

      const projects = gsap.utils.toArray(".project");

      ScrollTrigger.create({
        trigger: ".carousel",
        start: "top top",
        end: `+=${window.innerHeight * (projects.length - 1)}`,
        pin: true,
        pinSpacing: true,
        scrub: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress * (projects.length - 1);
          const currentSlide = Math.floor(progress);
          const slideProgress = progress - currentSlide;

          if (currentSlide < projects.length - 1) {
            gsap.set(projects[currentSlide], {
              clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
            });

            const nextSlideProgress = gsap.utils.interpolate(
              "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
              "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
              slideProgress
            );

            gsap.set(projects[currentSlide + 1], {
              clipPath: nextSlideProgress,
            });
          }

          projects.forEach((project, index) => {
            if (index < currentSlide) {
              gsap.set(project, {
                clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
              });
            } else if (index > currentSlide + 1) {
              gsap.set(project, {
                clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
              });
            }
          });
        },
      });

      gsap.set(projects[0], {
        clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
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
            <img src="/images/home/background3.png" alt="" />
          </div>
          <div className="hero-img-overlay"></div>
          <div className="hero-img-gradient"></div>
          <div className="container">
            <div className="hero-copy">
              <div className="hero-copy-col">
                <ShuffleText as="h3" text="Your Degen Credit Score on" />
                <ShuffleText as="h1" text="ApeScoreAI: The Solana Blockchain" />
              </div>
              <div className="hero-copy-col">
              </div>
            </div>
          </div>
        </section>

        <section className="intro" id="intro">
          <div className="geo-bg">
            <GeometricBackground />
          </div>
          <Marquee />
          <div className="intro-container">
            <div className="container">
              <div className="col">
                <p className="primary">[ How It Works ]</p>
              </div>
              <div className="col">
                <div className="intro-copy">
                  <p>
                    ApeScoreAI revolutionizes DeFi credit scoring by gamifying your trading performance on Solana. Our AI analyzes your wallet activity, trading success, and risk-taking behavior to generate a comprehensive "Ape Score" from 0-1000.
                  </p>
                  <p>
                    Connect your Solana wallet and our algorithm immediately begins analyzing trades from Jupiter, Raydium, and other major DEXs. Your score unlocks exclusive rewards, $APE token airdrops, and access to higher-tier trading opportunities in the degen ecosystem.
                  </p>
                </div>
                <div className="prompt-example">
                  <div className="prompt-example-header">
                    <h4>
                      // PROMPT: A sci-fi fashion portrait of a person in
                      futuristic attire
                    </h4>
                  </div>
                  <div className="prompt-example-results">
                    <div className="prompt-example-result-item">
                      <div className="prompt-example-result-item-img">
                        <img src="/images/home/prompt-1.jpeg" alt="" />
                        <div className="hero-img-overlay"></div>
                      </div>
                      <div className="prompt-example-result-item-title">
                        <h4>2016 — Built with pioneering generative tools</h4>
                      </div>
                    </div>
                    <div className="prompt-example-result-item">
                      <div className="prompt-example-result-item-img">
                        <img src="/images/home/prompt-2.jpeg" alt="" />
                        <div className="hero-img-overlay"></div>
                      </div>
                      <div className="prompt-example-result-item-title">
                        <h4>2024 — Created with ApeScoreAI V2</h4>
                      </div>
                    </div>
                  </div>
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
                    Our gamification system transforms your Solana trading activity into an engaging experience with scores, badges, levels, leaderboards, and challenges. From "Ape Novice" to "Degen God," climb the ranks and earn $APE rewards.
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
                  <img
                    src="/images/home/case-study-1.jpeg"
                    alt="Trading success visualization"
                  />
                </div>
                <p>
                  Our AI analyzes your trading performance across Jupiter, Raydium, and major Solana DEXs. Track your profit/loss ratios, success rates, and identify patterns in your trading behavior to maximize your ApeScore.
                </p>
                <div className="case-studies-item-inner-link">
                  <Link href="/archive">View Leaderboard</Link>
                  <div className="link-icon">
                    <MdArrowOutward size={24} />
                  </div>
                </div>
              </div>
            </div>

            <div className="case-studies-item case-studies-item-2">
              <div className="container">
                <h3>Wallet Activity Analysis</h3>
                <p className="primary">[ Transaction Volume — DeFi Engagement ]</p>
                <div className="case-studies-item-inner-img">
                  <img
                    src="/images/home/case-study-2.jpeg"
                    alt="Wallet activity heatmap"
                  />
                </div>
                <p>
                  Monitor transaction frequency, volume, and DeFi protocol interactions. Our algorithm tracks your engagement with liquidity pools, yield farming, and token swaps to build a comprehensive activity profile for your ApeScore.
                </p>
                <div className="case-studies-item-inner-link">
                  <Link href="/archive">Analyze Activity</Link>
                  <div className="link-icon">
                    <MdArrowOutward size={24} />
                  </div>
                </div>
              </div>
            </div>
            <div className="case-studies-item case-studies-item-3">
              <div className="container">
                <h3>Risk-Taking Behavior</h3>
                <p className="primary">
                  [ Leverage Analysis — Memecoin Investments ]
                </p>
                <div className="case-studies-item-inner-img">
                  <img
                    src="/images/home/case-study-3.jpeg"
                    alt="Risk analysis dashboard"
                  />
                </div>
                <p>
                  Evaluate your appetite for high-risk trades, memecoin investments, and leveraged positions. Our scoring algorithm rewards calculated risks while identifying patterns that separate true degens from paper hands.
                </p>
                <div className="case-studies-item-inner-link">
                  <Link href="/archive">Check Risk Score</Link>
                  <div className="link-icon">
                    <MdArrowOutward size={24} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="case-studies-items-images col">
            <div className="case-studies-img case-studies-img-1">
              <img src="/images/home/case-study-1.jpeg" alt="" />
              <div className="hero-img-overlay"></div>
              <div className="case-studies-img-link">
                <Link href="/archive">
                  <span>
                    (&nbsp; View Article <MdArrowOutward />
                    &nbsp;)
                  </span>
                </Link>
              </div>
            </div>
            <div className="case-studies-img case-studies-img-2">
              <img src="/images/home/case-study-2.jpeg" alt="" />
              <div className="hero-img-overlay"></div>
              <div className="case-studies-img-link">
                <Link href="/archive">
                  <span>
                    (&nbsp; View Article <MdArrowOutward />
                    &nbsp;)
                  </span>
                </Link>
              </div>
            </div>
            <div className="case-studies-img case-studies-img-3">
              <img src="/images/home/case-study-3.jpeg" alt="" />
              <div className="hero-img-overlay"></div>
              <div className="case-studies-img-link">
                <Link href="/archive">
                  <span>
                    (&nbsp; View Article <MdArrowOutward />
                    &nbsp;)
                  </span>
                </Link>
              </div>
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
                text="Timeless Art Through a New Lens"
                triggerOnScroll={true}
              />
            </div>
          </div>

          <div className="works-content">
            <div className="container">
              <div className="col">
                <p className="primary">[ Creative Explorations ]</p>
              </div>
              <div className="col">
                <div className="works-copy">
                  <h2>Can machines innovate Like Human Artists?</h2>
                  <p>
                    These experiments explore the potential of advanced AI
                    tools, such as Midjourney and DALL-E 3, to reimagine classic
                    masterpieces through unique and boundary-pushing prompts.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="carousel">
          {carouselItems.map((item) => (
            <div
              key={item.id}
              id={`project-${item.id}`}
              className="project"
              style={{
                clipPath:
                  item.id === "01"
                    ? "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)"
                    : "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
              }}
            >
              <div className="project-bg">
                <img src={item.bg} alt="" />

                <div className="hero-img-overlay"></div>
                <div className="hero-img-gradient"></div>
              </div>
              <div className="project-main">
                <img src={item.main} alt="" />
              </div>
              <div className="project-header">
                <div className="project-id">
                  <h2>Archive {item.id}</h2>
                </div>
                <div className="project-whitespace"></div>
                <div className="project-title">
                  <h2>{item.title}</h2>
                </div>
              </div>
              <div className="project-info">
                <div className="project-url">
                  <Link href={item.url}>( The Journey )</Link>
                </div>
              </div>
              <Link
                href={item.url}
                className="project-overlay-link"
                aria-label={`View ${item.title} project`}
              />
            </div>
          ))}
        </section>

        <Footer />
      </div>
    </ReactLenis>
  );
}
