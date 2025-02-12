function showLogin() {
    document.getElementById('register').style.display = 'none';
    document.getElementById('login').style.display = 'block';
}

function showRegister() {
    document.getElementById('login').style.display = 'none';
    document.getElementById('register').style.display = 'block';
}

function register() {
    let name = document.getElementById('regName').value.trim();
    let email = document.getElementById('regEmail').value.trim();
    let password = document.getElementById('regPassword').value;
    
    if (!name || !email || !password) {
        alert('All Fields are required');
        return;
    }

    if (name.length < 5) {
        alert('Name must be at least 5 characters');
        return;
    }

    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert('Email not valid');
        return;
    }

    if (password.length < 8) {
        alert('Password must be at least 8 characters');
        return;
    }

    if (localStorage.getItem(email)) {
        alert('Email already exists');
        return;
    }

    let user = { name, email, password };
    localStorage.setItem(email, JSON.stringify(user));
    alert('Registration successful');
    showLogin();
}


function login() {
    let email = document.getElementById('loginEmail').value;
    let password = document.getElementById('loginPassword').value;
    let user = JSON.parse(localStorage.getItem(email));
    
    if (!user || user.password !== password) {
        alert('Invalid email or password!');
        return;
    }
    
    localStorage.setItem('loggedInUser', email);
    showProfile(user);
}

function showProfile(user) {
    document.getElementById('login').style.display = 'none';
    document.getElementById('profile').style.display = 'block';
    document.getElementById('userName').innerText = user.name;
    document.getElementById('userEmail').innerText = user.email;
}

function logout() {
    localStorage.removeItem('loggedInUser');
    document.getElementById('profile').style.display = 'none';
    showLogin();
}

window.onload = function() {
    let loggedInEmail = localStorage.getItem('loggedInUser');
    if (loggedInEmail) {
        let user = JSON.parse(localStorage.getItem(loggedInEmail));
        showProfile(user);
    }
}