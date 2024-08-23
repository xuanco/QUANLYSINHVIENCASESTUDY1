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
    const registrationForm = document.getElementById('registrationForm');

    registrationForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Ngăn chặn việc gửi biểu mẫu mặc định

        // Lấy dữ liệu từ biểu mẫu
        const fullname = document.getElementById('fullname').value;
        const email = document.getElementById('email').value;
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm_password').value;
        const gender = document.getElementById('gender').value;
        const birthdate = document.getElementById('birthdate').value;
        const phone = document.getElementById('phone').value;
        const address = document.getElementById('address').value;
        const role = document.getElementById('role').value;

        // Kiểm tra mật khẩu và xác nhận mật khẩu
        if (password !== confirmPassword) {
            alert('Mật khẩu xác nhận không khớp!');
            return;
        }

        // Kiểm tra định dạng tên tài khoản
        const usernamePattern = role === 'student' 
            ? /^SV2024\d{4}$/ 
            : /^GV2024\d{4}$/;

        if (!usernamePattern.test(username)) {
            alert('Tên đăng nhập không hợp lệ. Đối với sinh viên phải bắt đầu bằng "SV2024" và có 4 ký tự số cuối cùng. Đối với giảng viên phải bắt đầu bằng "GV2024" và có 4 ký tự số cuối cùng.');
            return;
        }

        // Kiểm tra độ dài mật khẩu
        if (password.length < 6) {
            alert('Mật khẩu phải có ít nhất 6 ký tự.');
            return;
        }

        // Tạo đối tượng người dùng
        const user = {
            fullname,
            email,
            username,
            password,
            gender,
            birthdate,
            phone,
            address,
            role
        };

        // Lưu người dùng vào Local Storage
        let users = JSON.parse(localStorage.getItem('users')) || [];
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));

        // Thông báo thành công hoặc chuyển hướng
        alert('Đăng ký thành công!');
        window.location.href = '/Login/index.html'; // Chuyển hướng đến trang đăng nhập
    });
});
