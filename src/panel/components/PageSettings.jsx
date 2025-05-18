import React, { useState, useEffect } from "react";
import { getImageList } from "../../data/images";

const STORAGE_KEY = "pageContents";

function getInitialContents() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return {};
    }
  }
  return {};
}

function PageSettings({ pageKey }) {
  // Varsayılan değerler
  const defaultPage = { title: "", description: "", image: "", items: [] };
  // pageData state'i
  const [pageData, setPageData] = useState(() => {
    const all = getInitialContents();
    return all[pageKey] && typeof all[pageKey] === "object"
      ? { ...defaultPage, ...all[pageKey] }
      : { ...defaultPage };
  });
  const [newText, setNewText] = useState("");
  const [newList, setNewList] = useState("");
  const [showAddImage, setShowAddImage] = useState(false);
  const [showSelectMainImage, setShowSelectMainImage] = useState(false);
  const [imageList] = useState(getImageList());

  // pageKey değişirse localStorage'dan oku
  useEffect(() => {
    const all = getInitialContents();
    setPageData(
      all[pageKey] && typeof all[pageKey] === "object"
        ? { ...defaultPage, ...all[pageKey] }
        : { ...defaultPage }
    );
    setNewText("");
    setNewList("");
    setShowAddImage(false);
    setShowSelectMainImage(false);
    // eslint-disable-next-line
  }, [pageKey]);

  // pageData değişirse localStorage'a yaz
  useEffect(() => {
    const all = getInitialContents();
    all[pageKey] = pageData;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
    // eslint-disable-next-line
  }, [pageData, pageKey]);

  // İçeriklere görsel ekleme fonksiyonu
  const handleAddImage = (src) => {
    if (src === pageData.image) {
      alert(
        "Bu görsel zaten seçili ana görsel olarak kullanılıyor. Lütfen farklı bir görsel seçin."
      );
      return;
    }
    setPageData((prev) => ({
      ...prev,
      items: [
        ...(prev.items || []),
        { type: "image", value: src, size: "medium" },
      ],
    }));
    setShowAddImage(false);
  };

  // Ekleme fonksiyonları
  const handleAddText = () => {
    if (!newText.trim()) return;
    setPageData((prev) => ({
      ...prev,
      items: [...(prev.items || []), { type: "text", value: newText }],
    }));
    setNewText("");
  };
  const handleAddList = () => {
    if (!newList.trim()) return;
    const arr = newList
      .split(",")
      .map((i) => i.trim())
      .filter(Boolean);
    if (!arr.length) return;
    setPageData((prev) => ({
      ...prev,
      items: [...(prev.items || []), { type: "list", value: arr }],
    }));
    setNewList("");
  };
  // Sil, yukarı/aşağı taşı
  const handleRemove = (idx) => {
    setPageData((prev) => ({
      ...prev,
      items: (prev.items || []).filter((_, i) => i !== idx),
    }));
  };
  const handleMoveUp = (idx) => {
    if (idx === 0) return;
    setPageData((prev) => {
      const arr = [...(prev.items || [])];
      [arr[idx - 1], arr[idx]] = [arr[idx], arr[idx - 1]];
      return { ...prev, items: arr };
    });
  };
  const handleMoveDown = (idx) => {
    if (!pageData.items || idx === pageData.items.length - 1) return;
    setPageData((prev) => {
      const arr = [...(prev.items || [])];
      [arr[idx], arr[idx + 1]] = [arr[idx + 1], arr[idx]];
      return { ...prev, items: arr };
    });
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-lg shadow p-8 mt-8">
      <h2 className="text-2xl font-bold text-center mb-8">Sayfa Ayarları</h2>
      <div className="mb-6">
        <label className="block font-semibold mb-1">Başlık:</label>
        <input
          type="text"
          value={pageData.title}
          onChange={(e) =>
            setPageData((prev) => ({ ...prev, title: e.target.value }))
          }
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div className="mb-6">
        <label className="block font-semibold mb-1">Açıklama:</label>
        <textarea
          value={pageData.description}
          onChange={(e) =>
            setPageData((prev) => ({ ...prev, description: e.target.value }))
          }
          className="w-full border border-gray-300 rounded px-3 py-2 min-h-[80px] focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div className="mb-6">
        <label className="block font-semibold mb-1">
          Seçili Görsel (Sayfanın En Üstünde Gözükecek):
        </label>
        <div className="flex items-center gap-4 mt-2">
          {pageData.image ? (
            <img
              src={pageData.image}
              alt="Seçili Görsel"
              className="w-20 h-20 object-cover rounded border-2 border-blue-600"
            />
          ) : (
            <span className="text-gray-400">Henüz görsel seçilmedi</span>
          )}
          <button
            className="bg-white border border-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-100 transition"
            onClick={() => setShowSelectMainImage(true)}
          >
            Resmi Değiştir
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded ml-2 disabled:opacity-50"
            onClick={() => setPageData((prev) => ({ ...prev, image: "" }))}
            disabled={!pageData.image}
          >
            Resmi Kaldır
          </button>
        </div>
        {showSelectMainImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
            onClick={() => setShowSelectMainImage(false)}
          >
            <div
              className="bg-white p-8 rounded-lg shadow-lg min-w-[400px] max-w-[700px] max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-bold mb-4">
                Bir görsel seçin ve ana görsel olarak ata
              </h3>
              <div className="flex flex-wrap gap-4 mb-4">
                {imageList.map((src, idx) => (
                  <img
                    key={idx}
                    src={src}
                    alt={`Seçenek ${idx + 1}`}
                    className="w-20 h-20 object-cover rounded cursor-pointer border-2 transition border-gray-200 hover:border-blue-600"
                    onClick={() => {
                      setPageData((prev) => ({ ...prev, image: src }));
                      setShowSelectMainImage(false);
                    }}
                  />
                ))}
              </div>
              <button
                className="mt-2 bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
                onClick={() => setShowSelectMainImage(false)}
              >
                Vazgeç
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="mb-6">
        <label className="block font-semibold mb-1">Liste Ekle:</label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={newList}
            onChange={(e) => setNewList(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 flex-1"
            placeholder="Virgülle ayır: madde1, madde2"
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleAddList}
          >
            Ekle
          </button>
        </div>
      </div>
      <div className="mb-6">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mb-2"
          onClick={() => setShowAddImage(true)}
        >
          İçeriğe Resim Ekle
        </button>
        {showAddImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
            onClick={() => setShowAddImage(false)}
          >
            <div
              className="bg-white p-8 rounded-lg shadow-lg min-w-[400px] max-w-[700px] max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-bold mb-4">
                Bir görsel seçin ve içeriğe ekle
              </h3>
              <div className="flex flex-wrap gap-4 mb-4">
                {imageList.map((src, idx) => (
                  <img
                    key={idx}
                    src={src}
                    alt={`Seçenek ${idx + 1}`}
                    className="w-20 h-20 object-cover rounded cursor-pointer border-2 transition border-gray-200 hover:border-blue-600"
                    onClick={() => handleAddImage(src)}
                  />
                ))}
              </div>
              <button
                className="mt-2 bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
                onClick={() => setShowAddImage(false)}
              >
                Vazgeç
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="mb-6">
        <label className="block font-semibold mb-1">Metin Ekle:</label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 flex-1"
            placeholder="Metin"
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleAddText}
          >
            Ekle
          </button>
        </div>
      </div>
      <div className="mb-6">
        <label className="block font-semibold mb-1">Eklenen İçerikler:</label>
        {pageData.items.length === 0 && (
          <div className="text-gray-400">Henüz içerik eklenmedi.</div>
        )}
        <ul className="space-y-2">
          {pageData.items.map((item, idx) => (
            <li
              key={idx}
              className="flex items-center gap-2 bg-gray-50 rounded p-2"
            >
              <span className="flex-1">
                {item.type === "text" && <span>{item.value}</span>}
                {item.type === "list" && (
                  <ul className="list-disc ml-4 text-sm">
                    {item.value.map((v, i) => (
                      <li key={i}>{v}</li>
                    ))}
                  </ul>
                )}
                {item.type === "image" && (
                  <div className="flex items-center gap-3">
                    <img
                      src={item.value}
                      alt="Eklenen"
                      className="w-full max-w-6xl h-auto max-h-[600px] object-cover rounded shadow mx-auto"
                    />
                  </div>
                )}
              </span>
              <button
                className="text-xs px-2 py-1 bg-gray-200 rounded"
                onClick={() => handleMoveUp(idx)}
                disabled={idx === 0}
              >
                ↑
              </button>
              <button
                className="text-xs px-2 py-1 bg-gray-200 rounded"
                onClick={() => handleMoveDown(idx)}
                disabled={idx === pageData.items.length - 1}
              >
                ↓
              </button>
              <button
                className="text-xs px-2 py-1 bg-red-400 text-white rounded"
                onClick={() => handleRemove(idx)}
              >
                Sil
              </button>
            </li>
          ))}
        </ul>
      </div>
      <button
        className="mt-6 w-full bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        onClick={() => alert("Kaydedildi (örnek)!")}
      >
        Kaydet
      </button>
    </div>
  );
}

export default PageSettings;
