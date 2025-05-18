import React, { useRef, useState, useEffect } from "react";
import { getImageList, setImageList } from "../../data/images";

function ImageManager() {
  const fileInputRef = useRef();
  const [preview, setPreview] = useState(null);
  const [images, setImages] = useState(getImageList());
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const sync = () => setImages(getImageList());
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setPreview(ev.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = () => {
    if (preview) {
      const updated = [preview, ...getImageList()];
      setImageList(updated);
      setImages(updated);
      setPreview(null);
      fileInputRef.current.value = null;
    }
  };

  const handleDelete = (img) => {
    const updated = getImageList().filter((i) => i !== img);
    setImageList(updated);
    setImages(updated);
    if (selectedImage === img) setSelectedImage(null);
  };

  return (
    <div style={{ marginBottom: 24 }}>
      <h3>Resim Yükle</h3>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      {preview && (
        <div style={{ marginTop: 8 }}>
          <img
            src={preview}
            alt="Önizleme"
            style={{ maxWidth: 120, borderRadius: 6 }}
          />
          <div>
            <button onClick={handleUpload} style={{ marginTop: 8 }}>
              Yükle
            </button>
          </div>
        </div>
      )}
      <h4 style={{ marginTop: 24 }}>Yüklenen Resimler</h4>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        {images.length === 0 && <span>Henüz resim yok.</span>}
        {images.map((img, idx) => (
          <div key={idx} style={{ position: "relative" }}>
            <img
              src={img}
              alt={`Yüklenen ${idx}`}
              style={{
                width: 60,
                height: 60,
                objectFit: "cover",
                border:
                  selectedImage === img
                    ? "2px solid #1976d2"
                    : "2px solid #eee",
                borderRadius: 6,
                cursor: "pointer",
              }}
              onClick={() => setSelectedImage(img)}
            />
            <button
              onClick={() => handleDelete(img)}
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                background: "#fff",
                border: "none",
                color: "#e53e3e",
                borderRadius: "50%",
                width: 22,
                height: 22,
                cursor: "pointer",
                fontWeight: "bold",
              }}
              title="Sil"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageManager;
