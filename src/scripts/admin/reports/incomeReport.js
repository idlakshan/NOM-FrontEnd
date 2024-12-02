$(document).ready(async function () {
    const baseUrl = await window.api.getBaseUrl();
    incomeReport(baseUrl);
});
async function incomeReport(baseUrl) {
    const response = await fetch(baseUrl + "/payment/getAllPayment", {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
    });
    const paymentData = await response.json();
    console.log(paymentData);

    const columns = [
        {
            data: null,
            title: "#Id",
            render: function (data, type, row, meta) {
                return meta.row + 1;
            }
        },
        { data: "paymentId", title: "Payment Id" },
        { data: "orderId", title: "Order Id" },
        {
            data: "paymentDateTime",
            title: "Date",
            render: function (data) {
                if (!data) return "";
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
        { data: "cashPayment", title: "Cash" },
        { data: "cardPayment", title: "Card" },
        { data: "creditPayment", title: "Credit" },
        { data: "paymentTotal", title: "Net Total" },
    ];


    const table = $('#tblIncome').DataTable({
        data: paymentData.data,
        columns: columns,
        orderCellsTop: true,
        fixedHeader: true,
        lengthMenu: [5, 10, 15, 25, 50],
        searching: true,
    });


    function updateTotals() {
        let totalCash = 0;
        let totalCard = 0;
        let totalCredit = 0;
        let totalNet = 0;


        table.rows({ page: 'current' }).data().each(function (rowData) {
            totalCash += parseFloat(rowData.cashPayment) || 0;
            totalCard += parseFloat(rowData.cardPayment) || 0;
            totalCredit += parseFloat(rowData.creditPayment) || 0;
            totalNet += parseFloat(rowData.paymentTotal) || 0;
        });


        $('#report_cash_income').text(totalCash.toFixed(2));
        $('#report_card_income').text(totalCard.toFixed(2));
        $('#report_credit_income').text(totalCredit.toFixed(2));
        $('#report_total_income').text(totalNet.toFixed(2));
    }


    updateTotals();


    table.on('draw', function () {
        updateTotals();
    });
    $('#global-search-income').on('keyup', function () {
        table.search(this.value).draw();
    });

    $('#tblIncome thead tr:eq(1) th input').on('keyup change', function () {
        const columnIndex = $(this).parent().index();
        table
            .column(columnIndex)
            .search(this.value)
            .draw();
    });

    $.fn.dataTable.ext.search.push(function (settings, data, dataIndex) {
        const minDate = $('#min-date-imcome').val();
        const maxDate = $('#max-date-imcome').val();
        const expiryDate = data[3];

        if ((!minDate && !maxDate) || !expiryDate) {
            return true;
        }

        const expiryTimestamp = new Date(expiryDate).getTime();
        const minTimestamp = minDate ? new Date(minDate).getTime() : null;
        const maxTimestamp = maxDate ? new Date(maxDate).getTime() : null;

        if (
            (!minTimestamp || expiryTimestamp >= minTimestamp) &&
            (!maxTimestamp || expiryTimestamp <= maxTimestamp)
        ) {
            return true;
        }
        return false;
    });

    $('#min-date-income, #max-date-imcome').on('change', function () {
        table.draw();
    });
}

