
const customerIdElement = document.getElementById("customer_id");
const customerNameElement = document.getElementById("customer_name");
const customerContactElement = document.getElementById("customer_contact");
const customerCreditStatuslement = document.getElementById("customer_credit_status");

const customerSaveBtn = document.getElementById("btn_save_customer");
const customerUpdateBtn = document.getElementById("btn_update_customer");
const customerDeleteBtn = document.getElementById("btn_delete_customer");

const customerInputs = document.querySelectorAll('.customer-input-field');


const tblCustomers = document.getElementById("tbl_customer_body");
const tblCustomerRows = tblCustomers.getElementsByTagName("tr");

document.addEventListener('DOMContentLoaded', async function () {
    const baseUrl = await window.api.getBaseUrl();

    customerNameElement.focus();
    loadAllCustomerToTable(baseUrl,page = 0, size = 8);

    document.querySelector("#search_customer_contact").addEventListener("input", () => {
        customerFilterTable(baseUrl);
    });

    customerSaveBtn.addEventListener('click', function () {
        saveCustomer(baseUrl)
    });

    customerUpdateBtn.addEventListener('click', function () {
        upadateCustomer(baseUrl)
    })

    customerDeleteBtn.addEventListener('click', function () {
        deleteCustomer(baseUrl)
    });

})


//customer search event
async function customerFilterTable(baseUrl, size = 6) {
    try {
        const searchedCustomer = document.querySelector("#search_customer_contact").value.trim();

        const customerTableBody = document.querySelector("#tbl_customer_body");
        customerTableBody.innerHTML = "";

        let page = 0;
        let found = false;

        while (!found) {
            const response = await fetch(`${baseUrl}/customer/paged?page=${page}&size=${size}`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch customer data");
            }

            const result = await response.json();
            const customers = result.data.data;

            const filteredCustomers = customers.filter((customer) =>
                customer.cusMobileNo.includes(searchedCustomer)
            );

            if (filteredCustomers.length > 0) {
                found = true;

                let rowNumber = 1;
                filteredCustomers.forEach((customer) => {
                    const creditStatus = customer.creditStatus;
                    const statusColor = creditStatus === "Disabled" ? "#101A24" : "#EA6D27";
                    const isDisabled = customer.cusId === 1 && customer.cusName === "unKnown";

                    const row = document.createElement("tr");
                    if (isDisabled) {
                        row.classList.add("disabled-row");
                    }

                    row.innerHTML = `
                        <td>${rowNumber++}</td>
                        <td>${customer.cusId}</td>
                        <td>${customer.cusName}</td>
                        <td>${customer.cusMobileNo}</td>
                        <td style="color: ${statusColor}">${creditStatus}</td>
                    `;

                    customerTableBody.appendChild(row);
                });
            }

            if (customers.length < size) break;

            page++;
        }

        if (!found) {
            const noResultsRow = document.createElement("tr");
            noResultsRow.innerHTML = `
                <td colspan="5">No customers found</td>
            `;
            customerTableBody.appendChild(noResultsRow);
        }
    } catch (error) {
        console.error("Error filtering customers:", error);
    }
}








//----------Customer Validation---------------
function validateCustomerName(customerName) {
    return /^[a-zA-Z\s]+$/.test(customerName);
}

function validateCustomerContact(customerContact) {
    return /^(070|071|074|075|076|077|078|072)[-]?[0-9]{7}$/.test(customerContact);
}

customerInputs.forEach(input => {
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

    input.addEventListener('input', checkCustomerInputs);
});

function checkCustomerInputs() {
    let anyInputEmpty = false;
    let allInputsValid = true;

    customerInputs.forEach(input => {
        const container = input.parentElement;
        const value = input.value.trim();
        const invalidText = container.querySelector('.invalid-text');
        const validIcon = container.querySelector('.valid-text');

        if (value === '') {
            anyInputEmpty = true;
            container.style.borderColor = '';
            invalidText.style.display = 'none';
            if (validIcon) {
                validIcon.style.display = 'none';
            }
        }

        let valid = false;
        if (value !== '') {
            if (input.id === 'customer_name') {
                valid = validateCustomerName(value);
            } else if (input.id === 'customer_contact') {
                valid = validateCustomerContact(value);
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

    if (customerIdElement.value.trim() !== '') {
        customerSaveBtn.disabled = true;
        customerUpdateBtn.disabled = !allInputsValid;
        customerDeleteBtn.disabled = !allInputsValid;
    } else if (anyInputEmpty || !allInputsValid) {
        customerSaveBtn.disabled = true;
        customerUpdateBtn.disabled = true;
        customerDeleteBtn.disabled = true;
    } else {
        customerSaveBtn.disabled = false;
        customerUpdateBtn.disabled = true;
        customerDeleteBtn.disabled = true;
    }
}

//customer table click event
function customerTableClickEvenetHandle() {
    for (let i = 0; i < tblCustomerRows.length; i++) {
        tblCustomerRows[i].addEventListener('click', function () {
            const cells = tblCustomerRows[i].getElementsByTagName("td");
            // const activeStatus = parseInt(cells[4].textContent);

            const cusId = cells[1].textContent;
            const cusName = cells[2].textContent;
            const cusContact = cells[3].textContent;
            const cusStatus = cells[4].textContent;

            customerIdElement.value = cusId;
            customerNameElement.value = cusName;
            customerContactElement.value = cusContact;
            customerCreditStatuslement.value = cusStatus;


            checkCustomerInputs();

        });
    }
}

//------------customer save event handle------------ 
function saveCustomer(baseUrl) {
    const cusName = customerNameElement.value.trim();
    const cusMobileNo = customerContactElement.value.trim();

    if (customerCreditStatuslement.value == "") {
        Swal.fire({
            title: "Oops...",
            text: "Please select Credit Status",
            icon: "warning",
            customClass: {
                confirmButton: 'alert-orange-button',
            }
        });
        return;
    }

    if (!validateCustomerName(cusName) || !validateCustomerContact(cusMobileNo)) {
        return;
    }

    const customerData = {
        cusName: customerNameElement.value,
        cusMobileNo: customerContactElement.value,
        creditStatus: customerCreditStatuslement.value
    };

    fetch(baseUrl + "/customer/save", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("jwt")}`
        },
        body: JSON.stringify(customerData)

    })
        // console.log(customerData);
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
          //  console.log('Customer saved successfully:', data);
            checkCustomerInputs();
            loadAllCustomerToTable(baseUrl,page = 0, size = 8);
            resetInputStyles();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Customer saved successfully!",
                showConfirmButton: false,
                timer: 1500
            });

        })
        .catch(error => {
            console.error('Error saving Customer:', error);
           // alert('Failed to save customer. Please try again.');

            Swal.fire({
                title: "Oops...",
                text: "Failed to save customer. Please try again.",
                icon: "warning",
                customClass: {
                    confirmButton: 'alert-orange-button',
                }
            })
        });

}



//------------customer update event handle------------ 
function upadateCustomer(baseUrl) {
    const cusName = customerNameElement.value.trim();
    const cusMobileNo = customerContactElement.value.trim();

    if (!validateCustomerName(cusName) || !validateCustomerContact(cusMobileNo)) {
        return;
    }

    if (customerCreditStatuslement.value == "") {
        Swal.fire({
            title: "Oops...",
            text: "Please select Credit Status",
            icon: "warning",
            customClass: {
                confirmButton: 'alert-orange-button',
            }
        });
        return;
    }

    const customerUpdateData = {
        cusId: customerIdElement.value,
        cusName: customerNameElement.value,
        cusMobileNo: customerContactElement.value,
        creditStatus: customerCreditStatuslement.value
    };

    // console.log(customerIdElement.value);
    fetch(baseUrl + "/customer/update", {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("jwt")}`
        },
        body: JSON.stringify(customerUpdateData)

    })
        .then(response => {
            if (!response.ok) {
                alert("This customer is inactive!");
                resetInputStyles();
                throw new Error('Network response was not ok');

            }
            return response.json();
        })
        .then(data => {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Customer updated successfully!",
                showConfirmButton: false,
                timer: 1500
            });
            //  console.log('Customer saved successfully:', data);
            loadAllCustomerToTable(baseUrl,page = 0, size = 8);
            resetInputStyles();
        })
        .catch(error => {
            console.error('Error saving Customer:', error);
        });

}

//------------customer delete event handle------------ 
async function deleteCustomer(baseUrl) {
    const cusName = customerNameElement.value.trim();
    const cusMobileNo = customerContactElement.value.trim();

    if (!validateCustomerName(cusName) || !validateCustomerContact(cusMobileNo)) {
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
            fetch(baseUrl + "/customer?cusId=" + customerIdElement.value, {
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
                        text: "Customer deleted successfully.",
                        icon: "success",
                        confirmButtonColor: "#EA6D27",
                        confirmButtonText: "OK"
                    });
                    loadAllCustomerToTable(baseUrl,page = 0, size = 8);
                    resetInputStyles();
                })
                .catch(error => {
                    console.error('Error Deleting Customer:', error);
                    alert('This customer is already deleted.');
                });
        }
    });
}






//------------load all data to table------------ 
async function loadAllCustomerToTable(baseUrl, page, size) {
    try {
        const response = await fetch(`${baseUrl}/customer/paged?page=${page}&size=${size}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const customersList = await response.json();
        const customerData = customersList.data.data;
        const totalCount = customersList.data.totalCount;

        let customerList = "";

        let rowNumber = page * size + 1;

        for (let i = 0; i < customerData.length; i++) {
            const customer = customerData[i];
            const creditStatus = customer.creditStatus;

            const statusColor = creditStatus === "Disabled" ? "#101A24" : "#EA6D27";

            const isDisabled = customer.cusId === 1 && customer.cusName === "unKnown";

            customerList += `
                <tr ${isDisabled ? 'class="disabled-row"' : ''}>
                    <td>${rowNumber++}</td>
                    <td>${customer.cusId}</td>
                    <td>${customer.cusName}</td>
                    <td>${customer.cusMobileNo}</td>
                    <td style="color: ${statusColor}">${creditStatus}</td>
                </tr>
            `;
        }

        document.querySelector('#tblcustomer tbody').innerHTML = customerList;
        customerTableClickEvenetHandle();

        const totalPages = Math.ceil(totalCount / size);
        updateCustomerPaginationControls(baseUrl, page, size, totalPages);
    } catch (error) {
        console.error('Error loading customers:', error);
    }
}

function updateCustomerPaginationControls(baseUrl, currentPage, pageSize, totalPages) {
    let paginationHtml = "";

    // Previous Button
    paginationHtml += `<button class="pagination-btn" data-page="${currentPage - 1}" ${currentPage === 0 ? "disabled" : ""}>Prev</button>`;

    // Page Buttons
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

    const paginationControls = document.getElementById("customer-pagination-controls");
    paginationControls.innerHTML = paginationHtml;

    // Attach Click Event to Pagination Buttons
    const paginationButtons = document.querySelectorAll(".pagination-btn");
    paginationButtons.forEach(button => {
        button.addEventListener("click", function () {
            const selectedPage = parseInt(this.getAttribute("data-page"));
            if (selectedPage >= 0 && selectedPage < totalPages) {
                loadAllCustomerToTable(baseUrl, selectedPage, pageSize);
            }
        });
    });
}


//------------reset inputs function-----------
function resetInputStyles() {
    customerIdElement.value = '';
    customerNameElement.value = '';
    customerContactElement.value = '';
    customerCreditStatuslement.value = ""
    customerNameElement.focus();

    customerInputs.forEach(input => {
        const container = input.parentElement;
        container.style.borderColor = '';
        const invalidText = container.querySelector('.invalid-text');
        const validIcon = container.querySelector('.valid-text');
        if (invalidText) invalidText.style.display = 'none';
        if (validIcon) validIcon.style.display = 'none';
    });
}


customerNameElement.addEventListener('input', function () {
    if (customerNameElement.value === '' && customerContactElement.value === '') {
        customerIdElement.value = '';
        customerCreditStatuslement.value = ""
    }
});

customerContactElement.addEventListener('input', function () {
    if (customerNameElement.value === '' && customerContactElement.value === '') {
        customerIdElement.value = '';
        customerCreditStatuslement.value = ""
    }
});
