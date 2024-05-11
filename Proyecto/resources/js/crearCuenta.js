document.getElementById('crearCuenta').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const formData = new FormData(this); 
    const jsonData = {};
  
    formData.forEach((value, key) => {
      jsonData[key] = value;
    });
  
    fetch('http://localhost:8000/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Origin': 'http://localhost'
      },
      body: JSON.stringify(jsonData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al enviar el formulario');
      }
      return response.json();
    })
    .then(data => {
      console.log('Respuesta de la API:', data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  });
  