

const tableIdElement = document.querySelector("#table_id");
const tableSize = document.querySelector("#table_size");
const tableNumber = document.querySelector("#table_number")
const tableStatus = document.querySelector("#table_status");
const tableType = document.querySelector("#table_Type");

const tableSaveBtn = document.getElementById("btn_save_table");
const tableUpdateBtn = document.getElementById("btn_update_table");
const tableDeleteBtn = document.getElementById("btn_delete_table");

const tableInputs=document.querySelectorAll('.table-input-field') 

let allTables = [];
document.addEventListener("DOMContentLoaded",async function () {
    const baseUrl = await window.api.getBaseUrl();
    document.getElementById("search_table_status").addEventListener("change", () => filterTables(baseUrl,allTables));
    document.getElementById("search_table_type").addEventListener("change", () => filterTables(baseUrl,allTables));
    document.getElementById("btn_save_table").addEventListener("click", function () {
        const btnSave = this;
        btnSave.disabled = true;
        saveTable(baseUrl).finally(() => {
            btnSave.disabled = false;
        });
    });
    
    document.getElementById("btn_delete_table").addEventListener("click", function () {
        const btnDelete = this;
        btnDelete.disabled = true;
        deleteTable(baseUrl).finally(() => {
            btnDelete.disabled = false;
        });
    });
    
    document.getElementById("btn_update_table").addEventListener("click", function () {
        const btnUpdate = this;
        btnUpdate.disabled = true;
        updateTable(baseUrl).finally(() => {
            btnUpdate.disabled = false;
        });
    });
    

    tableSize.addEventListener('input', resetForm);
    tableNumber.addEventListener('input', resetForm);

    loadAllTables(baseUrl);
    
});



//=========get all tables==========
async function loadAllTables(baseUrl) {
    try {
        const response = await fetch(baseUrl+"/table", {
            method: 'GET',
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const responseData = await response.json();
       // console.log(responseData);
        document.getElementById('table_search_container').addEventListener('input', function (event) {
           // console.log(responseData);
            const searchText = event.target.value.trim().toLowerCase();
            filterTableById(baseUrl,responseData, searchText);
        })
        allTables = responseData.data;
        //console.log(allTables);
        
        displayTables(baseUrl,allTables);
        tableClickEventHandler(baseUrl);
    } catch (error) {
        console.error('Error:', error);
    }
}

function displayTables(baseUrl,allTables) {
    let tableHTML = "";
    for (let i = 0; i < allTables.length; i++) {     
        let tableData = allTables[i];
        if (tableData.status === "Deleted" || tableData.tableTYpe === "empty") {
            continue;
        }

        let tableColor = '';
        switch (tableData.status) {
            case "Available":
                tableColor = 'var(--order-panel-color)';
                break;
            case "Occupied":
            case "Pending":
                tableColor = 'var(--selected-color)';
                break;
            case "Maintaince":
                tableColor = 'var(--secondary-color)';
                break;
            default:
                tableColor = 'var(--default-color)';
        }
        tableHTML += `
            <div class="dinein-table" data-name="${tableData.status}">
                <div class="dinein-table-header" style="background-color:${tableColor};">
                    <h5 id="table_tableId" style="color:white;">${tableData.tableId}</h5>
                </div>
                <div class="dinein-table-body" style="height: 60%;">
                    <img src="../images/tables/family1.jpg" style="height: 70px; width: 95%;" alt="">
                </div>
                <div class="dinein-table-footer" style="border-bottom-left-radius: 12px; border-bottom-right-radius: 6px; height: 38%;">
                    <p id="tableSize">${tableData.tableSize} | ${tableData.tableTYpe}</p>
                </div>
            </div>
        `;
    }
    document.querySelector(".table-container-right-body").innerHTML = tableHTML;
    tableClickEventHandler(baseUrl);
}


//=========filter tables==========
function filterTables(baseUrl,allTables) {
    const status = document.getElementById("search_table_status").value;
    const type = document.getElementById("search_table_type").value;
  
    
    if (!status && !type) {
        
        displayTables(baseUrl,allTables);
        return;
    }


    const filteredTables = allTables.filter(table => {
        const matchesStatus = !status || table.status === status;
        const matchesType = !type || table.tableTYpe === type;
        return matchesStatus && matchesType;
    });

    displayTables(baseUrl,filteredTables);
}

function filterTableById(baseUrl,tables, searchTable) {
    const filteredTables = tables.data.filter(table => {
        const tableId = table.tableId.toLowerCase();
        const tableSize = table.tableSize.toLowerCase();
        return tableId.includes(searchTable) || tableSize.includes(searchTable);
    });

    displayTables(baseUrl,filteredTables);
}


//========save Table==============
async function saveTable(baseUrl) {
    const tableData = {
        tableTYpe: tableType.value,
        tableNumber: tableNumber.value,
        tableSize: tableSize.value,
        status: tableStatus.value
    }

    fetch(baseUrl + "/table/save", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("jwt")}`
        },
        body: JSON.stringify(tableData)
    })

        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // console.log('Employee saved successfully:', data);
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: " Table saved successfully!",
                showConfirmButton: false,
                timer: 1500
            });
            loadAllTables(baseUrl);
            resetTableForm();
            checkTableInputs()
            loadAllInDoorTables(baseUrl);
       
        })
        .catch(error => {
            console.error('Error saving employee:', error);
        });

}

//========Table Click event ==============
async function tableClickEventHandler(baseUrl) {
    const dineinTables = document.querySelectorAll(".dinein-table");
    dineinTables.forEach(table => {
        table.addEventListener("click", async function () {
            const tableId = table.querySelector("#table_tableId").textContent;
            try {
                const response = await fetch(baseUrl + "/table/?tableId=" + tableId, {
                    method: 'GET',
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                    }
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const responseData = await response.json();
               // console.log(responseData);

                tableIdElement.value = responseData.data.tableId;
                tableSize.value = responseData.data.tableSize;
                tableNumber.value = responseData.data.tableNumber;
                if (responseData.data.status === "Occupied" || responseData.data.status === "Pending") {
                    tableStatus.value = responseData.data.status;
                    tableStatus.disabled = true

                } else {
                    tableStatus.disabled = false
                    tableStatus.value = responseData.data.status;
                }

                tableType.value = responseData.data.tableTYpe;
                // console.log(responseData);
                checkTableInputs();
            } catch (error) {
                console.error('Error:', error);
            }


        });
    });
}
//==========delete table===========
async function deleteTable(baseUrl) {
    const tableId = tableIdElement.value;
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#EA6D27",
        cancelButtonColor: "#101A24",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            fetch(baseUrl + "/table?tableId=" + tableId, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("jwt")}`
                },
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Employee deleted successfully.",
                        icon: "success",
                        confirmButtonColor: "#EA6D27",
                        confirmButtonText: "OK"
                    });
                    loadAllTables(baseUrl);
                    resetTableForm();
                    checkTableInputs() 
                    loadAllInDoorTables(baseUrl)
                })
                .catch(error => {
                    console.error('Error Deleting Employer:', error);
                    alert('This Employee is already deleted.');
                });
        }
    });
}

//==========update table=========
function updateTable(baseUrl) {
    const tableData = {
        tableId: tableIdElement.value,
        tableTYpe: tableType.value,
        tableNumber: tableNumber.value,
        tableSize: tableSize.value,
        status: tableStatus.value
    }

    fetch(baseUrl+"/table", {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("jwt")}`
        },
        body: JSON.stringify(tableData)
    })

        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {

            Swal.fire({
                position: "top-end",
                icon: "success",
                title: " Table Updated successfully!",
                showConfirmButton: false,
                timer: 1500
            });
            loadAllTables(baseUrl);
            resetTableForm();
            checkTableInputs();
            loadAllInDoorTables(baseUrl)

        })
        .catch(error => {
            console.error('Error saving table:', error);
        });
}

//=======reset table=========
function resetTableForm() {
    tableIdElement.value=""
    tableSize.value=""
    tableNumber.value=""
    tableStatus.value="Available"
    tableType.value="outDoor"

    tableInputs.forEach(input => {
        const container = input.parentElement;
        container.style.borderColor = '';
        const invalidText = container.querySelector('.invalid-text');
        const validIcon = container.querySelector('.valid-text');
        if (invalidText) invalidText.style.display = 'none';
        if (validIcon) validIcon.style.display = 'none';
    });
}

function resetForm(){
    if(tableSize.value.trim()==="" && tableNumber.value.trim()===""){
        tableIdElement.value="";
        tableStatus.value="Available";
        tableType.value="outDoor";
        checkTableInputs() 
    }
}


//----------table form Validation---------------
function validateTableSize(tableSize) {
    return /^[a-zA-Z\s]{2,15}$/.test(tableSize);
}

function validateTableNumber(tableNumber) {
    return /^[0-9]{1,3}$/.test(tableNumber);
}

tableInputs.forEach(input => {
    const container = input.parentElement;
    const invalidText = document.createElement('p');
    invalidText.className = 'invalid-text';
    invalidText.innerHTML = 'Invalid <i class="fa-solid fa-circle-exclamation" style="color: #ff3300; padding: 5px;"></i>';
    invalidText.style.display = 'none';
    invalidText.style.color = '#ff3300';
    container.appendChild(invalidText);

    const validIcon = document.createElement('p');
    validIcon.className = 'valid-text';
    validIcon.innerHTML = '<i class="fa-solid fa-circle-check" style="color: #00cc00; padding: 5px;"></i>';
    validIcon.style.display = 'none';
    validIcon.style.color = 'green';
    container.appendChild(validIcon);

    input.addEventListener('input', checkTableInputs);
});

function checkTableInputs() {
    let anyInputEmpty = false; 
    let allInputsValid = true; 

    tableInputs.forEach(input => {
        const container = input.parentElement;
        const value = input.value.trim();
        const invalidText = container.querySelector('.invalid-text');
        const validIcon = container.querySelector('.valid-text');

        if (value === '') {
            anyInputEmpty = true; 
            container.style.borderColor = '';
            invalidText.style.display = 'none';
            if (validIcon) {
                validIcon.style.display = 'none';
            }
        }

        let valid = false;
        if (value !== '') {
            if (input.id === 'table_size') {
                valid = validateTableSize(value);
            } else if (input.id === 'table_number') {
                valid = validateTableNumber(value);
            }
            if (valid) {
                container.style.borderColor = '#00cc00';
                invalidText.style.display = 'none';
                if (validIcon) {
                    validIcon.style.display = 'inline-block';
                }
            } else {
                container.style.borderColor = 'red';
                invalidText.style.display = 'flex';
                if (validIcon) {
                    validIcon.style.display = 'none';
                }
                allInputsValid = false;
            }
        } else {
            container.style.borderColor = '';
            invalidText.style.display = 'none';
            if (validIcon) {
                validIcon.style.display = 'none';
            }
        }
    });
    if (tableIdElement.value.trim() !== '') {
        tableSaveBtn.disabled = true;
        tableUpdateBtn.disabled = !allInputsValid;
        tableDeleteBtn.disabled = !allInputsValid;
    }else if (anyInputEmpty || !allInputsValid) {
        tableSaveBtn.disabled = true;
        tableUpdateBtn.disabled = true;
        tableDeleteBtn.disabled = true;
    } else {
        tableSaveBtn.disabled = false;
        tableUpdateBtn.disabled = true;
        tableDeleteBtn.disabled = true;
    }
}


