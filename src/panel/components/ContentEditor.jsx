import React, { useState, useEffect } from "react";
import ImageManager from "./ImageManager";
import imageList from "../../data/images";

const initialData = {
  homepage: {
    title: "Hoşgeldiniz!",
    image: "",
    description: "Burası anasayfa açıklaması.",
  },
  about: {
    title: "Hakkımızda",
    image: "",
    description: "Şirketimiz hakkında bilgi.",
  },
  contact: {
    title: "İletişim",
    image: "",
    description: "Bize ulaşın.",
  },
};

const STORAGE_KEY = "contentEditorData";

function ContentEditor({ contextKey }) {
  const getInitialState = () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return initialData;
      }
    }
    return initialData;
  };

  const [data, setData] = useState(getInitialState);
  const [showImagePicker, setShowImagePicker] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const handleChange = (field, value) => {
    setData((prev) => ({
      ...prev,
      [contextKey]: {
        ...prev[contextKey],
        [field]: value,
      },
    }));
  };

  const contextData = data[contextKey];

  return (
    <div className="max-w-xl mx-auto bg-white rounded-lg shadow p-8 mt-8">
      <h2 className="text-2xl font-bold text-center mb-8">
        {contextData.title}
      </h2>
      <div className="mb-6">
        <label className="block font-semibold mb-1">Başlık:</label>
        <input
          type="text"
          value={contextData.title}
          onChange={(e) => handleChange("title", e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div className="mb-6">
        <label className="block font-semibold mb-1">Açıklama:</label>
        <textarea
          value={contextData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 min-h-[80px] focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div className="mb-6">
        <label className="block font-semibold mb-1">Seçili Görsel:</label>
        <div className="flex items-center gap-4 mt-2">
          {contextData.image ? (
            <img
              src={contextData.image}
              alt="Seçili Görsel"
              className="w-20 h-20 object-cover rounded border-2 border-blue-600"
            />
          ) : (
            <span className="text-gray-400">Henüz görsel seçilmedi</span>
          )}
          <button
            className="bg-white border border-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-100 transition"
            onClick={() => setShowImagePicker(true)}
          >
            Resmi Değiştir
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded ml-2 disabled:opacity-50"
            onClick={() => handleChange("image", "")}
            disabled={!contextData.image}
          >
            Resmi Kaldır
          </button>
        </div>
      </div>
      {showImagePicker && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
          onClick={() => setShowImagePicker(false)}
        >
          <div
            className="bg-white p-8 rounded-lg shadow-lg min-w-[400px] max-w-[700px] max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold mb-4">Bir görsel seçin</h3>
            <div className="flex flex-wrap gap-4 mb-4">
              {imageList.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt={`Seçenek ${idx + 1}`}
                  className={`w-20 h-20 object-cover rounded cursor-pointer border-2 transition ${
                    contextData.image === src
                      ? "border-blue-600"
                      : "border-gray-200"
                  }`}
                  onClick={() => {
                    handleChange("image", src);
                    setShowImagePicker(false);
                  }}
                />
              ))}
            </div>
            <button
              className="mt-2 bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
              onClick={() => setShowImagePicker(false)}
            >
              Vazgeç
            </button>
          </div>
        </div>
      )}
      <button
        className="mt-6 w-full bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        onClick={() => alert("Kaydedildi (örnek)!")}
      >
        Kaydet
      </button>
    </div>
  );
}

export default ContentEditor;
