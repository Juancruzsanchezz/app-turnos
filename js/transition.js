export { slideSelectPlace, slideUserInterface, slideStart, sideWays };

const slideStart = document.getElementById("slide_start");
const slideSingIn = document.getElementById("slide_sing_in");
const slideSingUp = document.getElementById("slide_sing_up");
const slideSelectPlace = document.getElementById("slide_select_place");
const slideUserInterface = document.getElementById("user_interface");

const navIcons = document.querySelectorAll(".interface_nav_icon");
const navMarker = document.getElementById("marker");
const allUserinterface = document.querySelectorAll(".user_interface_section");

const btnStart = document.getElementById("btn_start");
const btnSingUpStart = document.getElementById("btn_sing_up_start");
const btnBackSingIn= document.getElementById("back_sing_in");
const btnBackSingUp= document.getElementById("back_sing_up");


btnStart.addEventListener("click", () => {  
    sideWays(slideStart, slideSingIn);
});

btnSingUpStart.addEventListener("click", () => {    
    sideWays(slideStart, slideSingUp);
});

btnBackSingIn.addEventListener("click", () => { 
    sideWays(slideSingIn, slideStart);
});

btnBackSingUp.addEventListener("click", () => { 
    sideWays(slideSingUp, slideStart);
});

function sideWays(hidden, show) {   
    show.style.transform = 'translateX(0)';
    hidden.style.transform = 'translateX(-100%)';
}

navIcons.forEach(icon => {  
    icon.addEventListener("click", () => {  
        navIcons.forEach(icon => {  
            icon.classList.remove("active");
        });

        icon.classList.add("active");
        let valueTranslate = icon.value * 100;
        navMarker.style.transform = `translateX(${valueTranslate}%)`;
        
        allUserinterface.forEach(userInterface => { 
            userInterface.style.transform = 'translateX(-100%)';
            userInterface.style.left = '0';
        });

        allUserinterface[icon.value].style.transform = 'translateX(-50%)';
        allUserinterface[icon.value].style.left = '50%';
    });
});