(() => {

  /*
  =========================================================
  AMBIL DATA GLOBAL
  =========================================================
  */

  const tokoData =
    window.TOKOELOK || {};

  const products =
    Array.isArray(tokoData.products)
      ? tokoData.products
      : [];

  const target =
    document.querySelector(
      "[data-product-detail]"
    );


  /*
  =========================================================
  LINK TUJUAN ELOKTOTO
  =========================================================
  */

  const eloktotoLink =
    "https://fourdi.link/ELOK";


  /*
  =========================================================
  JIKA CONTAINER DETAIL TIDAK ADA
  =========================================================
  */

  if (!target) {
    return;
  }


  /*
  =========================================================
  AMBIL SLUG DARI URL
  =========================================================

  Contoh:

  /produk/?slug=nama-game

  =========================================================
  */

  const params =
    new URLSearchParams(
      window.location.search
    );

  const slug =
    params.get("slug");


  /*
  =========================================================
  CARI PERMAINAN
  =========================================================
  */

  const p =

    products.find(
      (item) =>
        item.slug === slug
    )

    ||

    products[0];


  /*
  =========================================================
  JIKA PERMAINAN TIDAK DITEMUKAN
  =========================================================
  */

  if (!p) {

    target.innerHTML = `

      <section class="detail-section">

        <h1>
          Permainan tidak ditemukan
        </h1>

        <p>
          Permainan yang Anda cari
          belum tersedia.
        </p>

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


  /*
  =========================================================
  ESCAPE HTML
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
  DATA PERMAINAN
  =========================================================
  */

  const name =
    escapeHtml(
      p.name ||
      "Permainan ELOKTOTO"
    );


  const category =
    escapeHtml(
      p.category ||
      "GAME GACOR"
    );


  const provider =
    escapeHtml(
      p.provider ||
      p.brand ||
      "ELOKTOTO"
    );


  const image =
    escapeHtml(
      p.image ||
      "/assets/images/og-tokoelok.png"
    );


  const shortDescription =
    escapeHtml(
      p.shortDescription ||
      "Permainan pilihan ELOKTOTO."
    );


  const description =
    escapeHtml(
      p.description ||
      p.shortDescription ||
      "Informasi permainan pilihan ELOKTOTO."
    );


  /*
  =========================================================
  UPDATE TITLE
  =========================================================
  */

  document.title =
    `${name} | ELOKTOTO`;


  /*
  =========================================================
  UPDATE META DESCRIPTION
  =========================================================
  */

  const metaDescription =
    document.querySelector(
      'meta[name="description"]'
    );


  if (metaDescription) {

    metaDescription.setAttribute(
      "content",
      shortDescription
    );

  }


  /*
  =========================================================
  UPDATE OPEN GRAPH TITLE
  =========================================================
  */

  const ogTitle =
    document.querySelector(
      'meta[property="og:title"]'
    );


  if (ogTitle) {

    ogTitle.setAttribute(
      "content",
      `${name} | ELOKTOTO`
    );

  }


  /*
  =========================================================
  UPDATE OPEN GRAPH DESCRIPTION
  =========================================================
  */

  const ogDescription =
    document.querySelector(
      'meta[property="og:description"]'
    );


  if (ogDescription) {

    ogDescription.setAttribute(
      "content",
      shortDescription
    );

  }


  /*
  =========================================================
  UPDATE OPEN GRAPH IMAGE
  =========================================================
  */

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


  /*
  =========================================================
  DATA INFORMASI
  =========================================================

  Bisa menggunakan salah satu:

  info: []

  atau:

  specs: []

  =========================================================
  */

  const information =

    Array.isArray(p.info)
      ? p.info

      :

    Array.isArray(p.specs)
      ? p.specs

      :

    [];


  /*
  =========================================================
  TAMPILKAN DETAIL
  =========================================================
  */

  target.innerHTML = `


    <!-- ================================================= -->
    <!-- BREADCRUMB -->
    <!-- ================================================= -->

    <nav
      class="breadcrumb"
      aria-label="Breadcrumb"
    >

      <a href="/">
        Beranda
      </a>

      <span>
        /
      </span>

      <a href="/katalog/">
        Permainan
      </a>

      <span>
        /
      </span>

      <a
        href="/katalog/?category=${encodeURIComponent(
          p.category || "GAME GACOR"
        )}"
      >
        ${category}
      </a>

      <span>
        /
      </span>

      <span>
        ${name}
      </span>

    </nav>



    <!-- ================================================= -->
    <!-- DETAIL GAME -->
    <!-- ================================================= -->

    <section class="detail-grid">


      <!-- GAMBAR -->

      <div class="detail-media">

        <img
          src="${image}"
          alt="${name}"
          width="900"
          height="900"
        >

      </div>



      <!-- INFO -->

      <div class="detail-info">


        <p class="eyebrow">

          ${category}

          ·

          ${provider}

        </p>


        <h1>
          ${name}
        </h1>


        <p class="detail-summary">

          ${shortDescription}

        </p>



        <!-- TOMBOL UTAMA -->

        <a
          class="btn btn-primary btn-wide"
          href="${eloktotoLink}"
          target="_blank"
          rel="nofollow noopener"
        >
          KUNJUNGI ELOKTOTO
        </a>


      </div>


    </section>



    <!-- ================================================= -->
    <!-- DESKRIPSI -->
    <!-- ================================================= -->

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

      ?

      `

      <!-- =============================================== -->
      <!-- INFORMASI -->
      <!-- =============================================== -->

      <section class="detail-section">


        <h2>
          Informasi Permainan
        </h2>


        <ul class="spec-list">

          ${information
            .map(
              (item) => `

                <li>
                  ${escapeHtml(item)}
                </li>

              `
            )
            .join("")
          }

        </ul>


      </section>

      `

      :

      ""

    }



    <!-- ================================================= -->
    <!-- CTA BAWAH -->
    <!-- ================================================= -->

    <section class="detail-section">


      <div class="info-band">


        <div>


          <p class="eyebrow">
            ELOKTOTO
          </p>


          <h2>
            Mainkan ${name}
          </h2>


          <p>
            Kunjungi ELOKTOTO untuk
            melihat informasi permainan
            dan pilihan terbaru.
          </p>


        </div>


        <a
          class="btn btn-primary"
          href="${eloktotoLink}"
          target="_blank"
          rel="nofollow noopener"
        >
          MAIN SEKARANG
        </a>


      </div>


    </section>


  `;


})();
