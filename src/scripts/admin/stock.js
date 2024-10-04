const ingredientNameElement = document.getElementById("ing-ingredientName");
const ingredientUnitElement = document.getElementById("ing-ingredient-unit");
const ingredientRestockElement = document.getElementById("ing-ingredientRestock");
const ingredientStatusElement = document.getElementById("ing-ingredientStatus");
const ingredientIdElement = document.getElementById("ing_id");

const ingredientInputs = document.querySelectorAll('.addIngredient-input-field');
const stockInputs = document.querySelectorAll('.addStock-input-validate');

const btnAddIngredient = document.getElementById("btn_addingredient");
const btnUpdateIngredient = document.getElementById("btn_updateIngredient");
const btnDeleteIngredient = document.getElementById("btn_deleteIngredient");

const stockIngredientAddNameElement = document.getElementById("stock-add-ingredientName");
const stockIngredientAddUnitElement = document.getElementById("stock-add-ingredientUnit");
const stockIngredientAddPriceElement = document.getElementById("stock-ingredientUnitprice");
const stockIngredientAddQtyElement = document.getElementById("stock-add-ingredientQty");
const stockIngredientAddTotalPriceElement = document.getElementById("stock-ingredientTotal");
const stockIngredientAddDateElement = document.getElementById("stock-inDate");
const stockIngredientAddIdElement = document.getElementById("stock-add-ingredientId");

const ingredientNameInput = document.getElementById('stock-update-ingredientName');
const ingredientUnitInput = document.getElementById('stock-update-ingredientUnit');
const ingredientQtyInput = document.getElementById('stock-update-ingredientQty');
const btnStockQtyPlus = document.getElementById('btnSctokQtyPlus');
const btnStockQtyMinus = document.getElementById('btnSctokQtyMinus');


const btnAddStock = document.getElementById("btn_add_stock");
const btnUpdateStock = document.getElementById("btn_update_stock");

const stockHistoryIngredientId = document.getElementById('stock-history-ingredientId');
const stockHistoryStockId = document.getElementById('stock-history-stockId');
const stockHistoryStockDetailsId = document.getElementById('stock-history-stockDetailsId');
const stockHistoryIngredientName = document.getElementById('stock-history-ingredientName');
const stockHistoryIngredientUnit = document.getElementById('stock-history-ingredientUnit');
const stockHistoryIngredientUnitPrice = document.getElementById('stock-history-ingredientUnitPrice');
const stockHistoryIngredientQty = document.getElementById('stock-history-ingredientQty');
const stockHistoryIngredientTotal = document.getElementById('stock-history-ingredientTotalPrice');
const stockHistoryIngredientDate = document.getElementById('stock-history-ingredientDate');

const stockHistoryIngredientList = document.getElementById('stock-history-ingredients');

const btnUpdateStockHistory = document.getElementById("btn_update_stockHistory");
const btnDeleteStockHistory = document.getElementById("btn_delete_stockHistory");
const btnClearStockHistory = document.getElementById("btn_clear_stockHistory");

const statusSelect = document.getElementById('search_stockHistory_status');
const typeSelect = document.getElementById('search_stockHistory_type');
const dateInput = document.getElementById('search_stockHistory_date');
const ingredientInput = document.getElementById('search_stockHistory_ingredient');
const tableBody = document.getElementById('tbl_stockHistory_body');


document.addEventListener('DOMContentLoaded', async function () {
    const baseUrl = await window.api.getBaseUrl();
    const units = await window.api.getUnits();

    if (!Array.isArray(units)) {
        throw new TypeError('Expected units to be an array');
    }

    populateSelectElement('search_ingredient_type', 'Unit', units,false);
    populateSelectElement('ing-ingredient-unit', 'Units', units,true);
    populateSelectElement('search_stock_type', 'Unit', units,false);
    populateSelectElement('search_stockHistory_type', 'Unit', units,false);


    tabMoveEventHandle();
    loadAllIngredients(baseUrl);
    filteringIngredientTable();
    getAvailableIngredients(baseUrl);
    loadAllStock(baseUrl);

    getAllActiveIngredients(baseUrl)
    getAllStockIngredients(baseUrl)
    filterstockTable()

    loadAllStockHistory(baseUrl)
    loadAllingredientsName(baseUrl)
    calculateStockHistoryForm() 

    stockIngredientAddDateElement.value = new Date().toISOString().split('T')[0];

    document.getElementById('btn_clearIngredient').addEventListener('click', function () {
        clearIngredientsInputs();
        checkIngredientInputs()
        document.getElementById('btnArea-addIngredient').style.display = 'flex';
        document.getElementById('btnArea-modifyIngredient').style.display = 'none';
    });



    btnAddIngredient.addEventListener("click", function () {
        saveIngredient(baseUrl);
    });

    btnUpdateIngredient.addEventListener("click", function () {
        updateIngredient(baseUrl);
    });

    btnDeleteIngredient.addEventListener("click", function () {
        deleteIngredient(baseUrl);
    });


    btnAddStock.addEventListener("click", function () {
        saveStock(baseUrl);
    });

    btnUpdateStock.addEventListener("click", function () {
        updateStock(baseUrl)
    });

    btnUpdateStockHistory.addEventListener("click", function () {
        updateStockHistory(baseUrl)
    });

    btnDeleteStockHistory.addEventListener("click", function () {
        deleteStockHistory(baseUrl)
    });



    stockIngredientAddPriceElement.addEventListener('input', calculateStockTotalPrice);
    stockIngredientAddQtyElement.addEventListener('input', function () {
        calculateStockTotalPrice();
        calculateStockIngredientUnitPrice();
    });
    stockIngredientAddTotalPriceElement.addEventListener('input', calculateStockIngredientUnitPrice);


    btnStockQtyPlus.addEventListener('click', () => updateStockQuantity(true));
    btnStockQtyMinus.addEventListener('click', () => updateStockQuantity(false));


    ingredientNameInput.addEventListener('input', validateStockUpdateInputs);
    ingredientUnitInput.addEventListener('input', validateStockUpdateInputs);
    ingredientQtyInput.addEventListener('input', validateStockUpdateInputs);


    statusSelect.addEventListener('change', filterStockHistoryTable);
    typeSelect.addEventListener('change', filterStockHistoryTable);
    dateInput.addEventListener('input', filterStockHistoryTable);
    ingredientInput.addEventListener('input', filterStockHistoryTable);

});

//tab move event handling
function tabMoveEventHandle() {
    const addStockCheckbox = document.getElementById('add-stock-check');
    const adjustStockCheckbox = document.getElementById('adjust-stock-check');
    const addStockForm = document.getElementById('addStock-form');
    const adjustStockForm = document.getElementById('adjustStock-form');

    function handleCheckboxChange(event) {
        if (event.target === addStockCheckbox) {
            adjustStockCheckbox.checked = !addStockCheckbox.checked;
            addStockForm.style.display = addStockCheckbox.checked ? 'flex' : 'none';
            adjustStockForm.style.display = adjustStockCheckbox.checked ? 'flex' : 'none';
        } else if (event.target === adjustStockCheckbox) {
            addStockCheckbox.checked = !adjustStockCheckbox.checked;
            addStockForm.style.display = addStockCheckbox.checked ? 'flex' : 'none';
            adjustStockForm.style.display = adjustStockCheckbox.checked ? 'flex' : 'none';
        }
    }

    addStockCheckbox.addEventListener('change', handleCheckboxChange);
    adjustStockCheckbox.addEventListener('change', handleCheckboxChange);

    addStockCheckbox.checked = true;
    adjustStockCheckbox.checked = false;
    addStockForm.style.display = 'flex';
    adjustStockForm.style.display = 'none';

    const stockManageButton = document.getElementById('tab1');
    const ingredientManageButton = document.getElementById('tab2');
    const stockHistoryButton = document.getElementById('tab3');

    const stockManageBody = document.getElementById('stock-manage-body');
    const ingredientManageBody = document.getElementById('ingredient-manage-body');
    const stockHistoryBody = document.getElementById('stock-history-body');

    function handleTabClick(event) {
        const target = event.target;
        if (target === stockManageButton) {
            stockManageBody.style.display = 'flex';
            ingredientManageBody.style.display = 'none';
            stockHistoryBody.style.display = 'none';
        } else if (target === ingredientManageButton) {
            stockManageBody.style.display = 'none';
            ingredientManageBody.style.display = 'flex';
            stockHistoryBody.style.display = 'none';
        } else if (target === stockHistoryButton) {
            stockManageBody.style.display = 'none';
            ingredientManageBody.style.display = 'none';
            stockHistoryBody.style.display = 'flex';
        }

        stockManageButton.classList.toggle('active', target === stockManageButton);
        ingredientManageButton.classList.toggle('active', target === ingredientManageButton);
        stockHistoryButton.classList.toggle('active', target === stockHistoryButton);
    }

    stockManageButton.addEventListener('click', handleTabClick);
    ingredientManageButton.addEventListener('click', handleTabClick);
    stockHistoryButton.addEventListener('click', handleTabClick);
}


//add stock/ingredients units from .env
async function populateSelectElement(elementId, defaultText, units,isDisabled) {
    const element = document.getElementById(elementId);
    element.innerHTML = '';

    const defaultOption = document.createElement('option');
    defaultOption.value = "";
    defaultOption.textContent = defaultText;
    defaultOption.disabled = isDisabled;
    defaultOption.selected = isDisabled;
    element.appendChild(defaultOption);

    units.forEach(unit => {
        const option = document.createElement('option');
        option.value = unit;
        option.textContent = unit;
        element.appendChild(option);
    });
}



//------Load All Ingredient----------------
async function loadAllIngredients(baseUrl) {
    try {
        const response = await fetch(baseUrl + "/ingredients/allIngredients", {
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
          console.log(responseData);

        let tableHTML = "";

        for (let i = 0; i < responseData.data.length; i++) {
            const status = responseData.data[i].ingredientStatus === 1 ? "Active" : "In-Active";
            const statusColor = responseData.data[i].ingredientStatus === 1 ? "#00cc00" : "#ff3300";
            tableHTML += `
               <tr data-index="${i}" data-id="${responseData.data[i].ingredientId}">
                <td>${i + 1}</td>
                <td>${responseData.data[i].ingredientName}</td>
                   <td>${responseData.data[i].reOrderLevel}</td>
                <td>${responseData.data[i].ingredientsUnit}</td>   
                <td style="color: ${statusColor};">${status}</td>
            </tr>
            `;
        }
        const tableBody = document.querySelector('#tbl_Ingredient tbody');
        tableBody.innerHTML = tableHTML;

        tableBody.querySelectorAll('tr').forEach(row => {
            row.addEventListener('click', (event) => {
                const index = event.currentTarget.getAttribute('data-index');
                const ingredientId = event.currentTarget.getAttribute('data-id');
                const ingredient = responseData.data[index];

                ingredientIdElement.value = ingredientId
                ingredientNameElement.value = ingredient.ingredientName;
                ingredientUnitElement.value = ingredient.ingredientsUnit;
                ingredientRestockElement.value = ingredient.reOrderLevel;
                ingredientStatusElement.value = ingredient.ingredientStatus;

                document.getElementById('btnArea-addIngredient').style.display = 'none';
                document.getElementById('btnArea-modifyIngredient').style.display = 'flex';
                checkIngredientInputs();
            });
        });

    } catch (error) {
        console.error('Error:', error);
    }
}

//clear inputs
function clearIngredientsInputs() {
    ingredientIdElement.value = '';
    ingredientNameElement.value = '';
    ingredientUnitElement.value = '';
    ingredientRestockElement.value = '';
    ingredientStatusElement.value = '';
};

//------Save Ingredient----------------
async function saveIngredient(baseUrl) {

    const ingredientData = {
        ingredientName: ingredientNameElement.value,
        ingredientsUnit: ingredientUnitElement.value,
        reOrderLevel: ingredientRestockElement.value,
        date: "",
        ingredientStatus: ingredientStatusElement.value
    }

    fetch(baseUrl + "/ingredients", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("jwt")}`
        },
        body: JSON.stringify(ingredientData)
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
                title: "Ingredient saved successfully!",
                showConfirmButton: false,
                timer: 1500
            });
            clearIngredientsInputs();
            loadAllIngredients(baseUrl);
            checkIngredientInputs();
            getAvailableIngredients(baseUrl);
            getAllActiveIngredients(baseUrl)
            loadAllDishIngredients(baseUrl);

        })
        .catch(error => {
            console.error('Error saving Ingredient:', error);
        });

}


//-----update Ingredient--------------
async function updateIngredient(baseUrl) {
    const ingredientData = {
        ingredientId: ingredientIdElement.value,
        ingredientName: ingredientNameElement.value,
        ingredientsUnit: ingredientUnitElement.value,
        reOrderLevel: ingredientRestockElement.value,
        date: "",
        ingredientStatus: ingredientStatusElement.value
    }

    fetch(baseUrl + "/ingredients", {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("jwt")}`
        },
        body: JSON.stringify(ingredientData)
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
                title: "Ingredient updated successfully!",
                showConfirmButton: false,
                timer: 1500
            });
            loadAllIngredients(baseUrl);
            clearIngredientsInputs();
            checkIngredientInputs();
            getAvailableIngredients(baseUrl);
            loadAllStock(baseUrl);
            getAllActiveIngredients(baseUrl)

        })
        .catch(error => {
            console.error('Error update Ingredient:', error);
        });

}


//-----delete Ingredient--------------
async function deleteIngredient(baseUrl) {
    const ingredientId = ingredientIdElement.value;
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
            fetch(baseUrl + "/ingredients?ingredientsId=" + ingredientId, {
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
                        text: "Ingredient deleted successfully.",
                        icon: "success",
                        confirmButtonColor: "#EA6D27",
                        confirmButtonText: "OK"
                    });
                    loadAllIngredients(baseUrl)
                    clearIngredientsInputs();
                    checkIngredientInputs();
                    getAvailableIngredients(baseUrl);
                    loadAllStock(baseUrl);
                    getAllActiveIngredients(baseUrl);
                })
                .catch(error => {
                    console.error('Error Deleting Ingredient:', error);

                });
        }
    });
}


//get available ingredients
async function getAvailableIngredients(baseUrl) {
    try {
        const response = await fetch(baseUrl + "/ingredients/allIngredients", {
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

        const datalist = document.getElementById('ing-ingredients');
        datalist.innerHTML = '';

        responseData.data.forEach(ingredient => {
            const option = document.createElement('option');
            option.value = ingredient.ingredientName;
            datalist.appendChild(option);
        });


        const inputField = document.getElementById('ing-ingredientName');

        inputField.addEventListener('input', function () {
            const inputValue = this.value;
            const options = Array.from(datalist.options).map(option => option.value);


            if (options.some(option => option.toLowerCase() === inputValue.toLowerCase())) {
                Swal.fire({
                    title: "Oops...",
                    text: "The ingredient is already in the list",
                    icon: "warning",
                    customClass: {
                        confirmButton: 'alert-orange-button',
                    }
                });
                this.value = '';
                checkIngredientInputs();
                return;
            }
        });

    } catch (error) {
        console.error('Error:', error);
    }
}

//searching events
function filteringIngredientTable() {
    const searchStockStatus = document.getElementById('search_ingredient_status');
    const searchStockType = document.getElementById('search_ingredient_type');
    const searchIngredient = document.getElementById('search_ingredient');
    const tableBody = document.getElementById('tbl_Ingredient_body');


    function filterTable() {
        const statusFilter = searchStockStatus.value.toLowerCase();
        const unitFilter = searchStockType.value.toLowerCase();
        const ingredientFilter = searchIngredient.value.toLowerCase();

        for (const row of tableBody.rows) {
            const status = row.cells[4].textContent.toLowerCase();
            const unitType = row.cells[3].textContent.toLowerCase();
            const ingredient = row.cells[1].textContent.toLowerCase();

            const statusMatch = status.includes(statusFilter);
            const unitMatch = unitType.includes(unitFilter);
            const ingredientMatch = ingredient.includes(ingredientFilter);

            if (statusMatch && unitMatch && ingredientMatch) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        }
    }

    searchStockStatus.addEventListener('change', filterTable);
    searchStockType.addEventListener('change', filterTable);
    searchIngredient.addEventListener('input', filterTable);
}


//validations
function validateIngredientName(ingredientName) {
    return /^[a-zA-Z\s]+$/.test(ingredientName);
}

function validateRestock(restock) {
    return /^\d{1,3}(?:\.\d{3})*$/.test(restock);
}

ingredientInputs.forEach(input => {
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

    input.addEventListener('input', checkIngredientInputs);
});

ingredientStatusElement.addEventListener('change', checkIngredientInputs);
ingredientUnitElement.addEventListener('change', checkIngredientInputs);

function checkIngredientInputs() {
    let anyInputEmpty = false;
    let allInputsValid = true;

    ingredientInputs.forEach(input => {
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
            return;
        }

        let valid = false;
        if (value !== '') {
            if (input.id === 'ing-ingredientName') {
                valid = validateIngredientName(value);
            } else if (input.id === 'ing-ingredientRestock') {
                valid = validateRestock(value);
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
        }
    });

    if (ingredientStatusElement.value.trim() === '' || ingredientUnitElement.value.trim() === '') {
        anyInputEmpty = true;
    }

    if (anyInputEmpty || !allInputsValid) {
        btnAddIngredient.disabled = true;
        btnUpdateIngredient.disabled = true;
        btnDeleteIngredient.disabled = true;
    } else {
        btnAddIngredient.disabled = false;
        btnUpdateIngredient.disabled = false;
        btnDeleteIngredient.disabled = false;
    }
}


//======================================Stock Manage========================================

//validations
function validateIngredientPrice(ingredientPrice) {
    return /^\d+(\.\d{1,2})?$/.test(ingredientPrice);
}

function validateIngredientQty(ingredientQty) {
    return /^\d+(\.\d{1,2})?$/.test(ingredientQty);
}

function validateIngredientTotalPrice(ingredientTot) {
    return /^\d+(\.\d{1,2})?$/.test(ingredientTot);
}


stockInputs.forEach(input => {
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

    input.addEventListener('input', checkStockInputs);
});

stockIngredientAddNameElement.addEventListener('change', checkStockInputs);
stockIngredientAddUnitElement.addEventListener('change', checkStockInputs);
stockIngredientAddDateElement.addEventListener('change', checkStockInputs)

function checkStockInputs() {
    let anyInputEmpty = false;
    let allInputsValid = true;

    stockInputs.forEach(input => {
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
            return;
        }

        let valid = false;
        if (value !== '') {
            if (input.id === 'stock-ingredientUnitprice') {
                valid = validateIngredientPrice(value);
            } else if (input.id === 'stock-add-ingredientQty') {
                valid = validateIngredientQty(value);
            } else if (input.id === 'stock-ingredientTotal') {
                valid = validateIngredientTotalPrice(value);
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
        }
    });

    if (stockIngredientAddNameElement.value.trim() === '' || stockIngredientAddUnitElement.value.trim() === '' || stockIngredientAddDateElement.value.trim() === '') {
        anyInputEmpty = true;
    }

    if (anyInputEmpty || !allInputsValid) {
        btnAddStock.disabled = true;

    } else {
        btnAddStock.disabled = false;

    }
}


//calculate ingredient totalprice and unit price dynimacally
function calculateStockTotalPrice() {
    const unitPrice = parseFloat(stockIngredientAddPriceElement.value);
    const quantity = parseFloat(stockIngredientAddQtyElement.value);
    if (!isNaN(unitPrice) && !isNaN(quantity)) {
        stockIngredientAddTotalPriceElement.value = (unitPrice * quantity).toFixed(2);
    } else {
        stockIngredientAddTotalPriceElement.value = '';
    }
    checkStockInputs()
}

function calculateStockIngredientUnitPrice() {
    const total = parseFloat(stockIngredientAddTotalPriceElement.value);
    const quantity = parseFloat(stockIngredientAddQtyElement.value);
    if (!isNaN(total) && !isNaN(quantity) && quantity !== 0) {
        stockIngredientAddPriceElement.value = (total / quantity).toFixed(2);
    } else {
        stockIngredientAddPriceElement.value = '';
    }
    checkStockInputs()
}



//------load all stock-----------------
async function loadAllStock(baseUrl) {
    try {
        const response = await fetch(baseUrl + "/stock/allStock", {
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
        console.log(responseData);
        
        let tableHTML = "";

        for (let i = 0; i < responseData.data.length; i++) {
            // Determine the stock status
            let stockStatus = responseData.data[i][1];
            let displayStatus = stockStatus === "inStock" ? "In Stock" : "Out of Stock";
            let color = stockStatus === "outOfStock" ? "red" : "black"; // Use red for out-of-stock, black for in-stock

            tableHTML += `
                <tr data-index="${i}">
                    <td>${i + 1}</td>
                    <td>${responseData.data[i][7]}</td>
                    <td>${responseData.data[i][5]}</td>
                    <td>${responseData.data[i][4].toFixed(3)}</td>   
                    <td style="color: ${color};">${displayStatus}</td>   
                </tr>
            `;
        }

        const tableBody = document.querySelector('#tbl_ing_stock tbody');
        tableBody.innerHTML = tableHTML;

    } catch (error) {
        console.error('Error:', error);
    }
}



//get active ingredients for ingrediet inputs
async function getAllActiveIngredients(baseUrl) {
    try {
        const response = await fetch(baseUrl + "/ingredients", {
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

        const datalist = document.getElementById('stock-add-ingredients');
        const datalistTwo = document.getElementById('stock-update-ingredients');
        datalist.innerHTML = '';
        datalistTwo.innerHTML = '';

        responseData.data.forEach(ingredient => {
            const optionOne = document.createElement('option');
            optionOne.value = ingredient.ingredientName;
            datalist.appendChild(optionOne);

            const optionTwo = document.createElement('option');
            optionTwo.value = ingredient.ingredientName;
            datalistTwo.appendChild(optionTwo);
        });

        const ingredientInput = document.getElementById('stock-add-ingredientName');
        const ingredientIdInput = document.getElementById('stock-add-ingredientId');
        const ingredientUnitInput = document.getElementById('stock-add-ingredientUnit');

        // const stockIngredientNameInput = document.getElementById('stock-update-ingredientName');
        // const stockUpdateIdInput = document.getElementById('stock-update-ingredientId');
        // const stockIngredientUnitInput = document.getElementById('stock-update-ingredientUnit');

        const updateInputs = (inputElement, idInput, unitInput) => {
            inputElement.addEventListener('input', () => {
                const selectedIngredient = responseData.data.find(ingredient => ingredient.ingredientName === inputElement.value);

                if (selectedIngredient) {
                    idInput.value = selectedIngredient.ingredientId;
                    unitInput.value = selectedIngredient.ingredientsUnit;
                } else {
                    idInput.value = '';
                    unitInput.value = '';
                }
            });
        };

        updateInputs(ingredientInput, ingredientIdInput, ingredientUnitInput);


    } catch (error) {
        console.error('Error:', error);
    }
}



//get stock ingredients for ingrediet inputs
async function getAllStockIngredients(baseUrl) {
    try {
        const response = await fetch(baseUrl + "/stock/allStock", {
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
        //   console.log(responseData);

        const datalist = document.getElementById('stock-update-ingredients');
        datalist.innerHTML = '';

        responseData.data.forEach(ingredient => {
            const optionOne = document.createElement('option');
            optionOne.value = ingredient[7];
            datalist.appendChild(optionOne);
        });

        const stockIngredientNameInput = document.getElementById('stock-update-ingredientName');
        const stockUpdateIdInput = document.getElementById('stock-update-ingredientId');
        const stockIngredientUnitInput = document.getElementById('stock-update-ingredientUnit');

        const updateInputs = (inputElement, idInput, unitInput) => {
            inputElement.addEventListener('input', () => {
                const selectedIngredient = responseData.data.find(ingredient => ingredient[7] === inputElement.value);

                if (selectedIngredient) {
                    idInput.value = selectedIngredient[0];
                    unitInput.value = selectedIngredient[5];
                } else {
                    idInput.value = '';
                    unitInput.value = '';
                }
            });
        };

        updateInputs(stockIngredientNameInput, stockUpdateIdInput, stockIngredientUnitInput);


    } catch (error) {
        console.error('Error:', error);
    }
}



//------save stock------------
async function saveStock(baseUrl) {
    const stockData = {
        ingredientId: stockIngredientAddIdElement.value,
        ingredientName: stockIngredientAddNameElement.value,
        ingredientsUnit: stockIngredientAddUnitElement.value,
        ingredientsUnitPrice: stockIngredientAddPriceElement.value,
        dateAndTime: stockIngredientAddDateElement.value,
        ingredientQty: stockIngredientAddQtyElement.value,
        ingredientsTotalPrice: stockIngredientAddTotalPriceElement.value,
        stockType: "add",
        actionStatus: "",
        stockDTO: {
            ingredientId: stockIngredientAddIdElement.value,
            ingredientsUnit: stockIngredientAddUnitElement.value,
            ingredientQty: stockIngredientAddQtyElement.value,
            stockStatus: 1,
            currenStatus: "inStock"
        }

    }

    fetch(baseUrl + "/stockDetails", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("jwt")}`
        },
        body: JSON.stringify(stockData)
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
                title: "stock saved successfully!",
                showConfirmButton: false,
                timer: 1500
            });
            loadAllStock(baseUrl);
            loadAllStockHistory(baseUrl)
            stockIngredientAddIdElement.value = '';
            stockIngredientAddNameElement.value = '';
            stockIngredientAddUnitElement.value = '';
            stockIngredientAddPriceElement.value = '';
            stockIngredientAddQtyElement.value = '';
            stockIngredientAddTotalPriceElement.value = '';
            stockIngredientAddDateElement.value = new Date().toISOString().split('T')[0];

            checkStockInputs()
            getAllStockIngredients(baseUrl)
            stockHistory(baseUrl);
            stockOverviewReport(baseUrl);
            expensesReport(baseUrl)

        })
        .catch(error => {
            console.error('Error saving Ingredient:', error);
        });

}


//change stock qty from + -
ingredientQtyInput.value = '0.000';

function updateStockQuantity(increment) {

    const unit = ingredientUnitInput.value;
    let qty = parseFloat(ingredientQtyInput.value) || 0;

    if (unit.toLowerCase() === 'pieces') {
        qty += increment ? 1 : -1;
    } else {
        qty += increment ? 0.1 : -0.1;
    }

    ingredientQtyInput.value = qty.toFixed(unit.toLowerCase() === 'pieces' ? 0 : 3);
    validateStockUpdateInputs()
};


ingredientQtyInput.addEventListener('focus', () => {
    if (ingredientQtyInput.value === '0.000') {
        ingredientQtyInput.value = '';
    }
});

ingredientQtyInput.addEventListener('blur', () => {
    if (ingredientQtyInput.value === '') {
        ingredientQtyInput.value = '0.000';
    }
});

//btn update stock validation
function validateStockUpdateInputs() {
    if (ingredientNameInput.value.trim() === '' ||
        ingredientUnitInput.value.trim() === '' ||
        ingredientQtyInput.value.trim() === '') {
        btnUpdateStock.disabled = true;
    } else {
        btnUpdateStock.disabled = false;
    }
};

//------update stock------------
async function updateStock(baseUrl) {

    let stockQty = document.getElementById('stock-update-ingredientQty').value;
    let stockId = document.getElementById('stock-update-ingredientId').value;
    let stockUnit = document.getElementById('stock-update-ingredientUnit').value;

    fetch(baseUrl + "/stockDetails/plus?stockId=" + stockId + "&qty=" + stockQty + "&unit=" + stockUnit, {
        method: 'PUT',
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
                position: "top-end",
                icon: "success",
                title: "stock updated successfully!",
                showConfirmButton: false,
                timer: 1500
            });

            loadAllStock(baseUrl);
            loadAllStockHistory(baseUrl);
            stockHistory(baseUrl);
            stockOverviewReport(baseUrl);
            // getAllActiveIngredients(baseUrl)
            

            document.getElementById('stock-update-ingredientName').value = '';
            document.getElementById('stock-update-ingredientUnit').value = '';
            document.getElementById('stock-update-ingredientQty').value = '0.000';
            document.getElementById('stock-update-ingredientId').value = '';

        })
        .catch(error => {
            console.error('Error saving Ingredient:', error);
        });

}


//searching events
function filterstockTable() {
    const searchStockStatus = document.getElementById('search_stock_status');
    const searchStockType = document.getElementById('search_stock_type');
    const searchIngredient = document.getElementById('search_stock_ingredient');
    const tableBody = document.getElementById('tbl_ing_stock_body');


    function filterstocks() {
        const statusFilter = searchStockStatus.value.toLowerCase();
        const unitFilter = searchStockType.value.toLowerCase();
        const ingredientFilter = searchIngredient.value.toLowerCase();

        for (const row of tableBody.rows) {
            const status = row.cells[4].textContent.toLowerCase();
            const unitType = row.cells[2].textContent.toLowerCase();
            const ingredient = row.cells[1].textContent.toLowerCase();

            const statusMatch = status.includes(statusFilter);
            const unitMatch = unitType.includes(unitFilter);
            const ingredientMatch = ingredient.includes(ingredientFilter);

            if (statusMatch && unitMatch && ingredientMatch) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        }
    }

    searchStockStatus.addEventListener('change', filterstocks);
    searchStockType.addEventListener('change', filterstocks);
    searchIngredient.addEventListener('input', filterstocks);
}

//======================================Stock History========================================

//---load all stock history-----------
async function loadAllStockHistory(baseUrl) {
    try {
        const response = await fetch(`${baseUrl}/stockDetails`, {
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

        let tableHTML = "";

        responseData.data.forEach((item, index) => {
            tableHTML += `
                <tr data-index="${index}" data-ingId="${item[3]}" data-stockId="${item[8]}" data-stockDetailsId="${item[0]}" data-status="${item[1]}">
                    <td>${index + 1}</td>
                    <td>${item[11]}</td>
                    <td>${item[2]}</td>
                    <td>${item[6]}</td>
                    <td>${item[7]}</td>
                    <td>${item[4]}</td>
                    <td>${item[5]}</td>
                    <td>${item[1]}</td>
                </tr>
            `;
        });

        const tableBody = document.querySelector('#tbl_stockHistory tbody');
        tableBody.innerHTML = tableHTML;

        tableBody.querySelectorAll('tr').forEach(row => {
            row.addEventListener('click', event => {
                const index = event.currentTarget.getAttribute('data-index');
                const ingredientId = event.currentTarget.getAttribute('data-ingId');
                const stockId = event.currentTarget.getAttribute('data-stockId');
                const stockDetailsId = event.currentTarget.getAttribute('data-stockDetailsId');
                const status = event.currentTarget.getAttribute('data-status');
                const ingredient = responseData.data[index];

                stockHistoryIngredientId.value = ingredientId;
                stockHistoryStockId.value = stockId;
                stockHistoryStockDetailsId.value = stockDetailsId;
                stockHistoryIngredientName.value = ingredient[11];
                stockHistoryIngredientUnit.value = ingredient[6];
                stockHistoryIngredientUnitPrice.value = ingredient[7];
                stockHistoryIngredientQty.value = ingredient[4];
                stockHistoryIngredientTotal.value = ingredient[5];
                stockHistoryIngredientDate.value = ingredient[2];

                if (status === "adjust") {
                    btnUpdateStockHistory.disabled = true;
                } else {
                    btnUpdateStockHistory.disabled = false;
                }
                btnDeleteStockHistory.disabled = false
                document.getElementById('stock-history-form').style.display = 'flex';
                document.querySelector('.stock-update-body-wrapper-bottom').style.height = '62%';
            });
        });

    } catch (error) {
        console.error('Error:', error);
    }
}


btnClearStockHistory.addEventListener("click", function () {
    resetStockHistoryForm()
    document.getElementById('stock-history-form').style.display = 'none';
    document.querySelector('.stock-update-body-wrapper-bottom').style.height = '89%';
})


//---update stock history-----------
async function updateStockHistory(baseUrl) {
    const stockData = {
        id: stockHistoryStockDetailsId.value,
        stockId: stockHistoryStockId.value,
        ingredientId: stockHistoryIngredientId.value,
        ingredientsUnit: stockHistoryIngredientUnit.value,
        ingredientsUnitPrice: stockHistoryIngredientUnitPrice.value,
        dateAndTime: stockHistoryIngredientDate.value,
        ingredientQty: stockHistoryIngredientQty.value,
        ingredientsTotalPrice: stockHistoryIngredientTotal.value,
        stockType: "add",
        actionStatus: "",
        stockDTO: {
            ingredientId: stockHistoryIngredientId.value,
            ingredientsUnit: stockHistoryIngredientUnit.value,
            ingredientQty: stockHistoryIngredientQty.value,
            stockStatus: 1,
            currentStatus: "in"
        }
    }

    fetch(baseUrl + "/stockDetails", {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("jwt")}`
        },
        body: JSON.stringify(stockData)
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
                title: "Stock updated successfully!",
                showConfirmButton: false,
                timer: 1500
            });
            loadAllStockHistory(baseUrl);
            loadAllStock(baseUrl)
            resetStockHistoryForm()
            stockHistory(baseUrl);
            stockOverviewReport(baseUrl);
        

        })
        .catch(error => {
            console.error('Error update Ingredient:', error);
        });

}

//---delete stock history-----------
function deleteStockHistory(baseUrl) {
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
            const stockDetailsId = stockHistoryStockDetailsId.value;
            const qty = stockHistoryIngredientQty.value;
            fetch(baseUrl + "/stockDetails?stockDetailsId=" + stockDetailsId + "&qty=" + qty, {
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
                        text: "Stock deleted successfully.",
                        icon: "success",
                        confirmButtonColor: "#EA6D27",
                        confirmButtonText: "OK"
                    });
                    loadAllStockHistory(baseUrl)
                    loadAllStock(baseUrl)
                    resetStockHistoryForm()
                    stockHistory(baseUrl);
                    stockOverviewReport(baseUrl);
                })
                .catch(error => {
                    console.error('Error Deleting Stock:', error);

                });
        }
    });
}


//stock history calculate event
function calculateStockHistoryForm() {
    const unitPriceInput = document.getElementById('stock-history-ingredientUnitPrice');
    const qtyInput = document.getElementById('stock-history-ingredientQty');
    const totalPriceInput = document.getElementById('stock-history-ingredientTotalPrice');

    function calculateTotalPrice() {
        const unitPrice = parseFloat(unitPriceInput.value) || 0;
        const qty = parseFloat(qtyInput.value) || 0;
        const totalPrice = unitPrice * qty;
        totalPriceInput.value = totalPrice.toFixed(2);
    }

    function calculateUnitPrice() {
        const totalPrice = parseFloat(totalPriceInput.value) || 0;
        const qty = parseFloat(qtyInput.value) || 0;
        if (qty !== 0) {
            const unitPrice = totalPrice / qty;
            unitPriceInput.value = unitPrice.toFixed(2);
        }
    }

    function calculateQtyAndUnitPrice() {
        const totalPrice = parseFloat(totalPriceInput.value) || 0;
        const qty = parseFloat(qtyInput.value) || 0;
        if (qty !== 0) {
            const unitPrice = totalPrice / qty;
            unitPriceInput.value = unitPrice.toFixed(2);
        }
        calculateTotalPrice(); 
    }

    unitPriceInput.addEventListener('input', calculateTotalPrice);
    qtyInput.addEventListener('input', calculateTotalPrice);
    totalPriceInput.addEventListener('input', calculateUnitPrice);
    qtyInput.addEventListener('change', calculateQtyAndUnitPrice);
}


//btn update stock validation
function validateStockUpdateInputs() {
    if (ingredientNameInput.value.trim() === '' ||
        ingredientUnitInput.value.trim() === '' ||
        ingredientQtyInput.value.trim() === '') {
        btnUpdateStock.disabled = true;
    } else {
        btnUpdateStock.disabled = false;
    }
};



function resetStockHistoryForm() {
    stockHistoryIngredientId.value = "";
    stockHistoryStockId.value = "";
    stockHistoryStockDetailsId.value = "";
    stockHistoryIngredientName.value = "";
    stockHistoryIngredientUnit.value = "";
    stockHistoryIngredientUnitPrice.value = "";
    stockHistoryIngredientQty.value = "";
    stockHistoryIngredientTotal.value = "";
    stockHistoryIngredientDate.value = "";
}

//get ingredients names
async function loadAllingredientsName(baseUrl) {
    try {
        const response = await fetch(baseUrl + "/ingredients/allIngredientsNameUnit", {
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
        //console.log(responseData);

        const datalist = document.getElementById('stock-history-ingredients');
        datalist.innerHTML = '';

        responseData.data.forEach(ingredient => {
            const optionOne = document.createElement('option');
            optionOne.value = ingredient[0];
            datalist.appendChild(optionOne);
        });

        const updateInputs = (inputElement, idInput, unitInput) => {
            inputElement.addEventListener('input', () => {
                const selectedIngredient = responseData.data.find(ingredient => ingredient[0] === inputElement.value);

                if (selectedIngredient) {
                    idInput.value = selectedIngredient[1];
                    unitInput.value = selectedIngredient[2];
                } else {
                    idInput.value = '';
                    unitInput.value = '';
                }
            });
        };

        updateInputs(stockHistoryIngredientName, stockHistoryIngredientId, stockHistoryIngredientUnit);


    } catch (error) {
        console.error('Error:', error);
    }
}





//stock history table filterig
function filterStockHistoryTable() {
    const statusValue = statusSelect.value.toLowerCase();
    const typeValue = typeSelect.value.toLowerCase();
    const dateValue = dateInput.value;
    const ingredientValue = ingredientInput.value.toLowerCase();

    const rows = tableBody.getElementsByTagName('tr');
    for (const row of rows) {
        const cells = row.getElementsByTagName('td');
        const status = cells[7].textContent.toLowerCase();
        const type = cells[3].textContent.toLowerCase();
        const date = cells[2].textContent;
        const ingredient = cells[1].textContent.toLowerCase();

        const matchesStatus = status.includes(statusValue) || !statusValue;
        const matchesType = type.includes(typeValue) || !typeValue;
        const matchesDate = date.includes(dateValue) || !dateValue;
        const matchesIngredient = ingredient.includes(ingredientValue) || !ingredientValue;

        row.style.display = matchesStatus && matchesType && matchesDate && matchesIngredient ? '' : 'none';
    }
}

