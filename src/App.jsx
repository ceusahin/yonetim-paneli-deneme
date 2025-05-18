import React, { useState } from "react";
import Sidebar from "./panel/components/Sidebar";
import ContentEditor from "./panel/components/ContentEditor";
import ImageGallery from "./panel/components/ImageGallery";
import "./index.css";

const CONTEXTS = [
  { key: "homepage", label: "Anasayfa" },
  { key: "about", label: "Hakkımızda" },
  { key: "contact", label: "İletişim" },
  { key: "images", label: "Resimler" },
];

function App() {
  const [selectedContext, setSelectedContext] = useState(CONTEXTS[0].key);

  return (
    <div className="flex min-h-screen bg-zinc-900">
      <Sidebar
        contexts={CONTEXTS}
        selected={selectedContext}
        onSelect={setSelectedContext}
      />
      <main className="flex-1 p-10 bg-gray-100 min-h-screen">
        {selectedContext === "images" ? (
          <ImageGallery />
        ) : (
          <ContentEditor contextKey={selectedContext} />
        )}
      </main>
    </div>
  );
}

export default App;
