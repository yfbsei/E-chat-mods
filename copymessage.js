//---Dom Mutaion| 
var targetNode = document.querySelector('.chat-box-layer__messages')

var config = { attributes: true, childList: true, subtree: false };


const callback = function(mutationsList) {
    for(let mutation of mutationsList) {
        if (mutation.addedNodes.length) {

               /* Gets Height+Width of user Avatar
              const userAvatar = mutation.addedNodes[0].firstElementChild
              const naturalHeight = userAvatar.naturalHeight
              const naturalWidth = userAvatar.naturalWidth */

              //Gets username from each message
              const userName = mutation.addedNodes[0].lastElementChild.firstElementChild.firstElementChild
              const printUserName = userName.innerText


                //Gets text message from each message
              const userMessage = mutation.addedNodes[0].lastElementChild.lastElementChild
              const userText = userMessage.innerText     
              
              if (printUserName === "Enter user name here") {
                CometdRoom.sendMessage(userText);
                break;
              }

        }
    }
};


const observer = new MutationObserver(callback);

observer.observe(targetNode, config);