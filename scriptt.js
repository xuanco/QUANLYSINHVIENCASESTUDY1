// Lấy các phần tử cần thiết
const loginBtn = document.getElementById('loginBtn');
const loginPopup = document.getElementById('loginPopup');
const closeBtn = document.querySelector('.close');

// Hiển thị popup khi nhấn nút đăng nhập
loginBtn.addEventListener('click', () => {
    loginPopup.style.display = 'flex';
});

// Đóng popup khi nhấn nút đóng
closeBtn.addEventListener('click', () => {
    loginPopup.style.display = 'none';
});

// Đóng popup khi nhấn ra ngoài
window.addEventListener('click', (event) => {
    if (event.target === loginPopup) {
        loginPopup.style.display = 'none';
    }
});
