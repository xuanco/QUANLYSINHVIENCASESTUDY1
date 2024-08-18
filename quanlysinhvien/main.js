import { StudentManager } from './studentManager.js';
import { Student } from './student.js';

const studentManager = new StudentManager();

// Hàm để chuyển đổi định dạng ngày từ mm/dd/yyyy hoặc mm-dd-yyyy sang dd/mm/yyyy và ngược lại
function convertDateFormat(dateStr, toDateFormat = true) {
    if (toDateFormat) {
        // Chuyển đổi từ mm/dd/yyyy hoặc mm-dd-yyyy sang dd/mm/yyyy
        const parts = dateStr.includes('/') ? dateStr.split('/') : dateStr.split('-');
        if (parts.length === 3) {
            return `${parts[1]}/${parts[0]}/${parts[2]}`;
        }
    } else {
        // Chuyển đổi từ dd/mm/yyyy sang mm/dd/yyyy hoặc mm-dd-yyyy
        const parts = dateStr.split('/');
        if (parts.length === 3) {
            return `${parts[1]}/${parts[0]}/${parts[2]}`;
        }
    }
    return dateStr; // Trả về ngày gốc nếu không đúng định dạng
}

// Tải dữ liệu từ Local Storage khi trang được tải
document.addEventListener('DOMContentLoaded', () => {
    const storedStudents = JSON.parse(localStorage.getItem('students')) || [];
    storedStudents.forEach(studentData => {
        const student = new Student(studentData.id, studentData.name, convertDateFormat(studentData.dob, false), studentData.studentClass, studentData.imageUrl);
        studentManager.addStudent(student);
    });

    // Khởi tạo sinh viên mặc định
    const students = [
        new Student('20247011', "Tạ Thị Thùy", convertDateFormat('07/02/2005'), '12KT1', '/images/anhthe1.jpg'),
        new Student('20247012', 'Đàm Kiều Trinh', convertDateFormat('05/02/2005'), '12KT2', '/images/anhthe2.jpg'),
        new Student('20247023', 'Phan Thị Ánh', convertDateFormat('22/01/2005'), '12KT3', '/images/anhthe3.jpg'),
        new Student('20247022', 'Bùi Tấn Tài', convertDateFormat('22/03/2005'), '12KT2', '/images/anhthe4.jpg'),
        new Student('20247039', 'Đoàn Trí Hưng', convertDateFormat('12/08/2005'), '12KT3', '/images/anhthe6.jpg'),
        new Student('20247025', 'Bùi Nhật Kim Anh', convertDateFormat('22/07/2005'), '12KT1', '/images/anhthe5.jpg')
    ];
    students.forEach(student => studentManager.addStudent(student));

    // Sắp xếp sinh viên sau khi thêm xong
    studentManager.sortStudentsByName();
});

// Xử lý sự kiện thêm sinh viên
document.getElementById('student-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const id = document.getElementById('student-id').value;
    const name = document.getElementById('student-name').value;
    const dob = document.getElementById('student-dob').value;
    const studentClass = document.getElementById('student-class').value;
    const imageUrl = document.getElementById('student-image').value;

    const newStudent = new Student(id, name, convertDateFormat(dob), studentClass, imageUrl);

    // Thêm sinh viên và kiểm tra trùng lặp ID
    studentManager.addStudent(newStudent);

    this.reset(); // Reset form fields
    saveToLocalStorage(); // Lưu dữ liệu vào Local Storage
});

// Xử lý sự kiện xóa sinh viên
document.querySelector('#student-table').addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-btn')) {
        const studentId = event.target.closest('tr').getAttribute('data-id');
        studentManager.removeStudent(studentId);
        saveToLocalStorage(); // Lưu dữ liệu vào Local Storage
    }
    
    // Xử lý sự kiện chỉnh sửa sinh viên
    if (event.target.classList.contains('edit-btn')) {
        const studentId = event.target.closest('tr').getAttribute('data-id');
        const student = studentManager.students.find(student => student.id === studentId);

        if (student) {
            const newName = prompt('Nhập tên mới:', student.name);
            const newDob = prompt('Nhập ngày sinh mới (mm-dd-yyyy):', convertDateFormat(student.dob, false));
            const newStudentClass = prompt('Nhập lớp mới:', student.studentClass);
            const newImageUrl = prompt('Nhập URL hình ảnh mới:', student.imageUrl);
            const newId = prompt('Nhập mã số sinh viên mới:', student.id);

            if (newName && newDob && newStudentClass && newImageUrl && newId) {
                studentManager.updateStudent(studentId, { 
                    name: newName, 
                    dob: convertDateFormat(newDob), // Chuyển đổi định dạng ngày
                    studentClass: newStudentClass,
                    imageUrl: newImageUrl, 
                    id: newId 
                });
                studentManager.sortStudentsByName(); // Sắp xếp danh sách theo tên sau khi chỉnh sửa
                saveToLocalStorage(); // Lưu dữ liệu vào Local Storage
            }
        }
    }
});

// Tìm kiếm trực tiếp
document.getElementById('search-input').addEventListener('input', () => {
    const query = document.getElementById('search-input').value;
    studentManager.searchStudents(query);
});

// Xử lý sự kiện sắp xếp danh sách sinh viên
document.getElementById('sort-name-btn').addEventListener('click', () => {
    studentManager.sortStudentsByName();
});

document.getElementById('sort-class-select').addEventListener('change', (event) => {
    const selectedClass = event.target.value;
    if (selectedClass) {
        const filteredStudents = studentManager.students.filter(student => student.studentClass === selectedClass);
        studentManager.render(filteredStudents);
    } else {
        studentManager.render(); // Hiển thị tất cả sinh viên nếu không chọn lớp
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

// Lưu dữ liệu vào Local Storage
function saveToLocalStorage() {
    const students = studentManager.students.map(student => ({
        id: student.id,
        name: student.name,
        dob: convertDateFormat(student.dob), // Chuyển đổi định dạng ngày trước khi lưu
        studentClass: student.studentClass,
        imageUrl: student.imageUrl
    }));
    localStorage.setItem('students', JSON.stringify(students));
}

// Lấy các phần tử cần thiết cho đăng nhập
const loginBtn = document.getElementById('loginBtn');
const loginPopup = document.getElementById('loginPopup');
const closeBtns = document.querySelectorAll('.close');

// Hiển thị popup khi nhấn nút đăng nhập
loginBtn.addEventListener('click', () => {
    loginPopup.style.display = 'flex';
});

// Lấy các phần tử cần thiết cho đăng ký
const registerBtn = document.getElementById('registerBtn');
const registerPopup = document.getElementById('registerPopup');

// Hiển thị popup khi nhấn nút đăng ký
registerBtn.addEventListener('click', () => {
    registerPopup.style.display = 'flex';
});

// Đóng popup khi nhấn nút đóng cho cả đăng nhập và đăng ký
closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        loginPopup.style.display = 'none';
        registerPopup.style.display = 'none';
    });
});

// Đóng popup khi nhấn ra ngoài
window.addEventListener('click', (event) => {
    if (event.target === loginPopup) {
        loginPopup.style.display = 'none';
    } else if (event.target === registerPopup) {
        registerPopup.style.display = 'none';
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.getElementById('sidebar-toggle'); // Đổi tên từ 'toggle-sidebar' thành 'sidebar-toggle'
    const sidebar = document.querySelector('.sidebar');

    toggleButton.addEventListener('click', function() {
        sidebar.classList.toggle('show');
    });

    // Đóng thanh bên khi người dùng nhấp ra ngoài thanh bên (nếu cần)
    document.addEventListener('click', function(event) {
        if (!sidebar.contains(event.target) && !toggleButton.contains(event.target)) {
            sidebar.classList.remove('show');
        }
    });
});
// Ví dụ: Điều hướng đến trang Quản Lý Sinh Viên khi người dùng nhấn vào liên kết tương ứng
document.getElementById("studentManagementLink").addEventListener("click", function() {
    window.location.href = "studentManagement.html";
});
