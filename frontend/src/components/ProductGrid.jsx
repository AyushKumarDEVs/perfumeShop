import ProductCard from "./ProductCard";

const products = [
  {
    id: 1,
    name: "Velvet Bloom",
    description: "Soft floral scent with jasmine & rose for daily wear.",
    price: "₹899",
    image: "/src/assets/products/perfume.png",
  },
  {
    id: 2,
    name: "Ocean Mist",
    description: "Fresh aquatic fragrance with a clean, crisp finish.",
    price: "₹1,199",
    image: "/src/assets/products/perfume.png",
  },
  {
    id: 3,
    name: "Amber Noir",
    description: "Warm and deep evening fragrance with amber & musk.",
    price: "₹1,499",
    image: "/src/assets/products/perfume.png",
  },
  {
    id: 4,
    name: "Citrus Splash",
    description: "Bright citrus notes perfect for summer days.",
    price: "₹799",
    image: "/src/assets/products/perfume.png",
  },
   {
    id: 3,
    name: "Amber Noir",
    description: "Warm and deep evening fragrance with amber & musk.",
    price: "₹1,499",
    image: "/src/assets/products/perfume.png",
  },
  {
    id: 4,
    name: "Citrus Splash",
    description: "Bright citrus notes perfect for summer days.",
    price: "₹799",
    image: "/src/assets/products/perfume.png",
  }, {
    id: 3,
    name: "Amber Noir",
    description: "Warm and deep evening fragrance with amber & musk.",
    price: "₹1,499",
    image: "/src/assets/products/perfume.png",
  },
  {
    id: 4,
    name: "Citrus Splash",
    description: "Bright citrus notes perfect for summer days.",
    price: "₹799",
    image: "/src/assets/products/perfume.png",
  },
];

export default function ProductGrid() {
  return (
    <section
      className="
        w-full px-4 py-10  h-full
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
          Featured Products
        </h1>

        {/* ⭐ PERFECT GRID ALIGNMENT FIXED ⭐ */}
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
          {products.map((product) => (
            /* wrapper forces equal height */
            <div key={product.id} className="w-full h-full flex items-stretch">
              <ProductCard
                id={product.id}
                name={product.name}
                description={product.description}
                price={product.price}
                image={product.image}
                link={`/product/${product.id}`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
