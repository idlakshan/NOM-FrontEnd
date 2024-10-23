
const keyBoardButtons = document.querySelectorAll('.admin-keyboard-button');
let selectedInput = null;  
let inputCleared = false;  


document.addEventListener("DOMContentLoaded", function () {
    draggableKeyboard();


    document.querySelectorAll('.keyboard-input').forEach(input => {
        input.addEventListener('focus', function () {
            selectInput(input);  
        });
    });

  
    document.querySelectorAll('.admin-keyboard-button').forEach(button => {
        button.addEventListener('click', handleKeyboardButtonClick);  
    });
});


function draggableKeyboard() {
    const draggableKeyboards = document.querySelectorAll('.draggable-keyboard');

    draggableKeyboards.forEach(function (draggableKeyboard) {
        const keyboardOuter = draggableKeyboard.nextElementSibling;
        const symbolButton = keyboardOuter.querySelector(".admin-keyboard-button-special");
        const letterButton = keyboardOuter.querySelector(".admin-keyboard-button-keyChange");

        let posX = 0, posY = 0;
        let isDragging = false;

        draggableKeyboard.addEventListener('mousedown', function (e) {
            isDragging = true;
            posX = e.clientX - draggableKeyboard.getBoundingClientRect().left;
            posY = e.clientY - draggableKeyboard.getBoundingClientRect().top;
        });


        document.addEventListener('mousemove', function (e) {
            if (isDragging) {
                e.preventDefault();
                const containerRect = draggableKeyboard.parentElement.getBoundingClientRect();
                let newX = e.clientX - posX - containerRect.left;
                let newY = e.clientY - posY - containerRect.top;

    
                newX = Math.max(0, Math.min(newX, containerRect.width - draggableKeyboard.offsetWidth));
                newY = Math.max(0, Math.min(newY, containerRect.height - draggableKeyboard.offsetHeight));

                draggableKeyboard.style.left = newX + 'px';
                draggableKeyboard.style.top = newY + 'px';

 
                keyboardOuter.style.left = (newX + draggableKeyboard.offsetWidth) + 'px';
                keyboardOuter.style.top = newY + 'px';
            }
        });

        document.addEventListener('mouseup', function () {
            isDragging = false;
        });


        draggableKeyboard.addEventListener('dblclick', function () {
            keyboardOuter.style.display = (keyboardOuter.style.display === 'none' || keyboardOuter.style.display === '') ? 'block' : 'none';
        });

        symbolButton.addEventListener('click', function () {
            toggleAdminSymbol(keyboardOuter);
        });

        letterButton.addEventListener('click', function () {
            toggleAdminLetters(keyboardOuter);
        });
    });
}


function toggleAdminSymbol(keyboard) {
    const symbols = ['.', '@', '#', '/', ',', '-', '&', '*', '(', ')'];
    const buttons = keyboard.querySelectorAll('.admin-keyboard-button-number');

    buttons.forEach((button, index) => {
        if (!isNaN(parseInt(button.textContent))) {
            button.textContent = symbols[index];
        } else {
            button.textContent = index === 9 ? '0' : (index + 1).toString();
        }
    });

    const specialButton = keyboard.querySelector('.admin-keyboard-button-special');
    specialButton.textContent = specialButton.textContent === '123' ? '!#*' : '123';
}

function toggleAdminLetters(keyboard) {
    const letterButtons = keyboard.querySelectorAll('.admin-keyboard-button:not(.admin-keyboard-button-enter):not(.admin-keyboard-button-backspace)');

    letterButtons.forEach(button => {
        button.textContent = (button.textContent === button.textContent.toLowerCase()) ? button.textContent.toUpperCase() : button.textContent.toLowerCase();
    });
}

function handleKeyboardButtonClick(event) {
    const keyboardButtonValue = event.target.textContent;

    if (['abc?', '!#*', 'ABC?', '123'].includes(keyboardButtonValue)) {
        return;
    }

    if (selectedInput) {
        const cursorPositionStart = selectedInput.selectionStart;
        const cursorPositionEnd = selectedInput.selectionEnd;

        if (keyboardButtonValue === 'Backspace') {
            if (cursorPositionStart !== cursorPositionEnd) {
                selectedInput.value = selectedInput.value.slice(0, cursorPositionStart) + selectedInput.value.slice(cursorPositionEnd);
            } else if (cursorPositionStart > 0) {
                selectedInput.value = selectedInput.value.slice(0, cursorPositionStart - 1) + selectedInput.value.slice(cursorPositionStart);
            }
            selectedInput.setSelectionRange(cursorPositionStart - 1, cursorPositionStart - 1);

         
            if (selectedInput.value === "" && ['stock-update-ingredientQty'].includes(selectedInput.id)) {
                selectedInput.value = "0.000";
            }
        }

        else if (keyboardButtonValue === 'Space') {
            selectedInput.value = selectedInput.value.slice(0, cursorPositionStart) + ' ' + selectedInput.value.slice(cursorPositionEnd);
            selectedInput.setSelectionRange(cursorPositionStart + 1, cursorPositionStart + 1);
        }

        else {
            if (selectedInput.classList.contains('input-num') || selectedInput.type === 'number') {
                if (['0', '0.0', '0.00', '0.', '0.000', ''].includes(selectedInput.value)) {
                    selectedInput.value = '';
                }

            
                if ((keyboardButtonValue === '-' || keyboardButtonValue === '+') && cursorPositionStart === 0 && selectedInput.value === '') {
                    selectedInput.value = keyboardButtonValue + selectedInput.value.slice(cursorPositionEnd);
                }
           
                else if (keyboardButtonValue === '.' && !selectedInput.value.includes('.')) {
                    selectedInput.value = selectedInput.value.slice(0, cursorPositionStart) + '.' + selectedInput.value.slice(cursorPositionEnd);
                }
             
                else if (!isNaN(keyboardButtonValue)) {
                    selectedInput.value = selectedInput.value.slice(0, cursorPositionStart) + keyboardButtonValue + selectedInput.value.slice(cursorPositionEnd);
                }
            } else {
                selectedInput.value = selectedInput.value.slice(0, cursorPositionStart) + keyboardButtonValue + selectedInput.value.slice(cursorPositionEnd);
            }

            selectedInput.setSelectionRange(cursorPositionStart + 1, cursorPositionStart + 1);
        }

      
        if (selectedInput.value === '' && ['dishSmallPrice', 'dishMediumPrice', 'dishLargePrice'].includes(selectedInput.id)) {
            selectedInput.value = '0.00';
        }

        if (selectedInput.value === '' && ['stock-update-ingredientQty'].includes(selectedInput.id)) {
            selectedInput.value = '0.000';
        }

        selectedInput.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
    }
}





function selectInput(input) {
    selectedInput = input;

    if (!inputCleared && selectedInput.value === '0.00') {
        selectedInput.value = ''; 
        inputCleared = true;  
    }
}

document.querySelectorAll('.keyboard-input').forEach(input => {
    input.addEventListener('focus', function () {
        selectInput(input);
    });
});
