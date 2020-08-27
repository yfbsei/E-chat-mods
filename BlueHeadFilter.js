// Close ALL pm's !! before running code!!!!

let user;
let myId = AccountController.getId(); // comment out if dont want this feature
let unBan = [];
setInterval(() => {user = Array.from(document.querySelectorAll('.message')).pop()}, 1000);

class User {
    constructor(id, dimension, name, message) {
      this.id = id,
      this.blueOrNot = dimension.naturalHeight < 51 ? this.blueOrNot = true : this.blueOrNot = false;
      this.name = name,
      this.message = message;
    }

    get userInfo() {
      return `Id: ${this.id} BlueOrNot: ${this.blueOrNot} Name: ${this.name} Message: ${this.message}`;
    }
  }
  
setInterval(() => {userOne = new User(user.children[0].src.slice(-48, -12),user.children[0], user.children[1].firstChild.firstChild.textContent, user.children[1].lastChild.textContent), banBlueHead(userOne.id, userOne.blueOrNot, userOne.name)}, 1000);

banBlueHead = (id, isBlue, userName) => {
  if(isBlue == true) {
    CometdModerator.removeAccountMessages(id);
    CometdModerator.banAccount(id);
    unBan.push(id);

    /* comment out line below. If dont want this feature */
    CometdRoom.sendMessage(`{ ${userName}: banned for being blue }`)
   setTimeout(() => {CometdModerator.removeAccountMessages(myId)}, 3000);
    /* comment out above this line. if dont want this feature */

  }
}

window.setInterval(() => {
  unBan.forEach(id => {
    CometdModerator.unbanAccount(id);
  })
}, 1800000); // unBan guest account every 30min 
