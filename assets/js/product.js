(() => {
  const { products, formatPrice, config } = window.TOKOELOK;
  const target = document.querySelector("[data-product-detail]");
  if (!target) return;

  const params = new URLSearchParams(location.search);
  const slug = params.get("slug") || products[0]?.slug;
  const p = products.find(x => x.slug === slug) || products[0];

  if (!p) {
    target.innerHTML = "<p>Produk tidak ditemukan.</p>";
    return;
  }

  document.title = `${p.name} | TOKOELOK`;
  const desc = document.querySelector('meta[name="description"]');
  if (desc) desc.setAttribute("content", p.shortDescription);

  const waMsg = encodeURIComponent(`Halo TOKOELOK, saya tertarik dengan ${p.name}. Apakah masih tersedia?`);
  const wa = `https://wa.me/${config.whatsapp}?text=${waMsg}`;

  target.innerHTML = `
    <nav class="breadcrumb" aria-label="Breadcrumb">
      <a href="/">Beranda</a><span>/</span>
      <a href="/katalog/">Katalog</a><span>/</span>
      <span>${p.name}</span>
    </nav>

    <section class="detail-grid">
      <div class="detail-media">
        <img src="${p.image}" alt="${p.name}" width="900" height="900">
      </div>
      <div class="detail-info">
        <p class="eyebrow">${p.category} · ${p.brand}</p>
        <h1>${p.name}</h1>
        <div class="detail-price">${formatPrice(p.price)}</div>
        ${p.oldPrice ? `<del class="detail-old-price">${formatPrice(p.oldPrice)}</del>` : ""}
        <p class="detail-stock">${p.stock > 0 ? `Tersedia · Stok ${p.stock}` : "Stok habis"}</p>
        <p class="detail-summary">${p.shortDescription}</p>
        <a class="btn btn-primary btn-wide" href="${wa}" rel="nofollow">Tanya / Pesan via WhatsApp</a>
      </div>
    </section>

    <section class="detail-section">
      <h2>Deskripsi Produk</h2>
      <p>${p.description}</p>
    </section>

    <section class="detail-section">
      <h2>Spesifikasi</h2>
      <ul class="spec-list">
        ${p.specs.map(s => `<li>${s}</li>`).join("")}
      </ul>
    </section>
  `;
})();
