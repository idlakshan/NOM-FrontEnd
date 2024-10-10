
//------form inputs----------------------
const dishIdElement = document.querySelector('#dish_id');
const dishNameElement = document.querySelector('#dish_name');
const dishCategoryElement = document.querySelector('#dish_category');
const dishDescElement = document.querySelector('#dish_description');
const dishImageElement = document.querySelector('#image-upload');
const dishSmallPriceElement = document.querySelector('#dishSmallPrice');
const dishMediumPriceElement = document.querySelector('#dishMediumPrice');
const dishLargePriceElement = document.querySelector('#dishLargePrice');
const fileInput = document.getElementById('image-upload');
const imagePreview = document.getElementById('image-preview');

const ingredientsPopup = document.querySelector(".ingredients-popup");

const selectedDishName=document.getElementById("selectedIngredientName")

//-----------buttons---------------------
const btnSaveDish = document.querySelector("#btn_save_dish");
const btnUpdateDish = document.querySelector("#btn_update_dish");
const btnDeleteDish = document.querySelector("#btn_delete_dish");
const btnIngredientsPopupClose = document.querySelector(".ingredients-close-icon");
const btnIngredientsPopupOpen = document.querySelector("#btn_addIngredients_popup");
const btnAddingredients = document.querySelector("#btn_addIngredients");


const adminIngredientPopupButtons = document.querySelectorAll(".admin-keyboard-button-popup");
const changeSymbolbutton = document.querySelector("#admin-keyboard-special-popup");
const changeLettersbutton = document.querySelector("#admin-keyboard-changeLetter-popupIng");

//--------background elements-------------
const dishBackgroundOverlay = document.querySelector(".dishBackground");
const dishSideNavBr = document.querySelector(".aside-nav-button-list");
const dishNavbar = document.querySelector(".navbar")


//ingredients datalist
const ingredientListArr = ["ingredients-list-1", "ingredients-list-2", "ingredients-list-3", "ingredients-list-4", "ingredients-list-5",
    "ingredients-list-6", "ingredients-list-7", "ingredients-list-8", "ingredients-list-9", "ingredients-list-10", "ingredients-list-11",
    "ingredients-list-12", "ingredients-list-13", "ingredients-list-14", "ingredients-list-15", "ingredients-list-16", "ingredients-list-17",
    "ingredients-list-18", "ingredients-list-19", "ingredients-list-20"
];
const inputs = document.querySelectorAll('.ingredients-input');

let selectedIngredientInput;
const ingredientsArray = [];

document.addEventListener('DOMContentLoaded', async function () {
    const baseUrl = await window.api.getBaseUrl();
    const dishImagePath = await window.api.getImagePath();

    dishImageUploadevent()
    loadAllDish(baseUrl,dishImagePath);
    loadAllDishIngredients(baseUrl);
    getSelectedIngredientData(baseUrl, 1);
    ingredientsQtyEventHandle();
    checkAndValidateIngredientInputs();
    setDishpriceDefaultValues();
    loadAllDishCategory(baseUrl)
  //  setupInputValidation(inputs);

    btnIngredientsPopupOpen.addEventListener("click", function () {
       // console.log(dishNameElement.value);
        
        selectedDishName.innerText=dishNameElement.value
        ingredientsPopup.style.display = "block";
        ingredientsQtyEventHandle()
        checkAndValidateIngredientInputs()
        dishBackgroundOverlay.classList.add("overlay");
        dishSideNavBr.style.pointerEvents = "none"
        dishNavbar.style.pointerEvents = "none"

    });

    btnIngredientsPopupClose.addEventListener('click', function () {
        ingredientsPopup.style.display = 'none'
        dishBackgroundOverlay.classList.remove("overlay")
        dishSideNavBr.style.pointerEvents = "auto"
        dishNavbar.style.pointerEvents = "auto"

    });

    btnAddingredients.addEventListener('click', function () {
        ingredientsPopup.style.display = 'none'
        dishBackgroundOverlay.classList.remove("overlay")
        dishSideNavBr.style.pointerEvents = "auto"
        dishNavbar.style.pointerEvents = "auto"
    })

    btnDeleteDish.addEventListener('click', function () {
        deleteDish(baseUrl);
    });


    dishSmallPriceElement.addEventListener('input', ingredientsQtyEventHandle);
    dishMediumPriceElement.addEventListener('input', ingredientsQtyEventHandle);
    dishLargePriceElement.addEventListener('input', ingredientsQtyEventHandle);

  




    changeSymbolbutton.addEventListener("click", function () {
        toggleAdminDishSymbolPopup()
    })

    changeLettersbutton.addEventListener("click", function () {
        toggleAdminDishLettersPopup()
    })


    //validation events
    const totalIngredients = 20;
    for (let i = 1; i <= totalIngredients; i++) {
        const ingredientInput = document.getElementById(`ingredients-input-${i}`);
        const qtySmInput = document.getElementById(`ingredients-qty-sm-${i}`);
        const qtyMdInput = document.getElementById(`ingredients-qty-md-${i}`);
        const qtyLgInput = document.getElementById(`ingredients-qty-lg-${i}`);

        if (ingredientInput) ingredientInput.addEventListener('input', checkAndValidateIngredientInputs);
        if (qtySmInput) qtySmInput.addEventListener('input', checkAndValidateIngredientInputs);
        if (qtyMdInput) qtyMdInput.addEventListener('input', checkAndValidateIngredientInputs);
        if (qtyLgInput) qtyLgInput.addEventListener('input', checkAndValidateIngredientInputs);
    }
});

//----------dish form validations-----------------
function validateDishName(dishName) {
    return /^[a-zA-Z\s]{3,23}$/.test(dishName);
}

function validateDishCategory(dishCategory) {
    return /^[a-zA-Z\s]{3,15}$/.test(dishCategory);
}

function validateDishDescription(dishDescription) {
    return /^[a-zA-Z\s]{3,35}$/.test(dishDescription);
}

function validateDishPrice(dishPrice) {
    return /^\d+(\.\d{1,2})?$/.test(dishPrice);
}

function validateImageUpload(imageUpload) {
    const file = imageUpload.files[0];
    return file !== undefined;
}

const dishInputs = document.querySelectorAll('.dish-input-field:not(#dish_id)');
const imageUploadInput = document.getElementById('image-upload');
const dishPricesInputs = document.querySelectorAll('.input-field-dish');

function setDishpriceDefaultValues() {
    dishPricesInputs.forEach(input => {
        input.addEventListener('focus', function () {
            if (this.value === "0.00") {
                this.value = "";
                checkDishInputs();
            }
        });

        input.addEventListener('blur', function () {
            if (this.value.trim() === "") {
                this.value = "0.00";
                checkDishInputs();
            }
        });
    });
}

dishInputs.forEach(input => {
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

    input.addEventListener('input', checkDishInputs);
});

function checkDishInputs() {
    let anyInputEmpty = false;
    let allInputsValid = true;

    dishInputs.forEach(input => {
        const container = input.parentElement;
        const value = input.value.trim();
        const invalidText = container.querySelector('.invalid-text');
        const validIcon = container.querySelector('.valid-text');

        if (value === '') {
            anyInputEmpty = true;
        }

        let valid = false;
        if (value !== '') {
            if (input.id === 'dish_name') {
                valid = validateDishName(value);
            } else if (input.id === 'dish_category') {
                valid = validateDishCategory(value);
            } else if (input.id === 'dish_description') {
                valid = validateDishDescription(value);
            } else if (input.id === 'dishSmallPrice' || input.id === 'dishMediumPrice' || input.id === 'dishLargePrice') {
                input.value = input.value.replace(/[^\d.]/g, '');
                valid = validateDishPrice(value);
            }

            if (valid) {
                container.style.borderColor = '#00cc00';
                invalidText.style.display = 'none';
                if (validIcon) {
                    validIcon.style.display = 'inline-block';
                }
            } else {
                container.style.borderColor = 'red';
                if (input.id === 'dishSmallPrice' || input.id === 'dishMediumPrice' || input.id === 'dishLargePrice') {
                    invalidText.innerHTML = '<i class="fa-solid fa-circle-exclamation" style="color: #ff3300; padding: 5px;"></i>';
                } else {
                    invalidText.innerHTML = 'Invalid <i class="fa-solid fa-circle-exclamation" style="color: #ff3300; padding: 5px;"></i>';
                }
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

  

    if (dishIdElement.value.trim() !== '') {
        btnSaveDish.disabled = true;
        btnUpdateDish.disabled = !allInputsValid || imageUploadFlag;
        btnDeleteDish.disabled = !allInputsValid || imageUploadFlag;
    } else if (anyInputEmpty || !allInputsValid || imageUploadFlag) {
        btnSaveDish.disabled = true;
        btnUpdateDish.disabled = true;
        btnDeleteDish.disabled = true;
    } else {
        btnSaveDish.disabled = false;
        btnUpdateDish.disabled = true;
        btnDeleteDish.disabled = true;
    }
}



//----------Load All Dishes event-----------
async function loadAllDish(baseUrl,dishImagePath) {
    fetch(baseUrl + "/dish/allDish", {
        method: 'GET',
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(response => {
          
            displayDishes(baseUrl, response.data,dishImagePath);
            document.getElementById('dish_search_container').addEventListener('input', function (event) {
                const searchText = event.target.value.trim().toLowerCase();
                filterDishes(response.data, searchText);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
}


//--------display dishes----------------
function displayDishes(baseUrl, data, dishImagePath) {
    const dishContainer = document.querySelector('.dish-container-right-body');
    dishContainer.innerHTML = '';

    data.forEach(item => {
        const imageUrl = `${dishImagePath}/${item.image}?t=${new Date().getTime()}`;
        const card = `
            <div class="dish-detail-img" data-dish-id="${item.dishId}">
                <div class="dish-detail-img-view">
                    <img src="${imageUrl}" alt="Dish Image" height="100%" width="100%">
                </div>
                <div class="dish-detail-img-name">
                    <p>${item.dishName}</p>
                </div>
            </div>
        `;
        dishContainer.insertAdjacentHTML('beforeend', card);
    });

    // Event listener for clicking on a dish
    dishContainer.addEventListener('click', function (event) {
        const dishDetail = event.target.closest('.dish-detail-img');
        if (dishDetail) {
            const dishId = dishDetail.dataset.dishId;
            dishClickEventHandler(baseUrl, dishId, dishImagePath);
        }
    });
}

//-----dish click event handler-------------
function dishClickEventHandler(baseUrl, dishId, dishImagePath) {
  //  console.log(dishId);
    
    const processedIngredientIds = [];
    const maxIngredients = 20;

    for (let i = 1; i <= maxIngredients; i++) {
        const ingIdInput = document.getElementById(`ingredients-id-${i}`);
        const qtySmInput = document.getElementById(`ingredients-qty-sm-${i}`);
        const qtyMdInput = document.getElementById(`ingredients-qty-md-${i}`);
        const qtyLgInput = document.getElementById(`ingredients-qty-lg-${i}`);
        const ingNameInput = document.getElementById(`ingredients-input-${i}`);

        if (ingIdInput) ingIdInput.value = '';
        if (qtySmInput) qtySmInput.value = '';
        if (qtyMdInput) qtyMdInput.value = '';
        if (qtyLgInput) qtyLgInput.value = '';
        if (ingNameInput) ingNameInput.value = '';
    }

    fetch(baseUrl + "/dish?dishId=" + dishId, {
        method: 'GET',
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(response => {
           
            dishIdElement.value = response.data.dishId;
            dishNameElement.value = response.data.dishName;
            dishCategoryElement.value = response.data.dishCategory;
            dishDescElement.value = response.data.dishDescription;

            const imageUrl = `${dishImagePath}/${response.data.image}?t=${new Date().getTime()}`;
         
            document.getElementById('image-preview').src = imageUrl;

            dishSmallPriceElement.value = response.data.dishSmallPrice.toFixed(2);
            dishMediumPriceElement.value = response.data.dishMediumPrice.toFixed(2);
            dishLargePriceElement.value = response.data.dishLargePrice.toFixed(2);

            // Fetch the image from the URL and set it to the file input
            fetch(imageUrl)
                .then(res => res.blob())
                .then(blob => {
                    const file = new File([blob], response.data.image, { type: blob.type });
                    const dataTransfer = new DataTransfer();
                    dataTransfer.items.add(file);
                    fileInput.files = dataTransfer.files;
                })
                .catch(err => {
                    console.error('Error fetching image:', err);
                });

            const ingredients = response.data.ingredients;

            ingredients.forEach((ingredient, index) => {
                const ingredientId = ingredient.ingredientId;
                const ingredientsQty = ingredient.ingredientsQty;
                const ingredientsUnit = ingredient.ingredientsUnit;
                const dishSize = ingredient.dishSize;
                let inputIndex;

                if (processedIngredientIds.includes(ingredientId)) {
                    const firstIndex = processedIngredientIds.indexOf(ingredientId);
                    const ingIdInput = document.getElementById(`ingredients-id-${firstIndex + 1}`);
                    const qtySmInput = document.getElementById(`ingredients-qty-sm-${firstIndex + 1}`);
                    const qtyMdInput = document.getElementById(`ingredients-qty-md-${firstIndex + 1}`);
                    const qtyLgInput = document.getElementById(`ingredients-qty-lg-${firstIndex + 1}`);
                    const ingNameInput = document.getElementById(`ingredients-input-${firstIndex + 1}`);

                    if (ingNameInput) {
                        ingNameInput.value = ingredient.ingredientName;
                    }

                    ingIdInput.value = ingredientId;

                    if (dishSize === "Small") {
                        qtySmInput.value = ingredientsQty;
                    } else if (dishSize === "Medium") {
                        qtyMdInput.value = ingredientsQty;
                    } else if (dishSize === "Large") {
                        qtyLgInput.value = ingredientsQty;
                    }

                    inputIndex = firstIndex + 1;
                } else {
                    processedIngredientIds.push(ingredientId);
                    inputIndex = processedIngredientIds.length;
                }

                const ingIdInput = document.getElementById(`ingredients-id-${inputIndex}`);
                const qtySmInput = document.getElementById(`ingredients-qty-sm-${inputIndex}`);
                const qtyMdInput = document.getElementById(`ingredients-qty-md-${inputIndex}`);
                const qtyLgInput = document.getElementById(`ingredients-qty-lg-${inputIndex}`);
                const ingNameInput = document.getElementById(`ingredients-input-${inputIndex}`);

                if (ingNameInput) {
                    ingNameInput.value = ingredient.ingredientName;
                }

                ingIdInput.value = ingredientId;

                if (dishSize === "Small") {
                    qtySmInput.value = ingredientsQty.toFixed(3);
                } else if (dishSize === "Medium") {
                    qtyMdInput.value = ingredientsQty.toFixed(3);
                } else if (dishSize === "Large") {
                    qtyLgInput.value = ingredientsQty.toFixed(3);
                }

                document.getElementById(`ingredients-unit-input-${inputIndex}`).value = ingredientsUnit;
            });

            checkDishInputs();
            checkAndValidateIngredientInputs();
            ingredientsQtyEventHandle();

            const errorMessage = document.getElementById('error-message');
            errorMessage.style.display = 'none';
        })
        .catch(error => {
            console.error('Error:', error);
        });
}



let validIngredients = [];
let selectedIngredients = []; 

//------load all ingredients to popup input----------------
async function loadAllDishIngredients(baseUrl) {
    try {
        const response = await fetch(baseUrl + "/ingredients/getStatusOne", {
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
        const inputs = document.querySelectorAll('.ingredients-input');
        validIngredients = responseData.data.map(ingredient => ingredient.ingredientName); 

       
        inputs.forEach(input => {
            $(input).autocomplete({
                source: validIngredients,   
                minLength: 1,             
                select: async function (event, ui) {
                    const selectedIngredient = ui.item.value;
                    if (!selectedIngredients.includes(selectedIngredient)) {
                        selectedIngredients.push(selectedIngredient);  
                    }

                    const inputId = this.id;
                    const idElementId = `ingredients-id-${inputId.split('-').pop()}`;
                    const unitInputElementId = `ingredients-unit-input-${inputId.split('-').pop()}`;

                    try {
                        const response = await fetch(`${baseUrl}/ingredients/?ingredientsName=${selectedIngredient}`, {
                            method: 'GET',
                            headers: {
                                Accept: "application/json",
                                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                            }
                        });

                        if (!response.ok) {
                            Swal.fire({
                                title: "Oops...",
                                text: "Error fetching ingredient data.",
                                icon: "warning",
                                customClass: {
                                    confirmButton: 'alert-orange-button',
                                }
                            });
                            throw new Error('Network response was not ok');
                        } 

                        const responseData = await response.json();
                        const { ingredientId, ingredientsUnit } = responseData.data;

                        document.getElementById(idElementId).value = ingredientId;
                        document.getElementById(unitInputElementId).value = ingredientsUnit;

                    } catch (error) {
                        console.error('Error:', error);
                    }
                },
                focus: function (event, ui) {
                   
                }
            });
        });

    } catch (error) {
        console.error('Error loading ingredients:', error);
    }
}

//---get selected ingredient's details(popup)-------------
async function getSelectedIngredientData(baseUrl, startIndex) {
    for (let i = startIndex; i < startIndex + 20; i++) {
        const inputId = `ingredients-input-${i}`;
        const idElementId = `ingredients-id-${i}`;
        const unitInputElementId = `ingredients-unit-input-${i}`;

        const qtySmInput = document.getElementById(`ingredients-qty-sm-${i}`);
        const qtyMdInput = document.getElementById(`ingredients-qty-md-${i}`);
        const qtyLgInput = document.getElementById(`ingredients-qty-lg-${i}`);

        const inputElement = document.getElementById(inputId);

     
        inputElement.addEventListener('change', async function () {
            const selectedOption = this.value.trim();

            if (selectedOption === '') {
                const previousOption = this.dataset.previousValue;
                if (previousOption) {
                    selectedIngredients = selectedIngredients.filter(ingredient => ingredient !== previousOption);
                }
                this.dataset.previousValue = '';
                resetIngredientFields(idElementId, unitInputElementId, qtySmInput, qtyMdInput, qtyLgInput);
                return;
            }

            if (!validIngredients.includes(selectedOption)) {
              
                Swal.fire({
                    title: "Invalid Input",
                    text: "Please select a valid ingredient.",
                    icon: "warning",
                    customClass: {
                        confirmButton: 'alert-orange-button',
                    }
                });
                resetIngredientFields(idElementId, unitInputElementId, qtySmInput, qtyMdInput, qtyLgInput);
                this.value = '';
                checkAndValidateIngredientInputs();
                return;
            }

            
            for (let j = startIndex; j < startIndex + 20; j++) {
                if (j !== i) {
                    const otherInputId = `ingredients-input-${j}`;
                    const otherSelectedOption = document.getElementById(otherInputId).value.trim();

                    if (otherSelectedOption === selectedOption) {
                        Swal.fire({
                            title: "Duplicate Ingredient",
                            text: "This ingredient has already been selected",
                            icon: "warning",
                            customClass: {
                                confirmButton: 'alert-orange-button',
                            }
                        });
                        resetIngredientFields(idElementId, unitInputElementId, qtySmInput, qtyMdInput, qtyLgInput);
                        this.value = ''; 
                        checkAndValidateIngredientInputs();
                        return;
                    }
                }
            }

            selectedIngredients.push(selectedOption);
            this.dataset.previousValue = selectedOption;

        });

       
        inputElement.addEventListener('input', function () {
            const selectedOption = this.value.trim();
            if (selectedOption === '') {
                resetIngredientFields(idElementId, unitInputElementId, qtySmInput, qtyMdInput, qtyLgInput);
            }
        });
    }
}

// Helper function to reset ingredient fields
function resetIngredientFields(idElementId, unitInputElementId, qtySmInput, qtyMdInput, qtyLgInput) {
    document.getElementById(idElementId).value = '';
    document.getElementById(unitInputElementId).value = '';
    qtySmInput.value = '';
    qtyMdInput.value = '';
    qtyLgInput.value = '';
}











//---ingredients Qty disable/enabled event Handle-------
function ingredientsQtyEventHandle() {
    const dishSmallPrice = parseFloat(dishSmallPriceElement.value);
    const dishMediumPrice = parseFloat(dishMediumPriceElement.value);
    const dishLargePrice = parseFloat(dishLargePriceElement.value);

    toggleIngredientInputs(dishSmallPrice, 'sm');
    toggleIngredientInputs(dishMediumPrice, 'md');
    toggleIngredientInputs(dishLargePrice, 'lg');
}


function toggleIngredientInputs(price, size) {
    for (let i = 1; i <= 20; i++) {
        const input = document.getElementById(`ingredients-qty-${size}-${i}`);
        if (input) {
            input.disabled = price <= 0;
        }
    }
}

//----------dish image upload event-----------
let imageUploadFlag=false;
function dishImageUploadevent() {
    const errorMessage = document.getElementById('error-message');
    fileInput.addEventListener('change', function () {
        if (fileInput.files && fileInput.files[0]) {
            const file = fileInput.files[0];

            errorMessage.style.display = 'none';
            imagePreview.src = ''; 
            
            if (file.size > 3 * 1024 * 1024) {
            
                errorMessage.style.display = 'block';
                imageUploadFlag=true

                // errorMessage.textContent = 'File size should not exceed 3MB';
            } else {
                const reader = new FileReader();
                reader.onload = function (e) {
                    imagePreview.src = e.target.result;
                }
                reader.readAsDataURL(file);
                imageUploadFlag = false;
            }
            checkDishInputs()
        }
    });
}


//------validate ingredients popup inputs----------
function checkAndValidateIngredientInputs() {
    const quantityInputs = document.querySelectorAll('[id^="ingredients-qty"]');
    const addButton = document.getElementById('btn_addIngredients');
    const totalIngredients = 20; 
    let allValid = true;
    let hasInvalidInput = false;
    let hasValidInput = false;

    quantityInputs.forEach(input => {
        input.value = input.value.replace(/[^\d.]/g, '');
        if (/^\d{1,3}(\.\d{3})?$/.test(input.value)) {
            input.style.border = '2px solid #00cc00';
            hasValidInput = true;
        } else if (input.value === '') {
            input.style.border = '1px solid var(--text-field-border)';
        } else {
            input.style.border = '2px solid #ff3300';
            hasInvalidInput = true;
        }
    });

    // Validate ingredient inputs and their corresponding quantities
    for (let i = 1; i <= totalIngredients; i++) {
        const ingredientInput = document.getElementById(`ingredients-input-${i}`);
        const qtySmInput = document.getElementById(`ingredients-qty-sm-${i}`);
        const qtyMdInput = document.getElementById(`ingredients-qty-md-${i}`);
        const qtyLgInput = document.getElementById(`ingredients-qty-lg-${i}`);

      
        if (ingredientInput && ingredientInput.value.trim() !== '') {
            if ((qtySmInput && !qtySmInput.disabled && qtySmInput.value.trim() === '') ||
                (qtyMdInput && !qtyMdInput.disabled && qtyMdInput.value.trim() === '') ||
                (qtyLgInput && !qtyLgInput.disabled && qtyLgInput.value.trim() === '')) {
                allValid = false;
            }
        }
    }

  
    addButton.disabled = hasInvalidInput || !hasValidInput || !allValid;
}


//-------get dish categories------------
async function loadAllDishCategory(baseUrl) {
    try {
        const response = await fetch(baseUrl + "/Categorry", {
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
   

        const datalist = document.getElementById("dish-categoryList");
        datalist.innerHTML = '';

        responseData.data.forEach(category => {
            const option = document.createElement("option");
            option.value = category.categorryName;
            datalist.appendChild(option);
        });
        
        
       
    } catch (error) {
        console.error('Error:', error);
    }
}





//------------dish save with ingredients event handler--------------------
btnAddingredients.addEventListener("click", function () {
    ingredientsArray.length = 0;
    
    let invalidIngredients = [];
    let hasInvalidIngredients = false;

    for (let i = 1; i <= 20; i++) {
        const ingredientId = document.getElementById(`ingredients-id-${i}`).value;
        const ingredientName = document.getElementById(`ingredients-input-${i}`).value;
        const unitInput = document.getElementById(`ingredients-unit-input-${i}`);
        const qtySmInput = document.getElementById(`ingredients-qty-sm-${i}`);
        const qtyMdInput = document.getElementById(`ingredients-qty-md-${i}`);
        const qtyLgInput = document.getElementById(`ingredients-qty-lg-${i}`);
        const unit = unitInput.value;

        // Check if ingredient name is not empty
        if (ingredientName.trim() !== "") {
            // Check if the ingredientName is in the validIngredients list
            if (!validIngredients.includes(ingredientName)) {
                invalidIngredients.push({ ingredientName, inputIndex: i });
                hasInvalidIngredients = true;
                continue; // Skip adding this ingredient
            }

            // If valid, push ingredient details to the array
            if (!qtySmInput.disabled && qtySmInput.value.trim() !== "") {
                ingredientsArray.push({
                    ingredientId: ingredientId,
                    ingredientName: ingredientName,
                    ingredientsQty: qtySmInput.value,
                    ingredientsUnit: unit,
                    dishSize: "Small"
                });
            }

            if (!qtyMdInput.disabled && qtyMdInput.value.trim() !== "") {
                ingredientsArray.push({
                    ingredientId: ingredientId,
                    ingredientName: ingredientName,
                    ingredientsQty: qtyMdInput.value,
                    ingredientsUnit: unit,
                    dishSize: "Medium"
                });
            }

            if (!qtyLgInput.disabled && qtyLgInput.value.trim() !== "") {
                ingredientsArray.push({
                    ingredientId: ingredientId,
                    ingredientName: ingredientName,
                    ingredientsQty: qtyLgInput.value,
                    ingredientsUnit: unit,
                    dishSize: "Large"
                });
            }
        }
    }

    if (hasInvalidIngredients) {
        Swal.fire({
            title: "Invalid Input",
            text: `${invalidIngredients.map(item => item.ingredientName).join(', ')} are invalid Please correct these entries.`,
            icon: "warning",
            customClass: {
                confirmButton: 'alert-orange-button',
            }
        });

   
        dishBackgroundOverlay.classList.remove("overlay");
        dishSideNavBr.style.pointerEvents = "auto";
        dishNavbar.style.pointerEvents = "auto";

        // btnSaveDish.disabled = true;
        // btnUpdateDish.disabled = true;
        // btnDeleteDish.disabled = true;

        return;
    } else if (ingredientsArray.length === 0) {
        Swal.fire({
            title: "Oops...",
            text: "Please add ingredients",
            icon: "warning",
            customClass: {
                confirmButton: 'alert-orange-button',
            }
        });

        dishBackgroundOverlay.classList.remove("overlay");
        dishSideNavBr.style.pointerEvents = "auto";
        dishNavbar.style.pointerEvents = "auto";


    } else {
   
        console.log(ingredientsArray);
        
        // btnSaveDish.disabled = true;
        // btnUpdateDish.disabled = false;
        // btnDeleteDish.disabled = false;
    }
});



btnSaveDish.addEventListener("click", async function () {
    try {
        if (ingredientsArray.length === 0) {

            Swal.fire({
                title: "Oops...",
                text: "Please add ingredients before saving the dish",
                icon: "warning",
                customClass: {
                    confirmButton: 'alert-orange-button',
                }
            });

            return;
        }

        if (!fileInput.files || !fileInput.files[0]) {
            Swal.fire({
                title: "Oops...",
                text: "Please add dish image",
                icon: "warning",
                customClass: {
                    confirmButton: 'alert-orange-button',
                }
            });

            return;
        }

        const baseUrl = await window.api.getBaseUrl();
        const dishImagePath = await window.api.getImagePath();

        await saveDish(baseUrl, ingredientsArray);
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Dish saved successfully!",
            showConfirmButton: false,
            timer: 1500
        });
        ingredientsArray.length = 0;
        loadAllDish(baseUrl,dishImagePath);
        resetDishInputs();
        checkDishInputs();
        loadAllDishCategory(baseUrl);
        countAllDishes(baseUrl);
     
        //resetDishInputs();
        //refreshDishPriceInputSection();
    } catch (error) {
        console.error("Error saving dish:", error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'An error occurred while saving the Dish. Please try again.',
        });
    }
});


async function saveDish(baseUrl, ingredientsArray) {
    const formdata = new FormData();
    formdata.append("dishId", "");
    formdata.append("dishName", dishNameElement.value);
    formdata.append("dishDescription", dishDescElement.value);
    formdata.append("dishCategory", dishCategoryElement.value);
    formdata.append("dishSubCategory", "pasta");
    formdata.append("dishSmallPrice", dishSmallPriceElement.value || "0.00");
    formdata.append("dishMediumPrice", dishMediumPriceElement.value || "0.00");
    formdata.append("dishLargePrice", dishLargePriceElement.value || "0.00");
    formdata.append("dishAvailableStatus", "DishAvailable");
    formdata.append("dishCookingStatus", "Ready");
    formdata.append("dishActiveStatus", "Active");
    formdata.append("imageFile", fileInput.files[0], fileInput.files[0]);

    ingredientsArray.forEach((ingredient, index) => {
        formdata.append(`ingredients[${index}].ingredientId`, ingredient.ingredientId);
        formdata.append(`ingredients[${index}].ingredientsQty`, ingredient.ingredientsQty);
        formdata.append(`ingredients[${index}].ingredientsUnit`, ingredient.ingredientsUnit);
        formdata.append(`ingredients[${index}].dishSize`, ingredient.dishSize);
        formdata.append(`ingredients[${index}].ingredientName`, ingredient.ingredientName);
    });

 

    const requestOptions = {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("jwt")}`
        },
        body: formdata,
        redirect: "follow"
    };
   
    const response = await fetch(baseUrl + "/dish/save/dish", requestOptions);
    if (!response.ok) {
        throw new Error("Failed to save dish");
    }

    const result = await response.text();
    // console.log(result);
    // console.log(fileInput.files[0]);    

    return result;
}


//------------dish update with ingredients event handler--------------------
btnUpdateDish.addEventListener("click", async function () {
   
    try {
        if (ingredientsArray.length === 0) {

            Swal.fire({
                title: "Oops...",
                text: "Please add ingredients before updating the dish",
                icon: "warning",
                customClass: {
                    confirmButton: 'alert-orange-button',
                }
            });

            return;
        }

        if (!fileInput.files || !fileInput.files[0]) {
            Swal.fire({
                title: "Oops...",
                text: "Please add dish image",
                icon: "warning",
                customClass: {
                    confirmButton: 'alert-orange-button',
                }
            });

            return;
        }

        const baseUrl = await window.api.getBaseUrl();
        const dishImagePath = await window.api.getImagePath();

        await updateDish(baseUrl, ingredientsArray);
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Dish updated successfully!",
            showConfirmButton: false,
            timer: 1500
        });
        ingredientsArray.length = 0;
        loadAllDish(baseUrl,dishImagePath);
        resetDishInputs();
        checkDishInputs()
        loadAllDishCategory(baseUrl);
  
        //refreshDishPriceInputSection();
    } catch (error) {
        console.error("Error saving dish:", error);
        // alert("Failed to save dish. Please try again.");
    }
});


async function updateDish(baseUrl, ingredientsArray) {
    const formdata = new FormData();
    formdata.append("dishId", dishIdElement.value);
    formdata.append("dishName", dishNameElement.value);
    formdata.append("dishDescription", dishDescElement.value);
    formdata.append("dishCategory", dishCategoryElement.value);
    formdata.append("dishSubCategory", "pasta");
    formdata.append("dishSmallPrice", dishSmallPriceElement.value || "0.00");
    formdata.append("dishMediumPrice", dishMediumPriceElement.value || "0.00");
    formdata.append("dishLargePrice", dishLargePriceElement.value || "0.00");
    formdata.append("dishAvailableStatus", "DishAvailable");
    formdata.append("dishCookingStatus", "Ready");
    formdata.append("dishActiveStatus", "Active");
    formdata.append("imageFile", fileInput.files[0], fileInput.files[0]);

    ingredientsArray.forEach((ingredient, index) => {
        formdata.append(`ingredients[${index}].ingredientId`, ingredient.ingredientId);
        formdata.append(`ingredients[${index}].ingredientsQty`, ingredient.ingredientsQty);
        formdata.append(`ingredients[${index}].ingredientsUnit`, ingredient.ingredientsUnit);
        formdata.append(`ingredients[${index}].dishSize`, ingredient.dishSize);
        formdata.append(`ingredients[${index}].ingredientName`, ingredient.ingredientName);
    });

    //console.log(formdata);

    const requestOptions = {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("jwt")}`
        },
        body: formdata,
        redirect: "follow"
    };

    const response = await fetch(baseUrl + "/dish/update", requestOptions);
    if (!response.ok) {
        throw new Error("Failed to save dish");
    }

    const result = await response.text();
    // console.log(result);
    return result;
}



//------------dish delete with ingredients event handler--------------------
async function deleteDish(baseUrl) {
    const dishImagePath = await window.api.getImagePath();
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: "#EA6D27",
        cancelButtonColor: "#101A24",
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel'
    }).then((result) => {
        if (result.isConfirmed) {
            fetch(baseUrl + "/dish/?dishId=" + dishIdElement.value, {
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
                        text: "Dish has been deleted",
                        icon: "success",
                        confirmButtonColor: "#EA6D27",
                        confirmButtonText: "OK"
                    });
                    ingredientsArray.length = 0;
                    loadAllDish(baseUrl,dishImagePath);
                    resetDishInputs();
                    checkDishInputs()
                    loadAllDishCategory(baseUrl);
                    countAllDishes(baseUrl);
                })
                .catch(error => {
                    console.error('Error Deleting Dish:', error);
                    Swal.fire(
                        'Error!',
                        'There was an error deleting the dish.',
                        'error'
                    );
                });
        }
    });
}




//--------reset inputs---------
function resetDishInputs() {
    dishIdElement.value = "";
    dishInputs.forEach(input => {
        const container = input.parentElement;
        container.style.borderColor = '';
        const invalidText = container.querySelector('.invalid-text');
        const validIcon = container.querySelector('.valid-text');
        if (invalidText) invalidText.style.display = 'none';
        if (validIcon) validIcon.style.display = 'none';
        input.value = '';
    });

    imagePreview.src = '';
    setDishpriceDefaultValues();

    for (let i = 1; i <= 20; i++) {
        const index = i;
        const ingredientIdInput = document.getElementById(`ingredients-id-${index}`);
        const ingredientNameInput = document.getElementById(`ingredients-input-${index}`);
        const ingredientsUnitInput = document.getElementById(`ingredients-unit-input-${index}`);
        const qtyLgInput = document.getElementById(`ingredients-qty-lg-${index}`);
        const qtyMdInput = document.getElementById(`ingredients-qty-md-${index}`);
        const qtySmInput = document.getElementById(`ingredients-qty-sm-${index}`);

        // Reset values
        if (ingredientIdInput) ingredientIdInput.value = '';
        if (ingredientNameInput) ingredientNameInput.value = '';
        if (ingredientsUnitInput) ingredientsUnitInput.value = '';
        if (qtyLgInput) {
            qtyLgInput.value = '';
            qtyLgInput.style.borderColor = '';
            qtyLgInput.disabled = true
        }
        if (qtyMdInput) {
            qtyMdInput.value = '';
            qtyMdInput.style.borderColor = '';
            qtyMdInput.disabled = true
        }
        if (qtySmInput) {
            qtySmInput.value = '';
            qtySmInput.style.borderColor = '';
            // qtySmInput.disabled = true
        }


    }
    document.getElementById('dishSmallPrice').value = '0.00';
    document.getElementById('dishMediumPrice').value = '0.00';
    document.getElementById('dishLargePrice').value = '0.00';
    checkDishInputs()
    dishNameElement.focus();
}


//----------Search dish event-----------
async function filterDishes(data, searchText) {
    const dishImagePath = await window.api.getImagePath();
    const dishContainer = document.querySelector('.dish-container-right-body');
    dishContainer.innerHTML = '';
    data.forEach(item => {
        const imageUrl = `${dishImagePath}/${item.image}?t=${new Date().getTime()}`; 
        const dishName = item.dishName.toLowerCase();
        if (dishName.includes(searchText)) {
            const card = `
                <div class="dish-detail-img" data-dish-id="${item.dishId}">
                    <div class="dish-detail-img-view">
                        <img src="${imageUrl}" alt="" height="100%" width="100%;">
                    </div>
                    <div class="dish-detail-img-name">
                        <p>${item.dishName}</p>
                    </div>
                </div>
            `;
            dishContainer.insertAdjacentHTML('beforeend', card);
        }
    });
}


dishNameElement.addEventListener('input', clearDishInputs);
dishCategoryElement.addEventListener('input', clearDishInputs);
dishDescElement.addEventListener('input', clearDishInputs);



function clearDishInputs() {
    const dishName = dishNameElement.value.trim();
    const dishCategory = dishCategoryElement.value.trim();
    const dishDescription = dishDescElement.value.trim();

    if (dishName === '' && dishCategory === '' && dishDescription === '') {
        dishIdElement.value = '';
        fileInput.value = ''
        imagePreview.src = ''
        resetDishInputs()
       // checkDishInputs()

    }
}



//-------------------ingredient popup keyboard event-------------------
function toggleAdminDishSymbolPopup() {
    const symbols = ['!', '@', '#', '$', '%', '-', '&', '*', '(', ')'];
    const buttons = document.querySelectorAll('.admin-keyboard-number-popup-dish');

    buttons.forEach(function (button, index) {
        if (button.textContent === '123') {
            button.textContent = symbols[index];
        } else if (button.textContent === symbols.join('')) {
            button.textContent = '123';
        } else {
            if (!isNaN(parseInt(button.textContent))) {
                button.textContent = symbols[index];
            } else {
                button.textContent = index === 9 ? '0' : (index + 1);
            }
        }
    });

    const symbolButtonPopup = document.querySelector("#admin-keyboard-special-popup");
    if (symbolButtonPopup.textContent === '123') {
        symbolButtonPopup.textContent = '!#*';
    } else {
        symbolButtonPopup.textContent = '123';
    }
}


function toggleAdminDishLettersPopup() {
    const buttons = document.querySelectorAll('.popup-ing-letter');
    buttons.forEach(function (button) {
      if (button.textContent === 'abc?') {
        button.textContent = 'ABC?';
      } else if (button.textContent === 'ABC?') {
        button.textContent = 'abc?';
      } else {
        button.textContent = button.textContent === button.textContent.toUpperCase() ? button.textContent.toLowerCase() : button.textContent.toUpperCase();
      }
    });

}


adminIngredientPopupButtons.forEach(button => {
    button.addEventListener('click', handlePopKeyboardButtonClick);    
});


function handlePopKeyboardButtonClick(event) {

    const keyboardButtonValue = event.target.textContent.trim(); 
 
    
    if (keyboardButtonValue === 'abc?' || keyboardButtonValue === '!#*' || keyboardButtonValue === 'ABC?' || keyboardButtonValue === '123') {
        return;
    }

    if (selectedIngredientInput) {
        const cursorPositionStart = selectedIngredientInput.selectionStart;
        const cursorPositionEnd = selectedIngredientInput.selectionEnd;

        if (keyboardButtonValue.trim() === '←') {  
            if (cursorPositionStart !== cursorPositionEnd) {  
                const newValue = selectedIngredientInput.value.slice(0, cursorPositionStart) + selectedIngredientInput.value.slice(cursorPositionEnd);
                selectedIngredientInput.value = newValue;
                selectedIngredientInput.setSelectionRange(cursorPositionStart, cursorPositionStart);
            } else if (cursorPositionStart > 0) {  
                const newValue = selectedIngredientInput.value.slice(0, cursorPositionStart - 1) + selectedIngredientInput.value.slice(cursorPositionStart);
                selectedIngredientInput.value = newValue;
                selectedIngredientInput.setSelectionRange(cursorPositionStart - 1, cursorPositionStart - 1);
            }
        } else if (keyboardButtonValue === 'Space') { 
            const newValue = selectedIngredientInput.value.slice(0, cursorPositionStart) + ' ' + selectedIngredientInput.value.slice(cursorPositionEnd);
            selectedIngredientInput.value = newValue;
            selectedIngredientInput.setSelectionRange(cursorPositionStart + 1, cursorPositionStart + 1);
        } else if (keyboardButtonValue === '.') {  
            const newValue = selectedIngredientInput.value.slice(0, cursorPositionStart) + '.' + selectedIngredientInput.value.slice(cursorPositionEnd);
            selectedIngredientInput.value = newValue;
            selectedIngredientInput.setSelectionRange(cursorPositionStart + 1, cursorPositionStart + 1);
        } else {
            const newValue = selectedIngredientInput.value.slice(0, cursorPositionStart) + keyboardButtonValue + selectedIngredientInput.value.slice(cursorPositionEnd);
            selectedIngredientInput.value = newValue;
            selectedIngredientInput.setSelectionRange(cursorPositionStart + keyboardButtonValue.length, cursorPositionStart + keyboardButtonValue.length);
        }

    
        const inputEvent = new Event('input', {
            bubbles: true,
            cancelable: true,
        });
        selectedIngredientInput.dispatchEvent(inputEvent);
        
    }
   
}


function selectIngredientPopupInput(input) {
    selectedIngredientInput = input;
}


document.querySelectorAll('.ingredients-input').forEach(input => {
    if (!input.classList.contains('ingredients-input-unit')) {
        input.addEventListener('focus', function () {
            selectIngredientPopupInput(input);
        });
    }
});

document.querySelectorAll('.ingredients-qty').forEach(input => {
        input.addEventListener('focus', function () {
            selectIngredientPopupInput(input);
        });
});



