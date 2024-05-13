document.addEventListener('DOMContentLoaded', function() {
    function verificarToken() {
        var token = localStorage.getItem('verification_token');
        var carnet = localStorage.getItem('carnet');

        console.log(token);
        console.log(carnet);

        if (!token) {
            console.log('El usuario no está autenticado');
            //window.location.href = 'index.html'
            return;
        }

        fetch('http://localhost:8000/api/auth/check', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              },
              body:JSON.stringify({ 'verification_token': token, 'carnet': carnet })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al verificar el token');
                //window.location.href = 'index.html'
            }
            console.log('El usuario está autenticado');
        })
        .catch(error => {
            console.error('Error al verificar el token:', error.message);
            //window.location.href = 'index.html'
        });
    }
    const logoutBtn = document.getElementById('logoutBtn');
    logoutBtn.addEventListener('click', function() {

        fetch('http://localhost:8000/api/auth/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              },
              body: JSON.stringify({ 'verification_token': token, 'carnet': carnet })
        })
        .then(response => {
            localStorage.removeItem('accessToken');
            console.log('Se cerró sesión');
            window.location.href = 'index.html';
        })
        .catch(error=>{
            window.location.href = 'index.html';
        });
    });
    

    verificarToken();

    
});
