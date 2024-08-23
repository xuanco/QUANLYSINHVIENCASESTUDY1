// Giả sử có các chức năng để tải và hiển thị thông tin sinh viên
document.addEventListener('DOMContentLoaded', () => {
    loadStudentInfo();
    loadGrades();
});

function loadStudentInfo() {
    const studentDetails = document.getElementById('student-details');
    // Tải thông tin sinh viên từ Local Storage hoặc từ API
    const studentInfo = JSON.parse(localStorage.getItem('studentInfo')) || {
        name: 'Nguyễn Văn A',
        id: '20247001',
        dob: '01/01/2000',
        email: 'example@student.com',
        phone: '0123456789'
    };
    
    studentDetails.innerHTML = `
        <p><strong>Tên:</strong> ${studentInfo.name}</p>
        <p><strong>Mã sinh viên:</strong> ${studentInfo.id}</p>
        <p><strong>Ngày sinh:</strong> ${studentInfo.dob}</p>
        <p><strong>Email:</strong> ${studentInfo.email}</p>
        <p><strong>Số điện thoại:</strong> ${studentInfo.phone}</p>
    `;
}

function loadGrades() {
    const gradesDetails = document.getElementById('grades-details');
    // Tải thông tin điểm từ Local Storage hoặc từ API
    const grades = [
        { subject: 'Toán Cao Cấp', grade: 'A' },
        { subject: 'Lập Trình C', grade: 'B+' },
        { subject: 'Kinh Tế Vi Mô', grade: 'A-' }
    ];
    
    gradesDetails.innerHTML = grades.map(grade => `
        <p><strong>Môn học:</strong> ${grade.subject} - <strong>Điểm:</strong> ${grade.grade}</p>
    `).join('');
}
// Đóng thanh bên khi người dùng nhấp ra ngoài thanh bên
document.addEventListener('click', function(event) {
    if (!sidebar.contains(event.target) && !toggleButton.contains(event.target)) {
        sidebar.classList.remove('show');
    }
});

// Đóng thanh bên khi người dùng nhấn phím Escape
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        sidebar.classList.remove('show');
    }
});
// Xử lý sự kiện cuộn trang
window.addEventListener('scroll', () => {
    const scrollToTopButton = document.getElementById('scroll-to-top');
    if (window.scrollY > 300) { // Hiển thị nút khi cuộn xuống 300px
        scrollToTopButton.style.display = 'flex';
    } else {
        scrollToTopButton.style.display = 'none';
    }
});

// Xử lý sự kiện nhấp vào nút quay lên đầu trang
document.getElementById('scroll-to-top').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});