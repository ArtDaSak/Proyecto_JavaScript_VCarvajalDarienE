const apiUrl = 'https://67fc6c5d1f8b41c816866d84.mockapi.io/api/v1/users';

window.addEventListener('scroll', function () {
    const header = document.querySelector('.header');
    const logo = document.querySelector('.header img');

    if (window.scrollY > 10) {
        header.style.background = 'linear-gradient(to bottom right, rgba(43, 39, 47), rgba(1, 1, 1))';
        logo.src = '../assets/img/logos/textLogo/textLogoColumbiaBlue.png';
    } else {
        header.style.background = 'rgba(43, 39, 47, 0.50)';
        logo.src = '../assets/img/logos/textLogo/textLogoTangBlue.png';
    }
});

document.getElementById('register').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const birth = Math.floor(new Date(document.getElementById('birth').value).getTime() / 1000); // Convertir a timestamp
    const gender = document.getElementById('gender').value;
    const password = document.getElementById('password').value;
    
    const user = {
        createdAt: Math.floor(Date.now() / 1000),
        name: name,
        email: email,
        birth: birth,
        gender: gender,
        password: password
    };
    
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Registro exitoso:', data);
        alert('Registro exitoso');
    })
    .catch(error => {
        console.error('Error en el registro:', error);
        alert('Error en el registro');
    });
});

document.getElementById('login').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    fetch(`${apiUrl}?email=${email}`)
    .then(response => response.json())
    .then(data => {
        if (data.length > 0) {
            const user = data[0];
            if (user.password === password) {
                console.log('Inicio de sesión exitoso:', user);
                alert('Inicio de sesión exitoso');
            } else {
                alert('Contraseña incorrecta');
            }
        } else {
            alert('Usuario no encontrado');
        }
    })
    .catch(error => {
        console.error('Error en el inicio de sesión:', error);
        alert('Error en el inicio de sesión');
    });
});