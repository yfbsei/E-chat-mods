var textBox = document.querySelector('#InputTextArea')
var sendButton = document.querySelector('#SendButton')
var que = []

//---Dom Mutaion| 
var targetNode = document.querySelector('.chat-box-layer__messages')

var config = { attributes: true, childList: true, subtree: false };


const callback = function(mutationsList) {
    for(let mutation of mutationsList) {
        if (mutation.addedNodes.length) {

                //Gets Height+Width of user Avatar
              const userAvatar = mutation.addedNodes[0].firstElementChild
              const naturalHeight = userAvatar.naturalHeight
              const naturalWidth = userAvatar.naturalWidth

              //Gets username from each message
              const userName = mutation.addedNodes[0].lastElementChild.firstElementChild.firstElementChild
              const printUserName = userName.innerText


                //Gets text message from each message
              const userMessage = mutation.addedNodes[0].lastElementChild.lastElementChild
              const userText = userMessage.innerText     
              
              const com = new RegExp("!kick:");
              const checkCommand = com.test(userText)
      if (naturalHeight > 100  && checkCommand === true ) {
            const use = userText.slice(7);
            que.push(use)
            setTimeout(() => que.forEach((name, i) => {
                setTimeout(() => {
                 kick(name);
                }, i * 4000);
              }) ,2000)
            } 
        }
    }
};


const observer = new MutationObserver(callback);

observer.observe(targetNode, config);

//-----

function kick(username) {

removeMessagesKick = () => {
    document.querySelector('#account-popup__room-remove-messages').click()
    document.querySelector('#account-popup__room-kick').click()
}


firstResult = () => {
    document.querySelector('#account-search__result').firstElementChild.click()
    setTimeout(removeMessagesKick, 1000)
    setTimeout(removeMessagesKick, 1500)
    setTimeout(() => que.shift(), 2000)
    setTimeout(() => que.shift(), 2100)
}

check = () => {
    const img = document.querySelector('#account-search__result').firstElementChild.firstElementChild
    if (img.naturalHeight < 99 && img.naturalWidth < 99 ) {
        firstResult()
    }
}

search = () => {
    
    const userSearch = document.querySelector('#UserSearchInput')
    const userSearchSubmit = document.querySelector('#UserSearchSubmitImg')

    userSearch.value = username
    userSearchSubmit.click()
    setTimeout(check, 2000)
 
}

    search()
}




