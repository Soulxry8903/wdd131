const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
  {
    templeName: "Salt Lake",
    location: "Salt Lake City, Utah, United States",
    dedicated: "1893, April, 6",
    area: 253015,
    imageUrl: "https://www.abc4.com/wp-content/uploads/sites/4/2025/02/9a2e40c14e7e67b6fa107f581f91ccb40ba0b119.jpeg?strip=1"
  },
  {
    templeName: "Santo Domingo Dominican Republic",
    location: "Santo Domingo, Dominican Republic",
    dedicated: "2000, September, 17",
    area: 67000,
    imageUrl: "./images/santo-domingo-temple.jpg"
  },
  {
    templeName: "Rome Italy",
    location: "Rome, Italy",
    dedicated: "2019, March, 10",
    area: 41010,
    imageUrl: "https://www.churchofjesuschrist.org/imgs/4e47429c6ce95afa09578b5a4f791b4a09160a6d/full/800%2C/0/default"
  }
];

const gallery = document.querySelector(".temple-gallery");
const galleryTitle = document.querySelector("#gallery-title");
const filterLinks = document.querySelectorAll("nav [data-filter]");
const menuToggle = document.querySelector(".menu-toggle");
const templeNav = document.querySelector("#temple-nav");

menuToggle.addEventListener("click", () => {
  const isOpen = templeNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
  menuToggle.textContent = isOpen ? "×" : "☰";
});

function displayTemples(items) {
  gallery.replaceChildren();
  items.forEach((temple) => {
    const card = document.createElement("article");
    card.className = "temple-card";
    const name = document.createElement("h2");
    name.textContent = temple.templeName;
    const location = document.createElement("p");
    location.innerHTML = `<span class="label">Location:</span> ${temple.location}`;
    const dedicated = document.createElement("p");
    dedicated.innerHTML = `<span class="label">Dedicated:</span> ${temple.dedicated}`;
    const area = document.createElement("p");
    area.innerHTML = `<span class="label">Size:</span> ${temple.area} sq ft`;
    const image = document.createElement("img");
    image.src = temple.imageUrl;
    image.alt = temple.templeName;
    image.loading = "lazy";
    image.width = 400;
    image.height = 250;
    card.append(name, location, dedicated, area, image);
    gallery.append(card);
  });
}

const filters = {
  home: { title: "Home", test: () => true },
  old: { title: "Old Temples", test: (temple) => Number(temple.dedicated.slice(0, 4)) < 1900 },
  new: { title: "New Temples", test: (temple) => Number(temple.dedicated.slice(0, 4)) > 2000 },
  large: { title: "Large Temples", test: (temple) => temple.area > 90000 },
  small: { title: "Small Temples", test: (temple) => temple.area < 10000 }
};

filterLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const filter = filters[link.dataset.filter];
    galleryTitle.textContent = filter.title;
    displayTemples(temples.filter(filter.test));
    filterLinks.forEach((item) => item.removeAttribute("aria-current"));
    link.setAttribute("aria-current", "page");
    templeNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    menuToggle.textContent = "☰";
  });
});

document.querySelector("#currentyear").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = `Last Modification: ${document.lastModified}`;
displayTemples(temples);
