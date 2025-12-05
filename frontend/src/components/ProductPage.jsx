// src/pages/ProductPage.jsx
import React from "react";
import ImageGallery from "../components/ImageGallery";
import ReviewsSection from "../components/ReviewsSection";

export default function ProductPage() {
  const product = {
    id: 1,
    name: "Velvet Bloom Eau de Parfum",
    price: "₹1,499",
    description:
      "Velvet Bloom is a rich floral fragrance with notes of jasmine, rose, and warm vanilla. Perfect for evening wear or special occasions, it leaves a soft, lasting trail.",
    sizes: ["30ml", "50ml", "100ml"],
    images: [
      "/src/assets/products/perfume.png",
      "/src/assets/products/perfume-1.png",
      "/src/assets/products/perfume.png",
    ],
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 dark:from-gray-900 dark:via-gray-950 dark:to-black text-gray-900 dark:text-gray-50 pb-20">
      <div className="max-w-6xl mx-auto px-4 pt-10">
        {/* Main layout container */}
        <div className="flex flex-col lg:flex-row gap-14">
          {/* LEFT: Sticky Image Gallery */}
          <div className="lg:w-5/12 lg:max-w-md lg:sticky lg:top-24 self-start">
            <div className="rounded-2xl border border-white/50 dark:border-gray-700 shadow-[0_0_30px_-5px_rgba(0,0,0,0.25)] backdrop-blur-xl">
              <ImageGallery images={product.images} productName={product.name} />
            </div>
          </div>

          {/* RIGHT: Scrollable content */}
          <div className="lg:w-7/12 space-y-10">
            {/* Name + Price + Sizes + Description */}
            <section className="space-y-6 rounded-2xl p-6 bg-white/60 dark:bg-gray-900/50 backdrop-blur-xl border border-white/40 dark:border-gray-700 shadow-md">
              {/* Name & Price row */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-gray-800 to-gray-500 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
                  {product.name}
                </h1>
                <span className="text-2xl font-semibold text-pink-600 dark:text-pink-400 drop-shadow-sm">
                  {product.price}
                </span>
              </div>

              {/* Sizes */}
              <div className="flex flex-wrap items-center gap-2 text-sm">
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  Available sizes:
                </span>
                {product.sizes.map((size) => (
                  <span
                    key={size}
                    className="px-3 py-1 rounded-full border border-gray-300 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 shadow-sm text-xs"
                  >
                    {size}
                  </span>
                ))}
              </div>

              {/* Description */}
              <p className="text-sm sm:text-base leading-relaxed text-gray-700 dark:text-gray-300">
                {product.description}
              </p>
            </section>

            {/* CTAs */}
            <section className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <button className="w-full sm:w-auto px-8 py-3 rounded-full text-sm font-semibold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 text-white dark:text-gray-900 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all duration-300">
                Buy Now
              </button>
              <button className="w-full sm:w-auto px-8 py-3 rounded-full text-sm font-semibold border border-gray-900 dark:border-gray-300 text-gray-900 dark:text-gray-100 hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 shadow-md hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all duration-300">
                Add to Cart
              </button>
            </section>

            {/* Reviews */}
            <div className="rounded-2xl bg-white/50 dark:bg-gray-900/40 backdrop-blur-xl border border-white/40 dark:border-gray-700 shadow-lg p-4 sm:p-5">
              <ReviewsSection productId={product.id} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
