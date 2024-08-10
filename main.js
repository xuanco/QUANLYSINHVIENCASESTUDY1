import { StudentManager } from './studentManager.js';
import { Student } from './student.js';

const studentManager = new StudentManager();

// Tải dữ liệu từ Local Storage khi trang được tải
document.addEventListener('DOMContentLoaded', () => {
    const storedStudents = JSON.parse(localStorage.getItem('students')) || [];
    storedStudents.forEach(studentData => {
        const student = new Student(studentData.id, studentData.name, studentData.dob, studentData.studentClass, studentData.imageUrl);
        studentManager.addStudent(student);
    });

    // Khởi tạo sinh viên mặc định
    const students = [
        new Student('20247011', "Tạ Thị Thùy", '07/02/2005', '12KT1', 'images/anhthe1.jpg'),
        new Student('20247012', 'Đàm Kiều Trinh', '05/02/2005', '12KT2', 'images/anhthe2.jpg'),
        new Student('20247023', 'Bùi Thị Ánh', '22/01/2005', '12KT3', 'images/anhthe3.jpg'),
        new Student('20247025', 'Bùi Tấn Tài', '22/03/2005', '12KT2', 'images/anhthe4.jpg')
    ];
    students.forEach(student => studentManager.addStudent(student));

    // Tạo sinh viên ngẫu nhiên nếu cần
    // studentManager.generateRandomStudents(3);
});

// Xử lý sự kiện thêm sinh viên
document.getElementById('student-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const id = document.getElementById('student-id').value;
    const name = document.getElementById('student-name').value;
    const dob = document.getElementById('student-dob').value;
    const studentClass = document.getElementById('student-class').value;
    const imageUrl = document.getElementById('student-image').value;

    const newStudent = new Student(id, name, dob, studentClass, imageUrl);
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
            const newDob = prompt('Nhập ngày sinh mới (YYYY-MM-DD):', student.dob);
            const newStudentClass = prompt('Nhập lớp mới:', student.studentClass);
            const newImageUrl = prompt('Nhập URL hình ảnh mới:', student.imageUrl);
            const newId = prompt('Nhập mã số sinh viên mới:', student.id);

            if (newName && newDob && newStudentClass && newImageUrl && newId) {
                studentManager.updateStudent(studentId, { 
                    name: newName, 
                    dob: newDob, 
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

// Xử lý sự kiện tìm kiếm sinh viên
document.getElementById('search-btn').addEventListener('click', () => {
    const query = document.getElementById('search-input').value;
    studentManager.searchStudents(query);
});

// Xử lý sự kiện sắp xếp danh sách sinh viên
document.getElementById('sort-btn').addEventListener('click', () => {
    studentManager.sortStudentsByName();
});

// Lưu dữ liệu vào Local Storage
function saveToLocalStorage() {
    const students = studentManager.students.map(student => ({
        id: student.id,
        name: student.name,
        dob: student.dob,
        studentClass: student.studentClass,
        imageUrl: student.imageUrl
    }));
    localStorage.setItem('students', JSON.stringify(students));
}
