const keyBoardButtons = document.querySelectorAll('.shift-keyboard-button');
// const ShiftStartFloatInput = document.getElementById('shift-start-float');
// const ShiftStartRemarkInput = document.getElementById('remarkShiftStart');
// const shiftEndCashInput=document.getElementById("shiftend-cash-amount")
// const shiftEndCardInput=document.getElementById("shiftend-card-amount")
// const shiftEndFloatInput=document.getElementById("shiftend-end-float")
// const shiftEndRemarkInput=document.getElementById("remarkShiftend")

let shiftSelectedInput;

function toggleShiftKeyBoardSymbol(numberClass, specialClass) {
  //  console.log("toggleShiftKeyBoardSymbol function called");
    const symbols = ['.', '@', '#', '$', '%', '-', '&', '*', '(', ')'];
    const buttons = document.querySelectorAll(`.${numberClass}`);

    buttons.forEach((button, index) => {
        const currentContent = button.textContent;
        if (symbols.includes(currentContent)) {
            button.textContent = index === 9 ? '0' : (index + 1).toString();
        } else {
            button.textContent = symbols[index];
        }
    });

    const specialButton = document.querySelector(`.${specialClass}`);
    specialButton.textContent = specialButton.textContent === '123' ? '!#*' : '123';
}


function toggleShiftKeyboardLetters() {
   
    const letterButtons = document.querySelectorAll('.shift-keyboard-button:not(.shift-keyboard-button-space):not(.shift-keyboard-button-backspace)');

    letterButtons.forEach(button => {
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

    if (keyboardButtonValue === 'abc?' || keyboardButtonValue === '!#*' || keyboardButtonValue === 'ABC?' || keyboardButtonValue === '123') {
        return;
    }

    if (shiftSelectedInput) {
        if (keyboardButtonValue === 'Backspace') {
            shiftSelectedInput.value = shiftSelectedInput.value.slice(0, -1);
        } else if (keyboardButtonValue === 'Space') {
            shiftSelectedInput.value = shiftSelectedInput.value+" ";
        } else {
            shiftSelectedInput.value += keyboardButtonValue;
        }

        const inputEvent = new Event('input', {
            bubbles: true,
            cancelable: true,
        });
        shiftSelectedInput.dispatchEvent(inputEvent);
    }
}


keyBoardButtons.forEach(button => {
    button.addEventListener('click', handleKeyboardButtonClick);
});

function selectInput(input) {
    shiftSelectedInput = input;
}


// ShiftStartFloatInput.addEventListener('focus', () => selectInput(ShiftStartFloatInput));
// ShiftStartRemarkInput.addEventListener('focus', () => selectInput(ShiftStartRemarkInput));

// shiftEndCashInput.addEventListener('focus', () => selectInput(shiftEndCashInput));
// shiftEndCardInput.addEventListener('focus', () => selectInput(shiftEndCardInput));
// shiftEndFloatInput.addEventListener('focus', () => selectInput(shiftEndFloatInput));
// shiftEndRemarkInput.addEventListener('focus', () => selectInput(shiftEndRemarkInput));


document.querySelectorAll('.shift-keyboard-input').forEach(input => {
    input.addEventListener('focus', function () {
        selectInput(input);
    });
});