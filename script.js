// Fungsi Filter Pencarian Rumah
function cariProperti() {
    let lokasiDipilih = document.getElementById('filter-lokasi').value;
    let tipeDipilih = document.getElementById('filter-tipe').value;
    let kartuProperti = document.querySelectorAll('.property-card');

    kartuProperti.forEach(card => {
        let lokasiKartu = card.getAttribute('data-lokasi');
        let tipeKartu = card.getAttribute('data-tipe');

        // Logika pencocokan filter
        let cocokLokasi = (lokasiDipilih === 'semua' || lokasiDipilih === lokasiKartu);
        let cocokTipe = (tipeDipilih === 'semua' || tipeDipilih === tipeKartu);

        if (cocokLokasi && cocokTipe) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Fungsi Modal Detail
function bukaModal(nama, harga, lokasi, deskripsi) {
    document.getElementById('modal-nama').innerText = nama;
    document.getElementById('modal-harga').innerText = harga;
    document.getElementById('modal-lokasi').innerText = lokasi;
    document.getElementById('modal-deskripsi').innerText = deskripsi;
    
    document.getElementById('propertyModal').style.display = 'flex';
}

function tutupModal() {
    document.getElementById('propertyModal').style.display = 'none';
}

// Menutup modal jika user klik area luar modal box
window.onclick = function(event) {
    let modal = document.getElementById('propertyModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}
function handleFormSubmit(event) {
    // Mencegah halaman reload saat form dikirim
    event.preventDefault();

    // Mengambil data inputan user
    const nama = document.getElementById('nama').value;
    const email = document.getElementById('email').value;
    const whatsapp = document.getElementById('whatsapp').value;
    const pesan = document.getElementById('pesan').value;

    const statusBox = document.getElementById('formStatus');

    // Menampilkan simulasi loading / proses kirim
    statusBox.style.display = 'block';
    statusBox.className = 'form-status'; // reset class
    statusBox.innerText = 'Sedang mengirim pesan...';

    // Simulasi pengiriman data (delay 1.5 detik)
    setTimeout(() => {
        // Tampilkan pesan sukses ke user
        statusBox.className = 'form-status sukses';
        statusBox.innerText = `Terima kasih ${nama}, pesan Anda berhasil dikirim! Tim agen kami akan segera menghubungi Anda melalui WhatsApp/Email.`;

        // Reset/Kosongkan form setelah sukses kirim
        document.getElementById('contactForm').reset();
    }, 1500);
}