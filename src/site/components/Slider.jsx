import React, { useState } from "react";

function Slider({ images = [] }) {
  const [current, setCurrent] = useState(0);
  if (!images.length) return null;

  const prev = () => setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));

  return (
    <div className="relative w-full max-w-6xl mx-auto mb-6 h-[600px]">
      <div className="overflow-hidden rounded-lg shadow border h-[600px] flex items-center justify-center bg-gray-100">
        <img
          src={images[current]}
          alt={`Slider ${current + 1}`}
          className="object-cover w-full h-[600px] transition-all duration-300"
        />
      </div>
      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 rounded-full w-10 h-10 flex items-center justify-center shadow text-2xl"
            aria-label="Önceki"
          >
            ‹
          </button>
          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 rounded-full w-10 h-10 flex items-center justify-center shadow text-2xl"
            aria-label="Sonraki"
          >
            ›
          </button>
        </>
      )}
      <div className="flex justify-center gap-2 mt-2">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full ${
              idx === current ? "bg-blue-600" : "bg-gray-300"
            }`}
            aria-label={`Slider ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default Slider;
