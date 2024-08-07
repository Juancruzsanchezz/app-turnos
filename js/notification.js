export { noficationPopUp };

function noficationPopUp(message) {  
    let notification = document.getElementById("notification");
    
    notification.style.transform = 'translateX(-50%) translateY(0)';
    notification.children[0].textContent = message;

    setTimeout(() => {
        notification.style.transform = 'translateX(-50%) translateY(-1000px)';  
    }, 4000);
}