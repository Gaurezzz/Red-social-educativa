document.getElementById('login').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const formData = new FormData(this); 
    const jsonData = {}; 
  
    formData.forEach((value, key) => {
        if(key == 'remember') return;
        jsonData[key] = value;
    });

    console.log(JSON.stringify(jsonData));
  
    fetch('http://localhost:8000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(jsonData)
    })
    .then(response => {
      if (response.status === 401) {
  
          var error = document.getElementById('error');
          error.textContent = 'Credenciales incorrectas';
          document.getElementById("password").value = "";
          return;
      }

      if (jsonData['email_verified_at'] == null){
        var error = document.getElementById('error');
          error.textContent = 'El correo electrónico ingresado no está verificado';
          document.getElementById("password").value = "";
          return;
      }
    })
    .then(data => {
      console.log('Respuesta de la API:', data);
    })
    .catch(error => {
      console.error('Error:', error);

      
    });
  });

  
  