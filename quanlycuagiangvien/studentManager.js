export class StudentManager {
    constructor() {
        this.students = [];
    }

    addStudent(student) {
        if (this.isDuplicateId(student.id)) {
            this.showNotification('Mã sinh viên đã tồn tại!', 'error');
            return;
        }
        this.students.push(student);
        this.sortStudentsByName(); // Sắp xếp theo tên sau khi thêm
        this.render();
        this.showNotification('Thêm sinh viên thành công!');
    }

    removeStudent(studentId) {
        this.students = this.students.filter(student => student.id !== studentId);
        this.render();
        this.showNotification('Xóa sinh viên thành công!');
    }

    updateStudent(studentId, updatedData) {
        const student = this.students.find(student => student.id === studentId);
        if (student) {
            student.updateInfo(updatedData);
            this.sortStudentsByName(); // Sắp xếp theo tên sau khi cập nhật
            this.render();
            this.showNotification('Cập nhật thông tin sinh viên thành công!');
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
            const nameA = a.name.split(' ').pop().toUpperCase(); 
            const nameB = b.name.split(' ').pop().toUpperCase(); 
            return nameA.localeCompare(nameB);
        });
        this.render();
    }

    sortStudentsByClass() {
        this.students.sort((a, b) => {
            const classA = a.studentClass.toUpperCase();
            const classB = b.studentClass.toUpperCase();
            return classA.localeCompare(classB);
        });
        this.render();
    }

    isDuplicateId(studentId) {
        return this.students.some(student => student.id === studentId);
    }

    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}

