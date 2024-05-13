document.getElementById('crearCuenta').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const formData = new FormData(this); 
    const jsonData = {}; 
  
    formData.forEach((value, key) => {
      if(key == 'remember') return;
      jsonData[key] = value;
    });

    console.log(JSON.stringify(jsonData));
  
    fetch('http://localhost:8000/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(jsonData)
    })
    .then(response => {
      if (!response.ok) {
        var error = document.getElementById('error');
        error.textContent = 'El correo o carnet ya han sido registrados en la plataforma';
        document.getElementById("password").value = "";
        throw new Error('Error al enviar el formulario');
      }
      return response.json();
    })
    .then(data => {
      console.log('Respuesta de la API:', data);
      console.log(jsonData['carnet'])
      fetch('http://localhost:8000/api/auth/sendVerification', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        'carnet': jsonData['carnet']
      })
    })
    .then(

      window.location.href = 'email.html'
    )
    })
    .catch(error => {
      console.error('Error:', error);
      return;
    });
    });

  
  