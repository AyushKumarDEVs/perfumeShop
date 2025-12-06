// src/seed/sampleProducts.js

// Image Set 1
const set1 = [
  "https://res.cloudinary.com/dnhi9hug1/image/upload/v1765022448/perfume2_c8hae3.png",
  "https://res.cloudinary.com/dnhi9hug1/image/upload/v1765022449/perfume3_l5kmmq.png",
  "https://res.cloudinary.com/dnhi9hug1/image/upload/v1765022455/perfume4_kg2gqk.png"
];

// Image Set 2
const set2 = [
  "https://res.cloudinary.com/dnhi9hug1/image/upload/v1765022478/perfume11_zf6dd8.png",
  "https://res.cloudinary.com/dnhi9hug1/image/upload/v1765022496/perfume12_ggxrxm.png",
  "https://res.cloudinary.com/dnhi9hug1/image/upload/v1765022517/perfume13_obqm5o.png"
];

// Image Set 3
const set3 = [
  "https://res.cloudinary.com/dnhi9hug1/image/upload/v1765022510/perfume8_rc71il.png",
  "https://res.cloudinary.com/dnhi9hug1/image/upload/v1765022479/perfume9_cvn7w7.png",
  "https://res.cloudinary.com/dnhi9hug1/image/upload/v1765022482/perfume10_xcgrwy.png"
];

const imageSets = [set1, set2, set3];

// Unique 15 product records
const productData = [
  { name: "Velvet Bloom", price: 89, short: "Soft floral with jasmine & rose.", long: "Elegant mix of jasmine and rose with warm amber base for a graceful feminine scent." },
  { name: "Midnight Oud", price: 125, short: "Smoky luxurious oud.", long: "Deep oud layered with incense and vanilla for a bold nighttime aroma." },
  { name: "Citrus Rush", price: 78, short: "Fresh energetic citrus blast.", long: "Lemon, bergamot and grapefruit blend for an energetic daytime fragrance." },
  { name: "Royal Amber", price: 132, short: "Bold amber oriental scent.", long: "Amber, saffron and spices for a warm commanding fragrance." },
  { name: "Aqua Marine", price: 96, short: "Ocean breeze freshness.", long: "Sea salt, mint and driftwood for coastal freshness perfect for summer days." },
  { name: "Golden Musk", price: 110, short: "Warm musky signature scent.", long: "Musk, cedar and smoked vanilla for a soothing but bold finish." },
  { name: "Blush Rose", price: 84, short: "Romantic rose bouquet.", long: "Rose, peony and creamy musk for a sweet and youthful aroma." },
  { name: "Urban Leather", price: 138, short: "Sharp bold spicy leather.", long: "Tobacco, leather and bergamot for a confident masculine fragrance." },
  { name: "Garden Breeze", price: 74, short: "Fresh floral daytime scent.", long: "Lily, jasmine and fresh greens for a natural outdoor inspired fragrance." },
  { name: "Saffron Royale", price: 149, short: "Luxurious saffron blend.", long: "Saffron, almond and incense inspired by Middle-Eastern perfumery." },
  { name: "Icy Mint", price: 69, short: "Cooling mint burst.", long: "Wintermint, eucalyptus and frosted musk create a refreshing cold aroma." },
  { name: "Woodland Pine", price: 97, short: "Earthy forest vibe.", long: "Pine, cedar and oakmoss for a crisp mountain-inspired drydown." },
  { name: "Mango Bloom", price: 88, short: "Sweet tropical mango.", long: "Ripe mango, coconut milk and sugarcane for a fruity playful scent." },
  { name: "Vanilla Dusk", price: 118, short: "Sweet creamy vanilla.", long: "Caramel, vanilla and sandalwood for a warm evening fragrance." },
  { name: "Amber Noir", price: 142, short: "Dark mysterious amber.", long: "Amber, patchouli and smoky resin for a deep intense unisex profile." }
];

// Apply rotating image sets
const productArray = productData.map((p, i) => ({
  name: p.name,
  shortDescription: p.short,
  longDescription: p.long,
  price: p.price,
  imageUrlArray: imageSets[i % 3]
}));

const sampleProducts = productArray;
export default sampleProducts;
