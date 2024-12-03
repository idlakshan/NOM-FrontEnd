$(document).ready(async function() {
    const baseUrl = await window.api.getBaseUrl();
    orderDetailsReport(baseUrl);
});

async function orderDetailsReport(baseUrl) {
    const response = await fetch(baseUrl + "/orders/details/getAllOrderDetailsWithOrderDate", {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
    });
    const orderDetailsDataList = await response.json();
    console.log(orderDetailsDataList);

    const columns = [
        { 
            data: null, 
            title: "#Id",
            render: function (data, type, row, meta) {
                return meta.row + 1; 
            }
        },
        { 
            data: 0, 
            title: "Order Id", 
        },
        { 
            data: 4, 
            title: "Dish Name", 
        },
        { 
            data: 5, 
            title: "Dish Size", 
        },
        { 
            data: 1, 
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
        { 
            data: 6, 
            title: "QTY", 
        },
        { 
            data: 7, 
            title: "Unit Price", 
        },
        { 
            data: 8, 
            title: "Total", 
        },
    ];

    if ($.fn.dataTable.isDataTable('#tblOrderDetails')) {
        $('#tblOrderDetails').DataTable().clear().destroy();
    }

    const table = $('#tblOrderDetails').DataTable({
        data: orderDetailsDataList.data,
        columns: columns,
        orderCellsTop: true,
        fixedHeader: true,
        lengthMenu: [5, 10, 15, 25, 50],
        searching: true,
    });

 
    function updateOrderDetailsTotals() {
        let totalSalesItemQty = 0;
        let totalSalesAmount = 0;

        table.rows({ page: 'current' }).data().each(function (rowData) {
            totalSalesItemQty += parseFloat(rowData[6]) || 0; 
            totalSalesAmount += parseFloat(rowData[8]) || 0; 
        });

        $('#reportTotalSalesItemQty').text(totalSalesItemQty.toFixed(2));
        $('#reportTotalSalesAmount').text(totalSalesAmount.toFixed(2));
    }

    updateOrderDetailsTotals();

    table.on('draw', function() {
        updateOrderDetailsTotals();
    });

 
    $('#global-search-orderdetails').on('keyup', function () {
        table.search(this.value).draw();
    });


    $('#tblOrderDetails thead tr:eq(1) th input').on('keyup change', function () {
        const columnIndex = $(this).parent().index();
        table
            .column(columnIndex)
            .search(this.value)
            .draw();
    });

 
    $.fn.dataTable.ext.search.push(function (settings, data, dataIndex) {
        const minDate = $('#min-date-orderdetails').val();
        const maxDate = $('#max-date-orderdetails').val();
        const orderDate = data[4];  

        if ((!minDate && !maxDate) || !orderDate) {
            return true;
        }

        const orderTimestamp = new Date(orderDate).getTime();
        const minTimestamp = minDate ? new Date(minDate).getTime() : null;
        const maxTimestamp = maxDate ? new Date(maxDate).getTime() : null;

        if (
            (!minTimestamp || orderTimestamp >= minTimestamp) &&
            (!maxTimestamp || orderTimestamp <= maxTimestamp)
        ) {
            return true;
        }
        return false;
    });

   
    $('#min-date-orderdetails, #max-date-orderdetails').on('change', function () {
        table.draw();
    });
}
