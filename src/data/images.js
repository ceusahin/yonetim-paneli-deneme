// imageList'i localStorage ile senkronize et
function getImageList() {
  const saved = localStorage.getItem("imageList");
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      // Hatalıysa default listeye dön
    }
  }
  return [
    "/images/about-image.png",
    "/images/emre-sahiner.jpeg",
    "/images/member-1.jpg",
    "/images/member-2.jpg",
    "/images/member-3.jpg",
    "/images/member-4.jpg",
    "/images/member-5.jpg",
    "/images/member-6.jpg",
    "/images/team-1.jpg",
    "/images/team-2.jpg",
    "/images/team-3.jpg",
    "/images/team-4.jpg",
    "/images/team-hero.jpg",
    "/images/contact-family.png",
    "/images/description.jpg",
    "/images/category-camping.png",
    "/images/category-makeup.jpg",
    "/images/category-laptop.jpg",
    "/images/category-phone.jpg",
    "/images/featured-1.jpg",
    "/images/featured-2.jpg",
    "/images/featured-3.jpg",
    "/images/advert-bottom.png",
    "/images/green-bg-man.png",
    "/images/bg-green.png",
    "/images/best-1.jpg",
    "/images/best-2.jpg",
    "/images/best-3.jpg",
    "/images/best-4.jpg",
    "/images/best-5.jpg",
    "/images/best-6.jpg",
    "/images/best-8.jpg",
    "/images/editor-picks-kids.jpg",
    "/images/editor-picks-accessories.jpg",
    "/images/editor-picks-women.jpg",
    "/images/editor-picks-men.jpg",
    "/images/hero1.jpg",
    "/images/member-hero.jpg",
  ];
}

function setImageList(list) {
  localStorage.setItem("imageList", JSON.stringify(list));
}

export { getImageList, setImageList };
