import { slideSelectPlace, slideUserInterface, slideStart, sideWays } from "./transition.js";
import { updateGyms, saveUserGymName } from "./gyms.js";
import { updateUserInterface } from "./users.js";
export { USER_KEY };

const USER_KEY = 'userSession';
const userSession = JSON.parse(localStorage.getItem(USER_KEY)) || false;

function app(session) { 
  if (session) {  
    sideWays(slideStart, slideSelectPlace);
    updateUserInterface();
    if (userSession.gymName) {
      sideWays(slideSelectPlace, slideUserInterface);

    } else {  
      updateGyms();
      saveUserGymName();
    }
  }   
}
app(userSession);