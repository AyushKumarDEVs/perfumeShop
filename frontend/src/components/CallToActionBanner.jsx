import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import image from "../assets/products/perfume-1.png";

export default function CallToActionBanner({
  title = "Explore the Latest Collection",
  subtitle = "Fresh arrivals, exclusive drops & limited-time deals",
  primaryText = "Shop Now",
  secondaryText = "View Offers",
  onPrimary = () => {

  },
  onSecondary = () => {},
}) {
  const [open, setOpen] = useState(true);
  const [visible, setVisible] = useState(false);      // NEW → for banner appearance animation
  const [pullUp, setPullUp] = useState(false);        // internal animation
   const navigate = useNavigate();
    
  // Animate banner entrance + delayed panel pull for mobile
  useEffect(() => {
    setTimeout(() => setVisible(true), 50); // slight show delay for smooth entrance

    if (window.innerWidth < 640) {          // mobile only
      setTimeout(() => setPullUp(true), 1000); // trigger internal animation after 1 sec
    }
  }, []);

  if (!open) return null;

  return (
    <section
      className="
        fixed inset-0 flex items-center justify-center
        bg-black/40 backdrop-blur-sm z-50
      "
      onClick={() => setOpen(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          relative sm:w-80 sm:h-96 w-72 h-96 sm:top-5
          rounded-2xl overflow-hidden cursor-pointer
          shadow-[0_0_40px_-6px_rgba(0,0,0,.6)]
          bg-gradient-to-br from-gray-900 via-gray-950 to-black
          flex flex-col justify-end
          transition-all duration-700
          ${visible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-3"}
        `}
        onMouseEnter={() => window.innerWidth >= 640 && setPullUp(true)}
        onMouseLeave={() => window.innerWidth >= 640 && setPullUp(false)}
        onTouchStart={() => setPullUp(true)}
      >
        {/* CLOSE BUTTON */}
        <button
          onClick={() => setOpen(false)}
          className="
            absolute top-3 right-3 z-20
            p-2 rounded-full text-white
            bg-white/15 hover:bg-white/25
            backdrop-blur-sm transition
          "
        >
          ✕
        </button>

        {/* WHAT'S NEW HEADING (TOP) */}
        <div
          className="
            absolute top-4 left-1/2 -translate-x-1/2 z-10
            px-4 py-1
            rounded-full
            text-[11px] font-semibold tracking-[0.18em] uppercase
            text-white/90 bg-white/10 border border-white/30 backdrop-blur-md
          "
        >
          What's New
        </div>

        {/* PERFUME IMAGE */}
        <img
          src={image}
          alt="product"
          className={`
            absolute inset-0 mx-auto my-auto
            w-[65%] h-[65%] object-contain
            transition-all duration-[650ms]
            ${pullUp ? "scale-[0.92] translate-y-4" : "scale-100 translate-y-0"}
          `}
        />

        {/* BOTTOM PANEL WITH TEXT + BUTTONS */}
        <div
          className={`
            absolute inset-x-0 bottom-0
            transition-transform duration-[650ms]
            ${pullUp ? "translate-y-0" : "translate-y-[70%]"}
          `}
        >
          <div
            className="
              m-3 p-4 rounded-2xl text-white shadow-xl
              flex flex-col gap-2
              backdrop-blur-xl bg-white/15 border border-white/30
            "
          >
            <h1 className="text-lg font-bold text-center">{title}</h1>
            <p className="text-xs text-white/90 text-center">{subtitle}</p>

            <div className="mt-3 flex items-center justify-center gap-3">
              <button
                onClick={()=>{
                  navigate(`/trending`)
                  setOpen(false);

                }}
                className="
                  px-4 py-2 rounded-full text-sm font-medium
                  bg-white text-gray-900
                  hover:bg-gray-200 active:scale-95 transition
                "
              >
                {primaryText}
              </button>
              <button
                onClick={()=>{
                  navigate(`/trending`)
                  setOpen(false);

                }}
                className="
                  px-4 py-2 rounded-full text-sm font-medium
                  border border-white/60 text-white
                  hover:bg-white/10 active:scale-95 transition
                "
              >
                {secondaryText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
