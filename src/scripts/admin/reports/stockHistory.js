$(document).ready(async function () {
    const baseUrl = await window.api.getBaseUrl();
    stockHistory(baseUrl);
});

async function stockHistory(baseUrl) {
    const response = await fetch(baseUrl + "/stockDetails/getActiveStockDetailsDescOrder", {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
    });

    const stockDetails = await response.json();
    console.log(stockDetails);

    const columns = [
        {
            data: null,
            title: "#Id",
            render: function (data, type, row, meta) {
                return meta.row + 1;
            }
        },
        { data: 11, title: "Ingredient Name" },
        { data: 6, title: "Unit" },
        { data: 7, title: "Price" },
        {
            data: 4, 
            title: "QTY",
            render: function (data, type, row) {
                if (data !== null && data !== undefined) {
                    return parseFloat(data).toFixed(3); 
                }
                return ""; 
            }
        },
        { data: 5, title: "Total" },
        {
            data: 2,
            title: "Date",
            render: function (data) {
                if (!data) return "";
                const date = new Date(data);
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const day = String(date.getDate()).padStart(2, '0'); 
                return `${year}.${month}.${day}`;  
            }
        },
        { data: 1, title: "Status" },
    ];

    if ($.fn.dataTable.isDataTable('#tblStockHistory')) {
        $('#tblStockHistory').DataTable().clear().destroy();
    }

    const table = $('#tblStockHistory').DataTable({
        data: stockDetails.data,
        columns: columns,
        orderCellsTop: true,
        fixedHeader: true,
        lengthMenu: [5, 10, 15, 25, 50],
        searching: true,
    });

    $('#global-search-stockHistory').on('keyup', function () {
        table.search(this.value).draw();
    });

    $('#tblStockHistory thead tr:eq(1) th input').on('keyup change', function () {
        const columnIndex = $(this).parent().index();
        table
            .column(columnIndex)
            .search(this.value)
            .draw();
    });

    $.fn.dataTable.ext.search.push(function (settings, data, dataIndex) {
        const minDate = $('#min-date-stockHistory').val();
        const maxDate = $('#max-date-stockHistory').val();
        const expiryDate = data[6];

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

    $('#min-date-stockHistory, #max-date-stockHistory').on('change', function () {
        table.draw();
    });
};