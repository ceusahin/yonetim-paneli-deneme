import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";

const HEADER_KEY = "headerSettings";
const DEFAULT_HEADER = {
  navs: [
    { to: "/", label: "Ana Sayfa" },
    { to: "/about", label: "Hakkımızda" },
    { to: "/contact", label: "İletişim" },
  ],
};

function getHeaderNavs() {
  try {
    const data = JSON.parse(localStorage.getItem(HEADER_KEY));
    if (!data) return DEFAULT_HEADER.navs;
    return data.navs && data.navs.length > 0 ? data.navs : DEFAULT_HEADER.navs;
  } catch {
    return DEFAULT_HEADER.navs;
  }
}

function DummyPage({ path }) {
  try {
    const data = JSON.parse(localStorage.getItem("pageContents"));
    const page = data?.[path] || {
      title: "Yeni Sayfa",
      description: "",
      image: "",
      items: [],
    };
    return (
      <div>
        {page.image && (
          <img
            src={page.image}
            alt={page.title + " görseli"}
            className="w-full max-h-64 object-cover rounded mb-6"
          />
        )}
        <h1 className="text-2xl font-bold mb-4">{page.title}</h1>
        <p className="text-gray-700 mb-4">{page.description}</p>
        {page.items && page.items.length > 0 && (
          <div className="mb-4 space-y-4">
            {page.items.map((item, idx) => (
              <div key={idx}>
                {item.type === "text" && (
                  <p className="text-gray-800">{item.value}</p>
                )}
                {item.type === "list" && (
                  <ul className="list-disc ml-6 text-gray-700 text-sm">
                    {item.value.map((v, i) => (
                      <li key={i}>{v}</li>
                    ))}
                  </ul>
                )}
                {item.type === "image" && (
                  <img
                    src={item.value}
                    alt="Eklenen"
                    className="w-32 h-32 object-cover rounded border"
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  } catch {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-4">Yeni Sayfa</h1>
        <p className="text-gray-700">
          Bu, panelden eklediğin yeni bir sayfa. İçeriği özelleştirmek için
          paneli kullanabilirsin.
        </p>
      </div>
    );
  }
}

function SiteApp({ onSwitch }) {
  const navs = getHeaderNavs();
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <div className="absolute top-4 left-4 z-50">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition"
            onClick={onSwitch}
          >
            Panele Git
          </button>
        </div>
        <Header />
        <main className="max-w-6xl mx-auto p-6 mt-8 bg-white rounded shadow">
          <Routes>
            {navs.map((nav) => {
              if (nav.to === "/")
                return <Route key={nav.to} path={nav.to} element={<Home />} />;
              if (nav.to === "/about")
                return <Route key={nav.to} path={nav.to} element={<About />} />;
              if (nav.to === "/contact")
                return (
                  <Route key={nav.to} path={nav.to} element={<Contact />} />
                );
              return (
                <Route
                  key={nav.to}
                  path={nav.to}
                  element={<DummyPage path={nav.to} />}
                />
              );
            })}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default SiteApp;
