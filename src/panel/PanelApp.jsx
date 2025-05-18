import React from "react";
import Sidebar from "./components/Sidebar";
import SiteSettings from "./components/SiteSettings";
import PageSettings from "./components/PageSettings";
import HeaderSettings from "./components/HeaderSettings";
import ImageManager from "./components/ImageManager";

// Menüdeki sayfalar dinamik olacak, headerSettings'tan alınacak
const HEADER_KEY = "headerSettings";
const DEFAULT_NAVS = [
  { to: "/", label: "Ana Sayfa" },
  { to: "/about", label: "Hakkımızda" },
  { to: "/contact", label: "İletişim" },
];

function getNavs() {
  try {
    const data = JSON.parse(localStorage.getItem(HEADER_KEY));
    if (!data) return DEFAULT_NAVS;
    return data.navs && data.navs.length > 0 ? data.navs : DEFAULT_NAVS;
  } catch {
    return DEFAULT_NAVS;
  }
}

const SITE_SETTINGS_KEY = "site-settings";

function PanelApp({ onSwitch }) {
  const navs = getNavs();
  const [selected, setSelected] = React.useState("site"); // 'site', 'navbar', 'storage' veya sayfa to

  return (
    <div className="flex min-h-screen bg-zinc-900">
      <aside className="w-56 bg-zinc-900 text-white min-h-screen flex flex-col gap-3 items-start">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition mt-6 mb-2 ml-6"
          onClick={onSwitch}
        >
          Siteye Git
        </button>
        <Sidebar
          siteSelected={selected === "site"}
          onSiteSelect={() => setSelected("site")}
          navbarSelected={selected === "navbar"}
          onNavbarSelect={() => setSelected("navbar")}
          navs={navs}
          selectedPage={
            selected !== "site" &&
            selected !== "navbar" &&
            selected !== "storage"
              ? selected
              : null
          }
          onPageSelect={setSelected}
          storageSelected={selected === "storage"}
          onStorageSelect={() => setSelected("storage")}
        />
      </aside>
      <main className="flex-1 p-10 bg-gray-100 min-h-screen">
        {selected === "site" ? (
          <SiteSettings />
        ) : selected === "navbar" ? (
          <HeaderSettings />
        ) : selected === "storage" ? (
          <ImageManager />
        ) : (
          <PageSettings pageKey={selected} />
        )}
      </main>
    </div>
  );
}

export default PanelApp;
