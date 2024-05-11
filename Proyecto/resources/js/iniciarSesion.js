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

  
  