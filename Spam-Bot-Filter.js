let count = 0;
const wordList = ['Pm', 'PM', 'Dm', 'inch', 'INCH', 'horny', 'BBC', 'message', 'snap', 'snapchat', 'discord', '.com', 'insta', 'instagram', '.site', '.co', '.ca', 'www.' , 'W︍︍W︍︍W︍︍︍︍.', 'snepchat', 'nudez', 'nudes', 'S`napchat', 'cam', 'cock', '.club', 'porn', 'Snapchat', 'sex chat', 'Any females here', 'any indian girl', 'chat'];
ban = id => {CometdConversation.open(id), CometdConversation.sendMessage('Banned for 10min: Due to spamming', id), CometdConversation.close(id), CometdModerator.banAccount(id), CometdModerator.removeAccountMessages(id), count = 0};
banGuest = id => {CometdConversation.open(id), CometdConversation.sendMessage('Banned for 10min: Due to ethier posting link, inappropriate word or social media advertising. Sign up not to get banned next time!.', id), CometdConversation.close(id), CometdModerator.banAccount(id), CometdModerator.removeAccountMessages(id), count = 0};
window.setInterval(unBan = () => {Array.from(document.querySelectorAll(".ModeratorPanelBannedUserAvatar")).filter(check => check.naturalHeight > 49).map(id => id.src.substring(41, 77)).forEach(y => CometdModerator.unbanAccount(y))}, 600000); // unBan guest account every 10min
//---Dom Mutaion| 
var targetNode = document.querySelector('.chat-box-layer__messages')
var config = { attributes: true, childList: true, subtree: false };
const callback = function(mutationsList) {for(let mutation of mutationsList) {if (mutation.addedNodes.length) {

                //Gets user Avatar
              const userAvatar = mutation.addedNodes[0].firstElementChild; 

              //Gets username from each message
              const userName = mutation.addedNodes[0].lastElementChild.firstElementChild.firstElementChild.innerText

                //Gets text message from each message
              const userMessage = mutation.addedNodes[0].lastElementChild.lastElementChild.innerText
              
              if (userMessage.length > 110 && userName == userName) {
                count = count + 1;
                if(count == 2) {
                  ban(userAvatar.src.substring(41, 77));
                }
              }
              if (userMessage.length < 110) {
                count = 0;
              }

              if (userAvatar.naturalHeight < 51 && wordList.some(word => userMessage.includes(word)) == true) {
                banGuest(userAvatar.src.substring(41, 77));
              }
        }
    }
};

const observer = new MutationObserver(callback);
observer.observe(targetNode, config);
