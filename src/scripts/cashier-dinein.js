

const currentDateAndtime = document.getElementById("currentDateAndTime")

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

// const inputPayCash = document.querySelector("#inputpaycash");
// const inputPayCard = document.querySelector("#inputpaycard");
// const inputPayCredit = document.querySelector("#inputpaycredit");
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
const btnAddCustomer = document.querySelector(".btn-addcustomer")
const addCustomerBoxClose = document.querySelector(".addCustomer-box-close-icon")
const keypadButtons = document.querySelectorAll('.btns-addCustomer, .btns-addCustomer-number');
const mobileInput = document.getElementById('addCustomerMobile');
const nameInput = document.getElementById('addCustomerName');

const customerSaveBtn = document.getElementById("btnSaveCustomer");

const orderIdElement = document.getElementById("dinein_orderId")

const btnCloseDishDetailsPopup = document.querySelector(".btnCloseDishDetailsPopup");
const dishDetailsPopup = document.querySelector(".dishDetailsPopup");

const paymentWarning = document.getElementById('paymentWarning');
const paymentAlertContainer = document.querySelector('.confrim-orderPanel-body-inner-payment-alert');

let selectedInputOrder;
const keypadButtonsa = document.querySelectorAll('.letter-order');

let selectedCusId
let selectedCusName
let selectCusContact;
let selectCusCreditStatus;

let selectedTableId;
let selectedTableNumber;

let isFirstAdd = true;

// const cashInput = document.getElementById('inputpaycashOne');
// const cardInput = document.getElementById('inputpaycardOne');
const creditInput = document.getElementById('inputpaycreditOne');
// const discountInput = document.querySelector('.orderDiscount');

let previouslySelectedCard = null;
let currentlySelectedCard = null

let previousDishWaitersList = [];


document.addEventListener("DOMContentLoaded", async function () {
    const baseUrl = await window.api.getBaseUrl();
    const dishImagePath = await window.api.getImagePath();
    //auth-check
    window.api.checkLogUser();
    init(baseUrl)


    btnCloseDishDetailsPopup.addEventListener("click", function () {
        dishDetailsPopup.style.display = "none"
    });

    document.getElementById("toTakeAwayToggle").addEventListener("click", function () {
        if (!this.checked) {
            window.location = './cashier-takeaway.html';
        }
    });

    document.querySelector(".btn-shift-end").addEventListener("click", function () {
        sendEndShift(baseUrl)
    })

    setInterval(updateTime, 1000);
    loadAllCategory(baseUrl, dishImagePath);
    loadDishes(baseUrl, dishImagePath);
    searchCustomers(baseUrl);
    loadAllTables(baseUrl);
    addCustomerEvent();

    selectCustomerMobileEvent();
    loadAllWaiters(baseUrl);
    getOrderId(baseUrl);

    const inputs = [
        document.getElementById('inputpaycashOne'),
        document.getElementById('inputpaycardOne'),
        document.getElementById('inputpaycreditOne'),
        document.querySelector('.orderDiscount')
    ];

    inputs.forEach(input => {
        input.addEventListener("focus", () => {
            selectedInputOrder = input;
        });
    });


    customerSaveBtn.addEventListener("click", function () {
        dineinSaveCustomerEvent(baseUrl)
    })
    const isSessionStarted = localStorage.getItem('sessionStarted');

    if (isSessionStarted === "true") {
        console.log("start");
        const tableInnerArea = document.querySelector(".cashier-dinein-table-inner-area-body");
        tableInnerArea.style.pointerEvents = 'auto';
    } else {
        console.log("not start");
        const tableInnerArea = document.querySelector(".cashier-dinein-table-inner-area-body");
        tableInnerArea.style.pointerEvents = 'none';
    }
});

async function init(baseUrl) {
    const isActiveAdmin = await checkAdminSession(baseUrl, localStorage.getItem("userId"));
    // console.log(isActiveAdmin);

    if (!isActiveAdmin) {
        dishCardListArea.style.pointerEvents = "none"
        tableAreaView.style.display = 'none';
        btnTableDropdown.classList.remove("btnPopUpTable-rotate");
        return
    }
}


//============date and time============
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
    // dateAndTime = formattedDate;

}


//============load all categories============
async function loadAllCategory(baseUrl, dishImagePath) {
    try {
        const response = await fetch(baseUrl + "/Categorry", {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
        });
        const category = await response.json();
        // console.log(category);

        let categoryList = "";

        for (let i = 0; i < category.data.length; i++) {
            categoryList += `
            <div class="catergory-card">
            <h3 class="catergory-card-title">${category.data[i].categorryName}</h3>
            </div>
            `;
        }

        categoryCardListArea.innerHTML = categoryList;
        const categoryCardList = document.querySelectorAll(".catergory-card");
        selectCategoryCardEvent(baseUrl, categoryCardList, dishImagePath);

    } catch (error) {
        console.error("Error fetching category data:", error);
    }
}


// =============select CategoryCard Event=============
function selectCategoryCardEvent(baseUrl, categoryCardList, dishImagePath) {
    categoryCardList.forEach((categoryCard) => {
        categoryCard.addEventListener("click", function () {

            const currentCategoryCard = categoryCard;

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


            //  console.log(categoryCard);
            categoryCardListArea.style.display = "none";
            tableArea.style.display = "none";
            dishCardListArea.style.display = "flex";
            alphabetArea.style.display = "flex";

            const selectedCategoryCardName = currentCategoryCard.querySelector(".catergory-card-title").innerText;

            //console.log(selectedCategoryCardName);
            loadDishes(baseUrl, selectedCategoryCardName, dishImagePath);
        });
    });

    backTocategoryList.addEventListener("click", function () {
        categoryCardListArea.style.display = "flex";
        tableArea.style.display = "flex";
        dishCardListArea.style.display = "none";
        alphabetArea.style.display = "none";
    });
}

// =============Load All dishes=============
async function loadDishes(baseUrl, selectedCategoryCardName, dishImagePath) {
    //console.log("dish "+selectedCategoryCardName);
    try {
        const response = await fetch(baseUrl + "/dish?category=" + selectedCategoryCardName, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
        });
        const dishes = await response.json();
        // console.log(dishes);

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
        // console.log(dishCards);
        selectedDishPopup(baseUrl, dishes.data, dishCards);
        searchDishByLetter(dishCards)

    } catch (error) {
        console.error("Error fetching category data:", error);
    }
}


//========select dish card event==================
function selectedDishPopup(baseUrl, dishes, dishCards) {
    //click dishcard event
    dishCards.forEach((dishCard) => {
        dishCard.addEventListener("click", function () {
            const index = dishCard.getAttribute("data-index");
            displayPopup(baseUrl, dishes, index);

        });
    });

}

//========select dish card's popup open==================
let lastSelectedSize = null;
function displayPopup(baseUrl, dishes, index) {
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
            btnBackspaceNumbers.addEventListener("click", handleBackspace);
        }


        function handleNumberClick() {
            const clickedNumber = this.innerHTML;
            // console.log("Clicked number:", clickedNumber);
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

        function handleBackspace() {
            clickedSelectedDishQtyNumbers = clickedSelectedDishQtyNumbers.slice(0, -1);
            dishSizeInput.value = clickedSelectedDishQtyNumbers;

            if (dishSizeInput.value === "") {
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
                lastSelectedSize = sizeBtnContainer;
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

                lastSelectedSize = null;
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
                btnBackspaceNumbers.removeEventListener("click", handleBackspace);
            }
        });
    });




    //added cart to selected items
    btnDinein.addEventListener("click", function () {
        if (lastSelectedSize) {

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
        if (lastSelectedSize) {
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
        if (!lastSelectedSize) {
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
        const selectedSizeName = lastSelectedSize.querySelector('.size-btn').innerText;
        const selectedSizePrice = lastSelectedSize.querySelector('.size-input').innerText;
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
                saveOrderDetailsBySelectDishPopup(baseUrl, "plus", qtyDifference, priceDifference, selectItemCard);
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

            if (isFirstAdd && orderItemsContainer.children.length === 1) {
                //console.log("First add");
                saveDefaultOrder(baseUrl, selectOrderItemCards);
                isFirstAdd = false;

            } else {
                // console.log("Second");
                saveOrderDetails(baseUrl, "plus", false, selectOrderItemCards);
            }

            qtyChangeEventHandler(baseUrl, btnQtyMinus, btnQtyPlus, selectItemQty, selectedSizePrice, priceElement, selectOrderItemCards);
            dishCardDetailsPopupEvent(baseUrl, btnDishCardPopup, selectedItemName, selectedDishId, selectedDishSize, selectItemQty, priceElement, selectOrderItemCards);
            getWaitersForSelectDishCard(baseUrl, selectOrderItemCards);
        }

        btnPayButtonValidateEvent();
        CalculateFullTotal();
        selectDishPopup.style.display = "none";
    }


}

//change dish qty from + and - buttons
function qtyChangeEventHandler(baseUrl, btnQtyMinus, btnQtyPlus, selectItemQty, pricePerItem, priceElement, selectOrderItemCards) {
    // console.log(previousDishWaitersList);
    previouslySelectedCard = selectOrderItemCards
    currentlySelectedCard = selectOrderItemCards
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

        if (!previousDishWaitersList.includes(waiterListInput.value)) {
            Swal.fire({
                title: "Oops...",
                text: "Please select an item and choose a valid waiter!",
                icon: "warning",
                customClass: {
                    confirmButton: 'alert-orange-button',
                }
            });
            // waiterListInput.value = "";
            selectOrderItemCards.style.border = "";
            return;
        }

        if (currentQty > 1) {
            currentQty -= 1;
            selectItemQty.innerText = currentQty;
            const newPrice = currentQty * pricePerItem;
            priceElement.innerText = newPrice;
            selectOrderItemCards.style.border = "";
            CalculateFullTotal();
            saveOrderDetails(baseUrl, "mines", true, selectOrderItemCards);
        } else {
            if (orderItemsContainer.children.length === 1) {
                deleteSelectedOrder(baseUrl, selectOrderItemCards);
            } else {
                saveOrderDetails(baseUrl, "mines", true, selectOrderItemCards);
                selectOrderItemCards.remove();
                CalculateFullTotal();
                getWaitersForSelectDishCard(baseUrl, selectOrderItemCards);
                btnPayButtonValidateEvent();
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



        let currentQty = parseInt(selectItemQty.innerText);
        currentQty += 1;
        selectItemQty.innerText = currentQty;
        const newPrice = currentQty * pricePerItem;
        priceElement.innerText = newPrice;
        saveOrderDetails(baseUrl, "plus", true, selectOrderItemCards);
        CalculateFullTotal();

        // Reset previously selected card
        if (previouslySelectedCard) {
            previouslySelectedCard.style.border = "";
            previouslySelectedCard = null;
            waiterListInput.value = "";
        }

        if (currentlySelectedCard) {
            currentlySelectedCard.style.border = "";
            currentlySelectedCard = null;
            waiterListInput.value = "";
        }

        loadAllWaiters(baseUrl);
    });
}

// Delete the selected order when clicking "-" or popup's delete image
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

                    // Update UI after successful deletion
                    selectOrderItemCards.remove();
                    CalculateFullTotal();
                    getWaitersForSelectDishCard(baseUrl, selectOrderItemCards);
                    btnPayButtonValidateEvent();
                    getOrderId(baseUrl);
                    loadAllTables(baseUrl);

                    // Clear input fields and reset UI
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


//pay button validation event
function btnPayButtonValidateEvent() {
    const hasItems = orderItemsContainer.children.length > 0;
    const isMobileEmpty = inputMobileElement.value.trim() === "";
    const isNameEmpty = customerName.value.trim() === "";
    btnPay.disabled = !hasItems || isMobileEmpty || isNameEmpty
}


function CalculateFullTotal() {
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

btnPay.addEventListener('click', function () {
    if (selectCusCreditStatus === "Disabled" || inputMobileElement.value === "unKnown") {
        document.querySelector("#inputpaycreditOne").disabled = true;
    } else if (selectCusCreditStatus === "Enabled") {
        document.querySelector("#inputpaycreditOne").disabled = false;
    }

    const subTotalValue = document.querySelector(".subTotal").innerText;
    const orderId = document.querySelector("#dinein_orderId").value;
    const tableId = document.querySelector(".dinein-table-id").value;
    btnPayClickHandler(subTotalValue, orderId, tableId);
});


function btnPayClickHandler(subTotalValue, orderId, tableId) {
    // console.log("click");
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


let currentlyFocusedInput = null;
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

    handleKeyPress();
    payOrderKeyboardEvent();
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






//=================confrim order event================
async function ConfirmOrder() {
    const baseUrl = await window.api.getBaseUrl();
    const customerObj = {
        cusId: selectedCusId,
        cusMobileNo: selectCusContact,
        cusName: selectedCusName,
        cusStatus: 1
    }

    const orderId = orderIdElement.value
    const netTotal = parseFloat(orderNetTotal.innerText);



    try {
        fetch(baseUrl + "/dineIn/Order/updateDineIn", {
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
        })

            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                //  console.log(data);
                selectedTableId = data.tableId;
                selectedTableNumber = data.tabNo
                confirmPaymet(baseUrl, orderId);

            })
    } catch (error) {
        console.log("Error " + error);
    }
}

function confirmPaymet(baseUrl, orderId) {
    function getCurrentDate() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`
    }
    const date = getCurrentDate();

    const cashierName = localStorage.getItem("userName")
    const cash = document.getElementById("inputpaycashOne").value;
    const card = document.getElementById("inputpaycardOne").value;
    const credit = document.getElementById("inputpaycreditOne").value;
    const balance = document.getElementById("order_balance").textContent;
    const amount = parseFloat(parseFloat(card) + parseFloat(credit) + parseFloat(cash));
    const total = document.getElementById("netTotalOne").textContent;

    try {
        fetch(baseUrl + "/payment/", {
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
        })

            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                //   console.log(data);

            })
    } catch (error) {
        console.log("Error " + error);
    }

}


btnConfrim.addEventListener("click", async function () {
    try {
        const baseUrl = await window.api.getBaseUrl();
        checkInputTableValue();
        await ConfirmOrder();

        Swal.fire({
            title: "Payment Successfully!",
            text: "Order has been successfully placed. Thank you!",
            icon: "success",
            confirmButtonColor: "#EA6D27",
            confirmButtonText: "OK"
        }).then((result) => {
            if (result.isConfirmed) {
                downloadAndShowPdf(baseUrl).then(() => {
                    document.getElementById("confirm-order-panel-dinein").reset();
                    location.reload();
                });
            }
        });
    } catch (error) {
        Swal.fire({
            title: "Error",
            text: "There was an issue placing the order. Please try again.",
            icon: "error",
            confirmButtonColor: "#EA6D27",
            confirmButtonText: "OK"
        });
    }

});

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


//============Search Dishes============
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


//============Search Customers for order============
async function searchCustomers(baseUrl) {
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
            handleMobileNumberChange(); 
        });

        inputMobileElement.addEventListener("input", function () {
            handleMobileNumberChange(); 
        });

        function handleMobileNumberChange() {
            // console.log("hi");
            const enteredMobileNumber = inputMobileElement.value.trim();
            mobileInput.value = enteredMobileNumber;
            const index = mobileNumbers.indexOf(enteredMobileNumber); 

            if (index !== -1) {
              
                customerName.value = customerNames[index];
                nameInput.value = customerNames[index];
                selectedCusId = customerIds[index];
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

            btnPayButtonValidateEvent();
            checkCustomerInputs();
        }


    } catch (error) {
        console.error("Error fetching customer data:", error);
    }
}


inputMobileElement.addEventListener("click", function () {
    numbericKeypad.style.display = "block";
});

document.querySelector("#dinein-container").addEventListener('click', function (event) {
    if (!event.target.closest('.customer-mobile-input') && !event.target.closest('.numberic-keypad-mobile')) {
        // console.log("hi");
        numbericKeypad.style.display = "none";
    }
});

//===========select customer keypad event===========
function selectCustomerMobileEvent() {
    numberkeys.forEach((numberKey) => {
        numberKey.addEventListener("click", function () {
            insertAtCaret(inputMobileElement, numberKey.textContent);
        });
    });

    keyBackspace.addEventListener("click", () => {
        handleBackspace(inputMobileElement);
    });

    keyEnter.addEventListener("click", function () {
        numbericKeypad.style.display = "none";
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




//============Load All tables============
let clicked = true;

async function loadAllTables(baseUrl) {
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
                              <div class="dinein-table table-markasAvailable" data-name="${tables.data[i].status}">
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
                        <div class="dinein-table pending-table" data-name="${tables.data[i].status}" data-table-number="${tables.data[i].tableId}">
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
                        <div class="dinein-table available-dinein-table" data-name="${tables.data[i].status}" data-table-number="${tables.data[i].tableId}">
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
                    getpreviousOrderDetails(baseUrl, tableNumber);
                });
            });

            document.querySelectorAll('.btnChangeTable').forEach(button => {
                button.addEventListener('click', function (event) {
                    event.stopPropagation();
                    const tableNumber = event.target.closest(".dinein-table").querySelector("#tableId").textContent;
                    showChangeTablePopup(baseUrl, button, tableNumber);
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
    isFirstAdd = true;
    getOrderId(baseUrl);
    orderItemsContainer.innerHTML = ""
    customerName.value = ""
    inputMobileElement.value = ""
    waiterListInput.value = ""
    groupIdInput.value = tableNumber
    selectedTableId = tableNumber


    CalculateFullTotal()
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
            //console.log(data);
            selectedTableNumber = data.data.tableNumber
            loadAllTables(baseUrl);
            btnPayButtonValidateEvent()

        })
        .catch(error => {
            console.error('Error updating employee:', error);
        });

}


function setTableToAvailable(baseUrl, tableNumber) {
    //  console.log("set Available");
    isFirstAdd = true;
    getOrderId(baseUrl);
    orderItemsContainer.innerHTML = "";
    customerName.value = "";
    inputMobileElement.value = "";
    waiterListInput.value = "";
    fullTakeawayTotalElement.value = "0.00";
    fullDineinTotalElement.value = "0.00";

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
            loadAllTables(baseUrl);
            btnPayButtonValidateEvent();
        })
        .catch(error => {
            console.error('Error updating table:', error);
        });
}



btnTableDropdown.addEventListener("click", function () {
    if (clicked) {
        btnTableDropdown.classList.remove("btnPopUpTable-rotate");
        tableAreaView.style.display = "none";
    } else {
        btnTableDropdown.classList.add("btnPopUpTable-rotate");
        tableAreaView.style.display = "block";
    }
    clicked = !clicked;
});



//=========table Click Event======================
async function showChangeTablePopup(baseUrl, button, tableNumber) {
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
        console.log(tables);
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
                updateOrderWhenChangeTable(baseUrl, newTableId, tableNumber)

            })
        })

    } catch (error) {
        console.error("Error loading tables:", error);
    }
}


async function updateOrderWhenChangeTable(baseUrl, newTableId, tableNumber) {
    const orderId = orderIdElement.value;
    groupIdInput.value = newTableId
    //console.log(newTableId+" "+orderId);

    try {
        const response = await fetch(baseUrl + "/dineIn/Order?orderId=" + orderId + "&tableId=" + newTableId, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
        });
        const tableDelatis = await response.json();
        loadAllTables(baseUrl);
        changeTableOrderIdWhenChangeTable(baseUrl, tableNumber);
        const popup = document.querySelector('.changeTablePopup');
        popup.style.display = 'none'
    } catch (error) {

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
        loadAllTables(baseUrl);
    } catch (error) {

    }
}



//===========table view display event===========
function checkInputTableValue() {
    if (!groupIdInput.value) {
        tableAreaView.style.display = 'block';
        btnTableDropdown.classList.add("btnPopUpTable-rotate");
    }
}


//=================save customer event============================
function validateCustomerName(customerName) {
    return /^[a-zA-Z\s]+$/.test(customerName);
}

function validateCustomerContact(customerContact) {
    return /^(070|071|074|075|076|077|078)[-]?[0-9]{7}$/.test(customerContact);
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
                    mobileInput.value = "";
                    nameInput.value = "";
                    inputMobileElement.value = response.data.cusMobileNo;
                    customerName.value = response.data.cusName;
                    selectedCusId = response.data.cusId
                    searchCustomers(baseUrl)
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


let selectedInput;
//--------add-customerbox Popup and Close Events------
function addCustomerEvent() {
    btnAddCustomer.addEventListener("click", function () {
        addCustomerBox.style.display = "block";
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

//======get order id to frontend============
async function getOrderId(baseUrl) {
    try {
        const response = await fetch(baseUrl + "/orders/oId", {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
        });
        const orderId = await response.json();
        //   console.log(orderId);
        orderIdElement.value = orderId.data
    } catch (error) {
        console.error("Error fetching Order id data:", error);
    }
}


let selectedWaiterName = '';
let selectedWaiterId = '';

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




//======selected dishcard popup event(filter by waiter name and delete dish details)============
async function dishCardDetailsPopupEvent(baseUrl, btnDishCardPopup, selectedItemName, selectedDishIdElement, selectedDishSizeElement, selectItemQty, priceElement, selectOrderItemCards) {
    btnDishCardPopup.addEventListener("click", async function () {
        console.log(selectedItemName, selectItemQty, priceElement);
        const unitPrice = parseFloat(priceElement.innerText) / parseInt(selectItemQty.innerText);

        dishDetailsPopup.style.display = 'flex';
        document.querySelector(".selectDishName").innerText = selectedItemName.innerText;

        const orderId = document.getElementById("dinein_orderId").value;
        const selectedDishId = selectedDishIdElement.innerText;
        const selectedDishSize = selectedDishSizeElement.innerText;

        try {
            const response = await fetch(baseUrl + '/CustomerWiseOrderDetails?orderId=' + orderId + '&dishId=' + selectedDishId + '&dishSize=' + selectedDishSize, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                },
            });
            const dishDetails = await response.json();
            console.log(dishDetails);
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

//dish card popup delete order
async function deleteSelectedDish(baseUrl, customerWiseOrderDetailsId, qty, dishPrice, priceElement, selectItemQty, dishId, row, selectOrderItemCards, rowCount) {
    console.log("Row count before deletion:", rowCount);

    // Check if this is the last item in the order
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

            // Update the UI with the new quantity and price
            selectItemQty.innerText = newQty;
            priceElement.innerText = newPrice;

            const rowQty = parseInt(row.getAttribute("data-qty"));

            if (rowQty > 1) {
                // Update the row quantity and table display
                row.setAttribute("data-qty", rowQty - 1);
                row.querySelector('td:nth-child(5)').innerText = rowQty - 1;
            } else {
                // Remove the row if no items are left
                row.remove();
                updateWaiterNames();  // Update waiter names if necessary
            }

            if (newQty === 0) {
                selectOrderItemCards.remove();  // Remove the card if no quantity is left
            }

            CalculateFullTotal();  // Recalculate the total

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


//==============save default order============
function saveDefaultOrder(baseUrl, selectOrderItemCards) {
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

    const dateAndTime = getCurrentDateTime();

    // console.log(selectCusCreditStatus);
    if (selectCusCreditStatus === "Disabled") {
        creditInput.disabled = true
    } else if (selectCusCreditStatus === "Enabled") {
        creditInput.disabled = false
    }

    const defaultCustomer = {
        cusId: selectedCusId,
        cusMobileNo: selectCusContact,
        cusName: selectedCusName,
        cusStatus: 1
    }

    const orderId = orderIdElement.value


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
                loadAllTables(baseUrl);
                saveOrderDetails(baseUrl, "plus", false, selectOrderItemCards)

            })
    } catch (error) {
        console.log("Error " + error);
    }

}



//save order details by frist time and click +,- buttons
function saveOrderDetails(baseUrl, format, status, selectItemCard) {
    // console.log(selectItemCard);
    const selectItemCards = document.querySelectorAll(".selectItemCard");
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


//save order details by update select dish card by popup
function saveOrderDetailsBySelectDishPopup(baseUrl, format, qtyDifference, priceDifference, selectItemCard) {

    const orderId = orderIdElement.value;

    const orderDetails = {
        odId: orderId,
        customerWiseOrderDetailsDTOS: []
    };

    const dishId = selectItemCard.querySelector(".selectItemId").innerText;
    const dishName = selectItemCard.querySelector(".selectItemName").innerText;
    const dishSize = selectItemCard.querySelector(".selectItemSize").innerText;
    const orderPrice = selectItemCard.querySelector(".selectItemPrice").innerText;
    const orderQty = qtyDifference;
    const unitPrice = priceDifference / qtyDifference;
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
                console.log("Order details sent successfully:", data);
                console.log(orderDetails);
            })
            .catch(error => {
                console.error("Error:", error);
            });
    } catch (error) {
        console.log("Error " + error);
    }
}


//get previousOrder details
function getpreviousOrderDetails(baseUrl, tableNo) {
    orderItemsContainer.innerHTML = "";
    groupIdInput.value = tableNo
    console.log(groupIdInput.value);


    try {
        fetch(baseUrl + "/table?table_id=" + tableNo, {
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
                inputMobileElement.value = data.data[0][11]
                customerName.value = data.data[0][12]
                mobileInput.value = data.data[0][11]
                nameInput.value = data.data[0][12]
                orderIdElement.value = data.data[0][5];
                const orderItems = data.data;

                orderItems.forEach(item => {
                    //  console.log(item);
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

                        qtyChangeEventHandler(baseUrl, btnQtyMinus, btnQtyPlus, selectItemQty, item[9], priceElement, selectOrderItemCards);
                        dishCardDetailsPopupEvent(baseUrl, btnDishCardPopup, selectedItemName, selectedDishId, selectedDishSize, selectItemQty, priceElement, selectOrderItemCards);


                        previousDishCardSelectEvent(baseUrl, selectOrderItemCards);
                    }
                });
                btnPayButtonValidateEvent();
                checkCustomerInputs();
                CalculateFullTotal();

            })
            .catch(error => {
                console.error("Error:", error);
            });
    } catch (error) {
        console.log("Error " + error);
    }
}

async function previousDishCardSelectEvent(baseUrl, selectOrderItemCards) {

    try {
        //  console.log("Attaching event listener to:", selectOrderItemCards);
        selectOrderItemCards.addEventListener("click", async function () {

            if (event.target.classList.contains("btnQtyMinus") || event.target.classList.contains("btnQtyPlus")) {
                return;
            }

            if (previouslySelectedCard) {
                previouslySelectedCard.style.border = "";
            }

            previouslySelectedCard = selectOrderItemCards;
            selectOrderItemCards.style.border = "2px solid orange";
            waiterListInput.value = "";
            const orderId = document.getElementById("dinein_orderId").value;
            const selectedDishId = selectOrderItemCards.querySelector(".selectItemId").innerText;
            const selectedDishSize = selectOrderItemCards.querySelector(".selectItemSize").innerText;

            //  console.log(orderId + " " + selectedDishId + " " + selectedDishSize);

            try {
                const response = await fetch(`${baseUrl}/CustomerWiseOrderDetails?orderId=${orderId}&dishId=${selectedDishId}&dishSize=${selectedDishSize}`, {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                    },
                });
                const dishDetails = await response.json();
                // console.log("Dish Details:", dishDetails);

                if (Array.isArray(dishDetails.data)) {
                    previousDishWaitersList = dishDetails.data.map(detail => detail.waiterName);
                    const waitersList = dishDetails.data.map(detail => detail.waiterName);
                    //  console.log("Waiters List:", waitersList);

                    const waitersDatalist = document.getElementById("waiters_list");
                    waitersDatalist.innerHTML = "";
                    waitersList.forEach(waiter => {
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

        document.querySelector(".cashier-dinein-right-inner-content-body-bottom").addEventListener("click", () => {
            //  console.log("clik");
            if (previouslySelectedCard) {
                previouslySelectedCard.style.border = "";
                previouslySelectedCard = null;
                waiterListInput.value = "";
            }
            loadAllWaiters(baseUrl);
        });

        document.querySelector(".container-body-left").addEventListener("click", (event) => {
            //  console.log("clik");

            if (!event.target.closest('.category-card')) {
                //  console.log("cardcclik");
                if (previouslySelectedCard) {
                    previouslySelectedCard.style.border = "";
                    previouslySelectedCard = null;
                    waiterListInput.value = "";
                }
                loadAllWaiters(baseUrl);
                return;
            }

            // if (previouslySelectedCard) {
            //     previouslySelectedCard.style.border = "";
            //     previouslySelectedCard = null;
            //     waiterListInput.value = "";
            // }
            // loadAllWaiters(baseUrl);
        });
    } catch (error) {
        console.error("Error in previousDishCardSelectEvent:", error);
    }
}



//get selected waiters for adding cart dishes
function getWaitersForSelectDishCard(baseUrl, selectOrderItemCards) {
    const cardsArray = selectOrderItemCards instanceof NodeList || selectOrderItemCards instanceof HTMLCollection ? Array.from(selectOrderItemCards) : [selectOrderItemCards];

    cardsArray.forEach(card => {
        //  console.log(card);
        card.addEventListener("click", async function () {

            if (event.target.classList.contains("btnQtyMinus") || event.target.classList.contains("btnQtyPlus")) {
                return;
            }

            if (currentlySelectedCard) {
                currentlySelectedCard.style.border = "";
            }

            currentlySelectedCard = selectOrderItemCards;
            selectOrderItemCards.style.border = "2px solid orange";
            waiterListInput.value = ""


            const orderId = document.getElementById("dinein_orderId").value;
            const selectedDishId = card.querySelector(".selectItemId").innerText;
            const selectedDishSize = card.querySelector(".selectItemSize").innerText;

            console.log(orderId + " " + selectedDishId + " " + selectedDishSize);

            try {
                const response = await fetch(`${baseUrl}/CustomerWiseOrderDetails?orderId=${orderId}&dishId=${selectedDishId}&dishSize=${selectedDishSize}`, {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                    },
                });
                const dishDetails = await response.json();
                console.log("Dish Details:", dishDetails);

                if (Array.isArray(dishDetails.data)) {
                    previousDishWaitersList = dishDetails.data.map(detail => detail.waiterName);
                    // console.log(previousDishWaitersList);
                    const waitersList = dishDetails.data.map(detail => detail.waiterName);
                    console.log("Waiters List:", waitersList);

                    const waitersDatalist = document.getElementById("waiters_list");
                    waitersDatalist.innerHTML = "";
                    waitersList.forEach(waiter => {
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

    document.querySelector(".cashier-dinein-right-inner-content-body-bottom").addEventListener("click", () => {
        if (currentlySelectedCard) {
            currentlySelectedCard.style.border = "";
            currentlySelectedCard = null;
            waiterListInput.value = "";
        }
        loadAllWaiters(baseUrl);
    });

    document.querySelector(".container-body-left").addEventListener("click", (event) => {
        // Check if the click happened outside of a .category-card element
        if (!event.target.closest('.category-card')) {
            return;
        }

        // Deselect the currently selected card
        if (currentlySelectedCard) {
            currentlySelectedCard.style.border = "";
            currentlySelectedCard = null;
            waiterListInput.value = "";
        }

        // Load all waiters
        loadAllWaiters(baseUrl);
    });


}


document.getElementById('btnDAdmin').addEventListener('click', async function () {
    const baseUrl = await window.api.getBaseUrl();
    const isActiveAdmin = await checkAdminSession(baseUrl, localStorage.getItem("userId"));
    console.log(isActiveAdmin);



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

                    // document.querySelector(".container").style.pointerEvents = "none";
                    // document.querySelector(".navbar").style.pointerEvents = "none";
                    document.getElementById("shift_end").style.display = "flex";
                    document.getElementById("shift_end_user_cashier").value = `${localStorage.getItem("userId")}   ${localStorage.getItem("userName")}`
                    getShiftEndStartFloat(baseUrl)

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
});

document.getElementById('logOut').addEventListener('click', async function () {
    const baseUrl = await window.api.getBaseUrl();
    localStorage.setItem("action", "logout");
    const isActiveAdmin = await checkAdminSession(baseUrl, localStorage.getItem("userId"));
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


async function checkAdminSession(baseUrl, userId) {
    try {
        const response = await fetch(`${baseUrl}/shift?userId=${userId}`, {
            method: 'GET',
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        const isCashierActiveSession = data.data
        // console.log(data.data);
        return isCashierActiveSession;




    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        return false;
    }
}

async function getShiftEndStartFloat(baseUrl) {
    try {
        const response = await fetch(`${baseUrl}/shift?uId=${localStorage.getItem("userId")}`, {
            method: 'GET',
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        const data = await response.json();
        console.log(data);
        document.getElementById("shiftend-start-float").value = data.data
        document.getElementById("shiftend-end-float").value = data.data
        // return data; 
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        return null;
    }
}

function validateShiftEndInputs() {
    const cashAmountInput = document.getElementById("shiftend-cash-amount");
    const cardAmountInput = document.getElementById("shiftend-card-amount");
    const shiftEndInput = document.getElementById("shiftend-end-float");

    const cashAmount = cashAmountInput.value.trim();
    const cardAmount = cardAmountInput.value.trim();
    const endFloat = shiftEndInput.value.trim();


    const isCashAmountValid = !isNaN(cashAmount) && cashAmount !== "";
    const isCardAmountValid = !isNaN(cardAmount) && cardAmount !== "";
    const isEndFloatValid = !isNaN(endFloat) && endFloat !== "";

    cashAmountInput.parentElement.style.border = cashAmount !== "" ? (isCashAmountValid ? "2px solid var(--text-field-success)" : "2px solid var(--text-field-error)") : "";
    cardAmountInput.parentElement.style.border = cardAmount !== "" ? (isCardAmountValid ? "2px solid var(--text-field-success)" : "2px solid var(--text-field-error)") : "";
    shiftEndInput.parentElement.style.border = endFloat !== "" ? (isEndFloatValid ? "2px solid var(--text-field-success)" : "2px solid var(--text-field-error)") : "";

    const btnShiftEnd = document.getElementById("btnShiftEnd");
    btnShiftEnd.disabled = !(isCashAmountValid && isCardAmountValid && isEndFloatValid);
}
document.getElementById("shiftend-cash-amount").addEventListener("input", validateShiftEndInputs);
document.getElementById("shiftend-card-amount").addEventListener("input", validateShiftEndInputs);
document.getElementById("shiftend-end-float").addEventListener("input", validateShiftEndInputs);


async function sendEndShift(baseUrl) {
    const cashAmount = document.getElementById("shiftend-cash-amount").value;
    const cardAmount = document.getElementById("shiftend-card-amount").value;
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
        cashierSessionSummary(responseData)


    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        return null;
    }
}


async function cashierSessionSummary(responseData) {
    document.getElementById("cashSettlementPopup").style.display = "flex";
    console.log(responseData);
    const startDateTime = responseData.data.startDateTime;
    const endDateTime = responseData.data.endDateTime;

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

    const formattedStartDateTime = formatDateTime(startDateTime);
    const formattedEndDateTime = formatDateTime(endDateTime);



    document.getElementById("summary-userId").value = `${localStorage.getItem("userId")}   ${localStorage.getItem("userName")}`;
    document.getElementById("summary-startFloat").value = responseData.data.startFloat
    document.getElementById("summary-startTime").value = formattedStartDateTime
    document.getElementById("summary-endFloat").value = responseData.data.endFloat
    document.getElementById("summary-endTime").value = formattedEndDateTime

    document.getElementById("actual-cash").innerText = responseData.data.cashAmount
    document.getElementById("actual-card").innerText = responseData.data.cardAmount
    document.getElementById("actual-credit").innerText = responseData.data.creditAmount
    document.getElementById("actual-tot").innerText = responseData.data.totalAmount

    document.getElementById("syst-cash").innerText = responseData.data.systemCashAmount
    document.getElementById("syst-card").innerText = responseData.data.systemCardAmount
    document.getElementById("syst-credit").innerText = responseData.data.systemCreditAmount
    document.getElementById("syst-tot").innerText = responseData.data.systemTotalAmount

    document.getElementById("vari-cash").innerText = responseData.data.cashVariance
    document.getElementById("vari-card").innerText = responseData.data.cardVariance
    document.getElementById("vari-credit").innerText = responseData.data.creditVariance
    document.getElementById("vari-tot").innerText = responseData.data.totalVariance



    const setVarianceColor = (elementId, varianceValue) => {
        const element = document.getElementById(elementId);
        if (parseFloat(varianceValue) > 0) {
            element.style.color = '#00cc00';
            //  element.innerText = `+${varianceValue}`;
        } else if (parseFloat(varianceValue) < 0) {
            element.style.color = '#ff3300';
        } else {
            element.style.color = '101A24';
        }
        element.innerText = varianceValue;
    };

    setVarianceColor("vari-cash", responseData.data.cashVariance);
    setVarianceColor("vari-card", responseData.data.cardVariance);
    setVarianceColor("vari-credit", responseData.data.creditVariance);
    setVarianceColor("vari-tot", responseData.data.totalVariance);


}






document.getElementById("btnDAdmin").addEventListener("click", function () {
    localStorage.setItem("action", "admin");
});

document.getElementById("btnsummary-close").addEventListener("click", function () {
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
});

document.querySelector("#shift-box-close-shiftend").addEventListener("click", function () {
    document.querySelector(".container").style.pointerEvents = "auto";
    document.querySelector(".navbar").style.pointerEvents = "auto";
    document.getElementById("shift_end").style.display = "none";
});



// function downloadAndShowPdf() {

//     const url = "http://localhost:8080/api/v1/payment/export?format=pdf";

//     fetch(url, {
//         method: 'GET',
//         headers: {
//             Accept: "application/json",
//             Authorization: `Bearer ${localStorage.getItem("jwt")}`,
//         }
//     })
//     .then(response => {
//         if (response.ok) {
//             return response.blob();
//         } else {
//             throw new Error('Failed to download PDF');
//         }
//     })
//     .then(blob => {
//         // Display PDF in the browser
//         const pdfUrl = URL.createObjectURL(blob);
//         const iframe = document.createElement('iframe');
//         iframe.style.display = 'none';
//         iframe.src = pdfUrl;
//         document.body.appendChild(iframe);
//         iframe.contentWindow.location.reload();  // Refresh to ensure it displays

//         // Optionally save the PDF to a location on the user's device
//         const link = document.createElement('a');
//         link.href = pdfUrl;
//         link.download = 'report.pdf';
//         link.click();

//         // Clean up
//         URL.revokeObjectURL(pdfUrl);
//         document.body.removeChild(iframe);
//     })
//     .catch(error => {
//         console.error('Error fetching and displaying PDF:', error);
//     });
// }

// Call the function with the desired format and type







