(() => {
  const store = window.TOKOELOK;
  if (!store) {
    console.error("ELOKTOTO: muat products.js lalu app.js sebelum product.js");
    return;
  }

  const target = document.querySelector("[data-product-detail]");
  if (!target) return;

  const products = Array.isArray(store.products) ? store.products : [];
  const slug = new URLSearchParams(location.search).get("slug");
  const p = products.find((item) => item.slug === slug) || products[0];

  const esc = (value) => String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

  if (!p) {
    target.innerHTML = `
      <section class="empty-state detail-empty">
        <strong>Item tidak ditemukan.</strong>
        <a class="btn btn-primary" href="/katalog/">Kembali ke katalog</a>
      </section>
    `;
    return;
  }

  const name = esc(p.name);
  const cat = esc(p.category);
  const provider = esc(p.provider || "ELOKTOTO");
  const image = esc(p.image || "/assets/images/og-eloktoto.webp");
  const short = esc(p.shortDescription || "");
  const description = esc(p.description || p.shortDescription || "");
  const info = Array.isArray(p.info) ? p.info : [];

  document.title = `${p.name} | ELOKTOTO`;

  const descMeta = document.querySelector('meta[name="description"]');
  if (descMeta) descMeta.setAttribute("content", p.shortDescription || "Detail ELOKTOTO");

  target.innerHTML = `
    <nav class="breadcrumb" aria-label="Breadcrumb">
      <a href="/">Beranda</a>
      <span>›</span>
      <a href="/katalog/">Katalog</a>
      <span>›</span>
      <a href="/katalog/?category=${encodeURIComponent(p.category || "")}">${cat}</a>
    </nav>

    <section class="detail-hero">
      <div class="detail-media glossy-panel">
        <img src="${image}" alt="${name}" width="1200" height="900">
        <span class="detail-glow" aria-hidden="true"></span>
      </div>

      <div class="detail-copy">
        <span class="eyebrow">${cat} · ${provider}</span>
        <h1>${name}</h1>
        <p class="detail-summary">${short}</p>

        <div class="detail-actions">
          <a class="btn btn-primary btn-large" href="${store.targetLink}" target="_blank" rel="nofollow noopener">
            KUNJUNGI ELOKTOTO
          </a>
          <a class="btn btn-secondary btn-large" href="/katalog/">
            LIHAT KATALOG
          </a>
        </div>
      </div>
    </section>

    <section class="detail-content-grid">
      <article class="content-card glossy-panel">
        <span class="section-kicker">DETAIL</span>
        <h2>Tentang ${name}</h2>
        <p>${description}</p>
      </article>

      <aside class="content-card glossy-panel">
        <span class="section-kicker">INFORMASI</span>
        <h2>Ringkasan</h2>
        <ul class="info-list">
          ${info.map((item) => `<li>${esc(item)}</li>`).join("")}
        </ul>
      </aside>
    </section>
  `;
})();
