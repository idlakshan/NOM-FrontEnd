
$(document).ready(async function () {
    const baseUrl = await window.api.getBaseUrl();
    stockOverviewReport(baseUrl);
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
            throw new Error("Failed to fetch stock data: " + response.statusText);
        }

        const dataList = await response.json();

        if (!dataList.data || dataList.data.length === 0) {
            console.warn('No stock overview data available to populate the table.');
            return;
        }

        const { allReOrderbleStockAndIngredients, allNonReOrderbleStockAndIngredients } = dataList.data;

      
        const combinedData = [
            ...allReOrderbleStockAndIngredients,
            ...allNonReOrderbleStockAndIngredients,
        ];

        if (combinedData.length === 0) {
            console.warn('No combined data available.');
            return;
        }

        const columns = [
            {
                data: null,
                title: "#Id",
                render: function (data, type, row, meta) {
                    return meta.row + 1;
                },
            },
            { data: 7, title: "Ingredient Name" },
            { data: 5, title: "Unit" },
      
            {
                data: 4,
                title: "Qty",
                render: function (data) {
                    return data !== undefined ? parseFloat(data).toFixed(3) : "0.000"; 
                },
            },
            { data: 8, title: "Re-Order Level" },
            { data: 1, title: "Status" },
        ];

        if ($.fn.dataTable.isDataTable('#tblCurrentStock')) {
            $('#tblCurrentStock').DataTable().clear().destroy();
        }

        const table = $('#tblCurrentStock').DataTable({
            data: combinedData,
            columns: columns,
            orderCellsTop: true,
            fixedHeader: true,
            lengthMenu: [5, 10, 15, 25, 50],
            searching: true,
            pageLength: 10,
        });

     
        $('#global-search-currenStock').on('keyup', function () {
            table.search(this.value).draw();
        });

       
        $('#tblCurrentStock thead tr:eq(1) th input').on('keyup change', function () {
            const columnIndex = $(this).parent().index();
            table.column(columnIndex).search(this.value).draw();
        });

    } catch (error) {
        console.error("Error in stockOverviewReport function:", error);
    }
}


