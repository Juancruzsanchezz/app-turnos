import { slideSelectPlace, slideUserInterface, slideStart, sideWays } from "./transition.js";
import { updateGyms, saveUserGymName } from "./gyms.js";
export { USER_KEY };

const USER_KEY = 'userSession';
const userSession = JSON.parse(localStorage.getItem(USER_KEY)) || false;

function app(user) { 
  if (user) {  
    sideWays(slideStart, slideSelectPlace);

    if (user.gymName) {
      sideWays(slideSelectPlace, slideUserInterface);
    } else {  
      updateGyms();
      setTimeout(() => {
        saveUserGymName();
      }, 1000);
    }
  }   
}
app(userSession);