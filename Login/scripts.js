document.addEventListener('DOMContentLoaded', function() {
    // Hàm để mở/đóng thanh bên khi nhấn nút
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');

    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('show');
        });
    }

    // Hàm cuộn lên đầu trang khi nhấn nút
    const scrollToTopBtn = document.getElementById('scroll-to-top');

    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        // Hiển thị hoặc ẩn nút cuộn lên đầu trang dựa trên vị trí cuộn
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) { // Hiển thị nút khi cuộn xuống hơn 300px
                scrollToTopBtn.style.display = 'flex';
            } else {
                scrollToTopBtn.style.display = 'none';
            }
        });
    }

    // Xử lý đăng nhập
    const loginForm = document.getElementById('loginForm');
    const forgotPasswordLink = document.querySelector('a[href="#"]');
    const forgotPasswordSection = document.getElementById('forgot-password');
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');

    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Ngăn chặn việc gửi biểu mẫu mặc định

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const rememberMe = document.getElementById('rememberMe').checked;

            // Lấy danh sách người dùng từ Local Storage
            const users = JSON.parse(localStorage.getItem('users')) || [];

            // Kiểm tra thông tin đăng nhập
            const user = users.find(user => user.username === username && user.password === password);

            if (user) {
                if (rememberMe) {
                    localStorage.setItem('loggedInUser', JSON.stringify(user));
                } else {
                    sessionStorage.setItem('loggedInUser', JSON.stringify(user));
                }

                // Xác định đường dẫn chuyển hướng dựa trên vai trò
                let redirectUrl = '';
                if (username.startsWith('SV2024')) {
                    redirectUrl = '/quanlycuasinhvien/index.html'; // Đường dẫn cho sinh viên
                } else if (username.startsWith('GV2024')) {
                    redirectUrl = '/quanlycuagiangvien/index.html'; // Đường dẫn cho giảng viên
                } else {
                    alert('Tên đăng nhập không hợp lệ!');
                    return;
                }

                // Chuyển hướng đến trang quản lý phù hợp
                window.location.href = redirectUrl;
            } else {
                alert('Tên đăng nhập hoặc mật khẩu không đúng!');
            }
        });
    }

    // Xử lý hiển thị/ẩn form quên mật khẩu
    if (forgotPasswordLink && forgotPasswordSection) {
        forgotPasswordLink.addEventListener('click', function() {
            toggleForgotPassword();
        });
    }

    // Xử lý quên mật khẩu
    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Ngăn chặn việc gửi biểu mẫu mặc định

            const email = document.getElementById('email').value;
            // Xử lý gửi liên kết đặt lại mật khẩu (Giả định là bạn đã có backend xử lý việc này)
            alert('Đã gửi liên kết đặt lại mật khẩu tới email của bạn!');
            toggleForgotPassword(); // Ẩn form quên mật khẩu sau khi gửi
        });
    }
});

// Hàm để hiển thị/ẩn form quên mật khẩu
function toggleForgotPassword() {
    const forgotPasswordSection = document.getElementById('forgot-password');
    if (forgotPasswordSection) {
        forgotPasswordSection.style.display = forgotPasswordSection.style.display === 'none' || forgotPasswordSection.style.display === '' ? 'block' : 'none';
    }
}
