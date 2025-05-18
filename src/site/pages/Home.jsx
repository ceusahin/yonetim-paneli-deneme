import React from "react";
import Slider from "../components/Slider";

function getPageData() {
  try {
    const data = JSON.parse(localStorage.getItem("pageContents"));
    return (
      data?.["/"] || {
        title: "Ana Sayfa",
        description: "",
        image: "",
        items: [],
        sliderImages: [],
      }
    );
  } catch {
    return {
      title: "Ana Sayfa",
      description: "",
      image: "",
      items: [],
      sliderImages: [],
    };
  }
}

function Home() {
  const {
    title,
    description,
    image,
    items = [],
    sliderImages = [],
  } = getPageData();
  return (
    <div>
      <div className="w-full h-[600px] mb-6 bg-gray-100 overflow-hidden">
        {sliderImages && sliderImages.length > 0 ? (
          <div className="w-full h-full">
            <Slider images={sliderImages} />
          </div>
        ) : (
          <div className="w-full max-w-2xl h-64 flex items-center justify-center bg-gray-100 rounded shadow border mx-auto text-gray-400">
            Slider'a görsel ekleyin
          </div>
        )}
      </div>
      {image && (
        <div className="flex justify-center mb-6">
          <img
            src={image}
            alt="Anasayfa görseli"
            className="w-full max-w-6xl h-[600px] object-fill rounded shadow"
          />
        </div>
      )}
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      <p className="text-gray-700 mb-8">{description}</p>
      {items.length > 0 && (
        <div className="mb-4 space-y-4">
          {items.map((item, idx) => (
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
              {item.type === "image" && item.value !== image && (
                <div
                  className={
                    item.size === "large"
                      ? "flex justify-center items-center w-full"
                      : item.size === "medium"
                      ? "flex justify-center"
                      : ""
                  }
                >
                  <img
                    src={item.value}
                    alt="Eklenen"
                    className={
                      item.size === "small"
                        ? "w-12 h-12 object-cover rounded shadow border"
                        : item.size === "large"
                        ? "w-full max-w-6xl h-[600px] object-cover rounded shadow mx-auto"
                        : "w-32 h-32 object-cover rounded shadow mx-auto"
                    }
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
