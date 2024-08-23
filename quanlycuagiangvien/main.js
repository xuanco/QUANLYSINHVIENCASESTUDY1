import { StudentManager } from './studentManager.js';
import { Student } from './student.js';

const studentManager = new StudentManager();

function convertDateFormat(dateStr, toDateFormat = true) {
    if (toDateFormat) {
        const parts = dateStr.includes('/') ? dateStr.split('/') : dateStr.split('-');
        if (parts.length === 3) {
            return `${parts[1]}/${parts[0]}/${parts[2]}`;
        }
    } else {
        const parts = dateStr.split('/');
        if (parts.length === 3) {
            return `${parts[1]}/${parts[0]}/${parts[2]}`;
        }
    }
    return dateStr;
}

document.addEventListener('DOMContentLoaded', () => {
    const storedStudents = JSON.parse(localStorage.getItem('students')) || [];
    storedStudents.forEach(studentData => {
        const student = new Student(studentData.id, studentData.name, convertDateFormat(studentData.dob, false), studentData.studentClass, studentData.imageUrl);
        studentManager.addStudent(student);
    });

    const students = [
        new Student('20247011', "Tạ Thị Thùy", convertDateFormat('07/02/2005'), '12KT1', 'images/anhthe1.jpg'),
        new Student('20247012', 'Đàm Kiều Trinh', convertDateFormat('05/02/2005'), '12KT2', 'images/anhthe2.jpg'),
        new Student('20247023', 'Phan Thị Ánh', convertDateFormat('22/01/2005'), '12KT3', 'images/anhthe3.jpg'),
        new Student('20247022', 'Bùi Tấn Tài', convertDateFormat('22/03/2005'), '12KT2', 'images/anhthe4.jpg'),
        new Student('20247039', 'Đoàn Trí Hưng', convertDateFormat('12/08/2005'), '12KT3', 'images/anhthe6.jpg'),
        new Student('20247025', 'Bùi Nhật Kim Anh', convertDateFormat('22/07/2005'), '12KT1', 'images/anhthe5.jpg')
    ];
    students.forEach(student => studentManager.addStudent(student));

    studentManager.sortStudentsByName();
    
    // Handle sidebar toggle
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');

    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('sidebar-active');
    });
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

    studentManager.addStudent(newStudent);

    this.reset();
    saveToLocalStorage();
});

// Xử lý sự kiện thêm lớp mới
document.getElementById('add-class-btn').addEventListener('click', function() {
    const newClass = prompt('Nhập tên lớp mới:');
    if (newClass && !document.querySelector(`#student-class option[value="${newClass}"]`)) {
        // Thêm lớp mới vào cả phần lọc lớp và chọn lớp
        const classOption = document.createElement('option');
        classOption.value = newClass;
        classOption.textContent = newClass;
        document.getElementById('student-class').appendChild(classOption);
        document.getElementById('sort-class-select').appendChild(classOption.cloneNode(true));
    }
});

// Xử lý sự kiện xóa sinh viên
document.querySelector('#student-table').addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-btn')) {
        const studentId = event.target.closest('tr').getAttribute('data-id');
        studentManager.removeStudent(studentId);
        saveToLocalStorage();
    }
    
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
                    dob: convertDateFormat(newDob),
                    studentClass: newStudentClass,
                    imageUrl: newImageUrl, 
                    id: newId 
                });
                studentManager.sortStudentsByName();
                saveToLocalStorage();
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
        studentManager.render();
    }
});

// Xử lý sự kiện cuộn trang
window.addEventListener('scroll', () => {
    const scrollToTopButton = document.getElementById('scroll-to-top');
    if (window.scrollY > 300) {
        scrollToTopButton.style.display = 'flex';
    } else {
        scrollToTopButton.style.display = 'none';
    }
});

document.getElementById('scroll-to-top').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

function saveToLocalStorage() {
    localStorage.setItem('students', JSON.stringify(studentManager.students));
}

// Xử lý sự kiện xóa lớp
document.getElementById('remove-class-btn').addEventListener('click', function() {
    const classToRemove = prompt('Nhập tên lớp cần xóa:');
    if (classToRemove) {
        // Xóa lớp khỏi danh sách lớp trong select
        const classSelect = document.getElementById('student-class');
        const sortClassSelect = document.getElementById('sort-class-select');
        
        // Xóa lớp khỏi phần chọn lớp
        const classOption = Array.from(classSelect.options).find(option => option.value === classToRemove);
        if (classOption) {
            classSelect.removeChild(classOption);
        }

        // Xóa lớp khỏi phần lọc lớp
        const sortClassOption = Array.from(sortClassSelect.options).find(option => option.value === classToRemove);
        if (sortClassOption) {
            sortClassSelect.removeChild(sortClassOption);
        }

        // Cập nhật danh sách sinh viên để loại bỏ sinh viên thuộc lớp bị xóa
        studentManager.students = studentManager.students.filter(student => student.studentClass !== classToRemove);
        studentManager.render();

        // Lưu lại vào Local Storage
        saveToLocalStorage();
    }
});
// Xử lý chuyển đổi hiển thị của thanh bên
document.getElementById('sidebar-toggle').addEventListener('click', function() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('show');
});