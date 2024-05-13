document.getElementById('passwordchange').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const formData = new FormData(this); 
    const jsonData = {}; 
  
    formData.forEach((value, key) => {
      if(key == 'newsletter' || key == 'confirm-password') return;
      jsonData[key] = value;
    });

    console.log(JSON.stringify(jsonData));
  
    fetch('http://localhost:8000/api/auth/changePassword', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(jsonData)
    })
    .then(response => {
        window.location.href = 'changepassword.html'
    })
});
  