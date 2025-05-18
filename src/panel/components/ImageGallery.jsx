import React from "react";
import imageList from "../../data/images";

function ImageGallery() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Resim Galerisi</h2>
      <div className="flex flex-wrap gap-6">
        {imageList.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`Resim ${idx + 1}`}
            className="w-40 h-32 object-cover rounded-lg shadow border border-gray-200 bg-white"
          />
        ))}
      </div>
    </div>
  );
}

export default ImageGallery;
