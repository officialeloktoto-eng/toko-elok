(() => {
  const store = window.TOKOELOK;

  if (!store) {
    console.error(
      "ELOKTOTO: window.TOKOELOK belum tersedia. " +
      "Pastikan products.js dimuat sebelum app.js dan catalog.js."
    );
    return;
  }

  const products = Array.isArray(store.products)
    ? store.products
    : [];

  const grid = document.querySelector("[data-product-grid]");
  const search = document.querySelector("[data-search]");
  const category = document.querySelector("[data-category]");
  const resultCount = document.querySelector("[data-result-count]");

  if (!grid) {
    return;
  }

  const escapeHtml = (value) => {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  };

  const detailUrl = (product) => {
    return `/produk/?slug=${encodeURIComponent(product.slug || "")}`;
  };

  const params = new URLSearchParams(window.location.search);
  const urlSearch = params.get("q") || "";
  const urlCategory = params.get("category") || "";

  if (search && urlSearch) {
    search.value = urlSearch;
  }

  const preferredCategories = [
    "BUKTI KEMENANGAN",
    "PROMO",
    "RTP",
    "GAME GACOR"
  ];

  const dataCategories = products
    .map((p) => p.category)
    .filter(Boolean);

  const categories = [
    "Semua",
    ...new Set([
      ...preferredCategories,
      ...dataCategories
    ])
  ];

  if (category) {
    category.innerHTML = categories
      .map((name) => {
        return `<option value="${escapeHtml(name)}">${escapeHtml(name)}</option>`;
      })
      .join("");

    if (urlCategory && categories.includes(urlCategory)) {
      category.value = urlCategory;
    }
  }

  function card(p) {
    const name = escapeHtml(
      p.name || "Permainan ELOKTOTO"
    );

    const categoryName = escapeHtml(
      p.category || "GAME GACOR"
    );

    const provider = escapeHtml(
      p.provider ||
      p.brand ||
      "ELOKTOTO"
    );

    const image = escapeHtml(
      p.image ||
      "/assets/images/og-tokoelok.png"
    );

    const description = escapeHtml(
      p.shortDescription ||
      p.description ||
      "Permainan pilihan ELOKTOTO."
    );

    const url = detailUrl(p);

    return `
      <article class="product-card">

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

        <div class="product-content">

          <div class="product-meta">
            ${categoryName} · ${provider}
          </div>

          <h3>
            <a href="${url}">
              ${name}
            </a>
          </h3>

          <p class="product-description">
            ${description}
          </p>

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

  function render() {
    const q = (
      search?.value ||
      urlSearch ||
      ""
    )
      .trim()
      .toLowerCase();

    const selectedCategory =
      category?.value ||
      urlCategory ||
      "Semua";

    let filtered = products.filter((p) => {
      const searchableText = [
        p.name,
        p.provider,
        p.brand,
        p.category,
        p.shortDescription,
        p.description
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const searchMatch =
        !q ||
        searchableText.includes(q);

      const categoryMatch =
        selectedCategory === "Semua" ||
        p.category === selectedCategory;

      return searchMatch && categoryMatch;
    });

    const isCatalogPage =
      window.location.pathname.startsWith("/katalog");

    if (!isCatalogPage) {
      filtered = filtered.slice(0, 8);
    }

    grid.innerHTML = filtered
      .map(card)
      .join("");

    if (resultCount) {
      resultCount.textContent =
        `${filtered.length} permainan ditemukan`;
    }

    if (!filtered.length) {
      grid.innerHTML = `
        <div class="empty">
          Permainan tidak ditemukan.
        </div>
      `;
    }
  }

  search?.addEventListener("input", render);
  category?.addEventListener("change", render);

  render();
})();
