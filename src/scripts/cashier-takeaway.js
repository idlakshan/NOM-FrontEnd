
const dateAndTimeElement = document.getElementById("currentDateAndTime");
const takeawayPayOrderPanelOne = document.querySelector("#payOrder-panelOne");
const takeawayPayOrderPaneTwo = document.querySelector("#payOrder-panelTwo");
const takeawayPayOrderPanelThree = document.querySelector("#payOrder-panelThree");
const orderConfrimPanelTabOne = document.querySelector("#confrim-orderPanel-tabOne");
const orderConfrimPanelTabTwo = document.querySelector("#confrim-orderPanel-tabTwo");
const orderConfrimPanelTabThree = document.querySelector("#confrim-orderPanel-tabThree");

const toDineinToToggle = document.querySelector("#toDineinToggle")

const tabOne = document.getElementById("tab1");
const tabTwo = document.getElementById("tab2");
const tabThree = document.getElementById("tab3");

const container = document.querySelector(".container");

const alphabetArea = document.querySelector(".alphabetArea");
const categoryCardListArea = document.querySelector(".category-items-area");
const dishCardListArea = document.querySelector(".dishes-area");
const backTocategoryList = document.querySelector(".backButtonArea");
const letterButtons = document.querySelectorAll(".letter-btn");

const dishContentArea = document.querySelector(".dishes-area");
const popupArea = document.querySelector(".selectedDishPopup");

const orderConfrimPanelCloseTab1 = document.querySelector("#close_icon_orderConfrim1");
const orderConfrimPanelCloseTab2 = document.querySelector("#close_icon_orderConfrim2");
const orderConfrimPanelCloseTab3 = document.querySelector("#close_icon_orderConfrim3");


const btnPayTabOne = document.querySelector("#btnPayTab1");
const btnPayTabTwo = document.querySelector("#btnPayTab2");
const btnPayTabThree = document.querySelector("#btnPayTab3");

const orderDiscountTabOne = document.querySelector(".orderDiscountTabOne");
const orderNetTotalTabOne = document.querySelector(".orderNetTotalTabOne");
const orderBalanceTabOne = document.querySelector("#OrderBalanceTab1");

const orderDiscountTabTwo = document.querySelector(".orderDiscountTabTwo");
const orderNetTotalTabTwo = document.querySelector(".orderNetTotalTabTwo");
const orderBalanceTabTwo = document.querySelector("#OrderBalanceTab2");

const orderDiscountTabThree = document.querySelector(".orderDiscountTabThree");
const orderNetTotalTabThree = document.querySelector(".orderNetTotalTabThree");
const orderBalanceTabThree = document.querySelector("#OrderBalanceTab3");

const customerMobile = document.querySelector('#customer-mobile');
const customerMobileInputs = document.querySelectorAll('customer-mobile-input');

const customerNameTab1 = document.querySelector('#customer-name-tab1');
const customerNameTab2 = document.querySelector('#customer-name-tab2');
const customerNameTab3 = document.querySelector('#customer-name-tab3');
const inputMobileElementTab1 = document.querySelector(".inputCustomer-Mobile1");
const inputMobileElementTab2 = document.querySelector(".inputCustomer-Mobile2");
const inputMobileElementTab3 = document.querySelector(".inputCustomer-Mobile3");



const addCustomerBox = document.querySelector(".addCustomer-box");
const btnAddCustomer = document.querySelector(".btn-addcustomer");
const addCustomerBoxClose = document.querySelector(".addCustomer-box-close-icon");
const keypadButtons = document.querySelectorAll('.btns-addCustomer, .btns-addCustomer-number');
const mobileInput = document.getElementById('addCustomerMobile');
const nameInput = document.getElementById('addCustomerName');

const orderConfrimPanel = document.querySelector(".confrim-orderPanel");


const inPreparingContainer = document.querySelector(".in-preparing-container");
const btnInPreparing = document.querySelector(".inPreparing-bell");
const inPreparingContainerClose = document.querySelector(".inPreparing-container-close-icon");
const readyOrderContainer = document.querySelector("#ready-order-container");
const btnOrderReady = document.querySelector(".ready-bell");
const readyOrderClose = document.querySelector(".ready-container-close-icon");


const numbericKeypadOne = document.querySelector(".numberic-keypad1");
const numbericKeypadTwo = document.querySelector(".numberic-keypad2");
const numbericKeypadThree = document.querySelector(".numberic-keypad3");
const numberkeysOne = document.querySelectorAll('.letter-mobile1');
const keyEnterOne = document.querySelector(".enter-mobile1");
const keyBackspaceOne = document.querySelector(".delete-mobile1");

const numberkeysTwo = document.querySelectorAll('.letter-mobile2');
const keyEnterTwo = document.querySelector(".enter-mobile2");
const keyBackspaceTwo = document.querySelector(".delete-mobile2");
const numberkeysThree = document.querySelectorAll('.letter-mobile3');
const keyEnterThree = document.querySelector(".enter-mobile3");
const keyBackspaceThree = document.querySelector(".delete-mobile3");

const orderConfrimTab1 = document.querySelector("#btnConfrimTabOne")
const orderConfrimTab2 = document.querySelector("#btnConfrimTabTwo")
const orderConfrimTab3 = document.querySelector("#btnConfrimTabThree")

const totalTab1 = document.querySelector("#totalTab1")
const totalTab2 = document.querySelector("#totalTab2")
const totalTab3 = document.querySelector("#totalTab3")

const selectedItemsContainer1 = document.querySelector("#takeawayPanelOne-container");
const selectedItemsContainer2 = document.querySelector("#takeawayPanelTwo-container");
const selectedItemsContainer3 = document.querySelector("#takeawayPanelThree-container");


const inputCashTabOne = document.querySelector("#inputpaycashOne");
const inputCardTabOne = document.querySelector("#inputpaycardOne");
const inputCreditTabOne = document.querySelector("#inputpaycreditOne");

const inputCashTabTwo = document.querySelector("#inputpaycashTwo");
const inputCardTabTwo = document.querySelector("#inputpaycardTwo");
const inputCreditTabTwo = document.querySelector("#inputpaycreditTwo");

const inputCashTabThree = document.querySelector("#inputpaycashThree");
const inputCardTabThree = document.querySelector("#inputpaycardThree");
const inputCreditTabThree = document.querySelector("#inputpaycreditThree");


const keypadButtonOrderTabOne = document.querySelectorAll('.letter-order-tabOne');
const keypadButtonOrderTabTwo = document.querySelectorAll('.letter-order-tabTwo');
const keypadButtonOrderTabThree = document.querySelectorAll('.letter-order-tabThree');

const customerSaveBtn = document.getElementById("btnSaveCustomer");

const orderIdElementTabOne = document.getElementById("orderId_panalOne")
const orderIdElementTabTwo = document.getElementById("orderId_panalTwo")
const orderIdElementTabThree = document.getElementById("orderId_panalThree")
const takeAwayOrderkeypadButton = document.querySelectorAll('.letter-order');
// const paymentWarningTab1 = document.getElementById('paymentWarningTab1');
// const paymentWarningTab2 = document.getElementById('paymentWarningTab2');
// const paymentWarningTab3 = document.getElementById('paymentWarningTab1');

let selectedInputOrderTabOne;
let selectedInputOrderTabTwo;
let selectedInputOrderTabThree;

let selectedInput;

let orderIds;

let activeTab = 1;

let currentlyFocusedInput = null;

let selectedCustomerNameTabOne;
let selectedCustomerIdTabOne;
let selectedCustomerMobileTabOne;
let selectCusCreditStatusTabOne

let selectedCustomerNameTabTwo;
let selectedCustomerIdTabTwo;
let selectedCustomerMobileTabTwo;
let selectCusCreditStatusTabTwo

let selectedCustomerNameTabThree;
let selectedCustomerIdTabThree;
let selectedCustomerMobileTabThree;
let selectCusCreditStatusTabThree

let currentlyFocusedPaymentInput = null;

let selectedInputTkOrder;
document.addEventListener("DOMContentLoaded", async function () {
    const baseUrl = await window.api.getBaseUrl();
    const dishImagePath = await window.api.getImagePath();
    //auth-check
    window.api.checkLogUser();
    init(baseUrl);

    setInterval(updateTime, 1000);

    tabEvenet(baseUrl);
    loadAllCategory(baseUrl, dishImagePath);
    //loadDishes(baseUrl);
    searchCustomersTakeaway(baseUrl);
    addCustomerEvent();
    // takeawaySaveCustomerEvent(baseUrl);
    selectCustomerMobileEvent();
    getOrderIdTabOne(baseUrl)

    payTkOrdersKeyboardEvent()

    inputCashTabOne.addEventListener("focus", () => {
        selectedInputOrderTabOne = inputCashTabOne;
    });

    inputCardTabOne.addEventListener("focus", () => {
        selectedInputOrderTabOne = inputCardTabOne;
    });

    inputCreditTabOne.addEventListener("focus", () => {
        selectedInputOrderTabOne = inputCreditTabOne;
    });

    orderDiscountTabOne.addEventListener("focus", () => {
        selectedInputOrderTabOne = orderDiscountTabOne;
    });



    inputCashTabTwo.addEventListener("focus", () => {
        selectedInputOrderTabTwo = inputCashTabTwo;
    });

    inputCardTabTwo.addEventListener("focus", () => {
        selectedInputOrderTabTwo = inputCardTabTwo;
    });

    inputCreditTabTwo.addEventListener("focus", () => {
        selectedInputOrderTabTwo = inputCreditTabTwo;
    });

    orderDiscountTabTwo.addEventListener("focus", () => {
        selectedInputOrderTabTwo = orderDiscountTabTwo;
    });


    inputCashTabThree.addEventListener("focus", () => {
        selectedInputOrderTabThree = inputCashTabThree;
    });

    inputCardTabThree.addEventListener("focus", () => {
        selectedInputOrderTabThree = inputCardTabThree;
    });

    inputCreditTabThree.addEventListener("focus", () => {
        selectedInputOrderTabThree = inputCreditTabThree;
    });

    orderDiscountTabThree.addEventListener("focus", () => {
        selectedInputOrderTabThree = orderDiscountTabThree;
    });

    document.getElementById("btnStartShift").addEventListener("click", async function () {
        const baseUrl = await window.api.getBaseUrl();
        sendStartShift(baseUrl)
    });

    document.getElementById("btnShiftEnd").addEventListener("click", async function () {
        const baseUrl = await window.api.getBaseUrl();
        sendEndShift(baseUrl)
    })

    customerSaveBtn.addEventListener("click",function(){
        takeawaySaveCustomerEvent(baseUrl);
    });
 

});
async function init(baseUrl) {
    const role = localStorage.getItem("role");
    const userId = localStorage.getItem("userId");

    if (role === "Admin") {
        const isActiveAdmin = await checkAdminSession(baseUrl, userId);
        // console.log(isActiveAdmin);

        if (!isActiveAdmin) {
            // console.log("hii");
            Swal.fire({
                title: "Confirmation",
                text: "Are you sure you want to Start a Shift?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#EA6D27",
                cancelButtonColor: "#101A24",
                confirmButtonText: "Yes, Start!"
            }).then((result) => {
                if (result.isConfirmed) {
                    checkCashierSession(baseUrl, userId);
                    localStorage.setItem('sessionStarted', 'true');
                } else {
                    dishCardListArea.style.pointerEvents = "none";
                    localStorage.setItem('sessionStarted', 'false');
                }
            });
        } else {

            // Handle the case where the admin session is active
        }
    } else if (role === "cashier") {
        checkCashierSession(baseUrl, userId);
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
    dateAndTimeElement.innerHTML = formattedDate;
}


// =============Tab Move Events=============
function togglePanels(panelToShow) {
    const panels = ["payOrder-panelOne", "payOrder-panelTwo", "payOrder-panelThree"];

    panels.forEach(panel => {
        const displayStyle = panel === panelToShow ? "block" : "none";
        document.getElementById(panel).style.display = displayStyle;
    });

}


function tabEvenet(baseUrl) {
    takeawayPayOrderPanelOne.style.display = 'block'
    takeawayPayOrderPaneTwo.style.display = 'none';
    takeawayPayOrderPanelThree.style.display = 'none';

    tabOne.addEventListener("click", function () {
        togglePanels("payOrder-panelOne");
        tabOne.classList.add('active');
        tabTwo.classList.remove('active');
        tabThree.classList.remove('active');
        activeTab = 1;
        hideAllNumericKeypads();
        getOrderIdTabOne(baseUrl)
    });

    tabTwo.addEventListener("click", function () {
        togglePanels("payOrder-panelTwo");
        tabTwo.classList.add('active');
        tabOne.classList.remove('active');
        tabThree.classList.remove('active');
        activeTab = 2;
        hideAllNumericKeypads();
        getOrderIdTabTwo(baseUrl)
    });

    tabThree.addEventListener("click", function () {
        togglePanels("payOrder-panelThree");
        tabThree.classList.add('active');
        tabTwo.classList.remove('active');
        tabOne.classList.remove('active');
        activeTab = 3;
        hideAllNumericKeypads();
        getOrderIdTabThree(baseUrl);
    });

}



// =============Load All Categories=============
async function loadAllCategory(baseUrl, dishImagePath) {
    try {
        const response = await fetch(baseUrl + "/Categorry", {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("jwt")}`,
            },
        });
        const categories = await response.json();

        let categoryList = "";

        for (let i = 0; i < categories.data.length; i++) {
            categoryList += `
            <div class="catergory-card">
            <h3 class="catergory-card-title">${categories.data[i].categorryName}</h3>
            </div>
            `;

            categoryCardListArea.innerHTML = categoryList;
        }

        const categoryCardList = document.querySelectorAll(".catergory-card");
        selectCategoryCardEvent(baseUrl, categoryCardList, dishImagePath);

    } catch (error) {
        console.error("Error fetching category data:", error);
    }
}


function validateMobileInput(panelNumber) {
    const mobileInputId = `inputCustomer-Mobile${panelNumber}`;
    const mobileInput = document.getElementById(mobileInputId);
    if (!mobileInput.value) {
        Swal.fire({
            title: "Oops...",
            text: `Please select the Customer in Tab${panelNumber}`,
            icon: "warning",
            customClass: {
                confirmButton: 'alert-orange-button',
            }
        });
        return false;
    }
    return true;
}



// =============selectCategoryCardEvent=============
function selectCategoryCardEvent(baseUrl, categoryCardList, dishImagePath) {
    categoryCardList.forEach((categoryCard) => {
        categoryCard.addEventListener("click", function () {
            const currentCategoryCard = categoryCard;
            let activePanelNumber;
            if (takeawayPayOrderPanelOne.style.display === 'block') {
                activePanelNumber = 1;
            } else if (takeawayPayOrderPaneTwo.style.display === 'block') {
                activePanelNumber = 2;
            } else if (takeawayPayOrderPanelThree.style.display === 'block') {
                activePanelNumber = 3;
            }

            if (!validateMobileInput(activePanelNumber)) return;

            categoryCardListArea.style.display = "none";
            dishCardListArea.style.display = "flex";
            alphabetArea.style.display = "flex";

            const selectedCategoryCardName = currentCategoryCard.querySelector(".catergory-card-title").innerText;
            loadDishes(baseUrl, selectedCategoryCardName, dishImagePath);
        });
    });

    backTocategoryList.addEventListener('click', function () {
        categoryCardListArea.style.display = "flex"
        dishCardListArea.style.display = "none"
        alphabetArea.style.display = "none"
    })

}




// =============Load All dishes=============
async function loadDishes(baseUrl, selectedCategoryCardName, dishImagePath) {
    try {
        const response = await fetch(baseUrl + "/dish?category=" + selectedCategoryCardName, {
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
                 <div class="dishcard" data-index="${i}" data-name="${dishes.data[i].dishName.toLowerCase()}" data-category="${dishes.data[i].dishCategory.toLowerCase()}"  data-acategory="${dishes.data[i].dishCategory.toLowerCase()}"    >
                     <div class="dishcard-image">
                         <img class="cashier-dishImg" src="${imageUrl}"width="170px" height="110px" style="margin-bottom: 3px; border-radius: 30px;" alt="">
                     </div>
                     <div class="dishcard-title">
                         <h3 class="dish-title">${dishes.data[i].dishName}</h3>
                     </div>
                 </div> 
                 
                 `;

            dishContentArea.innerHTML = dishCardsList;
        }
        const dishCards = document.querySelectorAll(".dishcard");
        searchDishByLettera(dishCards)
        selectedDishPopupTabOne(baseUrl, dishes.data, dishCards);
        selectedDishPopupTabTwo(baseUrl, dishes.data, dishCards);
        selectedDishPopupTabThree(baseUrl, dishes.data, dishCards);


    } catch (error) {
        console.error("Error fetching category data:", error);
    }
}


//=======================================tab One Process================================================================
function selectedDishPopupTabOne(baseUrl, dishes, dishCards) {
    dishCards.forEach((dishCard) => {
        dishCard.addEventListener("click", function () {
            if (activeTab === 1) {
                //console.log("hello");
                const index = dishCard.getAttribute("data-index");
                displayPopupTabOne(baseUrl, dishes, index);
            }
        });
    });
}

//========select dish card's popup open TabOne==================
let lastSelectedSizeTabOne = null;
function displayPopupTabOne(baseUrl, dishes, index) {
    const clickedDish = dishes[index];
    // console.log(clickedDish);
    popupArea.innerHTML = `
    
        <div class="dishesBox-head" data-id="${clickedDish.dishId}">
            <h4 class="dishesBox-title">${clickedDish.dishName}</h4>
            <img class="dishesBox-close-icon" src="../icons/close_icon.png" alt="">
        </div>
        <div class="dishesBox-body">
        <div class="dishesBox-body-left">
        <div class="qty-input-container">
            <button class="qty-input-btn" id="qty-input-btn-minus" disabled>-</button>
            <input class="qty-input" type="text">
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
            <button class="btn-submit btn-addItem btn-addItem-dinein" disabled>Add Item</button>
        </div>

        `;

    popupArea.style.display = "block";

    //select dish card's popup close TabOne
    const popupBoxClose = document.querySelector(".dishesBox-close-icon");
    popupBoxClose.addEventListener('click', function () {
        popupArea.style.display = "none";
    });


    const sizeBtnContainersTabOne = document.querySelectorAll(".size-input-container");
    const sizeBtns = document.querySelectorAll(".size-btn");
    const dishSizeInputTabOne = document.querySelector(".qty-input");
    const btnAddItem = document.querySelector(".btn-addItem");
    const btnInputNumbers = document.querySelectorAll(".btn-number:not(.btn-number-backspace)");
    const btnBackspaceNumbers = document.querySelector(".btn-number-backspace");
    const btnPlus = document.querySelector("#qty-input-btn-plus");
    const btnMinus = document.querySelector("#qty-input-btn-minus");
    const dishBoxTitle = document.querySelector(".dishesBox-title");
    const dishesBoxHead = document.querySelector('.dishesBox-head');
    const dishCardId = dishesBoxHead.getAttribute('data-id');




    //============dishes-Size-buttons disabled-enabled============
    sizeBtnContainersTabOne.forEach((sizeBtnContainerTabOne) => {
        sizeBtnContainerTabOne.addEventListener("click", function () {
            sizeBtnContainerTabOne.classList.remove('disabledDishSizeContainer');

            disableOtherDishSizeContaiersTabOne(sizeBtnContainerTabOne);
        });
    });

    function disableOtherDishSizeContaiersTabOne(selectDishSizeBtnContainerTabOne) {
        sizeBtnContainersTabOne.forEach((dishSizebuttonContainerTabOne) => {
            if (dishSizebuttonContainerTabOne !== selectDishSizeBtnContainerTabOne) {
                dishSizebuttonContainerTabOne.classList.add('disabledDishSizeContainer');
            }
        });
    }

    //select dish size event
    let plusClickListenerTabOne, minusClickListenerTabOne;
    let clickedSelectedDishQtyNumbersTabOne = "1";
    let clearedTabOne = false;

    sizeBtnContainersTabOne.forEach((sizeBtnContainerTabOne) => {
        const sizeBtnImg = sizeBtnContainerTabOne.querySelector(".size-btn-img");
        let isClickedTabOne = false;

        function attachNumberPadListenersTabOne() {
            btnInputNumbers.forEach((btnInputNumber) => {
                btnInputNumber.disabled = false;
                btnInputNumber.removeEventListener("click", handleNumberClickTabOne);
                btnInputNumber.addEventListener("click", handleNumberClickTabOne);
            });
            dishSizeInputTabOne.addEventListener("input", handleInputTabOne);
            btnBackspaceNumbers.addEventListener("click", handleBackspaceTabOne);
        }

        function handleNumberClickTabOne() {
            const clickedNumber = this.innerHTML;
            // console.log("Clicked number:", clickedNumber);
            if (clearedTabOne) {
                clickedSelectedDishQtyNumbersTabOne = clickedNumber;
                clearedTabOne = false;
            } else {
                clickedSelectedDishQtyNumbersTabOne += clickedNumber;
            }
            dishSizeInputTabOne.value = clickedSelectedDishQtyNumbersTabOne;
        }

        function handleInputTabOne() {
            if (this.value === "") {
                clearedTabOne = true;
            }
        }

        function handleBackspaceTabOne() {
            clickedSelectedDishQtyNumbersTabOne = clickedSelectedDishQtyNumbersTabOne.slice(0, -1);
            dishSizeInputTabOne.value = clickedSelectedDishQtyNumbersTabOne;

            if (dishSizeInputTabOne.value === "") {
                dishSizeInputTabOne.value = "1";
                clickedSelectedDishQtyNumbersTabOne = "1";
            }
        }

        function attachPlusMinusListenersTabOne() {
            btnPlus.removeEventListener('click', plusClickListenerTabOne);
            btnMinus.removeEventListener('click', minusClickListenerTabOne);

            plusClickListenerTabOne = function () {
                const currentValue = parseInt(dishSizeInputTabOne.value);
                clickedSelectedDishQtyNumbersTabOne = (currentValue + 1).toString();
                dishSizeInputTabOne.value = clickedSelectedDishQtyNumbersTabOne;
            };

            minusClickListenerTabOne = function () {
                const currentValue = parseInt(dishSizeInputTabOne.value);
                if (currentValue > 1) {
                    clickedSelectedDishQtyNumbersTabOne = (currentValue - 1).toString();
                    dishSizeInputTabOne.value = clickedSelectedDishQtyNumbersTabOne;
                }
            };

            btnPlus.addEventListener('click', plusClickListenerTabOne);
            btnMinus.addEventListener('click', minusClickListenerTabOne);
        }


        sizeBtnContainerTabOne.addEventListener("click", function () {
            isClickedTabOne = !isClickedTabOne

            if (isClickedTabOne) {
                lastSelectedSizeTabOne = sizeBtnContainerTabOne
                btnPlus.disabled = false;
                btnMinus.disabled = false;

                //============change popupBox sizebtn colored and icon by clicked it============
                sizeBtnContainerTabOne.style.border = "2px solid var(--text-field-success)";
                sizeBtnImg.src = "../icons/correct.png";
                sizeBtnImg.style.width = "40px";
                sizeBtnImg.style.height = "40px";
                dishSizeInputTabOne.disabled = false;
                btnBackspaceNumbers.disabled = false
                btnAddItem.disabled = false;
                dishSizeInputTabOne.value = "1";
                clickedSelectedDishQtyNumbersTabOne = "1";
                clearedTabOne = false;

                attachNumberPadListenersTabOne();
                attachPlusMinusListenersTabOne();

            } else {
                lastSelectedSizeTabOne = null;
                sizeBtnContainerTabOne.style.border = "none";
                sizeBtnImg.src = "../icons/plusicon.png";
                sizeBtnImg.style.width = "50px";
                sizeBtnImg.style.height = "50px";
                dishSizeInputTabOne.value = "";
                dishSizeInputTabOne.disabled = true;
                btnPlus.disabled = true;
                btnMinus.disabled = true;
                btnBackspaceNumbers.disabled = true


                btnInputNumbers.forEach((btnInputNumber) => {
                    btnInputNumber.disabled = true;
                });

                btnPlus.removeEventListener('click', plusClickListenerTabOne);
                btnMinus.removeEventListener('click', minusClickListenerTabOne);

                btnInputNumbers.forEach((btnInputNumber) => {
                    btnInputNumber.removeEventListener("click", handleNumberClickTabOne);
                });

                dishSizeInputTabOne.removeEventListener("input", handleInputTabOne);
                btnBackspaceNumbers.removeEventListener("click", handleBackspaceTabOne);
            }

        });

    });


    //added cart to selected items-TabOne
    btnAddItem.addEventListener("click", function () {
        if (lastSelectedSizeTabOne) {
            addItemToOrderItemsTabOne(baseUrl, "Take-Away");
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

    function addItemToOrderItemsTabOne(baseUrl, itemType) {
        if (!lastSelectedSizeTabOne) {
            return;
        }
        //  btnPayTabOne.disabled=false
        const orderItemsContainer = document.querySelector("#takeawayPanelOne-container");
        const orderItemtitleName = dishBoxTitle.innerText;
        const orderItemInputQty = dishSizeInputTabOne.value;
        const selectedSizeNameTabOne = lastSelectedSizeTabOne.querySelector('.size-btn').innerText;
        const selectedSizePriceTabOne = lastSelectedSizeTabOne.querySelector('.size-input').innerText;
        const orderType = itemType

        const total = orderItemInputQty * parseFloat(selectedSizePriceTabOne);

        const selectItemCards = document.querySelectorAll(".selectItemCardTab1");
        let itemExistsTabOne = false;

        for (let i = 0; i < selectItemCards.length; i++) {
            const selectItemCard = selectItemCards[i];
            const selectItemCardName = selectItemCard.querySelector(".selectItemNameTab1").innerText;
            const selectItemCardSize = selectItemCard.querySelector(".selectItemSizeTab1").innerText;
            const selectItemCardType = selectItemCard.querySelector(".selectItemTypeTab1").innerText;
            const selectItemCardQty = selectItemCard.querySelector(".selectItemQtyTab1");


            if (selectItemCardName === orderItemtitleName && selectItemCardSize === selectedSizeNameTabOne && selectItemCardType === orderType) {


                const priceElement = selectItemCard.querySelector(".selectItemPriceTab1");

                const currentQty = parseInt(selectItemCardQty.innerText);
                var newQty = currentQty + parseInt(orderItemInputQty);
                selectItemCardQty.innerText = newQty;


                const currentPrice = parseFloat(priceElement.innerText);
                const newPrice = currentPrice + total;
                priceElement.innerText = newPrice;

                itemExistsTabOne = true;
                popupArea.style.display = "none";

                break;
            }
        }

        if (!itemExistsTabOne) {
            const selectOrderItemCards = document.createElement("div");
            selectOrderItemCards.classList.add("selectItemCard");
            selectOrderItemCards.classList.add("selectItemCardTab1");
            selectOrderItemCards.innerHTML = ` 
                                <div class="selectItemCard-left">
                                    <div class="selectItemCard-head">
                                    <h1 class="selectItemId" style="display:none">${dishCardId}</h1>
                                        <h5 class="selectItemName selectItemNameTab1">${orderItemtitleName}</h5>
                                        <h5 class="selectItemSize selectItemSizeTab1">${selectedSizeNameTabOne}</h5>
                                        <h5 class="selectItemPrice selectItemPriceTab1">${total}</h5>
                                    </div>
        
                                    <div class="selectItemCard-bottom">
                                        <h5 class="selectItemType selectItemTypeTab1">${itemType}</h5>
                                        <h5 class="selectItemQty selectItemQtyTab1">${orderItemInputQty}</h5> 
                                    </div>
                                </div>
                                <div class="selectItemCard-right">
                                    <img class="imgDustbin" src="../icons/dustbin.png"  width="50%"
                                    alt="">
                                </div>
                            `;
            selectOrderItemCards.style.display = "flex";
            orderItemsContainer.appendChild(selectOrderItemCards);
            popupArea.style.display = "none";
        }
        btnPayButtonTabOneValidateEvent(orderItemsContainer)




        //============delete selected items from the order cart============
        const selectedOrderItemsDelete = document.querySelectorAll(".imgDustbin");
        selectedOrderItemsDelete.forEach((selectedOrderItemDelete) => {
            selectedOrderItemDelete.addEventListener("click", function () {
                //console.log("delete");
                const selectItemCard = selectedOrderItemDelete.closest(".selectItemCard");
                if (selectItemCard) {
                    selectItemCard.remove();
                    CalculateFullTotalTabOne();
                    btnPayButtonTabOneValidateEvent(orderItemsContainer)
                }
            });
        });
        CalculateFullTotalTabOne();
        popupArea.style.display = "none";

    }

}


function btnPayButtonTabOneValidateEvent(orderItemsContainer) {
    const hasItems = orderItemsContainer.children.length > 0;
    const isMobileEmpty = inputMobileElementTab1.value.trim() === "";
    const isNameEmpty = customerNameTab1.value.trim() === "";


    btnPayTabOne.disabled = !hasItems || isMobileEmpty || isNameEmpty

}

//============calcutale full total-TabOne============
function CalculateFullTotalTabOne() {
    let fullTotalTabOne = parseFloat(0.0);
    const fullTotalElement = document.querySelector(".totalTab1");
    const selectedOrderItemsTotal = document.querySelectorAll(".selectItemPriceTab1");
    const subTotal = document.querySelector("#subTotalTab1");

    selectedOrderItemsTotal.forEach((selectedOrderItemTotal) => {
        const value = selectedOrderItemTotal.innerText;
        fullTotalTabOne += parseFloat(value);
    });

    // console.log(fullTotal);
    fullTotalElement.value = fullTotalTabOne.toFixed(2);
    subTotal.innerText = fullTotalTabOne.toFixed(2);

}

function btnPayClickHandlerTabOne(subTotalValue) {
    // console.log("click");
    orderConfrimPanelTabOne.style.display = "flex";
    container.classList.add("container-disabled");

    const newSubTotal = subTotalValue;
    orderNetTotalTabOne.innerText = newSubTotal;
    orderBalanceTabOne.innerText = newSubTotal;
    orderDiscountTabOne.addEventListener("input", function (event) {
        const discount = orderDiscountTabOne.value;
        const calcNetTotal = (newSubTotal - ((newSubTotal * discount) / 100));
        orderNetTotalTabOne.innerText = calcNetTotal.toFixed(2);
        orderBalanceTabOne.innerText = orderNetTotalTabOne.innerText;
    });
    setupPaymentType("One");
}


btnPayTabOne.addEventListener('click', function () {
    if (!inputMobileElementTab1.value) {
        Swal.fire({
            title: "Oops...",
            text: 'Please select the Customer',
            icon: "warning",
            customClass: {
                confirmButton: 'alert-orange-button',
            }
        });
        return
    }

    if (selectCusCreditStatusTabOne === "Disabled" || inputMobileElementTab1.value === "unKnown") {
        inputCreditTabOne.disabled = true
    } else if (selectCusCreditStatusTabOne === "Enabled") {
        inputCreditTabOne.disabled = false
    }
    const subTotalValue = document.querySelector("#subTotalTab1").innerText;
    btnPayClickHandlerTabOne(subTotalValue);
});



orderConfrimPanelCloseTab1.addEventListener("click", function () {
    orderConfrimPanelTabOne.style.display = "none"
    container.classList.remove("container-disabled");
})


//=====payOrder keyboard input event TabOne==============
function payOrderKeyboardEventTabOne() {
    keypadButtonOrderTabOne.forEach((button) => {
        button.addEventListener("click", handleButtonClickTabOne);
    });
}

function handleButtonClickTabOne(event) {
    const buttonValue = event.target.textContent;

    if (selectedInputOrderTabOne) {
        if (buttonValue === '←') {
            selectedInputOrderTabOne.value = selectedInputOrderTabOne.value.slice(0, -1);
        } else if (buttonValue === '.') {
            selectedInputOrderTabOne.value += '.';
        } else if (buttonValue === 'Enter') {

        } else {
            if (selectedInputOrderTabOne.value === "0.00") {
                selectedInputOrderTabOne.value = "";
            }
            selectedInputOrderTabOne.value += buttonValue;
        }

        const inputEvent = new Event('input', {
            bubbles: true,
            cancelable: true,
        });
        selectedInputOrderTabOne.dispatchEvent(inputEvent);
    }
}

//================= Function to collect order details=============
function collectOrderDetailsTabOne() {
    const selectItemCards = document.querySelectorAll(".selectItemCardTab1");
    const orderDetails = [];
    const odId = orderIdElementTabOne.value
    selectItemCards.forEach(selectItemCard => {
        const dishId = selectItemCard.querySelector(".selectItemId").innerText;
        const dishName = selectItemCard.querySelector(".selectItemName").innerText;
        const dishSize = selectItemCard.querySelector(".selectItemSize").innerText;
        const orderPrice = parseFloat(selectItemCard.querySelector(".selectItemPrice").innerText);

        const orderType = selectItemCard.querySelector(".selectItemType").innerText;
        const orderQty = parseInt(selectItemCard.querySelector(".selectItemQty").innerText);
        const unitPrice = orderPrice / orderQty

        orderDetails.push({
            dishId,
            odId,
            dishName,
            dishSize,
            orderPrice,
            orderType,
            orderQty,
            unitPrice
        });
    });

    return orderDetails;
}

//================Save order tab one==============
async function ConfirmOrderTabOne(baseUrl) {
    const customerObj = {
        cusId: selectedCustomerIdTabOne,
        cusMobileNo: selectedCustomerMobileTabOne,
        cusName: selectedCustomerNameTabOne,
        cusStatus: 1
    };

    const orderId = document.getElementById("orderId_panalOne").value;
    const netTotal = parseFloat(orderNetTotalTabOne.innerText);
    const orderDetails = collectOrderDetailsTabOne();


    try {
        const response = await fetch(baseUrl + "/orders/", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("jwt")}`
            },
            body: JSON.stringify({
                orderId: orderId,
                orderDateAndTime: new Date().toISOString(),
                tabNo: "0",
                netTotal: netTotal,
                orderStatus: "close",
                tableId: "TAB-1",
                cashierName: localStorage.getItem("userName"),
                userId: localStorage.getItem("userId"),
                tblcustomer: customerObj,
                orderDetails: orderDetails,
            })


        });

        if (!response.ok) {
            throw new Error('Failed to save order');
        }

        const data = await response.json();
        //   console.log(data);
        await confirmPaymetTabOne(baseUrl, orderId);

    } catch (error) {
        console.error("Error in ConfirmOrderTabOne: ", error);
        throw error;
    }
}

async function confirmPaymetTabOne(baseUrl, orderId) {
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
    const balance = document.getElementById("OrderBalanceTab1").textContent;
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
                        customerId: selectedCustomerIdTabOne,
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
            throw new Error('Failed to process payment');
        }

        const data = await response.json();
        //console.log(data);
        // getBillReport(baseUrl);

    } catch (error) {
        console.error("Error in confirmPaymetTabOne: ", error);
        throw error;
    }
}

//================Order Confirmation and Payment Handling==============
orderConfrimTab1.addEventListener("click", async function () {
    try {
        const baseUrl = await window.api.getBaseUrl();
        await ConfirmOrderTabOne(baseUrl);

        Swal.fire({
            title: "Payment Successfully!",
            text: "Order has been successfully placed. Thank you!",
            icon: "success",
            confirmButtonColor: "#EA6D27",
            confirmButtonText: "OK"
        }).then((result) => {
            if (result.isConfirmed) {
                orderConfrimPanelTabOne.style.display = "none";
                container.classList.remove("container-disabled");
                inputMobileElementTab1.value = "";
                customerNameTab1.value = "";
                totalTab1.value = "";
                selectedItemsContainer1.innerHTML = "";
                getOrderIdTabOne(baseUrl)
                btnPayButtonTabOneValidateEvent(selectedItemsContainer1);
                categoryCardListArea.style.display = "flex";
                dishCardListArea.style.display = "none";
                alphabetArea.style.display = "none";
                inputCashTabOne.value = "0.00";
                inputCardTabOne.value = "0.00";
                inputCreditTabOne.value = "0.00";
                orderConfrimTab1.disabled = true
                downloadAndShowPdf(baseUrl)

            }
        });

    } catch (error) {
        console.error("Order confirmation failed: ", error);
        Swal.fire({
            title: "Error",
            text: "There was an issue placing the order. Please try again.",
            icon: "error",
            confirmButtonColor: "#EA6D27",
            confirmButtonText: "OK"
        });
    }
});





//=======================================tab Two Process================================================================
function selectedDishPopupTabTwo(baseUrl, dishes, dishCards) {
    dishCards.forEach((dishCard) => {
        dishCard.addEventListener("click", function () {
            if (activeTab === 2) {
                // console.log("hello tab2");
                const index = dishCard.getAttribute("data-index");
                displayPopupTabTwo(baseUrl, dishes, index);
            }
        });
    });
}

let lastSelectedSizeTabTwo = null;
function displayPopupTabTwo(baseUrl, dishes, index) {
    const clickedDish = dishes[index];

    popupArea.innerHTML = `

        <div class="dishesBox-head" data-id="${clickedDish.dishId}">
            <h4 class="dishesBox-title">${clickedDish.dishName}</h4>
            <img class="dishesBox-close-icon" src="../icons/close_icon.png" alt="">
        </div>
        <div class="dishesBox-body">
        <div class="dishesBox-body-left">
        <div class="qty-input-container">
            <button class="qty-input-btn" id="qty-input-btn-minus" disabled>-</button>
            <input class="qty-input" type="text">
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

        <div class="size-input-container"  style="${clickedDish.dishLargePrice === 0 ? 'pointer-events: none; opacity: 0.5;' : ''}">
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
            <button class="btn-addItem btn-addItem-dinein" disabled>Add Item</button>
        </div>

        `;

    popupArea.style.display = "block";


    //select dish card's popup close TabTwo
    const popupBoxClose = document.querySelector(".dishesBox-close-icon");
    popupBoxClose.addEventListener('click', function () {
        popupArea.style.display = "none";
    });


    const sizeBtnContainersTabTwo = document.querySelectorAll(".size-input-container");
    const sizeBtns = document.querySelectorAll(".size-btn");
    const dishSizeInputTabTwo = document.querySelector(".qty-input");
    const btnAddItem = document.querySelector(".btn-addItem");
    const btnInputNumbers = document.querySelectorAll(".btn-number:not(.btn-number-backspace)");
    const btnBackspaceNumbers = document.querySelector(".btn-number-backspace");
    const btnPlus = document.querySelector("#qty-input-btn-plus");
    const btnMinus = document.querySelector("#qty-input-btn-minus");
    const dishBoxTitle = document.querySelector(".dishesBox-title");
    const dishesBoxHead = document.querySelector('.dishesBox-head');
    const dishCardId = dishesBoxHead.getAttribute('data-id');




    //============dishes-Size-buttons disabled-enabled============
    sizeBtnContainersTabTwo.forEach((sizeBtnContainerTabTwo) => {
        sizeBtnContainerTabTwo.addEventListener("click", function () {
            sizeBtnContainerTabTwo.classList.remove('disabledDishSizeContainer');

            disableOtherDishSizeContaiersTabTwo(sizeBtnContainerTabTwo);
        });
    });

    function disableOtherDishSizeContaiersTabTwo(dishSizeBtnContainerTabTwo) {
        sizeBtnContainersTabTwo.forEach((selectDishSizeBtnContainerTabTwo) => {
            if (selectDishSizeBtnContainerTabTwo !== dishSizeBtnContainerTabTwo) {
                selectDishSizeBtnContainerTabTwo.classList.add('disabledDishSizeContainer');
            }
        });
    }

    //select dish size event
    let plusClickListenerTabTwo, minusClickListenerTabTwo;
    let clickedSelectedDishQtyNumbersTabTwo = "1";
    let clearedTabTwo = false;

    sizeBtnContainersTabTwo.forEach((sizeBtnContainerTabTwo) => {
        const sizeBtnImg = sizeBtnContainerTabTwo.querySelector(".size-btn-img");
        let isClickedTabTwo = false;

        function attachNumberPadListenersTabTwo() {
            btnInputNumbers.forEach((btnInputNumber) => {
                btnInputNumber.disabled = false;
                btnInputNumber.removeEventListener("click", handleNumberClickTabTwo);
                btnInputNumber.addEventListener("click", handleNumberClickTabTwo);
            });
            dishSizeInputTabTwo.addEventListener("input", handleInputTabTwo);
            btnBackspaceNumbers.addEventListener("click", handleBackspaceTabTwo);
        }

        function handleNumberClickTabTwo() {
            const clickedNumber = this.innerHTML;
            // console.log("Clicked number:", clickedNumber);
            if (clearedTabTwo) {
                clickedSelectedDishQtyNumbersTabTwo = clickedNumber;
                clearedTabTwo = false;
            } else {
                clickedSelectedDishQtyNumbersTabTwo += clickedNumber;
            }
            dishSizeInputTabTwo.value = clickedSelectedDishQtyNumbersTabTwo;
        }

        function handleInputTabTwo() {
            if (this.value === "") {
                clearedTabTwo = true;
            }
        }

        function handleBackspaceTabTwo() {
            clickedSelectedDishQtyNumbersTabTwo = clickedSelectedDishQtyNumbersTabTwo.slice(0, -1);
            dishSizeInputTabTwo.value = clickedSelectedDishQtyNumbersTabTwo;

            if (dishSizeInputTabTwo.value === "") {
                dishSizeInputTabTwo.value = "1";
                clickedSelectedDishQtyNumbersTabTwo = "1";
            }
        }



        function attachPlusMinusListenersTabTwo() {
            btnPlus.removeEventListener('click', plusClickListenerTabTwo);
            btnMinus.removeEventListener('click', minusClickListenerTabTwo);

            plusClickListenerTabTwo = function () {
                const currentValue = parseInt(dishSizeInputTabTwo.value);
                clickedSelectedDishQtyNumbersTabTwo = (currentValue + 1).toString();
                dishSizeInputTabTwo.value = clickedSelectedDishQtyNumbersTabTwo;
            };

            minusClickListenerTabTwo = function () {
                const currentValue = parseInt(dishSizeInputTabTwo.value);
                if (currentValue > 1) {
                    clickedSelectedDishQtyNumbersTabTwo = (currentValue - 1).toString();
                    dishSizeInputTabTwo.value = clickedSelectedDishQtyNumbersTabTwo;
                }
            };

            btnPlus.addEventListener('click', plusClickListenerTabTwo);
            btnMinus.addEventListener('click', minusClickListenerTabTwo);
        }


        sizeBtnContainerTabTwo.addEventListener("click", function () {
            isClickedTabTwo = !isClickedTabTwo

            if (isClickedTabTwo) {
                lastSelectedSizeTabTwo = sizeBtnContainerTabTwo
                btnPlus.disabled = false;
                btnMinus.disabled = false;

                //============change popupBox sizebtn colored and icon by clicked it============
                sizeBtnContainerTabTwo.style.border = "2px solid var(--text-field-success)";
                sizeBtnImg.src = "../icons/correct.png";
                sizeBtnImg.style.width = "40px";
                sizeBtnImg.style.height = "40px";
                dishSizeInputTabTwo.disabled = false;
                btnBackspaceNumbers.disabled = false
                btnAddItem.disabled = false;
                dishSizeInputTabTwo.value = "1";
                clickedSelectedDishQtyNumbersTabTwo = "1";
                clearedTabTwo = false;

                attachNumberPadListenersTabTwo();
                attachPlusMinusListenersTabTwo();

            } else {
                lastSelectedSizeTabTwo = null;
                sizeBtnContainerTabTwo.style.border = "none";
                sizeBtnImg.src = "../icons/plusicon.png";
                sizeBtnImg.style.width = "50px";
                sizeBtnImg.style.height = "50px";
                dishSizeInputTabTwo.value = "";
                dishSizeInputTabTwo.disabled = true;
                btnPlus.disabled = true;
                btnMinus.disabled = true;
                btnBackspaceNumbers.disabled = true


                btnInputNumbers.forEach((btnInputNumber) => {
                    btnInputNumber.disabled = true;
                });

                btnPlus.removeEventListener('click', plusClickListenerTabTwo);
                btnMinus.removeEventListener('click', minusClickListenerTabTwo);

                btnInputNumbers.forEach((btnInputNumber) => {
                    btnInputNumber.removeEventListener("click", handleNumberClickTabTwo);
                });

                dishSizeInputTabTwo.removeEventListener("input", handleInputTabTwo);
                btnBackspaceNumbers.removeEventListener("click", handleBackspaceTabTwo);
            }

        });

    });


    //============added cart to selected items============

    btnAddItem.addEventListener("click", function () {
        if (lastSelectedSizeTabTwo) {
            addItemToOrderItemsTabTwo(baseUrl, "Take-Away");
        } else {
            Swal.fire({
                title: "Invalid Select",
                text: "Please select a valid dish.",
                icon: "warning",
                customClass: {
                    confirmButton: 'alert-orange-button',
                }
            });
        }

    });

    function addItemToOrderItemsTabTwo(baseUrl, itemType) {
        if (!lastSelectedSizeTabTwo) {
            return;
        }
        const orderItemsContainer = document.querySelector("#takeawayPanelTwo-container");
        const orderItemtitleName = dishBoxTitle.innerText;
        const orderItemInputQty = dishSizeInputTabTwo.value;
        const selectedSizeNameTabTwo = lastSelectedSizeTabTwo.querySelector('.size-btn').innerText;
        const selectedSizePriceTabTwo = lastSelectedSizeTabTwo.querySelector('.size-input').innerText;
        const orderType = itemType

        const total = orderItemInputQty * parseFloat(selectedSizePriceTabTwo);

        const selectItemCards = document.querySelectorAll(".selectItemCardTab2");
        let itemExistsTabTwo = false;

        for (let i = 0; i < selectItemCards.length; i++) {
            const selectItemCard = selectItemCards[i];
            const selectItemCardName = selectItemCard.querySelector(".selectItemNameTab2").innerText;
            const selectItemCardSize = selectItemCard.querySelector(".selectItemSizeTab2").innerText;
            const selectItemCardType = selectItemCard.querySelector(".selectItemTypeTab2").innerText;
            const selectItemCardQty = selectItemCard.querySelector(".selectItemQtyTab2");


            if (selectItemCardName === orderItemtitleName && selectItemCardSize === selectedSizeNameTabTwo && selectItemCardType === orderType) {


                const priceElement = selectItemCard.querySelector(".selectItemPriceTab2");

                const currentQty = parseInt(selectItemCardQty.innerText);
                var newQty = currentQty + parseInt(orderItemInputQty);
                selectItemCardQty.innerText = newQty;


                const currentPrice = parseFloat(priceElement.innerText);
                const newPrice = currentPrice + total;
                priceElement.innerText = newPrice;

                itemExistsTabTwo = true;
                popupArea.style.display = "none";

                break;
            }
        }

        if (!itemExistsTabTwo) {
            const selectOrderItemCards = document.createElement("div");
            selectOrderItemCards.classList.add("selectItemCard");
            selectOrderItemCards.classList.add("selectItemCardTab2");
            selectOrderItemCards.innerHTML = ` 
                                        <div class="selectItemCard-left">
                                            <div class="selectItemCard-head">
                                            <h1 class="selectItemId" style="display:none">${dishCardId}</h1>
                                                <h5 class="selectItemName selectItemNameTab2">${orderItemtitleName}</h5>
                                                <h5 class="selectItemSize selectItemSizeTab2">${selectedSizeNameTabTwo}</h5>
                                                <h5 class="selectItemPrice selectItemPriceTab2">${total}</h5>
                                            </div>

                                            <div class="selectItemCard-bottom">
                                                <h5 class="selectItemType selectItemTypeTab2">${itemType}</h5>
                                                <h5 class="selectItemQty selectItemQtyTab2">${orderItemInputQty}</h5> 
                                            </div>
                                        </div>
                                        <div class="selectItemCard-right">
                                            <img class="imgDustbin" src="../icons/dustbin.png"  width="50%"
                                            alt="">
                                        </div>
                                    `;
            selectOrderItemCards.style.display = "flex";
            orderItemsContainer.appendChild(selectOrderItemCards);
            popupArea.style.display = "none";
        }
        btnPayButtonTabTwoValidateEvent(orderItemsContainer)



        //delete selected items from the order cart
        const selectedOrderItemsDelete = document.querySelectorAll(".imgDustbin");
        selectedOrderItemsDelete.forEach((selectedOrderItemDelete) => {
            selectedOrderItemDelete.addEventListener("click", function () {
                //console.log("delete");
                const selectItemCard = selectedOrderItemDelete.closest(".selectItemCard");
                if (selectItemCard) {
                    selectItemCard.remove();
                    CalculateFullTotalTabTwo();
                    btnPayButtonTabTwoValidateEvent(orderItemsContainer)
                }
            });
        });
        CalculateFullTotalTabTwo();

        popupArea.style.display = "none";

    }

}

function btnPayButtonTabTwoValidateEvent(orderItemsContainer) {
    const hasItems = orderItemsContainer.children.length > 0;
    const isMobileEmpty = inputMobileElementTab2.value.trim() === "";
    const isNameEmpty = customerNameTab2.value.trim() === "";

    btnPayTabTwo.disabled = !hasItems || isMobileEmpty || isNameEmpty
}

//============calcutale full total============
function CalculateFullTotalTabTwo() {
    let fullTotalTabTwo = parseFloat(0.0);
    const fullTotalElement = document.querySelector("#totalTab2");
    const selectedOrderItemsTotal = document.querySelectorAll(".selectItemPriceTab2");
    const subTotal = document.querySelector("#subTotalTab2");

    selectedOrderItemsTotal.forEach((selectedOrderItemTotal) => {
        const value = selectedOrderItemTotal.innerText;
        fullTotalTabTwo += parseFloat(value);
    });

    // console.log(fullTotal);
    fullTotalElement.value = fullTotalTabTwo.toFixed(2);
    subTotal.innerText = fullTotalTabTwo.toFixed(2);
}

function btnPayClickHandlerTabTwo(subTotalValue) {
    // console.log("click");
    orderConfrimPanelTabTwo.style.display = "flex";
    container.classList.add("container-disabled");

    const newSubTotal = subTotalValue;
    orderNetTotalTabTwo.innerText = newSubTotal;
    orderBalanceTabTwo.innerText = newSubTotal;
    orderDiscountTabTwo.addEventListener("input", function (event) {
        const discount = orderDiscountTabTwo.value;
        const calcNetTotal = (newSubTotal - ((newSubTotal * discount) / 100));
        orderNetTotalTabTwo.innerText = calcNetTotal.toFixed(2);
        orderBalanceTabTwo.innerText = orderNetTotalTabTwo.innerText;
    });
    setupPaymentType("Two", updateBalance);
}


btnPayTabTwo.addEventListener('click', function () {

    if (!inputMobileElementTab2.value) {
        Swal.fire({
            title: "Oops...",
            text: 'Please select the Customer',
            icon: "warning",
            customClass: {
                confirmButton: 'alert-orange-button',
            }
        });
        return
    }

    if (selectCusCreditStatusTabTwo === "Disabled" || inputMobileElementTab2.value === "unKnown") {
        inputCreditTabTwo.disabled = true
    } else if (selectCusCreditStatusTabTwo === "Enabled") {
        inputCreditTabTwo.disabled = false
    }
    const subTotalValue = document.querySelector("#subTotalTab2").innerText;
    btnPayClickHandlerTabTwo(subTotalValue);


});

orderConfrimPanelCloseTab2.addEventListener("click", function () {
    orderConfrimPanelTabTwo.style.display = "none"
    container.classList.remove("container-disabled");
})


//=====payOrder keyboard input event TabOne==============
function payOrderKeyboardEventTabTwo() {
    keypadButtonOrderTabTwo.forEach((button) => {
        button.addEventListener("click", handleButtonClickTabTwo);
    });

    function handleButtonClickTabTwo(event) {
        const buttonValue = event.target.textContent;

        if (selectedInputOrderTabTwo) {
            if (buttonValue === '←') {
                selectedInputOrderTabTwo.value = selectedInputOrderTabTwo.value.slice(0, -1);
            } else if (buttonValue === '.') {
                selectedInputOrderTabTwo.value += '.';
            } else if (buttonValue === 'Enter') {

            } else {
                if (selectedInputOrderTabTwo.value === "0.00") {
                    selectedInputOrderTabTwo.value = "";
                }
                selectedInputOrderTabTwo.value += buttonValue;
            }

            const inputEvent = new Event('input', {
                bubbles: true,
                cancelable: true,
            });
            selectedInputOrderTabTwo.dispatchEvent(inputEvent);
        }
    }
}

//================= Function to collect order details=============
function collectOrderDetailsTabTwo() {
    const selectItemCards = document.querySelectorAll(".selectItemCardTab2");
    const orderDetails = [];
    const odId = orderIdElementTabTwo.value
    selectItemCards.forEach(selectItemCard => {
        const dishId = selectItemCard.querySelector(".selectItemId").innerText;
        const dishName = selectItemCard.querySelector(".selectItemName").innerText;
        const dishSize = selectItemCard.querySelector(".selectItemSize").innerText;
        const orderPrice = parseFloat(selectItemCard.querySelector(".selectItemPrice").innerText);

        const orderType = selectItemCard.querySelector(".selectItemType").innerText;
        const orderQty = parseInt(selectItemCard.querySelector(".selectItemQty").innerText);
        const unitPrice = orderPrice / orderQty

        orderDetails.push({
            dishId,
            odId,
            dishName,
            dishSize,
            orderPrice,
            orderType,
            orderQty,
            unitPrice
        });
    });

    return orderDetails;
}

//================Save order tab Two==============
async function ConfirmOrderTabTwo(baseUrl) {
    const customerObj = {
        cusId: selectedCustomerIdTabTwo,
        cusMobileNo: selectedCustomerMobileTabTwo,
        cusName: selectedCustomerNameTabTwo,
        cusStatus: 1
    };

    const orderId = document.getElementById("orderId_panalTwo").value;
    const netTotal = parseFloat(orderNetTotalTabTwo.innerText);
    const orderDetails = collectOrderDetailsTabTwo();


    const orderTime = new Date().toISOString();

    const requestBody = JSON.stringify({
        orderId: orderId,
        orderDateAndTime: orderTime,
        tabNo: "0",
        netTotal: netTotal,
        orderStatus: "close",
        tableId: "TAB-1",
        cashierName: localStorage.getItem("userName"),
        userId: localStorage.getItem("userId"),
        tblcustomer: customerObj,
        orderDetails: orderDetails,
    });

    //  console.log("Request Body:", requestBody);

    try {
        const response = await fetch(baseUrl + "/orders/", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("jwt")}`
            },
            body: requestBody,
        });

        if (!response.ok) {
            throw new Error('Failed to save order');
        }

        const data = await response.json();
        // console.log(data);

        await confirmPaymetTabTwo(baseUrl, orderId);

    } catch (error) {
        console.error("Error in ConfirmOrderTabTwo: ", error);
        throw error;
    }
}



async function confirmPaymetTabTwo(baseUrl, orderId) {
    function getCurrentDate() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const date = getCurrentDate();
    const cashierName = localStorage.getItem("userName");
    const cash = document.getElementById("inputpaycashTwo").value;
    const card = document.getElementById("inputpaycardTwo").value;
    const credit = document.getElementById("inputpaycreditTwo").value;
    const balance = document.getElementById("OrderBalanceTab2").textContent;
    const amount = parseFloat(parseFloat(card) + parseFloat(credit) + parseFloat(cash));
    const total = document.getElementById("netTotalTwo").textContent;

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
                        customerId: selectedCustomerIdTabTwo,
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
            throw new Error('Failed to process payment');
        }

        const data = await response.json();
        //  console.log(data);


        //  getBillReport(baseUrl);

    } catch (error) {
        console.error("Error in confirmPaymetTabTwo: ", error);
        throw error;
    }
}

//================Order Confirmation and Payment Handling==============
orderConfrimTab2.addEventListener("click", async function () {
    try {
        const baseUrl = await window.api.getBaseUrl();
        await ConfirmOrderTabTwo(baseUrl);

        Swal.fire({
            title: "Payment Successfully!",
            text: "Order has been successfully placed. Thank you!",
            icon: "success",
            confirmButtonColor: "#EA6D27",
            confirmButtonText: "OK"
        }).then((result) => {
            if (result.isConfirmed) {
                orderConfrimPanelTabTwo.style.display = "none";
                container.classList.remove("container-disabled");
                inputMobileElementTab2.value = "";
                customerNameTab2.value = "";
                totalTab2.value = "";
                selectedItemsContainer2.innerHTML = "";
                getOrderIdTabTwo(baseUrl)
                btnPayButtonTabTwoValidateEvent(selectedItemsContainer2);
                categoryCardListArea.style.display = "flex";
                dishCardListArea.style.display = "none";
                alphabetArea.style.display = "none";
                inputCashTabTwo.value = "0.00";
                inputCardTabTwo.value = "0.00";
                inputCreditTabTwo.value = "0.00";
                orderConfrimTab2.disabled = true
                downloadAndShowPdf(baseUrl)
            }
        });

    } catch (error) {
        console.error("Order confirmation failed: ", error);

        Swal.fire({
            title: "Error",
            text: "There was an issue placing the order. Please try again.",
            icon: "error",
            confirmButtonColor: "#EA6D27",
            confirmButtonText: "OK"
        });
    }
});






//=======================================tab Three Process================================================================
function selectedDishPopupTabThree(baseUrl, dishes, dishCards) {
    dishCards.forEach((dishCard) => {
        dishCard.addEventListener("click", function () {
            if (activeTab === 3) {
                //console.log("hello tab3");
                const index = dishCard.getAttribute("data-index");
                displayPopupTabThree(baseUrl, dishes, index);
            }
        });
    });

}

let lastSelectedSizeTabThree = null;
function displayPopupTabThree(baseUrl, dishes, index) {
    const clickedDish = dishes[index];

    popupArea.innerHTML = `

        <div class="dishesBox-head" data-id="${clickedDish.dishId}">
            <h4 class="dishesBox-title">${clickedDish.dishName}</h4>
            <img class="dishesBox-close-icon" src="../icons/close_icon.png" alt="">
        </div>
        <div class="dishesBox-body">
        <div class="dishesBox-body-left">
        <div class="qty-input-container">
            <button class="qty-input-btn" id="qty-input-btn-minus" disabled>-</button>
            <input class="qty-input" type="text">
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
            <button class="btn-addItem btn-addItem-dinein" disabled>Add Item</button>
        </div>

        `;

    popupArea.style.display = "block";


    //============Display popup box Close============
    const popupBoxClose = document.querySelector(".dishesBox-close-icon");
    popupBoxClose.addEventListener('click', function () {
        popupArea.style.display = "none";
    });

    //************popup box dishes-Size-buttons click event************
    const sizeBtnContainersTabThree = document.querySelectorAll(".size-input-container");
    const sizeBtns = document.querySelectorAll(".size-btn");
    const dishSizeInputTabThree = document.querySelector(".qty-input");
    const btnAddItem = document.querySelector(".btn-addItem");
    const btnInputNumbers = document.querySelectorAll(".btn-number");
    const btnBackspaceNumbers = document.querySelector(".btn-number-backspace");
    const btnPlus = document.querySelector("#qty-input-btn-plus");
    const btnMinus = document.querySelector("#qty-input-btn-minus");
    const dishBoxTitle = document.querySelector(".dishesBox-title");
    // const selectedItemType = document.querySelector(".selectItemType")
    // let clickedNumbers = '';
    const dishesBoxHead = document.querySelector('.dishesBox-head');
    const dishCardId = dishesBoxHead.getAttribute('data-id');


    //============dishes-Size-buttons disabled-enabled============
    sizeBtnContainersTabThree.forEach((sizeBtnContainerTabThree) => {
        sizeBtnContainerTabThree.addEventListener("click", function () {
            sizeBtnContainerTabThree.classList.remove('disabledDishSizeContainer');

            disableOtherDishSizeContaiersTabThree(sizeBtnContainerTabThree);
        });
    });

    function disableOtherDishSizeContaiersTabThree(clickedBtn) {
        sizeBtnContainersTabThree.forEach((sizeBtn) => {
            if (sizeBtn !== clickedBtn) {
                sizeBtn.classList.add('disabledDishSizeContainer');
                // sizeBtnsPrice.style.display="none";
                // sizeBtnContainers.disabled=true;
            }
        });
    }

    //select dish size event
    let plusClickListenerTabThree, minusClickListenerTabThree;
    let clickedSelectedDishQtyNumbersTabThree = "1";
    let clearedTabThree = false;

    sizeBtnContainersTabThree.forEach((sizeBtnContainerTabThree) => {
        const sizeBtnImg = sizeBtnContainerTabThree.querySelector(".size-btn-img");
        let isClickedTabThree = false;

        function attachNumberPadListenersTabThree() {
            btnInputNumbers.forEach((btnInputNumber) => {
                btnInputNumber.disabled = false;
                btnInputNumber.removeEventListener("click", handleNumberClickTabThree);
                btnInputNumber.addEventListener("click", handleNumberClickTabThree);
            });
            dishSizeInputTabThree.addEventListener("input", handleInputTabThree);
            btnBackspaceNumbers.addEventListener("click", handleBackspaceTabThree);
        }

        function handleNumberClickTabThree() {
            const clickedNumber = this.innerHTML;
            // console.log("Clicked number:", clickedNumber);
            if (clearedTabThree) {
                clickedSelectedDishQtyNumbersTabThree = clickedNumber;
                clearedTabThree = false;
            } else {
                clickedSelectedDishQtyNumbersTabThree += clickedNumber;
            }
            dishSizeInputTabThree.value = clickedSelectedDishQtyNumbersTabThree;
        }

        function handleInputTabThree() {
            if (this.value === "") {
                clearedTabThree = true;
            }
        }

        function handleBackspaceTabThree() {
            clickedSelectedDishQtyNumbersTabThree = clickedSelectedDishQtyNumbersTabThree.slice(0, -1);
            dishSizeInputTabThree.value = clickedSelectedDishQtyNumbersTabThree;

            if (dishSizeInputTabThree.value === "") {
                dishSizeInputTabThree.value = "1";
                clickedSelectedDishQtyNumbersTabThree = "1";
            }
        }

        function attachPlusMinusListenersTabThree() {
            btnPlus.removeEventListener('click', plusClickListenerTabThree);
            btnMinus.removeEventListener('click', minusClickListenerTabThree);

            plusClickListenerTabThree = function () {
                const currentValue = parseInt(dishSizeInputTabThree.value);
                clickedSelectedDishQtyNumbersTabThree = (currentValue + 1).toString();
                dishSizeInputTabThree.value = clickedSelectedDishQtyNumbersTabThree;
            };

            minusClickListenerTabThree = function () {
                const currentValue = parseInt(dishSizeInputTabThree.value);
                if (currentValue > 1) {
                    clickedSelectedDishQtyNumbersTabThree = (currentValue - 1).toString();
                    dishSizeInputTabThree.value = clickedSelectedDishQtyNumbersTabThree;
                }
            };

            btnPlus.addEventListener('click', plusClickListenerTabThree);
            btnMinus.addEventListener('click', minusClickListenerTabThree);
        }


        sizeBtnContainerTabThree.addEventListener("click", function () {
            isClickedTabThree = !isClickedTabThree

            if (isClickedTabThree) {
                lastSelectedSizeTabThree = sizeBtnContainerTabThree
                btnPlus.disabled = false;
                btnMinus.disabled = false;

                //============change popupBox sizebtn colored and icon by clicked it============
                sizeBtnContainerTabThree.style.border = "2px solid var(--text-field-success)";
                sizeBtnImg.src = "../icons/correct.png";
                sizeBtnImg.style.width = "40px";
                sizeBtnImg.style.height = "40px";
                dishSizeInputTabThree.disabled = false;
                btnBackspaceNumbers.disabled = false
                btnAddItem.disabled = false;
                dishSizeInputTabThree.value = "1";
                clickedSelectedDishQtyNumbersTabThree = "1";
                clearedTabThree = false;

                attachNumberPadListenersTabThree();
                attachPlusMinusListenersTabThree();

            } else {
                lastSelectedSizeTabThree = null;
                sizeBtnContainerTabThree.style.border = "none";
                sizeBtnImg.src = "../icons/plusicon.png";
                sizeBtnImg.style.width = "50px";
                sizeBtnImg.style.height = "50px";
                dishSizeInputTabThree.value = "";
                dishSizeInputTabThree.disabled = true;
                btnPlus.disabled = true;
                btnMinus.disabled = true;
                btnBackspaceNumbers.disabled = true


                btnInputNumbers.forEach((btnInputNumber) => {
                    btnInputNumber.disabled = true;
                });

                btnPlus.removeEventListener('click', plusClickListenerTabThree);
                btnMinus.removeEventListener('click', minusClickListenerTabThree);

                btnInputNumbers.forEach((btnInputNumber) => {
                    btnInputNumber.removeEventListener("click", handleNumberClickTabThree);
                });

                dishSizeInputTabThree.removeEventListener("input", handleInputTabThree);
                btnBackspaceNumbers.removeEventListener("click", handleBackspaceTabThree);
            }

        });

    });


    //============added cart to selected items============

    btnAddItem.addEventListener("click", function () {
        if (lastSelectedSizeTabThree) {
            addItemToOrderItemsTabThree("Take-Away");
        } else {
            Swal.fire({
                title: "Invalid Select",
                text: "Please select a valid dish.",
                icon: "warning",
                customClass: {
                    confirmButton: 'alert-orange-button',
                }
            });
        }

    });

    function addItemToOrderItemsTabThree(itemType) {
        if (!lastSelectedSizeTabThree) {
            return;
        }

        const orderItemsContainer = document.querySelector("#takeawayPanelThree-container");
        const orderItemtitleName = dishBoxTitle.innerText;
        const orderItemInputQty = dishSizeInputTabThree.value;
        const selectedSizeNameTabThree = lastSelectedSizeTabThree.querySelector('.size-btn').innerText;
        const selectedSizePriceTabThree = lastSelectedSizeTabThree.querySelector('.size-input').innerText;
        const orderType = itemType

        const total = orderItemInputQty * parseFloat(selectedSizePriceTabThree);

        const selectItemCards = document.querySelectorAll(".selectItemCardTab3");
        let itemExistsTabThree = false;

        for (let i = 0; i < selectItemCards.length; i++) {
            const selectItemCard = selectItemCards[i];
            const selectItemCardName = selectItemCard.querySelector(".selectItemNameTab3").innerText;
            const selectItemCardSize = selectItemCard.querySelector(".selectItemSizeTab3").innerText;
            const selectItemCardType = selectItemCard.querySelector(".selectItemTypeTab3").innerText;
            const selectItemCardQty = selectItemCard.querySelector(".selectItemQtyTab3");


            if (selectItemCardName === orderItemtitleName && selectItemCardSize === selectedSizeNameTabThree && selectItemCardType === orderType) {


                const priceElement = selectItemCard.querySelector(".selectItemPriceTab3");

                const currentQty = parseInt(selectItemCardQty.innerText);
                var newQty = currentQty + parseInt(orderItemInputQty);
                selectItemCardQty.innerText = newQty;


                const currentPrice = parseFloat(priceElement.innerText);
                const newPrice = currentPrice + total;
                priceElement.innerText = newPrice;

                itemExistsTabThree = true;
                popupArea.style.display = "none";

                break;
            }
        }

        if (!itemExistsTabThree) {
            const selectOrderItemCards = document.createElement("div");
            selectOrderItemCards.classList.add("selectItemCard");
            selectOrderItemCards.classList.add("selectItemCardTab3");
            selectOrderItemCards.innerHTML = ` 
                            <div class="selectItemCard-left">
                                <div class="selectItemCard-head">
                                <h1 class="selectItemId" style="display:none">${dishCardId}</h1>
                                    <h5 class="selectItemName selectItemNameTab3">${orderItemtitleName}</h5>
                                    <h5 class="selectItemSize selectItemSizeTab3">${selectedSizeNameTabThree}</h5>
                                    <h5 class="selectItemPrice selectItemPriceTab3">${total}</h5>
                                </div>

                                <div class="selectItemCard-bottom">
                                    <h5 class="selectItemType selectItemTypeTab3">${itemType}</h5>
                                    <h5 class="selectItemQty selectItemQtyTab3">${orderItemInputQty}</h5> 
                                </div>
                            </div>
                            <div class="selectItemCard-right">
                                <img class="imgDustbin" src="../icons/dustbin.png"  width="50%"
                                alt="">
                            </div>
                        `;
            selectOrderItemCards.style.display = "flex";
            orderItemsContainer.appendChild(selectOrderItemCards);
            popupArea.style.display = "none";
        }
        btnPayButtonTabThreeValidateEvent(orderItemsContainer)


        //============delete selected items from the order cart============
        const selectedOrderItemsDelete = document.querySelectorAll(".imgDustbin");
        selectedOrderItemsDelete.forEach((selectedOrderItemDelete) => {
            selectedOrderItemDelete.addEventListener("click", function () {
                //console.log("delete");
                const selectItemCard = selectedOrderItemDelete.closest(".selectItemCard");
                if (selectItemCard) {
                    selectItemCard.remove();
                    CalculateFullTotalTabThree();
                    btnPayButtonTabThreeValidateEvent(orderItemsContainer)
                }
            });
        });
        CalculateFullTotalTabThree();
        popupArea.style.display = "none";
    }


}

function btnPayButtonTabThreeValidateEvent(orderItemsContainer) {
    const hasItems = orderItemsContainer.children.length > 0;
    const isMobileEmpty = inputMobileElementTab3.value.trim() === "";
    const isNameEmpty = customerNameTab3.value.trim() === "";

    btnPayTabThree.disabled = !hasItems || isMobileEmpty || isNameEmpty

}


//============calcutale full total============
function CalculateFullTotalTabThree() {
    let fullTotalTabthree = parseFloat(0.0);
    const fullTotalElement = document.querySelector("#totalTab3");
    const selectedOrderItemsTotal = document.querySelectorAll(".selectItemPriceTab3");
    const subTotal = document.querySelector("#subTotalTab3");

    selectedOrderItemsTotal.forEach((selectedOrderItemTotal) => {
        const value = selectedOrderItemTotal.innerText;
        fullTotalTabthree += parseFloat(value);
    });

    // console.log(fullTotal);
    fullTotalElement.value = fullTotalTabthree.toFixed(2);
    subTotal.innerText = fullTotalTabthree.toFixed(2);

}

function btnPayClickHandlerTabThree(subTotalValue) {
    // console.log("click");
    orderConfrimPanelTabThree.style.display = "flex";
    container.classList.add("container-disabled");

    const newSubTotal = subTotalValue;
    orderNetTotalTabThree.innerText = newSubTotal;
    orderBalanceTabThree.innerText = newSubTotal;
    orderDiscountTabThree.addEventListener("input", function (event) {
        const discount = orderDiscountTabThree.value;
        const calcNetTotal = (newSubTotal - ((newSubTotal * discount) / 100));
        orderNetTotalTabThree.innerText = calcNetTotal.toFixed(2);
        orderBalanceTabThree.innerText = orderNetTotalTabThree.innerText;
    });
    setupPaymentType("Three");
}

btnPayTabThree.addEventListener('click', function () {
    if (!inputMobileElementTab3.value) {
        Swal.fire({
            title: "Oops...",
            text: 'Please select the Customer',
            icon: "warning",
            customClass: {
                confirmButton: 'alert-orange-button',
            }
        });
        return
    }

    if (selectCusCreditStatusTabThree === "Disabled" || inputMobileElementTab3.value === "unKnown") {
        inputCreditTabThree.disabled = true
    } else if (selectCusCreditStatusTabThree === "Enabled") {
        inputCreditTabThree.disabled = false
    }
    const subTotalValue = document.querySelector("#subTotalTab3").innerText;
    btnPayClickHandlerTabThree(subTotalValue);
});

orderConfrimPanelCloseTab3.addEventListener("click", function () {
    orderConfrimPanelTabThree.style.display = "none"
    container.classList.remove("container-disabled");
})


//=====payOrder keyboard input event TabOne==============
function payOrderKeyboardEventTabThree() {
    keypadButtonOrderTabThree.forEach((button) => {
        button.addEventListener("click", handleButtonClickTabThree);
    });

    function handleButtonClickTabThree(event) {
        const buttonValue = event.target.textContent;

        if (selectedInputOrderTabThree) {
            if (buttonValue === '←') {
                selectedInputOrderTabThree.value = selectedInputOrderTabThree.value.slice(0, -1);
            } else if (buttonValue === '.') {
                selectedInputOrderTabThree.value += '.';
            } else if (buttonValue === 'Enter') {

            } else {
                if (selectedInputOrderTabThree.value === "0.00") {
                    selectedInputOrderTabThree.value = "";
                }
                selectedInputOrderTabThree.value += buttonValue;
            }

            const inputEvent = new Event('input', {
                bubbles: true,
                cancelable: true,
            });
            selectedInputOrderTabThree.dispatchEvent(inputEvent);
        }
    }
}

//================= Function to collect order details=============
function collectOrderDetailsTabThree() {
    const selectItemCards = document.querySelectorAll(".selectItemCardTab3");
    const orderDetails = [];
    const odId = orderIdElementTabThree.value
    selectItemCards.forEach(selectItemCard => {
        const dishId = selectItemCard.querySelector(".selectItemId").innerText;
        const dishName = selectItemCard.querySelector(".selectItemName").innerText;
        const dishSize = selectItemCard.querySelector(".selectItemSize").innerText;
        const orderPrice = parseFloat(selectItemCard.querySelector(".selectItemPrice").innerText);

        const orderType = selectItemCard.querySelector(".selectItemType").innerText;
        const orderQty = parseInt(selectItemCard.querySelector(".selectItemQty").innerText);
        const unitPrice = orderPrice / orderQty

        orderDetails.push({
            dishId,
            odId,
            dishName,
            dishSize,
            orderPrice,
            orderType,
            orderQty,
            unitPrice
        });
    });

    return orderDetails;
}


//================Save order tab Three==============
async function ConfirmOrderTabThree(baseUrl) {
    const customerObj = {
        cusId: selectedCustomerIdTabThree,
        cusMobileNo: selectedCustomerMobileTabThree,
        cusName: selectedCustomerNameTabThree,
        cusStatus: 1
    }

    const orderId = document.getElementById("orderId_panalThree").value;
    const netTotal = parseFloat(orderNetTotalTabThree.innerText);
    const orderDetails = collectOrderDetailsTabThree();

    try {
        const response = await fetch(baseUrl + "/orders/", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("jwt")}`
            },

            body: JSON.stringify({
                orderId: orderId,
                orderDateAndTime: new Date().toISOString(),
                tabNo: "0",
                netTotal: netTotal,
                orderStatus: "close",
                tableId: "TAB-1",
                cashierName: localStorage.getItem("userName"),
                tblcustomer: customerObj,
                orderDetails: orderDetails,
                userId: localStorage.getItem("userId"),
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to save order');
        }

        const data = await response.json();
        //   console.log(data);

        await confirmPaymetTabThree(baseUrl, orderId);

    } catch (error) {
        console.error("Error in ConfirmOrderTabThree: ", error);
        throw error;
    }
}

async function confirmPaymetTabThree(baseUrl, orderId) {
    function getCurrentDate() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const date = getCurrentDate();
    const cashierName = localStorage.getItem("userName");
    const cash = document.getElementById("inputpaycashThree").value;
    const card = document.getElementById("inputpaycardThree").value;
    const credit = document.getElementById("inputpaycreditThree").value;
    const balance = document.getElementById("OrderBalanceTab3").textContent;
    const amount = parseFloat(parseFloat(card) + parseFloat(credit) + parseFloat(cash));
    const total = document.getElementById("netTotalThree").textContent;

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
                        customerId: selectedCustomerIdTabThree,
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
            throw new Error('Failed to process payment');
        }

        const data = await response.json();
        //console.log(data);

        //  getBillReport(baseUrl);

    } catch (error) {
        console.error("Error in confirmPaymetTabThree: ", error);
        throw error;
    }
}

//================Order Confirmation and Payment Handling==============
orderConfrimTab3.addEventListener("click", async function () {
    try {
        const baseUrl = await window.api.getBaseUrl();
        await ConfirmOrderTabThree(baseUrl);

        Swal.fire({
            title: "Payment Successfully!",
            text: "Order has been successfully placed. Thank you!",
            icon: "success",
            confirmButtonColor: "#EA6D27",
            confirmButtonText: "OK"
        }).then((result) => {
            if (result.isConfirmed) {
                orderConfrimPanelTabThree.style.display = "none";
                container.classList.remove("container-disabled");
                inputMobileElementTab3.value = "";
                customerNameTab3.value = "";
                totalTab3.value = "";
                selectedItemsContainer3.innerHTML = "";
                getOrderIdTabThree(baseUrl)
                btnPayButtonTabThreeValidateEvent(selectedItemsContainer3);
                categoryCardListArea.style.display = "flex";
                dishCardListArea.style.display = "none";
                alphabetArea.style.display = "none";
                inputCashTabThree.value = "0.00";
                inputCardTabThree.value = "0.00";
                inputCreditTabThree.value = "0.00";
                orderConfrimTab3.disabled = true
                downloadAndShowPdf(baseUrl)
            }
        });

    } catch (error) {
        console.error("Order confirmation failed: ", error);
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
    fetch(baseUrl + "/payment/export?format=pdf", {
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
        })
        .catch(error => {
            console.error('Error fetching and displaying PDF:', error);
        });
}




function clearInput(inputElement, orderBalance, updateBalanceFunction) {
    let isCleared = false;

    inputElement.addEventListener("focus", function () {
        inputElement.style.color = "#EA6D27";

        if (parseFloat(orderBalance.innerText) > 0) {
            if (inputElement.value.trim() === "0.00") {
                inputElement.value = parseFloat(orderBalance.innerText).toFixed(2);
                updateBalanceFunction();
            } else {
                inputElement.value = (parseFloat(inputElement.value) + parseFloat(orderBalance.innerText)).toFixed(2);
                updateBalanceFunction();
            }
            currentlyFocusedPaymentInput = inputElement;
        }
    });

    inputElement.addEventListener("blur", function () {
        inputElement.style.color = "";
        if (inputElement.value.trim() === "") {
            inputElement.value = "0.00";
            updateBalanceFunction();
            isCleared = false;
        } else {
            inputElement.value = parseFloat(inputElement.value).toFixed(2);
        }
    });

    inputElement.addEventListener("click", function () {
        if (inputElement.value.trim() === "0.00") {
            inputElement.value = "";
        }
        currentlyFocusedPaymentInput = inputElement;
    });

    inputElement.addEventListener("input", function (event) {
        if (!isCleared) {
            console.log(event.data);

            inputElement.style.color = "";
            inputElement.value = event.data;
            isCleared = true;
        }
    });
}

function handleKeyPress(inputPayCash, inputPayCard, inputPayCredit, updateBalanceFunction) {
    inputPayCash.addEventListener("input", function () {
        updateBalanceFunction();
    });

    inputPayCard.addEventListener("input", function () {
        updateBalanceFunction();
    });

    inputPayCredit.addEventListener("input", function () {
        updateBalanceFunction();
    });
}

function updateBalance(orderNetTotal, orderBalance, inputPayCash, inputPayCard, inputPayCredit, orderConfirmButton, paymentWarning) {
    // console.log(orderConfirmButton);
    const cashValue = parseFloat(inputPayCash.value.trim()) || 0;
    const cardValue = parseFloat(inputPayCard.value.trim()) || 0;
    const creditValue = parseFloat(inputPayCredit.value.trim()) || 0;

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
    //  console.log(newBalance);
    orderConfirmButton.disabled = newBalance > 0 || hasWarning;;
}

function setupPaymentType(tabNumber, updateBalanceFunction,) {
    const inputPayCash = document.querySelector(`#inputpaycash${tabNumber}`);
    const inputPayCard = document.querySelector(`#inputpaycard${tabNumber}`);
    const inputPayCredit = document.querySelector(`#inputpaycredit${tabNumber}`);
    const orderNetTotal = document.querySelector(`#netTotal${tabNumber}`);
    const orderBalance = document.querySelector(`.orderBalance${tabNumber}`);
    const orderConfirmButton = document.getElementById(`btnConfrimTab${tabNumber}`);

    const paymentWarningTab = document.getElementById(`paymentWarningTab${tabNumber}`);


    function updateBalanceWrapper() {

        updateBalance(orderNetTotal, orderBalance, inputPayCash, inputPayCard, inputPayCredit, orderConfirmButton, paymentWarningTab);
    }

    clearInput(inputPayCash, orderBalance, updateBalanceWrapper);
    clearInput(inputPayCard, orderBalance, updateBalanceWrapper);
    clearInput(inputPayCredit, orderBalance, updateBalanceWrapper);

    handleKeyPress(inputPayCash, inputPayCard, inputPayCredit, updateBalanceWrapper);

}




//save customer event
function validateCustomerName(customerName) {
    return /^[a-zA-Z\s]+$/.test(customerName);
}

function validateCustomerContact(customerContact) {
    return /^(070|071|074|075|076|077|078)[-]?[0-9]{7}$/.test(customerContact);
}

const customerInputsTakeaway = document.querySelectorAll('.addCustomer-inputField');

customerInputsTakeaway.forEach(input => {
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

    input.addEventListener('input', checkCustomerInputsTakeaway);
});

function checkCustomerInputsTakeaway() {
    let anyInputEmpty = false;
    let allInputsValid = true;

    customerInputsTakeaway.forEach(input => {
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

function takeawaySaveCustomerEvent(baseUrl) {
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
                addCustomerBox.style.display = "none";
                mobileInput.value = "";
                nameInput.value = "";
                if (takeawayPayOrderPanelOne.style.display === "block") {
                    // console.log("wokrs");
                    
                    inputMobileElementTab1.value = response.data.cusMobileNo;
                    customerNameTab1.value = response.data.cusName;
                    selectedCustomerIdTabOne = response.data.cusId;
                } else if (takeawayPayOrderPaneTwo.style.display === "block") {
                    inputMobileElementTab2.value = response.data.cusMobileNo;
                    customerNameTab2.value = response.data.cusName;
                    selectedCustomerIdTabTwo = response.data.cusId;
                } else if (takeawayPayOrderPanelThree.style.display === "block") {
                    inputMobileElementTab3.value = response.data.cusMobileNo;
                    customerNameTab3.value = response.data.cusName;
                    selectedCustomerIdTabThree = response.data.cusId;
                }
                searchCustomersTakeaway(baseUrl);
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

        // Dispatch the input event to dynamically check the validation
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

        // Dispatch the input event to dynamically check the validation
        const inputEvent = new Event('input', {
            bubbles: true,
            cancelable: true,
        });
        selectedInput.dispatchEvent(inputEvent);
    }
}



//============Search Customers By Mobile============
async function searchCustomersTakeaway(baseUrl) {
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

        // Initialize Awesomplete for each tab's mobile input element
        new Awesomplete(inputMobileElementTab1, {
            list: mobileNumbers,
            minChars: 1,
            maxItems: 5,
            autoFirst: true
        });
        new Awesomplete(inputMobileElementTab2, {
            list: mobileNumbers,
            minChars: 1,
            maxItems: 5,
            autoFirst: true
        });
        new Awesomplete(inputMobileElementTab3, {
            list: mobileNumbers,
            minChars: 1,
            maxItems: 5,
            autoFirst: true
        });

        // Function to handle mobile number changes for each tab
        function handleMobileNumberChange(inputElement, customerNameElement, tabIndex) {
            const enteredMobileNumber = inputElement.value.trim();
            mobileInput.value = enteredMobileNumber;
            const index = mobileNumbers.indexOf(enteredMobileNumber);

            if (index !== -1) {
                customerNameElement.value = customerNames[index];
                nameInput.value=customerNames[index];

                if (tabIndex === 1) {
                    selectedCustomerNameTabOne = customerNames[index];
                    selectCusCreditStatusTabOne = customerCreditStatus[index];
                    selectedCustomerIdTabOne = customerIds[index];
                    selectedCustomerMobileTabOne = inputElement.value;
                } else if (tabIndex === 2) {
                    selectedCustomerNameTabTwo = customerNames[index];
                    selectCusCreditStatusTabTwo = customerCreditStatus[index];
                    selectedCustomerIdTabTwo = customerIds[index];
                    selectedCustomerMobileTabTwo = inputElement.value;
                } else if (tabIndex === 3) {
                    selectedCustomerNameTabThree = customerNames[index];
                    selectCusCreditStatusTabThree = customerCreditStatus[index];
                    selectedCustomerIdTabThree = customerIds[index];
                    selectedCustomerMobileTabThree = inputElement.value;
                }
            } else {
                customerNameElement.value = '';

                if (tabIndex === 1) {
                    selectedCustomerNameTabOne = "";
                    selectCusCreditStatusTabOne = null;
                    selectedCustomerIdTabOne = null;
                    selectedCustomerMobileTabOne = "";
                } else if (tabIndex === 2) {
                    selectedCustomerNameTabTwo = "";
                    selectCusCreditStatusTabTwo = null;
                    selectedCustomerIdTabTwo = null;
                    selectedCustomerMobileTabTwo = "";
                } else if (tabIndex === 3) {
                    selectedCustomerNameTabThree = "";
                    selectCusCreditStatusTabThree = null;
                    selectedCustomerIdTabThree = null;
                    selectedCustomerMobileTabThree = "";
                }
            }

            btnPayButtonTabOneValidateEvent(selectedItemsContainer1);
            btnPayButtonTabTwoValidateEvent(selectedItemsContainer2);
            btnPayButtonTabThreeValidateEvent(selectedItemsContainer3);
            checkCustomerInputsTakeaway(); 
        }

      
        inputMobileElementTab1.addEventListener("awesomplete-selectcomplete", function () {
            handleMobileNumberChange(inputMobileElementTab1, customerNameTab1, 1);
        });
        inputMobileElementTab1.addEventListener("input", function () {
            handleMobileNumberChange(inputMobileElementTab1, customerNameTab1, 1);
        });

        inputMobileElementTab2.addEventListener("awesomplete-selectcomplete", function () {
            handleMobileNumberChange(inputMobileElementTab2, customerNameTab2, 2);
        });
        inputMobileElementTab2.addEventListener("input", function () {
            handleMobileNumberChange(inputMobileElementTab2, customerNameTab2, 2);
        });

        inputMobileElementTab3.addEventListener("awesomplete-selectcomplete", function () {
            handleMobileNumberChange(inputMobileElementTab3, customerNameTab3, 3);
        });
        inputMobileElementTab3.addEventListener("input", function () {
            handleMobileNumberChange(inputMobileElementTab3, customerNameTab3, 3);
        });

    } catch (error) {
        console.error("Error fetching customer data:", error);
    }
 

}


// =============select Customer keyboard Event =============
function setupNumericKeypad(tabIndex, inputElement, numericKeypad, numberKeys, keyBackspace, keyEnter) {
    inputElement.addEventListener("click", function () {
        hideAllNumericKeypads(tabIndex);
        numericKeypad.style.display = 'block';
    });

    numberKeys.forEach((numberKey) => {
        numberKey.addEventListener('click', function () {
            insertAtCaret(inputElement, numberKey.textContent);
        });
    });

    keyBackspace.addEventListener('click', () => {
        handleBackspace(inputElement);
    });

    keyEnter.addEventListener("click", function () {
        numericKeypad.style.display = 'none';
    });

    const inputEvent = new Event('input', {
        bubbles: true,
        cancelable: true,
    });
    inputElement.dispatchEvent(inputEvent);
}


document.querySelector("#takeaway-container").addEventListener('click', function (event) {

    if (!event.target.closest('.inputCustomer-Mobile1, .inputCustomer-Mobile2, .inputCustomer-Mobile3, .cashier-dinein-right-inner-content-body-top') &&
        !event.target.closest('.numberic-keypad1, .numberic-keypad2, .numberic-keypad3')) {

        let keypad1 = document.querySelector(".numberic-keypad1");
        if (keypad1 && keypad1.style.display !== "none") {
            keypad1.style.display = "none";
        }

        let keypad2 = document.querySelector(".numberic-keypad2");
        if (keypad2 && keypad2.style.display !== "none") {
            keypad2.style.display = "none";
        }

        let keypad3 = document.querySelector(".numberic-keypad3");
        if (keypad3 && keypad3.style.display !== "none") {
            keypad3.style.display = "none";
        }
    }
});




function hideAllNumericKeypads(tabIndex) {
    for (let i = 1; i <= 3; i++) {
        const keypad = document.querySelector(`.numberic-keypad${i}`);
        if (i !== tabIndex && keypad.style.display === 'block') {
            keypad.style.display = 'none';
        }
    }
}

function insertAtCaret(inputElement, value) {
    const start = inputElement.selectionStart;
    const end = inputElement.selectionEnd;
    const text = inputElement.value;

    inputElement.value = text.slice(0, start) + value + text.slice(end);

    inputElement.selectionStart = inputElement.selectionEnd = start + value.length;

    const inputEvent = new Event('input', {
        bubbles: true,
        cancelable: true,
    });
    inputElement.dispatchEvent(inputEvent);
}

function handleBackspace(inputElement) {
    const start = inputElement.selectionStart;
    const end = inputElement.selectionEnd;

    if (start !== end) {
        inputElement.value = inputElement.value.slice(0, start) + inputElement.value.slice(end);
        inputElement.selectionStart = inputElement.selectionEnd = start;
    }
    else if (start > 0) {
        inputElement.value = inputElement.value.slice(0, start - 1) + inputElement.value.slice(end);
        inputElement.selectionStart = inputElement.selectionEnd = start - 1;
    }

    const inputEvent = new Event('input', {
        bubbles: true,
        cancelable: true,
    });
    inputElement.dispatchEvent(inputEvent);
}



function selectCustomerMobileEvent() {
    setupNumericKeypad(1, inputMobileElementTab1, numbericKeypadOne, numberkeysOne, keyBackspaceOne, keyEnterOne);
    setupNumericKeypad(2, inputMobileElementTab2, numbericKeypadTwo, numberkeysTwo, keyBackspaceTwo, keyEnterTwo);
    setupNumericKeypad(3, inputMobileElementTab3, numbericKeypadThree, numberkeysThree, keyBackspaceThree, keyEnterThree);
}





//============Search Dishes By Alphabet============
function searchDishByLettera(dishCards) {
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
        console.log("click");
        dishCards.forEach(dishCard => {


            dishCard.style.display = "block";
        });
    });

}


//===============get order Ids for tabs====================
async function fetchOrders(baseUrl) {
    const response = await fetch(baseUrl + "/orders", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("jwt")}`
        }
    });

    //console.log(response.data);
    return response.json();
}

async function createOrderId(baseUrl, orderId, tabNo) {
    const response = await fetch(baseUrl + "/orders/gOid", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("jwt")}`
        },
        body: JSON.stringify({
            orderId: orderId,
            orderStatus: "Pending",
            tabNo: tabNo
        })
    });
    return response.json();
}

async function getTkOrderId(baseUrl, tabNo, orderIdElementId) {
    try {
        const response = await fetchOrders(baseUrl);
        // console.log(response);

        const existingOrders = response.data || [];

        for (const order of existingOrders) {
            //   console.log(order);

            if (order.tabNo == tabNo && order.orderStatus === "Pending" && order.orderDateAndTime === null) {

                document.getElementById(orderIdElementId).value = order.orderId;
                //   console.log(order);
                return order.orderId;
            }
        }

        // If no pending order is found, create a new one
        const newOrderId = "O-" + (existingOrders.length + 1);
        await createOrderId(baseUrl, newOrderId, tabNo);
        document.getElementById(orderIdElementId).value = newOrderId;
        return newOrderId;

    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

function getOrderIdForTab(baseUrl, tabNo, orderIdElementId) {
    return getTkOrderId(baseUrl, tabNo, orderIdElementId);
}

// Example usage for different tabs
function getOrderIdTabOne(baseUrl) {
    return getOrderIdForTab(baseUrl, "1", "orderId_panalOne");
}

function getOrderIdTabTwo(baseUrl) {
    return getOrderIdForTab(baseUrl, "2", "orderId_panalTwo");
}

function getOrderIdTabThree(baseUrl) {
    return getOrderIdForTab(baseUrl, "3", "orderId_panalThree");
}



//---bill report-------
// function getBillReport(baseUrl) {
//     fetch(baseUrl + "/payment/report/pdf", {
//         method: "GET",
//         headers: {
//             Accept: "application/json",
//             Authorization: `Bearer ${localStorage.getItem("jwt")}`,
//         },
//     })
//         .then(function (response) {
//             if (!response.ok) {
//                 throw new Error("Network response was not ok");
//             }
//             return response.blob();
//         })
//         .then(function (data) {

//         })
//         .catch(function (error) {
//             console.error("Error fetching PDF report:", error);
//         });
// }





document.getElementById('btnDAdmin').addEventListener('click', async function () {
    const baseUrl = await window.api.getBaseUrl();
    const isActiveAdmin = await checkAdminSession(baseUrl, localStorage.getItem("userId"));
    // console.log(isActiveAdmin);

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


document.getElementById('toDineinToggle').addEventListener('click', function () {
    if (this.checked) {
        window.location.href = './cashier-dinein.html';
    }
});

document.getElementById('logOut').addEventListener('click', async function () {
    const baseUrl = await window.api.getBaseUrl();
    const isActiveAdmin = await checkAdminSession(baseUrl, localStorage.getItem("userId"));
    console.log(isActiveAdmin);

    if (!isActiveAdmin) {
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
                document.getElementById("shift_end").style.display = "flex";
                document.querySelector(".container").style.pointerEvents = "none";
                document.querySelector(".navbar").style.pointerEvents = "none";
                document.getElementById("shift_end_user_cashier").value = `${localStorage.getItem("userId")}   ${localStorage.getItem("userName")}`
                getShiftEndStartFloat(baseUrl)
            }
        });
    }
});

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
        //  console.log(data);
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
        //  console.log(responseData);
        document.getElementById("shift_end").style.display = "none";
        cashierSessionSummary(responseData)


    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        return null;
    }
}


async function cashierSessionSummary(responseData) {
    document.getElementById("cashSettlementPopup").style.display = "flex";
    // console.log(responseData);
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

    setVarianceColor("vari-cash", responseData.data.cashVariance);
    setVarianceColor("vari-card", responseData.data.cardVariance);
    setVarianceColor("vari-credit", responseData.data.creditVariance);
    setVarianceColor("vari-tot", responseData.data.totalVariance);
}




//=====check cashier to strat shift==============
async function checkCashierSession(baseUrl, userId) {

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

        if (!isCashierActiveSession) {
            document.getElementById("shift_start").style.display = "flex"
            document.querySelector(".container").style.pointerEvents = "none";
            document.querySelector(".navbar").style.pointerEvents = "none";
            document.getElementById("start_shift_user_cashier").value = `${localStorage.getItem("userId")}   ${localStorage.getItem("userName")}`

        } else {
            document.getElementById("shift_start").style.display = "none"
        }


    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        return false;
    }
}


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

//=====strat shift-popup==============

function validateShiftStartInputs() {
    const startFloat = document.getElementById("shift-start-float").value;
    const isFloatValid = !isNaN(startFloat) && startFloat.trim() !== "";
    const startFloatContainer = document.getElementById("shift-start-float").parentElement

    if (startFloat !== "") {
        if (isFloatValid) {
            startFloatContainer.style.border = "2px solid var(--text-field-success)";
        } else {
            startFloatContainer.style.border = "2px solid var(--text-field-error)";
        }
    } else {
        startFloatContainer.style.border = "";
    }


    document.getElementById("btnStartShift").disabled = !isFloatValid;
}

document.getElementById("shift-start-float").addEventListener("input", validateShiftStartInputs);

function sendStartShift(baseUrl) {
    const startFloat = document.getElementById("shift-start-float").value
    const startRemarkCashier = document.getElementById("remarkShiftStart").value

    fetch(`${baseUrl}/shift?userId=${localStorage.getItem("userId")}&startRemark=${startRemarkCashier}&startFloat=${startFloat}`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },

    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            //  console.log(data);
            document.getElementById("shift_start").style.display = "none"
            document.querySelector(".container").style.pointerEvents = "auto";
            document.querySelector(".navbar").style.pointerEvents = "auto";
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });

}

document.getElementById("logOut").addEventListener("click", function () {
    localStorage.setItem("action", "logout");
});


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

    const isClear = window.api.clearAuthData()
    if (isClear) {
        window.location = './login.html';
    }
});




document.querySelector(".shift-box-close-shiftend").addEventListener("click", function () {
    document.querySelector(".container").style.pointerEvents = "auto";
    document.querySelector(".navbar").style.pointerEvents = "auto";
    document.getElementById("shift_end").style.display = "none";
})



//=====payOrder keyboard input event==============

const inputs = [
    document.getElementById('inputpaycashOne'),
    document.getElementById('inputpaycardOne'),
    document.getElementById('inputpaycreditOne'),


    document.getElementById('inputpaycashTwo'),
    document.getElementById('inputpaycardTwo'),
    document.getElementById('inputpaycreditTwo'),


    document.getElementById('inputpaycashThree'),
    document.getElementById('inputpaycardThree'),
    document.getElementById('inputpaycreditThree'),

];

inputs.forEach(input => {
    input.addEventListener("focus", () => {
        selectedInputTkOrder = input;
    });
});



function payTkOrdersKeyboardEvent() {
    takeAwayOrderkeypadButton.forEach((button) => {
        button.addEventListener("click", handleButtonClickaa);
    });

    function handleButtonClickaa(event) {
        const buttonValue = event.target.textContent;

        if (selectedInputTkOrder) {
            if (buttonValue === '←') {
                selectedInputTkOrder.value = selectedInputTkOrder.value.slice(0, -1);
            } else if (buttonValue === '.') {
                selectedInputTkOrder.value += '.';
            } else if (buttonValue === 'Enter') {

            } else {
                if (selectedInputTkOrder.value === "0.00") {
                    selectedInputTkOrder.value = "";
                }
                selectedInputTkOrder.value += buttonValue;
            }

            const inputEvent = new Event('input', {
                bubbles: true,
                cancelable: true,
            });

            Object.defineProperty(inputEvent, 'data', {
                value: buttonValue,
                configurable: true,
            });

            selectedInputTkOrder.dispatchEvent(inputEvent);
        }
    }
}