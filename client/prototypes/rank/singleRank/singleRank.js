const url_server_singlelRank = 'http://127.0.0.1:4000/api/rank/single' //Assign the url for the games that users has played
const url_server_gameRank = 'http://127.0.0.1:4000/api/rank/game';  //Assign the url to obtain the information of a single game ranking
//Do a request to the server
fetch(url_server_singlelRank,{

    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    },
    cache: 'no-cache'
    
  }).then(function(response) {
      return response.json();
  
  }).then(function(data) {
    //Print the games that users had played
    for(let i = 0; i<data.length;i++){
        var select = document.getElementById('selectGame');
        var option = document.createElement('option');
        var nameGame = document.createTextNode(data[i]._id.nameGame);

        option.appendChild(nameGame);
        select.appendChild(option);
    }
    //This is an event that will hear the selection of the game
    select.addEventListener('change',function(){
        //In this line, we obtain the name of game
        var game = this.options[select.selectedIndex].text;
        var body = {game:game};
        //Do a request to the server for a information of single game ranking
        fetch(url_server_gameRank,{

            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body),
            cache: 'no-cache'
            
          }).then(function(response) {
              return response.json();
          
          }).then(function(data) {
                var rank = document.getElementById('rank');
                rank.innerHTML="";
                //Print the tittle of the name of game
                var tittle = document.getElementById('tittle');
                tittle.innerHTML="";

                var text = document.createElement('text');

                text.classList.add('city-text');
                var nameGame = game;
                var nameText = document.createTextNode(nameGame);

                text.appendChild(nameText);
                tittle.appendChild(text);
              // Print the rank of user depending on the position of users and her score
              for(let i = 0; i<data.length;i++){
                  if(i==0){
                     /**FIRST POSITION */
                    var divFirst = document.createElement('div');
                    var divFirst_2 = document.createElement('div');
                    var divFirst_3 = document.createElement('div');
                    var divFirst_4 = document.createElement('div');
                    var divFirst_5 = document.createElement('div');
                    var divFirst_6 = document.createElement('div');

                    var position1 = document.createTextNode(i+1);
                    var namePlayer1 = document.createTextNode(data[i].singleScore.user);
                    var score1 = document.createTextNode('+ '+data[i].singleScore.game.score);

                    divFirst.classList.add('post','highranking','first');
                    divFirst_2.classList.add('flex');
                    divFirst_3.classList.add('count');
                    divFirst_4.classList.add('rank');
                    divFirst_5.classList.add('post-content');
                    divFirst_6.classList.add('post-item','category');

                    divFirst_4.appendChild(position1);
                    divFirst_3.appendChild(score1);
                    divFirst_6.appendChild(namePlayer1);
                    divFirst.appendChild(divFirst_2);
                    divFirst.appendChild(divFirst_3);
                    divFirst_2.appendChild(divFirst_4);
                    divFirst_2.appendChild(divFirst_5);
                    divFirst_5.appendChild(divFirst_6);
                    rank.appendChild(divFirst);

                  }else if(i==1){
                    /**SECOND POSITION */
                    var divSecond = document.createElement('div');
                    var divSecond_2 = document.createElement('div');
                    var divSecond_3 = document.createElement('div');
                    var divSecond_4 = document.createElement('div');
                    var divSecond_5 = document.createElement('div');
                    var divSecond_6 = document.createElement('div');

                    var position2 = document.createTextNode(i+1);
                    var namePlayer2 = document.createTextNode(data[i].singleScore.user);
                    var score2 = document.createTextNode('+ '+data[i].singleScore.game.score);

                    divSecond.classList.add('post','highranking','second');
                    divSecond_2.classList.add('flex');
                    divSecond_3.classList.add('count');
                    divSecond_4.classList.add('rank');
                    divSecond_5.classList.add('post-content');
                    divSecond_6.classList.add('post-item','category');

                    divSecond_4.appendChild(position2);
                    divSecond_3.appendChild(score2);
                    divSecond_6.appendChild(namePlayer2);
                    
                    divSecond.appendChild(divSecond_2);
                    divSecond.appendChild(divSecond_3);
                    divSecond_2.appendChild(divSecond_4);
                    divSecond_2.appendChild(divSecond_5);
                    divSecond_5.appendChild(divSecond_6);
                    rank.appendChild(divSecond);

                  }else if(i==2){
                    /**THIRD POSITION */
                    var divThird= document.createElement('div');
                    var divThird_2 = document.createElement('div');
                    var divThird_3 = document.createElement('div');
                    var divThird_4 = document.createElement('div');
                    var divThird_5 = document.createElement('div');
                    var divThird_6 = document.createElement('div');

                    var position3 = document.createTextNode(i+1);
                    var namePlayer3 = document.createTextNode(data[i].singleScore.user);
                    var score3 = document.createTextNode('+ '+data[i].singleScore.game.score);

                    divThird.classList.add('post','highranking','second');
                    divThird_2.classList.add('flex');
                    divThird_3.classList.add('count');
                    divThird_4.classList.add('rank');
                    divThird_5.classList.add('post-content');
                    divThird_6.classList.add('post-item','category');

                    divThird_4.appendChild(position3);
                    divThird_3.appendChild(score3);
                    divThird_6.appendChild(namePlayer3);
                    
                    divThird.appendChild(divThird_2);
                    divThird.appendChild(divThird_3);
                    divThird_2.appendChild(divThird_4);
                    divThird_2.appendChild(divThird_5);
                    divThird_5.appendChild(divThird_6);
                    rank.appendChild(divThird);

                  }else{
                    //**REST OF RANK */
                    var divPost= document.createElement('div');
                    var divPost_2 = document.createElement('div');
                    var divPost_3 = document.createElement('div');
                    var divPost_4 = document.createElement('div');
                    var divPost_5 = document.createElement('div');
                    var divPost_6 = document.createElement('div');

                    var position = document.createTextNode(i+1);
                    var namePlayer = document.createTextNode(data[i].singleScore.user);
                    var score = document.createTextNode('+ '+data[i].singleScore.game.score);

                    divPost.classList.add('post');
                    divPost_2.classList.add('flex');
                    divPost_3.classList.add('count');
                    divPost_4.classList.add('rank');
                    divPost_5.classList.add('post-content');
                    divPost_6.classList.add('post-item','category');

                    divPost_4.appendChild(position);
                    divPost_3.appendChild(score);
                    divPost_6.appendChild(namePlayer);
                    
                    divPost.appendChild(divPost_2);
                    divPost.appendChild(divPost_3);
                    divPost_2.appendChild(divPost_4);
                    divPost_2.appendChild(divPost_5);
                    divPost_5.appendChild(divPost_6);
                    rank.appendChild(divPost);
                  }
              }
           }).catch(function(err) {
              console.error(err);
          });

    })
   }).catch(function(err) {
      console.error(err);
});