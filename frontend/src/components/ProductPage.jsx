// src/pages/ProductPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ImageGallery from "../components/ImageGallery";
import ReviewsSection from "../components/ReviewsSection";

const FIXED_SIZES = ["50ml", "100ml", "150ml"]; // ✅ constant size options

export default function ProductPage() {
  const { id } = useParams(); // product id from URL like /product/:id
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        // match your backend route
        const res = await axios.get(`https://perfume-shop-five.vercel.app/product/${id}`);

        // your API: { product: {...} }
        const productFromApi = res.data?.product || res.data;

        if (!productFromApi) {
          throw new Error("Failed to fetch product");
        }

        setProduct(productFromApi);
      } catch (err) {
        console.error(err);
        setError(
          err.response?.data?.message || err.message || "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  const productIdForReviews = product?._id || product?.id || id;

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 dark:from-gray-900 dark:via-gray-950 dark:to-black text-gray-900 dark:text-gray-50 pb-20">
      <div className="max-w-6xl mx-auto px-4 pt-10">
        {/* Main layout container */}
        <div className="flex flex-col lg:flex-row gap-14">
          {/* LEFT: Image / Skeleton */}
          <div className="lg:w-5/12 lg:max-w-md lg:sticky lg:top-24 self-start">
            <div className="rounded-2xl border border-white/50 dark:border-gray-700 shadow-[0_0_30px_-5px_rgba(0,0,0,0.25)] backdrop-blur-xl">
              {loading ? (
                <div className="aspect-square w-full rounded-2xl bg-gray-200 dark:bg-gray-800 animate-pulse" />
              ) : error || !product ? (
                <div className="p-6 text-center text-sm text-red-500">
                  {error || "Product not found"}
                </div>
              ) : (
                <ImageGallery
                  images={product.imageUrlArray || []}
                  productName={product.name}
                />
              )}
            </div>
          </div>

          {/* RIGHT: Content / Skeleton */}
          <div className="lg:w-7/12 space-y-10">
            {loading ? (
              <>
                {/* Skeleton for content */}
                <section className="space-y-6 rounded-2xl p-6 bg-white/60 dark:bg-gray-900/50 backdrop-blur-xl border border-white/40 dark:border-gray-700 shadow-md animate-pulse">
                  <div className="space-y-3">
                    <div className="h-7 w-3/4 rounded-full bg-gray-200 dark:bg-gray-800" />
                    <div className="h-6 w-1/3 rounded-full bg-gray-200 dark:bg-gray-800" />
                  </div>

                  <div className="space-y-2">
                    <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-800" />
                    <div className="h-4 w-11/12 rounded bg-gray-200 dark:bg-gray-800" />
                    <div className="h-4 w-10/12 rounded bg-gray-200 dark:bg-gray-800" />
                  </div>
                </section>

                <section className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                  <div className="h-11 w-full sm:w-40 rounded-full bg-gray-200 dark:bg-gray-800 animate-pulse" />
                  <div className="h-11 w-full sm:w-40 rounded-full bg-gray-200 dark:bg-gray-800 animate-pulse" />
                </section>

                <div className="rounded-2xl bg-white/50 dark:bg-gray-900/40 backdrop-blur-xl border border-white/40 dark:border-gray-700 shadow-lg p-4 sm:p-5">
                  <div className="h-5 w-32 rounded bg-gray-200 dark:bg-gray-800 mb-3 animate-pulse" />
                  <div className="space-y-2">
                    <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-800 animate-pulse" />
                    <div className="h-4 w-5/6 rounded bg-gray-200 dark:bg-gray-800 animate-pulse" />
                  </div>
                </div>
              </>
            ) : error || !product ? (
              // Error UI
              <section className="space-y-4 rounded-2xl p-6 bg-red-50/80 dark:bg-red-900/30 border border-red-200 dark:border-red-700 shadow-md">
                <h1 className="text-xl font-semibold text-red-700 dark:text-red-300">
                  Oops! Something went wrong
                </h1>
                <p className="text-sm text-red-600 dark:text-red-200">
                  {error || "We couldn't find the product you're looking for."}
                </p>
              </section>
            ) : (
              <>
                {/* Name + Price + Sizes + Descriptions */}
                <section className="space-y-6 rounded-2xl p-6 bg-white/60 dark:bg-gray-900/50 backdrop-blur-xl border border-white/40 dark:border-gray-700 shadow-md">
                  {/* Name & Price row */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-gray-800 to-gray-500 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
                      {product.name}
                    </h1>
                    <span className="text-2xl font-semibold text-pink-600 dark:text-pink-400 drop-shadow-sm">
                      ₹{product.price}
                    </span>
                  </div>

                  {/* Fixed Size Block */}
                  <div className="flex flex-wrap items-center gap-2 text-sm">
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      Available sizes:
                    </span>
                    {FIXED_SIZES.map((size) => (
                      <span
                        key={size}
                        className="px-3 py-1 rounded-full border border-gray-300 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 shadow-sm text-xs cursor-pointer hover:scale-105 transition"
                      >
                        {size}
                      </span>
                    ))}
                  </div>

                  {/* Short description */}
                  {product.shortDescription && (
                    <p className="text-sm sm:text-base leading-relaxed text-gray-800 dark:text-gray-200 font-medium">
                      {product.shortDescription}
                    </p>
                  )}

                  {/* Long description */}
                  {product.longDescription && (
                    <p className="text-sm sm:text-base leading-relaxed text-gray-700 dark:text-gray-300">
                      {product.longDescription}
                    </p>
                  )}
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
                  <ReviewsSection productId={productIdForReviews} />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
