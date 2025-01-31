// Initialize AOS
AOS.init({
    duration: 800,
    once: false
});

// Fungsi untuk memulai countdown
function startCountdown() {
    // Tanggal dan waktu acara (11 Februari 2025, 08:30:00)
    const countDownDate = new Date("2025-02-11T08:30:00").getTime();

    // Buat interval untuk mengupdate waktu hitung mundur setiap 1 detik
    const x = setInterval(function() {
        const now = new Date().getTime(); // Waktu sekarang
        const distance = countDownDate - now; // Selisih waktu sekarang dan waktu acara

        // Hitung jumlah hari, jam, menit, dan detik yang tersisa
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Format waktu hitung mundur dengan menambahkan nol di depan
        const formatNumber = (num) => String(num).padStart(2, '0');

        // Update nilai waktu hitung mundur dengan animasi
        updateCountdownValue('days', formatNumber(days));
        updateCountdownValue('hours', formatNumber(hours));
        updateCountdownValue('minutes', formatNumber(minutes));
        updateCountdownValue('seconds', formatNumber(seconds));

        // Jika waktu hitung mundur sudah habis, hapus interval dan tampilkan pesan
        if (distance < 0) {
            clearInterval(x);
            document.getElementById("countdown").innerHTML = "<div class='expired-message'>Acara telah dimulai</div>";
        }
    }, 1000); // Update setiap 1 detik
}

// Fungsi untuk mengupdate nilai waktu hitung mundur dengan animasi
function updateCountdownValue(id, value) {
    const element = document.getElementById(id);
    if (element && element.textContent !== value) {
        element.style.transform = 'translateY(-20px)';
        element.style.opacity = '0';
        
        setTimeout(() => {
            element.textContent = value;
            element.style.transform = 'translateY(0)';
            element.style.opacity = '1';
        }, 300);
    }
}

// Door Animation
function doorAnimation() {
    const button = document.getElementById('open-btn');
    
    if (button) {
        // Klik tombol buka pintu untuk membuka pintu
        button.onclick = function(e) {
            e.preventDefault();
            
            const leftDoor = document.querySelector('.door.left');
            const rightDoor = document.querySelector('.door.right');
            const coverContent = document.querySelector('.cover-content');

            // Sembunyikan konten cover
            coverContent.classList.add('hidden');
            // Buka pintu
            leftDoor.classList.add('opened');
            rightDoor.classList.add('opened');

            // Tunggu 800ms lalu pindah ke halaman berikutnya
            setTimeout(() => {
                window.location.href = 'main_pembuka.html';
            }, 800);
        };
    }
}

// Kontrol musik latar belakang
const audioPlayer = document.getElementById('background-music');
const toggleButton = document.getElementById('toggle-audio');
let isPlaying = true;

if (toggleButton && audioPlayer) {
    // Klik tombol untuk memutar atau menghentikan musik latar belakang
    toggleButton.addEventListener('click', function() {
        if (isPlaying) {
            audioPlayer.pause();
            toggleButton.innerHTML = '<i class="fas fa-volume-mute"></i>';
        } else {
            audioPlayer.play();
            toggleButton.innerHTML = '<i class="fas fa-volume-up"></i>';
        }
        isPlaying = !isPlaying;
    });
}

// Fungsi untuk membagikan undangan ke WhatsApp
function shareToWhatsApp() {
    const text = encodeURIComponent("Undangan Dakwah Bersama Infokom");
    const url = encodeURIComponent("https://firdaussarah.github.io/");
    const whatsappUrl = `https://api.whatsapp.com/send?text=${text}%20${url}`;
    window.open(whatsappUrl, '_blank');
}

// Gabungkan event listener untuk menginisialisasi semua fungsi saat halaman selesai dimuat
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('countdown')) {
        startCountdown();
    }
    doorAnimation();  // Mulai animasi pintu
});
