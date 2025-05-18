import React, { useState, useEffect } from "react";

const HEADER_KEY = "headerSettings";
const DEFAULT_HEADER = {
  logo: "",
  navs: [
    { to: "/", label: "Ana Sayfa" },
    { to: "/about", label: "Hakkımızda" },
    { to: "/contact", label: "İletişim" },
  ],
};

function HeaderSettings() {
  const [header, setHeader] = useState(() => {
    const saved = localStorage.getItem(HEADER_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return DEFAULT_HEADER;
      }
    }
    return DEFAULT_HEADER;
  });
  const [newLabel, setNewLabel] = useState("");
  const [newPath, setNewPath] = useState("");

  useEffect(() => {
    localStorage.setItem(HEADER_KEY, JSON.stringify(header));
  }, [header]);

  const handleLabelChange = (idx, value) => {
    setHeader((prev) => {
      const navs = [...prev.navs];
      navs[idx].label = value;
      return { ...prev, navs };
    });
  };

  const handlePathChange = (idx, value) => {
    setHeader((prev) => {
      const navs = [...prev.navs];
      navs[idx].to = value;
      return { ...prev, navs };
    });
  };

  const handleAddNav = () => {
    if (!newLabel.trim() || !newPath.trim()) return;
    setHeader((prev) => ({
      ...prev,
      navs: [...prev.navs, { to: newPath, label: newLabel }],
    }));
    setNewLabel("");
    setNewPath("");
  };

  const handleRemoveNav = (idx) => {
    setHeader((prev) => ({
      ...prev,
      navs: prev.navs.filter((_, i) => i !== idx),
    }));
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-lg shadow p-8 mt-8">
      <h2 className="text-2xl font-bold mb-6">Navbar Ayarları</h2>
      <div className="mb-8">
        <label className="block font-semibold mb-2">Menü Seçenekleri:</label>
        {header.navs.map((nav, idx) => (
          <div key={idx} className="flex flex-col gap-1 mb-4 border-b pb-2">
            <div className="flex items-center gap-2 mb-1">
              <input
                type="text"
                value={nav.label}
                onChange={(e) => handleLabelChange(idx, e.target.value)}
                className="border border-gray-300 rounded px-2 py-1 flex-1"
                placeholder="Menü adı"
              />
              <input
                type="text"
                value={nav.to}
                onChange={(e) => handlePathChange(idx, e.target.value)}
                className="border border-gray-300 rounded px-2 py-1 flex-1"
                placeholder="/yol"
              />
              {header.navs.length > 1 && (
                <button
                  className="text-red-500 text-xs px-2 py-1 hover:underline"
                  onClick={() => handleRemoveNav(idx)}
                >
                  Sil
                </button>
              )}
            </div>
          </div>
        ))}
        <div className="flex gap-2 mt-4">
          <input
            type="text"
            placeholder="Yeni menü adı"
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 flex-1"
          />
          <input
            type="text"
            placeholder="/yeni-sayfa"
            value={newPath}
            onChange={(e) => setNewPath(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 flex-1"
          />
          <button
            className="bg-blue-600 text-white px-3 py-1 rounded"
            onClick={handleAddNav}
          >
            Ekle
          </button>
        </div>
      </div>
      <button
        className="mt-6 w-full bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        onClick={() => {
          localStorage.setItem(HEADER_KEY, JSON.stringify(header));
          alert("Navbar ayarları kaydedildi!");
        }}
      >
        Kaydet
      </button>
    </div>
  );
}

export default HeaderSettings;
