const url_server_login = 'http://0.0.0.0:4000/api/user/login';



function submit_form() {

var email = document.getElementById('email').value;
var password = document.getElementById('password').value;

const user = {
  "user":{
     "email" : email,
     "password":password
     }

}

/* Para enviar datos JSON */
  
fetch(url_server_login,{

  method: 'POST',
  headers: {
      'Content-Type': 'application/json'
  },
  body: JSON.stringify(user),
  cache: 'no-cache'
  
}).then(function(response) {
  return response.json();
}).then(function(data) {

  console.log(data.user.token);
  const token = data.user.token;           /* Cojemos el token del usuario que ha iniciado sesion y lo guardamos en localstorage*/
  localStorage.setItem('token',token);
 
 }).catch(function(err) {
  console.error(err);
});


event.preventDefault() 


}


