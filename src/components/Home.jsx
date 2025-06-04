import "../styles/main.scss";
import React, { useState, useEffect, lazy, useMemo, useCallback} from "react";
import { useTranslation } from "react-i18next";
import background from "../images/background.png";
import singers from "../images/singers.jpg"
import gsap from "gsap";
import sample from "../audio.mp3";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

const Audio = lazy(() => import('./Audio'));
const LazyImage = lazy(() => import('./LazyImage'));

gsap.registerPlugin(ScrollTrigger, SplitText);
function Home() {

  const { t, i18n } = useTranslation();
  const steps = [1, 2, 3, 4];

  const topHits = [
    { title: "Levitating", votes: "100K" },
    { title: "New Rules", votes: "100K" },
    { title: "No Lie", votes: "100K" },
    { title: "One Kiss", votes: "100K" },
    { title: "Don't Start Now", votes: "100K" },
  ];
   const faqs = useMemo(() => [
    {
      question: t("question-1"),
      answer:
        "loren ipsumt dolore magna alla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      question: t("question-2"),
      answer:
        "l veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      question: t("question-3"),
      answer:
        "Absolutely! The platform is designed for live interaction. You can make adjustments on the fly, responding to your fans' rankings as the event unfolds.",
    },
    {
      question: t("question-4"),
      answer:
        "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      question: t("question-5"),
      answer:
        "se cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    ], [t]);
  const [openIndex, setOpenIndex] = useState(null);
  const [fanIndex, setFanIndex] = useState(null);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggle = (index, type) => {
    if (type === "artist") {
      setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
    } else if (type === "fan") {
      setFanIndex((prevIndex) => (prevIndex === index ? null : index));
    }
  };

  const changeLanguage = useCallback((e) => {
    i18n.changeLanguage(e.target.value);
  }, [i18n]);



  useEffect(() => {
    const animations = [];

    // Hero image animation
    animations.push(
      gsap.fromTo(".hero-right img", 
        { y: 160 },
        {
          y: 0,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: ".hero-section",
            start: "top top",
            scrub: true,
            duration: 1,
            toggleActions: "start none none none",
          }
        }
      )
    );

    // Fade in text elements
    gsap.utils.toArray(".fade-text").forEach((el) => {
      animations.push(
        gsap.fromTo(el,
          { opacity: 0, x: 20 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        )
      );
    });

    // Title character animation
    const split = new SplitText(".hero-title", {
      types: "chars",
      tagName: "span"
    });

    animations.push(
      gsap.fromTo(split.chars,
        { opacity: 0, filter: "blur(5px)" },
        {
          opacity: 1,
          filter: "blur(0px)",
          stagger: 0.05,
          duration: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".hero-title",
            start: "top 60%",
            toggleActions: "play none none none",
            scrub: false,
          },
        }
      )
    );

    // General animations
    gsap.utils.toArray(".anim").forEach((el) => {
      animations.push(
        gsap.fromTo(el,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            delay: 0.5,
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        )
      );
    });

    // Hero image scale animation
    animations.push(
      gsap.fromTo(".hero-right img",
        { scaleX: 0, transformOrigin: "left" },
        {
          scaleX: 1,
          duration: 2,
          ease: "power2.out",
        }
      )
    );

    return () => {
      // Cleanup animations
      animations.forEach(anim => anim.kill());
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      if (split) split.revert();
    };
  }, []);

  // Preload critical images
  useEffect(() => {
    const preloadImages = [
     singers,
   background
    ];
    
    preloadImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);
  return (
 
    <div>
      <header className="header" style={{ display: isMobileOpen && "fixed" }}>
        <div className="box">
          <div className="header-content">
            <div className="h-left">
              <svg
                id="logo"
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 959.89 282.5"
              >
                <defs></defs>
                <polygon
                  class="cls-1"
                  points="177.17 0.04 177.13 0 123.87 60.88 123.87 134.42 177.17 77.57 177.25 77.49 232.99 134.42 232.99 60.88 177.17 0.04"
                ></polygon>
                <polygon
                  class="cls-2"
                  points="179.69 282.46 179.73 282.5 232.99 221.62 232.99 148.08 179.69 204.93 179.61 205.01 123.87 148.08 123.87 221.62 179.69 282.46"
                ></polygon>
                <rect
                  class="cls-2 ll-1"
                  x="253.97"
                  y="20.46"
                  width="11.1"
                  height="241.57"
                  rx="1.13"
                ></rect>
                <rect
                  class="cls-2 ll-2"
                  x="284.57"
                  y="50.02"
                  width="11.1"
                  height="182.45"
                  rx="1.13"
                ></rect>
                <rect
                  class="cls-2  ll-3"
                  x="315.17"
                  y="102.72"
                  width="11.1"
                  height="77.06"
                  rx="1.13"
                ></rect>
                <rect
                  class="cls-2  ll-4"
                  x="345.76"
                  y="116.7"
                  width="11.1"
                  height="49.11"
                  rx="1.13"
                ></rect>
                <rect
                  class="cls-2 ll-1"
                  x="91.79"
                  y="38.54"
                  width="11.1"
                  height="241.57"
                  rx="1.13"
                  transform="translate(194.68 300.57) rotate(-180)"
                ></rect>
                <rect
                  class="cls-2 ll-2"
                  x="61.19"
                  y="68.09"
                  width="11.1"
                  height="182.45"
                  rx="1.13"
                  transform="translate(133.49 300.57) rotate(-180)"
                ></rect>
                <rect
                  class="cls-2  ll-3"
                  x="30.6"
                  y="120.79"
                  width="11.1"
                  height="77.06"
                  rx="1.13"
                  transform="translate(72.29 300.57) rotate(-180)"
                ></rect>
                <rect
                  class="cls-2  ll-4"
                  y="134.77"
                  width="11.1"
                  height="49.11"
                  rx="1.13"
                  transform="translate(11.1 300.57) rotate(-180)"
                ></rect>
                <path
                  class="cls-2"
                  d="M500.12,139.65V179H491V162.86H473.15V179h-9.1V139.65h9.1v15.51H491V139.65Z"
                  transform="translate(0 -18.07)"
                ></path>
                <path
                  class="cls-2"
                  d="M554.27,139.65h9.1V179h-9.1Z"
                  transform="translate(0 -18.07)"
                ></path>
                <path
                  class="cls-2"
                  d="M631,147.07H618.41v-7.42h34.27v7.42H640.1V179H631Z"
                  transform="translate(0 -18.07)"
                ></path>
                <path
                  class="cls-2"
                  d="M729.33,153.93c0,8.76-6.57,14.21-17.08,14.21h-7.92V179h-9.11V139.65h17C722.76,139.65,729.33,145.1,729.33,153.93Zm-9.22,0c0-4.33-2.81-6.86-8.37-6.86h-7.41v13.65h7.41C717.3,160.72,720.11,158.2,720.11,153.93Z"
                  transform="translate(0 -18.07)"
                ></path>
                <path
                  class="cls-2"
                  d="M784.46,139.65h9.1V179h-9.1Z"
                  transform="translate(0 -18.07)"
                ></path>
                <path
                  class="cls-2"
                  d="M861.3,163.53,856,169V179h-9V139.65h9V158l17.42-18.38h10.11l-16.3,17.54L884.5,179H873.88Z"
                  transform="translate(0 -18.07)"
                ></path>
                <path
                  class="cls-2"
                  d="M950.11,179,942.52,168h-8.37V179h-9.1V139.65h17c10.51,0,17.08,5.45,17.08,14.28a12.77,12.77,0,0,1-8.09,12.41L959.89,179Zm-8.54-31.91h-7.42v13.71h7.42c5.56,0,8.37-2.58,8.37-6.85S947.13,147.07,941.57,147.07Z"
                  transform="translate(0 -18.07)"
                ></path>
              </svg>
            </div>
            <nav className="h-center">
              <a href="/">{t("home")}</a>
              <a href="/">{t("dashboard")}</a>
              <a href="/">{t("profile")}</a>
              <a href="/">{t("events")}</a>
              <a href="/">{t("settings")}</a>
            </nav>
            <div className="h-right">
              <div className="language">
                <div className="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M19.0612 18.67L16.9212 14.4L14.7812 18.67"
                      stroke="#ffffff"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      fill=""
                    ></path>
                    <path
                      d="M15.1719 17.91H18.6919"
                      stroke="#ffffff"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                    <path
                      d="M16.9198 22C14.1198 22 11.8398 19.73 11.8398 16.92C11.8398 14.12 14.1098 11.84 16.9198 11.84C19.7198 11.84 21.9998 14.11 21.9998 16.92C21.9998 19.73 19.7298 22 16.9198 22Z"
                      stroke="#ffffff"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                    <path
                      d="M5.02 2H8.94C11.01 2 12.01 3.00002 11.96 5.02002V8.94C12.01 11.01 11.01 12.01 8.94 11.96H5.02C3 12 2 11 2 8.92999V5.01001C2 3.00001 3 2 5.02 2Z"
                      stroke="#ffffff"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                    <path
                      d="M9.01312 5.84998H4.95312"
                      stroke="#ffffff"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                    <path
                      d="M6.97266 5.16998V5.84998"
                      stroke="#ffffff"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                    <path
                      d="M7.99141 5.84003C7.99141 7.59003 6.62141 9.01001 4.94141 9.01001"
                      stroke="#ffffff"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                    <path
                      d="M9.01015 9.01001C8.28015 9.01001 7.62016 8.62 7.16016 8"
                      stroke="#ffffff"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                    <path
                      opacity="0.4"
                      d="M2 15C2 18.87 5.13 22 9 22L7.95 20.25"
                      stroke="#ffffff"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                    <path
                      opacity="0.4"
                      d="M22 9C22 5.13 18.87 2 15 2L16.05 3.75"
                      stroke="#ffffff"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </svg>
                </div>
                {/* <option value="de" class="lang-options">
                  DE
                </option> */}
             <label htmlFor="language-select" className="sr-only">Select Language</label>
                <select
                  class="lang-select"
                  onChange={changeLanguage}
                  value={i18n.language}
                >
                  <option value="en" class="lang-options">
                    EN
                  </option>
                  <option value="de" class="lang-options">
                    DE
                  </option>
                  <option value="es" class="lang-options">
                    ES
                  </option>
                </select>
              </div>
              <img  loading="lazy"
                src={singers}
                alt="avatar"
                className="avatar"
              />
              {!isMobileOpen ? (
                <svg
                  onClick={() => setIsMobileOpen(true)}
                  id="menu"
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  viewBox="0 0 16 16"
                  height="30"
                  width="30"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                  ></path>
                </svg>
              ) : (
                <svg
                  id="menu"
                  onClick={() => setIsMobileOpen(false)}
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  viewBox="0 0 16 16"
                  height="30"
                  width="30"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"></path>
                </svg>
              )}
            </div>
          </div>
          {isMobileOpen && (
            <nav className="mobile-menu">
              <a href="/">{t("home")}</a>
              <a href="/">{t("dashboard")}</a>
              <a href="/">{t("profile")}</a>
              <a href="/">{t("events")}</a>
              <a href="/">{t("settings")}</a>
              <span>
                <a class="gray-btn" href="/login">
                  Login
                </a>
                <a class="yellow-btn" href="/signup">
                  Sign Up
                </a>
              </span>
            </nav>
          )}
        </div>
      </header>
      <section className="hero-section">
       <React.Suspense fallback={<div className="image-placeholder" />}>
          <LazyImage
            id="hero-bg"
            src={background}
            alt=""
            className="hero-bg-image"
          />
        </React.Suspense>

        <div className="box">
          <div className="scroll-down">
              <React.Suspense fallback={<div className="image-placeholder" />}>
              <LazyImage
                className="circle-img"
                width={125}
                height={125}
                src="https://hitpikr-webexhaust.netlify.app/static/media/sd-circle.5a8d4a81fd5e3134de853ba113321e58.svg"
                alt="Scroll down icon"
              />
              <LazyImage
                className="arrow-img"
                src="https://hitpikr-webexhaust.netlify.app/static/media/sc-arrow.d8cbb52e8c1ceb01f6b3162244d899ac.svg"
                alt=""
              />
            </React.Suspense>
          </div>
          <div className="hero-container">
            <div className="hero-left">
              <p className="tagline">{t("hero-tagline")}</p>
              <h1 className="hero-title">
                {t("hero-title")}
                <br></br>
                {t("hero-title2")}
              </h1>
              <p className="hero-subtitle anim">{t("hero-description")}</p>
              <div className="hero-search anim">
                <input
                  type="text"
                  placeholder={t("search-events-placeholder")}
                />
                <button aria-label="Vote">
                  <span> {t("vote")} </span>
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 16 16"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                    ></path>
                  </svg>
                </button>
              </div>
              <div class="btns">
                <a class="gray-btn" href="/login">
                  Login
                </a>
                <a class="yellow-btn" href="/signup">
                  Sign Up
                </a>
              </div>
            </div>
            <div className="hero-right">
              <img  loading="lazy"
                src={singers}
                alt="Guitar player and tattooed woman"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="hiw-section">
        <div className="box">
          <div className="hiw-head">
            <h6 className="tagline">{t("effortless-interaction")}</h6>
            <h2 className="heading">{t("how-it-works")}</h2>
          </div>
          <div className="hiw-grid">
            <div className="hiw-left">
              <h3>{t("for-artists")}</h3>
              {steps.map((num, index) => (
                <div className="list" key={num}>
                  <div className="indexing">
                    <div className="circular-point">
                      <span>{num}</span>
                    </div>
                    {index !== steps.length - 1 && (
                      <div className="dotted-line"></div>
                    )}
                  </div>

                  <div className="point-content fade-text">
                    <h6>{t(`steps.${num}.title`)}</h6>
                    <p className={index === steps.length - 1 ? "pb-0" : ""}>
                      {t(`steps.${num}.description`)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="hiw-right">
              <h3>{t("for-fans")}</h3>
              {steps.map((num, index) => (
                <div className="list" key={num}>
                  <div className="indexing">
                    <div className="circular-point">
                      <span>{num}</span>
                    </div>
                    {index !== steps.length - 1 && (
                      <div className="dotted-line"></div>
                    )}
                  </div>

                  <div className="point-content fade-text">
                    <h6>{t(`fansteps.${num}.title`)}</h6>
                    <p className={index === steps.length - 1 ? "pb-0" : ""}>
                      {t(`fansteps.${num}.description`)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="our-features">
        <div className="box">
          <div className="of-head">
            <h6 className="tagline">{t("our-features")}</h6>
            <h2 className="heading">{t("features-tagline")}</h2>
          </div>
          <div className="features-box">
            <div className="of-grid box-1">
              <div className="content-grid">
                <div className="fade-text">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 16 16"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.5 11.5A.5.5 0 0 1 5 11h10a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zm-2-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm-2-4A.5.5 0 0 1 1 3h10a.5.5 0 0 1 0 1H1a.5.5 0 0 1-.5-.5z"
                    ></path>
                  </svg>
                  <h3>{t("feature-dynamic-title")}</h3>
                  <p>{t("feature-dynamic-desc")}</p>
                </div>
                <div className="fade-text">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 16 16"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M8.39 12.648a1.32 1.32 0 0 0-.015.18c0 .305.21.508.5.508.266 0 .492-.172.555-.477l.554-2.703h1.204c.421 0 .617-.234.617-.547 0-.312-.188-.53-.617-.53h-.985l.516-2.524h1.265c.43 0 .618-.227.618-.547 0-.313-.188-.524-.618-.524h-1.046l.476-2.304a1.06 1.06 0 0 0 .016-.164.51.51 0 0 0-.516-.516.54.54 0 0 0-.539.43l-.523 2.554H7.617l.477-2.304c.008-.04.015-.118.015-.164a.512.512 0 0 0-.523-.516.539.539 0 0 0-.531.43L6.53 5.484H5.414c-.43 0-.617.22-.617.532 0 .312.187.539.617.539h.906l-.515 2.523H4.609c-.421 0-.609.219-.609.531 0 .313.188.547.61.547h.976l-.516 2.492c-.008.04-.015.125-.015.18 0 .305.21.508.5.508.265 0 .492-.172.554-.477l.555-2.703h2.242l-.515 2.492zm-1-6.109h2.266l-.515 2.563H6.859l.532-2.563z"></path>
                  </svg>
                  <h3>{t("feature-code-title")}</h3>
                  <p>{t("feature-code-desc")}</p>
                </div>
                <div className="fade-text">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 16 16"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022l-.074.997zm2.004.45a7.003 7.003 0 0 0-.985-.299l.219-.976c.383.086.76.2 1.126.342l-.36.933zm1.37.71a7.01 7.01 0 0 0-.439-.27l.493-.87a8.025 8.025 0 0 1 .979.654l-.615.789a6.996 6.996 0 0 0-.418-.302zm1.834 1.79a6.99 6.99 0 0 0-.653-.796l.724-.69c.27.285.52.59.747.91l-.818.576zm.744 1.352a7.08 7.08 0 0 0-.214-.468l.893-.45a7.976 7.976 0 0 1 .45 1.088l-.95.313a7.023 7.023 0 0 0-.179-.483zm.53 2.507a6.991 6.991 0 0 0-.1-1.025l.985-.17c.067.386.106.778.116 1.17l-1 .025zm-.131 1.538c.033-.17.06-.339.081-.51l.993.123a7.957 7.957 0 0 1-.23 1.155l-.964-.267c.046-.165.086-.332.12-.501zm-.952 2.379c.184-.29.346-.594.486-.908l.914.405c-.16.36-.345.706-.555 1.038l-.845-.535zm-.964 1.205c.122-.122.239-.248.35-.378l.758.653a8.073 8.073 0 0 1-.401.432l-.707-.707z"></path>
                    <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0v1z"></path>
                    <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z"></path>
                  </svg>
                  <h3>{t("feature-insights-title")}</h3>
                  <p>{t("feature-insights-desc")}</p>
                </div>

                <div className="fade-text">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 16 16"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718H4zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73l.348.086z"></path>
                  </svg>
                  <h3>{t("feature-monetization-title")}</h3>
                  <p>{t("feature-monetization-desc")}</p>
                </div>
              </div>
            </div>
            <div className="of-grid box-a">
              <img  loading="lazy"
                src={singers}
                alt="Guitar player and tattoo"
              ></img>
            </div>
            <div className="of-grid box-b">
              <img  loading="lazy"
                src="https://hitpikr-webexhaust.netlify.app/static/media/1.8d2c98259b1a5d4c35f6.jpg"
                alt="concert"
              ></img>
            </div>
            <div className="of-grid box-2">
              <div className="content-grid">
                <div className="fade-text">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 16 16"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.5 11.5A.5.5 0 0 1 5 11h10a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zm-2-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm-2-4A.5.5 0 0 1 1 3h10a.5.5 0 0 1 0 1H1a.5.5 0 0 1-.5-.5z"
                    ></path>
                  </svg>
                  <h3>{t("feature-dynamic-title")}</h3>
                  <p>{t("feature-dynamic-desc")}</p>
                </div>
                <div className="fade-text">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 16 16"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M8.39 12.648a1.32 1.32 0 0 0-.015.18c0 .305.21.508.5.508.266 0 .492-.172.555-.477l.554-2.703h1.204c.421 0 .617-.234.617-.547 0-.312-.188-.53-.617-.53h-.985l.516-2.524h1.265c.43 0 .618-.227.618-.547 0-.313-.188-.524-.618-.524h-1.046l.476-2.304a1.06 1.06 0 0 0 .016-.164.51.51 0 0 0-.516-.516.54.54 0 0 0-.539.43l-.523 2.554H7.617l.477-2.304c.008-.04.015-.118.015-.164a.512.512 0 0 0-.523-.516.539.539 0 0 0-.531.43L6.53 5.484H5.414c-.43 0-.617.22-.617.532 0 .312.187.539.617.539h.906l-.515 2.523H4.609c-.421 0-.609.219-.609.531 0 .313.188.547.61.547h.976l-.516 2.492c-.008.04-.015.125-.015.18 0 .305.21.508.5.508.265 0 .492-.172.554-.477l.555-2.703h2.242l-.515 2.492zm-1-6.109h2.266l-.515 2.563H6.859l.532-2.563z"></path>
                  </svg>
                  <h3>{t("feature-code-title")}</h3>
                  <p>{t("feature-code-desc")}</p>
                </div>
                <div className="fade-text">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 16 16"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022l-.074.997zm2.004.45a7.003 7.003 0 0 0-.985-.299l.219-.976c.383.086.76.2 1.126.342l-.36.933zm1.37.71a7.01 7.01 0 0 0-.439-.27l.493-.87a8.025 8.025 0 0 1 .979.654l-.615.789a6.996 6.996 0 0 0-.418-.302zm1.834 1.79a6.99 6.99 0 0 0-.653-.796l.724-.69c.27.285.52.59.747.91l-.818.576zm.744 1.352a7.08 7.08 0 0 0-.214-.468l.893-.45a7.976 7.976 0 0 1 .45 1.088l-.95.313a7.023 7.023 0 0 0-.179-.483zm.53 2.507a6.991 6.991 0 0 0-.1-1.025l.985-.17c.067.386.106.778.116 1.17l-1 .025zm-.131 1.538c.033-.17.06-.339.081-.51l.993.123a7.957 7.957 0 0 1-.23 1.155l-.964-.267c.046-.165.086-.332.12-.501zm-.952 2.379c.184-.29.346-.594.486-.908l.914.405c-.16.36-.345.706-.555 1.038l-.845-.535zm-.964 1.205c.122-.122.239-.248.35-.378l.758.653a8.073 8.073 0 0 1-.401.432l-.707-.707z"></path>
                    <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0v1z"></path>
                    <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z"></path>
                  </svg>
                  <h3>{t("feature-insights-title")}</h3>
                  <p>{t("feature-insights-desc")}</p>
                </div>

                <div className="fade-text">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 16 16"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718H4zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73l.348.086z"></path>
                  </svg>
                  <h3>{t("feature-monetization-title")}</h3>
                  <p>{t("feature-monetization-desc")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="events-section">
        <img  loading="lazy"
          alt=""
          className="events-bg"
          src="https://hitpikr-webexhaust.netlify.app/static/media/rd-bg-img.a8f31e480c29d477cafd.png"
        ></img>
        <div className="box">
          <div className="events-head">
            <h6 className="tagline">{t("our-features")}</h6>
            <h2 className="heading">{t("featured-events")}</h2>
          </div>

          <div className="concert-card anim">
            <div className="concert-header">
              <span className="featured">
                Featured{" "}
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  viewBox="0 0 16 16"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7.657 6.247c.11-.33.576-.33.686 0l.645 1.937a2.89 2.89 0 0 0 1.829 1.828l1.936.645c.33.11.33.576 0 .686l-1.937.645a2.89 2.89 0 0 0-1.828 1.829l-.645 1.936a.361.361 0 0 1-.686 0l-.645-1.937a2.89 2.89 0 0 0-1.828-1.828l-1.937-.645a.361.361 0 0 1 0-.686l1.937-.645a2.89 2.89 0 0 0 1.828-1.828l.645-1.937zM3.794 1.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387A1.734 1.734 0 0 0 4.593 5.69l-.387 1.162a.217.217 0 0 1-.412 0L3.407 5.69A1.734 1.734 0 0 0 2.31 4.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387A1.734 1.734 0 0 0 3.407 2.31l.387-1.162zM10.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732L9.1 2.137a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L10.863.1z"></path>
                </svg>
              </span>
              <div className="header-actions">
                <div className="icon">
                  {" "}
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 16 16"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5z"></path>
                  </svg>
                </div>
                <div className="icon">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 16 16"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>

            <div className="background-overlay">
              <div className="bg-gradient"></div>
            </div>

            <div className="concert-info">
              <img  loading="lazy"
                src={singers}
                alt="artist"
                className="artist-img"
              />
            </div>

            <div className="concert-details">
              <div className="details">
                <div className="event-name">
                  <label>{t("event-name")}</label>
                  <h3>Moonlight, NYC Concert</h3>
                </div>
                <div className="event-name">
                  <label>{t("artist-name")}</label>
                  <h3>205K</h3>
                </div>
                <div className="event-name">
                  <label>{t("artist-name")}</label>
                  <h3>
                    Dua Lipa <span className="handle">@dualipa</span>
                  </h3>
                </div>
              </div>

              <div className="top-hits">
                <h4>Top 5 Hits</h4>
                <div className="hits-list">
                  {topHits.map((hit, idx) => (
                    <div className="hit-card" key={idx}>
                      {/* <div className="waveform" /> */}
                      <Audio audioUrl={sample} title={hit.title} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="vote-now">
                <button aria-label="Vote Now"> 
                  {t("vote-now")}
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 16 16"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5zm-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5z"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="faq-section">
        <div className="box">
          <div className="faq-head">
            <h6 className="tagline">{t("faqs")}</h6>
            <h2 className="heading">{t("faq-tagline")}</h2>
          </div>

          <div className="faq-grid">
            <div className="faq-column">
              <h3>{t("for-artists")}</h3>
              <div className="faq-items">
                {faqs.map((item, i) => (
                  <div
                    key={i}
                    className={`faq-item ${openIndex === i ? "open" : ""}`}
                    onClick={() => toggle(i, "artist")}
                  >
                    <div className="question">
                      <p>{item.question}</p>
                      <span className={`arrow ${openIndex === i && "rotate"}`}>
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          stroke-width="0"
                          viewBox="0 0 16 16"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                          ></path>
                        </svg>
                      </span>
                    </div>

                    {openIndex === i && item.answer && (
                      <div className="answer">{item.answer}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="faq-column">
              <h3>{t("for-fans")}</h3>
              <div className="faq-items">
                {faqs.map((item, i) => (
                  <div
                    key={i}
                    className={`faq-item ${fanIndex === i ? "open" : ""}`}
                    onClick={() => toggle(i, "fan")}
                  >
                    <div className="question">
                      <p>{item.question}</p>
                      <span className={`arrow ${fanIndex === i && "rotate"}`}>
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          stroke-width="0"
                          viewBox="0 0 16 16"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                          ></path>
                        </svg>
                      </span>
                    </div>

                    {fanIndex === i && item.answer && (
                      <div className="answer">{item.answer}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="box">
          <div className="footer-content">
            <div className="footer-top">
              <div className="footer-top-left">
                <svg
                  id="logo"
                  data-name="Layer 1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 959.89 282.5"
                >
                  <defs></defs>
                  <polygon
                    class="cls-1"
                    points="177.17 0.04 177.13 0 123.87 60.88 123.87 134.42 177.17 77.57 177.25 77.49 232.99 134.42 232.99 60.88 177.17 0.04"
                  ></polygon>
                  <polygon
                    class="cls-2"
                    points="179.69 282.46 179.73 282.5 232.99 221.62 232.99 148.08 179.69 204.93 179.61 205.01 123.87 148.08 123.87 221.62 179.69 282.46"
                  ></polygon>
                  <rect
                    class="cls-2 ll-1"
                    x="253.97"
                    y="20.46"
                    width="11.1"
                    height="241.57"
                    rx="1.13"
                  ></rect>
                  <rect
                    class="cls-2 ll-2"
                    x="284.57"
                    y="50.02"
                    width="11.1"
                    height="182.45"
                    rx="1.13"
                  ></rect>
                  <rect
                    class="cls-2  ll-3"
                    x="315.17"
                    y="102.72"
                    width="11.1"
                    height="77.06"
                    rx="1.13"
                  ></rect>
                  <rect
                    class="cls-2  ll-4"
                    x="345.76"
                    y="116.7"
                    width="11.1"
                    height="49.11"
                    rx="1.13"
                  ></rect>
                  <rect
                    class="cls-2 ll-1"
                    x="91.79"
                    y="38.54"
                    width="11.1"
                    height="241.57"
                    rx="1.13"
                    transform="translate(194.68 300.57) rotate(-180)"
                  ></rect>
                  <rect
                    class="cls-2 ll-2"
                    x="61.19"
                    y="68.09"
                    width="11.1"
                    height="182.45"
                    rx="1.13"
                    transform="translate(133.49 300.57) rotate(-180)"
                  ></rect>
                  <rect
                    class="cls-2  ll-3"
                    x="30.6"
                    y="120.79"
                    width="11.1"
                    height="77.06"
                    rx="1.13"
                    transform="translate(72.29 300.57) rotate(-180)"
                  ></rect>
                  <rect
                    class="cls-2  ll-4"
                    y="134.77"
                    width="11.1"
                    height="49.11"
                    rx="1.13"
                    transform="translate(11.1 300.57) rotate(-180)"
                  ></rect>
                  <path
                    class="cls-2"
                    d="M500.12,139.65V179H491V162.86H473.15V179h-9.1V139.65h9.1v15.51H491V139.65Z"
                    transform="translate(0 -18.07)"
                  ></path>
                  <path
                    class="cls-2"
                    d="M554.27,139.65h9.1V179h-9.1Z"
                    transform="translate(0 -18.07)"
                  ></path>
                  <path
                    class="cls-2"
                    d="M631,147.07H618.41v-7.42h34.27v7.42H640.1V179H631Z"
                    transform="translate(0 -18.07)"
                  ></path>
                  <path
                    class="cls-2"
                    d="M729.33,153.93c0,8.76-6.57,14.21-17.08,14.21h-7.92V179h-9.11V139.65h17C722.76,139.65,729.33,145.1,729.33,153.93Zm-9.22,0c0-4.33-2.81-6.86-8.37-6.86h-7.41v13.65h7.41C717.3,160.72,720.11,158.2,720.11,153.93Z"
                    transform="translate(0 -18.07)"
                  ></path>
                  <path
                    class="cls-2"
                    d="M784.46,139.65h9.1V179h-9.1Z"
                    transform="translate(0 -18.07)"
                  ></path>
                  <path
                    class="cls-2"
                    d="M861.3,163.53,856,169V179h-9V139.65h9V158l17.42-18.38h10.11l-16.3,17.54L884.5,179H873.88Z"
                    transform="translate(0 -18.07)"
                  ></path>
                  <path
                    class="cls-2"
                    d="M950.11,179,942.52,168h-8.37V179h-9.1V139.65h17c10.51,0,17.08,5.45,17.08,14.28a12.77,12.77,0,0,1-8.09,12.41L959.89,179Zm-8.54-31.91h-7.42v13.71h7.42c5.56,0,8.37-2.58,8.37-6.85S947.13,147.07,941.57,147.07Z"
                    transform="translate(0 -18.07)"
                  ></path>
                </svg>
              </div>
              <div className="footer-top-right">
                <div className="icon-outline">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 16 16"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383-4.758 2.855L15 11.114v-5.73zm-.034 6.878L9.271 8.82 8 9.583 6.728 8.82l-5.694 3.44A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.739zM1 11.114l4.758-2.876L1 5.383v5.73z"></path>
                  </svg>
                </div>
                <div className="icon-outline">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 16 16"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"></path>
                  </svg>
                </div>
                <div className="icon-outline">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 16 16"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"></path>
                  </svg>
                </div>
                <div className="icon-outline">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 16 16"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"></path>
                  </svg>
                </div>
              </div>
            </div>
            <div className="footer-bottom">
              <p> © 2023 HitPikr. All rights reserved</p>
            </div>
          </div>
        </div>
      </footer>
    </div>

  );
}

export default Home;
