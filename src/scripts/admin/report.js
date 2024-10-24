

const salesBackgroundOverlay = document.querySelector(".salesBackground");
const dishReportBackgroundOverlay = document.querySelector(".dishReportBackground");
const cashSettlemetReportBackgroundOverlay = document.querySelector(".cashSettlementReportBackground");
const creditPaymentReportBackgroundOverlay = document.querySelector(".creditPaymentReportBackground");
const creditReportBackgroundOverlay = document.querySelector(".creditReportBackground");
const reportSideNavBr = document.querySelector(".aside-nav-button-list");
const reportNavbar = document.querySelector(".navbar");






$("#btnBackPopup").click('on', function () {
    $(".report-sales-popup").css('display', 'none');
    salesBackgroundOverlay.classList.remove("overlay");
    reportSideNavBr.style.pointerEvents = "auto"
    reportNavbar.style.pointerEvents = "auto"
});

$("#btnBackPopupCredit").click('on', function () {
    $(".report-credit-popup").css('display', 'none');
    creditReportBackgroundOverlay.classList.remove("overlay");
    reportSideNavBr.style.pointerEvents = "auto"
    reportNavbar.style.pointerEvents = "auto"
});

$("#btnBackPopupDish").click('on', function () {
    $(".report-dish-popup").css('display', 'none');
    dishReportBackgroundOverlay.classList.remove("overlay");
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


$(document).ready(async function () {



    const baseUrl = await window.api.getBaseUrl();
    $(".report-card").click(function () {
        var targetId = $(this).data("target");

        $(".reports-section").css('display', 'none');
        $("#report-section").css('display', 'none');
        $("#" + targetId).css('display', 'block');
    });

    $(".btnBack").click(function () {
        var targetId = $(this).data("target");

        $("#" + targetId).css('display', 'none');
        $("#report-section").css('display', 'block');
    });

    stockOverviewReport(baseUrl);
    // currentStockReport(baseUrl);
    creditReport(baseUrl);
    stockHistory(baseUrl);
    cashSettlementReport(baseUrl);
    salesReport(baseUrl);

    //salesPopup();
    incomeReport(baseUrl);
    expensesReport(baseUrl);
    // creditPopup();
    OrderDetailsReport(baseUrl);
    dishReport(baseUrl);
    creditPayment(baseUrl);


    const tblCreditOrderDetailsPopup = new DataTable("#tblCreditOrderDetails", {
        paging: false,
        info: false,
    });

    const tblCreditPaymetPopup = new DataTable("#tblCreditpaymentPopup", {
        paging: false,
        info: false,
    });




    function downloadCSV(tableId, buttonId, fileName, columnHeaders) {

        var csvContent = columnHeaders.join(",") + "\n";


        $(`${tableId} tbody tr`).each(function () {
            $(this).find("td").each(function (index, element) {
                csvContent += $(element).text() + ",";
            });
            csvContent += "\n";
        });


        var blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

        var link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = fileName;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    $("#csvCurrentStock").click(function () {
        downloadCSV("#tblCurrentStock", "stockOverviwe_report.csv", "stockOverviwe_stock.csv", ["Id", "Ingredient Name", "Unit", "Qty", "Re-Order Level", "Status"]);
    });

    $("#csvStock").click(function () {
        downloadCSV("#tblStockHistory", "csvStockHistory", "stockHistory_report.csv", ["Id", "Ingredient Name", "Unit", "Price", "Qty", "Total", "Date", "Status"]);
    });

    $("#csvSales").click(function () {
        downloadCSV("#tblSales", "csvSales", "sales_report.csv", ["Id", "Customer Tp", "Cashier Name", "Table No", "Date", "Cash", "Card", "Credit", "Net Total"]);
    });

    $("#csvSalesPopup").click(function () {
        downloadCSV("#tblSalesPopup", "csvSalesPopup", "sales_popup_report.csv", ["Id", "Dish Name", "Dish Size", "Unit Price", "QTY", "Total"]);
    });

    $("#csvIncome").click(function () {
        downloadCSV("#tblIncome", "csvIncome", "income_report.csv", ["Payment Id", "Order Id", "Date", "Cash", "Card", "Credit", "Net Total"]);
    });

    $("#csvExpenses").click(function () {
        downloadCSV("#tblExpenses", "csvExpenses", "expenses_report.csv", ["Payment Id", "Stock Id", "Ingredient Name", "Date", "Unit price", "QTY", "Net Total"]);
    });

    $("#csvOrderDetails").click(function () {
        downloadCSV("#tblOrderDetails", "csvOrderDetails", "order_details_report.csv", ["Id", "Order Id", "Dish Name", "Dish Size", "Date", "QTY", "Unit Price", "Total"]);
    });

    $("#csvDish").click(function () {
        downloadCSV("#tblDish", "csvDish", "dish_report.csv", ["Id", "Order Id", "Customer", "Date", "QTY"]);
    });

    $("#csvCashSettlement").click(function () {
        downloadCSV("#tblCashSettlement", "csvCashSettlement", "cashSettlement_report.csv", ["Id", "Shift Id", "Cashier", "Shift Start", "Shift End", "System", "Total", "Variance"]);
    });

    $("#csvCredit").click(function () {
        downloadCSV("#tblCredit", "csvCredit", "credit_report.csv", ["Id", "Credit Id", "Customer Name", "Contact", "Last Payment", "Credit Amount", "Settled Amount", "Due Amount"]);
    });

    $("#csvCreditOrders").click(function () {
        downloadCSV("#tblCreditPopup", "csvCreditOrders", "customerWise_credit_report.csv", ["Id", "Order", "Order Date", "Last Payment", "Total", "Settled", "Due"]);
    });

    $("#csvCreditOrders").click(function () {
        downloadCSV("#tblCreditPopup", "csvCreditOrders", "customerWise_credit_report.csv", ["Id", "Order", "Order Date", "Last Payment", "Total", "Settled", "Due"]);
    });

    $("#csvCreditOrders").click(function () {
        downloadCSV("#tblCreditPopup", "csvCreditOrders", "customerWise_credit_report.csv", ["Id", "Order", "Order Date", "Last Payment", "Total", "Settled", "Due"]);
    });

    document.getElementById('csvCashSettlementPopup').addEventListener('click', () => {
        const data = [
            ["Cashier", "Start Time", "Start Float", "End Time", "End Float", "Actual Cash", "Actual Card", "Actual Credit", "Actual Total", "System Cash", "System Card", "System Credit", "System Total", "Variance Cash", "Variance Card", "Variance Credit", "Variance Total"],
            [
                document.getElementById('CSReportPopupCashier').textContent,
                document.getElementById('CSstartTime').textContent,
                document.getElementById('CSstartFloat').textContent,
                document.getElementById('CSendTime').textContent,
                document.getElementById('CSendTotal').textContent,
                document.getElementById('actual-cash').textContent,
                document.getElementById('actual-card').textContent,
                document.getElementById('actual-credit').textContent,
                document.getElementById('actual-tot').textContent,
                document.getElementById('syst-cash').textContent,
                document.getElementById('syst-card').textContent,
                document.getElementById('syst-credit').textContent,
                document.getElementById('syst-tot').textContent,
                document.getElementById('vari-cash').textContent,
                document.getElementById('vari-card').textContent,
                document.getElementById('vari-credit').textContent,
                document.getElementById('vari-tot').textContent,
            ]
        ];

        let csvContent = "data:text/csv;charset=utf-8,";
        data.forEach(row => {
            csvContent += row.join(",") + "\r\n";
        });

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "cash_settlement_popup_report.csv");
        document.body.appendChild(link);

        link.click();
        document.body.removeChild(link);
    });


});




//-------------------------Sales Report Start---------------------------------------
async function salesReport(baseUrl) {
    const response = await fetch(baseUrl + "/payment/getPaymentDetails", {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
    });
    const salesList = await response.json();
    // console.log(salesList);


    if (!salesList.data || salesList.data.length === 0) {
        console.warn('No sales data available to populate the table.');
        return;
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

    let salesDataList = "";
    for (let i = 0; i < salesList.data.length; i++) {
        salesDataList += `
            <tr>
                <td>${i + 1}</td>
                <td>${salesList.data[i][0]}</td>
                <td>${salesList.data[i][11]}-${salesList.data[i][12]}</td>
                <td>${salesList.data[i][7]}</td>                    
                <td>${salesList.data[i][10]}</td>
                <td>${formatDate(salesList.data[i][2])}</td>
                <td>${salesList.data[i][5]}</td>
                <td>${salesList.data[i][4]}</td>
                <td>${salesList.data[i][6]}</td>
                <td>${salesList.data[i][3]}</td>
            </tr>
        `;
    }

    document.querySelector('#tblSales tbody').innerHTML = salesDataList;

    const tblSales = new DataTable("#tblSales", {
        paging: false,
        info: false
    });

    // const tblSalesPopup = new DataTable('#tblSalesPopup', {
    //     paging: false,
    //     info: false
    // });

    const rows = document.querySelectorAll('#tblSales tbody tr');
    rows.forEach(function (row, index) {
        row.addEventListener("click", function () {
            const rowData = salesList.data[index];
            popupSales(baseUrl, rowData);
        });
    });

    const orderIds = [];
    document.querySelectorAll('#tblSales tbody tr').forEach(row => {
        if (row.cells.length > 1) {  
            const orders = row.cells[1].textContent.trim();
            if (!orderIds.includes(orders)) {
                orderIds.push(orders);
            }
        }
    });

    const orderIdSelectbox = document.getElementById('searchOrderIdSalesReport');
    orderIdSelectbox.innerHTML = '<option value="All">Order Id</option>';
    orderIds.forEach(orderId => {
        orderIdSelectbox.innerHTML += `<option value="${orderId}">${orderId}</option>`;
    });

    orderIdSelectbox.addEventListener("change", function () {
        const searchValue = this.value;
        tblSales.search(searchValue === "All" ? '' : searchValue).draw();

        if (tblSales.rows({ search: 'applied' }).count() === 0) {
            console.warn("No matching rows found for Order ID.");
            return
        }
        updateTotalSales();
    });

    const customerList = [];
    document.querySelectorAll('#tblSales tbody tr').forEach(row => {
        if (row.cells.length > 2) {
            const customer = row.cells[2].textContent.trim();
            if (!customerList.includes(customer)) {
                customerList.push(customer);
            }
        }
    });

    const customerDatalist = document.getElementById('customerTpList');
    customerList.forEach(customer => {
        customerDatalist.innerHTML += `<option value="${customer}">${customer}</option>`;
    });

    document.getElementById("searchCustomerSalesReport").addEventListener("input", function () {
        const searchValue = this.value;
        tblSales.search(searchValue === "All" ? '' : searchValue).draw();
        if (tblSales.rows({ search: 'applied' }).count() === 0) {
            console.warn("No matching rows found for Customer.");
            return
        }
        updateTotalSales();
    });

    const customerNames = [];
    document.querySelectorAll('#tblSales tbody tr').forEach(row => {
        if (row.cells.length > 3) {
            const customerName = row.cells[3].textContent.trim();
            if (!customerNames.includes(customerName)) {
                customerNames.push(customerName);
            }
        }
    });

    const customerNameSelectbox = document.getElementById('searchCustomerNameSalesReport');
    customerNameSelectbox.innerHTML = '<option value="All">Cashier Name</option>';
    customerNames.forEach(customerName => {
        customerNameSelectbox.innerHTML += `<option value="${customerName}">${customerName}</option>`;
    });

    customerNameSelectbox.addEventListener("change", function () {
        const searchValue = this.value;
        tblSales.search(searchValue === "All" ? '' : searchValue).draw();
        if (tblSales.rows({ search: 'applied' }).count() === 0) {
            console.warn("No matching rows found for Cashier Name.");
            return;
        }

        updateTotalSales();
    });

    updateTotalSales();
}


document.getElementById("custom-sales").addEventListener("change", function () {
    const selectedOption = this.value;
    filterSalesTable(selectedOption);
});

function filterSalesTable(selectedOption) {
    const today = new Date();
    const tableRows = document.querySelectorAll("#tblSales tbody tr");

    function showAllRows() {
        tableRows.forEach(function (row) {
            row.style.display = "table-row";
        });
    }

    tableRows.forEach(function (row) {
        const rowDate = new Date(row.cells[5].textContent);

        switch (selectedOption) {
            case "Today":
                document.getElementById("fromDateSales").disabled = true;
                document.getElementById("toDateSales").disabled = true;
                if (rowDate.toDateString() === today.toDateString()) {
                    row.style.display = "table-row";

                } else {
                    row.style.display = "none";
                }
                break;
            case "Yesterday":
                document.getElementById("fromDateSales").value = '';
                document.getElementById("toDateSales").value = '';
                document.getElementById("fromDateSales").disabled = true;
                document.getElementById("toDateSales").disabled = true;
                const yesterday = new Date();
                yesterday.setDate(today.getDate() - 1);
                if (rowDate.toDateString() === yesterday.toDateString()) {
                    row.style.display = "table-row";

                } else {
                    row.style.display = "none";
                }
                break;
            case "Last Month":
                document.getElementById("fromDateSales").disabled = true;
                document.getElementById("toDateSales").disabled = true;
                const lastMonth = new Date();
                lastMonth.setMonth(today.getMonth() - 1);
                if (rowDate.getMonth() === lastMonth.getMonth() &&
                    rowDate.getFullYear() === lastMonth.getFullYear()) {
                    row.style.display = "table-row";
                    //  updateTotalSales();
                } else {
                    row.style.display = "none";
                }
                break;
            case "Last Year":
                document.getElementById("fromDateSales").disabled = true;
                document.getElementById("toDateSales").disabled = true;
                const lastYear = new Date();
                lastYear.setFullYear(today.getFullYear() - 1);
                if (rowDate.getFullYear() === lastYear.getFullYear()) {
                    row.style.display = "table-row";
                    //  updateTotalSales();
                } else {
                    row.style.display = "none";
                }
                break;
            case "Custom":
                document.getElementById("fromDateSales").disabled = false;
                document.getElementById("toDateSales").disabled = false;
                showAllRows();
                document.getElementById("toDateSales").value = new Date().toISOString().split('T')[0];

                document.getElementById("fromDateSales").addEventListener("change", filterCustomDate);
                document.getElementById("toDateSales").addEventListener("change", filterCustomDate);

                function filterCustomDate() {
                    const fromDate = new Date(document.getElementById("fromDateSales").value);
                    const toDate = new Date(document.getElementById("toDateSales").value);
                    toDate.setHours(23, 59, 59, 999);

                    tableRows.forEach(function (row) {
                        const rowDate = new Date(row.cells[5].textContent);
                        if (rowDate >= fromDate && rowDate <= toDate) {
                            row.style.display = "table-row";
                            // updateTotalSales();
                        } else {
                            row.style.display = "none";
                        }
                    });
                    updateTotalSales();
                }
                break;
            case "All":
            default:
                document.getElementById("fromDateSales").value = '';
                document.getElementById("toDateSales").value = '';
                document.getElementById("fromDateSales").disabled = true;
                document.getElementById("toDateSales").disabled = true;
                showAllRows();

                break;
        }

    });
    updateTotalSales();

}

function updateTotalSales() {
    let totalCash = 0;
    let totalCard = 0;
    let totalCredit = 0;
    let totalNet = 0;

    const rows = document.querySelectorAll("#tblSales tbody tr");

    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        if (getComputedStyle(row).display !== "none") {
            const cashAmount = parseInt(row.cells[6].textContent);
            const cardAmount = parseInt(row.cells[7].textContent) || 0;
            const creditAmount = parseInt(row.cells[8].textContent) || 0;
            const netTotal = parseInt(row.cells[9].textContent) || 0;

            totalCash += cashAmount;
            totalCard += cardAmount;
            totalCredit += creditAmount;
            totalNet += netTotal;
        }
    }

    document.getElementById("report_cash_sales").textContent = totalCash.toFixed(2);
    document.getElementById("report_card_sales").textContent = totalCard.toFixed(2);
    document.getElementById("report_credit_sales").textContent = totalCredit.toFixed(2);
    document.getElementById("reportTotalSales").textContent = totalNet.toFixed(2);
}

async function popupSales(baseUrl, rowData) {
    // console.log(rowData);
    document.querySelector('.report-sales-popup').style.display = 'block';
    salesBackgroundOverlay.classList.add("overlay");
    reportSideNavBr.style.pointerEvents = "none"
    reportNavbar.style.pointerEvents = "none"

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

    document.getElementById('salesReportPopUpOId').textContent = rowData[8];
    document.getElementById('salesReportPopUpTid').textContent = rowData[10];
    document.getElementById('salesReportPopUpNetTot').textContent = rowData[3];
    document.getElementById('salesReportPopUpCus').textContent = rowData[11];
    document.getElementById('salesReportPopUpCashier').textContent = rowData[7];
    document.getElementById('salesReportPopUpDate').textContent = formatDate(rowData[2]);

    const id = document.getElementById("salesReportPopUpOId").textContent;
    const response = await fetch(baseUrl + "/orders/details?odId=" + id, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
    });
    const salesOrderDetailsList = await response.json();

    let salesOrderDetailsDataList = "";

    for (let i = 0; i < salesOrderDetailsList.data.length; i++) {
        salesOrderDetailsDataList += `
            <tr>
                <td>${i + 1}</td>
                <td>${salesOrderDetailsList.data[i].dishId}</td>
                <td>${salesOrderDetailsList.data[i].dishName}</td>
                <td>${salesOrderDetailsList.data[i].dishSize}</td>
                <td>${salesOrderDetailsList.data[i].unitPrice}</td>
                <td>${salesOrderDetailsList.data[i].orderQty}</td>
                <td>${salesOrderDetailsList.data[i].orderPrice}</td>
            </tr>
        `;
    }

    document.getElementById('tblSalesPopup').getElementsByTagName('tbody')[0].innerHTML = salesOrderDetailsDataList;
};
//-------------------------Sales Report End---------------------------------------


//-------------------------Income Report Start---------------------------------------
async function incomeReport(baseUrl) {
    try {
        const response = await fetch(baseUrl + "/payment/getAllPayment", {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
        });
        const incomeDataList = await response.json();

        if (!incomeDataList.data || incomeDataList.data.length === 0) {
            console.warn('No income data available to populate the table.');
            return;
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

        let incomeReportData = "";
        for (let i = 0; i < incomeDataList.data.length; i++) {
            incomeReportData += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${incomeDataList.data[i].paymentId}</td>
                    <td>${incomeDataList.data[i].orderId}</td>
                    <td>${formatDate(incomeDataList.data[i].paymentDateTime)}</td>
                    <td>${incomeDataList.data[i].cashPayment}</td>
                    <td>${incomeDataList.data[i].cardPayment}</td>
                    <td>${incomeDataList.data[i].creditPayment}</td>
                    <td>${incomeDataList.data[i].paymentTotal}</td>
                </tr>
            `;
        }
        document.querySelector('#tblIncome tbody').innerHTML = incomeReportData;

        const tblIncome = new DataTable(document.getElementById("tblIncome"), {
            paging: false,
            info: false
        });

        const paymentIds = [];
        const orderIds = [];
        const rows = document.getElementById('tblIncome').getElementsByTagName('tbody')[0].getElementsByTagName('tr');

        for (let i = 0; i < rows.length; i++) {
            const paymentId = rows[i].cells[1].textContent.trim();
            const orderId = rows[i].cells[2].textContent.trim();

            if (!paymentIds.includes(paymentId)) {
                paymentIds.push(paymentId);
            }

            if (!orderIds.includes(orderId)) {
                orderIds.push(orderId);
            }
        }

        const datalist = document.getElementById('incomeOrderIdList');
        paymentIds.concat(orderIds).forEach(function (id) {
            const option = document.createElement('option');
            option.value = id;
            datalist.appendChild(option);
        });

        document.getElementById("orderIdIncome").addEventListener("input", function () {
            const searchValue = this.value.trim();

            if (searchValue === "All") {
                tblIncome.search('').draw(); 
            } else {
                tblIncome.search(searchValue).draw(); 

              
                if (tblIncome.rows({ search: 'applied' }).count() === 0) {
                    console.warn("No matching rows found.");
                    return
                }
                calculateIncomeTotals();
            }
        });

        calculateIncomeTotals();
    } catch (error) {
        console.error('Error fetching or processing income report data:', error);
    }
}


document.getElementById("custom-income").addEventListener("change", function () {
    var selectedOption = this.value;
    filterIncomeTable(selectedOption);

});

function filterIncomeTable(selectedOption) {
    const today = new Date();
    const tableRows = document.querySelectorAll("#tblIncome tbody tr");

    function showAllRows() {
        tableRows.forEach(row => {
            row.style.display = "table-row";
        });
    }

    tableRows.forEach(row => {
        const rowDate = new Date(row.cells[3].textContent);

        switch (selectedOption) {
            case "Today":
                document.getElementById("fromDateIncome").disabled = true;
                document.getElementById("toDateIncome").disabled = true;
                if (rowDate.toDateString() === today.toDateString()) {
                    row.style.display = "table-row";
                } else {
                    row.style.display = "none";
                }
                break;
            case "Yesterday":
                document.getElementById("fromDateIncome").value = '';
                document.getElementById("toDateIncome").value = '';
                document.getElementById("fromDateIncome").disabled = true;
                document.getElementById("toDateIncome").disabled = true;
                const yesterday = new Date();
                yesterday.setDate(today.getDate() - 1);
                if (rowDate.toDateString() === yesterday.toDateString()) {
                    row.style.display = "table-row";
                } else {
                    row.style.display = "none";
                }
                break;
            case "Last Month":
                document.getElementById("fromDateIncome").disabled = true;
                document.getElementById("toDateIncome").disabled = true;
                const lastMonth = new Date();
                lastMonth.setMonth(today.getMonth() - 1);
                if (rowDate.getMonth() === lastMonth.getMonth() &&
                    rowDate.getFullYear() === lastMonth.getFullYear()) {
                    row.style.display = "table-row";
                } else {
                    row.style.display = "none";
                }
                break;
            case "Last Year":
                document.getElementById("fromDateIncome").disabled = true;
                document.getElementById("toDateIncome").disabled = true;
                const lastYear = new Date();
                lastYear.setFullYear(today.getFullYear() - 1);
                if (rowDate.getFullYear() === lastYear.getFullYear()) {
                    row.style.display = "table-row";
                } else {
                    row.style.display = "none";
                }
                break;
            case "Custom":
                document.getElementById("fromDateIncome").disabled = false;
                document.getElementById("toDateIncome").disabled = false;
                showAllRows();
                document.getElementById("toDateIncome").value = new Date().toISOString().split('T')[0];


                document.getElementById("fromDateIncome").removeEventListener("change", filterIncomeCustomDate);
                document.getElementById("toDateIncome").removeEventListener("change", filterIncomeCustomDate);

                document.getElementById("fromDateIncome").addEventListener("change", filterIncomeCustomDate);
                document.getElementById("toDateIncome").addEventListener("change", filterIncomeCustomDate);

                function filterIncomeCustomDate() {
                    const fromDate = new Date(document.getElementById("fromDateIncome").value);
                    const toDate = new Date(document.getElementById("toDateIncome").value);
                    toDate.setHours(23, 59, 59, 999);

                    tableRows.forEach(row => {
                        const rowDate = new Date(row.cells[3].textContent);
                        if (rowDate >= fromDate && rowDate <= toDate) {
                            row.style.display = "table-row";
                        } else {
                            row.style.display = "none";
                        }
                    });
                    calculateIncomeTotals();
                }
                break;
            case "All":
            default:
                document.getElementById("fromDateIncome").value = '';
                document.getElementById("toDateIncome").value = '';
                document.getElementById("fromDateIncome").disabled = true;
                document.getElementById("toDateIncome").disabled = true;
                showAllRows();

                break;

        }
    });

    calculateIncomeTotals();
}


function calculateIncomeTotals() {
    let totalCash = 0;
    let totalCard = 0;
    let totalCredit = 0;
    let totalAmount = 0;

    const tableRows = document.querySelectorAll("#tblIncome tbody tr");

    tableRows.forEach(function (row) {
        if (row.style.display !== "none") {
            const cash = parseFloat(row.cells[4].textContent);
            const card = parseFloat(row.cells[5].textContent);
            const credit = parseFloat(row.cells[6].textContent);
            const netTotal = parseFloat(row.cells[7].textContent);

            totalCash += isNaN(cash) ? 0 : cash;
            totalCard += isNaN(card) ? 0 : card;
            totalCredit += isNaN(credit) ? 0 : credit;
            totalAmount += isNaN(netTotal) ? 0 : netTotal;
        }
    });

    document.getElementById("report_cash_income").textContent = totalCash.toFixed(2);
    document.getElementById("report_card_income").textContent = totalCard.toFixed(2);
    document.getElementById("report_credit_income").textContent = totalCredit.toFixed(2);
    document.getElementById("report_total_income").textContent = totalAmount.toFixed(2);
}

//-------------------------Income Report End---------------------------------------



//-------------------------Expenses Report Start---------------------------------------
const tblExpencess = new DataTable("#tblExpenses", {
    paging: false,
    info: false
});

async function expensesReport(baseUrl) {
    try {
        const response = await fetch(baseUrl + "/stock/stockDetailsWithIngredients", {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
        });

        if (!response.ok) {
            throw new Error("Network response was not ok " + response.statusText);
        }

        const expensesDataList = await response.json();
       // console.log(expensesDataList);
        

        if (!expensesDataList.data || expensesDataList.data.length === 0) {
            console.warn('No Expenses data available to populate the table.');
            return;
        }

        let expensesReportData = "";

        for (let i = 0; i < expensesDataList.data.length; i++) {
            expensesReportData += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${expensesDataList.data[i][8]}</td>
                    <td>${expensesDataList.data[i][11]}</td>
                    <td>${expensesDataList.data[i][2]}</td>
                    <td>${expensesDataList.data[i][7]}</td>
                    <td>${expensesDataList.data[i][4]}</td>
                    <td>${expensesDataList.data[i][5]}</td>
                </tr>
            `;
        }

        const tableBody = document.getElementById('tblExpenses').querySelector('tbody');
        tableBody.innerHTML = expensesReportData;

        tblExpencess.clear().rows.add($(tableBody).children()).draw();

        const expensesStockIds = [];
        const expensesIngredientNames = [];

        document.querySelectorAll('#tblExpenses tbody tr').forEach(function (row) {
            const stockId = row.cells[1].textContent.trim();
            const ingredientName = row.cells[2].textContent.trim();

            if (!expensesStockIds.includes(stockId)) {
                expensesStockIds.push(stockId);
            }
            if (!expensesIngredientNames.includes(ingredientName)) {
                expensesIngredientNames.push(ingredientName);
            }
        });

        const datalist = document.getElementById("expensesList");
        datalist.innerHTML = '';
        [...expensesStockIds, ...expensesIngredientNames].forEach(id => {
            const option = document.createElement("option");
            option.value = id;
            datalist.appendChild(option);
        });

    } catch (error) {
        console.error("Error fetching expenses report:", error);
    }
    calculateExpensesTotals();
}

document.getElementById("orderIdExpenses").addEventListener("input", function () {
    const searchValue = this.value;
    tblExpencess.search(searchValue === "All" ? '' : searchValue).draw();
    calculateExpensesTotals();
});

document.getElementById("custom-expenses").addEventListener("change", function () {
    var selectedOption = this.value;
    filterExpensesTable(selectedOption);
});

function filterExpensesTable(selectedOption) {
    const today = new Date();
    const tableRows = document.querySelectorAll("#tblExpenses tbody tr");
    const fromDateInput = document.getElementById('fromDateExpenses');
    const toDateInput = document.getElementById('toDateExpenses');

    function showAllRows() {
        tableRows.forEach(function (row) {
            row.style.display = "table-row";
        });
    }

    tableRows.forEach(function (row) {
        const rowDate = new Date(row.cells[3].textContent);

        switch (selectedOption) {
            case "Today":
                fromDateInput.disabled = true;
                toDateInput.disabled = true;
                if (rowDate.toDateString() === today.toDateString()) {
                    row.style.display = "table-row";
                } else {
                    row.style.display = "none";
                }
                break;

            case "Yesterday":
                fromDateInput.value = '';
                toDateInput.value = '';
                fromDateInput.disabled = true;
                toDateInput.disabled = true;
                const yesterday = new Date(today);
                yesterday.setDate(today.getDate() - 1);
                if (rowDate.toDateString() === yesterday.toDateString()) {
                    row.style.display = "table-row";
                } else {
                    row.style.display = "none";
                }
                break;

            case "Last Month":
                fromDateInput.disabled = true;
                toDateInput.disabled = true;
                const lastMonth = new Date(today);
                lastMonth.setMonth(today.getMonth() - 1);
                if (rowDate.getMonth() === lastMonth.getMonth() &&
                    rowDate.getFullYear() === lastMonth.getFullYear()) {
                    row.style.display = "table-row";
                } else {
                    row.style.display = "none";
                }
                break;

            case "Last Year":
                fromDateInput.disabled = true;
                toDateInput.disabled = true;
                const lastYear = new Date(today);
                lastYear.setFullYear(today.getFullYear() - 1);
                if (rowDate.getFullYear() === lastYear.getFullYear()) {
                    row.style.display = "table-row";
                } else {
                    row.style.display = "none";
                }
                break;

            case "Custom":
                fromDateInput.disabled = false;
                toDateInput.disabled = false;
                fromDateInput.value = '';
                toDateInput.value = new Date().toISOString().split('T')[0];

                showAllRows();

                fromDateInput.addEventListener("change", filterCustomDate);
                toDateInput.addEventListener("change", filterCustomDate);

                function filterCustomDate() {
                    const fromDate = new Date(fromDateInput.value);
                    const toDate = new Date(toDateInput.value);

                    tableRows.forEach(function (row) {
                        const rowDate = new Date(row.cells[3].textContent);
                        if (rowDate >= fromDate && rowDate <= toDate) {
                            row.style.display = "table-row";
                        } else {
                            row.style.display = "none";
                        }
                    });
                    calculateExpensesTotals();
                }
                break;

            case "All":
            default:
                fromDateInput.value = '';
                toDateInput.value = '';
                fromDateInput.disabled = true;
                toDateInput.disabled = true;
                showAllRows();
                break;
        }
    });

    calculateExpensesTotals();
}


function calculateExpensesTotals() {
    let totalIngrQty = 0;
    let totalExpenses = 0;

    const tableRows = document.querySelectorAll("#tblExpenses tbody tr");
    tableRows.forEach(row => {
        if (row.style.display !== "none") {
            const qty = parseFloat(row.cells[5].textContent);
            const netTotal = parseFloat(row.cells[6].textContent);

            totalIngrQty += qty;
            totalExpenses += netTotal;
        }
    });

    document.getElementById("reportTotalQtyExpenses").textContent = totalIngrQty;
    document.getElementById("reportTotalExpenses").textContent = totalExpenses.toFixed(2);
}

//-------------------------Expenses Report End---------------------------------------




//-------------------------Stock History Report Start---------------------------------------

const tblStock = new DataTable("#tblStockHistory", {
    paging: false,
    info: false
});

async function stockHistory(baseUrl) {
    try {
        const response = await fetch(baseUrl + "/stockDetails/getActiveStockDetailsDescOrder", {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
        });

        if (!response.ok) {
            throw new Error("Network response was not ok " + response.statusText);
        }

        const stockDataList = await response.json();
         //console.log(stockDataList);
        
        if (!stockDataList.data || stockDataList.data.length === 0) {
            console.warn('No stock history data available to populate the table.');
            return;
        }

        let stockReportData = "";

        for (let i = 0; i < stockDataList.data.length; i++) {
            stockReportData += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${stockDataList.data[i][11]}</td>
                    <td>${stockDataList.data[i][6]}</td>
                    <td>${stockDataList.data[i][7]}</td>
                    <td>${stockDataList.data[i][4].toFixed(3)}</td>
                    <td>${stockDataList.data[i][5]}</td>
                    <td>${stockDataList.data[i][2]}</td>
                    <td>${stockDataList.data[i][1]}</td>
                </tr>
            `;
        }

        const tableBody = document.getElementById('tblStockHistory').querySelector('tbody');
        tableBody.innerHTML = stockReportData;

        tblStock.clear().rows.add($(tableBody).children()).draw();

        const ingredientsNames = [];
        document.querySelectorAll('#tblStockHistory tbody tr').forEach(function (row) {
            const ingredientName = row.cells[1].textContent.trim();
            if (!ingredientsNames.includes(ingredientName)) {
                ingredientsNames.push(ingredientName);
            }
        });


        const ingredientSelectbox = document.getElementById('ingredientsNamesList');
        ingredientSelectbox.innerHTML = '';
        ingredientsNames.forEach(function (ingredientName) {
            const option = document.createElement('option');
            option.value = ingredientName;
            option.textContent = ingredientName;
            ingredientSelectbox.appendChild(option);
        });


        const units = [];
        document.querySelectorAll('#tblStockHistory tbody tr').forEach(row => {
            const unit = row.cells[2].textContent.trim();
            if (!units.includes(unit)) {
                units.push(unit);
            }
        });


        const unitSelectbox = document.getElementById('searchUnitTypeStockHistoryReport');
        unitSelectbox.innerHTML = '<option value="All">Unit</option>';
        units.forEach(unit => {
            unitSelectbox.innerHTML += `<option value="${unit}">${unit}</option>`;
        });


        const stockStatus = [];
        document.querySelectorAll('#tblStockHistory tbody tr').forEach(row => {
            const status = row.cells[7].textContent.trim();
            if (!stockStatus.includes(status)) {
                stockStatus.push(status);
            }
        });


        const statusSelectbox = document.getElementById('searchStatusStockHistoryReport');
        statusSelectbox.innerHTML = '<option value="All">Status</option>';
        stockStatus.forEach(status => {
            statusSelectbox.innerHTML += `<option value="${status}">${status}</option>`;
        });

    } catch (error) {
        console.error("Error fetching stock report:", error);
    }
}


document.getElementById("searchIngredientStockReport").addEventListener("input", function () {
    const searchValue = this.value;
    tblStock.search(searchValue === "All" ? '' : searchValue).draw();
});

document.getElementById("searchUnitTypeStockHistoryReport").addEventListener("change", function () {
    const searchValue = this.value;
    const columnIndex = 2;
    tblStock.column(columnIndex).search(searchValue === "All" ? '' : '^' + searchValue + '$', true, false).draw();
});

document.getElementById("searchStatusStockHistoryReport").addEventListener("change", function () {
    const searchValue = this.value;
    tblStock.search(searchValue === "All" ? '' : searchValue).draw();
});


document.getElementById('custom-stock').addEventListener('change', function () {
    var selectedOption = this.value;
    filterStockTable(selectedOption);
});

function filterStockTable(selectedOption) {
    const today = new Date();
    const tableRows = document.querySelectorAll("#tblStockHistory tbody tr");
    const fromDateInput = document.getElementById('fromDateStock');
    const toDateInput = document.getElementById('toDateStock');

    function showAllRows() {
        tableRows.forEach(function (row) {
            row.style.display = "table-row";
        });
    }

    tableRows.forEach(function (row) {
        const rowDate = new Date(row.cells[6].textContent);

        switch (selectedOption) {
            case "Today":
                fromDateInput.disabled = true;
                toDateInput.disabled = true;
                if (rowDate.toDateString() === today.toDateString()) {
                    row.style.display = "table-row";
                } else {
                    row.style.display = "none";
                }
                break;

            case "Yesterday":
                fromDateInput.value = '';
                toDateInput.value = '';
                fromDateInput.disabled = true;
                toDateInput.disabled = true;
                const yesterday = new Date(today);
                yesterday.setDate(today.getDate() - 1);

                if (rowDate.toDateString() === yesterday.toDateString()) {
                    row.style.display = "table-row";
                } else {
                    row.style.display = "none";
                }
                break;

            case "Last Month":
                fromDateInput.disabled = true;
                toDateInput.disabled = true;
                const lastMonth = new Date(today);
                lastMonth.setMonth(today.getMonth() - 1);

                if (
                    rowDate.getMonth() === lastMonth.getMonth() &&
                    rowDate.getFullYear() === lastMonth.getFullYear()
                ) {
                    row.style.display = "table-row";
                } else {
                    row.style.display = "none";
                }
                break;

            case "Last Year":
                fromDateInput.disabled = true;
                toDateInput.disabled = true;
                const lastYear = new Date(today);
                lastYear.setFullYear(today.getFullYear() - 1);

                if (rowDate.getFullYear() === lastYear.getFullYear()) {
                    row.style.display = "table-row";
                } else {
                    row.style.display = "none";
                }
                break;

            case "Custom":
                fromDateInput.disabled = false;
                toDateInput.disabled = false;
                fromDateInput.value = '';
                toDateInput.value = new Date().toISOString().split('T')[0];

                showAllRows();

                fromDateInput.addEventListener("change", function () {
                    filterCustomDate();
                });

                toDateInput.addEventListener("change", function () {
                    filterCustomDate();
                });

                function filterCustomDate() {
                    const fromDate = new Date(fromDateInput.value);
                    const toDate = new Date(toDateInput.value);

                    tableRows.forEach(function (row) {
                        const rowDate = new Date(row.cells[6].textContent);
                        if (rowDate >= fromDate && rowDate <= toDate) {
                            row.style.display = "table-row";
                        } else {
                            row.style.display = "none";
                        }
                    });
                }
                break;

            case "All":
            default:
                fromDateInput.value = '';
                toDateInput.value = '';
                fromDateInput.disabled = true;
                toDateInput.disabled = true;
                showAllRows();
                break;
        }
    });
}
//-------------------------Stock History Report End---------------------------------------



let selectedCreditCustomerId = null;
const tblCredit = new DataTable("#tblCreditReport", {
    paging: false,
    info: false,

});

// Main function 
async function creditReport(baseUrl) {
    const response = await fetch(`${baseUrl}/CreditCustomer/customerWithLastPayment`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
    });

    const creditDataList = await response.json();
   // console.log(creditDataList.data);
    
    if (!creditDataList.data || creditDataList.data.length === 0) {
        console.warn('No credit data available to populate the table.');
        return;
    }

    let creditList = "";

    creditDataList.data.forEach((item, index) => {
        const lastPayment = item[6] === null ? "No Recent Payments" : formatDate(item[6]);
        creditList += `
            <tr>
                <td>${index + 1}</td>
                <td>${item[0]}</td>
                <td>${item[7]}</td>
                <td>${item[8]}</td>
                <td>${lastPayment}</td>
                <td>${item[5]}</td>
                <td>${item[4]}</td>
                <td>${item[3]}</td>
            </tr>`;
    });


    const tableBody = document.getElementById('tblCreditReport').querySelector('tbody');
    tableBody.innerHTML = creditList;

    tblCredit.clear().rows.add($(tableBody).children()).draw();

    //populateCreditTable(creditDataList.data);

    const customersContactArr = [];
    const customersNameArr = [];


    document.querySelectorAll('#tblCreditReport tbody tr').forEach(function (row) {
        const customerContact = row.cells[3].textContent.trim();
        const customerName = row.cells[2].textContent.trim();

        if (!customersNameArr.includes(customerName)) {
            customersNameArr.push(customerName);
        }
        if (!customersContactArr.includes(customerContact)) {
            customersContactArr.push(customerContact);
        }
    });

    const datalist = document.getElementById("creditCustList");
    datalist.innerHTML = '';
    [...customersContactArr, ...customersNameArr].forEach(id => {
        const option = document.createElement("option");
        option.value = id;
        datalist.appendChild(option);
    });

    setupRowClickEvent(creditDataList.data, baseUrl);
    calculateTotalCreditDue();
}

document.getElementById("cusNameCredit").addEventListener("input", function () {
    const searchValue = this.value;
    tblCredit.search(searchValue === "All" ? '' : searchValue).draw();
    calculateTotalCreditDue();
});


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



function setupRowClickEvent(data, baseUrl) {
    const rows = document.querySelectorAll('#tblCreditReport tbody tr');
    rows.forEach((row, index) => {
        row.addEventListener("click", function () {
            const customerId = data[index][2];
            selectedCreditCustomerId = customerId;
            document.getElementById("creditCusOrderList").innerHTML = "";
            creditOrdersPopup(baseUrl, customerId);
        });
    });
}


function filterCreditTable(selectedOption) {
    const today = new Date();
    const tableRows = document.querySelectorAll("#tblCreditReport tbody tr");
    const fromDateInput = document.getElementById('fromDateCredit');
    const toDateInput = document.getElementById('toDateCredit');

    function getDateOnly(date) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    }

    function showAllRows() {
        tableRows.forEach(row => row.style.display = "table-row");
    }

    tableRows.forEach(row => {
        const rowDate = new Date(row.cells[4].textContent);
        const rowDateOnly = getDateOnly(rowDate);

        switch (selectedOption) {
            case "Today":
            case "Yesterday":
            case "Last Month":
            case "Last Year":
                fromDateInput.disabled = true;
                toDateInput.disabled = true;

                let compareDate;
                switch (selectedOption) {
                    case "Today": compareDate = today; break;
                    case "Yesterday": compareDate = new Date(today); compareDate.setDate(today.getDate() - 1); break;
                    case "Last Month": compareDate = new Date(today); compareDate.setMonth(today.getMonth() - 1); break;
                    case "Last Year": compareDate = new Date(today); compareDate.setFullYear(today.getFullYear() - 1); break;
                }

                row.style.display = rowDateOnly.getTime() === getDateOnly(compareDate).getTime() ? "table-row" : "none";
                break;

            case "Custom":
                fromDateInput.disabled = false;
                toDateInput.disabled = false;
                fromDateInput.value = '';
                toDateInput.value = new Date().toISOString().split('T')[0];

                showAllRows();
                fromDateInput.addEventListener("change", filterCustomDate);
                toDateInput.addEventListener("change", filterCustomDate);

                function filterCustomDate() {
                    const fromDateOnly = getDateOnly(new Date(fromDateInput.value));
                    const toDateOnly = getDateOnly(new Date(toDateInput.value));

                    tableRows.forEach(row => {
                        const rowDateOnly = getDateOnly(new Date(row.cells[4].textContent));
                        row.style.display = (rowDateOnly >= fromDateOnly && rowDateOnly <= toDateOnly) ? "table-row" : "none";
                    });
                    calculateTotalCreditDue();
                }
                break;

            case "All":
            default:
                fromDateInput.disabled = true;
                toDateInput.disabled = true;
                showAllRows();
                break;
        }
    });

    calculateTotalCreditDue();
}

// Event listener for date filtering
document.getElementById('custom-credit').addEventListener('change', function () {
    filterCreditTable(this.value);
  
});


function calculateTotalCreditDue() {
    let totalDue = 0;

    const tableRows = document.querySelectorAll("#tblCreditReport tbody tr");

    tableRows.forEach(function (row) {
        if (getComputedStyle(row).display !== "none") {
            const due = parseFloat(row.cells[7].textContent);

            if (!isNaN(due)) {
                totalDue += due;
            }
        }
    });

    document.getElementById("reportTotalCredit").textContent = totalDue.toFixed(2);
}


document.querySelector('#creditOrders-status').addEventListener('change', async function () {
    const baseUrl = await window.api.getBaseUrl();
    if (selectedCreditCustomerId) {
        document.getElementById("creditCusOrderList").innerHTML = ""
        creditOrdersPopup(baseUrl, selectedCreditCustomerId);
    }

});



async function creditOrdersPopup(baseUrl, selectedCreditCustomerId) {

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

        document.querySelector('.report-credit-popup').style.display = 'block';
        creditReportBackgroundOverlay.classList.add("overlay");
        reportSideNavBr.style.pointerEvents = "none"
        reportNavbar.style.pointerEvents = "none"
        const response = await fetch(baseUrl + '/CreditCustomerDetail?customerId=' + selectedCreditCustomerId, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const creditOrdersDetailsList = await response.json();
        //console.log(creditOrdersDetailsList);


        let creditOrderDetailsDataList = "";

        const statusFilter = document.querySelector('#creditOrders-status').value;
        // console.log(statusFilter);

        for (let i = 0; i < creditOrdersDetailsList.data.length; i++) {

            const lastPayment = creditOrdersDetailsList.data[i].lastPaymentDateTime === null ? "No Recent Payments" : formatDate(creditOrdersDetailsList.data[i].lastPaymentDateTime);
            if ((statusFilter === 'Pending' && creditOrdersDetailsList.data[i].dueCreditDetailAmount !== 0) ||
                (statusFilter === 'Paid' && creditOrdersDetailsList.data[i].dueCreditDetailAmount === 0) ||
                (statusFilter === 'all')) {
                creditOrderDetailsDataList += `
                        <tr>
                            <td>${i + 1}</td>
                            <td>${creditOrdersDetailsList.data[i].orderId}</td>
                            <td>${formatDate(creditOrdersDetailsList.data[i].orderDateTime)}</td>
                            <td>${lastPayment}</td>
                            <td>${creditOrdersDetailsList.data[i].totalCreditDetailAmount}</td>
                            <td>${creditOrdersDetailsList.data[i].settledCreditDetailAmount}</td>
                            <td>${creditOrdersDetailsList.data[i].dueCreditDetailAmount}</td>
                            <td><button class="btnTableCreditOrders btn-submit btnPaymentHistory"  style="margin-right: 8px;"><img src="../icons/history.png" height="25px" alt=""></button><button class="btnTableCreditOrders btn-submit btnOrderDetailsHistory"><img src="../icons/orderCreditNew.png" height="25px" alt=""></button></td>
                      
                        </tr>
                    `;
            }

        }

        document.querySelector('#tblCreditPopup tbody').innerHTML = creditOrderDetailsDataList;


        const creditCusOrders = [];

        document.querySelectorAll('#tblCreditPopup tbody tr').forEach((row) => {
            const orderId = row.cells[1].textContent.trim();

            if (!creditCusOrders.includes(orderId)) {
                creditCusOrders.push(orderId);
            }

        });

        const datalist = document.getElementById('creditCusOrderList');
        [...creditCusOrders].forEach((id) => {
            const option = document.createElement('option');
            option.value = id;
            datalist.appendChild(option);
        });

        document.getElementById("creditorderId").addEventListener("input", function () {
            const searchValue = this.value.toLowerCase();
            const rows = document.querySelectorAll('#tblCreditPopup tbody tr');

            rows.forEach(row => {
                const orderId = row.cells[1].textContent.toLowerCase();
                if (searchValue === "all" || orderId.includes(searchValue)) {
                    row.style.display = "table-row";
                    calculateOrdersWiseCreditTotals()
                } else {
                    row.style.display = "none";
                    calculateOrdersWiseCreditTotals()
                }
            });
        });

        document.getElementById('paymentDateCredit').addEventListener('input', function () {
            const selectedDate = this.value;
            const rows = document.querySelectorAll('#tblCreditPopup tbody tr');

            rows.forEach(row => {
                const dateCell = row.cells[3];
                if (dateCell) {
                    const dateValue = dateCell.textContent.split(' ')[0];
                    if (selectedDate === "" || selectedDate === dateValue) {
                        row.style.display = '';
                        calculateOrdersWiseCreditTotals()
                    } else {
                        row.style.display = 'none';
                        calculateOrdersWiseCreditTotals()
                    }
                }
            });
        });

        calculateOrdersWiseCreditTotals();

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

document.getElementById('custom-creditOrders').addEventListener('change', function () {
    const selectedOption = this.value;
    filterCreditOrdrsTable(selectedOption);
});


function filterCreditOrdrsTable(selectedOption) {
    const today = new Date();
    const tableRows = document.querySelectorAll("#tblCreditPopup tbody tr");
    const fromDateInput = document.getElementById('fromDateCreditOrders');
    const toDateInput = document.getElementById('toDateCreditOrders');

    // Helper function to get only the date part
    function getDateOnly(date) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    }

    // Function to show all rows
    function showAllRows() {
        tableRows.forEach(row => row.style.display = "table-row");
    }

    // Main filtering logic
    tableRows.forEach(row => {
        const rowDate = new Date(row.cells[2].textContent); // Adjust index to your date cell
        const rowDateOnly = getDateOnly(rowDate);

        switch (selectedOption) {
            case "Today":
            case "Yesterday":
            case "Last Month":
            case "Last Year":
                fromDateInput.disabled = true;
                toDateInput.disabled = true;

                let compareDate;
                switch (selectedOption) {
                    case "Today":
                        compareDate = today;
                        break;
                    case "Yesterday":
                        compareDate = new Date(today);
                        compareDate.setDate(today.getDate() - 1);
                        break;
                    case "Last Month":
                        compareDate = new Date(today);
                        compareDate.setMonth(today.getMonth() - 1);
                        break;
                    case "Last Year":
                        compareDate = new Date(today);
                        compareDate.setFullYear(today.getFullYear() - 1);
                        break;
                }

                // Show rows that match the comparison date
                row.style.display = (rowDateOnly.getTime() === getDateOnly(compareDate).getTime()) ? "table-row" : "none";
                break;

            case "Custom":
                fromDateInput.disabled = false;
                toDateInput.disabled = false;
                fromDateInput.value = ''; // Reset from date
                toDateInput.value = getFormattedDate(today); // Set today's date in the correct format

                showAllRows();
                fromDateInput.addEventListener("change", filterCustomDate);
                toDateInput.addEventListener("change", filterCustomDate);

                function filterCustomDate() {
                    const fromDateOnly = getDateOnly(new Date(fromDateInput.value));
                    const toDateOnly = getDateOnly(new Date(toDateInput.value));

                    tableRows.forEach(row => {
                        const rowDateOnly = getDateOnly(new Date(row.cells[2].textContent)); // Adjust index to your date cell
                        row.style.display = (rowDateOnly >= fromDateOnly && rowDateOnly <= toDateOnly) ? "table-row" : "none";
                    });
                    calculateOrdersWiseCreditTotals();
                }
                break;

            case "All":
            default:
                fromDateInput.disabled = true;
                toDateInput.disabled = true;
                showAllRows();
                break;
        }
    });

    calculateOrdersWiseCreditTotals();
}


function getFormattedDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}



function calculateOrdersWiseCreditTotals() {
    let totalOrdersCredit = 0;
    let totalOrdersSettled = 0;
    let totalOrdersDue = 0;

    const tableRows = document.querySelectorAll("#tblCreditPopup tbody tr");

    tableRows.forEach(function (row) {
        if (getComputedStyle(row).display !== "none") {
            const Credit = parseFloat(row.cells[4].textContent);
            const Settled = parseFloat(row.cells[5].textContent);
            const Due = parseFloat(row.cells[6].textContent);

            if (!isNaN(Credit)) {
                totalOrdersCredit += Credit;
            }
            if (!isNaN(Settled)) {
                totalOrdersSettled += Settled;
            }
            if (!isNaN(Due)) {
                totalOrdersDue += Due;
            }
        }
    });

    document.getElementById("reportTotalCreditOrders").textContent = totalOrdersCredit.toFixed(2);
    document.getElementById("reportTotalSettledOrders").textContent = totalOrdersSettled.toFixed(2);
    document.getElementById("reportTotalDueOrders").textContent = totalOrdersDue.toFixed(2);
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


//-------------------------Credit Report End---------------------------------------


//-------------------------Stock Overview Report Start---------------------------------------

const tableCurrentStock = new DataTable("#tblCurrentStock", {
    paging: false,
    info: false
});

async function stockOverviewReport(baseUrl) {
    try {
        const response = await fetch(baseUrl + "/stock/getStockInformationReOrderbleAndNonReOrderble", {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
        });

        if (!response.ok) {
            throw new Error("Network response was not ok " + response.statusText);
        }

        const dataList = await response.json();
        //console.log(dataList.data);
        
        if (!dataList.data || dataList.data.length === 0) {
            console.warn('No stock overview data available to populate the table.');
            return;
        }

        const { allReOrderbleStockAndIngredients, allNonReOrderbleStockAndIngredients } = dataList.data;

        const tableBody = document.querySelector("#tblCurrentStock tbody");

        // Clear the existing data from the table body
        tableBody.innerHTML = '';

        const addRow = (data, index) => {
            const row = document.createElement("tr");

            let cell = document.createElement("td");
            cell.textContent = index + 1;
            row.appendChild(cell);

            cell = document.createElement("td");
            cell.textContent = data[7];
            row.appendChild(cell);

            cell = document.createElement("td");
            cell.textContent = data[5];
            row.appendChild(cell);

            cell = document.createElement("td");
            cell.textContent = parseFloat(data[4]).toFixed(3);
            row.appendChild(cell);

            cell = document.createElement("td");
            cell.textContent = data[8];
            row.appendChild(cell);

            cell = document.createElement("td");
            cell.textContent = data[1];
            row.appendChild(cell);

            tableBody.appendChild(row);
        };

        allReOrderbleStockAndIngredients.forEach((item, index) => addRow(item, index));
        allNonReOrderbleStockAndIngredients.forEach((item, index) => addRow(item, allReOrderbleStockAndIngredients.length + index));


        tableCurrentStock.clear().rows.add($(tableBody).children()).draw();


        const itemsNames = [];
        document.querySelectorAll('#tblCurrentStock tbody tr').forEach(function (row) {
            if (row.cells.length > 1) {
                const itemName = row.cells[1].textContent.trim();
                if (!itemsNames.includes(itemName)) {
                    itemsNames.push(itemName);
                }
            }
        });


        const currentStockSelectbox = document.getElementById('currentStockDataList');
        currentStockSelectbox.innerHTML = '';
        itemsNames.forEach(function (itemName) {
            const option = document.createElement('option');
            option.value = itemName;
            option.textContent = itemName;
            currentStockSelectbox.appendChild(option);
        });


        const units = [];
        document.querySelectorAll('#tblCurrentStock tbody tr').forEach(row => {
            if (row.cells.length > 2) {
                const unit = row.cells[2].textContent.trim();
                if (!units.includes(unit)) {
                    units.push(unit);
                }
            }
        });


        const unitSelectbox = document.getElementById('searchUnitStockOverviewReport');
        unitSelectbox.innerHTML = '<option value="All">Unit</option>';
        units.forEach(unit => {
            unitSelectbox.innerHTML += `<option value="${unit}">${unit}</option>`;
        });

        const stockStatus = [];
        document.querySelectorAll('#tblCurrentStock tbody tr').forEach(row => {
            if (row.cells.length > 5) {
                const status = row.cells[5].textContent.trim();
                if (!stockStatus.includes(status)) {
                    stockStatus.push(status);
                }
            }
        });


        const statusSelectbox = document.getElementById('searchStatusStockOverviewReport');
        statusSelectbox.innerHTML = '<option value="All">Status</option>'; 
        stockStatus.forEach(status => {
            statusSelectbox.innerHTML += `<option value="${status}">${status}</option>`;
        });

    } catch (error) {
        console.error("Error fetching current stock report:", error);
    }
}



document.getElementById("currentStockList").addEventListener("input", function () {
    const searchValue = this.value;
    tableCurrentStock.search(searchValue === "All" ? '' : searchValue).draw();
});

document.getElementById("searchUnitStockOverviewReport").addEventListener("change", function () {
    const searchValue = this.value;
    const columnIndex = 2;
    tableCurrentStock.column(columnIndex).search(searchValue === "All" ? '' : '^' + searchValue + '$', true, false).draw();
});


document.getElementById("searchStatusStockOverviewReport").addEventListener("change", function () {
    const searchValue = this.value;
    tableCurrentStock.search(searchValue === "All" ? '' : searchValue).draw();
});



//-------------------------Stock Overview Report End---------------------------------------



//-------------------------Order Details Report Start---------------------------------------
async function OrderDetailsReport(baseUrl) {
    try {
        const response = await fetch(baseUrl + "/orders/details/getAllOrderDetailsWithOrderDate", {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
        });

        if (!response.ok) {
            throw new Error("Network response was not ok " + response.statusText);
        }

        const orderDetailsDataList = await response.json();
      //  console.log(orderDetailsDataList);


        if (!orderDetailsDataList.data || orderDetailsDataList.data.length === 0) {
            console.warn('No order details data available to populate the table.');
            return;
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

        let orderDetailsReportData = "";

        for (let i = 0; i < orderDetailsDataList.data.length; i++) {
            orderDetailsReportData += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${orderDetailsDataList.data[i][0]}</td>
                    <td>${orderDetailsDataList.data[i][4]}</td>
                    <td>${orderDetailsDataList.data[i][5]}</td>
                    <td>${formatDate(orderDetailsDataList.data[i][1])}</td>
                    <td>${orderDetailsDataList.data[i][6]}</td>
                    <td>${orderDetailsDataList.data[i][7]}</td>
                    <td>${orderDetailsDataList.data[i][8]}</td>
                </tr>
            `;
        }

        document.getElementById('tblOrderDetails').querySelector('tbody').innerHTML = orderDetailsReportData;

        const tblOrderDetails = new DataTable("#tblOrderDetails", {
            paging: false,
            info: false
        });

        const orderIds = [];
        document.querySelectorAll('#tblOrderDetails tbody tr').forEach((row) => {
            const orderId = row.cells[1].textContent.trim();
            if (!orderIds.includes(orderId)) {
                orderIds.push(orderId);
            }
        });

        const orderIdSelectbox = document.getElementById('searchOrderIdOrderDetailsReport');
        orderIdSelectbox.innerHTML = '<option value="All">Order Id</option>';
        orderIds.forEach((order) => {
            orderIdSelectbox.innerHTML += `<option value="${order}">${order}</option>`;
        });

        orderIdSelectbox.addEventListener("change", function () {
            const searchValue = this.value;

            if (searchValue === "All") {
                tblOrderDetails.search('').draw();
                calculateTotalsOrderDetails();
            } else {
                tblOrderDetails.search(searchValue).draw();
                calculateTotalsOrderDetails();
            }
        });

        const dishNames = [];
        document.querySelectorAll('#tblOrderDetails tbody tr').forEach((row) => {
            const dishName = row.cells[2].textContent.trim();
            if (!dishNames.includes(dishName)) {
                dishNames.push(dishName);
            }
        });

        const dishNameSelectbox = document.getElementById('orderDetailsDishList');
        dishNameSelectbox.innerHTML = '';
        dishNames.forEach((name) => {
            dishNameSelectbox.innerHTML += `<option value="${name}">${name}</option>`;
        });

        document.getElementById("orderDetailsDishInput").addEventListener("input", function () {
            const searchValue = this.value;

            if (searchValue === "All") {
                tblOrderDetails.search('').draw();
                calculateTotalsOrderDetails();
            } else {
                tblOrderDetails.search(searchValue).draw();
                calculateTotalsOrderDetails();
            }
        });

        const dishSizes = [];
        document.querySelectorAll('#tblOrderDetails tbody tr').forEach((row) => {
            const dishSize = row.cells[3].textContent.trim();
            if (!dishSizes.includes(dishSize)) {
                dishSizes.push(dishSize);
            }
        });

        const dishSizeSelectbox = document.getElementById('searchDishSizeOrderDetailsReport');
        dishSizeSelectbox.innerHTML = '<option value="All">Dish Size</option>';
        dishSizes.forEach((size) => {
            dishSizeSelectbox.innerHTML += `<option value="${size}">${size}</option>`;
        });

        dishSizeSelectbox.addEventListener("change", function () {
            const searchValue = this.value;

            if (searchValue === "All") {
                tblOrderDetails.search('').draw();
                calculateTotalsOrderDetails();
            } else {
                tblOrderDetails.search(searchValue).draw();
                calculateTotalsOrderDetails();
            }
        });
        calculateTotalsOrderDetails();

    } catch (error) {
        console.error("Error fetching order details report:", error);
    }
}


document.getElementById('custom-orderDetails').addEventListener('change', function () {
    const selectedOption = this.value;
    filterOrderDetailsTable(selectedOption);
});


function filterOrderDetailsTable(selectedOption) {
    const today = new Date();
    const tableRows = document.querySelectorAll("#tblOrderDetails tbody tr");
    const fromDateInput = document.getElementById('fromDateOrderDetails');
    const toDateInput = document.getElementById('toDateOrderDetails');

    function showAllRows() {
        tableRows.forEach(function (row) {
            row.style.display = "table-row";
        });
    }

    tableRows.forEach(function (row) {
        const rowDate = new Date(row.cells[4].textContent);  // Assuming date is in 5th column (index 4)

        switch (selectedOption) {
            case "Today":
                fromDateInput.value = '';
                toDateInput.value = '';
                fromDateInput.disabled = true;
                toDateInput.disabled = true;

                const todayStart = new Date(today.setHours(0, 0, 0, 0));  // Start of today
                const todayEnd = new Date(today.setHours(23, 59, 59, 999));  // End of today

                if (rowDate >= todayStart && rowDate <= todayEnd) {
                    row.style.display = "table-row";
                } else {
                    row.style.display = "none";
                }
                calculateTotalsOrderDetails();
                break;

            case "Yesterday":
                fromDateInput.value = '';
                toDateInput.value = '';
                fromDateInput.disabled = true;
                toDateInput.disabled = true;

                const yesterday = new Date();
                yesterday.setDate(today.getDate() - 1);
                const yesterdayStart = new Date(yesterday.setHours(0, 0, 0, 0));
                const yesterdayEnd = new Date(yesterday.setHours(23, 59, 59, 999));

                if (rowDate >= yesterdayStart && rowDate <= yesterdayEnd) {
                    row.style.display = "table-row";
                } else {
                    row.style.display = "none";
                }
                calculateTotalsOrderDetails();
                break;

            case "Last Month":
                fromDateInput.value = '';
                toDateInput.value = '';
                fromDateInput.disabled = true;
                toDateInput.disabled = true;

                const lastMonth = new Date();
                lastMonth.setMonth(today.getMonth() - 1);
                const lastMonthStart = new Date(lastMonth.getFullYear(), lastMonth.getMonth(), 1);  // First day of last month
                const lastMonthEnd = new Date(lastMonth.getFullYear(), lastMonth.getMonth() + 1, 0, 23, 59, 59);  // Last day of last month

                if (rowDate >= lastMonthStart && rowDate <= lastMonthEnd) {
                    row.style.display = "table-row";
                } else {
                    row.style.display = "none";
                }
                calculateTotalsOrderDetails();
                break;

            case "Last Year":
                fromDateInput.value = '';
                toDateInput.value = '';
                fromDateInput.disabled = true;
                toDateInput.disabled = true;

                const lastYear = new Date();
                lastYear.setFullYear(today.getFullYear() - 1);
                const lastYearStart = new Date(lastYear.getFullYear(), 0, 1);  // First day of last year
                const lastYearEnd = new Date(lastYear.getFullYear(), 11, 31, 23, 59, 59);  // Last day of last year

                if (rowDate >= lastYearStart && rowDate <= lastYearEnd) {
                    row.style.display = "table-row";
                } else {
                    row.style.display = "none";
                }
                calculateTotalsOrderDetails();
                break;

            case "Custom":
                fromDateInput.disabled = false;
                toDateInput.disabled = false;
                fromDateInput.value = '';
                toDateInput.value = new Date().toISOString().split('T')[0];  // Set today's date as the default 'To'

                showAllRows();

                fromDateInput.addEventListener("change", function () {
                    filterCustomDate();
                });

                toDateInput.addEventListener("change", function () {
                    filterCustomDate();
                });

                function filterCustomDate() {
                    const fromDate = new Date(fromDateInput.value);
                    const toDate = new Date(toDateInput.value);
                    toDate.setHours(23, 59, 59, 999);  // Ensure 'To' date includes the full day

                    tableRows.forEach(function (row) {
                        const rowDate = new Date(row.cells[4].textContent);
                        if (rowDate >= fromDate && rowDate <= toDate) {
                            row.style.display = "table-row";
                        } else {
                            row.style.display = "none";
                        }
                    });
                    calculateTotalsOrderDetails();
                }
                break;

            case "All":
            default:
                fromDateInput.value = '';
                toDateInput.value = '';
                fromDateInput.disabled = true;
                toDateInput.disabled = true;
                showAllRows();
                break;
        }
    });
    calculateTotalsOrderDetails();
}



function calculateTotalsOrderDetails() {
    let totalQty = 0;
    let totalSalesAmount = 0;

    const tableRows = document.querySelectorAll("#tblOrderDetails tbody tr");

    tableRows.forEach(function (row) {
        if (getComputedStyle(row).display !== "none") {
            const qty = parseFloat(row.cells[5].textContent);
            const netTotal = parseFloat(row.cells[7].textContent);

            if (!isNaN(qty)) {
                totalQty += qty;
            }
            if (!isNaN(netTotal)) {
                totalSalesAmount += netTotal;
            }
        }
    });

    document.getElementById("reportTotalSalesItemQty").textContent = totalQty;
    document.getElementById("reportTotalSalesAmount").textContent = totalSalesAmount.toFixed(2);
}

//-------------------------Order Details Report End---------------------------------------




//-------------------------dish Report Start---------------------------------------
async function dishReport(baseUrl) {

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
        const response = await fetch(baseUrl + "/dish/dishReportDetails", {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
        });

        if (!response.ok) {
            throw new Error("Network response was not ok " + response.statusText);
        }

        const dishesList = await response.json();
        // console.log(dishesList);
        if (!dishesList.data || dishesList.data.length === 0) {
            console.warn('No dish data available to populate the table.');
            return;
        }

        let dishesDataList = "";

        for (let i = 0; i < dishesList.data.length; i++) {
            dishesDataList += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${dishesList.data[i][0]}</td>
                    <td>${dishesList.data[i][3]}</td>
                    <td>${dishesList.data[i][5]}-${dishesList.data[i][6]}</td>                    
                    <td>${formatDate(dishesList.data[i][1])}</td>
                    <td>${dishesList.data[i][4]}</td>
                    <td>${dishesList.data[i][2]}</td>
                </tr>
            `;
        }

        document.querySelector('#tblDish tbody').innerHTML = dishesDataList;

        const rows = document.querySelectorAll('#tblDish tbody tr');
        rows.forEach(function (row, index) {
            row.addEventListener("click", function () {
                const rowData = dishesList.data[index];
                dishPopup(baseUrl, rowData);
            });
        });

        const tblDish = new DataTable("#tblDish", {
            paging: false,
            info: false,
        });

        // const tblDishpopup = new DataTable("#tblDishPopup", {
        //     paging: false,
        //     info: false,
        // });

        const orderIds = [];
        const customers = [];

        document.querySelectorAll('#tblDish tbody tr').forEach((row) => {
            const orderId = row.cells[1].textContent.trim();
            const customer = row.cells[3].textContent.trim();

            if (!orderIds.includes(orderId)) {
                orderIds.push(orderId);
            }

            if (!customers.includes(customer)) {
                customers.push(customer);
            }
        });

        const datalist = document.getElementById('dishDataList');
        [...orderIds, ...customers].forEach((id) => {
            const option = document.createElement('option');
            option.value = id;
            datalist.appendChild(option);
        });

        document.getElementById("dishListInput").addEventListener("input", function () {
            const searchValue = this.value;

            if (searchValue === "All") {
                tblDish.search('').draw();
            } else {
                tblDish.search(searchValue).draw();
            }
        });
    } catch (error) {
        console.error("Error fetching dish report details:", error);
    }
}

async function dishPopup(baseUrl, orderDetails) {
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
        document.querySelector('.report-dish-popup').style.display = 'block';
        dishReportBackgroundOverlay.classList.add("overlay");
        reportSideNavBr.style.pointerEvents = "none"
        reportNavbar.style.pointerEvents = "none"

        document.getElementById('dishReportPopUpOId').textContent = orderDetails[0];
        document.getElementById('dishReportPopupQty').textContent = orderDetails[4];
        document.getElementById('dishReportPopupDate').textContent = formatDate(orderDetails[1]);
        document.getElementById('dishReportPopUpCId').textContent = orderDetails[3];
        document.getElementById('dishReportPopupCusName').textContent = orderDetails[5];
        document.getElementById('dishReportPopupCusTel').textContent = orderDetails[6];

        const custId = document.getElementById("dishReportPopUpCId").textContent.trim();
        const oId = document.getElementById("dishReportPopUpOId").textContent.trim();

        const response = await fetch(baseUrl + '/dish?customerId=' + custId + "&orderId=" + oId, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const dishOrderDetailsList = await response.json();
        //  console.log(dishOrderDetailsList);

        let dishOrderDetailsDataList = "";

        for (let i = 0; i < dishOrderDetailsList.data.length; i++) {
            dishOrderDetailsDataList += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${dishOrderDetailsList.data[i][6]}</td>
                    <td>${dishOrderDetailsList.data[i][7]}</td>
                    <td>${dishOrderDetailsList.data[i][2]}</td>
                    <td>${dishOrderDetailsList.data[i][4]}</td>
                    <td>${dishOrderDetailsList.data[i][5]}</td>
                    <td>${dishOrderDetailsList.data[i][3]}</td>
                </tr>
            `;
        }

        document.querySelector('#tblDishPopup tbody').innerHTML = dishOrderDetailsDataList;

    } catch (error) {
        console.error("Error fetching dish order details:", error);
    }
}

//-------------------------dish Report End---------------------------------------




//-------------------------cash Settlemet Report Start---------------------------------------
async function cashSettlementReport(baseUrl) {
    try {
        const response = await fetch(baseUrl + "/shift", {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const shiftList = await response.json();
        //console.log(shiftList.data);
        

        if (!shiftList.data || shiftList.data.length === 0) {
            console.warn('No cash settlement data available to populate the table.');
            return;
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

        let shiftDataList = "";

        for (let i = 0; i < shiftList.data.length; i++) {
            let varianceColor = "#101A24";

            if (shiftList.data[i][19] < 0) {
                varianceColor = "#ff3300";
            } else if (shiftList.data[i][19] > 0) {
                varianceColor = "#00cc00";
            }
            shiftDataList += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${shiftList.data[i][0]}</td>
                    <td>${shiftList.data[i][20]}-${shiftList.data[i][21]}</td>
                    <td>${formatDate(shiftList.data[i][10])}</td>                    
                    <td>${formatDate(shiftList.data[i][7])}</td>
                    <td>${shiftList.data[i][17]}</td>
                    <td>${shiftList.data[i][18]}</td>
                    <td style="color: ${varianceColor};">${shiftList.data[i][19]}</td>
                </tr>
            `;
        }

        const tblCashSettlementBody = document.querySelector('#tblCashSettlement tbody');
        tblCashSettlementBody.innerHTML = shiftDataList;

        const tblCashSettlement = new DataTable("#tblCashSettlement", {
            paging: false,
            info: false
        });

        const rows = document.querySelectorAll('#tblCashSettlement tbody tr');
        rows.forEach(function (row, index) {
            row.addEventListener("click", function () {
                const rowData = shiftList.data[index];
                // console.log(rowData);
                popupCashSettlement(baseUrl, rowData[0], rowData[21]);
            });
        });

        const cashiersList = [];
        rows.forEach(function (row) {
            const cashier = row.querySelector('td:nth-child(3)').textContent.trim();
            if (!cashiersList.includes(cashier)) {
                cashiersList.push(cashier);
            }
        });

        const cashiersSelectbox = document.getElementById('searchCashierNameCashSettlementReport');
        cashiersSelectbox.innerHTML = '<option value="All">Cashier</option>';
        cashiersList.forEach(function (cashier) {
            const option = document.createElement('option');
            option.value = cashier;
            option.textContent = cashier;
            cashiersSelectbox.appendChild(option);
        });

        cashiersSelectbox.addEventListener("change", function () {
            const searchValue = this.value;
            if (searchValue === "All") {
                tblCashSettlement.search('').draw();
            } else {
                tblCashSettlement.search(searchValue).draw();
            }
        });
    } catch (error) {
        console.error("An error occurred:", error.message);

    }
}

document.getElementById("custom-cashSettlement").addEventListener("change", function () {
    const selectedOption = this.value;
    filterCashSettlementTable(selectedOption);
});

function filterCashSettlementTable(selectedOption) {
    const today = new Date();
    const rows = document.querySelectorAll("#tblCashSettlement tbody tr");
    const fromDateInput = document.getElementById('fromDateCashSettlement');
    const toDateInput = document.getElementById('toDateCashSettlement');

    function showAllRows() {
        rows.forEach(function (row) {
            row.style.display = "";
        });
    }

    rows.forEach(function (row) {
        const shiftStartText = row.querySelector("td:nth-child(4)").textContent;
        const shiftEndText = row.querySelector("td:nth-child(5)").textContent;
        const shiftStartDate = new Date(shiftStartText);
        const shiftEndDate = new Date(shiftEndText);

        switch (selectedOption) {
            case "Today":
                fromDateInput.value = '';
                toDateInput.value = '';
                fromDateInput.disabled = true;
                toDateInput.disabled = true;

                if (shiftStartDate.toDateString() === today.toDateString() || shiftEndDate.toDateString() === today.toDateString()) {
                    row.style.display = "";
                } else {
                    row.style.display = "none";
                }
                break;

            case "Yesterday":
                fromDateInput.value = '';
                toDateInput.value = '';
                fromDateInput.disabled = true;
                toDateInput.disabled = true;

                const yesterday = new Date();
                yesterday.setDate(today.getDate() - 1);

                if (shiftStartDate.toDateString() === yesterday.toDateString() || shiftEndDate.toDateString() === yesterday.toDateString()) {
                    row.style.display = "";
                } else {
                    row.style.display = "none";
                }
                break;

            case "Last Month":
                fromDateInput.value = '';
                toDateInput.value = '';
                fromDateInput.disabled = true;
                toDateInput.disabled = true;

                const lastMonth = new Date();
                lastMonth.setMonth(today.getMonth() - 1);

                if ((shiftStartDate.getMonth() === lastMonth.getMonth() && shiftStartDate.getFullYear() === lastMonth.getFullYear()) ||
                    (shiftEndDate.getMonth() === lastMonth.getMonth() && shiftEndDate.getFullYear() === lastMonth.getFullYear())) {
                    row.style.display = "";
                } else {
                    row.style.display = "none";
                }
                break;

            case "Last Year":
                fromDateInput.value = '';
                toDateInput.value = '';
                fromDateInput.disabled = true;
                toDateInput.disabled = true;

                const lastYear = new Date();
                lastYear.setFullYear(today.getFullYear() - 1);

                if (shiftStartDate.getFullYear() === lastYear.getFullYear() || shiftEndDate.getFullYear() === lastYear.getFullYear()) {
                    row.style.display = "";
                } else {
                    row.style.display = "none";
                }
                break;

            case "Custom":
                fromDateInput.disabled = false;
                toDateInput.disabled = false;
                fromDateInput.value = '';
                toDateInput.value = new Date().toISOString().split('T')[0];

                showAllRows();

                fromDateInput.addEventListener("change", filterCustomDate);
                toDateInput.addEventListener("change", filterCustomDate);
                break;

            case "All":
                fromDateInput.value = '';
                toDateInput.value = '';
                fromDateInput.disabled = true;
                toDateInput.disabled = true;
                showAllRows();
                break;

            default:
                fromDateInput.value = '';
                toDateInput.value = '';
                fromDateInput.disabled = true;
                toDateInput.disabled = true;
                row.style.display = "";
                break;
        }
    });
}
function filterCustomDate() {
    const fromDateInput = document.getElementById('fromDateCashSettlement');
    const toDateInput = document.getElementById('toDateCashSettlement');
    const fromDate = fromDateInput.value ? new Date(fromDateInput.value) : null;
    const toDate = toDateInput.value ? new Date(toDateInput.value) : new Date();
    const rows = document.querySelectorAll("#tblCashSettlement tbody tr");

    rows.forEach(function (row) {
        const shiftStartText = row.querySelector("td:nth-child(4)").textContent;
        const shiftEndText = row.querySelector("td:nth-child(5)").textContent;
        const shiftStartDate = new Date(shiftStartText);
        const shiftEndDate = new Date(shiftEndText);

        if (
            (fromDate && shiftStartDate < fromDate) ||
            (toDate && shiftEndDate > toDate.setHours(23, 59, 59, 999))
        ) {
            row.style.display = "none";
        } else {
            row.style.display = "";
        }
    });
}

async function popupCashSettlement(baseUrl, shiftId, cashier) {
    document.querySelector(".report-cashSettlement-popup").style.display = "inline"
    cashSettlemetReportBackgroundOverlay.classList.add("overlay");
    reportSideNavBr.style.pointerEvents = "none"
    reportNavbar.style.pointerEvents = "none"

    document.querySelector("#btnBackPopupCashSettlement").addEventListener("click", function () {
        document.querySelector(".report-cashSettlement-popup").style.display = "none"
        cashSettlemetReportBackgroundOverlay.classList.remove("overlay");
        reportSideNavBr.style.pointerEvents = "auto"
        reportNavbar.style.pointerEvents = "auto"
    })

    try {
        const response = await fetch(baseUrl + "/shift?id=" + shiftId, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const shiftDetails = data.data
        //  console.log(shiftDetails);

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

        document.getElementById("CSReportPopupCashier").innerText = cashier;
        document.getElementById("CSstartTime").innerText = formatDate(shiftDetails.startDateTime);
        document.getElementById("CSstartFloat").innerText = shiftDetails.startFloat;
        document.getElementById("CSendTime").innerText = formatDate(shiftDetails.endDateTime);
        document.getElementById("CSendTotal").innerText = shiftDetails.endFloat;

        document.getElementById("actual-cash").innerText = shiftDetails.cashAmount;
        document.getElementById("actual-card").innerText = shiftDetails.cardAmount;
        document.getElementById("actual-credit").innerText = shiftDetails.creditAmount;
        document.getElementById("actual-tot").innerText = shiftDetails.totalAmount;

        document.getElementById("syst-cash").innerText = shiftDetails.systemCashAmount;
        document.getElementById("syst-card").innerText = shiftDetails.systemCardAmount;
        document.getElementById("syst-credit").innerText = shiftDetails.systemCreditAmount;
        document.getElementById("syst-tot").innerText = shiftDetails.systemTotalAmount;


        const setVarianceColor = (elementId, varianceValue) => {
            const element = document.getElementById(elementId);
            if (parseFloat(varianceValue) > 0) {
                element.style.color = '#00cc00';
            } else if (parseFloat(varianceValue) < 0) {
                element.style.color = '#ff3300';
            } else {
                element.style.color = '#101A24';
            }
            element.innerText = varianceValue;
        };

        setVarianceColor("vari-cash", shiftDetails.cashVariance);
        setVarianceColor("vari-card", shiftDetails.cardVariance);
        setVarianceColor("vari-credit", shiftDetails.creditVariance);
        setVarianceColor("vari-tot", shiftDetails.totalVariance);

    } catch (error) {
        console.error("An error occurred:", error.message);
    }

}

//-------------------------cash Settlemet Report End---------------------------------------



//-------------------------Credit Payment Report Start---------------------------------------
const tblCreditPayment = new DataTable("#tblCreditPayment", {
    paging: false,
    info: false
});

async function creditPayment(baseUrl) {
    try {
        const response = await fetch(baseUrl + "/CreditPayment", {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
        });

        if (!response.ok) {
            throw new Error("Network response was not ok " + response.statusText);
        }

        const list = await response.json();

        if (!list.data || list.data.length === 0) {
            console.warn('No credit payment data available to populate the table.');
            return;
        }

        let paymentDataList = "";
        for (let i = 0; i < list.data.length; i++) {
            paymentDataList += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${list.data[i][0]}</td>
                    <td>${list.data[i][10]}</td>
                    <td>${formatDate(list.data[i][8])}</td>                    
                    <td>${list.data[i][3]}</td>
                    <td>${list.data[i][2]}</td>
                    <td>${list.data[i][9]}</td>
                </tr>
            `;
        }

        const tableBody = document.querySelector('#tblCreditPayment tbody');
        tableBody.innerHTML = paymentDataList;

        tblCreditPayment.clear().rows.add($(tableBody).children()).draw();

        const paymentIdList = [];
        const customersList = [];
        document.querySelectorAll('#tblCreditPayment tbody tr').forEach(row => {
            const cashier = row.cells[1].textContent.trim();
            const customer = row.cells[2].textContent.trim();
            if (!paymentIdList.includes(cashier)) paymentIdList.push(cashier);
            if (!customersList.includes(customer)) customersList.push(customer);
        });

        const datalist = document.getElementById('creditPaymentList');
        datalist.innerHTML = '';
        [...paymentIdList, ...customersList].forEach(id => {
            const option = document.createElement('option');
            option.value = id;
            datalist.appendChild(option);
        });

        document.getElementById("creditPaymentInput").addEventListener("input", function () {
            const searchValue = this.value;
            tblCreditPayment.search(searchValue === "All" ? '' : searchValue).draw();
            calculateCreditPaymentDetails();
        });

        document.getElementById('custom-creditPayment').addEventListener('change', function () {
            const selectedOption = this.value;
            filterCreditPaymentTable(selectedOption);
        });

    } catch (error) {
        console.error("An error occurred:", error.message);
    }
    calculateCreditPaymentDetails();
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

function filterCreditPaymentTable(selectedOption) {
    const today = new Date();
    const tableRows = document.querySelectorAll("#tblCreditPayment tbody tr");
    const fromDateInput = document.getElementById('fromDateCreditPayment');
    const toDateInput = document.getElementById('toDateCreditPayment');

    function showAllRows() {
        tableRows.forEach(row => {
            row.style.display = "table-row";
        });
    }

    tableRows.forEach(row => {
        const rowDate = new Date(row.cells[3].textContent);

        switch (selectedOption) {
            case "Today":
                fromDateInput.disabled = true;
                toDateInput.disabled = true;
                if (rowDate.toDateString() === today.toDateString()) {
                    row.style.display = "table-row";
                } else {
                    row.style.display = "none";
                }
                break;

            case "Yesterday":
                fromDateInput.disabled = true;
                toDateInput.disabled = true;
                const yesterday = new Date(today);
                yesterday.setDate(today.getDate() - 1);

                if (rowDate.toDateString() === yesterday.toDateString()) {
                    row.style.display = "table-row";
                } else {
                    row.style.display = "none";
                }
                break;

            case "Last Month":
                fromDateInput.disabled = true;
                toDateInput.disabled = true;
                const lastMonth = new Date(today);
                lastMonth.setMonth(today.getMonth() - 1);

                if (
                    rowDate.getMonth() === lastMonth.getMonth() &&
                    rowDate.getFullYear() === lastMonth.getFullYear()
                ) {
                    row.style.display = "table-row";
                } else {
                    row.style.display = "none";
                }
                break;

            case "Last Year":
                fromDateInput.disabled = true;
                toDateInput.disabled = true;
                const lastYear = new Date(today);
                lastYear.setFullYear(today.getFullYear() - 1);

                if (rowDate.getFullYear() === lastYear.getFullYear()) {
                    row.style.display = "table-row";
                } else {
                    row.style.display = "none";
                }
                break;

            case "Custom":
                fromDateInput.disabled = false;
                toDateInput.disabled = false;
                fromDateInput.value = '';
                toDateInput.value = new Date().toISOString().split('T')[0];

                showAllRows();

                fromDateInput.addEventListener("change", filterCustomDate);
                toDateInput.addEventListener("change", filterCustomDate);

                function filterCustomDate() {
                    const fromDate = new Date(fromDateInput.value);
                    const toDate = new Date(toDateInput.value);

                    fromDate.setHours(0, 0, 0, 0);
                    toDate.setHours(23, 59, 59, 999);

                    tableRows.forEach(row => {
                        const rowDate = new Date(row.cells[3].textContent);


                        const rowDateOnly = new Date(rowDate.getFullYear(), rowDate.getMonth(), rowDate.getDate());

                        if (rowDateOnly >= fromDate && rowDateOnly <= toDate) {
                            row.style.display = "table-row";
                        } else {
                            row.style.display = "none";
                        }
                    });
                    calculateCreditPaymentDetails();
                }
                break;


            case "All":
            default:
                fromDateInput.disabled = true;
                toDateInput.disabled = true;
                showAllRows();
                break;
        }
    });
    calculateCreditPaymentDetails();
}



function calculateCreditPaymentDetails() {
    let cashPaymet = 0;
    let cardPaymet = 0;
    let totPaymet = 0;

    const tableRows = document.querySelectorAll("#tblCreditPayment tbody tr");

    tableRows.forEach(function (row) {
        if (getComputedStyle(row).display !== "none") {
            const cash = parseFloat(row.cells[4].textContent);
            const card = parseFloat(row.cells[5].textContent);
            const tot = parseFloat(row.cells[6].textContent);

            if (!isNaN(cash)) {
                cashPaymet += cash;
            }
            if (!isNaN(card)) {
                cardPaymet += card;
            }
            if (!isNaN(tot)) {
                totPaymet += tot;
            }
        }
    });

    document.getElementById("reportCreditPaymentCash").textContent = cashPaymet.toFixed(2);
    document.getElementById("reportCreditPaymentCard").textContent = cardPaymet.toFixed(2);
    document.getElementById("reportCreditPaymentTotal").textContent = totPaymet.toFixed(2);
}

async function popupCreditPayment(baseUrl, paymetId) {

    document.querySelector(".report-credit-payment-popup").style.display = "inline"
    creditPaymentReportBackgroundOverlay.classList.add("overlay");
    reportSideNavBr.style.pointerEvents = "none"
    reportNavbar.style.pointerEvents = "none"

    document.querySelector("#btnBackPopupCreditPaymentDetails").addEventListener("click", function () {
        document.querySelector(".report-credit-payment-popup").style.display = "none"
        creditPaymentReportBackgroundOverlay.classList.remove("overlay");
        reportSideNavBr.style.pointerEvents = "auto"
        reportNavbar.style.pointerEvents = "auto"
    });
    try {
        const response = await fetch(baseUrl + "/CreditPayment?creditPaymentId=" + paymetId, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const details = data.data
        //console.log(details);

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

        document.getElementById("creditPaymentDetailsOid").innerText = details[0];
        document.getElementById("creditPaymentDetailsCid").innerText = details[5];
        document.getElementById("creditPaymentDetailsCashier").innerText = details[10];
        document.getElementById("creditPaymentDetailsDate").innerText = formatDate(details[8]);
        document.getElementById("creditPaymentDetailsCash").innerText = details[3].toFixed(2);
        document.getElementById("creditPaymentDetailsCard").innerText = details[2].toFixed(2);
        document.getElementById("creditPaymentDetailsCredit").innerText = details[9].toFixed(2);

        loadCreditPaymentTableDetails(baseUrl, paymetId);

    } catch (error) {
        console.error("An error occurred:", error.message);
    }


}

async function loadCreditPaymentTableDetails(baseUrl, paymetId) {
    try {
        const response = await fetch(baseUrl + "/CreditPaymentDetails?creditPaymentId=" + paymetId, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const details = data.data
        console.log(data);

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

        let tableData = "";

        for (let i = 0; i < details.length; i++) {
            tableData += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${details[i][3]}</td>
                    <td>${formatDate(details[i][0])}</td>
                    <td>${details[i][4]}</td>
                </tr>
            `;
        }

        document.querySelector('#tblCreditPaymentOrderDetails tbody').innerHTML = tableData;

    } catch (error) {
        console.error("An error occurred:", error.message);
    }
}