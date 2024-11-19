
const employeeIdElement = document.getElementById("employee_id");
const employeeNameElement = document.getElementById("employee_name");
const employeeContactElement = document.getElementById("employee_contact");
const employeeRoleElementOne = document.getElementById("user_role_one");
const employeeRoleElementTwo = document.getElementById("user_role_two");
const employeeAddressElement = document.getElementById("employee_address");
const employeePasswordElement = document.getElementById('employee_password');
const employeeConfirmPasswordElement = document.getElementById('employee_confrimPassword')

const tblEmployees = document.getElementById("tbl_employee_body");
const tblEmployeeRows = tblEmployees.getElementsByTagName("tr");

const excDownloadBtn = document.getElementById('employee_exc_download');
const csvDownloadBtn = document.getElementById('employee_csv_download');

const roleSelects = document.querySelectorAll('select');
const employeeSaveBtn = document.querySelector('#btn_save_employee');
const employeeUpdateBtn = document.getElementById('btn_update_employee');
const employeeDeleteBtn = document.getElementById('btn_delete_employee');

const popupEmployee = document.getElementById('open_changePassword_popup');
const btnOpenChangePassword = document.getElementById('btn_changePassword_popup');
const btnCloseChangePassword = document.getElementById('close_changePassword_popup');

const empChangePasswordId = document.getElementById('emp_changepassword_id');
const empCurrentPassword = document.getElementById('employee_currentPassword');
const empnewPassword = document.getElementById('employee_newPassword');
const empnewConfirmPassword = document.getElementById('employee_confirm_newPassword');
const changePasswordEmpName = document.getElementById('selectedEmployeeName');
const btnChangePassword = document.getElementById('btn_changePassword');


const newPasswordContainer = document.getElementById('change-input-container-b');
const confirmPasswordContainer = document.getElementById('change-input-container-c');

const employeeForm = document.querySelector("#employee_Form")

const employeePopupButtons = document.querySelectorAll(".emp-popup-keys");

const empBackgroundOverlay = document.querySelector(".empBackground");
const empSideNavBr = document.querySelector(".aside-nav-button-list");
const empNavbar = document.querySelector(".navbar")

let selectedEmpInput;

document.addEventListener('DOMContentLoaded', async function () {
    const baseUrl = await window.api.getBaseUrl();

    loadAllEmployees(baseUrl, page = 0, size = 10)

    excDownloadBtn.addEventListener('click', function () {
        downloadTableAsExcel('tbl_employee');

    });

    csvDownloadBtn.addEventListener('click', function () {
        downloadTableAsCSV('tbl_employee');
    });

    employeeSaveBtn.addEventListener('click', function () {
        employeeSaveBtn.disabled = true;   
        saveEmployee(baseUrl).finally(() => {
            employeeSaveBtn.disabled = false;
        });
    });

    employeeUpdateBtn.addEventListener('click', function () {
        updateEmployee(baseUrl);
    });

    employeeDeleteBtn.addEventListener('click', function () {
        deleteEmployee(baseUrl);
    });

    btnOpenChangePassword.addEventListener("click", function () {
        popupEmployee.style.display = 'block';
        empBackgroundOverlay.classList.add("overlay");
        empSideNavBr.style.pointerEvents = "none"
        empNavbar.style.pointerEvents = "none"
    });

    btnCloseChangePassword.addEventListener("click", function () {
        popupEmployee.style.display = 'none';
        empBackgroundOverlay.classList.remove("overlay")
        empSideNavBr.style.pointerEvents = "auto"
        empNavbar.style.pointerEvents = "auto"

    });

    btnChangePassword.addEventListener("click", function () {
        employeeChangePasswordEvent(baseUrl);


    });


    empnewPassword.addEventListener('input', function () {
        validatePassworda(this, newPasswordInvalidText, newPasswordValidIcon);
        validateConfirmPassworda();
    });

    empnewConfirmPassword.addEventListener('input', function () {
        validateConfirmPassworda();
    });



});


//---------download employee table excel,csv  event-------------
function downloadTableAsExcel(tableId) {
    const tbl = document.getElementById(tableId);
    const tblData = tableToSheet(tbl);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, tblData, 'Sheet1');
    XLSX.writeFile(wb, 'employees.xlsx');
}

function downloadTableAsCSV(tableId) {
    const tbl = document.getElementById(tableId);
    const tblData = tableToCSV(tbl);
    const blob = new Blob([tblData], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'employees.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function tableToSheet(table) {
    const tblRows = table.rows;
    const data = [];
    for (let i = 0; i < tblRows.length; i++) {
        const row = tblRows[i];
        const rowData = [];
        for (let j = 0; j < row.cells.length; j++) {
            rowData.push(row.cells[j].textContent);
        }
        data.push(rowData);
    }
    return XLSX.utils.aoa_to_sheet(data);
}

function tableToCSV(table) {
    let csv = '';
    const rows = table.rows;
    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].cells;
        for (let j = 0; j < cells.length; j++) {
            csv += cells[j].textContent + (j < cells.length - 1 ? ',' : '');
        }
        csv += '\n';
    }
    return csv;
}



//----------Validations-----------
function validateEmployeeName(employeeName) {
    return /^[a-zA-Z\s]+$/.test(employeeName);
}

function validateEmployeeContact(employeeContact) {
    return /^(070|071|074|075|076|077|078|072)[-]?[0-9]{7}$/.test(employeeContact);
}

function validateEmployeeAddress(employeeAddress) {
    return /^[A-Za-z0-9][A-Za-z0-9\s,./-]*$/.test(employeeAddress);
}

function validatePassword(password) {
    return /^.{3,12}$/.test(password);
}

function validateConfirmPassword(confirmPassword) {
    const password = document.getElementById('employee_password').value.trim();
    return confirmPassword === password;
}

const employeeInputs = document.querySelectorAll('.employee-input-field:not(#employee_id)');

employeeInputs.forEach(input => {
    const container = input.parentElement;
    const invalidText = document.createElement('p');
    invalidText.className = 'invalid-text';
    invalidText.innerHTML = 'Invalid <i class="fa-solid fa-circle-exclamation" style="color: #ff3300; padding: 5px;"></i>';
    invalidText.style.display = 'none';
    invalidText.style.color = '#ff3300';
    container.appendChild(invalidText);

    const validIcon = document.createElement('p');
    validIcon.className = 'valid-text';
    validIcon.innerHTML = '<i class="fa-solid fa-circle-check" style="color: #00cc00; padding: 5px;"></i>';
    validIcon.style.display = 'none';
    validIcon.style.color = 'green';
    container.appendChild(validIcon);

    input.addEventListener('input', checkEmployeeInputs);
});

function checkEmployeeInputs() {
    let anyInputEmpty = false;
    let allInputsValid = true;

    employeeInputs.forEach(input => {
        const container = input.parentElement;
        const value = input.value.trim();
        const invalidText = container.querySelector('.invalid-text');
        const validIcon = container.querySelector('.valid-text');

        if (value === '') {
            anyInputEmpty = true;
        }

        let valid = false;
        if (value !== '') {
            if (input.id === 'employee_name') {
                valid = validateEmployeeName(value);
            } else if (input.id === 'employee_contact') {
                valid = validateEmployeeContact(value);
            } else if (input.id === 'employee_address') {
                valid = validateEmployeeAddress(value);
            } else if (input.id === 'employee_password') {
                valid = validatePassword(value);

            } else if (input.id === 'employee_confrimPassword') {
                valid = validateConfirmPassword(value);


            }
            if (valid) {
                container.style.borderColor = '#00cc00';
                invalidText.style.display = 'none';
                if (validIcon) {
                    validIcon.style.display = 'inline-block';
                }
            } else {
                container.style.borderColor = 'red';
                invalidText.style.display = 'flex';
                if (validIcon) {
                    validIcon.style.display = 'none';
                }
                allInputsValid = false;
            }
        } else {
            container.style.borderColor = '';
            invalidText.style.display = 'none';
            if (validIcon) {
                validIcon.style.display = 'none';
            }
        }
    });

    if (employeeIdElement.value.trim() !== '') {
        employeeSaveBtn.disabled = true;
        employeeUpdateBtn.disabled = !allInputsValid;
        employeeDeleteBtn.disabled = !allInputsValid;
    } else if (anyInputEmpty || !allInputsValid) {
        employeeSaveBtn.disabled = true;
        employeeUpdateBtn.disabled = true;
        employeeDeleteBtn.disabled = true;
    } else {
        employeeSaveBtn.disabled = false;
        employeeUpdateBtn.disabled = true;
        employeeDeleteBtn.disabled = true;
    }
}



//----------Employee Save event-----------
async function saveEmployee(baseUrl) {
    try {
        const roleIds = await window.api.getRoleIds();

        if (!roleIds) {
            console.error("Role IDs not found in config.json");
            return;
        }

        // Validate roles
        if (employeeRoleElementOne.value === employeeRoleElementTwo.value) {
            Swal.fire({
                icon: 'warning',
                title: 'Role Conflict',
                text: 'The primary and secondary roles cannot be the same.',
                customClass: {
                    confirmButton: 'swal-button-orange',
                }
            });
            return; 
        }


        const employeeData = {
            userName: employeeNameElement.value,
            userContact: employeeContactElement.value,
            userPassword: employeeConfirmPasswordElement.value,
            tblAuthUserRolesDTOS: [
                {
                    id: "",
                    userRoleId: roleIds[employeeRoleElementOne.value],
                    userId: ""
                },
            ],
            userAddress: employeeAddressElement.value
        };

   
        if (employeeRoleElementTwo.value !== "Empty") {
            employeeData.tblAuthUserRolesDTOS.push({
                id: "",
                userRoleId: roleIds[employeeRoleElementTwo.value], 
                userId: ""
            });
        }

      
        const response = await fetch(`${baseUrl}/user/signUp`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("jwt")}`
            },
            body: JSON.stringify(employeeData)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

    
        const data = await response.json();
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Employee saved successfully!",
            showConfirmButton: false,
            timer: 1500
        });

        loadAllEmployees(baseUrl, page = 0, size = 10)
        resetEmployeeInput();
        checkEmployeeInputs();
        countAllEmployee(baseUrl);

    } catch (error) {
        console.error('Error saving employee:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'An error occurred while saving the employee. Please try again.',
        });
    }
}



employeeRoleElementOne.addEventListener('change', function () {
    const selectedRole = this.value;
    employeeRoleElementTwo.disabled = false;

    for (let i = 0; i < employeeRoleElementTwo.options.length; i++) {
        employeeRoleElementTwo.options[i].disabled = false;
    }
    const matchingOptionIndex = Array.from(employeeRoleElementTwo.options).findIndex(option => option.value === selectedRole);
    if (matchingOptionIndex !== -1) {
        employeeRoleElementTwo.options[matchingOptionIndex].disabled = true;
    }
});


//----------Employee update event-----------
async function updateEmployee(baseUrl) {
    try {
      
        const roleIds = await window.api.getRoleIds();

        if (!roleIds) {
            console.error("Role IDs not found in config.json");
            return;
        }

        if (employeeRoleElementOne.value === employeeRoleElementTwo.value) {
            Swal.fire({
                icon: 'warning',
                title: 'Role Conflict',
                text: 'The primary and secondary roles cannot be the same.',
                customClass: {
                    confirmButton: 'swal-button-orange',
                }
            });
            return; 
        }

       
        const currentUserId = localStorage.getItem("userId");
        const currentRole = localStorage.getItem("userRole");

   
        const employeeData = {
            userId: employeeIdElement.value,
            userName: employeeNameElement.value,
            userContact: employeeContactElement.value,
            userPassword: employeeConfirmPasswordElement.value,
            tblAuthUserRolesDTOS: [
                {
                    id: "",
                    userRoleId: roleIds[employeeRoleElementOne.value],
                    userId: ""
                },
            ],
            userAddress: employeeAddressElement.value
        };

     
        if (employeeRoleElementTwo.value !== "Empty") {
            employeeData.tblAuthUserRolesDTOS.push({
                id: "",
                userRoleId: roleIds[employeeRoleElementTwo.value],  
                userId: ""
            });
        }

  
        const { adminCount } = await loadAllEmployees(baseUrl, page = 0, size = 10); 
        const isRemovingAdmin = employeeData.userId === currentUserId &&
            employeeData.tblAuthUserRolesDTOS.every(role => role.userRoleId !== roleIds["Admin"]);

        if (adminCount <= 1 && isRemovingAdmin) {
            Swal.fire({
                icon: "warning",
                title: "Cannot Change Role",
                text: "There must be at least one Admin in the system.",
                showConfirmButton: true,
                confirmButtonText: "OK",
                customClass: {
                    confirmButton: 'swal-button-orange',
                }
            });
            return;
        }

   
        const response = await fetch(`${baseUrl}/user`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("jwt")}`
            },
            body: JSON.stringify(employeeData)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Employee updated successfully!",
            showConfirmButton: false,
            timer: 1500
        });
        btnOpenChangePassword.disabled = true

     
        if (isRemovingAdmin) {
            Swal.fire({
                title: "Role Updated",
                html: `
                <div style="color: var(--primary-color); font-size: 3rem; margin-bottom: 20px;">
                    <i class="fas fa-info-circle"></i>
                </div>
                <p>Your role has been updated. Please log in again.</p>
            `,
                showConfirmButton: true,
                confirmButtonText: "OK",
                customClass: {
                    confirmButton: 'swal-button-orange',
                    popup: 'swal-custom-height'
                }
            }).then(() => {
                localStorage.clear();
                window.location.href = "login.html";
            });
        } else {
     
            loadAllEmployees(baseUrl, page = 0, size = 10)
            resetEmployeeInput();
            checkEmployeeInputs();
        }

    } catch (error) {
        console.error('Error updating employee:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'An error occurred while updating the employee. Please try again.',
        });
    }
}





//----------Employee delete event-----------
async function deleteEmployee(baseUrl) {
    try {
        const { groupedEmployees, adminCount } = loadAllEmployees(baseUrl, page = 0, size = 10);

        const employeeId = employeeIdElement.value;
        const currentUserId = localStorage.getItem("userId");


        const employee = groupedEmployees[employeeId];
     //   console.log(employee.roles);

        if (!employee) {
            throw new Error('Employee not found');
        }

        const employeeIsAdmin = employee.roles.includes("Admin");

        const isDeletingSelf = employeeId === currentUserId;

        if (adminCount <= 1 && employeeIsAdmin) {
            Swal.fire({
                icon: "warning",
                title: "Cannot Delete Admin",
                text: "There must be at least one Admin in the system.",
                confirmButtonColor: "#EA6D27",
                confirmButtonText: "OK"
            });
            return;
        }

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#EA6D27",
            cancelButtonColor: "#101A24",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`${baseUrl}/user?userId=${employeeId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem("jwt")}`
                    },
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .then(data => {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Employee deleted successfully.",
                            icon: "success",
                            confirmButtonColor: "#EA6D27",
                            confirmButtonText: "OK"
                        });
                        btnOpenChangePassword.disabled = true
                        if (isDeletingSelf) {
                            Swal.fire({
                                title: "Account Deleted",
                                html: `
                                <div style="color: var(--primary-color); font-size: 3rem; margin-bottom: 20px;">
                                    <i class="fas fa-info-circle"></i>
                                </div>
                                <p>Your account has been deleted. Please log in again.</p>
                            `,
                                showConfirmButton: true,
                                confirmButtonText: "OK",
                                customClass: {
                                    confirmButton: 'swal-button-orange',
                                    popup: 'swal-custom-height'
                                }
                            }).then(() => {
                                localStorage.clear();
                                window.location.href = "login.html";
                            });

                        } else {
                           loadAllEmployees(baseUrl, page = 0, size = 10)
                            resetEmployeeInput();
                            checkEmployeeInputs();
                            countAllEmployee(baseUrl);
                        }
                    })
                    .catch(error => {
                        console.error('Error Deleting Employee:', error);
                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            text: "This employee may have already been deleted.",
                            confirmButtonColor: "#EA6D27",
                            confirmButtonText: "OK"
                        });
                    });
            }
        });
    } catch (error) {
        console.error('Error in deleteEmployee:', error);
        Swal.fire({
            icon: "error",
            title: "Error",
            text: error.message,
            confirmButtonColor: "#EA6D27",
            confirmButtonText: "OK"
        });
    }
}


//load all employee event
async function loadAllEmployees(baseUrl, page, size) {
    //console.log(page, size);

    try {
        const response = await fetch(`${baseUrl}/user/usersAndRoles?page=${page}&size=${size}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.statusText}`);
        }

        const employeesList = await response.json();
        //console.log(employeesList);

        let groupedEmployees = {};
        let adminCount = 0;

        employeesList.data.data.forEach(employee => {
            const employeeId = employee[0];
            const role = employee[6]?.trim();

            if (!groupedEmployees[employeeId]) {
                groupedEmployees[employeeId] = {
                    id: employeeId,
                    name: employee[1],
                    contact: employee[2],
                    roles: [],
                    address: employee[3],
                };
            }

            groupedEmployees[employeeId].roles.push(role);

            if (role === "Admin") {
                adminCount++;
            }
        });

        let employeeList = "";
        let rowNumber = page * size + 1;

        for (const employeeId in groupedEmployees) {
            const employee = groupedEmployees[employeeId];
            const roles = employee.roles.join(',');
            employeeList += `
                <tr>
                    <td>${rowNumber++}</td>
                    <td>${employee.id}</td>
                    <td>${employee.name}</td>
                    <td>${employee.contact}</td>
                    <td>${roles}</td>
                    <td>${employee.address}</td>
                </tr>
            `;
        }

        const employeeTableBody = document.getElementById("tbl_employee_body");
        employeeTableBody.innerHTML = employeeList;

        employeeTableClickEvenetHandle();
        const totalPages = employeesList.data.totalCount
        ? Math.ceil(employeesList.data.totalCount / size)
        : 10;
        updatePaginationControls(baseUrl, page, size,totalPages);

        return { groupedEmployees, adminCount };
    } catch (error) {
        console.error("Error loading employees:", error);
    }
}


//hanlde employee paginations
function updatePaginationControls(baseUrl, currentPage, pageSize, totalPages) {
    let paginationHtml = "";


    paginationHtml += `<button class="pagination-btn" data-page="${currentPage - 1}" ${currentPage === 0 ? "disabled" : ""}>Prev</button>`;

    
    if (totalPages <= 5) {
        for (let i = 0; i < totalPages; i++) {
            paginationHtml += `<button class="pagination-btn ${i === currentPage ? "active" : ""}" data-page="${i}">${i + 1}</button>`;
        }
    } else {
     
        paginationHtml += `<button class="pagination-btn ${currentPage === 0 ? "active" : ""}" data-page="0">1</button>`;

        if (currentPage > 2) {
            paginationHtml += `<span class="dots">...</span>`;
        }


        const startPage = Math.max(1, currentPage - 1);
        const endPage = Math.min(totalPages - 2, currentPage + 1);

        for (let i = startPage; i <= endPage; i++) {
            paginationHtml += `<button class="pagination-btn ${i === currentPage ? "active" : ""}" data-page="${i}">${i + 1}</button>`;
        }

       
        if (currentPage < totalPages - 3) {
            paginationHtml += `<span class="dots">...</span>`;
        }

     
        paginationHtml += `<button class="pagination-btn ${currentPage === totalPages - 1 ? "active" : ""}" data-page="${totalPages - 1}">${totalPages}</button>`;
    }

    // Next Button
    paginationHtml += `<button class="pagination-btn" data-page="${currentPage + 1}" ${currentPage >= totalPages - 1 ? "disabled" : ""}>Next</button>`;

    const paginationControls = document.getElementById("pagination-controls");
    paginationControls.innerHTML = paginationHtml;

    // Attach Click Event to Pagination Buttons
    const paginationButtons = document.querySelectorAll(".pagination-btn");
    paginationButtons.forEach(button => {
        button.addEventListener("click", function () {
            const selectedPage = parseInt(this.getAttribute("data-page"));
            if (selectedPage >= 0 && selectedPage < totalPages) {
                loadAllEmployees(baseUrl, selectedPage, pageSize);
            }
        });
    });
}








//----------Table Click Event-----------
function employeeTableClickEvenetHandle() {
    
    const tblEmployeeRows = document.querySelectorAll('#tbl_employee_body tr');
    for (let i = 0; i < tblEmployeeRows.length; i++) {
        tblEmployeeRows[i].addEventListener('click', function () {
            const cells = tblEmployeeRows[i].getElementsByTagName("td");
            const empId = cells[1].textContent;
            const empName = cells[2].textContent;
            const empContact = cells[3].textContent;
            const empRoles = cells[4].textContent.trim();
            const empAddress = cells[5].textContent;
            //const empPassword = getEmployeePassword(empId, employeesList); 

            const roles = empRoles.split(',');

            employeeRoleElementOne.value = roles[0];
            if (roles.length < 2) {
                employeeRoleElementTwo.value = "Empty";
            } else {
                employeeRoleElementTwo.value = roles[1];
            }

            employeeIdElement.value = empId;
            employeeNameElement.value = empName;
            employeeContactElement.value = empContact;
            employeeAddressElement.value = empAddress;
            // employeePasswordElement.value = empPassword; // Populate password input field


            employeePasswordElement.disabled = true;
            employeeConfirmPasswordElement.disabled = true;
            employeeRoleElementTwo.disabled = false;

            checkEmployeeInputs()

            // employeeUpdateBtn.disabled = false;
            // employeeDeleteBtn.disabled = false;
            btnOpenChangePassword.disabled = false;
            empChangePasswordId.value = employeeIdElement.value;
            changePasswordEmpName.innerHTML = employeeNameElement.value


        });
    }
    employeePasswordElement.disabled = false;
    employeeConfirmPasswordElement.disabled = false;


}

//----------Employee Change Password event-----------
async function employeeChangePasswordEvent(baseUrl) {
    const currentPassword = empCurrentPassword.value;
    const newPassword = empnewPassword.value;
    const confirmPassword = empnewConfirmPassword.value;


    if (newPassword !== confirmPassword) {
        alert('New password and confirm password do not match.');
        return;
    }

    const employeePasswordData = {
        userId: empChangePasswordId.value,
        currentPassword: currentPassword,
        newPassword: newPassword,
    };

    try {
        const response = await fetch(`${baseUrl}/user/updateUserPassword`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("jwt")}`
            },
            body: JSON.stringify(employeePasswordData)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
       // console.log(data);

        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Employee's password has been changed successfully!",
            showConfirmButton: false,
            timer: 1500
        });

        resetEmployeeInput();
        checkEmployeeInputs();
        empCurrentPassword.value = '';
        empnewPassword.value = '';
        empnewConfirmPassword.value = '';
        newPasswordInvalidText.style.display = 'none';
        newPasswordValidIcon.style.display = 'none';
        confirmPasswordInvalidText.style.display = 'none';
        confirmPasswordValidIcon.style.display = 'none';
        popupEmployee.style.display = 'none';
        empBackgroundOverlay.classList.remove("overlay")
        empSideNavBr.style.pointerEvents = "auto"
        empNavbar.style.pointerEvents = "auto"
        btnOpenChangePassword.disabled = true

    } catch (error) {
        console.error('Error changing password:', error);
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Failed to change password. Please try again!",
            customClass: {
                confirmButton: 'swal-button--orange'
            }
        });

        empCurrentPassword.value = '';
        empnewPassword.value = '';
        empnewConfirmPassword.value = '';
        newPasswordInvalidText.style.display = 'none';
        newPasswordValidIcon.style.display = 'none';
        confirmPasswordInvalidText.style.display = 'none';
        confirmPasswordValidIcon.style.display = 'none';
        popupEmployee.style.display = 'none';
        empBackgroundOverlay.classList.remove("overlay")
        empSideNavBr.style.pointerEvents = "auto"
        empNavbar.style.pointerEvents = "auto"

    }
}


function createErrorMessage() {
    const errorMessage = document.createElement('p');
    errorMessage.className = 'invalid-text';
    errorMessage.innerHTML = 'Invalid <i class="fa-solid fa-circle-exclamation" style="color: #ff3300; padding: 5px;"></i>';
    errorMessage.style.display = 'none';
    errorMessage.style.color = '#ff3300';
    return errorMessage;
}

// Function to create valid icon element
function createValidIcon() {
    const validIcon = document.createElement('p');
    validIcon.className = 'valid-text';
    validIcon.innerHTML = '<i class="fa-solid fa-circle-check" style="color: #00cc00; padding: 5px;"></i>';
    validIcon.style.display = 'none';
    validIcon.style.color = 'green';
    return validIcon;
}


const newPasswordInvalidText = createErrorMessage();
const newPasswordValidIcon = createValidIcon();
newPasswordContainer.appendChild(newPasswordInvalidText);
newPasswordContainer.appendChild(newPasswordValidIcon);


const confirmPasswordInvalidText = createErrorMessage();
const confirmPasswordValidIcon = createValidIcon();
confirmPasswordContainer.appendChild(confirmPasswordInvalidText);
confirmPasswordContainer.appendChild(confirmPasswordValidIcon);


const passwordPattern = /^.{3,12}$/;


function validatePassworda(inputa, invalidText, validIcon) {
    const value = inputa.value;
    const isValid = value.match(passwordPattern);

    if (!isValid) {
        invalidText.style.display = 'block';
        validIcon.style.display = 'none';
    } else {
        invalidText.style.display = 'none';
        validIcon.style.display = 'block';
    }

    return isValid;
}


function validateConfirmPassworda() {
    const confirmPassword = empnewConfirmPassword.value.trim();
    const newPassword = empnewPassword.value.trim();
    const confirmInvalidText = confirmPasswordInvalidText;
    const confirmValidIcon = confirmPasswordValidIcon;

    if (confirmPassword === newPassword && validatePassworda(empnewPassword, newPasswordInvalidText, newPasswordValidIcon)) {
        confirmInvalidText.style.display = 'none';
        confirmValidIcon.style.display = 'block';
    } else {
        confirmInvalidText.style.display = 'block';
        confirmValidIcon.style.display = 'none';
    }

    if (newPassword && confirmPassword && confirmPassword === newPassword &&
        validatePassworda(empnewPassword, newPasswordInvalidText, newPasswordValidIcon)) {
        btnChangePassword.disabled = false;

    } else {
        btnChangePassword.disabled = true;
    }
}





//------------reset inputs function-----------
function resetEmployeeInput() {
    employeeIdElement.value = '';
    employeeNameElement.value = '';
    employeeContactElement.value = '';
    employeeConfirmPasswordElement.value = '';
    employeePasswordElement.value = '';
    employeeAddressElement.value = '';

    employeeRoleElementOne.value = 'Admin';
    employeeRoleElementTwo.value = 'Empty';

    employeeRoleElementTwo.disabled = true;

    employeeInputs.forEach(input => {
        const container = input.parentElement;
        container.style.borderColor = '';
        const invalidText = container.querySelector('.invalid-text');
        const validIcon = container.querySelector('.valid-text');
        if (invalidText) invalidText.style.display = 'none';
        if (validIcon) validIcon.style.display = 'none';
    });

    employeeNameElement.focus();
}

employeeNameElement.addEventListener('input', EmployeeValidateInputs);
employeeContactElement.addEventListener('input', EmployeeValidateInputs);
employeeAddressElement.addEventListener('input', EmployeeValidateInputs);



function EmployeeValidateInputs() {
    const empName = employeeNameElement.value.trim();
    const empContact = employeeContactElement.value.trim();
    const empAddress = employeeAddressElement.value.trim();

    if (empName === '' && empContact === '' && empAddress === '') {
        employeeIdElement.value = '';
        employeeRoleElementOne.value = 'Admin'
        employeeRoleElementTwo.value = 'Empty'
        employeeRoleElementTwo.disabled = true
        employeePasswordElement.disabled = false
        employeeConfirmPasswordElement.disabled = false
        btnOpenChangePassword.disabled = true

    }
    checkEmployeeInputs()
}



//-------------------Employee Change password popup keyboard event-------------------

document.querySelector("#admin-keyboard-button-special").addEventListener("click", function () {

    toggleAdminEmployeeSymbolPopup()
})

document.querySelector("#admin-keyboard-button-abc").addEventListener("click", function () {
    toggleAdminEmployeeLettersPopup()
})

function toggleAdminEmployeeSymbolPopup() {
    const symbols = ['.', '@', '#', '/', ',', '-', '&', '*', '(', ')'];
    const buttons = document.querySelectorAll('.admin-keyboard-number-popup-emp');

    buttons.forEach(function (button, index) {
        if (button.textContent === '123') {
            button.textContent = symbols[index];
        } else if (button.textContent === symbols.join('')) {
            button.textContent = '123';
        } else {
            if (!isNaN(parseInt(button.textContent))) {
                button.textContent = symbols[index];
            } else {
                button.textContent = index === 9 ? '0' : (index + 1);
            }
        }
    });

    const symbolButtonPopup = document.querySelector("#admin-keyboard-special-popup");
    if (symbolButtonPopup.textContent === '123') {
        symbolButtonPopup.textContent = '!#*';
    } else {
        symbolButtonPopup.textContent = '123';
    }
}


function toggleAdminEmployeeLettersPopup() {
    const letterButtons = document.querySelectorAll('.admin-keyboard-button-popup:not(.admin-keyboard-button-backspace-popup):not(.admin-keyboard-button-dot-popup):not(.admin-keyboard-button-popup-space)');
    letterButtons.forEach(function (button) {
        if (button.textContent === 'abc?') {
            button.textContent = 'ABC?';
        } else if (button.textContent === 'ABC?') {
            button.textContent = 'abc?';
        } else {
            button.textContent = button.textContent === button.textContent.toUpperCase() ? button.textContent.toLowerCase() : button.textContent.toUpperCase();
        }
    });

}


employeePopupButtons.forEach(button => {
    button.addEventListener('click', handleEmpPopupKeyboardButtonClick);
});


function handleEmpPopupKeyboardButtonClick(event) {

    const keyboardButtonValue = event.target.textContent.trim();

    if (keyboardButtonValue === 'abc?' || keyboardButtonValue === '!#*' || keyboardButtonValue === 'ABC?' || keyboardButtonValue === '123') {
        return;
    }

    if (selectedEmpInput) {
        if (keyboardButtonValue.trim() === '←') {
            selectedEmpInput.value = selectedEmpInput.value.slice(0, -1);
        } else if (keyboardButtonValue === 'Space') {
            selectedEmpInput.value = selectedEmpInput.value + " ";
        } else if (keyboardButtonValue === '.') {
            selectedEmpInput.value += '.';
        } else {
            selectedEmpInput.value += keyboardButtonValue;
        }

        const inputEvent = new Event('input', {
            bubbles: true,
            cancelable: true,
        });
        selectedEmpInput.dispatchEvent(inputEvent);

      
    }
}

function selectEmpPopupInput(input) {
    selectedEmpInput = input;
}

empCurrentPassword.addEventListener('focus', function () {
    selectEmpPopupInput(empCurrentPassword);
});

empnewPassword.addEventListener('focus', function () {
    selectEmpPopupInput(empnewPassword);
});

empnewConfirmPassword.addEventListener('focus', function () {
    selectEmpPopupInput(empnewConfirmPassword);
});
