const url_server = 'http://0.0.0.0:4000/api/user/register';

function submit_form() {

var validacion = 'false';

    var username = document.getElementById('username').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;



    if(validacion == 'false'){

        if(username.length == 0){
          document.getElementById('e_user').classList.add('error');
          document.getElementById('e_user').classList.remove('ocultar');
        } else{
            document.getElementById('e_user').classList.add('ocultar');
            document.getElementById('e_user').classList.remove('error');
        }

        if(email.length == 0){
          document.getElementById('e_email').classList.add('error');
          document.getElementById('e_email').classList.remove('ocultar');
        } else{
            document.getElementById('e_email').classList.add('ocultar');
            document.getElementById('e_email').classList.remove('error');
        }

        if(password.length == 0){
          document.getElementById('e_password').classList.add('error');
          document.getElementById('e_password').classList.remove('ocultar');
        } else{
            document.getElementById('e_password').classList.add('ocultar');
            document.getElementById('e_password').classList.remove('error');
        }

    }else{

        const user = {
            "user":{
                "username" : username,
               "email" : email,
               "password":password
               }
          
        }
    
    
    /* Para enviar datos JSON */
      
        fetch(url_server,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user),
            cache: 'no-cache'
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
        
            const token = data.user.token;           /* Cojemos el token del usuario nuevo registrado y lo guardamos en localstorage */
            localStorage.setItem('token',token)
        })
        .catch(function(err) {

            /* Devuelve del servidor que el username ya esta en uso */

            document.getElementById('e_user').classList.add('error');
            document.getElementById('e_user').classList.remove('ocultar');

            /* Devuelve del server qwue el email ya esta en uso */

            document.getElementById('e_email').classList.add('error');
            document.getElementById('e_email').classList.remove('ocultar');

        });
    
    
        event.preventDefault()


    }
    
  
    
    }