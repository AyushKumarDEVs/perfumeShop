// src/components/ReviewCard.jsx
import React, { useState } from "react";

export default function ReviewCard({ name, review, logoText = "VB" }) {
  const [likes, setLikes] = useState(12);
  const [dislikes, setDislikes] = useState(1);

  const handleLike = () => setLikes((prev) => prev + 1);
  const handleDislike = () => setDislikes((prev) => prev + 1);

  return (
    <article
      className="
        w-full
        rounded-2xl
        border border-gray-200 dark:border-gray-700
        bg-white/80 dark:bg-gray-900/80
        backdrop-blur-lg
        shadow-sm
        p-4 sm:p-5
        flex flex-col gap-3
      "
    >
      {/* Header: logo + name */}
      <div className="flex items-center gap-3">
        <div
          className="
            h-10 w-10 rounded-full
            flex items-center justify-center
            bg-gradient-to-br from-pink-500 to-purple-500
            text-white text-sm font-bold
            shadow-md
          "
        >
          {logoText}
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold">{name}</span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Verified buyer
          </span>
        </div>
      </div>

      {/* Review text */}
      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
        {review}
      </p>

      {/* Like / Dislike */}
      <div className="flex items-center gap-4 mt-1">
        <button
          onClick={handleLike}
          className="
            flex items-center gap-1 text-xs
            px-3 py-1 rounded-full
            border border-gray-200 dark:border-gray-600
            hover:bg-gray-900 hover:text-white
            dark:hover:bg-gray-100 dark:hover:text-gray-900
            transition
          "
        >
          <span>👍</span>
          <span>{likes}</span>
        </button>
        <button
          onClick={handleDislike}
          className="
            flex items-center gap-1 text-xs
            px-3 py-1 rounded-full
            border border-gray-200 dark:border-gray-600
            hover:bg-gray-900 hover:text-white
            dark:hover:bg-gray-100 dark:hover:text-gray-900
            transition
          "
        >
          <span>👎</span>
          <span>{dislikes}</span>
        </button>
      </div>
    </article>
  );
}
