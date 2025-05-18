import React from "react";
import { Link, useLocation } from "react-router-dom";

const HEADER_KEY = "headerSettings";
const DEFAULT_HEADER = {
  logo: "",
  navs: [
    { to: "/", label: "Ana Sayfa", title: "Ana Sayfa" },
    { to: "/about", label: "Hakkımızda", title: "Hakkımızda" },
    { to: "/contact", label: "İletişim", title: "İletişim" },
  ],
};

const SITE_SETTINGS_KEY = "site-settings";

function getHeaderSettings() {
  try {
    const data = JSON.parse(localStorage.getItem(HEADER_KEY));
    if (!data) return DEFAULT_HEADER;
    return {
      logo: data.logo || "",
      navs: data.navs && data.navs.length > 0 ? data.navs : DEFAULT_HEADER.navs,
    };
  } catch {
    return DEFAULT_HEADER;
  }
}

function getSiteSettings() {
  try {
    const data = JSON.parse(localStorage.getItem(SITE_SETTINGS_KEY));
    if (!data) return { title: "Başlık Yok", logo: "" };
    return {
      title: data.title || "Başlık Yok",
      logo: data.logo || "",
    };
  } catch {
    return { title: "Başlık Yok", logo: "" };
  }
}

function Header() {
  const location = useLocation();
  const { logo: navLogo, navs } = getHeaderSettings();
  const { title, logo: siteLogo } = getSiteSettings();
  const logo = siteLogo || navLogo;
  return (
    <header className="bg-white shadow flex items-center px-8 py-4 justify-between">
      {/* Sol: Menü */}
      <nav className="flex gap-4 flex-1 justify-center">
        {navs.map((nav) => (
          <Link
            key={nav.to}
            to={nav.to}
            className={`px-3 py-1 rounded font-medium transition-colors ${
              location.pathname === nav.to
                ? "bg-blue-600 text-white"
                : "text-gray-700 hover:bg-gray-200"
            }`}
          >
            {nav.label}
          </Link>
        ))}
      </nav>
      {/* Orta: Logo ve Site Başlığı */}
      <span className="flex items-center gap-2 min-w-[120px] text-2xl font-bold justify-center">
        {logo ? (
          <img
            src={logo}
            alt="Logo"
            className="w-10 h-10 object-cover rounded"
          />
        ) : (
          <span role="img" aria-label="logo">
            🌟
          </span>
        )}
        <span className="text-xl font-semibold text-gray-700">{title}</span>
      </span>
      {/* Sağ: Boş alan */}
      <span className="min-w-[120px]" />
    </header>
  );
}

export default Header;
