// Xử lý chuyển đổi hiển thị của thanh bên
document.getElementById('sidebar-toggle').addEventListener('click', function() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('show');
});

// Chức năng cuộn lên đầu trang
document.getElementById('scroll-to-top').addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Hiển thị/Ẩn nút cuộn lên đầu trang dựa trên vị trí cuộn
window.addEventListener('scroll', function() {
    const scrollButton = document.getElementById('scroll-to-top');
    if (window.scrollY > 300) {
        scrollButton.style.display = 'block';
    } else {
        scrollButton.style.display = 'none';
    }
});

// Đảm bảo nút chuyển đổi thanh bên có thể truy cập được
document.getElementById('sidebar-toggle').addEventListener('keydown', function(event) {
    if (event.key === 'Enter' || event.key === ' ') {
        this.click();
    }
});

// Xử lý form đăng ký
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Ngăn chặn gửi form mặc định

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm_password').value;
        const role = document.getElementById('role').value;

        // Kiểm tra định dạng tên tài khoản
        if (!/^((SV)|(GV))2024\d{4}$/.test(username)) {
            alert('Tên tài khoản phải bắt đầu bằng "SV" hoặc "GV", tiếp theo là "2024" và 4 ký tự số.');
            return;
        }

        // Kiểm tra mật khẩu
        if (password.length < 6) {
            alert('Mật khẩu phải có ít nhất 6 ký tự.');
            return;
        }

        if (password !== confirmPassword) {
            alert('Mật khẩu và xác nhận mật khẩu không khớp.');
            return;
        }

        // Kiểm tra tên tài khoản đã tồn tại
        let existingUsers = JSON.parse(localStorage.getItem('users')) || [];
        if (existingUsers.find(user => user.username === username)) {
            alert('Tên tài khoản đã tồn tại.');
            return;
        }

        // Gửi yêu cầu đăng ký đến server
        try {
            const response = await fetch('http://localhost:3000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password, role })
            });

            const data = await response.json();

            if (data.success) {
                // Lưu thông tin người dùng vào Local Storage
                existingUsers.push({ username, password, role });
                localStorage.setItem('users', JSON.stringify(existingUsers));

                // Chuyển hướng đến trang add.html
                window.location.href = '/signup/add.html';
            } else {
                alert('Đăng ký thất bại.');
            }
        } catch (error) {
            console.error('Lỗi:', error);
        }
    });
});

