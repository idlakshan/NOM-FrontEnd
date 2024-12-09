$("#csvCurrentStock").click(function () {
    downloadCSV("#tblCurrentStock", "stockOverviwe_report.csv", "stockOverviwe_stock.csv", ["Id", "Ingredient Name", "Unit", "Qty", "Re-Order Level", "Status"]);
});

$("#csvStockHistory").click(function () {
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
    downloadCSV("#tblCreditReport", "csvCredit", "credit_report.csv", ["Id", "Credit Id", "Customer Name", "Contact", "Last Payment", "Credit Amount", "Settled Amount", "Due Amount"]);
});

$("#csvcreditPayments").click(function () {
    downloadCSV("#tblCreditPayment", "csvCreditPaymment", "credit_Payment_report.csv", ["Id", "Payment Id", "Customer Name", "Date & Time", "Cash", "Card", "Total",]);
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