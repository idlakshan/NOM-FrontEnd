
const loginPage = 'src/views/login.html';
const logoutButton = document.getElementById('logOut');

document.addEventListener('DOMContentLoaded', async function () {
    const baseUrl = await window.api.getBaseUrl();
    //auth-check
    window.api.checkLogUser();
    countAllEmployee(baseUrl);
    countAllOrdersId(baseUrl);
    countAllDishes(baseUrl);
    dashboardReport(baseUrl);
    loadAllInDoorTables(baseUrl);
    resizeCanvas();

    document.getElementById('check').addEventListener('click', function () {
        const checkbox = document.getElementById('check');
        if (checkbox.checked) {
            loadAllInDoorTables(baseUrl);
        } else {
            loadAllOutDoorTables(baseUrl);
        }
    });

    logoutButton.addEventListener('click', function () {
        logout();
    });

    window.addEventListener('resize', resizeCanvas);
})

function resizeCanvas() {
    const canvas = document.getElementById('barchartTwo');
    const parent = canvas.parentElement;
    canvas.width = parent.offsetWidth;
    canvas.height = parent.offsetHeight;
}


window.addEventListener('resize', resizeCanvas);



// Function to count all Employees
async function countAllEmployee(baseUrl) {
    const countElement = document.getElementById('count_emp');
    countElement.innerText = '0';

    try {
        const response = await fetch(baseUrl + "/user/users", {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("jwt")}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const totalEmployees = parseInt(data, 10); 

       
        countUpAnimationEmployee(countElement, totalEmployees);
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        countElement.innerText = 'Error'; 
    }
}

// Function for count-up animation
function countUpAnimationEmployee(element, targetCount) {
    let currentCount = 0;
    const increment = 1; 
    const duration = 1000; 
    const stepTime = Math.abs(Math.floor(duration / targetCount));

    const timer = setInterval(() => {
        currentCount += increment;
        element.innerText = currentCount;

        if (currentCount >= targetCount) {
            clearInterval(timer); 
        }
    }, stepTime);
}


// Function to count all orders
async function countAllOrdersId(baseUrl) {
    const countElement = document.getElementById('count_orders');
    countElement.innerText = '0'; 

    try {
        const response = await fetch(baseUrl + "/orders/orders", {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("jwt")}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const totalOrders = parseInt(data.data, 10);  

        const displayCount = totalOrders >= 999 ? '999+' : totalOrders;

        countUpAnimationOrders(countElement, displayCount);  
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        countElement.innerText = 'Error'; 
    }
}

// Function for count-up animation
function countUpAnimationOrders(element, targetCount) {
    let currentCount = 0;
    const duration = 1000; 
    let increment = 1; 

    if (targetCount > 100) {
        increment = 50;
    } else if (targetCount > 10) {
        increment = 5;
    }

    const stepTime = Math.abs(Math.floor(duration / (targetCount / increment)));

    const timer = setInterval(() => {
        if (currentCount + increment > targetCount) {
            currentCount = targetCount;
            element.innerText = currentCount;
            clearInterval(timer); 
        } else {
            currentCount += increment;
            element.innerText = currentCount;
        }
    }, stepTime);
}


// Function to count all dishes
async function countAllDishes(baseUrl) {
    const countElement = document.getElementById('count_dishes');
    countElement.innerText = '0'; 

    try {
        const response = await fetch(baseUrl + "/dish/dishes", {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("jwt")}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const totalDishes = parseInt(data, 10); 

        countUpAnimationDishes(countElement, totalDishes); 
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        countElement.innerText = 'Error'; 
    }
}


function countUpAnimationDishes(element, targetCount) {
    let currentCount = 0;
    const duration = 1000; 
    let increment = 1;  

    if (targetCount > 100) {
        increment = 20;
    } else if (targetCount > 10) {
        increment = 5;
    }

    const stepTime = Math.abs(Math.floor(duration / (targetCount / increment)));

    const timer = setInterval(() => {
        if (currentCount + increment > targetCount) {
            currentCount = targetCount;
            element.innerText = currentCount;
            clearInterval(timer); 
        } else {

            currentCount += increment;
            element.innerText = currentCount;
        }
    }, stepTime);
}



// Function to load all in-door tables
function loadAllInDoorTables(baseUrl) {
    fetch(baseUrl + "/table/inDoor", {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("jwt")}`,
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(response => {
       // console.log(response);

        const tableCardSection = document.getElementById('tableCardSection');
        tableCardSection.innerHTML = ''; 

        let tablesHtml = ''; 

        response.data.forEach(tableData => {
            let tableColor;
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

            tablesHtml += `
                <div class="dinein-table" data-name="${tableData.status}" style="width: 32%; height: 35%; margin-bottom: 3%;">
                    <div class="dinein-table-header" style="background-color:${tableColor};">
                        <h5 id="table_tableId" style="color:white;">${tableData.tableId}</h5>
                    </div>
                    <div class="dinein-table-body" style="height: 60%;">
                        <img src="../images/tables/family1.jpg" style="height: 70px; width: 95%;" alt="">
                    </div>
                    <div class="dinein-table-footer" style="border-bottom-left-radius: 12px; border-bottom-right-radius: 6px; height: 38%;">
                        <p id="tableSize">${tableData.tableSize}</p>
                    </div>
                </div>
            `;
        });

        tableCardSection.innerHTML = tablesHtml; 
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}



// Function to load all out-door tables
function loadAllOutDoorTables(baseUrl) {
    fetch(baseUrl + "/table/outDoor", {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("jwt")}`,
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(response => {
        const tableCardSection = document.getElementById('tableCardSection');
        tableCardSection.innerHTML = ''; 

        let tablesHtml = ''; 

        response.data.forEach(tableData => {
            let tableColor;
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

            tablesHtml += `
                <div class="dinein-table" data-name="${tableData.status}" style="width: 32%; height: 35%; margin-bottom: 3%;">
                    <div class="dinein-table-header" style="background-color:${tableColor};">
                        <h5 id="table_tableId" style="color:white;">${tableData.tableId}</h5>
                    </div>
                    <div class="dinein-table-body" style="height: 60%;">
                        <img src="../images/tables/family1.jpg" style="height: 70px; width: 95%;" alt="">
                    </div>
                    <div class="dinein-table-footer" style="border-bottom-left-radius: 12px; border-bottom-right-radius: 6px; height: 38%;">
                        <p id="tableSize">${tableData.tableSize}</p>
                    </div>
                </div>
            `;
        });

        tableCardSection.innerHTML = tablesHtml;
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        alert('Cannot load out-door tables');
    });
}


//dashboard report
async function dashboardReport(baseUrl) {
    const ctx4 = document.getElementById('barchartTwo').getContext('2d'); 

    try {
        const response = await fetch(baseUrl + "/report", {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("jwt")}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        // Process the data
        const labels = data.data.map(dayArray => dayArray[0]);
        const ordersData = data.data.map(dayArray => dayArray[4]);
        const card = data.data.map(dayArray => dayArray[2]);
        const creditData = data.data.map(dayArray => dayArray[3]);
        const cash = data.data.map(dayArray => dayArray[1]);

        // Create the chart
        new Chart(ctx4, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: "orders",
                        backgroundColor: "#FF9D76",
                        data: ordersData
                    },
                    {
                        label: "card",
                        backgroundColor: "#51EAEA",
                        data: card
                    },
                    {
                        label: "credit",
                        backgroundColor: "orange",
                        data: creditData
                    },
                    {
                        label: "cash",
                        backgroundColor: "#5D6D7E",
                        data: cash
                    }
                ]
            },
            options: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'Chart JS Grouped Bar Chart Example'
                }
            }
        });
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}


// Get the checkbox element
const checkbox = document.getElementById('toTakeAwayToggle');
checkbox.addEventListener('click', function () {

    if (!checkbox.checked) {
        window.location = './cashier-takeaway.html';
    }
});


function logout() {
  const isClear=window.api.clearAuthData()
    if (isClear) {
        window.location = './login.html';
    }
}


