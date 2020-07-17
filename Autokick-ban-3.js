"use strict";
//---Dom Mutaion| 
var targetNode = document.querySelector('.chat-box-layer__messages');
var config = {
    attributes: true,
    childList: true,
    subtree: false
};
const callback = function (mutationsList) {
    for (let mutation of mutationsList) {
        if (mutation.addedNodes.length) {
            //Gets Height+Width of user Avatar
            const userAvatar = mutation.addedNodes[0].firstElementChild;
            const naturalHeight = userAvatar.naturalHeight;
            const naturalWidth = userAvatar.naturalWidth;
            if (naturalWidth < 99 && naturalHeight < 99) {
                const kick = userAvatar.src.substr(41, 36);
                CometdModerator.kickAccount(kick);
                CometdModerator.removeAccountMessages(kick);
            }
        }
    }
};
const observer = new MutationObserver(callback);
observer.observe(targetNode, config);
