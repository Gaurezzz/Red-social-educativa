document.getElementById('login').addEventListener('submit', function(event) {
  event.preventDefault();

  const formData = new FormData(this); 
  const jsonData = {}; 

  formData.forEach((value, key) => {
      if(key !== 'remember') { // Corregido: Se cambió '==' por '!=='
          jsonData[key] = value;
      }
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
    if (!response.ok) { // Corregido: Verificar si la respuesta es exitosa
        var error = document.getElementById('error');
        error.textContent = 'Credenciales incorrectas';
        document.getElementById("password").value = "";
        return Promise.reject('Credenciales incorrectas');
    }
    return response.json(); 
  })
  .then(data => {
    console.log('Respuesta de la API:', data);
    console.log(data['user']['email_verified_at']);
    console.log(typeof(data));

    if (data['user']['email_verified_at'] == null){ // Corregido: Comprobar si 'email_verified_at' es null
      var error = document.getElementById('error');
        error.textContent = 'El correo electrónico ingresado no está verificado';
        document.getElementById("password").value = "";
        return;
    }
    // Agregar aquí cualquier otra lógica que necesites con los datos recibidos
  })
  .catch(error => {
    console.error('Error:', error);
  });
});
