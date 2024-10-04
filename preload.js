const { contextBridge, ipcRenderer } = require('electron');


function decodeJwt(token) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map(function (c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                })
                .join('')
        );

        return JSON.parse(jsonPayload);
    } catch (error) {
        console.error("Error decoding JWT:", error);
        return null;
    }
}


function checkJwtExpiration(expirationTimestamp) {
    const intervalId = setInterval(() => {
        const currentTimestamp = Date.now();

        if (currentTimestamp >= expirationTimestamp) {
            clearInterval(intervalId);
            localStorage.clear();
            window.location.href = './login.html';
        }
    }, 1000);
}


function checkLogUser() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
        const decodedToken = decodeJwt(jwt);

        if (decodedToken) {
            const expirationTimestamp = decodedToken.exp * 1000; 
            const currentTimestamp = Date.now();

            if (currentTimestamp < expirationTimestamp) {
                checkJwtExpiration(expirationTimestamp);
            } else {
                window.location.href = './login.html';
            }
        }
    } else {
        window.location.href = './login.html';
    }
}

contextBridge.exposeInMainWorld('api', {
    getBaseUrl: () => ipcRenderer.invoke('get-base-url'),
    getLoginPath: () => ipcRenderer.invoke('get-login-path'),
    saveJwtToken: (token) => localStorage.setItem('jwt', token),
    getJwtToken: () => localStorage.getItem('jwt'),
    saveUserRole: (role) => localStorage.setItem('role', role),
    getUserRole: () => localStorage.getItem('role'),
    saveUserName: (userName) => localStorage.setItem('userName', userName),
    getUserName: () => localStorage.getItem('userName'),
    saveUserId: (userId) => localStorage.setItem('userId', userId),
    getUserId: () => localStorage.getItem('userId'),
    clearAuthData: () => {
        localStorage.removeItem('jwt');
        localStorage.removeItem('role');
        localStorage.removeItem('userName');
        localStorage.removeItem('userId');
        return true;
    },
    checkLogUser: checkLogUser, 
    getUnits: () => ipcRenderer.invoke('get-units'),
    getImagePath: () => ipcRenderer.invoke('get-image-path'),
    getRoleIds: () => ipcRenderer.invoke('get-role-ids'), 
});
