import { Student } from './student.js';

const maleNames = ['Nguyễn Văn A', 'Trần Văn B', 'Lê Văn C', 'Phạm Văn D'];
const femaleNames = ['Nguyễn Thị E', 'Trần Thị F', 'Lê Thị G', 'Phạm Thị H'];
const classes = ['KT01', 'KT02', 'KT03', 'KT04'];

export class StudentManager {
    constructor() {
        this.students = [];
    }

    addStudent(student) {
        this.students.push(student);
        this.sortStudentsByName(); // Sắp xếp sau khi thêm sinh viên
        this.render();
    }

    removeStudent(studentId) {
        this.students = this.students.filter(student => student.id !== studentId);
        this.render();
    }

    updateStudent(studentId, updatedData) {
        const student = this.students.find(student => student.id === studentId);
        if (student) {
            student.updateInfo(updatedData);
            this.sortStudentsByName(); // Sắp xếp sau khi cập nhật thông tin
            this.render();
        }
    }

    searchStudents(query) {
        const filteredStudents = this.students.filter(student =>
            student.name.toLowerCase().includes(query.toLowerCase()) ||
            student.id.toLowerCase().includes(query.toLowerCase()) ||
            student.studentClass.toLowerCase().includes(query.toLowerCase())
        );
        this.render(filteredStudents);
    }

    render(studentsToRender = this.students) {
        const tableBody = document.querySelector('#student-table tbody');
        tableBody.innerHTML = '';
        studentsToRender.forEach(student => {
            tableBody.innerHTML += student.toTableRow();
        });
    }

    generateRandomStudents(count) {
        for (let i = 0; i < count; i++) {
            const id = `SV${(Math.random() * 10000).toFixed(0).padStart(4, '0')}`;
            
            const isMale = Math.random() > 0.5;
            const name = isMale ? 
                maleNames[Math.floor(Math.random() * maleNames.length)] : 
                femaleNames[Math.floor(Math.random() * femaleNames.length)];
            
            const dob = new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString().split('T')[0];
            
            const studentClass = classes[Math.floor(Math.random() * classes.length)];
            
            const imageUrl = `https://randomuser.me/api/portraits/lego/${Math.floor(Math.random() * 10)}.jpg`;
            
            const student = new Student(id, name, dob, studentClass, imageUrl);
            this.addStudent(student);
        }
    }

    sortStudentsByName() {
        this.students.sort((a, b) => {
            const nameA = a.name.toUpperCase();
            const nameB = b.name.toUpperCase();
            return nameA.localeCompare(nameB);
        });
        this.render();
    }
}
