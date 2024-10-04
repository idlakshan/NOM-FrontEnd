const userNameInput = document.querySelector("#login_userName");
const passwordInput = document.querySelector("#login_password");
const keypadButtons = document.querySelectorAll('.keyboard-button');

let selectedLoginInput;

document.addEventListener('DOMContentLoaded', () => {
  userNameInput.focus();
  logUser();

  document.getElementById('login_button').addEventListener('click', handleLogin);
  document.querySelector('.keyboard-button-enter').addEventListener('click', handleLogin);
});



async function handleLogin() {
  const userId = document.getElementById('login_userName').value;
  const password = document.getElementById('login_password').value;

  try {
    const baseUrl = await window.api.getBaseUrl();
    const response = await fetch(`${baseUrl}/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId, password })
    });

    if (response.ok) {
      const data = await response.json();
      window.api.saveJwtToken(data.jwt);
      window.api.saveUserRole(data.role);
      window.api.saveUserName(data.userName);
      window.api.saveUserId(data.userId);

      if (data.role === 'Admin') {
        window.location.href = './admin.html';
      } else if (data.role === 'cashier') {
        window.location.href = './cashier-takeaway.html';
      }
    } else {
      console.error('Login failed:', response.statusText);
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: 'Please check your credentials.',
        customClass: {
          confirmButton: 'alert-orange-button',
        }
      });
    }
  } catch (error) {
    console.error('Error during login:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'An unexpected error occurred. Please try again later.',
    });
  }
}


function logUser() {
  const jwt = window.api.getJwtToken();

  if (jwt) {
    const decodedToken = decodeJwt(jwt);

    if (decodedToken) {
      const expirationTimestamp = decodedToken.exp * 1000;
      const currentTimestamp = Date.now();

      if (currentTimestamp < expirationTimestamp) {
        const role = window.api.getUserRole();

        if (role === "Admin") {
          window.location.href = './admin.html';
        } else if (role === "cashier") {
          window.location.href = './cashier-takeaway.html';
        }
      } else {
        window.api.clearAuthData();
        window.location.href = './login.html';
      }
    }
  } else {
    console.log("No jwt login");
    //  window.location.href = './login.html';
  }
}

function decodeJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Error decoding JWT:", error);
    return null;
  }
}


//toggle letters function 
function toggleCase() {
  var buttons = document.querySelectorAll('.keyboard-button:not(.keyboard-button-enter):not(.keyboard-button-backspace)');
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

//toggle numbers function
function toggleSymbol() {
  var symbols = ['!', '@', '#', '$', '%', '-', '&', '*', '(', ')'];
  var buttons = document.querySelectorAll('.keyboard-button-number');
  var symbolButtons = document.querySelector('.keyboard-button-special');

  buttons.forEach(function (button, index) {
    if (button.textContent.includes('!#*')) {
      button.textContent = symbols[index];
    } else if (button.textContent === symbols.join('')) {
      button.textContent = '123?';
    } else {
      if (!isNaN(parseInt(button.textContent))) {
        button.textContent = symbols[index];
      } else {
        button.textContent = index === 9 ? '0' : (index + 1);
      }
    }
  });

  if (symbolButtons.textContent === '123') {
    symbolButtons.textContent = '!#*';
  } else {
    symbolButtons.textContent = '123';
  }
}

//Login input function
function handleButtonClick(event) {
  const buttonValue = event.target.textContent;

  if (buttonValue === 'abc?' || buttonValue === '!#*' || buttonValue === 'ABC?' || buttonValue === '123') {
    return;
  }

  if (selectedLoginInput) {
    if (buttonValue === 'Backspace') {
      selectedLoginInput.value = selectedLoginInput.value.slice(0, -1);
    }else if(buttonValue === "Enter"){
         return
    } else {
      selectedLoginInput.value += buttonValue;
    }

    const inputEvent = new Event('input', {
      bubbles: true,
      cancelable: true,
    });
    selectedLoginInput.dispatchEvent(inputEvent);
  }
}


keypadButtons.forEach(button => {
  button.addEventListener('click', handleButtonClick);
});

function selectLoginInput(input) {
  selectedLoginInput = input;
}


userNameInput.addEventListener('focus', () => selectLoginInput(userNameInput));
passwordInput.addEventListener('focus', () => selectLoginInput(passwordInput));
