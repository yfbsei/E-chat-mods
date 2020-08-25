let count = 0;
let spamBanned = 0;
let guestBanned = 0;
const messages = [];
let result;
const wordList = [/\bPm\b/g, /\txt\b/g, /\bpm\b/g, /\bcum\b/g, /\bPM\b/g, /\bhmu\b/g, /\binvite=\b/g, /\btalk to me\b/g, /\bhttps\b/g, /\bhttp\b/g, /\bDm\b/g, /\bDM\b/g, /\bdm\b/g, /\bSkype\b/g, /\bskype\b/g, /\bx︍︍︍x︍︍ld︍︍︍a︍︍te︍︍︍.c︍︍︍o︍︍︍︍︍︍m\b/g, /\b.cc\b/g, /\bapp.unsee\b/g, /\binch\b/g, /\bINCH\b/g, /\bhorny\b/g, /\bBBC\b/g, /\bmessage\b/g, /\bsnap\b/g, /\bsnapchat\b/g, /\bdiscord\b/g, /\b.com\b/g, /\binsta\b/g, /\binstagram\b/g, /\b.site\b/g, /\b.SITE\b/g, /\b.︍︍︍︍︍p︍︍︍︍︍︍w\b/g, /\b.co\b/g, /\b.ca\b/g, /\bwww.\b/g, /\bW︍︍W︍︍W︍︍︍︍.\b/g, /\bsnepchat\b/g, /\bAny girls\b/g, /\bnudez\b/g, /\bnudes\b/g, /\bS`napchat\b/g, /\bcam\b/g, /\bcock\b/g, /\b.club\b/g, /\bporn\b/g, /\bSnapchat\b/g, /\bsex chat\b/g, /\bAny females here\b/g, /\bany indian girl\b/g, /\bprivate\b/];
ban = id => {
    CometdConversation.open(id), CometdConversation.sendMessage('Banned for 10min: Flagged for potentially spamming', id), CometdConversation.close(id), CometdModerator.banAccount(id), CometdModerator.removeAccountMessages(id), count = 0, messages.length = 0, spamBanned = spamBanned + 1;
};
banGuest = (id, message) => {
    CometdConversation.open(id), CometdConversation.sendMessage('Banned for 10min: Flagged Due to either posting: inappropriate words, social media, links, or asking to chat in private. Sign up not to get banned next time!. Message which was flagged:', id), CometdConversation.sendMessage(message, id), CometdConversation.close(id), CometdModerator.banAccount(id), CometdModerator.removeAccountMessages(id), count = 0, guestBanned = guestBanned + 1;
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
            if (count === 1) {
                ban(userAvatar.src.substring(41, 77))
            };

            wordList.some(v => userMessage === v) ? console.log('found') : console.log('false')
            userAvatar.naturalHeight < 51 && wordList.some(rx => rx.test(userMessage)) ? banGuest(userAvatar.src.substring(41, 77), userMessage) : false;
        }
    } 
};

const observer = new MutationObserver(callback);
observer.observe(targetNode, config);
