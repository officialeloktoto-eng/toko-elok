(() => {

  /*
  =========================================================
  CONFIG & DATA
  =========================================================
  */

  const config =
    window.TOKOELOK_CONFIG || {};

  const products =
    window.TOKOELOK_PRODUCTS || [];


  /*
  =========================================================
  LINK TUJUAN UTAMA ELOKTOTO
  =========================================================
  */

  const eloktotoLink =
    "https://fourdi.link/ELOK";


  /*
  =========================================================
  FORMAT HARGA
  =========================================================
  */

  const formatPrice = (value) => {

    return new Intl.NumberFormat(
      "id-ID",
      {
        style: "currency",
        currency:
          config.currency || "IDR",

        maximumFractionDigits: 0
      }
    ).format(value);

  };


  /*
  =========================================================
  GLOBAL DATA
  =========================================================
  */

  window.TOKOELOK = {

    config,

    products,

    formatPrice,

    eloktotoLink

  };


  /*
  =========================================================
  COPYRIGHT YEAR
  =========================================================
  */

  document
    .querySelectorAll(
      "[data-year]"
    )
    .forEach((el) => {

      el.textContent =
        new Date().getFullYear();

    });


  /*
  =========================================================
  MOBILE MENU
  =========================================================
  */

  const menuBtn =
    document.querySelector(
      "[data-menu-toggle]"
    );


  const mobileNav =
    document.querySelector(
      "[data-mobile-nav]"
    );


  if (
    menuBtn &&
    mobileNav
  ) {

    menuBtn.addEventListener(
      "click",
      () => {

        mobileNav.classList.toggle(
          "open"
        );


        menuBtn.setAttribute(
          "aria-expanded",

          mobileNav.classList.contains(
            "open"
          )
            ? "true"
            : "false"
        );

      }
    );

  }


  /*
  =========================================================
  LINK ELOKTOTO
  =========================================================

  Semua elemen yang masih menggunakan:

  data-wa-general

  sekarang otomatis diarahkan ke:

  https://fourdi.link/ELOK

  =========================================================
  */

  document
    .querySelectorAll(
      "[data-wa-general]"
    )
    .forEach((link) => {

      link.href =
        eloktotoLink;


      link.target =
        "_blank";


      link.rel =
        "nofollow noopener";

    });


})();
