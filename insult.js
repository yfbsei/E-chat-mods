var textBox = document.querySelector('#InputTextArea')
var sendButton = document.querySelector('#SendButton')

//---Dom Mutaion| 
var targetNode = document.querySelector('.chat-box-layer__messages')

var config = { attributes: true, childList: true, subtree: false };


const callback = function(mutationsList) {
    for(let mutation of mutationsList) {
        if (mutation.addedNodes.length) {

                //Gets Height+Width of user Avatar
              const userAvatar = mutation.addedNodes[0].firstElementChild
              const naturalHeight = userAvatar.naturalHeight

              //Gets username from each message
              const userName = mutation.addedNodes[0].lastElementChild.firstElementChild.firstElementChild
              const printUserName = userName.innerText


                //Gets text message from each message
              const userMessage = mutation.addedNodes[0].lastElementChild.lastElementChild
              const userText = userMessage.innerText     
              
              const com = new RegExp("!insult:");
              const checkCommand = com.test(userText)

      if (naturalHeight > 99  && checkCommand === true ) {
            const use = userText.slice(9);
            var myArray = [
                "you disgracefully misshapen blob of horse shit fuming under the sweltering heat! Crawl back into the slimy mud splattered scums where you come from",
                "you hideously pitiful dereliction of proper genetics! You filthy, disgusting, putrid puddle of pus expelled from the ungodly gangrenous gape of a Somalian whore",
                "you unwholesome, lamentably accumulation of hypertension, diabetes, and high cholesterol. You diaper-wearing, existential societal burden",
                "you hopelessly distasteful bucket of rancid goat piss. You are an amalgamation of the most repulsively odorous bodily fluids from a Detroit whorehouse",
                "you misinformed, illiterate amalgamation of nothing. You intellectually circumcised insignificant dolt who contributes nothing to society but misery and ignorance",
                "you are a foul-mouthed, putrid combination of the worst and most insignificant genetic qualities your wretched parents could ever muster and contribute",
                "you are a cerebrally deformed mongoloid, dropped from the ghastly gutter gape of the local, semen gargling, $3 AIDS-infested whore",
                "you miserably misshapen minuscule mark of muck and mold!"
              ];
            CometdRoom.sendMessage(`${use}: ${myArray[Math.floor(Math.random()*myArray.length)]}`)
           
            } 
        }
    }
};


const observer = new MutationObserver(callback);

observer.observe(targetNode, config);

//-----
