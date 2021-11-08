'use strict';
/* 
[TO GENERATE DUMMIES]
JSON.stringify(Array(40).fill().map(e => ({
    name: ["Buscaminas", "Sudoku", "Tetris", "Space Invaders"][Math.random()*4|0],
    score: Math.round(Math.random()*10000000000000)
}))) 
*/

//---------[ UTIL FUNCTIONS]--------\\

/* Select a part of the HTML*/
const $ = selector => document.querySelector(selector);

/* Takes a form and create a object from him */
const serializeForm = function (form) {
    let  user = getUser()
    var obj = {};
    var formData = new FormData(form);
    for (var key of formData.keys()) {
        let data =  formData.get(key)
        if(data !== user[key] && data.length > 0){
            obj[key] = data;
        };
    }

    return obj;
};

/* Generates a Random color with a low alfa to get the same color armony */
function randomColor() {
    const random = max => Math.random() * max;
    return `rgba(${random(85) + 100}, ${random(85) + 100}, ${random(85) + 100}, 0.48);`
}

/* Format long numbers to get a short version of them*/
function convertNumber(number) {
    const amountId = ['', 'K', 'M', 'B', 'T', 'Qa', 'Qi', 'Sx'];
    let mult = 0;
    while (number >= 1000 && mult < amountId.length - 1) {
        if (number >= 1000) {
            mult++;
            number /= 1000;
        }
    }
    return Math.round(number) + amountId[mult];
}

function displayErrors(errors){
    let display = 'Errors\n\n';
    Object.keys(errors).forEach(key => {
           display +=  `    • ${key}: ${errors[key]}\n`
    });
    return display;
}

function validateForm(form){
    let errors = {};
    let userVal = new RegExp('^[A-Za-z][A-Za-z0-9_]{3,29}$');
    let emailVal = new RegExp("^[a-zA-Z0-9.!#$%&' * +/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)+$");
    //Minimum 8 char, 1 upper letter, 1 lower letter, 1 num and 1 special char
    let passVal = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-.]).{8,}$');
    let nameVal = new RegExp("^[a-zA-Z]{1,15}\\s[a-zA-Z]{1,15}$");

    if (form.email && !emailVal.test(form.email)){
        errors['email'] = "Email Invalid";
    }

    if (form.user && !userVal.test(form.user)){
        errors['user'] = "User Invalid";
    }

    if (form.password && !passVal.test(form.password)){
        errors['password'] = "Password Invalid";
    }

    if (form.name && !nameVal.test(form.name)){
        errors['name'] = "Full Name Invalid";
    }

    return errors;
}

async function checkData(type, data){
    let user = getUser();
    let errors = {};
    if (!user){ 
        errors['log'] = false 
        return errors;
    }
    if(type === 'updateUser'){
        try {
            let users = await fetch('./db/users.json');
            users = await users.json();
            users.forEach(user => {
                console.log(user)
                if(user.email === data.email){
                    errors['email'] = user.email === data.email ? "Email already exist" : false;
                }
                if (user.user === data.user){
                    errors['user']= user.user === data.user ? "User already exist" : false;
                }
            });
            return errors;
        } catch (err) {
            console.log(err)
        }
    }
}
//-------------[END]--------------\\

//---------[ USER FUNCTIONS]--------\\

/* Gets the user form the server or localStorage */
function getUser() {
    let user = JSON.parse(localStorage.getItem("user"));
    return user;
}

/* Sets a user for dev purposes */
function setDummyUser(){
    
    let user = getUser();
    if(!user){
        let dummieUser = JSON.stringify({
            "user": "jdiez",
            "email": "jdiez.estacio@gmail.com",
            "name": "Fco. Javier Diez Garcia",
            "img": "user.jpeg"
        });
        localStorage.setItem("user", dummieUser);
    }
}

async function updateInfo() {
    let form = $('form');
    let data = serializeForm(form);
    if(JSON.stringify(data) != '{}') {
        let errors = validateForm(data);
        if ((JSON.stringify(errors) != '{}')){
            errors = displayErrors(errors);
            alert(errors);
        }else{
            let exist = await checkData("updateUser", data);
            if (JSON.stringify(exist) == '{}'){
                let user = getUser();
                Object.keys(data).forEach(key => {
                    user[key] = data[key];
                });
                user = JSON.stringify(user);
                localStorage.setItem('user', user)
                changeView('data');
            }else{
                exist = displayErrors(exist);
                alert(exist);
            }
        }
    }else{
        changeView('data');
    }
    
}
//---------[ END ]--------\\

//---------[ LOAD VIEW FUNCTIONS ]--------\\
async function loadUserInfo() {
    
    let user = getUser();
    console.log(user);
    if (user) {
        dataDiv.insertAdjacentHTML("afterBegin",
        `<div class="user-img">
        <img src="./assets/img/${user.img}" />
        </div>`
        )
        await changeView('data');
    }
}


async function changeView(view) {
    let data = getUser();
    
    if (view === 'data') {
        let form = $('.user-form')
        if (form) {
            form.remove();
        }
        dataDiv.insertAdjacentHTML("beforeEnd",
        `<div class="user-info">
        <div class="user">
        ${data.user}
        <span class="edit">✏️</span>
        </div>
    
        <div class="email">${data.email}</div>
        <div class="name">${data.name}</div>
        </div>`
        );
        $('.edit').addEventListener('click', () => changeView("form"));
        
    } else if (view === 'form') {
        $('.user-info').remove();
        dataDiv.insertAdjacentHTML("beforeEnd",
        `<div class="user-form">
        <form class="my-form">
        <input type="text" class="user" name="user" value="${data.user}" />
        <input type="text" class="email" name="email" value="${data.email}" />
        <input type="text" class="name" name="name" value="${data.name}" placeholder="Name Last Name" />
        <input type="password" class="password" name="password" placeholder="New Password"/>
        </form>
        <span>
        <button class="change">Change</button>
        <button class="cancel">Cancel</button>
        </span>
        </div>`
        );
        $('.change').addEventListener('click', updateInfo);
        $('.cancel').addEventListener('click', () => changeView("data"));
    }
}

async function loadUserScores() {
    try {
        var games = await fetch('./db/games.json');
        games = await games.json();
        games.forEach(game => {
            game.score = convertNumber(game.score);
            scoreDiv.insertAdjacentHTML("beforeend",
            `<div class="score-card">
            <div class="s-c-name" style="background-color: ${randomColor()};">${game.name}</div>
            <div class="s-c-points">${game.score} pts</div>
            </div>`
            )
        });
    } catch (err) {
        console.log(err)
    }
}
//---------[ END ]--------\\


//---------[ PAGE STARTS ]--------\\
const scoreDiv = $(".user-scores");
const dataDiv = $(".user-card");

async function onInit() {
    setDummyUser();
    await loadUserScores();
    await loadUserInfo();
}

window.addEventListener('load', onInit);
//---------[ END ]--------\\