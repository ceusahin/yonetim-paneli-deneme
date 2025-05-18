import React, { useState } from "react";

function Sidebar({
  siteSelected,
  onSiteSelect,
  navs,
  selectedPage,
  onPageSelect,
  onNavbarSelect,
  navbarSelected,
  storageSelected,
  onStorageSelect,
}) {
  const [newPageName, setNewPageName] = useState("");
  const [newPagePath, setNewPagePath] = useState("");

  const handleAddPage = () => {
    if (!newPageName.trim() || !newPagePath.trim()) return;
    // headerSettings güncelle
    const header = JSON.parse(localStorage.getItem("headerSettings")) || {
      navs: [],
    };
    header.navs = [...header.navs, { to: newPagePath, label: newPageName }];
    localStorage.setItem("headerSettings", JSON.stringify(header));
    // pageContents güncelle
    const pages = JSON.parse(localStorage.getItem("pageContents")) || {};
    pages[newPagePath] = { title: newPageName, description: "", image: "" };
    localStorage.setItem("pageContents", JSON.stringify(pages));
    setNewPageName("");
    setNewPagePath("");
    window.location.reload(); // Paneli yenile, navs güncellensin
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <div>
        <div className="text-xs uppercase tracking-wider text-gray-400 px-6 mb-2 mt-4">
          Site Ayarları
        </div>
        <button
          onClick={onSiteSelect}
          className={`w-full flex justify-start px-6 py-2 rounded transition-colors text-left mb-1 ${
            siteSelected ? "bg-zinc-700" : "hover:bg-zinc-800"
          }`}
        >
          Site Ayarları
        </button>
        <button
          onClick={onNavbarSelect}
          className={`w-full flex justify-start px-6 py-2 rounded transition-colors text-left mb-1 ${
            navbarSelected ? "bg-zinc-700" : "hover:bg-zinc-800"
          }`}
        >
          Navbar Ayarları
        </button>
      </div>
      <div>
        <div className="text-xs uppercase tracking-wider text-gray-400 px-6 mb-2 mt-4">
          Sayfa Ayarları
        </div>
        {navs.map((nav) => (
          <button
            key={nav.to}
            onClick={() => onPageSelect(nav.to)}
            className={`w-full flex justify-start px-6 py-2 rounded transition-colors text-left mb-1 ${
              selectedPage === nav.to ? "bg-zinc-700" : "hover:bg-zinc-800"
            }`}
          >
            {nav.label}
          </button>
        ))}
      </div>
      <div>
        <div className="text-xs uppercase tracking-wider text-gray-400 px-6 mb-2 mt-4">
          Depolama
        </div>
        <button
          onClick={onStorageSelect}
          className={`w-full flex justify-start px-6 py-2 rounded transition-colors text-left mb-1 ${
            storageSelected ? "bg-zinc-700" : "hover:bg-zinc-800"
          }`}
        >
          Resim Yöneticisi
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
