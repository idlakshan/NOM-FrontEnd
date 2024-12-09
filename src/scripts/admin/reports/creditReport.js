const creditReportBackgroundOverlay = document.querySelector(".creditReportBackground");

$(document).ready(async function () {
    const baseUrl = await window.api.getBaseUrl();
    creditReport(baseUrl);
});
let selectedCreditCustomerId = null;
async function creditReport(baseUrl) {
    try {

        const response = await fetch(`${baseUrl}/CreditCustomer/customerWithLastPayment`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
        });

        const dataList = await response.json();
        console.log(dataList);

        const columns = [
            {
                data: null,
                title: "#Id",
                render: function (data, type, row, meta) {
                    return meta.row + 1;
                }
            },
            { data: 0, title: "Credit Id" },
            { data: 7, title: "Customer Name" },
            {
                data: 8,
                title: "Conatct",

            },
            {
                data: 6,
                title: "Last Payment",
                render: function (data) {
                    if (data === null) return "No Recent Payments";
                    const date = new Date(data);
                    const year = date.getFullYear();
                    const month = String(date.getMonth() + 1).padStart(2, '0');
                    const day = String(date.getDate()).padStart(2, '0');
                    const hour = date.getHours() % 12 || 12;
                    const minute = String(date.getMinutes()).padStart(2, '0');
                    const period = date.getHours() < 12 ? 'AM' : 'PM';
                    return `${year}.${month}.${day} ${hour}:${minute} ${period}`;
                }
            },
            { data: 5, title: "Credit Amount" },
            { data: 4, title: "Settled Amount" },
            { data: 3, title: "Due Amount" },

        ];

        if ($.fn.dataTable.isDataTable('#tblCreditReport')) {
            $('#tblCreditReport').DataTable().clear().destroy();
        }

        const table = $('#tblCreditReport').DataTable({
            data: dataList.data,
            columns: columns,
            orderCellsTop: true,
            fixedHeader: true,
            lengthMenu: [5, 10, 15, 25, 50],
            searching: true,
        });

        function updateCreditTotals() {
            let totalCredit = 0;


            table.rows({ page: 'current' }).data().each(function (rowData) {
                totalCredit += parseFloat(rowData[3]) || 0;
            });


            $('#reportTotalCredit').text(totalCredit.toFixed(2));

        }


        updateCreditTotals();


        table.on('draw', function () {
            updateCreditTotals();
        });

        $('#global-search-credit').on('keyup', function () {
            table.search(this.value).draw();
        });


        function attachCreditPaymentRowClickListeners() {
            const rows = document.querySelectorAll('#tblCreditReport tbody tr');
            rows.forEach(function (row, index) {
                row.addEventListener("click", function () {
                    //const rowData = dataList.data[index];
                    const customerId = dataList.data[index][2];
                    selectedCreditCustomerId = customerId;
                    // document.getElementById("creditCusOrderList").innerHTML = "";
                    creditOrdersPopup(baseUrl, customerId);
                });
            });
        }

        attachCreditPaymentRowClickListeners();


        table.on('draw', function () {
            attachCreditPaymentRowClickListeners();
        });


        $('#tblCreditReport thead tr:eq(1) th input').on('keyup change', function () {
            const columnIndex = $(this).parent().index();
            table
                .column(columnIndex)
                .search(this.value)
                .draw();
        });

    } catch (error) {
        console.error("Error fetching or displaying dish reports:", error);
    }
}


async function creditOrdersPopup(baseUrl, selectedCreditCustomerId) {
    document.querySelector('.report-credit-popup').style.display = 'block';
    creditReportBackgroundOverlay.classList.add("overlay");
    reportSideNavBr.style.pointerEvents = "none"
    reportNavbar.style.pointerEvents = "none"

    try {


        const response = await fetch(baseUrl + '/CreditCustomerDetail?customerId=' + selectedCreditCustomerId, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
        });

        const dataList = await response.json();
        console.log(dataList);

        const columns = [
            {
                data: null,
                title: "#Id",
                render: function (data, type, row, meta) {
                    return meta.row + 1;
                }
            },
            { data: "orderId", title: "Order" },
            {
                data: "orderDateTime",
                title: "Order Date",
                render: function (data) {
                    const date = new Date(data);
                    const year = date.getFullYear();
                    const month = String(date.getMonth() + 1).padStart(2, '0');
                    const day = String(date.getDate()).padStart(2, '0');
                    const hour = date.getHours() % 12 || 12;
                    const minute = String(date.getMinutes()).padStart(2, '0');
                    const period = date.getHours() < 12 ? 'AM' : 'PM';
                    return `${year}.${month}.${day} ${hour}:${minute} ${period}`;
                }
            },
            {
                data: "lastPaymentDateTime",
                title: "Last Payment",
                render: function (data) {
                    if (data === null) return "No Recent Payments";
                    const date = new Date(data);
                    const year = date.getFullYear();
                    const month = String(date.getMonth() + 1).padStart(2, '0');
                    const day = String(date.getDate()).padStart(2, '0');
                    const hour = date.getHours() % 12 || 12;
                    const minute = String(date.getMinutes()).padStart(2, '0');
                    const period = date.getHours() < 12 ? 'AM' : 'PM';
                    return `${year}.${month}.${day} ${hour}:${minute} ${period}`;
                }
            },
            { data: "totalCreditDetailAmount", title: "Total" },
            { data: "settledCreditDetailAmount", title: "Settled" },
            { data: "dueCreditDetailAmount", title: "Due" },
            {
                data: null,
                title: "Action",
                render: function (data, type, row) {
                    return `
                        <button class="btnTableCreditOrders btn-submit btnPaymentHistory" style="margin-right: 8px;">
                            <img src="../icons/history.png" height="25px" alt="History">
                        </button>
                        <button class="btnTableCreditOrders btn-submit btnOrderDetailsHistory">
                            <img src="../icons/orderCreditNew.png" height="25px" alt="Order Details">
                        </button>
                    `;
                }
            }
        ];
        

        if ($.fn.dataTable.isDataTable('#tblCreditPopup')) {
            $('#tblCreditPopup').DataTable().clear().destroy();
        }

        const table = $('#tblCreditPopup').DataTable({
            data: dataList.data,
            columns: columns,
            orderCellsTop: true,
            fixedHeader: true,
            lengthMenu: [5, 10, 15, 25, 50],
            searching: true,
        });

        $('#global-search-creditpopup-main').on('keyup', function () {
            table.search(this.value).draw();
        });

        function updateCreditPaymentPopupTotals() {
            let totalCash = 0;
            let totalCard = 0;

            let totalNet = 0;
    
    
            table.rows({ page: 'current' }).data().each(function (rowData) {
                totalCash += parseFloat(rowData["totalCreditDetailAmount"]) || 0;
                totalCard += parseFloat(rowData["settledCreditDetailAmount"]) || 0;
                totalNet += parseFloat(rowData["dueCreditDetailAmount"]) || 0;
            });
    
    
            $('#reportTotalCreditOrders').text(totalCash.toFixed(2));
            $('#reportTotalSettledOrders').text(totalCard.toFixed(2));
            $('#reportTotalDueOrders').text(totalNet.toFixed(2));
        }
    
    
        updateCreditPaymentPopupTotals();
    
    
        table.on('draw', function () {
            updateCreditPaymentPopupTotals();
        });

        document.querySelectorAll('.btnPaymentHistory').forEach(button => {
            button.addEventListener('click', function () {
                const row = button.closest('tr');
                const orderId = row.cells[1].textContent.trim();
                getSelectedOrderDate(baseUrl, orderId);
            });
        });

        document.querySelectorAll('.btnOrderDetailsHistory').forEach(button => {
            button.addEventListener('click', function () {
                const row = button.closest('tr');
                const orderId = row.cells[1].textContent.trim();
                creditOrderDetailsPopup(baseUrl, orderId);
            });
        });
        
  

    } catch (error) {
        console.error("Error fetching dish order details:", error);
    }


}




async function getSelectedOrderDate(baseUrl, orderId) {
    try {
        const response = await fetch(baseUrl + '/orders?orderId=' + orderId, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const orderDetails = await response.json();
        // console.log(orderDetails);
        const orderDate = orderDetails.data.orderDateAndTime

        creditPaymentDetailsPopup(baseUrl, selectedCreditCustomerId, orderDate, orderId)

    } catch (error) {
        console.error(error);
    }
}


async function creditPaymentDetailsPopup(baseUrl, selectedCreditCustomerId, orderDate, orderId) {
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

    try {
        document.querySelector('.report-creditPayments-popup').style.display = 'block';
        document.querySelector('.report-credit-popup').style.pointerEvents = "none";

        const response = await fetch(baseUrl + '/CreditCustomer?custId=' + selectedCreditCustomerId, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const creditPaymentList = await response.json();
      //  console.log(creditPaymentList);

        document.getElementById("creditPaymetHistoryReportPopUpOId").innerText = orderId;
        document.getElementById("creditPaymetHistoryReportPopupCustomer").innerText = creditPaymentList.data[0];
        document.getElementById("creditPaymetHistoryReportPopupOrderDate").innerText = formatDate(orderDate)
        document.getElementById("creditPaymetHistoryReportPopUpTotal").innerText = creditPaymentList.data[7].toFixed(2);
        document.getElementById("creditPaymetHistoryReportPopupSettled").innerText = creditPaymentList.data[6].toFixed(2);
        document.getElementById("creditPaymetHistoryReportPopupDue").innerText = creditPaymentList.data[5].toFixed(2);

        loadcreditPaymentTableDetails(baseUrl, orderId)

    } catch (error) {
        console.error(error);
    }

}


async function loadcreditPaymentTableDetails(baseUrl, orderId) {
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

    try {
        const response = await fetch(baseUrl + '/CreditPaymentDetails?orderId=' + orderId, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const tableData = await response.json();
       // console.log(tableData);

        let paymentDataList = ''

        for (let i = 0; i < tableData.data.length; i++) {

            paymentDataList += `
                        <tr>
                            <td>${i + 1}</td>
                            <td>${tableData.data[i].creditPaymentId}</td>
                            <td>${formatDate(tableData.data[i].timeDate)}</td>
                            <td>${tableData.data[i].payedAmount}</td>
                        </tr>
                    `;

        }
        document.querySelector('#tblCreditpaymentPopup tbody').innerHTML = paymentDataList;

    } catch (error) {
        console.error(error);
    }
}

async function creditOrderDetailsPopup(baseUrl, orderId) {
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

    try {
        document.querySelector('.report-credit-orderdetails-popup').style.display = 'block';
        document.querySelector('.report-credit-popup').style.pointerEvents = "none";
        const response = await fetch(baseUrl + '/payment?orderId=' + orderId, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const creditOrderPaymentList = await response.json();
        console.log(creditOrderPaymentList);


        const paymentDetails = creditOrderPaymentList.data[0];

        document.getElementById("creditOrderDetailsOid").innerText = orderId;
        document.getElementById("creditOrderDetailsCid").innerText = paymentDetails[14];
        document.getElementById("creditOrderDetailsCashier").innerText = paymentDetails[4];
        document.getElementById("creditOrderDetailsDate").innerText = formatDate(paymentDetails[9]);
        document.getElementById("creditOrderDetailsNet").innerText = paymentDetails[7].toFixed(2);
        document.getElementById("creditOrderDetailsCash").innerText = paymentDetails[3].toFixed(2);
        document.getElementById("creditOrderDetailsCard").innerText = paymentDetails[2].toFixed(2);
        document.getElementById("creditOrderDetailsCredit").innerText = paymentDetails[5].toFixed(2);

        loadcreditOrdersTableDetails(baseUrl, orderId)

    } catch (error) {
        console.error(error);
    }

}

async function loadcreditOrdersTableDetails(baseUrl, orderId) {
    try {
        const response = await fetch(baseUrl + '/orders/details?orderId=' + orderId, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const tableData = await response.json();
        //console.log(tableData);



        let orderDetails = ''

        for (let i = 0; i < tableData.data.length; i++) {

            orderDetails += `
                        <tr>
                            <td>${i + 1}</td>
                            <td>${tableData.data[i].dishId}</td>
                            <td>${tableData.data[i].dishName}</td>
                            <td>${tableData.data[i].dishSize}</td>
                             <td>${tableData.data[i].unitPrice}</td>
                            <td>${tableData.data[i].orderQty}</td>
                            <td>${tableData.data[i].orderPrice}</td>
                        </tr>
                    `;

        }
        document.querySelector('#tblCreditOrderDetails tbody').innerHTML = orderDetails;

    } catch (error) {
        console.error(error);
    }

}

$("#btnBackPopupCredit").click('on', function () {
    $(".report-credit-popup").css('display', 'none');
    creditReportBackgroundOverlay.classList.remove("overlay");
    reportSideNavBr.style.pointerEvents = "auto"
    reportNavbar.style.pointerEvents = "auto"
});


$("#btnBackPopupPaymentHis").click('on', function () {
    $(".report-creditPayments-popup").css('display', 'none');
    document.querySelector('.report-credit-popup').style.pointerEvents = "auto";
});

$("#btnBackPopupCreditOrderDetails").click('on', function () {
    $(".report-credit-orderdetails-popup").css('display', 'none');
    document.querySelector('.report-credit-popup').style.pointerEvents = "auto";
});