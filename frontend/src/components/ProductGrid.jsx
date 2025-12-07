import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductCard from "./ProductCard";
import CallToActionBanner from "./CallToActionBanner";

export default function ProductGrid() {
  const { category } = useParams(); // "/" => undefined, "/latest" => "latest"
  const islatest = Boolean(category); // any non-empty category → latest
  // if you want only /latest as latest, use: const islatest = category === "latest";

  const [listData, setListData] = useState(null); // { title, products }
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    
    async function loadProducts() {
      try {
        setLoading(true);
        setError("");
       

        const endpoint = islatest
          ? `${"/api"}/product-lists/latest`
          : `${"/api"}/product-lists/featured`;

        const res = await axios.get(endpoint);
        setListData(res.data);
      } catch (err) {
        console.error("Failed to load products:", err);
        setError("Unable to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, [islatest]);

  const heading =
    listData?.title || (islatest ? "latest Products" : "Featured Products");
 
  return (
    
    <section
      className="
        w-full px-4 py-10 h-full
        bg-gradient-to-br from-gray-100 via-white to-gray-200
        dark:from-gray-900 dark:via-gray-950 dark:to-black
      "
    >
      <div className="max-w-6xl mx-auto space-y-8">
        <h1
          className="
            text-3xl font-extrabold tracking-tight
            bg-gradient-to-r from-gray-900 to-gray-500
            dark:from-gray-200 dark:to-gray-500
            bg-clip-text text-transparent
          "
        >
          {heading}
        </h1>

        {error && !loading && (
          <p className="text-sm text-red-400 bg-red-950/40 border border-red-800 px-3 py-2 rounded-lg inline-block">
            {error}
          </p>
        )}

        <div
          className="
            grid gap-5
            grid-cols-2 sm:grid-cols-3 lg:grid-cols-4
            p-4
            rounded-2xl
            bg-white/60 dark:bg-gray-900/40
            backdrop-blur-xl
            shadow-[0_0_30px_-6px_rgba(0,0,0,0.35)]
            border border-white/50 dark:border-gray-700
            auto-rows-[1fr]
          "
        >
          {/* ⏳ Skeletons while loading */}
          {loading &&
            Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="w-full h-full flex items-stretch animate-pulse"
              >
                <div className="w-full h-72 rounded-2xl bg-gray-800/70" />
              </div>
            ))}

          {/* Render products once loaded */}
          {!loading &&
            listData?.products?.map((product) => (
              <div
                key={product._id}
                className="w-full h-full flex items-stretch"
              >
                <ProductCard
                  id={product._id}
                  name={product.name}
                  description={product.shortDescription}
                  price={`₹${product.price}`}
                  image={product.imageUrlArray?.[0]}
                  link={`/product/${product._id}`}
                />
              </div>
            ))}

          {/* If no products and no error */}
          {!loading &&
            !error &&
            (!listData?.products || listData.products.length === 0) && (
              <p className="col-span-full text-center text-gray-400 text-sm">
                No products found.
              </p>
            )}
        </div>
      </div>
    </section>
  );
}
