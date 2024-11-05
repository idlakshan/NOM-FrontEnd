const currentDateAndtime = document.getElementById("currentDateAndTime");

const categoryCardListArea = document.querySelector(".category-items-area");
const tableArea = document.querySelector(".tableArea");
const backTocategoryList = document.querySelector(".backButtonArea");
const dishCardListArea = document.querySelector(".dishes-area");
const alphabetArea = document.querySelector(".alphabetArea");

const groupIdInput = document.querySelector(".cashier-groupId");
const tableAreaView = document.querySelector(".cashier-dinein-table-area");
const btnTableDropdown = document.querySelector(".btnPopUpTable");

const letterButtons = document.querySelectorAll(".letter-btn");

const dishContentArea = document.querySelector(".dishes-area");
const selectDishPopup = document.querySelector(".selectedDishPopup");

const fullTakeawayTotalElement = document.querySelector(".tk-total");
const fullDineinTotalElement = document.querySelector(".di-total");

const btnPay = document.querySelector(".btn-pay");
const orderConfrimPanel = document.querySelector(".confrim-orderPanel");
const orderConfrimPanelClose = document.querySelector(".close_icon_orderConfrim");
const container = document.querySelector(".container");

const orderItemsContainer = document.querySelector(".cashier-dinein-right-inner-content-body-middle");

const orderDiscount = document.querySelector(".orderDiscount");
const orderNetTotal = document.querySelector(".orderNetTotal");
const orderBalance = document.querySelector(".orderBalance");

const btnConfrim = document.querySelector("#btn_confirm");

const customerName = document.getElementById("customer-name");
const inputMobileElement = document.querySelector(".customer-mobile-input");
const customerMobileDataList = document.getElementById("customer-mobile");
const waiterListInput = document.getElementById("loadAllWaiters");


const numbericKeypad = document.querySelector(".numberic-keypad-mobile");
const numberkeys = document.querySelectorAll('.letter-mobile');
const keyEnter = document.querySelector(".enter-mobile");
const keyBackspace = document.querySelector(".delete-mobile");

const addCustomerBox = document.querySelector(".addCustomer-box");
const btnAddCustomer = document.querySelector(".btn-addcustomer");
const addCustomerBoxClose = document.querySelector(".addCustomer-box-close-icon");
const keypadButtons = document.querySelectorAll('.btns-addCustomer, .btns-addCustomer-number');
const mobileInput = document.getElementById('addCustomerMobile');
const nameInput = document.getElementById('addCustomerName');

const customerSaveBtn = document.getElementById("btnSaveCustomer");

const orderIdElement = document.getElementById("dinein_orderId");

const btnCloseDishDetailsPopup = document.querySelector(".btnCloseDishDetailsPopup");
const dishDetailsPopup = document.querySelector(".dishDetailsPopup");

const paymentWarning = document.getElementById('paymentWarning');
const paymentAlertContainer = document.querySelector('.confrim-orderPanel-body-inner-payment-alert');

const creditInput = document.getElementById('inputpaycreditOne');

let lastSelectedDishSize = null;
let btnTableRotate = true;
let isFirstOrderedCartItem = true;

let selectedCusId
let selectedCusName
let selectCusContact;
let selectCusCreditStatus;

let selectedTableId;
let selectedTableNumber;


let selectedWaiterName = '';
let selectedWaiterId = '';

let previouslySelectedCard = null;
let currentlySelectedCard = null;

let previousDishWaitersList = [];

document.addEventListener("DOMContentLoaded", async function () {
    const baseUrl = await window.api.getBaseUrl();
    const dishImagePath = await window.api.getImagePath();
   
    initializePage(baseUrl);
    updateTime();
    setInterval(updateTime, 1000);
    fetchOrderId(baseUrl);
    handleTakeawayPanelToggle();
    handleLoadAllCategories(baseUrl, dishImagePath);
    handleLoadAndSelectCustomer(baseUrl);
    handleSelectCustomerKeyboardEvent();
    handleLoadAllTables(baseUrl);
    loadAllWaiters(baseUrl);
    handleCloseDishDetailsPopup();

    addCustomerEvent();

    handleCustomerSaveEvent(baseUrl);
    handleShiftEndEvent(baseUrl);
    
});

async function initializePage(baseUrl) {
    const isSessionStarted = localStorage.getItem('sessionStarted');
    const isCashier = localStorage.getItem('role');
    const tableInnerArea = document.querySelector(".cashier-dinein-table-inner-area-body");

    if (isCashier === 'cashier') {
        tableInnerArea.style.pointerEvents = 'auto';
    } else if (isSessionStarted === "true") {
       // console.log("start");
        tableInnerArea.style.pointerEvents = 'auto';
    } else {
      //  console.log("not start");
        tableInnerArea.style.pointerEvents = 'none';
    }

    const isActiveAdmin = await checkUserDetails(baseUrl, localStorage.getItem("userId"));
    if (!isActiveAdmin) {
        dishCardListArea.style.pointerEvents = "none";
        tableAreaView.style.display = 'none';
        alphabetArea.style.pointerEvents ='none';
        btnTableDropdown.classList.remove("btnPopUpTable-rotate");
        return;
    }
}




//function to set nav bar time and date
function updateTime() {
    const months = [
        "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
        "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
    ];
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = months[currentDate.getMonth()];
    const year = currentDate.getFullYear();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const amOrpm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const formattedDate = `${day} ${month} ${year} | ${formattedHours}.${minutes.toString().padStart(2, '0')} ${amOrpm}`;
    currentDateAndtime.innerHTML = formattedDate;

}

//function to toggle cashier takeway
function handleTakeawayPanelToggle() {
    document.getElementById("toTakeAwayToggle").addEventListener("click", function () {
        if (!this.checked) {
            window.location = './cashier-takeaway.html';
        }
    });
}


//function to fetch Order ID from Backend =========
async function fetchOrderId(baseUrl) {
    try {
        const response = await fetch(`${baseUrl}/orders/oId`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const orderId = await response.json();
        //  console.log(orderId);
        orderIdElement.value = orderId.data;
    } catch (error) {
        console.error("Error fetching Order ID:", error);
    }
}

//function to get current date and time
function getCurrentDateTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const timezoneOffset = -now.getTimezoneOffset();
    const sign = timezoneOffset >= 0 ? '+' : '-';
    const offsetHours = String(Math.floor(Math.abs(timezoneOffset) / 60)).padStart(2, '0');
    const offsetMinutes = String(Math.abs(timezoneOffset) % 60).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${sign}${offsetHours}:${offsetMinutes}`;
}

//function to close dish details popup
function handleCloseDishDetailsPopup(){
    btnCloseDishDetailsPopup.addEventListener("click", function () {
        dishDetailsPopup.style.display = "none"
    });
}

//function to save customer event
function handleCustomerSaveEvent(baseUrl){
    customerSaveBtn.addEventListener("click", function () {
        dineinSaveCustomerEvent(baseUrl)
    })
}

//function to shift end event
function handleShiftEndEvent(baseUrl){
    document.querySelector(".btn-shift-end").addEventListener("click", function () {
        sendEndShift(baseUrl);
    });
}

//function to select customers in order cart============
async function handleLoadAndSelectCustomer(baseUrl) {
    try {
        const response = await fetch(baseUrl + "/customer/one", {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
        });

        const customers = await response.json();

        const mobileNumbers = customers.data.map(customer => customer.cusMobileNo);
        const customerNames = customers.data.map(customer => customer.cusName);
        const customerIds = customers.data.map(customer => customer.cusId);
        const customerCreditStatus = customers.data.map(customer => customer.creditStatus);

        new Awesomplete(inputMobileElement, {
            list: mobileNumbers,
            minChars: 1,
            maxItems: 5,
            autoFirst: true
        });

        inputMobileElement.addEventListener("awesomplete-selectcomplete", function () {
            handleMobileNumberChange(mobileNumbers, customerNames, customerIds, customerCreditStatus);
        });

        inputMobileElement.addEventListener("input", function () {
            handleMobileNumberChange(mobileNumbers, customerNames, customerIds, customerCreditStatus);
        });




    } catch (error) {
        console.error("Error fetching customer data:", error);
    }
}


//function to input/select mobile number dynimicaly set customer popup inputs 
function handleMobileNumberChange(mobileNumbers, customerNames, customerIds, customerCreditStatus) {
    // console.log("hi");
    const enteredMobileNumber = inputMobileElement.value.trim();
    mobileInput.value = enteredMobileNumber;
    const index = mobileNumbers.indexOf(enteredMobileNumber);

    if (index !== -1) {

        customerName.value = customerNames[index];
        nameInput.value = customerNames[index];
        selectedCusId = customerIds[index];
        localStorage.setItem('selectedCusId', selectedCusId);
        selectedCusName = customerNames[index];
        selectCusCreditStatus = customerCreditStatus[index];
    } else {
        // console.log("elsee");
        customerName.value = "";
        nameInput.value = "";
        selectedCusId = "";
        selectedCusName = "";
        selectCusCreditStatus = "";
    }

    handlePayButtonValidation();
    checkCustomerInputs();
}

//function to check customer credit status
async function handleCustomerCreditStatus(baseUrl) {
    const mobileNumber = mobileInput.value;

    try {
        const response = await fetch(baseUrl + "/customer?contactNo=" + mobileNumber, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
        });
        const isCreditedCustomer = await response.json();
        console.log(isCreditedCustomer);
        if (isCreditedCustomer.data === false || inputMobileElement.value === "unKnown") {
            document.querySelector("#inputpaycreditOne").disabled = true;
        } else if (isCreditedCustomer.data === true) {
            document.querySelector("#inputpaycreditOne").disabled = false;
        }


    } catch (error) {
        console.error("Error fetching category data:", error);
    }
}


//function to select customer keypad event===========
inputMobileElement.addEventListener("click", function () {
    numbericKeypad.style.display = "block";
});

document.querySelector("#dinein-container").addEventListener('click', function (event) {
    if (!event.target.closest('.customer-mobile-input') && !event.target.closest('.numberic-keypad-mobile')) {
        numbericKeypad.style.display = "none";
    }
});

function handleSelectCustomerKeyboardEvent() {
    numberkeys.forEach((numberKey) => {
        numberKey.addEventListener("click", function () {
            insertAtCaret(inputMobileElement, numberKey.textContent);
        });
    });

    keyBackspace.addEventListener("click", () => {
        handleBackspace(inputMobileElement);
    });

    keyEnter.addEventListener("click", function () {
        if (inputMobileElement.value.trim() === "") {
            inputMobileElement.value = "unKnown";


            customerName.value = "unKnown";
            nameInput.value = "unKnown";
            selectedCusId = 1;
            selectedCusName = "unKnown";
            selectCusCreditStatus = "Disabled";
    
        } else {
            numbericKeypad.style.display = 'none';
        }
    });


    const inputEvent = new Event('input', {
        bubbles: true,
        cancelable: true,
    });
    inputMobileElement.dispatchEvent(inputEvent);
}


function insertAtCaret(inputElement, value) {
    const start = inputElement.selectionStart;
    const end = inputElement.selectionEnd;
    const text = inputElement.value;

    inputElement.value = text.slice(0, start) + value + text.slice(end);

    inputElement.selectionStart = inputElement.selectionEnd = start + value.length;


    const inputEvent = new Event('input', { bubbles: true, cancelable: true });
    inputElement.dispatchEvent(inputEvent);
}


function handleBackspace(inputElement) {
    const start = inputElement.selectionStart;
    const end = inputElement.selectionEnd;

    if (start !== end) {

        inputElement.value = inputElement.value.slice(0, start) + inputElement.value.slice(end);
        inputElement.selectionStart = inputElement.selectionEnd = start;
    } else if (start > 0) {

        inputElement.value = inputElement.value.slice(0, start - 1) + inputElement.value.slice(end);
        inputElement.selectionStart = inputElement.selectionEnd = start - 1;
    }


    const inputEvent = new Event('input', { bubbles: true, cancelable: true });
    inputElement.dispatchEvent(inputEvent);
}


//-------------------------------tables events-----------------------------------
//function to load all tables============
async function handleLoadAllTables(baseUrl) {
    checkInputTableValue();

    const check = document.querySelector("#checkbox-dinein-tables");
    check.checked = false;

    try {
        const response = await fetch(baseUrl + "/table", {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
        });
        const tables = await response.json();
        // console.log(tables);

        const tableInnerArea = document.querySelector(".cashier-dinein-table-inner-area-body");
        const check = document.querySelector("#checkbox-dinein-tables");
        let tableList = "";

        check.addEventListener("change", function () {
            const selectedTableType = this.checked ? "inDoor" : "outDoor";
            filterTables(selectedTableType);
        });

        function filterTables(tableType) {
            tableList = "";
            for (let i = 0; i < tables.data.length; i++) {
                if (tables.data[i].tableTYpe === tableType) {
                    if (tables.data[i].status === 'Occupied') {
                        tableList += `
                              <div class="dinein-table table-markasAvailable" data-name="${tables.data[i].status}" data-order-id="${tables.data[i].orderId}">
                                <div class="dinein-table-header" style="background-color:#F6C4AE;">
                                   <h5 id="tableId">${tables.data[i].tableId}</h5>
                                </div>
                                <div class="dinein-table-body">
                                    <img src="../images/tables/family1.jpg" style="height: 58px; width: 95%;" alt="">
                               </div>
                                <div class="dinein-table-footer">
                                    <p id="tableSize">${tables.data[i].tableSize}</p>
                               </div>
                               <div class="dinein-table-buttonarea table-markasAvailable-buttonArea">
                                    <button class='btnMarkAsAvailable' data-table-number="${tables.data[i].tableId}">Mark as Available</button>
                               </div>   
                           </div>
                       `;
                    } else if (tables.data[i].status === 'Pending') {
                        tableList += `
                        <div class="dinein-table pending-table" data-name="${tables.data[i].status}" data-table-number="${tables.data[i].tableId}" data-order-id="${tables.data[i].orderId}">
                            <div class="dinein-table-header" style="background-color:#F6C4AE;">
                               <h5 id="tableId">${tables.data[i].tableId}</h5>
                            </div>
                            <div class="dinein-table-body">
                                <img src="../images/tables/family1.jpg" style="height: 58px; width: 95%;" alt="">
                           </div>
                            <div class="dinein-table-footer">
                                <p id="tableSize">${tables.data[i].tableSize}</p>
                           </div>
                           <div class="dinein-table-buttonarea">
                                <button class='btnChangeTable'>Change Table</button>
                           </div>   
                       </div>
                   `;
                    } else if (tables.data[i].status === 'Available') {
                        tableList += `
                        <div class="dinein-table available-dinein-table" data-name="${tables.data[i].status}" data-table-number="${tables.data[i].tableId}" data-order-id="${tables.data[i].orderId}">
                            <div class="dinein-table-header" style="background-color:#5C6574;">
                                <h5 id="tableId" style="color:white">${tables.data[i].tableId}</h5>
                            </div>
                            <div class="dinein-table-body" style="height: 60%;">
                                <img src="../images/tables/family1.jpg" style="height: 70px; width: 95%;" alt="">
                            </div>
                            <div class="dinein-table-footer" style="border-bottom-left-radius: 12px; border-bottom-right-radius: 6px; height: 38%;">
                                <p id="tableSize">${tables.data[i].tableSize}</p>
                            </div>       
                        </div>
                    `;
                    }
                }
            }

            tableInnerArea.innerHTML = tableList;

            // Add event listeners to available tables
            document.querySelectorAll('.available-dinein-table').forEach(table => {
                table.addEventListener('click', function () {
                    const tableNumber = this.getAttribute('data-table-number');
                    setTableToOccupied(baseUrl, tableNumber);
                });
            });

            document.querySelectorAll('.btnMarkAsAvailable').forEach(button => {
                button.addEventListener('click', function (event) {
                    event.stopPropagation();
                    const tableNumber = this.getAttribute('data-table-number');
                    setTableToAvailable(baseUrl, tableNumber);
                });
            });

            document.querySelectorAll('.pending-table').forEach(table => {
                table.addEventListener('click', function () {
                    const tableNumber = this.getAttribute('data-table-number');
                    getPreviousOrderDetails(baseUrl, tableNumber);

                });
            });

            document.querySelectorAll('.btnChangeTable').forEach(button => {
                button.addEventListener('click', function (event) {
                    event.stopPropagation();
                    const tableCard = event.target.closest(".dinein-table");
                    const tableNumber = tableCard.querySelector("#tableId").textContent;

                    const orderId = tableCard.getAttribute("data-order-id");
                    console.log(orderId);
                     showChangeTablePopup(baseUrl, button, tableNumber, orderId);
                });
            });

            // Hide popup if clicking outside
            document.addEventListener("click", function (event) {
                const popup = document.querySelector('.changeTablePopup');
                if (popup && !popup.contains(event.target) && !event.target.classList.contains('btnChangeTable')) {
                    popup.style.display = 'none';
                }
            });

        }

        filterTables("outDoor");
    } catch (error) {
        console.error("Error loading tables:", error);
    }
}


function setTableToOccupied(baseUrl, tableNumber) {
    isFirstOrderedCartItem = true;
    fetchOrderId(baseUrl);
    orderItemsContainer.innerHTML = ""
    customerName.value = ""
    inputMobileElement.value = ""
    waiterListInput.value = ""
    groupIdInput.value = tableNumber
    selectedTableId = tableNumber
    mobileInput.value='';
    nameInput.value ='';
    fullTakeawayTotalElement.value='',
    fullDineinTotalElement.value=''
    checkCustomerInputs()

    // CalculateFullTotal()
    fetch(baseUrl + "/table?tblId=" + tableNumber, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("jwt")}`
        },
        //body: JSON.stringify()
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            //console.log('Employee updated successfully:', data);
            // alert("Employee updated successfully!");
            console.log(data);
            selectedTableNumber = data.data.tableNumber
            handleLoadAllTables(baseUrl);
            handlePayButtonValidation()

        })
        .catch(error => {
            console.error('Error updating employee:', error);
        });

}


function setTableToAvailable(baseUrl, tableNumber) {
    //  console.log("set Available");
    isFirstOrderedCartItem = true;
    fetchOrderId(baseUrl);
    orderItemsContainer.innerHTML = "";
    customerName.value = "";
    inputMobileElement.value = "";
    waiterListInput.value = "";
    fullTakeawayTotalElement.value = "0.00";
    fullDineinTotalElement.value = "0.00";
    mobileInput.value='';
    nameInput.value ='';
    checkCustomerInputs()
   

    fetch(baseUrl + "/table?tbId=" + tableNumber, {
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
            //  console.log('Table updated successfully:', data);
            groupIdInput.value = "";
            handleLoadAllTables(baseUrl);
            //  handlePayButtonValidation();
        })
        .catch(error => {
            console.error('Error updating table:', error);
        });
}



btnTableDropdown.addEventListener("click", function () {
    if (btnTableRotate) {
        btnTableDropdown.classList.remove("btnPopUpTable-rotate");
        tableAreaView.style.display = "none";
    } else {
        btnTableDropdown.classList.add("btnPopUpTable-rotate");
        tableAreaView.style.display = "block";
    }
    btnTableRotate = !btnTableRotate;
});


function checkInputTableValue() {
    if (!groupIdInput.value) {
        tableAreaView.style.display = 'block';
        btnTableDropdown.classList.add("btnPopUpTable-rotate");
    }
}


//function to load All waiters
async function loadAllWaiters(baseUrl) {
    try {
        const response = await fetch(baseUrl + "/user/getAllWaiters", {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const waiterList = await response.json();
        //console.log(waiterList);

        const waiterMap = new Map();
        waiterList.data.forEach(waiter => {
            waiterMap.set(waiter[1], waiter[0]);
        });
        //console.log(waiterMap);

        const datalist = document.getElementById("waiters_list");
        datalist.innerHTML = '';
        waiterMap.forEach((id, name) => {
            const option = document.createElement('option');
            option.value = name;
            datalist.appendChild(option);
        });


        document.querySelector(".waiterName").addEventListener('change', function () {
            selectedWaiterName = this.value;
            selectedWaiterId = waiterMap.get(selectedWaiterName);

            if (!selectedWaiterId) {
                Swal.fire({
                    title: "Oops...",
                    text: "Invalid waiter name. Please select a valid waiter from the list",
                    icon: "warning",
                    customClass: {
                        confirmButton: 'alert-orange-button',
                    }
                });
                document.querySelector(".waiterName").value = '';
                return;

            }

        });

    } catch (error) {
        console.error("Error fetching waiter data:", error);
    }
}






//function to load all categories============
async function handleLoadAllCategories(baseUrl, dishImagePath) {
    try {
        const response = await fetch(baseUrl + "/dish/categories", {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
        });
        const category = await response.json();
        // console.log(category.data);

        let categoryList = "";

        for (let i = 0; i < category.data.length; i++) {
            categoryList += `
            <div class="catergory-card">
            <h3 class="catergory-card-title">${category.data[i]}</h3>
            </div>
            `;
        }

        categoryCardListArea.innerHTML = categoryList;
        const categoryCardList = document.querySelectorAll(".catergory-card");
        handleSelectCategoryCardEvent(baseUrl, categoryCardList, dishImagePath);

    } catch (error) {
        console.error("Error fetching category data:", error);
    }
}

//funcgtion select CategoryCard Event=============
function handleSelectCategoryCardEvent(baseUrl, categoryCardList, dishImagePath) {
    let waiterListInputValue = waiterListInput.value;

    categoryCardList.forEach((categoryCard) => {
        categoryCard.addEventListener("click", function () {

            const inputsToCheck = [
                { element: groupIdInput, message: "Please select the Table" },
                { element: inputMobileElement, message: "Please select the Customer" },
                { element: waiterListInput, message: "Please select the Waiter" }
            ];

            for (const { element, message } of inputsToCheck) {
                if (element.value === '') {
                    Swal.fire({
                        title: "Oops...",
                        text: message,
                        icon: "warning",
                        customClass: {
                            confirmButton: 'alert-orange-button',
                        }
                    });
                    return;
                }
            }

            // Preserve the waiter input value before performing any other actions
            waiterListInputValue = waiterListInput.value;

            categoryCardListArea.style.display = "none";
            tableArea.style.display = "none";
            dishCardListArea.style.display = "flex";
            alphabetArea.style.display = "flex";

            const selectedCategoryCardName = categoryCard.querySelector(".catergory-card-title").innerText;
            handleLoadDishes(baseUrl, selectedCategoryCardName, dishImagePath);

        });
    });

    backTocategoryList.addEventListener("click", function () {
        categoryCardListArea.style.display = "flex";
        tableArea.style.display = "flex";
        dishCardListArea.style.display = "none";
        alphabetArea.style.display = "none";
    });

    waiterListInput.value = waiterListInputValue;
}



// function to load all dishes=============
async function handleLoadDishes(baseUrl, selectedCategoryCardName, dishImagePath) {
    try {
        const response = await fetch(baseUrl + "/dish?category=" + selectedCategoryCardName, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
        });
        const dishes = await response.json();

        let dishCardsList = "";

        for (let i = 0; i < dishes.data.length; i++) {
            const imageUrl = `${dishImagePath}/${dishes.data[i].image}?t=${new Date().getTime()}`;
            dishCardsList += `
                 <div class="dishcard" data-index="${i}" data-name="${dishes.data[i].dishName.toLowerCase()}" data-category="${dishes.data[i].dishCategory.toLowerCase()}"  data-acategory="${dishes.data[i].dishCategory.toLowerCase()}">
                     <div class="dishcard-image">
                         <img class="cashier-dishImg" src="${imageUrl}" width="180px" height="110px" style="margin-bottom: 3px; border-radius: 30px;" alt="">
                     </div>
                     <div class="dishcard-title">
                         <h3 class="dish-title">${dishes.data[i].dishName}</h3>
                     </div>
                 </div> 
                 
                 `;

            dishContentArea.innerHTML = dishCardsList;
        }
        const dishCards = document.querySelectorAll(".dishcard");
        handleSelectedDishPopup(baseUrl, dishes.data, dishCards);
        searchDishByLetter(dishCards)

    } catch (error) {
        console.error("Error fetching category data:", error);
    }
}

function handleSelectedDishPopup(baseUrl, dishes, dishCards) {
    dishCards.forEach((dishCard) => {
        dishCard.addEventListener("click", function () {
            const index = dishCard.getAttribute("data-index");
            handleDisplayPopup(baseUrl, dishes, index);

        });
    });

}


function handleDisplayPopup(baseUrl, dishes, index) {
    const clickedDish = dishes[index];
    //console.log(clickedDish);

    selectDishPopup.innerHTML = `
            <div class="dishesBox-head" data-id="${clickedDish.dishId}">
                <h4 class="dishesBox-title">${clickedDish.dishName}</h4>
                <img class="dishesBox-close-icon" src="../icons/close_icon.png" alt="">
            </div>
            <div class="dishesBox-body">
            <div class="dishesBox-body-left">
            <div class="qty-input-container">
                <button class="qty-input-btn" id="qty-input-btn-minus" disabled>-</button>
                <input class="qty-input" type="number" disabled>
                <button class="qty-input-btn" id="qty-input-btn-plus" disabled>+</button>
            </div>

            <div class="size-input-container" style="${clickedDish.dishSmallPrice === 0 ? 'pointer-events: none; opacity: 0.5;' : ''}">
                <button class="size-btn"><span><img class="size-btn-img" src="../icons/plusicon.png"
                            height="50px" alt=""></span>Small</button>
                <label class="size-input" for="">${clickedDish.dishSmallPrice === 0 ? "None" : clickedDish.dishSmallPrice.toFixed(2)}</label>
            </div>
            <div class="size-input-container" style="${clickedDish.dishMediumPrice === 0 ? 'pointer-events: none; opacity: 0.5;' : ''}">
                <button class="size-btn"><span><img class="size-btn-img" src="../icons/plusicon.png"
                            height="50px" alt=""></span>Medium</button>
                <label class="size-input" for="">${clickedDish.dishMediumPrice === 0 ? "None" : clickedDish.dishMediumPrice.toFixed(2)}</label>
            </div>

            <div class="size-input-container" style="${clickedDish.dishLargePrice === 0 ? 'pointer-events: none; opacity: 0.5;' : ''}">
                <button class="size-btn"><span><img class="size-btn-img" src="../icons/plusicon.png"
                            height="50px" alt=""></span>Large</button>
                <label class="size-input" for="">${clickedDish.dishLargePrice === 0 ? "None" : clickedDish.dishLargePrice.toFixed(2)}</label>
            </div>

            
            </div>
            <div class="dishesBox-body-right">
            <ul class="number-area">
                <li>
                    <button class="btn-number" disabled>1</button>
                </li>
                <li>
                    <button class="btn-number" disabled>2</button>
                </li>
                <li>
                    <button class="btn-number" disabled>3</button>
                </li>
                <li>
                    <button class="btn-number" disabled>4</button>
                </li>
                <li>
                    <button class="btn-number" disabled>5</button>
                </li>
                <li>
                    <button class="btn-number" disabled>6</button>
                </li>
                <li>
                    <button class="btn-number" disabled>7</button>
                </li>
                <li>
                    <button class="btn-number" disabled>8</button>
                </li>
                <li>
                    <button class="btn-number" disabled>9</button>
                </li>
                <li>
                    <button class="btn-number" disabled>0</button>
                </li>
                <li>
                <button class="btn-number btn-number-backspace" disabled>⌫</button>
                </li>
            </ul>
            </div>
            </div>
            <div class="dishesBox-footer">
                <button class="btn-addItem-takeaway" disabled>Take away</button>
                <button class="btn-addItem-dinein" disabled>Dine-in</button>
            </div>`;

    selectDishPopup.style.display = "block";

    //select dish card's popup close
    const selectDishPopupClose = document.querySelector(".dishesBox-close-icon");
    selectDishPopupClose.addEventListener('click', function () {
        selectDishPopup.style.display = "none";
    });

    const dishSizeBtnContainers = document.querySelectorAll(".size-input-container");
    const dishSizeBtns = document.querySelectorAll(".size-btn");
    const dishSizesPriceBtns = document.querySelectorAll(".size-btn");
    const dishSizeInput = document.querySelector(".qty-input");
    const btnDinein = document.querySelector(".btn-addItem-dinein");
    const btnTakeaway = document.querySelector(".btn-addItem-takeaway");
    const btnInputNumbers = document.querySelectorAll(".btn-number:not(.btn-number-backspace)");
    const btnBackspaceNumbers = document.querySelector(".btn-number-backspace");
    const btnPlus = document.querySelector("#qty-input-btn-plus");
    const btnMinus = document.querySelector("#qty-input-btn-minus");
    const dishCardTitle = document.querySelector(".dishesBox-title");
    const dishesBoxHead = document.querySelector('.dishesBox-head');
    const dishCardId = dishesBoxHead.getAttribute('data-id');


    dishSizeBtnContainers.forEach((dishSizeBtnContainer) => {
        dishSizeBtnContainer.addEventListener('click', function () {
            dishSizeBtnContainer.classList.remove('disabledDishSizeContainer');

            disableOtherDishSizeContaiers(dishSizeBtnContainer);
        })
    })

    function disableOtherDishSizeContaiers(selectDishSizeBtnContainer) {
        dishSizeBtnContainers.forEach((dishSizebuttonContainer) => {
            if (dishSizebuttonContainer !== selectDishSizeBtnContainer) {
                dishSizebuttonContainer.classList.add('disabledDishSizeContainer');
            }
        })
    }
    let plusClickListener, minusClickListener;
    let clickedSelectedDishQtyNumbers = "1";
    let cleared = false;
    
    dishSizeBtnContainers.forEach((sizeBtnContainer) => {
        const sizeBtnImg = sizeBtnContainer.querySelector(".size-btn-img");
        let isClicked = false;
    
        function attachNumberPadListeners() {
            btnInputNumbers.forEach((btnInputNumber) => {
                btnInputNumber.disabled = false;
                btnInputNumber.removeEventListener("click", handleNumberClick);
                btnInputNumber.addEventListener("click", handleNumberClick);
            });
            dishSizeInput.addEventListener("input", handleInput);
            dishSizeInput.addEventListener("blur", handleBlur);
            btnBackspaceNumbers.addEventListener("click", handleBackspace);
        }
    
        function handleNumberClick() {
            const clickedNumber = this.innerHTML;
            if (cleared) {
                clickedSelectedDishQtyNumbers = clickedNumber;
                cleared = false;
            } else {
                clickedSelectedDishQtyNumbers += clickedNumber;
            }
            dishSizeInput.value = clickedSelectedDishQtyNumbers;
        }
    
        function handleInput() {
            if (this.value === "") {
                cleared = true;
            }
        }
    
        function handleBlur() {
            if (this.value === "" || this.value === "0") {  
                dishSizeInput.value = "1";
                clickedSelectedDishQtyNumbers = "1";
                cleared = false;
            }
        }
    
        function handleBackspace() {
            clickedSelectedDishQtyNumbers = clickedSelectedDishQtyNumbers.slice(0, -1);
            dishSizeInput.value = clickedSelectedDishQtyNumbers;
    
            if (dishSizeInput.value === "" || dishSizeInput.value === "0") { 
                dishSizeInput.value = "1";
                clickedSelectedDishQtyNumbers = "1";
            }
        }
    
        function attachPlusMinusListeners() {
            btnPlus.removeEventListener('click', plusClickListener);
            btnMinus.removeEventListener('click', minusClickListener);
    
            plusClickListener = function () {
                const currentValue = parseInt(dishSizeInput.value);
                clickedSelectedDishQtyNumbers = (currentValue + 1).toString();
                dishSizeInput.value = clickedSelectedDishQtyNumbers;
            };
    
            minusClickListener = function () {
                const currentValue = parseInt(dishSizeInput.value);
                if (currentValue > 1) {
                    clickedSelectedDishQtyNumbers = (currentValue - 1).toString();
                    dishSizeInput.value = clickedSelectedDishQtyNumbers;
                }
            };
    
            btnPlus.addEventListener('click', plusClickListener);
            btnMinus.addEventListener('click', minusClickListener);
        }
    
        sizeBtnContainer.addEventListener("click", function () {
            isClicked = !isClicked;
    
            if (isClicked) {
                lastSelectedDishSize = sizeBtnContainer;
                btnPlus.disabled = false;
                btnMinus.disabled = false;
    
                sizeBtnContainer.style.border = "2px solid var(--text-field-success)";
                sizeBtnImg.src = "../icons/correct.png";
                sizeBtnImg.style.width = "40px";
                sizeBtnImg.style.height = "40px";
                btnDinein.disabled = false;
                btnTakeaway.disabled = false;
                dishSizeInput.disabled = false;
                btnBackspaceNumbers.disabled = false;
    
                dishSizeInput.value = "1";
                clickedSelectedDishQtyNumbers = "1";
                cleared = false;
    
                attachNumberPadListeners();
                attachPlusMinusListeners();
            } else {
                lastSelectedDishSize = null;
                sizeBtnContainer.style.border = "none";
                sizeBtnImg.src = "../icons/plusicon.png";
                sizeBtnImg.style.width = "50px";
                sizeBtnImg.style.height = "50px";
                dishSizeInput.value = "";
                dishSizeInput.disabled = true;
                btnPlus.disabled = true;
                btnMinus.disabled = true;
                btnBackspaceNumbers.disabled = true;
    
                btnInputNumbers.forEach((btnInputNumber) => {
                    btnInputNumber.disabled = true;
                });
    
                btnPlus.removeEventListener('click', plusClickListener);
                btnMinus.removeEventListener('click', minusClickListener);
    
                btnInputNumbers.forEach((btnInputNumber) => {
                    btnInputNumber.removeEventListener("click", handleNumberClick);
                });
    
                dishSizeInput.removeEventListener("input", handleInput);
                dishSizeInput.removeEventListener("blur", handleBlur);
                btnBackspaceNumbers.removeEventListener("click", handleBackspace);
    
                dishSizeBtnContainers.forEach((dishSizeBtnContainer) => {
                    dishSizeBtnContainer.classList.remove('disabledDishSizeContainer')
                });
            }
        });
    });
    

    




    //added cart to selected items
    btnDinein.addEventListener("click", function () {
        if (/^0+(\.0+)?$/.test(dishSizeInput.value)) {
            Swal.fire({
                title: "Invalid Quantity",
                text: "Dish quantity cannot be zero.",
                icon: "warning",
                customClass: {
                    confirmButton: 'alert-orange-button',
                }
            });
            return;  
        }
        if (lastSelectedDishSize) {

            addItemToOrderItems(baseUrl, "Dine-In");
        } else {
            Swal.fire({
                title: "Empty Select",
                text: "Please select a dish.",
                icon: "warning",
                customClass: {
                    confirmButton: 'alert-orange-button',
                }
            });
        }
    });

    btnTakeaway.addEventListener("click", function () {
        if (/^0+(\.0+)?$/.test(dishSizeInput.value)) {
            Swal.fire({
                title: "Invalid Quantity",
                text: "Dish quantity cannot be zero.",
                icon: "warning",
                customClass: {
                    confirmButton: 'alert-orange-button',
                }
            });
            return; 
        }
        if (lastSelectedDishSize) {
            addItemToOrderItems(baseUrl, "Take-Away");
        } else {
            Swal.fire({
                title: "Empty Select",
                text: "Please select a dish.",
                icon: "warning",
                customClass: {
                    confirmButton: 'alert-orange-button',
                }
            });
        }
    });



    //add selected dishes to cart
    function addItemToOrderItems(baseUrl, itemType) {
        if (!lastSelectedDishSize) {
            return;
        }
        if (waiterListInput.value === "") {
            Swal.fire({
                title: "Oops...",
                text: "Please select a waiter",
                icon: "warning",
                customClass: {
                    confirmButton: 'alert-orange-button',
                }
            });
            return;
        }


        const orderItemsContainer = document.querySelector(".cashier-dinein-right-inner-content-body-middle");
        const orderItemTitleName = dishCardTitle.innerText;
        const orderItemInputQty = dishSizeInput.value;
        const selectedSizeName = lastSelectedDishSize.querySelector('.size-btn').innerText;
        const selectedSizePrice = lastSelectedDishSize.querySelector('.size-input').innerText;
        const orderType = itemType;
        const total = orderItemInputQty * parseFloat(selectedSizePrice);
        const selectItemCards = document.querySelectorAll(".selectItemCard");
        let itemExists = false;

        for (let i = 0; i < selectItemCards.length; i++) {
            const selectItemCard = selectItemCards[i];
            const selectItemCardName = selectItemCard.querySelector(".selectItemName").innerText;
            const selectItemCardSize = selectItemCard.querySelector(".selectItemSize").innerText;
            const selectItemCardType = selectItemCard.querySelector(".selectItemType").innerText;
            const selectItemCardQty = selectItemCard.querySelector(".selectItemQty");

            if (selectItemCardName === orderItemTitleName && selectItemCardSize === selectedSizeName && selectItemCardType === orderType) {
                if (waiterListInput.value === "") {
                    Swal.fire({
                        title: "Oops...",
                        text: "Please select a waiter",
                        icon: "warning",
                        customClass: {
                            confirmButton: 'alert-orange-button',
                            popup: 'swal-custom-height'
                        }
                    });
                    return;
                }
                if (!previousDishWaitersList.includes(waiterListInput.value)) {
                    previousDishWaitersList.push(waiterListInput.value);
                }

                const priceElement = selectItemCard.querySelector(".selectItemPrice");
                const currentQty = parseInt(selectItemCardQty.innerText);
                const newQty = currentQty + parseInt(orderItemInputQty);
                const previousPrice = parseFloat(priceElement.innerText);
                const newPrice = previousPrice + total;

                selectItemCardQty.innerText = newQty;
                priceElement.innerText = newPrice;

                itemExists = true;
                selectDishPopup.style.display = "none";

                // Calculate the difference in quantity and price
                const qtyDifference = newQty - currentQty;
                const priceDifference = newPrice - previousPrice;

                // console.log(qtyDifference+" "+priceDifference);

                // Call saveOrderDetails here with the calculated differences
                saveOrderDetailsForUpdatedDish(baseUrl, "plus", qtyDifference, priceDifference, selectItemCard);
                // waiterListInput.value = ""
                break;
            }
        }

        if (!itemExists) {
            const selectOrderItemCards = document.createElement("div");
            selectOrderItemCards.classList.add("selectItemCard");
            selectOrderItemCards.innerHTML = `
                <div class="selectItemCard-left">
                    <div class="selectItemCard-head">
                        <h1 class="selectItemId" style="display:none">${dishCardId}</h1>
                        <h5 class="selectItemName">${orderItemTitleName}</h5>
                        <h5 class="selectItemSize">${selectedSizeName}</h5>
                    </div>
                    <div class="selectItemCard-bottom">
                        <h5 class="selectItemType">${itemType}</h5>
                        <div class="selectQtyWrapper">
                            <button class="btnSelectCardQty btnQtyMinus">-</button>
                            <div class="selectQtyCard">
                              <h5 class="selectItemQty">${orderItemInputQty}</h5>
                            </div>
                            <button class="btnSelectCardQty btnQtyPlus">+</button>
                        </div>
                    </div>
                </div>
                <div class="selectItemCard-right">
                    <h5 class="selectItemPrice">${total}</h5>
                </div>
            `;
            selectOrderItemCards.style.display = "flex";
            orderItemsContainer.appendChild(selectOrderItemCards);
            selectDishPopup.style.display = "none";
            //  waiterListInput.value = ""
            const btnQtyMinus = selectOrderItemCards.querySelector(".btnQtyMinus");
            const btnQtyPlus = selectOrderItemCards.querySelector(".btnQtyPlus");
            const selectItemQty = selectOrderItemCards.querySelector(".selectItemQty");
            const priceElement = selectOrderItemCards.querySelector(".selectItemPrice");
            const btnDishCardPopup = selectOrderItemCards.querySelector(".selectItemCard-right");
            const selectedItemName = selectOrderItemCards.querySelector(".selectItemName");
            const selectedDishId = selectOrderItemCards.querySelector(".selectItemId");
            const selectedDishSize = selectOrderItemCards.querySelector(".selectItemSize");
            const selectedDishType = selectOrderItemCards.querySelector(".selectItemType");

            if (isFirstOrderedCartItem && orderItemsContainer.children.length === 1) {
                //console.log("First add");
             
                saveDefaultOrder(baseUrl, selectOrderItemCards);
                isFirstOrderedCartItem = false;

            } else {
               
                saveDefaultOrderItems(baseUrl, "plus", false, selectOrderItemCards);
            }
           
            if (!previousDishWaitersList.includes(waiterListInput.value)) {
                previousDishWaitersList.push(waiterListInput.value);
            }

            qtyChangeEventHandler(baseUrl, btnQtyMinus, btnQtyPlus, selectItemQty, selectedSizePrice, priceElement, selectOrderItemCards);
            dishCardDetailsPopupEvent(baseUrl, btnDishCardPopup, selectedItemName, selectedDishId, selectedDishSize, selectItemQty, priceElement, selectOrderItemCards,selectedDishType);
            getWaitersForSelectDishCard(baseUrl, selectOrderItemCards);
        }

        handlePayButtonValidation();
        handleCalculateorderCartTotal();
        selectDishPopup.style.display = "none";
    }


}


//function to calcutate order cart totals
function handleCalculateorderCartTotal() {
    let fullTakeawayTotal = parseFloat(0.00);
    let fullDineinTotal = parseFloat(0.00);

    const selectedOrderItemsTotal = document.querySelectorAll(".selectItemPrice");
    const subTotal = document.querySelector(".subTotal");

    selectedOrderItemsTotal.forEach((selectedOrderItemTotal) => {
        const selectItemCard = selectedOrderItemTotal.closest(".selectItemCard");
        const selectItemCardType = selectItemCard.querySelector(".selectItemType").innerText;
        const value = parseFloat(selectedOrderItemTotal.innerText);

        if (selectItemCardType === "Take-Away") {
            fullTakeawayTotal += value;
        } else if (selectItemCardType === "Dine-In") {
            fullDineinTotal += value;
        }
    });

    fullTakeawayTotalElement.value = fullTakeawayTotal.toFixed(2);
    fullDineinTotalElement.value = fullDineinTotal.toFixed(2);

    subTotal.innerText = (fullTakeawayTotal + fullDineinTotal).toFixed(2);
}

//function to save order when dish added to the cart
async function saveDefaultOrder(baseUrl, selectOrderItemCards) {


    // // console.log(selectCusCreditStatus);
    // if (selectCusCreditStatus === "Disabled") {
    //     creditInput.disabled = true
    // } else if (selectCusCreditStatus === "Enabled") {
    //     creditInput.disabled = false
    // }

    const defaultCustomer = {
        cusId: selectedCusId,
        cusMobileNo: selectCusContact,
        cusName: selectedCusName,
        cusStatus: 1
    }

    const orderId = orderIdElement.value
    const dateAndTime = getCurrentDateTime();

    try {
        fetch(baseUrl + "/dineIn/Order/saveDineIn", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("jwt")}`
            },
            body: JSON.stringify({
                orderId: orderId,
                orderDateAndTime: dateAndTime,
                tabNo: selectedTableNumber,
                netTotal: "",
                orderStatus: "Pending",
                tableId: selectedTableId,
                cashierName: localStorage.getItem("userName"),
                userId: localStorage.getItem("userId"),
                tblcustomer: defaultCustomer,

            }),
        })

            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // console.log(data)
                handleLoadAllTables(baseUrl);
                saveDefaultOrderItems(baseUrl, "plus", false, selectOrderItemCards)

            })
    } catch (error) {
        console.log("Error " + error);
    }
}


//function to save order details when dish added to the cart and click +,- buttons in the item card
function saveDefaultOrderItems(baseUrl, format, status, selectItemCard) {
    const orderId = orderIdElement.value;

    const orderDetails = {
        odId: orderId,
        customerWiseOrderDetailsDTOS: []
    };


    const dishId = selectItemCard.querySelector(".selectItemId").innerText;
    const dishName = selectItemCard.querySelector(".selectItemName").innerText;
    const dishSize = selectItemCard.querySelector(".selectItemSize").innerText;
    const orderPrice = parseFloat(selectItemCard.querySelector(".selectItemPrice").innerText);
    const orderQty = status ? parseInt(1) : parseInt(selectItemCard.querySelector(".selectItemQty").innerText);
    const unitPrice = status ? parseFloat(selectItemCard.querySelector(".selectItemPrice").innerText) / parseInt(selectItemCard.querySelector(".selectItemQty").innerText) : orderPrice / orderQty;
    const orderType = selectItemCard.querySelector(".selectItemType").innerText;

    orderDetails.dishId = dishId;
    orderDetails.dishName = dishName;
    orderDetails.dishSize = dishSize;
    orderDetails.orderPrice = orderPrice;
    orderDetails.orderType = orderType;
    orderDetails.orderQty = orderQty;
    orderDetails.unitPrice = unitPrice;


    // Push waiter details after the loop
    orderDetails.customerWiseOrderDetailsDTOS.push({
        waiterId: selectedWaiterId,
        waiterName: selectedWaiterName,
        orderType: orderDetails.orderType
    });

    try {
        fetch(`${baseUrl}/orders/details/addDineIn/${format}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("jwt")}`
            },
            body: JSON.stringify(orderDetails)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                //console.log("Order details sent successfully:", data);
                // console.log(orderDetails);
            })
            .catch(error => {
                console.error("Error:", error);
            });
    } catch (error) {
        console.log("Error " + error);
    }
}


// Function to handle quantity changes (increase and decrease)
function qtyChangeEventHandler(baseUrl, btnQtyMinus, btnQtyPlus, selectItemQty, pricePerItem, priceElement, selectOrderItemCards) {
   // console.log(selectOrderItemCards);
    previouslySelectedCard = selectOrderItemCards;
    currentlySelectedCard = selectOrderItemCards;

    btnQtyMinus.addEventListener("click", function () {
        let currentQty = parseInt(selectItemQty.innerText);

        if (waiterListInput.value === "") {
            Swal.fire({
                title: "Oops...",
                text: "Please select an item and choose a valid waiter!",
                icon: "warning",
                customClass: {
                    confirmButton: 'alert-orange-button',
                }
            });
            return;
        }
        console.log(previousDishWaitersList);

        if (!previousDishWaitersList.includes(waiterListInput.value)) {
            console.log(previousDishWaitersList);

            Swal.fire({
                title: "Oops...",
                text: "Please select an item and choose a valid waiter!",
                icon: "warning",
                customClass: {
                    confirmButton: 'alert-orange-button',
                }
            });
            selectOrderItemCards.style.border = "";
            return;
        }

        // Handle quantity decrease
        if (currentQty > 1) {
            currentQty -= 1;
            selectItemQty.innerText = currentQty;
            const newPrice = currentQty * pricePerItem;
            priceElement.innerText = newPrice;
            selectOrderItemCards.style.border = "";
            previousDishCardSelectEvent(baseUrl, selectOrderItemCards)
            handleCalculateorderCartTotal();
            saveDefaultOrderItems(baseUrl, "mines", true, selectOrderItemCards);
            handleEnabledSelectedOrderItemsCard()
        } else {
            if (orderItemsContainer.children.length === 1) {
                deleteSelectedOrder(baseUrl, selectOrderItemCards);
                handleEnabledSelectedOrderItemsCard()
            } else {
                previousDishCardSelectEvent(baseUrl, selectOrderItemCards)
                saveDefaultOrderItems(baseUrl, "mines", true, selectOrderItemCards);
                selectOrderItemCards.remove();
                handleCalculateorderCartTotal();
                handlePayButtonValidation();
                handleEnabledSelectedOrderItemsCard()
            }
        }

        // Reset previously selected card
        if (previouslySelectedCard) {
            previouslySelectedCard = null;
            waiterListInput.value = "";
        }

        if (currentlySelectedCard) {
            currentlySelectedCard = null;
            waiterListInput.value = "";
        }

        loadAllWaiters(baseUrl);
    });
    btnQtyPlus.addEventListener("click", function () {
        const waiterValue = waiterListInput.value;
        console.log("Selected Waiter:", waiterValue);

        if (waiterValue === "") {
            Swal.fire({
                title: "Oops...",
                text: "Please select a waiter",
                icon: "warning",
                customClass: {
                    confirmButton: 'alert-orange-button',
                }
            });
            return;
        }

        // Handle quantity increase
        let currentQty = parseInt(selectItemQty.innerText);
        currentQty += 1;
        selectItemQty.innerText = currentQty;
        const newPrice = currentQty * pricePerItem;
        priceElement.innerText = newPrice;
        saveDefaultOrderItems(baseUrl, "plus", true, selectOrderItemCards);
        handleCalculateorderCartTotal();

        // Update the previousDishWaitersList with the current waiter
        if (!previousDishWaitersList.includes(waiterValue)) {
            previousDishWaitersList.push(waiterValue);
            console.log("Updated Waiters List:", previousDishWaitersList);
        }
    });

}



// Save order details by updating the selected dish card via dish
function saveOrderDetailsForUpdatedDish(baseUrl, format, qtyDifference, priceDifference, selectItemCard) {
    const orderId = orderIdElement.value;

    // Ensure qtyDifference is not zero to avoid invalid calculations
    if (qtyDifference === 0) {
        console.error("Quantity difference cannot be zero.");
        return;
    }

    const orderDetails = {
        odId: orderId,
        customerWiseOrderDetailsDTOS: []
    };

    const dishId = selectItemCard.querySelector(".selectItemId").innerText;
    const dishName = selectItemCard.querySelector(".selectItemName").innerText;
    const dishSize = selectItemCard.querySelector(".selectItemSize").innerText;
    const orderPrice = parseFloat(selectItemCard.querySelector(".selectItemPrice").innerText);
    const orderQty = qtyDifference;  // Use qtyDifference as updated quantity
    const unitPrice = priceDifference / qtyDifference;  // Calculate unit price based on difference
    const orderType = selectItemCard.querySelector(".selectItemType").innerText;

    // Populate order details
    orderDetails.dishId = dishId;
    orderDetails.dishName = dishName;
    orderDetails.dishSize = dishSize;
    orderDetails.orderPrice = orderPrice;
    orderDetails.orderType = orderType;
    orderDetails.orderQty = orderQty;
    orderDetails.unitPrice = unitPrice;

    // Add waiter details
    orderDetails.customerWiseOrderDetailsDTOS.push({
        waiterId: selectedWaiterId,
        waiterName: selectedWaiterName,
        orderType: orderDetails.orderType
    });

    // Send updated order details to the backend
    try {
        fetch(`${baseUrl}/orders/details/addDineIn/${format}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("jwt")}`
            },
            body: JSON.stringify(orderDetails)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // console.log("Order details sent successfully:", data);
            })
            .catch(error => {
                console.error("Error sending order details:", error);
            });
    } catch (error) {
        console.error("Error processing request:", error);
    }
}



// Function to handle waiter list update
function getWaitersForSelectDishCard(baseUrl, selectOrderItemCards) {
    const cardsArray = Array.isArray(selectOrderItemCards) || selectOrderItemCards instanceof NodeList || selectOrderItemCards instanceof HTMLCollection
        ? Array.from(selectOrderItemCards)
        : [selectOrderItemCards];

    cardsArray.forEach(card => {
        card.addEventListener("click", async function (event) {
            console.log("Hi");

            if (event.target.classList.contains("btnQtyMinus") || event.target.classList.contains("btnQtyPlus")) {
                return;
            }

            if (currentlySelectedCard) {
                currentlySelectedCard.style.border = "";
                handleEnabledSelectedOrderItemsCard();
            }

            currentlySelectedCard = card;
            card.style.border = "2px solid orange";
            waiterListInput.value = "";

            handleDisabledSelectedOrderItemsCard(selectOrderItemCards); 

            const orderId = document.getElementById("dinein_orderId").value;
            const selectedDishId = card.querySelector(".selectItemId").innerText;
            const selectedDishSize = card.querySelector(".selectItemSize").innerText;
            const selectedDishType = card.querySelector(".selectItemType").innerText;

            console.log(selectedDishType);
            

           // console.log(orderId + " " + selectedDishId + " " + selectedDishSize);

            try {
                const response = await fetch(`${baseUrl}/CustomerWiseOrderDetails?orderId=${orderId}&dishId=${selectedDishId}&dishSize=${selectedDishSize}&orderType=${selectedDishType}`, {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                    },
                });
                const dishDetails = await response.json();
                console.log("Dish Details:", dishDetails);

                if (Array.isArray(dishDetails.data)) {
                    const uniqueWaitersSet = new Set(dishDetails.data.map(detail => detail.waiterName));
                    const uniqueWaitersList = [...uniqueWaitersSet];
                    console.log("Unique Waiters List:", uniqueWaitersList); 

                    const waitersDatalist = document.getElementById("waiters_list");
                    waitersDatalist.innerHTML = "";
                    uniqueWaitersList.forEach(waiter => {
                        const option = document.createElement("option");
                        option.value = waiter;
                        waitersDatalist.appendChild(option);
                    });
                } else {
                    console.warn("Waiters list data is missing or not an array", dishDetails.data);
                }
            } catch (error) {
                console.error("Error:", error);
            }
        });
    });


    document.querySelector("#dinein-container").addEventListener("click", (event) => {

        if (!event.target.closest(".selectItemCard") && !event.target.closest(".waiterName")) {
            if (currentlySelectedCard) {
                currentlySelectedCard.style.border = "";
                currentlySelectedCard = null;
                waiterListInput.value = "";
                handleEnabledSelectedOrderItemsCard(); 
            }
            loadAllWaiters(baseUrl);
        }
    });

}


// Function to delete the selected order when clicking "-" or popup's delete image
function deleteSelectedOrder(baseUrl, selectOrderItemCards) {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#EA6D27",
        cancelButtonColor: "#101A24",
        confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
              
                const response = await fetch(`${baseUrl}/orders?orderId=${orderIdElement.value}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem("jwt")}`
                    },
                });

           
                const data = await response.json();

              
                if (data.message === "success") {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Order has been deleted.",
                        icon: "success",
                        confirmButtonColor: "#EA6D27"
                    });

                
                    selectOrderItemCards.remove();
                    handleCalculateorderCartTotal();
                    getWaitersForSelectDishCard(baseUrl, selectOrderItemCards);
                    handlePayButtonValidation();
                    fetchOrderId(baseUrl);
                    handleLoadAllTables(baseUrl);

                    groupIdInput.value = "";
                    inputMobileElement.value = "";
                    customerName.value = "";
                    waiterListInput.value = "";
                    tableArea.style.display = 'flex';
                    categoryCardListArea.style.display = 'flex';
                    dishCardListArea.style.display = 'none';
                    alphabetArea.style.display = 'none';
                    
                } else {
                    throw new Error("Order deletion failed");
                }
            } catch (error) {
                Swal.fire({
                    title: "Error!",
                    text: "There was a problem deleting the order.",
                    icon: "error"
                });
            }
        }
    });

    return;
}


//========selected order pay and confirm process=================

//function to pay button validation
function handlePayButtonValidation() {
    const hasItems = orderItemsContainer.children.length > 0;
    const isMobileEmpty = inputMobileElement.value.trim() === "";
    const isNameEmpty = customerName.value.trim() === "";
    btnPay.disabled = !hasItems || isMobileEmpty || isNameEmpty
}


// function to btnPay click event handler
let currentlyFocusedInput = null;
let eventListenersAdded = false;
btnPay.addEventListener('click',async function () {
    const baseUrl = await window.api.getBaseUrl();
    creditStatusHandle(baseUrl);

    const subTotalValue = document.querySelector(".subTotal").innerText;
    const orderId = document.querySelector("#dinein_orderId").value;
    const tableId = document.querySelector(".dinein-table-id").value;
    btnPayClickHandler(subTotalValue, orderId, tableId);


});


function btnPayClickHandler(subTotalValue, orderId, tableId) {
    // console.log("click");
    document.querySelector('#inputpaycashOne').value = "0.00";
    document.querySelector('#inputpaycardOne').value = "0.00";
    document.querySelector('#inputpaycreditOne').value = "0.00";

    orderConfrimPanel.style.display = "flex";
    container.classList.add("container-disabled");
    document.querySelector("#confirmOrderId").innerText = orderId;
    document.querySelector("#confirmTableId").innerText = tableId;


    const newSubTotal = subTotalValue;
    orderNetTotal.innerText = newSubTotal;
    orderBalance.innerText = newSubTotal;
    orderDiscount.addEventListener("input", function (event) {
        const discount = orderDiscount.value;
        var calcNetTotal = (newSubTotal - ((newSubTotal * discount) / 100));
        orderNetTotal.innerText = calcNetTotal.toFixed(2);
        orderBalance.innerText = orderNetTotal.innerText;
    });
    paymentType("One");
}


function paymentType(tabNumber) {
    const inputPayCash = document.querySelector(`#inputpaycash${tabNumber}`);
    const inputPayCard = document.querySelector(`#inputpaycard${tabNumber}`);
    const inputPayCredit = document.querySelector(`#inputpaycredit${tabNumber}`);
    const orderNetTotal = document.querySelector(`#netTotal${tabNumber}`);
    const orderBalance = document.querySelector(`.orderBalance${tabNumber}`);

    function clearInput(inputElement) {
        let isClearedOnce = false;
        inputElement.addEventListener("focus", function () {
            inputElement.style.color = "#EA6D27";
            if (parseFloat(orderBalance.innerText) > 0) {
                if (inputElement.value.trim() === "0.00") {
                    inputElement.value = parseFloat(orderBalance.innerText).toFixed(2);
                    updateBalance();
                } else {
                    inputElement.value = (parseFloat(inputElement.value) + parseFloat(orderBalance.innerText)).toFixed(2);
                    updateBalance();
                }
                currentlyFocusedInput = inputElement;
            }
        });

        inputElement.addEventListener("blur", function () {
            inputElement.style.color = "";
            if (inputElement.value.trim() === "") {
                inputElement.value = "0.00";
                updateBalance();
                isClearedOnce = false;
            } else {
                inputElement.value = parseFloat(inputElement.value).toFixed(2);
            }
        });

        inputElement.addEventListener("click", function () {
            if (inputElement.value.trim() === "0.00") {
                inputElement.value = "";
            }
            currentlyFocusedInput = inputElement;
        });

        inputElement.addEventListener("input", function (event) {
            if (!isClearedOnce) {
                inputElement.style.color = "";
                inputElement.value = event.data;
                console.log(event.data);

                isClearedOnce = true;
            }
        });
    }

    function handleKeyPress() {
        inputPayCash.addEventListener("input", function () {
            updateBalance();
        });

        inputPayCard.addEventListener("input", function () {
            updateBalance();
        });

        inputPayCredit.addEventListener("input", function () {
            updateBalance();
        });
    }

    function updateBalance() {
        let cashValue = parseFloat(inputPayCash.value.trim()) || 0;
        let cardValue = parseFloat(inputPayCard.value.trim()) || 0;
        let creditValue = parseFloat(inputPayCredit.value.trim()) || 0;

        const netTotal = parseFloat(orderNetTotal.innerText) || 0;
        const newBalance = netTotal - (cashValue + cardValue + creditValue);
        orderBalance.innerText = newBalance.toFixed(2);

        let hasWarning = false;

        if (netTotal < (cardValue + creditValue)) {
            paymentWarning.innerText = "Card and Credit payments exceed Net Total!";
            paymentWarning.style.display = 'block';
            hasWarning = true;
        } else if (cashValue < netTotal - (cardValue + creditValue)) {
            paymentWarning.innerText = "Cash received is less than the remaining balance.";
            paymentWarning.style.display = 'block';
            hasWarning = true;
        } else {
            paymentWarning.innerText = "";
            paymentWarning.style.display = 'none';
        }

        btnConfrim.disabled = newBalance > 0 || hasWarning;
    }

    clearInput(inputPayCash);
    clearInput(inputPayCard);
    clearInput(inputPayCredit);

    if (!eventListenersAdded) {
        handleKeyPress();
        payOrderKeyboardEvent();
        eventListenersAdded = true; 
    }
}

//=====payOrder keyboard input event==============
function payOrderKeyboardEvent() {
    const keypadButtons = document.querySelectorAll('#keyboard-order .letter-order');

    keypadButtons.forEach((button) => {
        button.addEventListener("click", handleButtonClick);
    });

    function handleButtonClick(event) {
        const buttonValue = event.target.textContent.trim();

        if (currentlyFocusedInput) {
            let currentValue = currentlyFocusedInput.value;

            if (buttonValue === '←') {

                currentlyFocusedInput.value = currentValue.slice(0, -1) || '0';
            } else if (buttonValue === '.') {

                if (!currentValue.includes('.')) {
                    currentlyFocusedInput.value = currentValue === '' ? '0.' : currentValue + '.';
                }
            } else if (buttonValue === 'Enter') {

            } else {

                if (currentValue === '0.00' || currentValue === '') {
                    currentlyFocusedInput.value = buttonValue;
                } else {
                    currentlyFocusedInput.value += buttonValue;
                }
            }


            const inputEvent = new Event('input', {
                bubbles: true,
                cancelable: true
            });

            Object.defineProperty(inputEvent, 'data', {
                value: buttonValue,
                configurable: true,
            });

            currentlyFocusedInput.dispatchEvent(inputEvent);
        }
    }
}



orderConfrimPanelClose.addEventListener("click", function () {
    orderConfrimPanel.style.display = "none"
    container.classList.remove("container-disabled");
})



//========confrim order event================
btnConfrim.addEventListener("click", async function () {
    btnConfrim.disabled = true; 

    try {
        const baseUrl = await window.api.getBaseUrl();

        checkInputTableValue(); 

        const orderConfirmationStatus = await ConfirmOrder(); 
        if (!orderConfirmationStatus) {
            throw new Error('Order confirmation failed.');
        }

        Swal.fire({
            title: "Payment Successfully!",
            text: "Order has been successfully placed. Thank you!",
            icon: "success",
            confirmButtonColor: "#EA6D27",
            confirmButtonText: "OK"
        }).then(async (result) => {
            if (result.isConfirmed) {
                btnConfrim.disabled = true; 
                
                await downloadAndShowPdf(baseUrl); 
                
                document.getElementById("confirm-order-panel-dinein").reset();
                location.reload();
                
                btnConfrim.disabled = false;
            }else{
                btnConfrim.disabled = true; 
                
                await downloadAndShowPdf(baseUrl); 
                
                document.getElementById("confirm-order-panel-dinein").reset();
                location.reload();
                
                btnConfrim.disabled = false;
            }
        });

    } catch (error) {
        Swal.fire({
            title: "Error",
            text: `There was an issue placing the order. Error: ${error.message}`,
            icon: "error",
            confirmButtonColor: "#EA6D27",
            confirmButtonText: "OK"
        });
        btnConfrim.disabled = false; 
    }
});



async function ConfirmOrder() {
    try {
        const baseUrl = await window.api.getBaseUrl();
      
        
        const customerObj = {
            cusId: selectedCusId,
            cusMobileNo: selectCusContact,
            cusName: selectedCusName,
            cusStatus: 1
        };
        //console.log(customerObj);
        const orderId = orderIdElement.value;
        const netTotal = parseFloat(orderNetTotal.innerText);

        const response = await fetch(baseUrl + "/dineIn/Order/updateDineIn", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("jwt")}`
            },
            body: JSON.stringify({
                orderId: orderId,
                orderDateAndTime: new Date().toISOString(),
                tabNo: selectedTableNumber,
                netTotal: netTotal,
                orderStatus: "close",
                tableId: groupIdInput.value,
                cashierName: localStorage.getItem("userName"),
                userId: localStorage.getItem("userId"),
                tblcustomer: customerObj,
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to update the order');
        }

        const data = await response.json();
        selectedTableId = data.tableId;
        selectedTableNumber = data.tabNo;

        const paymentConfirmation = await confirmPayment(baseUrl, orderId);
        if (!paymentConfirmation) {
            throw new Error('Payment failed.');
        }

        return true;

    } catch (error) {
        console.error("Error in ConfirmOrder: ", error);
        return false;
    }
}


async function confirmPayment(baseUrl, orderId) {
    const selectedCusId = localStorage.getItem('selectedCusId');
    console.log(selectedCusId);
    
    if (!selectedCusId) {
        console.error("selectedCusId is undefined or null. Please select a customer.");
        return false;
    }
    
    function getCurrentDate() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const date = getCurrentDate();
    const cashierName = localStorage.getItem("userName");
    const cash = document.getElementById("inputpaycashOne").value;
    const card = document.getElementById("inputpaycardOne").value;
    const credit = document.getElementById("inputpaycreditOne").value;
    const balance = document.getElementById("order_balance").textContent;
    const amount = parseFloat(parseFloat(card) + parseFloat(credit) + parseFloat(cash));
    const total = document.getElementById("netTotalOne").textContent;

    try {
        const response = await fetch(baseUrl + "/payment/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("jwt")}`
            },
            body: JSON.stringify({
                paymentId: "",
                paymentType: "Cash",
                paymentDate: date,
                paymentStatus: "Paid",
                paymentTotal: parseFloat(total),
                paidAmount: amount,
                balance: balance,
                orderId: orderId,
                cardPayment: card,
                cashPayment: cash,
                creditPayment: credit,
                cashierName: cashierName,
                userId: localStorage.getItem("userId"),
                creditCustomerDTOS: [
                    {
                        customerId: selectedCusId,
                        totalCreditAmount: credit,
                        settledCreditAmount: 0,
                        dueCreditAmount: 0,
                        lastPaymentDateTime: "",
                        creditCustomerStatus: "Active"
                    }
                ]
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to process the payment');
        }

        const data = await response.json();
        console.log("Payment Success", data);

        return true;

    } catch (error) {
        console.error("Error in confirmPayment: ", error);
        return false;
    }
}




//download and print PDF
function downloadAndShowPdf(baseUrl) {
    return fetch(baseUrl + "/payment/export?format=pdf", { // Add return here
        method: 'GET',
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        }
    })
        .then(response => {
            if (response.ok) {
                return response.blob();
            } else {
                throw new Error('Failed to fetch PDF');
            }
        })
        .then(blob => {
            const pdfUrl = URL.createObjectURL(blob);
            const popupWindow = window.open('', '_blank', 'width=800,height=600');
            if (popupWindow) {
                popupWindow.document.write(`
                <html>
                    <head><title>PDF Report</title></head>
                    <body style="margin:0;">
                        <iframe src="${pdfUrl}" style="width:100%;height:100%;" frameborder="0"></iframe>
                    </body>
                </html>
            `);
            } else {
                console.error('Failed to open popup window. Please check if popups are blocked.');
            }

            if (popupWindow) {
                popupWindow.onload = () => URL.revokeObjectURL(pdfUrl);
            }
            document.getElementById("confirm-order-panel-dinein").reset();
            location.reload();
        })
        .catch(error => {
            console.error('Error fetching and displaying PDF:', error);
        });
}



// Function to get previous order details and populate the order items container
function getPreviousOrderDetails(baseUrl, tableNo) {
    orderItemsContainer.innerHTML = ""; // Clear existing items
    groupIdInput.value = tableNo;

    try {
        fetch(`${baseUrl}/table?table_id=${tableNo}`, {
            method: 'GET',
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
               console.log(data);

          
                const tableData = data.data[0];
                if (tableData) {
                    inputMobileElement.value = tableData[11] || "";
                    customerName.value = tableData[12] || "";
                    mobileInput.value = tableData[11] || "";
                    nameInput.value = tableData[12] || "";
                    orderIdElement.value = tableData[5] || "";

                    const orderItems = data.data;

                    orderItems.forEach(item => {
                       
                        const existingItem = Array.from(orderItemsContainer.children).find(child => {
                            return child.querySelector(".selectItemId").innerText === item[1];
                        });

               
                        if (!existingItem) {
                            const selectOrderItemCards = document.createElement("div");
                            selectOrderItemCards.classList.add("selectItemCard");
                            selectOrderItemCards.innerHTML = `
                            <div class="selectItemCard-left">
                                <div class="selectItemCard-head">
                                    <h1 class="selectItemId" style="display:none">${item[2]}</h1>
                                    <h5 class="selectItemName">${item[3]}</h5>
                                    <h5 class="selectItemSize">${item[4]}</h5>
                                </div>
                                <div class="selectItemCard-bottom">
                                    <h5 class="selectItemType">${item[8]}</h5>
                                    <div class="selectQtyWrapper">
                                        <button class="btnSelectCardQty btnQtyMinus">-</button>
                                        <div class="selectQtyCard">
                                            <h5 class="selectItemQty">${item[7]}</h5>
                                        </div>
                                        <button class="btnSelectCardQty btnQtyPlus">+</button>
                                    </div>
                                </div>
                            </div>
                            <div class="selectItemCard-right">
                                <h5 class="selectItemPrice">${item[6]}</h5>
                            </div>
                        `;

                            orderItemsContainer.appendChild(selectOrderItemCards);

                            const btnQtyMinus = selectOrderItemCards.querySelector(".btnQtyMinus");
                            const btnQtyPlus = selectOrderItemCards.querySelector(".btnQtyPlus");
                            const selectItemQty = selectOrderItemCards.querySelector(".selectItemQty");
                            const priceElement = selectOrderItemCards.querySelector(".selectItemPrice");
                            const btnDishCardPopup = selectOrderItemCards.querySelector(".selectItemCard-right");
                            const selectedItemName = selectOrderItemCards.querySelector(".selectItemName");
                            const selectedDishId = selectOrderItemCards.querySelector(".selectItemId");
                            const selectedDishSize = selectOrderItemCards.querySelector(".selectItemSize");
                            const selectedDishType = selectOrderItemCards.querySelector(".selectItemType");

                            qtyChangeEventHandler(baseUrl, btnQtyMinus, btnQtyPlus, selectItemQty, item[9], priceElement, selectOrderItemCards);
                            dishCardDetailsPopupEvent(baseUrl, btnDishCardPopup, selectedItemName, selectedDishId, selectedDishSize, selectItemQty, priceElement, selectOrderItemCards,selectedDishType);
                         
                            previousDishCardSelectEvent(baseUrl, selectOrderItemCards);
                        }
                    });

              
                    handlePayButtonValidation();
                    checkCustomerInputs();
                    handleCalculateorderCartTotal();
                } else {
                    console.warn("Table data missing or invalid format.");
                }
            })
            .catch(error => {
                console.error("Error:", error);
            });
    } catch (error) {
        console.log("Error " + error);
    }
}



// Function to select previous order details card
async function previousDishCardSelectEvent(baseUrl, selectOrderItemCards) {
    try {

        selectOrderItemCards.addEventListener("click", async function (event) {

            if (event.target.classList.contains("btnQtyMinus") || event.target.classList.contains("btnQtyPlus")) {
                return;
            }

            if (previouslySelectedCard) {
                previouslySelectedCard.style.border = "";
                handleEnabledSelectedOrderItemsCard();
            }

            previouslySelectedCard = selectOrderItemCards;
            selectOrderItemCards.style.border = "2px solid orange";
            waiterListInput.value = "";

            handleDisabledSelectedOrderItemsCard(selectOrderItemCards); 

            const orderId = document.getElementById("dinein_orderId").value;
            const selectedDishId = selectOrderItemCards.querySelector(".selectItemId").innerText;
            const selectedDishSize = selectOrderItemCards.querySelector(".selectItemSize").innerText;
            const selectedDishType = selectOrderItemCards.querySelector(".selectItemType").innerText;

           //console.log(`OrderId: ${orderId}, DishId: ${selectedDishId}, DishSize: ${selectedDishSize}`);

            try {
           
                const response = await fetch(`${baseUrl}/CustomerWiseOrderDetails?orderId=${orderId}&dishId=${selectedDishId}&dishSize=${selectedDishSize}&orderType=${selectedDishType}`, {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                    },
                });

                const dishDetails = await response.json();
             //   console.log(dishDetails);
                

                if (Array.isArray(dishDetails.data)) {
                    
                    previousDishWaitersList = [];

                    const uniqueWaitersSet = new Set(dishDetails.data.map(detail => detail.waiterName));
                    const uniqueWaitersList = [...uniqueWaitersSet];

                   
                    uniqueWaitersList.forEach(waiter => {
                        if (!previousDishWaitersList.includes(waiter)) {
                            previousDishWaitersList.push(waiter);
                        }
                    });

                    const waitersDatalist = document.getElementById("waiters_list");
                    waitersDatalist.innerHTML = ""; 

                    previousDishWaitersList.forEach(waiter => {
                        const option = document.createElement("option");
                        option.value = waiter;
                        waitersDatalist.appendChild(option);
                    });

                } else {
                    console.warn("Waiters list data is missing or not an array", dishDetails.data);
                }

            } catch (error) {
                console.error("Error fetching dish details:", error);
            }
        });


        document.querySelector("#dinein-container").addEventListener("click", (event) => {
            if (!event.target.closest(".selectItemCard") && !event.target.closest(".waiterName")) {
                if (previouslySelectedCard) {
                    previouslySelectedCard.style.border = "";
                    previouslySelectedCard = null;
                    waiterListInput.value = "";
                    handleEnabledSelectedOrderItemsCard(); 
                }
                loadAllWaiters(baseUrl); 
            }
        });

    } catch (error) {
        console.error("Error in previousDishCardSelectEvent:", error);
    }
}

// Function to disable all other cards except the selected one
function handleDisabledSelectedOrderItemsCard(selectedCard) {
    const allCards = document.querySelectorAll(".selectItemCard");
    allCards.forEach(card => {
        if (card !== selectedCard) {
            card.style.pointerEvents = "none"; 
            card.style.opacity = "0.6"; 
        }
    });
}

// Function to enable all cards
function handleEnabledSelectedOrderItemsCard() {
    const allCards = document.querySelectorAll(".selectItemCard");
    allCards.forEach(card => {
        card.style.pointerEvents = ""; 
        card.style.opacity = ""; 
    });
}





//=selected dishcard popup event(filter by waiter name and delete dish details)============
async function dishCardDetailsPopupEvent(baseUrl, btnDishCardPopup, selectedItemName, selectedDishIdElement, selectedDishSizeElement, selectItemQty, priceElement, selectOrderItemCards,dishTypeElement) {
    btnDishCardPopup.addEventListener("click", async function () {
       // console.log(selectedItemName, selectItemQty, priceElement);
        const unitPrice = parseFloat(priceElement.innerText) / parseInt(selectItemQty.innerText);

        dishDetailsPopup.style.display = 'flex';
        document.querySelector(".selectDishName").innerText = selectedItemName.innerText;

        const orderId = document.getElementById("dinein_orderId").value;
        const selectedDishId = selectedDishIdElement.innerText;
        const selectedDishSize = selectedDishSizeElement.innerText;
        const selectedDishType = dishTypeElement.innerText;

        try {
            const response = await fetch(baseUrl + '/CustomerWiseOrderDetails?orderId=' + orderId + '&dishId=' + selectedDishId + '&dishSize=' + selectedDishSize + '&orderType='+selectedDishType, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                },
            });
            const dishDetails = await response.json();
            //console.log(dishDetails);
            let selectDishDetailsPopup = "";
            const tblDishDetails = document.getElementById('tbl_dishDetails_body');
            tblDishDetails.innerHTML = '';

            const waiterNames = new Set();

            for (let i = 0; i < dishDetails.data.length; i++) {
                let rawDateAndTime = dishDetails.data[i].dateAndTime;
                let formattedDateAndTime = rawDateAndTime.split('.')[0].replace('T', ' ');

                selectDishDetailsPopup += `
                <tr data-id="${dishDetails.data[i].customerWiseOrderDetailsId}" data-qty="${dishDetails.data[i].dishQty}" data-price="${dishDetails.data[i].dishPrice}" data-dishId="${dishDetails.data[i].dishId}">
                    <td>${dishDetails.data[i].customerWiseOrderDetailsId}</td>
                    <td>${formattedDateAndTime}</td>
                    <td>${dishDetails.data[i].waiterName}</td>
                    <td>${dishDetails.data[i].dishPrice}</td>
                    <td>${dishDetails.data[i].dishQty}</td>
                    <td><img class="selectDishDelete" src="../icons/dustbin.png" width="30px" alt="Delete"></td>
                </tr>
                `;

                waiterNames.add(dishDetails.data[i].waiterName);
            }
            tblDishDetails.innerHTML = selectDishDetailsPopup;

            populateWaiterSelect(waiterNames);

            const deleteButtons = document.querySelectorAll(".selectDishDelete");
            deleteButtons.forEach(button => {
                button.addEventListener("click", async function () {
                    const row = button.closest("tr");
                    const customerWiseOrderDetailsId = row.getAttribute("data-id");
                    const qty = row.getAttribute("data-qty");
                    const dishPrice = row.getAttribute("data-price");
                    const dishId = row.getAttribute("data-dishId");
                    const rowCount = tblDishDetails.rows.length;
                    await deleteSelectedDish(baseUrl, customerWiseOrderDetailsId, qty, dishPrice, priceElement, selectItemQty, dishId, row, selectOrderItemCards, rowCount);
                });
            });

          filterTableByWaiter();

        } catch (error) {
            console.error("Error:", error);
        }
    });
}


function populateWaiterSelect(waiterNames) {
    const waiterSelect = document.getElementById('waiter_list');
    waiterSelect.innerHTML = '<option value="">Select waiter</option>';

    waiterNames.forEach(waiterName => {
        const option = document.createElement('option');
        option.value = waiterName;
        option.text = waiterName;
        waiterSelect.add(option);
    });
}

//function to filter selected order by waiter, dish selected popup
function filterTableByWaiter() {
    const waiterSelect = document.getElementById('waiter_list');
    waiterSelect.addEventListener('change', function () {
        const selectedWaiter = this.value;
        const rows = document.querySelectorAll('#tbl_dishDetails_body tr');

        rows.forEach(row => {
            const waiterName = row.cells[2].innerText;
            if (selectedWaiter === "" || waiterName === selectedWaiter) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }
        });
    });
}


// Function to handle dish card popup delete event
async function deleteSelectedDish(baseUrl, customerWiseOrderDetailsId, qty, dishPrice, priceElement, selectItemQty, dishId, row, selectOrderItemCards, rowCount) {
   // console.log("Row count before deletion:", rowCount);


    if (orderItemsContainer.children.length === 1 && rowCount === 1) {
        await deleteSelectedOrder(baseUrl, selectOrderItemCards);
        dishDetailsPopup.style.display = "none";
        return;
    }

    try {
        const response = await fetch(`${baseUrl}/CustomerWiseOrderDetails?customerWiseOrderDetailsId=${customerWiseOrderDetailsId}&qty=1&dishPrice=${dishPrice}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("jwt")}`,
            },
        });

        if (response.ok) {
            const currentQty = parseInt(selectItemQty.innerText);
            const currentPrice = parseFloat(priceElement.innerText);
            const newQty = currentQty - 1;
            const newPrice = currentPrice - parseFloat(dishPrice);

            selectItemQty.innerText = newQty;
            priceElement.innerText = newPrice;

            const rowQty = parseInt(row.getAttribute("data-qty"));

            if (rowQty > 1) {

                row.setAttribute("data-qty", rowQty - 1);
                row.querySelector('td:nth-child(5)').innerText = rowQty - 1;
            } else {
               
                row.remove();
                updateWaiterNames(); 
            }

            if (newQty === 0) {
             
                selectOrderItemCards.remove();
            }


            handleCalculateorderCartTotal();

        } else {
            console.error("Failed to delete resource:", response.statusText);
        }
    } catch (error) {
        console.error("Error:", error);
    }
}



function updateWaiterNames() {
    const rows = document.querySelectorAll('#tbl_dishDetails_body tr');
    const waiterNames = new Set();

    rows.forEach(row => {
        const waiterName = row.cells[2].innerText;
        waiterNames.add(waiterName);
    });

    populateWaiterSelect(waiterNames);
}





//function to change table button click event
async function showChangeTablePopup(baseUrl, button, tableNumber, orderId) {
    const popup = document.querySelector('.changeTablePopup');
    const tableCard = button.closest('.dinein-table');
    const popupInner = document.querySelector('.changeTablePopup-inner');
    if (!tableCard) return;

    const rect = tableCard.getBoundingClientRect();
    const x = rect.left + window.scrollX;
    const y = rect.top + window.scrollY;

    popup.style.left = `${x - 38}px`;
    popup.style.top = `${(y + 70)}px`;

    try {
        const response = await fetch(baseUrl + "/table", {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
        });
        const tables = await response.json();
        let availableTables = ""
        for (let i = 0; i < tables.data.length; i++) {
            if (tables.data[i].status === 'Available' && tables.data[i].tableSize != "empty") {
                availableTables +=
                    ` <div class="available-table" data-table-id="${tables.data[i].tableId}">
                             <h4>${tables.data[i].tableId}</h4>
                    </div>`
            }
        }
        popupInner.innerHTML = availableTables;
        popup.style.display = 'block';

        document.querySelectorAll(".available-table").forEach(availableTable => {
            availableTable.addEventListener("click", function () {
                const newTableId = availableTable.getAttribute('data-table-id');
                updateOrderWhenChangeTable(baseUrl, newTableId, tableNumber, orderId);
                mobileInput.value='';
                nameInput.value ='';
                checkCustomerInputs()
            });
        });
    } catch (error) {
        console.error("Error loading tables:", error);
    }
}


//function to update order table 
async function updateOrderWhenChangeTable(baseUrl, newTableId, tableNumber, orderId) {
    console.log("New table :" + newTableId + "  " + "old Table : " + tableNumber + " " + orderId);

    try {
        const response = await fetch(baseUrl + "/dineIn/Order?orderId=" + orderId + "&tableId=" + newTableId, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
        });
        const tableDetails = await response.json();
        console.log(tableDetails);

        handleLoadAllTables(baseUrl);
        changeTableOrderIdWhenChangeTable(baseUrl, tableNumber);
        const popup = document.querySelector('.changeTablePopup');
        popup.style.display = 'none';
    } catch (error) {
        console.error("Error updating table:", error);
    }
}


async function changeTableOrderIdWhenChangeTable(baseUrl, tableNumber) {
    try {
        const response = await fetch(baseUrl + "/table?t_id=" + tableNumber, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
        });
        const tableDelatis = await response.json();
        fetchOrderId(baseUrl);
        orderItemsContainer.innerHTML = "";
        customerName.value = "";
        inputMobileElement.value = "";
        waiterListInput.value = "";
        fullTakeawayTotalElement.value = "0.00";
        fullDineinTotalElement.value = "0.00";
    
        handleLoadAllTables(baseUrl);


    } catch (error) {

    }
}



//-----------------------------------------customer events-------------------------------------------------

//function to save customer event
function validateCustomerName(customerName) {
    return /^[a-zA-Z\s]+$/.test(customerName);
}

function validateCustomerContact(customerContact) {
    return /^(070|071|074|075|076|077|072|078)[-]?[0-9]{7}$/.test(customerContact);
}

const customerInputs = document.querySelectorAll('.addCustomer-inputField');

customerInputs.forEach(input => {
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

    input.addEventListener('input', checkCustomerInputs);
});

//function to check customer validations
function checkCustomerInputs() {
    let anyInputEmpty = false;
    let allInputsValid = true;

    customerInputs.forEach(input => {
        const container = input.parentElement;
        const value = input.value.trim();
        const invalidText = container.querySelector('.invalid-text');
        const validIcon = container.querySelector('.valid-text');

        if (value === '') {
            anyInputEmpty = true;
        }

        let valid = false;
        if (value !== '') {
            if (input.id === 'addCustomerMobile') {
                valid = validateCustomerContact(value);
            } else if (input.id === 'addCustomerName') {
                valid = validateCustomerName(value);
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

    if (anyInputEmpty || !allInputsValid) {
        customerSaveBtn.disabled = true;
    } else {
        customerSaveBtn.disabled = false;

    }
}


function dineinSaveCustomerEvent(baseUrl) {
    const cusMobileNo = mobileInput.value;
    const cusName = nameInput.value;

    fetch(baseUrl + "/customer", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("jwt")}`
        },
        body: JSON.stringify({
            cusMobileNo: cusMobileNo,
            cusName: cusName,
            customerActiveStatus: 1,
            creditStatus: "Disabled"
        })

    })
        .then(response => response.json())
        .then(response => {
            console.log(response);

            if (response.code === 200) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Customer saved successfully!",
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    // document.getElementById("customer-save-form").reset();
                    // location.reload();
                    addCustomerBox.style.display = "none";
                    // mobileInput.value = "";
                    // nameInput.value = "";
                    // resetCustomerValidation();
                    inputMobileElement.value = response.data.cusMobileNo;
                    customerName.value = response.data.cusName;
                    selectedCusId = response.data.cusId
                    handleLoadAndSelectCustomer(baseUrl);
                });

            } else {
                alert("Customer not saved");

            }
        })
        .catch(error => {
            console.error("Error saving customer:", error);
            alert("Customer not saved");
        });
}

//reset the validation state
function resetCustomerValidation() {
    customerInputs.forEach(input => {
        const container = input.parentElement;
        const invalidText = container.querySelector('.invalid-text');
        const validIcon = container.querySelector('.valid-text');

        // Reset styles and validation state
        container.style.borderColor = '';
        invalidText.style.display = 'none';
        if (validIcon) {
            validIcon.style.display = 'none';
        }
    });

    customerSaveBtn.disabled = true;
}

let selectedInput;
//--------add-customerbox Popup and Close Events------
function addCustomerEvent() {
    btnAddCustomer.addEventListener("click", function () {
        addCustomerBox.style.display = "block";

        if(mobileInput.value==="unKnown"){
           mobileInput.disabled=true
           nameInput.disabled=true
           resetCustomerValidation()               
        }
    });

    addCustomerBoxClose.addEventListener("click", function () {
        addCustomerBox.style.display = "none";
    });

    keypadButtons.forEach((button) => {
        button.addEventListener("click", handleButtonClick);
    });

    mobileInput.addEventListener("focus", () => {
        selectedInput = mobileInput;
    });

    nameInput.addEventListener("focus", () => {
        selectedInput = nameInput;
    });
}

function handleButtonClick(event) {
    const buttonValue = event.target.textContent;

    if (selectedInput == nameInput) {
        if (buttonValue === '←') {
            selectedInput.value = selectedInput.value.slice(0, -1);
        } else if (buttonValue === 'Space') {
            selectedInput.value += ' ';
        } else if (buttonValue === 'Enter') {
            mobileInput.focus();
        } else if (/^[a-zA-Z]+$/.test(buttonValue)) {
            if (selectedInput.value === '' || selectedInput.value.slice(-1) === ' ') {
                selectedInput.value += buttonValue.toUpperCase();
            } else {
                selectedInput.value += buttonValue.toLowerCase();
            }
        }


        const inputEvent = new Event('input', {
            bubbles: true,
            cancelable: true,
        });
        selectedInput.dispatchEvent(inputEvent);

    } else if (selectedInput == mobileInput) {
        if (buttonValue === '←') {
            selectedInput.value = selectedInput.value.slice(0, -1);
        } else if (buttonValue === 'Enter') {
            nameInput.focus();
        } else if (/^[0-9]$/.test(buttonValue)) {
            selectedInput.value += buttonValue;
        }


        const inputEvent = new Event('input', {
            bubbles: true,
            cancelable: true,
        });
        selectedInput.dispatchEvent(inputEvent);
    }
}


function updateInputValidity(inputElement, isValid) {
    if (inputElement.value === '') {
        inputElement.parentElement.style.border = "";
        inputElement.parentElement.style.boxShadow = "none";
    } else if (isValid) {
        inputElement.parentElement.style.border = "2px solid var(--text-field-success)";
        inputElement.parentElement.style.boxShadow = "0 0 1pt 0.1pt var(--text-field-success)";
    } else {
        inputElement.parentElement.style.border = "2px solid var(--text-field-error)";
        inputElement.parentElement.style.boxShadow = "0 0 1pt 0.1pt var(--text-field-error)";
    }
}


//function to check customer credit status
async function creditStatusHandle(baseUrl) {
    const mobileNumber=mobileInput.value;

    try {
        const response = await fetch(baseUrl + "/customer?contactNo="+mobileNumber, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
        });
        const isCreditedCustomer = await response.json();
        // console.log(isCreditedCustomer);
         if (isCreditedCustomer.data === false || inputMobileElement.value === "unKnown") {
            document.querySelector("#inputpaycreditOne").disabled = true;
        } else if (isCreditedCustomer.data === true) {
            document.querySelector("#inputpaycreditOne").disabled = false;
        }


    } catch (error) {
        console.error("Error fetching category data:", error);
    }
}


//function to search dish by click alphabet
function searchDishByLetter(dishCards) {
    letterButtons.forEach(letterButton => {
        letterButton.addEventListener('click', function () {
            const clickedLetter = letterButton.textContent.toLowerCase();
            //console.log("Clicked Letter:", clickedLetter);

            dishCards.forEach(dishCard => {
                const dishName = dishCard.getAttribute("data-name").toLowerCase();
                //console.log("dishName  " + dishName)

                if (dishName.startsWith(clickedLetter)) {
                    dishCard.style.display = "block";
                } else {
                    dishCard.style.display = "none";
                }
            });
        });
    });

    dishContentArea.addEventListener("click", () => {

        dishCards.forEach(dishCard => {
            dishCard.style.display = "block";
        });

    });
}



//function to check user
async function checkUserDetails(baseUrl, userId) {
    try {
        const token = localStorage.getItem("jwt");

        if (!token) {
            console.error('No JWT token found in localStorage');
            return false;
        }

        const response = await fetch(`${baseUrl}/shift?userId=${userId}`, {
            method: 'GET',
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            }
        });

        if (!response.ok) {
            if (response.status === 401) {
                throw new Error('Unauthorized: Invalid or expired token');
            }
            throw new Error('Network response was not ok ' + response.statusText);
        }

        const data = await response.json();
        const userInfo = data.data; 
          
        return userInfo || null; 

    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        return null;
    }
}


document.getElementById('btnDAdmin').addEventListener('click', async function () {
    showLoadingScreen()
    const baseUrl = await window.api.getBaseUrl();
    const isActiveAdmin = await checkUserDetails(baseUrl, localStorage.getItem("userId"));
    console.log(isActiveAdmin);

    localStorage.setItem("action", "admin");

    if (localStorage.getItem("role") === "Admin") {
        if (!isActiveAdmin) {
            window.location.href = './admin.html';
        } else {
            Swal.fire({
                title: "Confirmation",
                text: "Are you sure you want to log out?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#EA6D27",
                cancelButtonColor: "#101A24",
                confirmButtonText: "Yes, Log Out!"
            }).then((result) => {
                if (result.isConfirmed) {
                    const shiftEndElement = document.getElementById("shift_end");
                    const cashierInput = document.getElementById("shift_end_user_cashier");

                    if (shiftEndElement && cashierInput) {
                        shiftEndElement.style.display = "flex";
                        cashierInput.value = `${localStorage.getItem("userId")}   ${localStorage.getItem("userName")}`;
                        
                        getShiftEndStartFloat(baseUrl);
                    } else {
                        console.error('Required elements not found in the DOM.');
                    }
                }
            });
        }

    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "You are not Authorized!",
            customClass: {
                confirmButton: 'swal-button-orange'
            }
        });
    }

    hideLoadingScreen()
});


async function getShiftEndStartFloat(baseUrl) {
    try {
        const jwt = localStorage.getItem("jwt");
        if (!jwt) {
            throw new Error('JWT token missing.');
        }

        const response = await fetch(`${baseUrl}/shift?uId=${localStorage.getItem("userId")}`, {
            method: 'GET',
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${jwt}`,
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        const data = await response.json();
        console.log(data);

        const startFloatInput = document.getElementById("shiftend-start-float");
        const endFloatInput = document.getElementById("shiftend-end-float");

        if (startFloatInput && endFloatInput) {
            startFloatInput.value = data.data;
            endFloatInput.value = data.data;
        } else {
            console.error('Shift float elements not found in the DOM.');
        }

    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        return null;
    }
}

//function to validate shift end inputs
function validateShiftEndInputs() {
    const cashAmountInput = document.getElementById("shiftend-cash-amount");
    const cardAmountInput = document.getElementById("shiftend-card-amount");
    const shiftEndInput = document.getElementById("shiftend-end-float");

    const cashAmount = cashAmountInput.value.trim();
    const cardAmount = cardAmountInput.value.trim();
    const endFloat = shiftEndInput.value.trim();

    const isCashAmountValid = !isNaN(parseFloat(cashAmount)) && cashAmount !== "";
    const isCardAmountValid = !isNaN(parseFloat(cardAmount)) && cardAmount !== "";
    const isEndFloatValid = !isNaN(parseFloat(endFloat)) && endFloat !== "";

    updateInputBorder(cashAmountInput, isCashAmountValid);
    updateInputBorder(cardAmountInput, isCardAmountValid);
    updateInputBorder(shiftEndInput, isEndFloatValid);

  
    const btnShiftEnd = document.getElementById("btnShiftEnd");
    btnShiftEnd.disabled = !(isCashAmountValid && isCardAmountValid && isEndFloatValid);
}


function updateInputBorder(inputElement, isValid) {
    if (inputElement.value.trim() === "") {
        inputElement.parentElement.style.border = ""; 
    } else {
        inputElement.parentElement.style.border = isValid ? "2px solid var(--text-field-success)" : "2px solid var(--text-field-error)";
    }
}

document.getElementById("shiftend-cash-amount").addEventListener("input", validateShiftEndInputs);
document.getElementById("shiftend-card-amount").addEventListener("input", validateShiftEndInputs);
document.getElementById("shiftend-end-float").addEventListener("input", validateShiftEndInputs);




async function sendEndShift(baseUrl) {
    const cashAmount = document.getElementById("shiftend-cash-amount").value;
    const cardAmount = document.getElementById("shiftend-card-amount").value;
    const btnShiftEnd = document.querySelector(".btn-shift-end");
    
  
    btnShiftEnd.disabled = true;
    
    const obj = {
        startFloat: document.getElementById("shiftend-start-float").value,
        endFloat: document.getElementById("shiftend-end-float").value,
        cashAmount: cashAmount,
        cardAmount: cardAmount,
        totalAmount: 0,
        systemCashAmount: 0,
        systemCardAmount: 0,
        systemCreditAmount: 0,
        systemTotalAmount: 0,
        cashVariance: 0,
        cardVariance: 0,
        creditVariance: 0,
        totalVariance: 0,
        startRemark: "",
        endRemark: document.getElementById("remarkShiftend").value,
        user: localStorage.getItem("userId"),
        startDateTime: "",
        endDateTime: "",
        status: "close"
    };

    try {
        const response = await fetch(baseUrl + "/shift", {
            method: 'PUT',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
            body: JSON.stringify(obj),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        const responseData = await response.json();
        document.getElementById("shift_end").style.display = "none";
        cashierSessionSummary(responseData);

    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Failed to end the shift. Please try again later!',
        });
    } finally {
        // Re-enable the button after operation
        btnShiftEnd.disabled = false;
    }
}

async function cashierSessionSummary(responseData) {
    document.getElementById("cashSettlementPopup").style.display = "flex";
    console.log(responseData);

    const startDateTime = responseData.data.startDateTime || "N/A";
    const endDateTime = responseData.data.endDateTime || "N/A";

    const formatDateTime = (dateTimeString) => {
        return new Date(dateTimeString).toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });
    };

    const formattedStartDateTime = startDateTime !== "N/A" ? formatDateTime(startDateTime) : "N/A";
    const formattedEndDateTime = endDateTime !== "N/A" ? formatDateTime(endDateTime) : "N/A";

    document.getElementById("summary-userId").value = `${localStorage.getItem("userId")}   ${localStorage.getItem("userName")}`;
    document.getElementById("summary-startFloat").value = responseData.data.startFloat;
    document.getElementById("summary-startTime").value = formattedStartDateTime;
    document.getElementById("summary-endFloat").value = responseData.data.endFloat;
    document.getElementById("summary-endTime").value = formattedEndDateTime;

    document.getElementById("actual-cash").innerText = responseData.data.cashAmount;
    document.getElementById("actual-card").innerText = responseData.data.cardAmount;
    document.getElementById("actual-credit").innerText = responseData.data.creditAmount;
    document.getElementById("actual-tot").innerText = responseData.data.totalAmount;

    document.getElementById("syst-cash").innerText = responseData.data.systemCashAmount;
    document.getElementById("syst-card").innerText = responseData.data.systemCardAmount;
    document.getElementById("syst-credit").innerText = responseData.data.systemCreditAmount;
    document.getElementById("syst-tot").innerText = responseData.data.systemTotalAmount;

    setVarianceColor("vari-cash", responseData.data.cashVariance);
    setVarianceColor("vari-card", responseData.data.cardVariance);
    setVarianceColor("vari-credit", responseData.data.creditVariance);
    setVarianceColor("vari-tot", responseData.data.totalVariance);
}

function setVarianceColor(elementId, varianceValue) {
    const element = document.getElementById(elementId);
    const variance = parseFloat(varianceValue);
    
    if (variance > 0) {
        element.style.color = '#00cc00';
    } else if (variance < 0) {
        element.style.color = '#ff3300';
    } else {
        element.style.color = '#101A24';
    }

    element.innerText = varianceValue;
}



document.getElementById("btnsummary-close").addEventListener("click", function () {
    showLoadingScreen();
    const role = localStorage.getItem("role");
    const action = localStorage.getItem("action");

    if (role === "Admin" && action === "admin") {
        window.location = './admin.html';
        return;
    }

    //localStorage.removeItem("jwt");
    const isClear = window.api.clearAuthData()
    if (isClear) {
        window.location = './login.html';
    }
    hideLoadingScreen();
});

document.querySelector("#shift-box-close-shiftend").addEventListener("click", function () {
    document.querySelector(".container").style.pointerEvents = "auto";
    document.querySelector(".navbar").style.pointerEvents = "auto";
    document.getElementById("shift_end").style.display = "none";
});


document.getElementById('logOut').addEventListener('click', async function () {
    const baseUrl = await window.api.getBaseUrl();
    localStorage.setItem("action", "logout");
    const isActiveAdmin = await checkUserDetails(baseUrl, localStorage.getItem("userId"));
    console.log(isActiveAdmin);

    if (!isActiveAdmin) {
        dishCardListArea.style.pointerEvents = "none"
        const isClear = window.api.clearAuthData()
        if (isClear) {
            window.location = './login.html';
        }
        return
    } else {
        Swal.fire({
            title: "Confirmation",
            text: "Are you sure you want to log out?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#EA6D27",
            cancelButtonColor: "#101A24",
            confirmButtonText: "Yes, Log Out!"
        }).then((result) => {
            if (result.isConfirmed) {
                //alert("hi");

                document.querySelector(".container").style.pointerEvents = "none";
                document.querySelector(".navbar").style.pointerEvents = "none";
                document.getElementById("shift_end").style.display = "flex";
                document.getElementById("shift_end_user_cashier").value = `${localStorage.getItem("userId")}   ${localStorage.getItem("userName")}`
                getShiftEndStartFloat(baseUrl)

            }
        });
    }

});


function showLoadingScreen() {
    document.getElementById("loadingScreen").style.display = "flex";
  }
  
  function hideLoadingScreen() {
    document.getElementById("loadingScreen").style.display = "none";
  }
  