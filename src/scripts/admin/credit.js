
let activeCreditOrderInput = null;

const creditBackgroundOverlay = document.querySelector(".creditPaymentBackground");
const creditPaymentSideNavBr = document.querySelector(".aside-nav-button-list");
const creditPaymentNavbar = document.querySelector(".navbar");



document.addEventListener('DOMContentLoaded', async function () {
    const baseUrl = await window.api.getBaseUrl();

    loadAllCreditCustomers(baseUrl,page = 0, size = 10);
    searchCreditCustomerByContact(baseUrl,page = 0, size = 10);

    document.querySelector("#btnCloseCreditPayment").addEventListener("click", function () {
        document.querySelector(".creditPayment-popup").style.display = "none";
        creditBackgroundOverlay.classList.remove("overlay");
        creditPaymentSideNavBr.style.pointerEvents = "auto"
        creditPaymentNavbar.style.pointerEvents = "auto"

    })


    document.querySelector("#btnCloseCreditOrderDetailsPayment").addEventListener("click", function () {
        document.querySelector(".creditOrders-popup").style.display = "none";
        creditBackgroundOverlay.classList.remove("overlay");
        creditPaymentSideNavBr.style.pointerEvents = "auto"
        creditPaymentNavbar.style.pointerEvents = "auto"
    })


    document.querySelector("#btn_Creditpayment").addEventListener("click", function () {
        // console.log("clicked");
        payTotalCreditCustomerWiseHandle(baseUrl)
    });



    document.querySelector("#btn_creditOrderwise").addEventListener("click", function () {
        const currentRow = getCurrentRow();
        payTotalCreditOrderWiseHandle(baseUrl, currentRow);
    })

    document.getElementById('search_Credit_date').addEventListener('input', function () {
        const searchDate = this.value;
        filterTableByDate(searchDate);
    });


});

//----------search order id--------------
document.getElementById('search_credit_orderid').addEventListener('input', function () {
    const searchTerm = this.value.trim();
    const tableRows = document.querySelectorAll('#tblcreditOrderDetails tbody tr');

    tableRows.forEach(row => {
        const orderIdCell = row.querySelector('.table_orderId');
        const orderIdText = orderIdCell.textContent.trim();
        const orderIdNumber = orderIdText.replace('O-', '');

        if (orderIdNumber.includes(searchTerm)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
});


//----------search credit date--------------
function filterTableByDate(date) {
    const table = document.getElementById('tblcreditOrderDetails');
    const rows = table.getElementsByTagName('tr');
    for (let i = 1; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        const rowDate = cells[1].textContent.split(' ')[0];
        if (date && rowDate !== date) {
            rows[i].style.display = 'none';
        } else {
            rows[i].style.display = '';
        }
    }
}


//----------Search Credit Customer by Contact-----------
function searchCreditCustomerByContact(baseUrl, page, size) {
    document.getElementById('search_credit').addEventListener('input', async function () {
        const contact = this.value.trim();
        
        if (!contact) {
            loadAllCreditCustomers(baseUrl, page = 0, size = 10);
            return;
        }

        try {
            const url = `${baseUrl}/CreditCustomer?cusName=&contact=${contact}&page=${page}&size=${size}`;

            const response = await fetch(url, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const customersList = await response.json();
            const customers = customersList.data.data;
        
            const totalCount = customersList.data.totalCount; 
            console.log(totalCount);

            let customerList = "";

            for (let i = 0; i < customers.length; i++) {
                const customer = customers[i]; 
                const value4 = customer[4];
                const value5 = customer[3];
                const color4 = value4 > 0 ? '#00cc00' : '#101A24';
                const color5 = value5 > 0 ? '#ff3300' : '#101A24';

                customerList += `
                    <tr class="customer-row" data-due-amount="${value5}" data-customer-name="${customer[6]}" data-customer-id="${customer[2]}">
                        <td>${i + 1 + page * size}</td>
                        <td>${customer[6]}</td> <!-- Customer Name -->
                        <td>${customer[7]}</td> <!-- Customer Phone -->
                        <td>${customer[5]}</td> <!-- Customer Some Field -->
                        <td style="color:${color4};">${value4}</td> <!-- Some Value -->
                        <td style="color:${color5};">${value5}</td> <!-- Some Value -->
                        <td><button class="btn-submit btnCreditOpen" style="height: 30px;">Pay</button></td>
                    </tr>
                `;
            }

            document.querySelector('#tblCredit_body').innerHTML = customerList;

            document.querySelectorAll('.customer-row').forEach(row => {
                row.addEventListener('click', function (event) {
                    if (!event.target.classList.contains('btnCreditOpen') && !event.target.closest('.btnCreditOpen')) {
                        selectedCustomerCreditDetailsPopup(baseUrl, row);
                    }
                });
            });

            creditPaymentPopupHandleEvent();

            const totalPages = Math.ceil(totalCount / size);
            updateCreditCustomerPaginationControlsForContact(baseUrl, contact, page, size, totalPages);

        } catch (error) {
            console.error('Error searching credit customers by contact:', error);
        }
    });
}


function updateCreditCustomerPaginationControlsForContact(baseUrl, contact, currentPage, pageSize, totalPages) {
    let paginationHtml = "";

    // Previous button
    paginationHtml += `<button class="pagination-btn" data-page="${currentPage - 1}" ${currentPage === 0 ? "disabled" : ""}>Prev</button>`;

    // Page buttons
    for (let i = 0; i < totalPages; i++) {
        paginationHtml += `<button class="pagination-btn ${i === currentPage ? "active" : ""}" data-page="${i}">${i + 1}</button>`;
    }

    // Next button
    paginationHtml += `<button class="pagination-btn" data-page="${currentPage + 1}" ${currentPage >= totalPages - 1 ? "disabled" : ""}>Next</button>`;

    const paginationControls = document.getElementById("credit-customer-pagination-controls");
    paginationControls.innerHTML = paginationHtml;

    // Add event listeners to pagination buttons
    document.querySelectorAll(".pagination-btn").forEach(button => {
        button.addEventListener("click", function () {
            const selectedPage = parseInt(this.getAttribute("data-page"));
            if (selectedPage >= 0 && selectedPage < totalPages) {
                fetchAndRenderCreditCustomersByContact(baseUrl, contact, selectedPage, pageSize);
            }
        });
    });
}






//----------Load All Credit Customers with Pagination-----------
async function loadAllCreditCustomers(baseUrl, page = 0, size = 10) {
    try {
        const response = await fetch(`${baseUrl}/CreditCustomer/paged?page=${page}&size=${size}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const customersList = await response.json();
        const totalCustomers = customersList.data.totalCount;
        const customers = customersList.data.data;
        console.log(customers);
        

        let customerList = "";

        for (let i = 0; i < customers.length; i++) {
            const value4 = customers[i][4];
            const value5 = customers[i][3];
            const color4 = value4 > 0 ? '#00cc00' : '#101A24';
            const color5 = value5 > 0 ? '#ff3300' : '#101A24';

            customerList += `
                <tr class="customer-row" data-due-amount="${value5}" data-customer-name="${customers[i][6]}" data-customer-id="${customers[i][2]}">
                    <td>${i + 1 + page * size}</td>
                    <td>${customers[i][6]}</td>
                    <td>${customers[i][7]}</td>
                    <td>${customers[i][5]}</td>
                    <td style="color:${color4};">${value4}</td>
                    <td style="color:${color5};">${value5}</td>
                    <td><button class="btn-submit btnCreditOpen" style="height: 30px;">Pay</button></td>
                </tr>
            `;
        }

        document.querySelector('#tblcredit tbody').innerHTML = customerList;

      
        document.querySelectorAll('.customer-row').forEach(row => {
            row.addEventListener('click', function (event) {
                if (!event.target.classList.contains('btnCreditOpen') && !event.target.closest('.btnCreditOpen')) {
                    selectedCustomerCreditDetailsPopup(baseUrl, row);
                }

                document.querySelector('.select_creditOrder').addEventListener('change', () => {
                    selectedCustomerCreditDetailsPopup(baseUrl, row);
                });
            });
        });

        creditPaymentPopupHandleEvent();

        const totalPages = Math.ceil(totalCustomers / size);
        updateCreditCustomerPaginationControls(baseUrl, page, size, totalPages);

    } catch (error) {
        console.error('Error loading credit customers:', error);
    }
}

function updateCreditCustomerPaginationControls(baseUrl, currentPage, pageSize, totalPages) {
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


    paginationHtml += `<button class="pagination-btn" data-page="${currentPage + 1}" ${currentPage >= totalPages - 1 ? "disabled" : ""}>Next</button>`;

    const paginationControls = document.getElementById("credit-customer-pagination-controls");
    paginationControls.innerHTML = paginationHtml;

    
    document.querySelectorAll(".pagination-btn").forEach(button => {
        button.addEventListener("click", function () {
            const selectedPage = parseInt(this.getAttribute("data-page"));
            if (selectedPage >= 0 && selectedPage < totalPages) {
                loadAllCreditCustomers(baseUrl, selectedPage, pageSize);
            }
        });
    });
}


//-----customer wise credit payment popup------------ 
function creditPaymentPopupHandleEvent() {
    const btnsOpen = document.querySelectorAll(".btnCreditOpen");
    const popup = document.querySelector(".creditPayment-popup");

    btnsOpen.forEach(btnOpen => {
        btnOpen.addEventListener("click", function () {
            const row = this.closest('.customer-row');
            const dueAmount = parseFloat(row.dataset.dueAmount).toFixed(2);
            if (dueAmount > 0) {
                const customer = row.dataset.customerName;
                const customerId = row.dataset.customerId;
                popup.style.display = "flex";
                creditBackgroundOverlay.classList.add("overlay");
                creditPaymentSideNavBr.style.pointerEvents = "none"
                creditPaymentNavbar.style.pointerEvents = "none"
                document.getElementById("creditCustomerName").innerText = `${customerId} - ${customer}`;
                document.getElementById("creditPayment-due").value = dueAmount;
                document.getElementById("creditPayment_due_note").innerText = dueAmount;
            } else {
                btnOpen.style.disabled = true
            }

        });
    });
}


const creditPaymentInputs = document.querySelectorAll('.creditPayment-validation');
const cashInput = document.getElementById("creditPayment-cash");
const cardInput = document.getElementById("creditPayment-card");
const totalInput = document.getElementById("creditPayment-total");
const balanceInput = document.getElementById("creditPayment-balance");



creditPaymentInputs.forEach(input => {

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

    input.addEventListener('keypress', allowOnlyNumbers);
    input.addEventListener('input', checkCreditPaymentInputs);
    input.addEventListener('focus', function () {

        if (input.id === "creditPayment-due") {
            input.value = '';
        } else if (input.value.trim() === '0.00') {
            input.value = '';
        }
    });

    input.addEventListener('blur', blurCreditPaymentEvent);
});

function allowOnlyNumbers(event) {
    const charCode = event.charCode;
    if (charCode !== 0 && (charCode < 48 || charCode > 57) && charCode !== 46) {
        event.preventDefault();
    }

}


function blurCreditPaymentEvent(event) {
    const initialDueAmount = document.getElementById("creditPayment_due_note").innerText
    const input = event.target;
    const container = input.parentElement;
    const invalidText = container.querySelector('.invalid-text');
    const validIcon = container.querySelector('.valid-text');

    if (input.id === "creditPayment-due") {
        if (input.value.trim() === '') {
            input.value = initialDueAmount;
            container.style.borderColor = '';
            invalidText.style.display = 'none';
            if (validIcon) {
                validIcon.style.display = 'none';
            }
        }

    } else if (input.value.trim() === '') {
        input.value = '0.00';
        container.style.borderColor = '';
        invalidText.style.display = 'none';
        if (validIcon) {
            validIcon.style.display = 'none';
        }
    }
}


function checkCreditPaymentInputs(event) {
    const input = event.target;
    const container = input.parentElement;
    const value = input.value.trim();
    const invalidText = container.querySelector('.invalid-text');
    const validIcon = container.querySelector('.valid-text');

    const dueAmount = parseFloat(document.getElementById("creditPayment-due").value) || 0;
    const initialDueAmount = parseFloat(document.getElementById("creditPayment_due_note").innerText) || 0;
    const cashInput = document.getElementById('creditPayment-cash');
    const cardInput = document.getElementById('creditPayment-card');
    const totalInput = document.getElementById('creditPayment-total');
    const balanceInput = document.getElementById('creditPayment-balance');

    const cashAmount = parseFloat(cashInput.value) || 0;
    const cardAmount = parseFloat(cardInput.value) || 0;
    const totalAmount = cashAmount + cardAmount;
    const balanceAmount = dueAmount - totalAmount;

    let isCashValid = false;
    let isCardValid = false;
    let isDueValid = true;

    if (input.id === 'creditPayment-due') {
        if (value === '0.00' || value === '') {
            container.style.borderColor = '';
            invalidText.style.display = 'none';
            if (validIcon) {
                validIcon.style.display = 'none';
            }
            isDueValid = false;
        } else if (parseFloat(value) <= initialDueAmount) {
            container.style.borderColor = '#00cc00';
            invalidText.style.display = 'none';
            if (validIcon) {
                validIcon.style.display = 'inline-block';
            }
            isDueValid = true;
        } else {
            container.style.borderColor = 'red';
            invalidText.style.display = 'flex';
            if (validIcon) {
                validIcon.style.display = 'none';
            }
            isDueValid = false;
        }
    }


    if (input.id === 'creditPayment-card') {
        if (value === '0.00' || value === '') {
            container.style.borderColor = '';
            invalidText.style.display = 'none';
            if (validIcon) {
                validIcon.style.display = 'none';
            }
            isCardValid = false;
        } else if (parseFloat(value) <= dueAmount) {
            container.style.borderColor = '#00cc00';
            invalidText.style.display = 'none';
            if (validIcon) {
                validIcon.style.display = 'inline-block';
            }
            isCardValid = true;
        } else {
            container.style.borderColor = 'red';
            invalidText.style.display = 'flex';
            if (validIcon) {
                validIcon.style.display = 'none';
            }
            isCardValid = false;
        }
    }

    if (input.id === 'creditPayment-cash') {
        if (value !== '' || value === '0.00') {
            container.style.borderColor = '#00cc00';
            invalidText.style.display = 'none';
            if (validIcon) {
                validIcon.style.display = 'inline-block';
            }
            isCashValid = true;
        } else {
            container.style.borderColor = 'red';
            invalidText.style.display = 'flex';
            if (validIcon) {
                validIcon.style.display = 'none';
            }
            isCashValid = false;
        }
    }


    totalInput.value = totalAmount.toFixed(2);
    balanceInput.value = balanceAmount.toFixed(2);


    const btnPayment = document.getElementById('btn_Creditpayment');
    if (balanceAmount > 0) {
        btnPayment.disabled = true;
    } else if (isDueValid && (isCashValid || isCardValid)) {
        btnPayment.disabled = false;
    } else {
        btnPayment.disabled = true;
    }
}







//----------customer wise credit payment event-----------
function payTotalCreditCustomerWiseHandle(baseUrl) {
    const customerId = document.getElementById("creditCustomerName").innerText.split('-')[0];
    const cardAmount = parseFloat(document.getElementById("creditPayment-card").value);
    const cashAmount = parseFloat(document.getElementById("creditPayment-cash").value);
    const paidAmount = cashAmount + cardAmount;
    const totalAmount = parseFloat(document.getElementById("creditPayment-due").value);
    const balanceAmount = parseFloat(document.getElementById("creditPayment-balance").value);

    //console.log(customerId + " " + cardAmount + " " + cashAmount + " " + balanceAmount + " " + totalAmount + " " + paidAmount);

    const totalCreditData = {
        customerId: customerId,
        cardAmount: cardAmount,
        cashAmount: cashAmount,
        totalAmount: totalAmount,
        balanceAmount: balanceAmount,
        paidAmount: paidAmount,
        cashierId: localStorage.getItem("userId"),
        timeDate: "",
        status: "paid"
    };

    fetch(baseUrl + '/CreditPayment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("jwt")}`
        },
        body: JSON.stringify(totalCreditData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Payment successfully!",
                showConfirmButton: false,
                timer: 1500
            });

            loadAllCreditCustomers(baseUrl,page = 0, size = 10);
            creditReport(baseUrl);
            creditPayment(baseUrl);
       

            document.querySelector(".creditPayment-popup").style.display = "none";
            document.getElementById("credit-section").style.pointerEvents = "auto";
            document.getElementById("creditPayment-card").value = "0.00";
            document.getElementById("creditPayment-cash").value = "0.00";
            document.getElementById("creditPayment-due").value = "0.00";
            document.getElementById("creditPayment-total").value = "";
            document.getElementById("creditPayment-balance").value = "";


            const btnPayment = document.getElementById('btn_Creditpayment');
            btnPayment.disabled = true;

            const inputs = ['creditPayment-card', 'creditPayment-cash', 'creditPayment-due'];
            inputs.forEach(id => {
                const container = document.getElementById(id).parentElement;
                container.style.borderColor = '';
                container.querySelector('.invalid-text').style.display = 'none';
                if (container.querySelector('.valid-text')) {
                    container.querySelector('.valid-text').style.display = 'none';
                }
            });
            validatePaymentInputs();
            creditPaymentPopupHandleEvent();
            creditBackgroundOverlay.classList.remove("overlay");
            creditPaymentSideNavBr.style.pointerEvents = "auto"
            creditPaymentNavbar.style.pointerEvents = "auto"
        })
        .catch(error => {
            console.error('Error saving employee:', error);
        });
}

function validatePaymentInputs() {
    const dueAmount = parseFloat(document.getElementById("creditPayment-due").value) || 0;
    const cashAmount = parseFloat(document.getElementById("creditPayment-cash").value) || 0;
    const cardAmount = parseFloat(document.getElementById("creditPayment-card").value) || 0;
    const totalAmount = cashAmount + cardAmount;
    const balanceAmount = dueAmount - totalAmount;

    const btnPayment = document.getElementById('btn_Creditpayment');
    if (balanceAmount > 0) {
        btnPayment.disabled = true;
    } else if (dueAmount > 0 && (cashAmount > 0 || cardAmount > 0)) {
        btnPayment.disabled = false;
    } else {
        btnPayment.disabled = true;
    }
}




//-----Orders wise credit payment popup------------ 
async function selectedCustomerCreditDetailsPopup(baseUrl, row) {
    const popup = document.querySelector(".creditOrders-popup");
    const dueAmount = parseFloat(row.dataset.dueAmount).toFixed(2);

    if (dueAmount > 0) {
        const customer = row.dataset.customerName;
        const customerId = row.dataset.customerId;

        popup.style.display = "flex";
        creditBackgroundOverlay.classList.add("overlay");
        creditPaymentSideNavBr.style.pointerEvents = "none"
        creditPaymentNavbar.style.pointerEvents = "none"
        document.getElementById("creditOrdersCustomerName").innerText = `${customerId} - ${customer}`;

        try {
            const response = await fetch(`${baseUrl}/CreditCustomerDetail?customerId=${customerId}`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const creditOrdersList = await response.json();
         //   console.log(creditOrdersList);

            function formatDate(dateString) {
                const date = new Date(dateString);
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const day = String(date.getDate()).padStart(2, '0');
                const hours = String(date.getHours()).padStart(2, '0');
                const minutes = String(date.getMinutes()).padStart(2, '0');
                const seconds = String(date.getSeconds()).padStart(2, '0');

                return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
            }

            let ordersList = "";
            const statusFilter = document.querySelector('.select_creditOrder').value;
            //console.log(statusFilter);

            for (let i = 0; i < creditOrdersList.data.length; i++) {
                const order = creditOrdersList.data[i];
                const value4 = order.settledCreditDetailAmount;
                const value5 = order.dueCreditDetailAmount;
                const color4 = value4 > 0 ? '#00cc00' : '#101A24';
                const color5 = value5 > 0 ? '#ff3300' : '#101A24';

                if ((statusFilter === 'Pending' && order.dueCreditDetailAmount !== 0) ||
                    (statusFilter === 'Paid' && order.dueCreditDetailAmount === 0) ||
                    (statusFilter === 'all')) {

                    const isPaid = (order.dueCreditDetailAmount === 0);
                    const checkboxDisabled = isPaid ? 'disabled' : '';

                    ordersList += `
                        <tr class="customer-row" data-due-amount="${value5}" data-customer-name="${order[6]}" data-customer-id="${order[2]}">
                            <td class="table_orderId">${order.orderId}</td>
                            <td>${formatDate(order.orderDateTime)}</td>
                            <td>${order.totalCreditDetailAmount}</td>
                            <td style="color:${color4};">${value4}</td>
                            <td style="color:${color5};">${value5}</td>
                            <td><div class="table_inputContainer"><input type="text" class="table_input" disabled></div></td>
                           <td><input type="checkbox" class="table_checkbox" ${checkboxDisabled}></td>
                        </tr>`;
                }
            }

            document.querySelector('#tblcreditOrderDetails tbody').innerHTML = ordersList;

            function calculateSum() {
                const totalInput = document.getElementById('creditPayment-totalOrderWise');
                let sum = 0;
                const allInputs = document.querySelectorAll('#tblcreditOrderDetails .table_input:not([disabled])');
                allInputs.forEach(input => {
                    const value = parseFloat(input.value) || 0;
                    sum += value;
                });
                totalInput.value = sum.toFixed(2);
            }

            const checkboxes = document.querySelectorAll('#tblcreditOrderDetails .table_checkbox');
            checkboxes.forEach(checkbox => {
                checkbox.addEventListener('change', function () {
                    const inputField = this.closest('tr').querySelector('.table_input');
                    inputField.disabled = !this.checked;
                    if (this.checked) {
                        inputField.focus();
                        activeCreditOrderInput = inputField;
                        document.getElementById("creditPayment-cashOrderWise").value = "0.00";
                        document.getElementById("creditPayment-cardOrderWise").value = "0.00";
                    } else {
                        inputField.value = '';
                        inputField.parentElement.style.borderColor = '';
                    }
                    calculateSum();
                });
            });

            document.addEventListener('input', function (event) {
                if (event.target.matches('#tblcreditOrderDetails .table_input:not([disabled])')) {
                    const input = event.target;
                    const inputValue = parseFloat(input.value) || 0;
                    const dueAmount = parseFloat(input.closest('tr').dataset.dueAmount);
                    const validInput = /^[0-9]*\.?[0-9]*$/;
                    if (!validInput.test(input.value)) {
                        input.value = input.value.slice(0, -1);
                    }

                    if (inputValue > dueAmount) {
                        input.parentElement.style.border = '1px solid #ff3300';
                    } else if (inputValue != "" && inputValue <= dueAmount) {
                        input.parentElement.style.border = '1px solid #00cc00';
                    } else {
                        input.parentElement.style.borderColor = '';
                    }

                    calculateSum();
                }
            });

        } catch (error) {
            console.error('Error loading credit customers:', error);
        }
    } else {
        // btnOpen.disabled = true;
    }
}




const orderWiseCreditPaymentInputs = document.querySelectorAll('.orderWiseCreditPayment-validation');
const orderWiseCashInput = document.getElementById("creditPayment-cashOrderWise");
const orderWiseCardInput = document.getElementById("creditPayment-cardOrderWise");
const orderWiseTotalInput = document.getElementById("creditPayment-totalOrderWise");
const orderWiseBalanceInput = document.getElementById("creditPayment-balanceOrderWise");


// ----------order wise credit payment event-----------
async function payTotalCreditOrderWiseHandle(baseUrl, currentRow) {
    const customerId = document.getElementById("creditOrdersCustomerName").innerText.split('-')[0];
    const cardAmount = parseFloat(document.getElementById("creditPayment-cardOrderWise").value);
    const cashAmount = parseFloat(document.getElementById("creditPayment-cashOrderWise").value);
    const paidAmount = cashAmount + cardAmount;
    const totalAmount = parseFloat(document.getElementById("creditPayment-totalOrderWise").value);
    const balance = totalAmount - (cashAmount + cardAmount)
    document.getElementById("creditPayment-balanceOrderWise").value = balance
    const balanceAmount = parseFloat(document.getElementById("creditPayment-balanceOrderWise").value);

    const checkedRows = document.querySelectorAll('#tblcreditOrderDetails .table_checkbox:checked');

    const selectedOreditOrders = [];
    checkedRows.forEach(checkbox => {
        const row = checkbox.closest('tr');
        const orderId = row.querySelector('.table_orderId').innerText;
        const inputField = row.querySelector('.table_input');
        const inputValue = parseFloat(inputField.value) || 0;

        selectedOreditOrders.push({
            orderId,
            inputValue
        });
    });
    //console.log(selectedOreditOrders);
  //  console.log(customerId + " " + cardAmount + " " + cashAmount + " " + balanceAmount + " " + totalAmount + " " + paidAmount);

    const totalCreditData = {
        customerId: customerId,
        cardAmount: cardAmount,
        cashAmount: cashAmount,
        totalAmount: totalAmount,
        balanceAmount: balanceAmount,
        paidAmount: paidAmount,
        cashierId: localStorage.getItem("userId"),
        timeDate: "",
        status: "paid",
        creditPaymentDetailDTOS: selectedOreditOrders.map(row => ({
            orderId: row.orderId,
            payedAmount: row.inputValue,
            timeDate: "",
            status: "",
            orderDateTime: "",
        }))
    };

    try {
        const response = await fetch(`${baseUrl}/CreditPayment/orderWise`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("jwt")}`
            },
            body: JSON.stringify(totalCreditData)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Payment successfully!",
            showConfirmButton: false,
            timer: 1500
        });

        await selectedCustomerCreditDetailsPopup(baseUrl, currentRow);
        loadAllCreditCustomers(baseUrl,page = 0, size = 10);
        creditPayment(baseUrl);
        creditReport(baseUrl);

        document.querySelector(".creditOrders-popup").style.display = "none"
        document.getElementById("credit-section").style.pointerEvents = "auto";
        orderWiseCashInput.value = "0.00";
        orderWiseCardInput.value = "0.00";
        orderWiseTotalInput.value = "0.00";

        const btnPayment = document.getElementById('btn_creditOrderwise');
        btnPayment.disabled = true;

        const inputs = ['creditPayment-cardOrderWise', 'creditPayment-cashOrderWise'];
        inputs.forEach(id => {
            const container = document.getElementById(id).parentElement;
            container.style.borderColor = '';
            container.querySelector('.invalid-text').style.display = 'none';
            if (container.querySelector('.valid-text')) {
                container.querySelector('.valid-text').style.display = 'none';
            }
        });

        creditBackgroundOverlay.classList.remove("overlay");
        creditPaymentSideNavBr.style.pointerEvents = "auto"
        creditPaymentNavbar.style.pointerEvents = "auto" 
    } catch (error) {
        console.error('Error saving employee:', error);
    }
}


function getCurrentRow() {
    return document.querySelector('.customer-row');
}


orderWiseCreditPaymentInputs.forEach(input => {
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

    input.addEventListener('keypress', allowOnlyNumbersa);
    input.addEventListener('input', checkCreditOrderWisePaymentInputs);
    input.addEventListener('focus', function () {
        if (input.value.trim() === '0.00') {
            input.value = '';
        }
    });

    input.addEventListener('blur', blurOrderWiseCreditPaymentEvent);
});

function allowOnlyNumbersa(event) {
    const charCode = event.charCode;
    if (charCode !== 0 && (charCode < 48 || charCode > 57) && charCode !== 46) {
        event.preventDefault();
    }
}

function blurOrderWiseCreditPaymentEvent(event) {
    const input = event.target;
    const container = input.parentElement;
    const invalidText = container.querySelector('.invalid-text');
    const validIcon = container.querySelector('.valid-text');

    if (input.value.trim() === '') {
        input.value = '0.00';
        container.style.borderColor = '';
        invalidText.style.display = 'none';
        if (validIcon) {
            validIcon.style.display = 'none';
        }
    }
}

function checkCreditOrderWisePaymentInputs(event) {
    const input = event.target;
    const container = input.parentElement;
    const value = input.value.trim();
    const invalidText = container.querySelector('.invalid-text');
    const validIcon = container.querySelector('.valid-text');

    const cashAmount = parseFloat(orderWiseCashInput.value) || 0;
    const cardAmount = parseFloat(orderWiseCardInput.value) || 0;
    const totalAmount = parseFloat(orderWiseTotalInput.value);
    const balanceAmount = totalAmount - (cashAmount + cardAmount);

    if (input.id === 'creditPayment-cashOrderWise') {
        if (value === '0.00') {
            container.style.borderColor = '';
            invalidText.style.display = 'none';
            if (validIcon) {
                validIcon.style.display = 'none';
            }
        } else if (value !== '') {
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
        }
    }

    if (input.id === 'creditPayment-cardOrderWise') {
        if (value === '0.00') {
            container.style.borderColor = '';
            invalidText.style.display = 'none';
            if (validIcon) {
                validIcon.style.display = 'none';
            }
        } else if (value !== '' && parseFloat(value) <= totalAmount) {
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
        }
    }

    orderWiseBalanceInput.value = balanceAmount.toFixed(2);
    const orderWiseTotalInputa = document.getElementById("creditPayment-totalOrderWise").value;
    const btnOrderWisePayment = document.getElementById('btn_creditOrderwise');

    if (orderWiseTotalInputa === "") {
        btnOrderWisePayment.disabled = true;
    } else if (balanceAmount > 0) {
        btnOrderWisePayment.disabled = true;
    } else if (totalAmount <= 0 || cardAmount > totalAmount) {
        btnOrderWisePayment.disabled = true;
    } else {
        btnOrderWisePayment.disabled = false;
    }
}


//---------- Handle virtual keyboard input----------------------
let inputClearedOnFocus = false;

const virtualKeyboard = document.querySelectorAll('.letter-creditpayment');
document.getElementById('search_credit_orderid').addEventListener('focus', function () {
    activeCreditOrderInput = document.getElementById('search_credit_orderid');
    inputClearedOnFocus = false; 
});

orderWiseCreditPaymentInputs.forEach(input => {
    input.addEventListener('focus', function () {
        activeCreditOrderInput = input;
        inputClearedOnFocus = false; 
    });
});

creditPaymentInputs.forEach(input => {
    input.addEventListener('focus', function () {
        activeCreditOrderInput = input;
        inputClearedOnFocus = false; 
    });
});

virtualKeyboard.forEach(button => {
    button.addEventListener("click", (event) => {
        if (!activeCreditOrderInput) return;
        const key = button.dataset.key;

        if (!inputClearedOnFocus) {
            activeCreditOrderInput.style.color = ""; 
            activeCreditOrderInput.value = key !== "←" ? key : "";
            inputClearedOnFocus = true;               
        } else {
            if (key === "←") {
                activeCreditOrderInput.value = activeCreditOrderInput.value.slice(0, -1);

                // Only assign "0.00" if the input is not 'search_credit_orderid'
                if (activeCreditOrderInput.value === "" && activeCreditOrderInput.id !== 'search_credit_orderid') {
                    activeCreditOrderInput.value = "0.00";
                }
            } 
            
            else if (key === "." && activeCreditOrderInput.value.includes(".")) {
                // Prevent multiple decimals
            } 
          
            else {
                // Reset for all fields except 'search_credit_orderid'
                if (['0', '0.0', '0.00', '0.', ''].includes(activeCreditOrderInput.value) && activeCreditOrderInput.id !== 'search_credit_orderid') {
                    activeCreditOrderInput.value = '';
                }
                activeCreditOrderInput.value += key;
            }
        }

        // Trigger the input event after updating the value
        const inputEvent = new Event('input', {
            bubbles: true,
            cancelable: true,
        });

        Object.defineProperty(inputEvent, 'data', {
            value: key,
            configurable: true,
        });

        activeCreditOrderInput.dispatchEvent(inputEvent);
    });
});



