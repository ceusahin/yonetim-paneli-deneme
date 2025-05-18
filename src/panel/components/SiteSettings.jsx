import React, { useState, useEffect } from "react";
import { getImageList } from "../../data/images";

const SITE_SETTINGS_KEY = "site-settings";
const DEFAULT_SETTINGS = {
  title: "Başlık Yok",
  logo: "",
};

function SiteSettings() {
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem(SITE_SETTINGS_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return DEFAULT_SETTINGS;
      }
    }
    return DEFAULT_SETTINGS;
  });
  const [showLogoPicker, setShowLogoPicker] = useState(false);

  useEffect(() => {
    localStorage.setItem(SITE_SETTINGS_KEY, JSON.stringify(settings));
  }, [settings]);

  const imageList = getImageList();

  return (
    <div className="max-w-xl mx-auto bg-white rounded-lg shadow p-8 mt-8">
      <h2 className="text-2xl font-bold mb-6">Site Ayarları</h2>
      <div className="mb-8">
        <label className="block font-semibold mb-2">Site Başlığı:</label>
        <input
          type="text"
          value={settings.title}
          onChange={(e) =>
            setSettings((s) => ({ ...s, title: e.target.value }))
          }
          className="border border-gray-300 rounded px-3 py-2 w-full"
        />
      </div>
      <div className="mb-8">
        <label className="block font-semibold mb-2">Logo Seç:</label>
        <div className="flex items-center gap-4">
          {settings.logo ? (
            <img
              src={settings.logo}
              alt="Logo"
              className="w-16 h-16 object-cover rounded border-2 border-blue-600"
            />
          ) : (
            <span className="text-gray-400">Henüz logo seçilmedi</span>
          )}
          <button
            className="bg-white border border-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-100 transition"
            onClick={() => setShowLogoPicker(true)}
          >
            Logoyu Değiştir
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded ml-2 disabled:opacity-50"
            onClick={() => setSettings((s) => ({ ...s, logo: "" }))}
            disabled={!settings.logo}
          >
            Logoyu Kaldır
          </button>
        </div>
      </div>
      {showLogoPicker && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
          onClick={() => setShowLogoPicker(false)}
        >
          <div
            className="bg-white p-8 rounded-lg shadow-lg min-w-[400px] max-w-[700px] max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold mb-4">Bir logo seçin</h3>
            <div className="flex flex-wrap gap-4 mb-4">
              {imageList.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt={`Logo ${idx + 1}`}
                  className={`w-20 h-20 object-cover rounded cursor-pointer border-2 transition ${
                    settings.logo === src
                      ? "border-blue-600"
                      : "border-gray-200"
                  }`}
                  onClick={() => {
                    setSettings((s) => ({ ...s, logo: src }));
                    setShowLogoPicker(false);
                  }}
                />
              ))}
            </div>
            <button
              className="mt-2 bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
              onClick={() => setShowLogoPicker(false)}
            >
              Vazgeç
            </button>
          </div>
        </div>
      )}
      <button
        className="mt-6 w-full bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        onClick={() => {
          localStorage.setItem(SITE_SETTINGS_KEY, JSON.stringify(settings));
          alert("Site ayarları kaydedildi!");
        }}
      >
        Kaydet
      </button>
    </div>
  );
}

export default SiteSettings;
