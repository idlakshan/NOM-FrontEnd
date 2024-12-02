$(document).ready(async function() {
    const baseUrl = await window.api.getBaseUrl();
    expensesReport(baseUrl);
});

async function expensesReport(baseUrl) {
   // console.log(baseUrl);
    
    const response = await fetch(baseUrl + "/stock/stockDetailsWithIngredients", {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
    });
    const expensesDataList = await response.json();
    console.log(expensesDataList);

    const columns = [
        { 
            data: null, 
            title: "#Id",
            render: function (data, type, row, meta) {
                return meta.row + 1; 
            }
        },
        { 
            data: 3, 
            title: "Stock Id", 
        },
        { 
            data: 11, 
            title: "Ingredient Name", 
        },
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
        { 
            data: 7, 
            title: "Unit Price", 
        },
        { 
            data: 4, 
            title: "Qty", 
        },
        { 
            data: 5, 
            title: "Total", 
        },
    ];

    if ($.fn.dataTable.isDataTable('#tblExpenses')) {
        $('#tblExpenses').DataTable().clear().destroy();
    }

    const table = $('#tblExpenses').DataTable({
        data: expensesDataList.data,
        columns: columns,
        orderCellsTop: true,
        fixedHeader: true,
        lengthMenu: [5, 10, 15, 25, 50],
        searching: true,
    });

    function updateTotals() {
        let totalQty = 0;
        let totalExpenses = 0;

        table.rows({ page: 'current' }).data().each(function (rowData) {
            totalQty += parseFloat(rowData[4]) || 0; 
            totalExpenses += parseFloat(rowData[5]) || 0; 
        });

        $('#reportTotalQtyExpenses').text(totalQty.toFixed(2));
        $('#reportTotalExpenses').text(totalExpenses.toFixed(2));
    }

    updateTotals();

    table.on('draw', function() {
        updateTotals();
    });

    $('#global-search-expenses').on('keyup', function () {
        table.search(this.value).draw();
    });

    $('#tblExpenses thead tr:eq(1) th input').on('keyup change', function () {
        const columnIndex = $(this).parent().index();
        table
            .column(columnIndex)
            .search(this.value)
            .draw();
    });

    $.fn.dataTable.ext.search.push(function (settings, data, dataIndex) {
        const minDate = $('#min-date-expences').val();
        const maxDate = $('#max-date-expences').val();
        const expenseDate = data[3];

        if ((!minDate && !maxDate) || !expenseDate) {
            return true;
        }

        const expenseTimestamp = new Date(expenseDate).getTime();
        const minTimestamp = minDate ? new Date(minDate).getTime() : null;
        const maxTimestamp = maxDate ? new Date(maxDate).getTime() : null;

        if (
            (!minTimestamp || expenseTimestamp >= minTimestamp) &&
            (!maxTimestamp || expenseTimestamp <= maxTimestamp)
        ) {
            return true;
        }
        return false;
    });

    $('#min-date-expences, #max-date-expences').on('change', function () {
        table.draw();
    });
}
