const creditPaymentReportBackgroundOverlay = document.querySelector(".creditPaymentReportBackground");


$(document).ready(async function () {
    const baseUrl = await window.api.getBaseUrl();
    creditPayment(baseUrl);
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
            { data: 0, title: "Payment Id" },
            { data: 10, title: "Customer Name" },
            {
                data: 8,
                title: "Date & Time",
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
                data: 3,
                title: "Cash",
            },
            { data: 2, title: "Card" },
            { data: 9, title: "Total" },
          
        ];

        if ($.fn.dataTable.isDataTable('#tblCreditPayment')) {
            $('#tblCreditPayment').DataTable().clear().destroy(); 
        }

        const table = $('#tblCreditPayment').DataTable({
            data: dataList.data,
            columns: columns,
            orderCellsTop: true,
            fixedHeader: true,
            lengthMenu: [5, 10, 15, 25, 50],
            searching: true,
        });

        function updateCreditPaymentTotals() {
            let totalCash = 0;
            let totalCard = 0;

            let totalNet = 0;
    
    
            table.rows({ page: 'current' }).data().each(function (rowData) {
                totalCash += parseFloat(rowData[3]) || 0;
                totalCard += parseFloat(rowData[2]) || 0;
                totalNet += parseFloat(rowData[9]) || 0;
            });
    
    
            $('#reportCreditPaymentCash').text(totalCash.toFixed(2));
            $('#reportCreditPaymentCard').text(totalCard.toFixed(2));
            $('#reportCreditPaymentTotal').text(totalNet.toFixed(2));
        }
    
    
        updateCreditPaymentTotals();
    
    
        table.on('draw', function () {
            updateCreditPaymentTotals();
        });

        $('#global-search-creditPayment').on('keyup', function () {
            table.search(this.value).draw();
        });

      
        function attachCreditPaymentRowClickListeners() {
            const rows = document.querySelectorAll('#tblCreditPayment tbody tr');
            rows.forEach(function (row, index) {
                row.addEventListener("click", function () {
                    const rowData = dataList.data[index];
                    // console.log(rowData);
                 //   popupCashSettlement(baseUrl, rowData[0], rowData[21]);
                 popupCreditPayment(baseUrl, rowData[0])
                });
            });
        }

        attachCreditPaymentRowClickListeners();

   
        table.on('draw', function () {
            attachCreditPaymentRowClickListeners();
        });

      
        $('#tblCreditPayment thead tr:eq(1) th input').on('keyup change', function () {
            const columnIndex = $(this).parent().index();
            table
                .column(columnIndex)
                .search(this.value)
                .draw();
        });

        $.fn.dataTable.ext.search.push(function (settings, data, dataIndex) {
            const minDate = $('#min-date-creditPayment').val();
            const maxDate = $('#max-date-creditPayment').val();
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

        $('#min-date-creditPayment, #max-date-creditPayment').on('change', function () {
            table.draw();
        });
    } catch (error) {
        console.error("Error fetching or displaying dish reports:", error);
    }
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

$("#btnBackPopupCreditOrderDetails").click('on', function () {
    $(".report-credit-orderdetails-popup").css('display', 'none');
    document.querySelector('.report-credit-popup').style.pointerEvents = "auto";
});