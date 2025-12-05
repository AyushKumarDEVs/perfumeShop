// src/components/ReviewsSection.jsx
import React, { useState } from "react";
import ReviewCard from "./ReviewCard";

export default function ReviewsSection({ productId }) {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: "Aarav Sharma",
      logoText: "AS",
      review:
        "Beautiful fragrance! Lasts long and feels very premium. I get compliments every time I wear it.",
    },
    {
      id: 2,
      name: "Riya Mehta",
      logoText: "RM",
      review:
        "Perfect for evening outings. Not too strong, not too light. The bottle design is also super elegant.",
    },
  ]);

  const [newName, setNewName] = useState("");
  const [newReview, setNewReview] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newName.trim() || !newReview.trim()) return;

    setReviews((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        name: newName,
        logoText: newName
          .split(" ")
          .map((w) => w[0]?.toUpperCase())
          .join("")
          .slice(0, 2),
        review: newReview,
      },
    ]);

    setNewName("");
    setNewReview("");
  };

  return (
    <section className="mt-8 space-y-6">
      <h2 className="text-xl font-semibold">Reviews</h2>

      {/* Review List */}
      <div className="space-y-4">
        {reviews.map((r) => (
          <ReviewCard
            key={r.id}
            name={r.name}
            logoText={r.logoText}
            review={r.review}
          />
        ))}
      </div>

      {/* Add Review Form */}
      <form
        onSubmit={handleSubmit}
        className="
          mt-4
          rounded-2xl
          border border-dashed border-gray-300 dark:border-gray-700
          p-4 sm:p-5
          bg-white/70 dark:bg-gray-900/70
          backdrop-blur-lg
          space-y-3
        "
      >
        <h3 className="text-sm font-medium mb-1">Add your review</h3>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Your name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="
              w-full sm:w-1/3
              px-3 py-2 rounded-lg
              border border-gray-300 dark:border-gray-700
              bg-transparent
              text-sm
              focus:outline-none focus:ring-2 focus:ring-pink-500
            "
          />
          <textarea
            placeholder="Share your experience..."
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            rows={3}
            className="
              w-full
              px-3 py-2 rounded-lg
              border border-gray-300 dark:border-gray-700
              bg-transparent
              text-sm
              focus:outline-none focus:ring-2 focus:ring-pink-500
            "
          />
        </div>

        <button
          type="submit"
          className="
            mt-1
            px-5 py-2
            rounded-full
            text-xs font-semibold
            bg-pink-600 text-white
            hover:bg-pink-700
            transition
          "
        >
          Submit Review
        </button>
      </form>
    </section>
  );
}
