let count = 0;
let spamBanned = 0;
let guestBanned = 0;
const messages = [];
const wordList = ['Pm', 'pm', 'PM', 'https', 'http', 'Dm', 'Skype', 'x︍︍︍x︍︍ld︍︍︍a︍︍te︍︍︍.c︍︍︍o︍︍︍︍︍︍m', '.cc', 'app.unsee', 'inch', 'INCH', 'horny', 'BBC', 'message', 'snap', 'snapchat', 'discord', '.com', 'insta', 'instagram', '.site', '.SITE', '.︍︍︍︍︍p︍︍︍︍︍︍w', '.co', '.ca', 'www.', 'W︍︍W︍︍W︍︍︍︍.', 'snepchat', 'nudez', 'nudes', 'S`napchat', 'cam', 'cock', '.club', 'porn', 'Snapchat', 'sex chat', 'Any females here', 'any indian girl', 'chat'];
ban = id => {
    CometdConversation.open(id), CometdConversation.sendMessage('Banned for 10min: Flagged for potentially spamming', id), CometdConversation.close(id), CometdModerator.banAccount(id), CometdModerator.removeAccountMessages(id), count = 0, messages.length = 0, spamBanned = spamBanned + 1;
};
banGuest = (id, message) => {
    CometdConversation.open(id), CometdConversation.sendMessage('Banned for 10min: Flagged Due to posting link, inappropriate word or social media advertising. Sign up not to get banned next time!. Message which was flagged: ', id), CometdConversation.sendMessage(message, id), CometdConversation.close(id), CometdModerator.banAccount(id), CometdModerator.removeAccountMessages(id), count = 0, guestBanned = guestBanned + 1;
};
window.setInterval(unBan = () => {
    Array.from(document.querySelectorAll(".ModeratorPanelBannedUserAvatar")).filter(check => check.naturalHeight > 49).map(id => id.src.substring(41, 77)).forEach(y => CometdModerator.unbanAccount(y))
}, 600000); // unBan guest account every 10min

// Dom Mutaion
var targetNode = document.querySelector('.chat-box-layer__messages')
var config = {
    attributes: true,
    childList: true,
    subtree: false
};
const callback = function(mutationsList) {
    for (let mutation of mutationsList) {
        if (mutation.addedNodes.length) {

            //Gets user Avatar
            const userAvatar = mutation.addedNodes[0].firstElementChild;

            //Gets username from each message
            const userName = mutation.addedNodes[0].lastElementChild.firstElementChild.firstElementChild.textContent

            //Gets text message from each message
            const userMessage = mutation.addedNodes[0].lastElementChild.lastElementChild.textContent

            messages.includes(userMessage) ? count = count + 1 : count = 0, messages.length = 0;
            messages.push(userMessage);
            if (count == 2) {
                ban(userAvatar.src.substring(41, 77))
            };

            userAvatar.naturalHeight < 51 && wordList.some(word => userMessage.includes(word)) ? banGuest(userAvatar.src.substring(41, 77), userMessage) : false;
        }
    }
};

const observer = new MutationObserver(callback);
observer.observe(targetNode, config);
