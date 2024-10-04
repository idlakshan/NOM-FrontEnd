
const keyBoardButtons = document.querySelectorAll('.admin-keyboard-button');

let selectedInput;

document.addEventListener("DOMContentLoaded", function () {
    draggableKeyboard();
   //setupInputFieldDishFocus();

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
            if (keyboardOuter.style.display === 'none' || keyboardOuter.style.display === '') {
                keyboardOuter.style.display = 'block';
            } else {
                keyboardOuter.style.display = 'none';
            }
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
    //console.log("toggleAdminSymbol function called");
    const symbols = ['.', '@', '#', '$', '%', '-', '&', '*', '(', ')'];
    const buttons = keyboard.querySelectorAll('.admin-keyboard-button-number');

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

    if (keyboard.querySelector('.admin-keyboard-button-special').textContent === '123') { 
        keyboard.querySelector('.admin-keyboard-button-special').textContent = '!#*';
    } else {
        keyboard.querySelector('.admin-keyboard-button-special').textContent = '123';

    }
}


function toggleAdminLetters(keyboard) {
    const letterButtons = keyboard.querySelectorAll('.admin-keyboard-button:not(.admin-keyboard-button-enter):not(.admin-keyboard-button-backspace)');

    letterButtons.forEach(function (button) {
        if (button.textContent === 'abc?') {
            button.textContent = 'ABC?';
        } else if (button.textContent === 'ABC?') {
            button.textContent = 'abc?';
        } else {
            button.textContent = button.textContent === button.textContent.toUpperCase() ? button.textContent.toLowerCase() : button.textContent.toUpperCase();
        }
    });
}


function handleKeyboardButtonClick(event) {
    const keyboardButtonValue = event.target.textContent;

    // Exclude special buttons
    if (keyboardButtonValue === 'abc?' || keyboardButtonValue === '!#*' || keyboardButtonValue === 'ABC?' || keyboardButtonValue === '123') {
        return;
    }

    if (selectedInput) {
        const cursorPositionStart = selectedInput.selectionStart;
        const cursorPositionEnd = selectedInput.selectionEnd;

        if (keyboardButtonValue === 'Backspace') { 
            if (cursorPositionStart !== cursorPositionEnd) { 
                const newValue = selectedInput.value.slice(0, cursorPositionStart) + selectedInput.value.slice(cursorPositionEnd);
                selectedInput.value = newValue;
                selectedInput.setSelectionRange(cursorPositionStart, cursorPositionStart);
            } else if (cursorPositionStart > 0) {  
                const newValue = selectedInput.value.slice(0, cursorPositionStart - 1) + selectedInput.value.slice(cursorPositionStart);
                selectedInput.value = newValue;
                selectedInput.setSelectionRange(cursorPositionStart - 1, cursorPositionStart - 1);
            }
        } else if (keyboardButtonValue === 'Space') {
            const newValue = selectedInput.value.slice(0, cursorPositionStart) + ' ' + selectedInput.value.slice(cursorPositionEnd);
            selectedInput.value = newValue;
            selectedInput.setSelectionRange(cursorPositionStart + 1, cursorPositionStart + 1);
        } else { 
            if (selectedInput.classList.contains('input-num') || selectedInput.type === 'number') {
                if (keyboardButtonValue === '.' && !selectedInput.value.includes('.')) {
                    const newValue = selectedInput.value.slice(0, cursorPositionStart) + '.' + selectedInput.value.slice(cursorPositionEnd);
                    selectedInput.value = newValue;
                    selectedInput.setSelectionRange(cursorPositionStart + 1, cursorPositionStart + 1);
                } else if (!isNaN(keyboardButtonValue)) {
                    const newValue = selectedInput.value.slice(0, cursorPositionStart) + keyboardButtonValue + selectedInput.value.slice(cursorPositionEnd);
                    selectedInput.value = newValue;
                    selectedInput.setSelectionRange(cursorPositionStart + 1, cursorPositionStart + 1);
                }
            } else {
                const newValue = selectedInput.value.slice(0, cursorPositionStart) + keyboardButtonValue + selectedInput.value.slice(cursorPositionEnd);
                selectedInput.value = newValue;
                selectedInput.setSelectionRange(cursorPositionStart + 1, cursorPositionStart + 1);
            }
        }

      
        const inputEvent = new Event('input', {
            bubbles: true,
            cancelable: true,
        });
        selectedInput.dispatchEvent(inputEvent);
    }
}


function selectInput(input) {
    selectedInput = input;
}


document.querySelectorAll('.keyboard-input').forEach(input => {
        input.addEventListener('focus', function() {
            selectInput(input);
        });
});

