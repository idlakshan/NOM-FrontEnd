
const orderContent = document.querySelector("#order-section")


const datepicker = document.getElementById('date-picker-order');
const OrderTable = document.getElementById('tblOrder');
const orderIdList = document.querySelector("#dropdown-menu-oid");
const tableIdList = document.querySelector("#dropdown-menu-tid");
const employeIdList = document.querySelector("#dropdown-menu-eid");

const orderIdInput = document.querySelector('.dropdown-input-oid');
const tableIdInput = document.querySelector('.dropdown-input-tid');
const employeeIdInput = document.querySelector('.dropdown-input-eid');
const dataTable = document.getElementById('tblOrder').getElementsByTagName('tbody')[0];



document.addEventListener("DOMContentLoaded", async function () {
    const baseUrl = await window.api.getBaseUrl();

    loadAllOrders(baseUrl,page = 0, size = 5);

    countCashPayment(baseUrl);
    countCreditPayment(baseUrl);
    countCardPayment(baseUrl);
    countAllOrders(baseUrl);

});



//----------Order search by Date------------------------
function filterTableByDate() {
    const selectedDate = datepicker.value;
    const orderTableBody = document.getElementById('tblOrderBody');
    const rows = orderTableBody.getElementsByTagName('tr');
    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const dateCell = row.getElementsByTagName('td')[3];
        if (!dateCell) continue;

        const dateInRow = dateCell.textContent.trim();
        const dateInRowDateOnly = dateInRow.split(' ')[0];
       
        if (selectedDate === '') {
            row.style.display = '';
        } else {
            if (selectedDate === dateInRowDateOnly) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        }
    }
}

datepicker.addEventListener('change', filterTableByDate);


//---------Load All Orders-------------  
async function loadAllOrders(baseUrl, page, size) {  
    try {  
        const response = await fetch(`${baseUrl}/orders/paged?page=${page}&size=${size}`, {  
            method: "GET",  
            headers: {  
                'Authorization': `Bearer ${localStorage.getItem("jwt")}`,  
                'Content-Type': 'application/json'  
            }  
        });  

        if (!response.ok) {  
            throw new Error(`Network response was not ok: ${response.statusText}`);  
        }  

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

        const responseData = await response.json();  
        const orders = responseData.data.data;  
        //console.log(orders);  

        const tblOrderBody = document.getElementById('tblOrderBody');  
        tblOrderBody.innerHTML = '';  

        orders.forEach(order => {  
            if (order.orderStatus === "Pending") return;  
            if (order.orderStatus === "deleted") return;  

            let tableDisplay = order.tableId;  
            let tableColor = '';  

            if (order.tableId === 'TAB-1') {  
                tableDisplay = 'Take a Way';  
                tableColor = 'color:var(--primary-color);';  
            }  

            const orderRow = `  
                <tr>  
                    <td>${order.orderId}</td>  
                    <td style="${tableColor}">${tableDisplay}</td>  
                    <td>${order.tblcustomer.cusId} - ${order.tblcustomer.cusName}</td>  
                    <td>${formatDate(order.orderDateAndTime)}</td>  
                </tr>`;  
            tblOrderBody.insertAdjacentHTML('beforeend', orderRow);  
        });  

        const ordersList = [];  
        const tableList = [];  
        const customerList = [];  

        document.querySelectorAll('#tblOrderBody tr').forEach(row => {  
            const orderId = row.cells[0].textContent.trim();  
            if (!ordersList.includes(orderId)) ordersList.push(orderId);  

            const table = row.cells[1].textContent.trim();  
            if (!tableList.includes(table)) tableList.push(table);  

            const customer = row.cells[2].textContent.trim();  
            if (!customerList.includes(customer)) customerList.push(customer);  
        });  

        const applyAutocomplete = (inputId, dataList, filterBy) => {  
            const inputField = $(`#${inputId}`);  
            inputField.autocomplete({  
                source: dataList,  
                minLength: 1,  
                select: function (event, ui) {  
                    const selectedItem = ui.item.value.toLowerCase();  
                    inputField.val(selectedItem);  
                    filterTableRows(filterBy, selectedItem);  
                }  
            });  

            inputField.on('input', function () {  
                const inputValue = this.value.toLowerCase();  
                filterTableRows(filterBy, inputValue);  
            });  
        };  

        const filterTableRows = (filterBy, value) => {  
            document.querySelectorAll('#tblOrderBody tr').forEach(row => {  
                const rowValue = row.cells[filterBy].textContent.trim().toLowerCase();  
                if (rowValue.includes(value) || value === '') {  
                    row.style.display = '';  
                } else {  
                    row.style.display = 'none';  
                }  
            });  
        };  

        applyAutocomplete('selectOrderId_order', ordersList, 0);  
        applyAutocomplete('selectTable_order', tableList, 1);  
        applyAutocomplete('selectCustomer_order', customerList, 2);  

        const totalPages = responseData.data.totalCount  
            ? Math.ceil(responseData.data.totalCount / size)  
            : 1;  

        updateOrderPaginationControls(baseUrl, page, size, totalPages);  

    } catch (error) {  
        console.error('Error loading orders:', error);  
    }  
}


// Handle order pagination  
function updateOrderPaginationControls(baseUrl, currentPage, pageSize, totalPages) {  
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

    const paginationControls = document.getElementById("order-pagination-controls");  
    paginationControls.innerHTML = paginationHtml;  

 
    const paginationButtons = document.querySelectorAll(".pagination-btn");  
    paginationButtons.forEach(button => {  
        button.addEventListener("click", function () {  
            const selectedPage = parseInt(this.getAttribute("data-page"));  
            if (selectedPage >= 0 && selectedPage < totalPages) {  
                loadAllOrders(baseUrl, selectedPage, pageSize);  
            }  
        });  
    });  
}





//--------- count cash payment-------------
async function countCashPayment(baseUrl) {
    try {
        const response = await fetch(baseUrl + '/payment/cashCount', {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("jwt")}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }

        const responseData = await response.json();
        const cash = responseData.data;
        if (cash > 999) {
            $('#cashCount').text('999+');
        } else {
            $('#cashCount').text(cash);
        }
    } catch (error) {
        console.error('Error fetching cash count:', error);
    }
}

//--------- count credit payment-------------
async function countCreditPayment(baseUrl) {
    try {
        const response = await fetch(baseUrl + '/payment/creditCount', {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("jwt")}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }

        const responseData = await response.json();
        const creditCount = responseData.data;

        if (creditCount > 999) {
            $('#creditCount').text('999+');
        } else {
            $('#creditCount').text(creditCount);
        }

      
    } catch (error) {
        console.error('Error fetching credit count:', error);
    }
}

//--------- count card payment-------------
async function countCardPayment(baseUrl) {
    try {
        const response = await fetch(baseUrl + '/payment/cardCount', {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("jwt")}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }

        const responseData = await response.json();
        const cardCount = responseData.data;;

        if (cardCount > 999) {
            $('#cardCount').text('999+');
        } else {
            $('#cardCount').text(cardCount);
        }

    } catch (error) {
        console.error('Error fetching card count:', error);
    }
}

//--------- count total orders-------------
async function countAllOrders(baseUrl) {
    try {
        const response = await fetch(baseUrl + '/orders/orders', {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("jwt")}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }

        const responseData = await response.json();
        const orderCount = responseData.data;

        if (orderCount > 999) {
            $('#orderCount').text('999+');
        } else {
            $('#orderCount').text(orderCount);
        }

    } catch (error) {
        console.error('Error fetching order count:', error);
    }
}
