document.addEventListener('DOMContentLoaded', function () {
    // Xử lý mở/đóng thanh bên
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');

    if (sidebarToggle && sidebar) {
        // Bật/tắt hiển thị thanh bên khi nhấn nút chuyển đổi
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('show');
        });

        // Đóng thanh bên khi nhấn phím 'Escape'
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && sidebar.classList.contains('show')) {
                sidebar.classList.remove('show');
            }
        });

        // Đóng thanh bên khi nhấn bên ngoài thanh bên
        document.addEventListener('click', function(event) {
            if (!sidebar.contains(event.target) && !sidebarToggle.contains(event.target) && sidebar.classList.contains('show')) {
                sidebar.classList.remove('show');
            }
        });
    } else {
        console.error('Không tìm thấy thanh bên hoặc nút chuyển đổi.');
    }
});
