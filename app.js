const BOOKS = [{
  id: 1,
  title: "خواجه تاجدار",
  author: "ژان گور",
  published_date: 2007,
  language: "persian",
  genre: "تاریخ",
  imgSrc: "1.jpg"
},
{
  id: 2,
  title: "ضیافت",
  author: "افلاطون",
  published_date: 385,
  language: "greek",
  genre: "فلسفه",
  imgSrc: "2.jpg"
},
{
  id: 3,
  title: "منطق الطیر",
  author: "عطار",
  published_date: 1177,
  language: "persian",
  genre: "شعر",
  imgSrc: "3.jpg"
},
{
  id: 4,
  title: "مثنوی معنوی",
  author: "مولوی",
  published_date: 1258,
  language: "persian",
  genre: "شعر",
  imgSrc: "4.jpg"
},
{
  id: 5,
  title: "دیوان حافظ",
  author: "حافظ",
  published_date: 1200,
  language: "persian",
  genre: "شعر",
  imgSrc: "5.jpg"
},
{
  id: 6,
  title: "رومیو و جولیت",
  author: "ویلیام شکسپیر",
  published_date: 1595,
  language: "english",
  genre: "عاشقانه",
  imgSrc: "6.jpg"
},
{
  id: 7,
  title: "ویس و رامین",
  author: "فخرالدین اسعد گرگانی",
  published_date: 1054,
  language: "persian",
  genre: "عاشقانه",
  imgSrc: "7.jpg"
},
{
  id: 8,
  title: "گلستان",
  author: "سعدی",
  published_date: 1258,
  language: "persian",
  genre: "شعر",
  imgSrc: "8.jpg"
},
{
  id: 9,
  title: "بوستان",
  author: "سعدی",
  published_date: 1257,
  language: "persian",
  genre: "شعر",
  imgSrc: "9.jpg"
},
{
  id: 10,
  title: "گلشن راز",
  author: "شیخ محمود شبستری",
  published_date: 1311,
  language: "persian",
  genre: "شعر",
  imgSrc: "10.jpg"
},
{
  id: 11,
  title: "لیلی و مجنون",
  author: "نظامی",
  published_date: 1188,
  language: "persian",
  genre: "عاشقانه",
  imgSrc: "11.jpg"
},
{
  id: 12,
  title: "شاهنامه",
  author: "فردوسی",
  published_date: 1010,
  language: "persian",
  genre: "شعر",
  imgSrc: "12.jpg"
},
{
  id: 13,
  title: "ایلیاد",
  author: "هومر",
  published_date: 762,
  language: "greek",
  genre: "شعر",
  imgSrc: "13.jpg"
},
{
  id: 14,
  title: "اودیسه",
  author: "هومر",
  published_date: 725,
  language: "greek",
  genre: "شعر",
  imgSrc: "14.jpg"
},
{
  id: 15,
  title: "هملت",
  author: "ویلیام شکسپیر",
  published_date: 1609,
  language: "greek",
  genre: "درام",
  imgSrc: "15.jpg"
},
{
  id: 16,
  title: "دن کیشوت",
  author: "میگل دسروانتس",
  published_date: 1605,
  language: "spanish",
  genre: "درام",
  imgSrc: "16.jpg"
}];

const root = document.getElementById("root");
const filtersContainer = document.getElementById("filter");
const cartUl = document.getElementById("cart");
const cartCountSpan = document.getElementById("cart-count");
const cartModal = document.getElementById("cart-modal");

const selectedFilters = {
  authors: [],
  languages: [],
  genres: [],
  years: [],
};

const localStorageCart = JSON.parse(localStorage.getItem("cart"));
const CART = localStorageCart || [];

function render(booksList) {
  if (booksList.length === 0) {
    root.innerHTML = `<p class="Texterrorfilters">کتابی با این فیلترها یافت نشد.</p>`;
    return;
  }

  const template = booksList.map(book => `
    <div class="card">
      <div class="image-wrapper">
        <img class="image" src="./assets/images/books/${book.imgSrc}" />
        <div class="overlay"></div>
        <div class="hover-info">
          <p>ژانر: ${book.genre}</p>
          <p>زبان: ${book.language}</p>
          <p>انتشار: ${book.published_date}</p>
        </div>
      </div>
      <h2 class="title">${book.title}</h2>
      <button onclick="handleShopBtn(${book.id})" class="btn-cards">
        ${CART.includes(book.id) ? " <b class='icon-cancelcard'>&times;</b> حذف از سبد" : "افزودن به سبد"}
      </button>
    </div>
  `).join("");
  root.innerHTML = template;
}

function renderCart() {
  const filteredBooks = BOOKS.filter(book => CART.includes(book.id));
  const temp = filteredBooks.map(item => `
    <li class="li-shoppingcards">
      <img  src="./assets/images/books/${item.imgSrc}" class="img-shoppingcards"/>
      <h3>${item.title}</h3>
      <button onclick="handleDeleteFromCart(${item.id})" class="btn-cancel-cardshapping"><b class='icon-cancelshoppingcard'>&times;</b></button>
    </li>
  `).join("");
  cartUl.innerHTML = temp;
}

function handleShopBtn(bookId) {
  if (!CART.includes(bookId)) {
    CART.push(bookId);
  } else {
    const index = CART.indexOf(bookId);
    CART.splice(index, 1);
  }
  localStorage.setItem("cart", JSON.stringify(CART));
  render(BOOKS);
  renderCart();
  updateCartCount();
}

function handleDeleteFromCart(bookId) {
  const index = CART.indexOf(bookId);
  if (index !== -1) {
    CART.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(CART));
    render(BOOKS);
    renderCart();
    updateCartCount();
  }
}

function handleCartClick() {
  renderCart();
  cartModal.classList.toggle("hidden");
}

function updateCartCount() {
  cartCountSpan.textContent = CART.length;
}

function renderFilters(booksList) {
  const authors = [...new Set(booksList.map(b => b.author))];
  const languages = [...new Set(booksList.map(b => b.language))];
  const genres = [...new Set(booksList.map(b => b.genre))];
  const years = [...new Set(booksList.map(b => b.published_date))].sort((a, b) => a - b);

  filtersContainer.innerHTML = `
    ${createFilterSection("نویسنده‌ها", authors, "author")}
    ${createFilterSection("زبان‌ها", languages, "lang")}
    ${createFilterSection("ژانرها", genres, "genre")}
    ${createFilterSection("تاریخ انتشار", years, "year")}
  `;
}

function createFilterSection(title, items, prefix) {
  const sectionId = `section-${prefix}`;
  const content = items.map((item, i) => `
    <div class="list-filters">
      <input id="${prefix}-${i}" type="checkbox" value="${item}" class="chekbox-item" />
      <label for="${prefix}-${i}">${item}</label>
    </div>
  `).join("");

  return `
    <div class="filter-category">
      <div class="filter-header" onclick="toggleFilter('${sectionId}', this)">
        <h3>${title}</h3>
        <button class="toggle-button">
          <img src="./assets/images/icons/arrow-n.svg" width="20px" alt="arrow">
        </button>
      </div>
      <div id="${sectionId}" class="filter-content hidden">
        ${content}
      </div>
    </div>
  `;
}

function toggleFilter(sectionId, headerElement) {
  const content = document.getElementById(sectionId);
  const toggleBtn = headerElement.querySelector(".toggle-button");

  content.classList.toggle("hidden");
  toggleBtn.classList.toggle("rotate");
}

function applyFilters() {
  const allCheckboxes = document.querySelectorAll('#filter input[type="checkbox"]');
  selectedFilters.authors = [];
  selectedFilters.languages = [];
  selectedFilters.genres = [];
  selectedFilters.years = [];

  allCheckboxes.forEach(checkbox => {
    if (checkbox.checked) {
      const [type] = checkbox.id.split("-");
      const val = type === "year" ? Number(checkbox.value) : checkbox.value;

      switch (type) {
        case "author":
          selectedFilters.authors.push(val);
          break;
        case "lang":
          selectedFilters.languages.push(val);
          break;
        case "genre":
          selectedFilters.genres.push(val);
          break;
        case "year":
          selectedFilters.years.push(val);
          break;
      }
    }
  });

  filterBooks(
  );
}

function clearFilters() {
  const allCheckboxes = document.querySelectorAll('#filter input[type="checkbox"]');
  allCheckboxes.forEach(cb => cb.checked = false);
  selectedFilters.authors = [];
  selectedFilters.languages = [];
  selectedFilters.genres = [];
  selectedFilters.years = [];
  render(BOOKS);
}

function filterBooks() {
  let result = BOOKS;

  if (selectedFilters.authors.length)
    result = result.filter(book => selectedFilters.authors.includes(book.author));
  if (selectedFilters.languages.length)
    result = result.filter(book => selectedFilters.languages.includes(book.language));
  if (selectedFilters.genres.length)
    result = result.filter(book => selectedFilters.genres.includes(book.genre));
  if (selectedFilters.years.length)
    result = result.filter(book => selectedFilters.years.includes(book.published_date));

  render(result);
}

render(BOOKS);
renderCart();
updateCartCount();
renderFilters(BOOKS);

document.getElementById("apply-filter-btn").addEventListener("click", applyFilters);
document.getElementById("clear-filter-btn").addEventListener("click", clearFilters);
