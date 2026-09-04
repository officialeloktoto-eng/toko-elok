(() => {
  const store = window.TOKOELOK;
  if (!store) {
    console.error("ELOKTOTO: muat products.js lalu app.js sebelum catalog.js");
    return;
  }

  const products = Array.isArray(store.products) ? store.products : [];
  const grid = document.querySelector("[data-product-grid]");
  if (!grid) return;

  const search = document.querySelector("[data-search]");
  const category = document.querySelector("[data-category]");
  const resultCount = document.querySelector("[data-result-count]");
  const limit = Number(grid.dataset.limit || 0);

  const esc = (value) => String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

  const params = new URLSearchParams(location.search);
  const urlQ = params.get("q") || "";
  const urlCategory = params.get("category") || "";

  if (search && urlQ) search.value = urlQ;

  const categoryOrder = [
    "BUKTI KEMENANGAN",
    "PROMO",
    "RTP",
    "GAME GACOR"
  ];

  if (category) {
    const available = new Set(products.map((p) => p.category).filter(Boolean));
    const ordered = categoryOrder.filter((c) => available.has(c));
    const extras = [...available].filter((c) => !ordered.includes(c));

    category.innerHTML = ["Semua", ...ordered, ...extras]
      .map((c) => `<option value="${esc(c)}">${esc(c)}</option>`)
      .join("");

    if ([...category.options].some((opt) => opt.value === urlCategory)) {
      category.value = urlCategory;
    }
  }

  function card(p) {
    const name = esc(p.name || "Permainan ELOKTOTO");
    const cat = esc(p.category || "GAME GACOR");
    const provider = esc(p.provider || "ELOKTOTO");
    const img = esc(p.image || "/assets/images/og-eloktoto.webp");
    const desc = esc(p.shortDescription || "");
    const url = `/produk/?slug=${encodeURIComponent(p.slug || "")}`;

    return `
      <article class="product-card">
        <a class="product-image-link" href="${url}" aria-label="Lihat ${name}">
          <img class="product-image" src="${img}" alt="${name}" loading="lazy" width="1200" height="900">
          <span class="product-category">${cat}</span>
          <span class="shine" aria-hidden="true"></span>
        </a>

        <div class="product-content">
          <div class="product-meta">${provider}</div>
          <h3><a href="${url}">${name}</a></h3>
          <p>${desc}</p>
          <a class="product-button" href="${url}">
            LIHAT DETAIL
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </article>
    `;
  }

  function render() {
    const q = (search?.value || urlQ || "").trim().toLowerCase();
    const selected = category?.value || urlCategory || "Semua";

    let filtered = products.filter((p) => {
      const haystack = [
        p.name,
        p.category,
        p.provider,
        p.shortDescription,
        p.description
      ].filter(Boolean).join(" ").toLowerCase();

      return (!q || haystack.includes(q)) &&
        (selected === "Semua" || p.category === selected);
    });

    if (limit > 0) filtered = filtered.slice(0, limit);

    grid.innerHTML = filtered.map(card).join("");

    if (resultCount) {
      resultCount.textContent = `${filtered.length} item ditemukan`;
    }

    if (!filtered.length) {
      grid.innerHTML = `
        <div class="empty-state">
          <strong>Belum ada hasil.</strong>
          <span>Coba kata kunci atau kategori lain.</span>
        </div>
      `;
    }
  }

  search?.addEventListener("input", render);
  category?.addEventListener("change", render);
  render();
})();
