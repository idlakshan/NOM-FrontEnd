const cashSettlemetReportBackgroundOverlay = document.querySelector(".cashSettlementReportBackground");


$(document).ready(async function () {
    const baseUrl = await window.api.getBaseUrl();
    cashSettlementReport(baseUrl);
});

async function cashSettlementReport(baseUrl) {
    try {
    
        const response = await fetch(baseUrl + "/shift", {
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
            { data: 0, title: "Shift Id" },
            { data: 21, title: "Cashier" },
            {
                data: 10,
                title: "Shift Start",
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
                data: 7,
                title: "Shift End",
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
            { data: 17, title: "System" },
            { data: 18, title: "Total" },
            {
                data: 19,
                title: "Variance",
                render: function (data) {
                    let varianceColor = "";
                    if (data < 0) {
                        varianceColor = "#ff3300"; 
                    } else if (data > 0) {
                        varianceColor = "#00cc00"; 
                    } else {
                        varianceColor = "#101A24";
                    }
                    return `<span style="color: ${varianceColor}">${data}</span>`;
                }
            }
          
        ];

        if ($.fn.dataTable.isDataTable('#tblCashSettlement')) {
            $('#tblCashSettlement').DataTable().clear().destroy(); 
        }

        const table = $('#tblCashSettlement').DataTable({
            data: dataList.data,
            columns: columns,
            orderCellsTop: true,
            fixedHeader: true,
            lengthMenu: [5, 10, 15, 25, 50],
            searching: true,
        });

        $('#global-search-cashSettlemant').on('keyup', function () {
            table.search(this.value).draw();
        });

      
        function attachCashSettlemantRowClickListeners() {
            const rows = document.querySelectorAll('#tblCashSettlement tbody tr');
            rows.forEach(function (row, index) {
                row.addEventListener("click", function () {
                    const rowData = dataList.data[index];
                    // console.log(rowData);
                    popupCashSettlement(baseUrl, rowData[0], rowData[21]);
                });
            });
        }

        attachCashSettlemantRowClickListeners();

   
        table.on('draw', function () {
            attachCashSettlemantRowClickListeners();
        });

      
        $('#tblCashSettlement thead tr:eq(1) th input').on('keyup change', function () {
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
// $("#btnBackPopup").click('on', function () {
//     $(".report-sales-popup").css('display', 'none');
//     salesBackgroundOverlay.classList.remove("overlay");
//     reportSideNavBr.style.pointerEvents = "auto"
//     reportNavbar.style.pointerEvents = "auto"
// });