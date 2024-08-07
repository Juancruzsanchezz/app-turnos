import { USER_KEY } from './app.js';
import { user } from './users.js';
import { noficationPopUp } from './notification.js';

document.getElementById("btn_sing_in").addEventListener("click", (e) => {   
    e.preventDefault();
    singIn();
});

document.getElementById("btn_sing_up").addEventListener("click", (e) => {   
    e.preventDefault();
    singUp();
});

function singIn() { 
    let userLocal = JSON.parse(localStorage.getItem("users"));

    let usernameSingIn = document.getElementById("username_sing_in").value;
    let passSingIn = document.getElementById("password_sing_in").value;

    let userFinded = false;
    for (let i = 0; i < userLocal.length; i++) {
        if(usernameSingIn === userLocal[i].username && passSingIn === userLocal[i].password) { 
            userFinded = !userFinded;
            localStorage.setItem(USER_KEY, JSON.stringify(userLocal[i]));

            noficationPopUp("¡registered user!");
            setTimeout(() => {
                window.location.reload();
            }, 700);

            break;
        }
    }

    if(!userFinded) {    
       noficationPopUp("¡incorrect username or password!"); 
    }
}

function singUp() { 
    let userLocal = JSON.parse(localStorage.getItem("users"));
    
    let usernameSingUp = document.getElementById("username_sing_up").value;
    let emailSingUp = document.getElementById("email_sing_up").value;
    let passSingUp = document.getElementById("pass_sing_up").value.trim();
    let confPassSingUp = document.getElementById("confpass_sing_up").value.trim();

    if(usernameCheck(usernameSingUp, userLocal) && emailCheck(emailSingUp, userLocal) && checkPass(passSingUp, confPassSingUp)) {   
        
        let userSession = new user( 
            usernameSingUp,
            emailSingUp,
            passSingUp,
            "regular",
            null,
            null,
            null,
            null,
            null
        ); 

        localStorage.setItem(USER_KEY, JSON.stringify(userSession));

        noficationPopUp("¡Registered user successfully!");

        setTimeout(() => {
            window.location.reload();
        }, 700);
    }
}

function usernameCheck(username, userLocal) {  
    if(username.length < 4 || username.length > 20) { 
        noficationPopUp("¡The username must be between 4 and 20 characters!");
        return false;
    } 

    userLocal.forEach(user => { 
        if(username === user.username) {    
            noficationPopUp("¡Existing username!");
            return false;
        }
    });

    return true;
}

function emailCheck(emailUser, userLocal) {    
    userLocal.forEach(user => { 
        if(emailUser === user.email) {  
            noficationPopUp("¡This email is already registered!");
            return false;
        }
    });

    return true;
}

function checkPass(passUser, confPassUser) { 
    if(passUser !== confPassUser) { 
        noficationPopUp("¡Passwords do not match!");
        return false;
    }    
    else if (passUser.length < 8) {   
        noficationPopUp("¡Password must be at least 8 characters!");
        return false;
    }

    return true;
}