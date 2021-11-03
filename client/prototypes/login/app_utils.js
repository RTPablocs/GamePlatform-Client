function send_points_game(user_token,points){


    var url= 'http://0.0.0.0:4000/api/user/points';   /* Url al server -> PUT points */



    const data = {                                     /* Datos que le pasamos al server, puntos y token del user */
        "data":{                                             
            "user" : user_token,
            "points":points
            }
    
        }
        

    fetch(url,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": user
        },
        body: JSON.stringify(data),
        cache: 'no-cache',
        mode:'cors'
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
    console.log(data);                  /* Esto devolverá el nombre de usuario con los puntos ya actualizados */
    })
    .catch(function(err) {

      console.log('ERROR');

    });


    event.preventDefault()

}