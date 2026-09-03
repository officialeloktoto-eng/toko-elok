```javascript
(() => {

  /*
  =========================================================
  AMBIL DATA GLOBAL
  =========================================================
  */

  const tokoData = window.TOKOELOK || {};

  const products =
    Array.isArray(tokoData.products)
      ? tokoData.products
      : [];

  const formatPrice =
    typeof tokoData.formatPrice === "function"
      ? tokoData.formatPrice
      : (value) => value;


  /*
  =========================================================
  ELEMENT HTML
  =========================================================
  */

  const grid =
    document.querySelector(
      "[data-product-grid]"
    );

  const search =
    document.querySelector(
      "[data-search]"
    );

  const category =
    document.querySelector(
      "[data-category]"
    );

  const resultCount =
    document.querySelector(
      "[data-result-count]"
    );


  /*
  =========================================================
  JIKA TIDAK ADA PRODUCT GRID
  =========================================================
  */

  if (!grid) {
    return;
  }


  /*
  =========================================================
  PARAMETER URL
  =========================================================

  Contoh:

  /katalog/?category=PROMO

  /katalog/?category=GAME%20GACOR

  /katalog/?q=pragmatic

  =========================================================
  */

  const params =
    new URLSearchParams(
      window.location.search
    );

  const urlSearch =
    params.get("q") || "";

  const urlCategory =
    params.get("category") || "";


  /*
  =========================================================
  ISI SEARCH DARI URL
  =========================================================
  */

  if (
    search &&
    urlSearch
  ) {

    search.value =
      urlSearch;

  }


  /*
  =========================================================
  KATEGORI UTAMA ELOKTOTO
  =========================================================
  */

  const mainCategories = [

    "BUKTI KEMENANGAN",

    "PROMO",

    "RTP",

    "GAME GACOR"

  ];


  /*
  =========================================================
  AMBIL KATEGORI TAMBAHAN DARI PRODUCTS.JS
  =========================================================
  */

  const productCategories =
    products
      .map((p) => p.category)
      .filter(Boolean);


  /*
  =========================================================
  GABUNGKAN KATEGORI
  =========================================================
  */

  const categories = [

    "Semua",

    ...new Set([
      ...mainCategories,
      ...productCategories
    ])

  ];


  /*
  =========================================================
  BUAT SELECT CATEGORY
  =========================================================
  */

  if (category) {

    category.innerHTML =
      categories
        .map((c) => {

          return `
            <option value="${escapeHtml(c)}">
              ${escapeHtml(c)}
            </option>
          `;

        })
        .join("");


    /*
    =======================================================
    PILIH CATEGORY DARI URL
    =======================================================
    */

    if (
      urlCategory &&
      categories.includes(
        urlCategory
      )
    ) {

      category.value =
        urlCategory;

    }

  }


  /*
  =========================================================
  ESCAPE HTML
  =========================================================

  Mengurangi risiko teks produk merusak HTML.

  =========================================================
  */

  function escapeHtml(value) {

    return String(
      value ?? ""
    )
      .replace(
        /&/g,
        "&amp;"
      )
      .replace(
        /</g,
        "&lt;"
      )
      .replace(
        />/g,
        "&gt;"
      )
      .replace(
        /"/g,
        "&quot;"
      )
      .replace(
        /'/g,
        "&#039;"
      );

  }


  /*
  =========================================================
  URL DETAIL PERMAINAN
  =========================================================
  */

  function productUrl(p) {

    return (
      "/produk/?slug=" +
      encodeURIComponent(
        p.slug || ""
      )
    );

  }


  /*
  =========================================================
  CARD PERMAINAN
  =========================================================
  */

  function card(p) {

    const name =
      escapeHtml(
        p.name ||
        "Permainan ELOKTOTO"
      );

    const categoryName =
      escapeHtml(
        p.category ||
        "GAME GACOR"
      );

    const brand =
      escapeHtml(
        p.brand ||
        p.provider ||
        "ELOKTOTO"
      );

    const image =
      escapeHtml(
        p.image ||
        "/assets/images/og-tokoelok.png"
      );

    const description =
      escapeHtml(
        p.shortDescription ||
        p.description ||
        "Permainan pilihan ELOKTOTO."
      );

    const url =
      productUrl(p);


    return `

      <article class="product-card">


        <!-- IMAGE -->

        <a
          class="product-image-link"
          href="${url}"
          aria-label="Lihat ${name}"
        >

          <img
            class="product-image"
            src="${image}"
            alt="${name}"
            loading="lazy"
            width="900"
            height="900"
          >

          <span class="discount-badge">
            ${categoryName}
          </span>

        </a>



        <!-- CONTENT -->

        <div class="product-content">


          <!-- CATEGORY / PROVIDER -->

          <div class="product-meta">

            ${categoryName}

            ·

            ${brand}

          </div>



          <!-- TITLE -->

          <h3>

            <a href="${url}">
              ${name}
            </a>

          </h3>



          <!-- DESCRIPTION -->

          <p class="product-description">

            ${description}

          </p>



          <!-- DETAIL BUTTON -->

          <a
            class="product-button"
            href="${url}"
          >
            LIHAT DETAIL
          </a>


        </div>


      </article>

    `;

  }


  /*
  =========================================================
  FILTER & RENDER
  =========================================================
  */

  function render() {


    /*
    =======================================================
    SEARCH KEYWORD
    =======================================================
    */

    const q = (

      search?.value ||
      urlSearch ||
      ""

    )
      .trim()
      .toLowerCase();


    /*
    =======================================================
    CATEGORY AKTIF
    =======================================================
    */

    const selectedCategory =

      category?.value ||

      urlCategory ||

      "Semua";


    /*
    =======================================================
    FILTER DATA
    =======================================================
    */

    let filtered =
      products.filter(
        (p) => {

          const name =
            p.name || "";

          const brand =
            p.brand ||
            p.provider ||
            "";

          const productCategory =
            p.category || "";

          const description =
            p.shortDescription ||
            p.description ||
            "";


          const searchText = `

            ${name}

            ${brand}

            ${productCategory}

            ${description}

          `
            .toLowerCase();


          /*
          SEARCH MATCH
          */

          const searchMatch =

            !q ||

            searchText.includes(q);


          /*
          CATEGORY MATCH
          */

          const categoryMatch =

            selectedCategory ===
              "Semua" ||

            productCategory ===
              selectedCategory;


          return (

            searchMatch &&
            categoryMatch

          );

        }
      );


    /*
    =======================================================
    HOMEPAGE HANYA TAMPILKAN 8 PERMAINAN
    =======================================================

    Pada /katalog/ semua permainan tetap tampil.

    =======================================================
    */

    const isCatalogPage =
      window.location.pathname
        .startsWith(
          "/katalog"
        );


    if (!isCatalogPage) {

      filtered =
        filtered.slice(
          0,
          8
        );

    }


    /*
    =======================================================
    TAMPILKAN CARD
    =======================================================
    */

    grid.innerHTML =
      filtered
        .map(card)
        .join("");


    /*
    =======================================================
    JUMLAH HASIL
    =======================================================
    */

    if (resultCount) {

      resultCount.textContent =

        `${filtered.length} permainan ditemukan`;

    }


    /*
    =======================================================
    JIKA KOSONG
    =======================================================
    */

    if (
      filtered.length === 0
    ) {

      grid.innerHTML = `

        <div class="empty">

          Permainan tidak ditemukan.

          <br>

          Silakan pilih kategori
          atau gunakan kata pencarian lain.

        </div>

      `;

    }

  }


  /*
  =========================================================
  EVENT SEARCH
  =========================================================
  */

  search?.addEventListener(
    "input",
    render
  );


  /*
  =========================================================
  EVENT CATEGORY
  =========================================================
  */

  category?.addEventListener(
    "change",
    render
  );


  /*
  =========================================================
  RENDER PERTAMA
  =========================================================
  */

  render();


})();
```
