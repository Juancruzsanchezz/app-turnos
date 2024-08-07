import { USER_KEY } from "./app.js";
import { saveUserGymName } from "./gyms.js"; 
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

let iconGym = document.getElementById("icon_gym");
let userName = document.getElementById("user_name");
let gymNameInterface = document.getElementById("gym_name");

function updateUserInterface() {   

    let userSession = JSON.parse(localStorage.getItem(USER_KEY));
    let urlImgGym = searchUrlGym(userSession);

    iconGym.setAttribute('src', `${urlImgGym}`);
    userName.textContent = userSession.firstName;
    gymNameInterface.textContent = userSession.gymName;

    // setTimeout(() => {
    //     window.location.reload();
    // }, 1000);
} 

function searchUrlGym(userSession) {   
    let gyms = JSON.parse(localStorage.getItem("gyms"));

    gyms.forEach(gym => {   
        if (userSession.gymName === gym.gymName) { 
            console.log(gym.gymImageUrl);
            return gym.gymImageUrl;
        }
    });
}

