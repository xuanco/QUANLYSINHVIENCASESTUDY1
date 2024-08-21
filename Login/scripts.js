// Hàm để mở/đóng thanh bên khi nhấn nút
document.getElementById('sidebar-toggle').addEventListener('click', function() {
    document.querySelector('.sidebar').classList.toggle('show');
});

// Hàm cuộn lên đầu trang khi nhấn nút
document.getElementById('scroll-to-top').addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Hàm để hiển thị hoặc ẩn nút cuộn lên đầu trang dựa trên vị trí cuộn
window.addEventListener('scroll', function() {
    var scrollToTopBtn = document.getElementById('scroll-to-top');
    if (window.scrollY > 300) { // Hiển thị nút khi cuộn xuống hơn 300px
        scrollToTopBtn.style.display = 'flex';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});

// Xử lý form đăng nhập
document.getElementById('login-form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Ngăn không cho form gửi dữ liệu đi

    // Lấy giá trị từ các ô input
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Điều kiện kiểm tra tên tài khoản
    const validUsernamePattern = /^(SV|GV)2024\d{4}$/;

    // Kiểm tra điều kiện của tên tài khoản
    if (!validUsernamePattern.test(username)) {
        alert("Tên tài khoản phải bắt đầu bằng SV hoặc GV, tiếp theo là 2024 và 4 số cuối.");
        return;
    }

    // Kiểm tra độ dài của mật khẩu
    if (password.length < 6) {
        alert("Mật khẩu phải có ít nhất 6 ký tự.");
        return;
    }

    // Gửi yêu cầu đăng nhập đến server
    try {
        const response = await fetch('http://localhost:3000/login', { // Thay đổi URL endpoint nếu cần
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        // Kiểm tra phản hồi từ server
        if (data.success) {
            // Chuyển hướng đến trang dựa trên tên tài khoản
            if (username.startsWith('GV')) {
                window.location.href = '/quanlycuagiangvien/index.html'; // Đường dẫn tới file HTML của giảng viên
            } else if (username.startsWith('SV')) {
                window.location.href = '/quanlycuasinhvien/index.html'; // Đường dẫn tới file HTML của sinh viên
            }
        } else {
            alert('Tên tài khoản hoặc mật khẩu không chính xác.');
        }
    } catch (error) {
        console.error('Lỗi:', error);
        alert('Có lỗi xảy ra khi đăng nhập.');
    }
});
