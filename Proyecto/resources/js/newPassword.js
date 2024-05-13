document.getElementById('newPassword').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const formData = new FormData(this); 
    const jsonData = {}; 
  
    formData.forEach((value, key) => {
      if(key == 'remember') return;
      jsonData[key] = value;
    });

    console.log(JSON.stringify(jsonData));
  
    fetch('http://localhost:8000/api/auth/newPassword', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(jsonData)
    })

    .then(

        window.location.href = 'index.html'
      );
});