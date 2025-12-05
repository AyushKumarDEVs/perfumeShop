// src/components/ImageGallery.jsx
import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function ImageGallery({ images = [], productName }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  /* ZOOM + PAN STATES */
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const lastPos = useRef({ x: 0, y: 0 });

  /* MOBILE SWIPE STATES */
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => setIsMounted(true), []);

  const resetZoom = () => {
    setScale(1);
    setOffset({ x: 0, y: 0 });
  };

  const openFullscreen = () => {
    resetZoom();
    setIsFullscreen(true);
  };
  const closeFullscreen = () => {
    resetZoom();
    setIsFullscreen(false);
  };

  /* ESC CLOSE */
  useEffect(() => {
    if (!isFullscreen) return;
    const handler = (e) => e.key === "Escape" && closeFullscreen();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isFullscreen]);

  /* DESKTOP ARROW SWITCH */
  useEffect(() => {
    if (!isFullscreen) return;
    const handler = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isFullscreen]);

  const next = () => {
    resetZoom();
    setActiveIndex((i) => (i + 1) % images.length);
  };
  const prev = () => {
    resetZoom();
    setActiveIndex((i) => (i - 1 + images.length) % images.length);
  };

  /* MOUSE ZOOM (double-click) */
  const handleDoubleClick = () => {
    if (scale === 1) setScale(2);
    else resetZoom();
  };

  /* DRAG TO PAN */
  const handleMouseDown = (e) => {
    if (scale === 1) return;
    lastPos.current = { x: e.clientX, y: e.clientY };
    window.onmousemove = (ev) => {
      setOffset((o) => ({
        x: o.x + (ev.clientX - lastPos.current.x),
        y: o.y + (ev.clientY - lastPos.current.y),
      }));
      lastPos.current = { x: ev.clientX, y: ev.clientY };
    };
    window.onmouseup = () => {
      window.onmousemove = null;
    };
  };

  /* MOBILE SWIPE */
  const handleTouchStart = (e) => {
    if (e.touches.length === 2) return; // pinch-zoom
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchMove = (e) => {
    if (e.touches.length === 2) return;
    touchEndX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = () => {
    if (scale !== 1) return; // don't swipe while zoomed
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 80) next();
    if (diff < -80) prev();
  };

  /* PINCH ZOOM */
  const handlePinch = (e) => {
    if (e.touches.length !== 2) return;
    const dist = Math.hypot(
      e.touches[0].clientX - e.touches[1].clientX,
      e.touches[0].clientY - e.touches[1].clientY
    );
    if (!handlePinch.last) handlePinch.last = dist;
    const delta = dist - handlePinch.last;
    handlePinch.last = dist;
    setScale((s) => Math.min(4, Math.max(1, s + delta * 0.004)));
  };

  if (!images.length) return null;

  return (
    <>
      {/* Normal gallery */}
      <section
        className="
          relative w-full rounded-2xl overflow-hidden
          bg-gradient-to-br from-white/80 via-gray-100/80 to-white/60
          dark:from-gray-800/70 dark:via-gray-900/70 dark:to-black/60
          border border-white/60 dark:border-gray-700
          shadow-[0_0_40px_-8px_rgba(0,0,0,0.45)]
          backdrop-blur-xl
        "
      >
        {/* Share button */}
        <button
          className="
            absolute top-3 right-3 z-10
            px-3 py-1.5 rounded-full text-xs font-semibold
            bg-white/70 dark:bg-gray-900/70
            text-gray-900 dark:text-gray-100
            backdrop-blur-lg border border-white/60 dark:border-gray-700
            hover:bg-white/90 dark:hover:bg-gray-800
            shadow-sm active:scale-95 transition
          "
          onClick={async () => {
            const share = { title: productName, text: productName, url: window.location.href };
            try {
              navigator.share
                ? await navigator.share(share)
                : await navigator.clipboard.writeText(share.url);
            } catch {}
          }}
        >
          Share
        </button>

        <button
          onClick={openFullscreen}
          className="w-full aspect-[4/3] sm:aspect-[16/9] block overflow-hidden"
        >
          <img
            src={images[activeIndex]}
            alt={productName}
            className="
              w-full h-full object-contain rounded-xl
              hover:scale-[1.03] transition-transform duration-500
              shadow-inner
            "
          />
        </button>

        <div className="flex gap-3 p-3 overflow-x-auto bg-white/30 dark:bg-gray-900/30 backdrop-blur-lg border-t border-white/50 dark:border-gray-700">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`
                w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border flex-shrink-0
                transition-all duration-200
                ${
                  activeIndex === i
                    ? "border-pink-500 shadow-lg scale-105"
                    : "opacity-60 hover:opacity-100 hover:scale-105"
                }
              `}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </section>

      {/* FULLSCREEN */}
      {isMounted &&
        isFullscreen &&
        createPortal(
          <div
            className="
              fixed inset-0 z-[9999]
              bg-black/80 backdrop-blur-2xl
              flex items-center justify-center
              p-5 overflow-auto select-none
            "
            onClick={closeFullscreen}
          >
            {/* Close */}
            <button
              onClick={closeFullscreen}
              className="
                absolute top-6 right-6
                text-white font-medium text-sm
                px-4 py-1 rounded-full
                bg-white/20 border border-white/40
                hover:bg-white/35 active:scale-95
                transition
              "
            >
              ✕ Close
            </button>

            {/* Arrows – premium glow */}
            <button
              onClick={(e) => (e.stopPropagation(), prev())}
              className="
                hidden md:flex absolute left-6 text-white text-5xl
                opacity-70 hover:opacity-100
                drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]
                select-none transition
              "
            >
              ‹
            </button>
            <button
              onClick={(e) => (e.stopPropagation(), next())}
              className="
                hidden md:flex absolute right-6 text-white text-5xl
                opacity-70 hover:opacity-100
                drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]
                select-none transition
              "
            >
              ›
            </button>

            {/* Fullscreen image */}
            <div
              className="relative max-w-6xl w-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={images[activeIndex]}
                onDoubleClick={handleDoubleClick}
                onMouseDown={handleMouseDown}
                onTouchStart={handleTouchStart}
                onTouchMove={(e) => {
                  handleTouchMove(e);
                  handlePinch(e);
                }}
                onTouchEnd={handleTouchEnd}
                alt=""
                style={{
                  transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
                  transition: scale === 1 ? "transform .25s ease" : "none",
                }}
                className="
                  max-h-[88vh] max-w-full object-contain
                  rounded-2xl shadow-[0_0_35px_2px_rgba(255,255,255,0.35)]
                  border border-white/30 bg-black
                  cursor-grab active:cursor-grabbing
                "
                draggable={false}
              />
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
