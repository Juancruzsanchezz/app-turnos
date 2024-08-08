export { showLoader, hideLoader };

window.addEventListener("DOMContentLoaded", () => { 
    showLoader();
});

window.addEventListener("load", () => { 
    setTimeout(() => {
        hideLoader();
    }, 0);
});

const loader = document.getElementById("loader");
const showLoader = () => {  
    loader.classList.add("active");
}

const hideLoader = () => {  
    loader.classList.remove("active");
}