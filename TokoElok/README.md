# TOKOELOK — Launch Ready Static Catalog

Tanpa Node.js. Tanpa database. Cocok untuk upload langsung ke Cloudflare Pages.

## 1. Edit produk
Buka:
`assets/js/products.js`

Ubah:
- nama produk
- slug
- kategori
- brand
- harga
- harga lama
- stok
- gambar
- deskripsi
- spesifikasi

## 2. Edit WhatsApp
Di `assets/js/products.js` ubah:

`whatsapp: "6200000000000"`

Gunakan format kode negara tanpa `+`.
Contoh Indonesia: `6281234567890`

## 3. Edit / tambah gambar
Taruh gambar produk pada:
`assets/images/products/`

Disarankan WebP.

## 4. Deploy Cloudflare Pages
Upload seluruh isi folder `TOKOELOK-LAUNCH` sebagai static site.
Tidak ada build command.

## 5. Setelah mendapatkan URL pages.dev
Misalnya:
`https://tokoelok.pages.dev`

Baru tambahkan:
- canonical URL
- og:url absolut
- URL absolut og:image
- isi sitemap.xml
- baris Sitemap pada robots.txt

## Catatan SEO
Versi ini mengutamakan kecepatan launch. Halaman detail produk menggunakan JavaScript dan query `?slug=`.
Setelah produk sudah online, tahap SEO berikutnya yang lebih kuat adalah membuat satu file HTML statis unik untuk setiap produk.
