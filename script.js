document.addEventListener("DOMContentLoaded", () => {
    const submitBtn = document.getElementById("button");
    const tableBody = document.getElementById("tbody");
    const clearAllBtn = document.getElementById("buttonAll");

    // Load saved records from Local Storage
    loadStudentRecords();

    submitBtn.addEventListener("click", (event) => {
        event.preventDefault();

        // Get form values
        const studentId = document.getElementById("studentId").value.trim();
        const studentName = document.getElementById("studentName").value.trim();
        const studentEmail = document.getElementById("studentEmail").value.trim();
        const studentContact = document.getElementById("studentContact").value.trim();
        const courseName = document.getElementById("courseName").value;

        // Validate inputs
        if (!validateInputs(studentId, studentName, studentEmail, studentContact)) {
            return;
        }

        // Create student object
        const student = {
            id: studentId,
            name: studentName,
            email: studentEmail,
            contact: studentContact,
            course: courseName
        };

        // Save to Local Storage
        saveStudentRecord(student);

        // Append row to table
        addStudentRow(student);

        // Clear form fields after submitting
        document.querySelector("form").reset();
    });

    // Handle delete & edit actions
    tableBody.addEventListener("click", (event) => {
        const row = event.target.closest("tr");
        const studentId = row.cells[0].innerText;

        // Delete row functionality
        if (event.target.classList.contains("delete-btn")) {
            row.remove();
            removeStudentRecord(studentId);
        }

        // Edit row functionality
        if (event.target.classList.contains("edit-btn")) {
            editStudentRecord(row);
        }
    });

    // Clear all data
    clearAllBtn.addEventListener("click", () => {
        tableBody.innerHTML = "";
        localStorage.removeItem("students");
    });

    // Validate input fields
    function validateInputs(id, name, email, contact) {
        const idPattern = /^[0-9]+$/;
        const namePattern = /^[a-zA-Z ]+$/;
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const contactPattern = /^[0-9]+$/;

        if (!id.match(idPattern)) {
            alert("Student ID must be numeric.");
            return false;
        }
        if (!name.match(namePattern)) {
            alert("Student name must contain only letters.");
            return false;
        }
        if (!email.match(emailPattern)) {
            alert("Enter a valid email address.");
            return false;
        }
        if (!contact.match(contactPattern)) {
            alert("Contact number must be numeric.");
            return false;
        }
        return true;
    }
    document.getElementById("studentContact").addEventListener("input", function () {
    let phoneNumber = this.value;

    // Check if the first digit is NOT 6, 7, 8, or 9
    if (phoneNumber.length > 0 && !/^[6-9]/.test(phoneNumber)) {
        alert("Mobile number must start with 6, 7, 8, or 9.");
        this.value = ""; // Clear the input field
    }
    });

    // Save records to local storage
    function saveStudentRecord(student) {
        let students = JSON.parse(localStorage.getItem("students")) || [];
        students.push(student);
        localStorage.setItem("students", JSON.stringify(students));
    }

    // Remove record from local storage
    function removeStudentRecord(studentId) {
        let students = JSON.parse(localStorage.getItem("students")) || [];
        students = students.filter(student => student.id !== studentId);
        localStorage.setItem("students", JSON.stringify(students));
    }

    // Load records from local storage
    function loadStudentRecords() {
        let students = JSON.parse(localStorage.getItem("students")) || [];
        students.forEach(student => addStudentRow(student));
    }

    // Add student row dynamically
    function addStudentRow(student) {
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td class="border border-blue-800 py-3 px-5">${student.id}</td>
            <td class="border border-blue-800 py-3 px-5">${student.name}</td>
            <td class="border border-blue-800 py-3 px-5">${student.email}</td>
            <td class="border border-blue-800 py-3 px-5">${student.contact}</td>
            <td class="border border-blue-800 py-3 px-5">${student.course}</td>
            <td class="border border-blue-800 py-3 px-5">
                <button class="bg-yellow-500 text-white px-3 py-1 rounded-md edit-btn">Edit</button>
                <button class="bg-red-500 text-white px-3 py-1 rounded-md delete-btn">Delete</button>
            </td>
        `;
        tableBody.appendChild(newRow);
        updateScrollBar();
    }

    // Enable editing
    function editStudentRecord(row) {
        document.getElementById("studentId").value = row.cells[0].innerText;
        document.getElementById("studentName").value = row.cells[1].innerText;
        document.getElementById("studentEmail").value = row.cells[2].innerText;
        document.getElementById("studentContact").value = row.cells[3].innerText;
        document.getElementById("courseName").value = row.cells[4].innerText;

        row.remove();
        removeStudentRecord(row.cells[0].innerText);
    }

    // Enable scrollbar dynamically
    function updateScrollBar() {
        tableBody.parentElement.style.overflowY = "auto";
        tableBody.parentElement.style.maxHeight = "500px";
    }
});
