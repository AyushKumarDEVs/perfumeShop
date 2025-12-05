// src/components/ProductCard.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProductCard({
  id,
  name = "Velvet Bloom",
  description = "Soft floral fragrance with jasmine & rose.",
  price = "₹899",
  image = "/src/assets/products/perfume.png",
  link,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleClickCard = () => {
    if (!isOpen) {
      setIsOpen(true);
      return;
    }
    if (link) navigate(link);
    else if (id) navigate(`/products/${id}`);
  };

  const handleMouseEnter = () => setIsOpen(true);
  const handleMouseLeave = () => setIsOpen(false);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    console.log("Added to cart:", name);
  };

  return (
    <article
      onClick={handleClickCard}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="
        relative w-full max-w-xs
        h-52 sm:h-64
        rounded-2xl overflow-hidden cursor-pointer
        transition-all duration-500
        bg-gradient-to-br from-gray-100 via-white to-gray-200
        dark:from-gray-900 dark:via-gray-950 dark:to-black
        border border-white/70 dark:border-gray-800
        shadow-[0_0_25px_-6px_rgba(0,0,0,0.45)]
        hover:shadow-[0_0_35px_-5px_rgba(0,0,0,0.55)]
        hover:-translate-y-[6px]
      "
    >
      {/* IMAGE */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={image}
          alt={name}
          className={`
            w-full h-full object-cover
            transition-transform duration-[900ms]
            ${isOpen ? "scale-100 brightness-100" : "scale-110 brightness-[1.12]"}
          `}
        />
      </div>

      {/* CLOSED NAME PILL */}
      <div
        className={`
          absolute bottom-3 left-1/2 -translate-x-1/2
          px-4 py-1
          rounded-full text-sm font-semibold text-gray-900 dark:text-gray-100
          backdrop-blur-xl bg-white/70 dark:bg-gray-900/60
          border border-white/70 dark:border-gray-700
          shadow-lg
          transition-all duration-500
          ${isOpen ? "opacity-0 translate-y-2 scale-95" : "opacity-100 translate-y-0 scale-100"}
        `}
      >
        {name}
      </div>

      {/* DETAILS PANEL */}
      <div
        className={`
          absolute inset-x-0 bottom-0
          transition-transform duration-[650ms]
          ${isOpen ? "translate-y-0" : "translate-y-full"}
        `}
      >
        <div
          className="
            m-2 sm:m-3 p-2 sm:p-3 rounded-2xl flex flex-col gap-2
            backdrop-blur-xl
            bg-white/50 dark:bg-gray-900/40
            border border-white/60 dark:border-gray-700
            shadow-[0_0_35px_-8px_rgba(0,0,0,0.45)]
          "
        >
          <h2 className="text-sm font-semibold tracking-tight text-gray-900 dark:text-gray-100">
            {name}
          </h2>

          <p className="text-[11px] leading-relaxed text-gray-700 dark:text-gray-300">
            {description}
          </p>

          <div className="flex items-center justify-between">
            <span className="text-base font-bold tracking-wide text-gray-900 dark:text-gray-50">
              {price}
            </span>

            <button
              onClick={handleAddToCart}
              className="
                h-8 w-8 flex items-center justify-center
                rounded-full
                border border-gray-800 dark:border-gray-200
                text-gray-900 dark:text-gray-100
                hover:bg-gray-900 hover:text-white
                dark:hover:bg-white dark:hover:text-gray-900
                shadow-sm transition active:scale-95
              "
            >
              🛒
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
