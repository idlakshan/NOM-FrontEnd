const salesBackgroundOverlay = document.querySelector(".salesBackground");


$(document).ready(async function () {
    const baseUrl = await window.api.getBaseUrl();
    salesReports(baseUrl);
});

async function salesReports(baseUrl) {
    try {
    
        const response = await fetch(baseUrl + "/payment/getPaymentDetails", {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwt")}`, 
            },
        });

        const dishesList = await response.json();
        console.log(dishesList);

        const columns = [
            {
                data: null,
                title: "#Id",
                render: function (data, type, row, meta) {
                    return meta.row + 1; 
                }
            },
            { data: 0, title: "Order Id" },
            { data: 11, title: "Customer" },
            { data: 7, title: "Cashier" },
            { data: 10, title: "Table" },
            {
                data: 2,
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
            { data: 5, title: "Cash" },
            { data: 4, title: "Card" },
            { data: 6, title: "Credit" },
            { data: 3, title: "Total" },
        ];

        if ($.fn.dataTable.isDataTable('#tblSales')) {
            $('#tblSales').DataTable().clear().destroy(); 
        }

        const table = $('#tblSales').DataTable({
            data: dishesList.data,
            columns: columns,
            orderCellsTop: true,
            fixedHeader: true,
            lengthMenu: [5, 10, 15, 25, 50],
            searching: true,
        });

        $('#global-search-sales').on('keyup', function () {
            table.search(this.value).draw();
        });

      
        function attachDishRowClickListeners() {
            const rows = document.querySelectorAll('#tblSales tbody tr');
            rows.forEach(function (row, index) {
                row.addEventListener("click", function () {
                    const rowData = dishesList.data[index];
                    popupSales(baseUrl, rowData); 
                });
            });
        }

        attachDishRowClickListeners();

   
        table.on('draw', function () {
            attachDishRowClickListeners();
        });

      
        $('#tblSales thead tr:eq(1) th input').on('keyup change', function () {
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

$("#btnBackPopup").click('on', function () {
    $(".report-sales-popup").css('display', 'none');
    salesBackgroundOverlay.classList.remove("overlay");
    reportSideNavBr.style.pointerEvents = "auto"
    reportNavbar.style.pointerEvents = "auto"
});