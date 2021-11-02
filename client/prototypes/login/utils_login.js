/* URL's para conectarse con el server */
const url_server_register = 'http://0.0.0.0:4000/api/user/register';
const url_server_login = 'http://0.0.0.0:4000/api/user/login';


/* Validación register */

function submit_form_register() {


    
    var validacion = 0;

    var username = document.getElementById('username').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;



    if(validacion != 3){

        if(username.length == 0){
          document.getElementById('e_user').classList.add('error');
          document.getElementById('e_user').classList.remove('ocultar');
        } else{
            document.getElementById('e_user').classList.add('ocultar');
            document.getElementById('e_user').classList.remove('error');

            validacion ++;
        }

        if(email.length == 0){
          document.getElementById('e_email').classList.add('error');
          document.getElementById('e_email').classList.remove('ocultar');
        } else{
            document.getElementById('e_email').classList.add('ocultar');
            document.getElementById('e_email').classList.remove('error');

            validacion ++;
        }

        if(password.length == 0){
          document.getElementById('e_password').classList.add('error');
          document.getElementById('e_password').classList.remove('ocultar');
        } else{
            document.getElementById('e_password').classList.add('ocultar');
            document.getElementById('e_password').classList.remove('error');

            validacion ++;
        }

    }

    
    if(validacion == 3){
   
        const user = {                                   /* Creamos un Objeto para pasar los datos de user */
            "user":{
                "username" : username,
               "email" : email,
               "password":password
               }
          
        }
    
         send_data_server(url_server_register,user);     /* Enviamos los datos del nuevo usuario registrado */
    
         validacion = 0;
    }
    
    window.location('#home');
    
}







    /* Validación login */


    function submit_form_login() {

    var validacion = 0;

    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;


    if(validacion != 2){

     
        if(email.length == 0){
          document.getElementById('e_email').classList.add('error');
          document.getElementById('e_email').classList.remove('ocultar');
        } else{
            document.getElementById('e_email').classList.add('ocultar');
            document.getElementById('e_email').classList.remove('error');

            validacion ++;
        }

        if(password.length == 0){
          document.getElementById('e_password').classList.add('error');
          document.getElementById('e_password').classList.remove('ocultar');
        } else{
            document.getElementById('e_password').classList.add('ocultar');
            document.getElementById('e_password').classList.remove('error');
            
            validacion ++;
        }

    }
    
    
    if(validacion == 2){

        const user = {
            "user":{
                "email" : email,
                "password":password
                }
        
            }

        send_data_server(url_server_login,user);

        validacion = 0;


        window.location('#home');
    }

   



    }


     
/* Funcion para enviar datos JSON al server */

    function send_data_server(url,data_env){
        console.log('llega fetch');

        fetch(url,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data_env),
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

            console.log('ERROR');

            /* Devuelve del servidor que el username ya esta en uso o ... */

            document.getElementById('e_user').classList.add('error');
            document.getElementById('e_user').classList.remove('ocultar');

            /* Devuelve del server qwue el email ya esta en uso o ... */

            document.getElementById('e_email').classList.add('error');
            document.getElementById('e_email').classList.remove('ocultar');

        });
    
    
        event.preventDefault()

    }


/* Carousel */

window.onload = function () {
 
    var slideIndex = 0;

    showSlides();
    
    function showSlides() {
           var i;
           var slides = document.getElementsByClassName("mySlides");
           for (i = 0; i < slides.length; i++) {
           slides[i].style.display = "none";
           }
    
           slideIndex++;
           if(slideIndex > slides.length) {slideIndex = 1}
           slides[slideIndex-1].style.display = "block";
           setTimeout(showSlides,3000);
    }
} 