// Array penampung keranjang
let keranjang = [];

// 1. Fungsi Filter Kategori Produk
function filterKategori(kategori, elemenTombol) {
    // Ubah status tombol aktif
    const tombolTabs = document.querySelectorAll('.tab-btn');
    tombolTabs.forEach(btn => btn.classList.remove('active'));
    elemenTombol.classList.add('active');

    // Filter kartu produk
    const kartuProduk = document.querySelectorAll('.product-card');
    kartuProduk.forEach(card => {
        const kategoriProduk = card.getAttribute('data-kategori');
        
        if (kategori === 'semua' || kategori === kategoriProduk) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// 2. Fungsi Buka/Tutup Sidebar Keranjang
function toggleCart() {
    const sidebar = document.getElementById('cartSidebar');
    sidebar.classList.toggle('open');
}

// 3. Fungsi Tambah Produk ke Keranjang
function tambahKeKeranjang(namaBarang, hargaBarang) {
    const itemAda = keranjang.find(item => item.nama === namaBarang);

    if (itemAda) {
        itemAda.jumlah += 1;
    } else {
        keranjang.push({
            nama: namaBarang,
            harga: hargaBarang,
            jumlah: 1
        });
    }

    perbaruiKeranjang();
}

// 4. Update UI Data Keranjang Belanja
function perbaruiKeranjang() {
    const containerItem = document.getElementById('cart-items');
    const badgeHitung = document.getElementById('cart-count');
    const labelTotal = document.getElementById('cart-total');

    containerItem.innerHTML = '';
    let totalHarga = 0;
    let totalBarang = 0;

    if (keranjang.length === 0) {
        containerItem.innerHTML = '<p class="empty-text">Belum ada produk di keranjang.</p>';
    } else {
        keranjang.forEach(item => {
            totalBarang += item.jumlah;
            totalHarga += (item.harga * item.jumlah);

            const div = document.createElement('div');
            div.className = 'cart-item';
            div.innerHTML = `
                <div>
                    <strong>${item.nama}</strong><br>
                    <small>${item.jumlah} x Rp ${item.harga.toLocaleString('id-ID')}</small>
                </div>
                <div>Rp ${(item.harga * item.jumlah).toLocaleString('id-ID')}</div>
            `;
            containerItem.appendChild(div);
        });
    }

    badgeHitung.innerText = totalBarang;
    labelTotal.innerText = `Rp ${totalHarga.toLocaleString('id-ID')}`;
}

// 5. Kirim Nota Pesanan via WhatsApp
function checkoutWhatsApp() {
    if (keranjang.length === 0) {
        alert("Keranjang belanja masih kosong!");
        return;
    }

    const waToko = "6281234567890"; // Masukkan nomor WhatsApp tokomu di sini
    let pesan = "*PESANAN BARU - GRIYADECOR*\n";
    pesan += "----------------------------------------\n\n";
    
    let total = 0;
    keranjang.forEach(item => {
        pesan += `• ${item.nama} (${item.jumlah}x) = Rp ${(item.harga * item.jumlah).toLocaleString('id-ID')}\n`;
        total += (item.harga * item.jumlah);
    });

    pesan += `\n----------------------------------------\n`;
    pesan += `*Total Pembayaran: Rp ${total.toLocaleString('id-ID')}*`;

    const url = `https://wa.me/${waToko}?text=${encodeURIComponent(pesan)}`;
    window.open(url, '_blank');
}
document.addEventListener('DOMContentLoaded', () => {
    // Memilih seluruh elemen yang memiliki class 'scroll-reveal'
    const elemenReveal = document.querySelectorAll('.scroll-reveal');

    // Konfigurasi ambang batas deteksi layar
    const opsiObserver = {
        root: null, // Menggunakan layar browser sebagai acuan kontainer
        threshold: 0.15, // Elemen memicu aksi jika 15% bagiannya sudah terlihat di layar
        rootMargin: "0px"
    };

    // Callback function saat elemen terdeteksi masuk target rentang scroll
    const callbackReveal = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Menambahkan class 'visible' untuk menjalankan animasi CSS
                entry.target.classList.add('visible');
                // Hentikan pemantauan pada elemen tersebut karena animasi sudah selesai berjalan
                observer.unobserve(entry.target);
            }
        });
    };

    // Inisialisasi API Intersection Observer
    const observer = new IntersectionObserver(callbackReveal, opsiObserver);

    // Daftarkan semua komponen target ke sistem observer
    elemenReveal.forEach(elemen => {
        observer.observe(elemen);
    });
});