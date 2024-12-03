const dishReportBackgroundOverlay = document.querySelector(".dishReportBackground");
const reportSideNavBr = document.querySelector(".aside-nav-button-list");
const reportNavbar = document.querySelector(".navbar");

$(document).ready(async function () {
    const baseUrl = await window.api.getBaseUrl();
    dishReport(baseUrl);
});

async function dishReport(baseUrl) {

    const response = await fetch(baseUrl + "/dish/dishReportDetails", {
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
        {
            data: 0,
            title: "Order Id",
        },
        {
            data: 3,
            title: "Customer Id",
        },
        {
            data: 5,
            title: "Customer",
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
            data: 4,
            title: "No of Dish",
        },
        {
            data: 2,
            title: "Total Price",
        },


    ];

    if ($.fn.dataTable.isDataTable('#tblDish')) {
        $('#tblDish').DataTable().clear().destroy();
    }

    const table = $('#tblDish').DataTable({
        data: dishesList.data,
        columns: columns,
        orderCellsTop: true,
        fixedHeader: true,
        lengthMenu: [5, 10, 15, 25, 50],
        searching: true,
    });

    $('#global-search-dish').on('keyup', function () {
        table.search(this.value).draw();
    });


    function attachDishRowClickListeners() {
        const rows = document.querySelectorAll('#tblDish tbody tr');
        rows.forEach(function (row, index) {
            row.addEventListener("click", function () {
                console.log("hi");
                const rowData = dishesList.data[index];
                dishPopup(baseUrl, rowData);
            });
        });
    }

    attachDishRowClickListeners();

    table.on('draw', function () {
        attachDishRowClickListeners();
    });

    $('#tblDish thead tr:eq(1) th input').on('keyup change', function () {
        const columnIndex = $(this).parent().index();
        table
            .column(columnIndex)
            .search(this.value)
            .draw();
    });


    $.fn.dataTable.ext.search.push(function (settings, data, dataIndex) {
        const minDate = $('#min-date-dish').val();
        const maxDate = $('#max-date-dish').val();
        const dishDate = data[4];

        if ((!minDate && !maxDate) || !dishDate) {
            return true;
        }

        const dishTimestamp = new Date(dishDate).getTime();
        const minTimestamp = minDate ? new Date(minDate).getTime() : null;
        const maxTimestamp = maxDate ? new Date(maxDate).getTime() : null;

        if (
            (!minTimestamp || dishTimestamp >= minTimestamp) &&
            (!maxTimestamp || dishTimestamp <= maxTimestamp)
        ) {
            return true;
        }
        return false;
    });

    $('#min-date-dish, #max-date-dish').on('change', function () {
        table.draw();
    });
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
};

$("#btnBackPopupDish").click('on', function () {
    $(".report-dish-popup").css('display', 'none');
    dishReportBackgroundOverlay.classList.remove("overlay");
    reportSideNavBr.style.pointerEvents = "auto"
    reportNavbar.style.pointerEvents = "auto"
});