// JavaScript cho thanh bên
document.getElementById('sidebar-toggle').addEventListener('click', function() {
    document.querySelector('.sidebar').classList.toggle('show');
});
// JavaScript cho nút cuộn lên đầu trang
document.getElementById('scroll-to-top').addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('scroll', function() {
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    if (window.scrollY > 300) {
        scrollToTopBtn.style.display = 'block';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});
//* carousel
let currentIndex = 0;

function moveSlide(step) {
    const slides = document.querySelector('.carousel-slides');
    const totalSlides = document.querySelectorAll('.carousel-slide').length;
    currentIndex = (currentIndex + step + totalSlides) % totalSlides;
    const offset = -currentIndex * 100;
    slides.style.transform = `translateX(${offset}%)`;
}
// loading home
// Lấy phần tử có id 'homeBtn'
document.getElementById('homeBtn').addEventListener('click', function(event) {
    // Ngăn chặn hành động mặc định của liên kết (như chuyển hướng)
    event.preventDefault();
    
    // Tải lại trang hiện tại
    location.reload();
});