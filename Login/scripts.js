document.addEventListener('DOMContentLoaded', function() {
    // Hàm để mở/đóng thanh bên khi nhấn nút
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');

    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            if (sidebar) {
                sidebar.classList.toggle('show');
            }
        });
    }

    // Hàm cuộn lên đầu trang khi nhấn nút
    const scrollToTopBtn = document.getElementById('scroll-to-top');

    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Hàm để hiển thị hoặc ẩn nút cuộn lên đầu trang dựa trên vị trí cuộn
    window.addEventListener('scroll', function() {
        if (scrollToTopBtn) {
            if (window.scrollY > 300) { // Hiển thị nút khi cuộn xuống hơn 300px
                scrollToTopBtn.style.display = 'flex';
            } else {
                scrollToTopBtn.style.display = 'none';
            }
        }
    });

    // Xử lý form đăng nhập
    const loginForm = document.getElementById('login-form');

    if (loginForm) {
        loginForm.addEventListener('submit', async function(event) {
            event.preventDefault();

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // Kiểm tra điều kiện của tên tài khoản
            const validUsernamePattern = /^(SV|GV)2024\d{4}$/;

            if (!validUsernamePattern.test(username)) {
                alert("Tên tài khoản phải bắt đầu bằng SV hoặc GV, tiếp theo là 2024 và 4 số cuối.");
                return;
            }

            if (password.length < 6) {
                alert("Mật khẩu phải có ít nhất 6 ký tự.");
                return;
            }

            // Gửi yêu cầu đăng nhập đến server
            try {
                const response = await fetch('http://localhost:3000/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username, password })
                });

                const data = await response.json();

                if (data.success) {
                    if (username.startsWith('GV')) {
                        window.location.href = '/quanlycuagiangvien/index.html';
                    } else if (username.startsWith('SV')) {
                        window.location.href = '/quanlycuasinhvien/index.html';
                    }
                } else {
                    alert('Tên tài khoản hoặc mật khẩu không chính xác.');
                }
            } catch (error) {
                console.error('Lỗi:', error);
                alert('Có lỗi xảy ra khi đăng nhập.');
            }
        });
    }
});
