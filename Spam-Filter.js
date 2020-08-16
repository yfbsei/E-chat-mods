let count = 0;
ban = id => {CometdConversation.open(id), CometdConversation.sendMessage('Banned for 10min, Due to spamming', id), CometdConversation.close(id), CometdModerator.banAccount(id), CometdModerator.removeAccountMessages(id), count = 0};

//---Dom Mutaion| 
var targetNode = document.querySelector('.chat-box-layer__messages')
var config = { attributes: true, childList: true, subtree: false };

const callback = function(mutationsList) {
    for(let mutation of mutationsList) {
        if (mutation.addedNodes.length) {

                //Gets user Avatar
              const userAvatar = mutation.addedNodes[0].firstElementChild.src.substring(41, 77);

              //Gets username from each message
              const userName = mutation.addedNodes[0].lastElementChild.firstElementChild.firstElementChild.innerText

                //Gets text message from each message
              const userMessage = mutation.addedNodes[0].lastElementChild.lastElementChild.innerText
              
              if (userMessage.length > 110 && userName == userName) {
                count = count + 1;
                if(count == 2) {
                  ban(userAvatar);
                }
              }

              if (userMessage.length < 110) {
                count = 0;
              }
        }
    }
};

const observer = new MutationObserver(callback);
observer.observe(targetNode, config);
