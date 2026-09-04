(() => {
  const store = window.TOKOELOK;

  if (!store) {
    console.error(
      "ELOKTOTO: window.TOKOELOK belum tersedia. " +
      "Pastikan products.js dimuat sebelum app.js dan product.js."
    );
    return;
  }

  const products = Array.isArray(store.products)
    ? store.products
    : [];

  const target = document.querySelector("[data-product-detail]");

  if (!target) {
    return;
  }

  const targetLink =
    store.targetLink ||
    store.config?.targetLink ||
    "https://fourdi.link/ELOK";

  const escapeHtml = (value) => {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  };

  const params =
    new URLSearchParams(window.location.search);

  const slug =
    params.get("slug") ||
    products[0]?.slug;

  const p =
    products.find((item) => item.slug === slug) ||
    products[0];

  if (!p) {
    target.innerHTML = `
      <section class="detail-section">
        <h1>Permainan tidak ditemukan</h1>
        <p>Permainan yang Anda cari belum tersedia.</p>

        <a
          class="btn btn-primary"
          href="/katalog/"
        >
          LIHAT SEMUA PERMAINAN
        </a>
      </section>
    `;

    return;
  }

  const name = escapeHtml(
    p.name || "Permainan ELOKTOTO"
  );

  const category = escapeHtml(
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

  const shortDescription = escapeHtml(
    p.shortDescription ||
    "Permainan pilihan ELOKTOTO."
  );

  const description = escapeHtml(
    p.description ||
    p.shortDescription ||
    "Informasi permainan pilihan ELOKTOTO."
  );

  const information =
    Array.isArray(p.info)
      ? p.info
      : Array.isArray(p.specs)
      ? p.specs
      : [];

  document.title =
    `${p.name || "Detail Permainan"} | ELOKTOTO`;

  const metaDescription =
    document.querySelector('meta[name="description"]');

  if (metaDescription) {
    metaDescription.setAttribute(
      "content",
      p.shortDescription ||
      "Lihat detail permainan ELOKTOTO."
    );
  }

  const ogTitle =
    document.querySelector('meta[property="og:title"]');

  if (ogTitle) {
    ogTitle.setAttribute(
      "content",
      `${p.name || "Detail Permainan"} | ELOKTOTO`
    );
  }

  const ogDescription =
    document.querySelector(
      'meta[property="og:description"]'
    );

  if (ogDescription) {
    ogDescription.setAttribute(
      "content",
      p.shortDescription ||
      "Lihat detail permainan ELOKTOTO."
    );
  }

  const ogImage =
    document.querySelector(
      'meta[property="og:image"]'
    );

  if (ogImage && p.image) {
    ogImage.setAttribute(
      "content",
      p.image
    );
  }

  target.innerHTML = `

    <nav
      class="breadcrumb"
      aria-label="Breadcrumb"
    >

      <a href="/">
        Beranda
      </a>

      <span>/</span>

      <a href="/katalog/">
        Permainan
      </a>

      <span>/</span>

      <a
        href="/katalog/?category=${encodeURIComponent(
          p.category || "GAME GACOR"
        )}"
      >
        ${category}
      </a>

      <span>/</span>

      <span>
        ${name}
      </span>

    </nav>


    <section class="detail-grid">

      <div class="detail-media">

        <img
          src="${image}"
          alt="${name}"
          width="900"
          height="900"
        >

      </div>


      <div class="detail-info">

        <p class="eyebrow">
          ${category} · ${provider}
        </p>

        <h1>
          ${name}
        </h1>

        <p class="detail-summary">
          ${shortDescription}
        </p>

        <a
          class="btn btn-primary btn-wide"
          href="${targetLink}"
          target="_blank"
          rel="nofollow noopener"
        >
          KUNJUNGI ELOKTOTO
        </a>

      </div>

    </section>


    <section class="detail-section">

      <h2>
        Tentang ${name}
      </h2>

      <p>
        ${description}
      </p>

    </section>


    ${
      information.length
        ? `
          <section class="detail-section">

            <h2>
              Informasi Permainan
            </h2>

            <ul class="spec-list">

              ${information
                .map(
                  (item) =>
                    `<li>${escapeHtml(item)}</li>`
                )
                .join("")}

            </ul>

          </section>
        `
        : ""
    }


    <section class="detail-section">

      <div class="info-band">

        <div>

          <p class="eyebrow">
            ELOKTOTO
          </p>

          <h2>
            Kunjungi ELOKTOTO
          </h2>

          <p>
            Lihat permainan, promo,
            RTP, dan informasi terbaru.
          </p>

        </div>

        <a
          class="btn btn-primary"
          href="${targetLink}"
          target="_blank"
          rel="nofollow noopener"
        >
          KUNJUNGI ELOKTOTO
        </a>

      </div>

    </section>
  `;
})();
