import { USER_KEY } from "./app.js";
import { getUserGymName } from "./users.js";
import { sideWays, slideUserInterface, showNavBar ,hiddenNavBar } from "./transition.js";
import { showLoader, hideLoader } from "./loader.js";
import { noficationPopUp } from "./notification.js";
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
    });
}

function saveUserGymName () {
    const place = document.querySelectorAll(".place");

    place.forEach(gymSelected => {  
        gymSelected.addEventListener("click", () => {   
            let gymName = gymSelected.value;
            getUserGymName(gymName);
            
            noficationPopUp("¡selected gym!");

            setTimeout(() => {
                window.location.reload();
            }, 1000);
        })
    });
}

const slideSelectActivity = document.getElementById("slide_select_activity");
const btnNewReservation = document.getElementById("btn_new_reservation");

function updateActivities() {    
    let userSession = JSON.parse(localStorage.getItem(USER_KEY));
    let gyms = JSON.parse(localStorage.getItem("gyms"));
    const selectActivities = document.getElementById("select_activity");
    document.getElementById("icon_back_activities").addEventListener("click", () => {   
        sideWays(slideSelectActivity, slideUserInterface);
        showNavBar();
    }); 

    selectActivities.innerHTML = ``;
    gyms.forEach(gym => {   
        
        if (gym.gymName === userSession.gymName) { 
            for (let i = 0; i < gym.activities.length; i++) {
                const activity = document.createElement("div");
                activity.innerHTML = `  
                    <button class="activity" value="${gym.activities[i].name}" style="background-image: url(./assets/img/back/${gym.activities[i].name}.png);">   
                            <span>${gym.activities[i].name}</span>
                    </button>
                `;
                selectActivities.appendChild(activity);
            }

            const activitiesOptions = document.querySelectorAll(".activity");

            activitiesOptions.forEach(option => {   
                option.addEventListener("click", () =>{   
                    newSection(gym.activities, option.value, slideSelectActivity);
                });
            });
        }
    });
} 

btnNewReservation.addEventListener("click", () => { 
    sideWays(slideUserInterface, slideSelectActivity);
    hiddenNavBar();
    updateActivities();
});

function newSection(arrayContent, titleContent, slideBack) { 
    const sliderContainer = document.getElementById("slider");
    const slider = document.createElement("div");
    
    let nameSlide = titleContent[0].toUpperCase() + titleContent.slice(1);

    sliderContainer.style.transform = "translateX(0)";
    slider.innerHTML = `    
        <header class="slider_header">    
            <i class="slider_header_icon icon_back" id="icon_back_section"> 
                <svg width="25" height="25" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8 4C8 4.27614 7.77614 4.5 7.5 4.5H1.70711L3.85355 6.64645C4.04882 6.84171 4.04882 7.15829 3.85355 7.35355C3.65829 7.54882 3.34171 7.54882 3.14645 7.35355L0.146446 4.35355C-0.0488155 4.15829 -0.0488155 3.84171 0.146446 3.64645L3.14645 0.646447C3.34171 0.451184 3.65829 0.451184 3.85355 0.646447C4.04882 0.841709 4.04882 1.15829 3.85355 1.35355L1.70711 3.5H7.5C7.77614 3.5 8 3.72386 8 4Z" fill="white"/>
                </svg>
            </i>
            <div class="slider_header_icon">
                <p id="header_title">${nameSlide}</p>
            </div>
        </header>
        <main class="slider_main" style="padding-bottom: 20%;">
            <article class="select" id="select_content">    
            </article>
        </main>
    `;
    
    setTimeout(() => {
        const selectContent = document.getElementById("select_content");
        document.getElementById("icon_back_section").addEventListener("click", () => {   
            sideWays(sliderContainer, slideBack)
            slider.innerHTML = ``;
        })
        
        selectContent.innerHTML = ``;
        const searchNameKey = () => {   
            arrayContent.forEach(activity => {  
                if (activity.name === titleContent) { 
                    activity.shifts.forEach(shift => {
                        const shifts = document.createElement("div");
                        shifts.innerHTML = `    
                            <button class="interface_primary_button">    
                                <article>   
                                    <div>   
                                        <p> 
                                            ${shift.time}
                                        </p>
                                    </div>
                                    <p>Disponible (${shift.availability})</p>
                                    <i> 
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8 15C4.13401 15 1 11.866 1 8C1 4.13401 4.13401 1 8 1C11.866 1 15 4.13401 15 8C15 11.866 11.866 15 8 15ZM8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16Z" fill="black"/>
                                            <path d="M8 4C8.27614 4 8.5 4.22386 8.5 4.5V7.5H11.5C11.7761 7.5 12 7.72386 12 8C12 8.27614 11.7761 8.5 11.5 8.5H8.5V11.5C8.5 11.7761 8.27614 12 8 12C7.72386 12 7.5 11.7761 7.5 11.5V8.5H4.5C4.22386 8.5 4 8.27614 4 8C4 7.72386 4.22386 7.5 4.5 7.5H7.5V4.5C7.5 4.22386 7.72386 4 8 4Z" fill="black"/>
                                        </svg>
                                    </i>
                                </article>
                            </button>
                        `;
                        selectContent.appendChild(shifts);
                    });
                }
            });
        }
        setTimeout(() => {
            searchNameKey();
        }, 0);
    }, 0);

    sliderContainer.appendChild(slider);
}