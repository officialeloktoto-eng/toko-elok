(() => {
  const { products, formatPrice } = window.TOKOELOK;
  const grid = document.querySelector("[data-product-grid]");
  const search = document.querySelector("[data-search]");
  const category = document.querySelector("[data-category]");
  const resultCount = document.querySelector("[data-result-count]");
  if (!grid) return;

  const categories = ["Semua", ...new Set(products.map(p => p.category))];
  if (category) {
    category.innerHTML = categories.map(c => `<option value="${c}">${c}</option>`).join("");
  }

  function card(p) {
    const discount = p.oldPrice > p.price ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;
    return `
      <article class="product-card">
        <a class="product-image-link" href="/produk/?slug=${encodeURIComponent(p.slug)}" aria-label="Lihat ${p.name}">
          <img class="product-image" src="${p.image}" alt="${p.name}" loading="lazy" width="900" height="900">
          ${discount ? `<span class="discount-badge">-${discount}%</span>` : ""}
        </a>
        <div class="product-content">
          <div class="product-meta">${p.category} · ${p.brand}</div>
          <h3><a href="/produk/?slug=${encodeURIComponent(p.slug)}">${p.name}</a></h3>
          <div class="price-row">
            <strong>${formatPrice(p.price)}</strong>
            ${p.oldPrice ? `<del>${formatPrice(p.oldPrice)}</del>` : ""}
          </div>
          <p class="stock">${p.stock > 0 ? `Stok ${p.stock}` : "Stok habis"}</p>
          <a class="product-button" href="/produk/?slug=${encodeURIComponent(p.slug)}">Lihat Produk</a>
        </div>
      </article>
    `;
  }

  function render() {
    const q = (search?.value || "").trim().toLowerCase();
    const c = category?.value || "Semua";
    const filtered = products.filter(p => {
      const hay = `${p.name} ${p.brand} ${p.category}`.toLowerCase();
      return (!q || hay.includes(q)) && (c === "Semua" || p.category === c);
    });
    grid.innerHTML = filtered.map(card).join("");
    if (resultCount) resultCount.textContent = `${filtered.length} produk`;
    if (!filtered.length) grid.innerHTML = `<div class="empty">Produk tidak ditemukan.</div>`;
  }

  search?.addEventListener("input", render);
  category?.addEventListener("change", render);
  render();
})();
