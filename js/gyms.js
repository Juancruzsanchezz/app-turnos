import { getUserGymName, updateUserInterface } from "./users.js";
export { updateGyms, saveUserGymName };
const urlGyms = "public/gyms.json";
let gyms = [];

function loadGyms() {   
    fetch(urlGyms)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        gyms = data.gyms;
        localStorage.setItem("gyms", JSON.stringify(gyms));
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}
loadGyms();

function updateGyms() { 
    let gyms = JSON.parse(localStorage.getItem("gyms"));    
    const contentSelectPlace = document.getElementById("select_place_content");

    contentSelectPlace.innerHTML = ``;
    gyms.forEach(gym => {   
        const place = document.createElement("div");
        place.innerHTML = ` 
            <button class="place" value='${gym.gymName}' style="background-image: url(${gym.gymImageUrl});"></button>
        `
        contentSelectPlace.appendChild(place);
    })   
}

function saveUserGymName () {
    const place = document.querySelectorAll(".place");
    let userSelectsGym = false;

    place.forEach(gymSelected => {  
        gymSelected.addEventListener("click", () => {   
            let gymName = gymSelected.value;
            getUserGymName(gymName);
            updateUserInterface();
        })
    });
}