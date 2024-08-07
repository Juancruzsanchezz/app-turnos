import { USER_KEY } from "./app.js";
export { user, getUserGymName, updateUserInterface };

const urlUsers = "public/users.json";
let users = [];

class user {
    constructor(username, email, password, userType, firstName, lastName, dni, paymentMethod, creditCard = null) {
      this.username = username;
      this.email = email;
      this.password = password;
      this.userType = userType;
      this.firstName = firstName;
      this.lastName = lastName;
      this.dni = dni;
      this.paymentMethod = paymentMethod;
      this.creditCard = creditCard; 
      this.gymName = null;
    }   
}

function loadJSON() {
    fetch(urlUsers)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            users = data.users;
            localStorage.setItem("users", JSON.stringify(users));
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

loadJSON();

function getUserGymName(gymName) { 
    let user = JSON.parse(localStorage.getItem(USER_KEY));
    user.gymName = gymName;
    localStorage.setItem(USER_KEY, JSON.stringify(user));

    return true;
}


function updateUserInterface() {   
    let userSession = JSON.parse(localStorage.getItem(USER_KEY));

    let iconGym = document.getElementById("icon_gym");
    searchUrlGym(userSession, iconGym);

    let userName = document.querySelectorAll(".user_name");
    let gymNameInterface = document.querySelectorAll(".gym_name");

    userName.forEach(elem => {  
        elem.textContent = userSession.firstName;
    });

    gymNameInterface.forEach(elem => {  
        elem.textContent = userSession.gymName;
    });
} 

function searchUrlGym(userSession, iconGym) {   
    let gyms = JSON.parse(localStorage.getItem("gyms"));
        
    gyms.forEach(gym => {   
        if (userSession.gymName === gym.gymName) { 
            iconGym.setAttribute('src', `${gym.gymImageUrl}`);
        }
    });
}

