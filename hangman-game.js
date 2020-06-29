var quiz = {};
var dashes = [];
var found = 0;
var message = "";

/*LIST OF POTENTIAL PUZZLES AS OBJECTS*/

/*OBJECTS*/
var cat = {
  name: "cat",  
  puzzle: ["C", "A", "T"],
  player: new Array(3)
}

var bear = {
    name: "bear",  
  puzzle: ["B", "E", "A", "R"],
  player: new Array(4),
}

var dog = {
    name: "dog",
    puzzle: ["D", "O", "G"],
    player: new Array(3),
  }

  var nuts = {
    name: "nuts",
    puzzle: ["N", "U", "T", "S"],
    player: new Array(4),
  }

  var pump = {
    name: "pump",
    puzzle: ["P", "U", "M", "P"],
    player: new Array(4),
  }

  var anime = {
    name: "anime",
    puzzle: ["A", "N", "I", "M", "E"],
    player: new Array(5),
  }

  var jamal = {
    name: "jamal",
    puzzle: ["J", "A", "M", "A", "L"],
    player: new Array(5),
  }

  var sei = {
    name: "sei",
    puzzle: ["S", "E", "I"],
    player: new Array(3),
  }

  var chat = {
    name: "chat",
    puzzle: ["C", "H", "A", "T"],
    player: new Array(4),
  }

  var calm = {
    name: "calm",
    puzzle: ["C", "A", "L", "M"],
    player: new Array(4),
  }

  var selection = {
    name: "selection",
    puzzle: ["S", "E", "L", "E", "C", "T", "I", "O", "N"],
    player: new Array(9),
  }

  var university = {
    name: "university",
    puzzle: ["U", "N", "I", "V", "E", "R", "S", "I", "T", "Y"],
    player: new Array(10),
  }

  var rhyme = {
    name: "rhyme",
    puzzle: ["R", "H", "Y", "M", "E"],
    player: new Array(5),
  }

  var jazz = {
    name: "jazz",
    puzzle: ["J", "A", "Z", "Z"],
    player: new Array(4) 
  }


/*LIST OF POTENTIAL PUZZLES IN AN ARRAY*/
var puzzles = [cat, bear, dog, nuts, pump, anime, jamal, sei, chat, calm, selection, university, rhyme, jazz]


//-----------------------------------------

function start() {
    const textBox = document.querySelector('#InputTextArea')
    const sendButton = document.querySelector('#SendButton')

    quiz = {};
    quiz = puzzles[Math.floor(Math.random() * puzzles.length)];
  
    dashes = (function (quiz) {
        let guess = [];
  
        for (var i = 0; i < quiz.puzzle.length; i++) {
  
            if (quiz.puzzle[i] == " ") {
                guess.push(" ");
            } else {
                guess.push("_");
            }
  
        }
        return guess;
    })(quiz);
  
  
  
    textBox.value = dashes.join(" ") ;
    sendButton.click()
  }



/*GUESS FUNCTION*/
function guess(letter) {
    const textBox = document.querySelector('#InputTextArea')
    const sendButton = document.querySelector('#SendButton')

    if (quiz.name == letter) {
        win()
    } else {

    /*FIRST LOOP: Assigns values if any match*/
    for (var i = 0; i < quiz.puzzle.length; i++) {
        
        if (letter.toUpperCase() == quiz.puzzle[i] ) {
            dashes[i] = letter.toUpperCase();  
            
        } else {
           
           /*second loop will handle as this loop gives last value by deafult*/
        }
    }
    
    /*SECOND LOOP: returns a value based on if value exists or not...has a break to stop loop from returning last value by default*/
    for (var i = 0; i < quiz.puzzle.length; i++) {
        
        if (letter.toUpperCase() == quiz.puzzle[i]) {
            found = 1;
            break
            
            
        } else {
           
            found = 2;
        }
    }
    
    /*Use returned value to display message to the user accordingly */
    if(found == 1 ) {
        message = "Yes there are " +  "s in the solution: \n" + dashes.join(" ") ;
        textBox.value = message
        sendButton.click() ;
        message="";   
    
    /*STORING THE PLAYERS PROGRESS IN THE OBJECT ITSELF FOR FUTURE USE*/
    quiz.player = dashes.slice(0);
    
    /*ALWAYS END FUNCTION WITH A CHECK FOR WIN OR LOSE*/
    if (dashes.toString() === quiz.puzzle.toString()) {
            
        win();
    }
      
  
   }
  }
}

  /*RESET EVERYTHING if the player wins or loses*/
function gameOver() {
    quiz = {};
    dashes = [];
    found = 0;
    message = "";
  }
  
  /*WIN FUNCTION*/
  function win() {
    const textBox = document.querySelector('#InputTextArea')
    const sendButton = document.querySelector('#SendButton')
    textBox.value = "WINNER CHICKEN DINNER! "
    sendButton.click()
    gameOver();
    startFirst()
  }


  startFirst = () => {
    observerOne.disconnect();
    setTimeout(() => observer.observe(targetNode, config) , 1000)
    const textBox = document.querySelector('#InputTextArea')
    const sendButton = document.querySelector('#SendButton')
  
  textBox.value = "Welcome to Hangman game! Type !startHangman to begin"
  sendButton.click()
  }



//---Main Menu
const textBox = document.querySelector('#InputTextArea')
const sendButton = document.querySelector('#SendButton')

const startmenu = textBox.value = "Welcome to Hangman game! Type !startHangman to begin"
sendButton.click()


//---Dom Mutaion| starting
var targetNode = document.querySelector('.chat-box-layer__messages')

var config = { attributes: true, childList: true, subtree: false };

const callback = function(mutationsList) {
    for(let mutation of mutationsList) {
        if (mutation.addedNodes.length) {

                //Gets Height+Width of user Avatar
              const userAvatar = mutation.addedNodes[0].firstElementChild
              const naturalHeight = userAvatar.naturalHeight
              const naturalWidth = userAvatar.naturalWidth
              const naturalBoth = naturalHeight + naturalWidth
        
                //Gets text message from each message
              const userMessage = mutation.addedNodes[0].lastElementChild.lastElementChild
              const userText = userMessage.innerText              
                     
      if (naturalBoth > 102 && userText == "!startHangman") {
            start()
            setTimeout(() => startSecond(), 1000)
            }
        }
    }
};


const observer = new MutationObserver(callback);

observer.observe(targetNode, config);




//---Dom Mutaion| The game

const callbackOne = function(mutationsListOne) {
    for(let mutation of mutationsListOne) {
        if (mutation.addedNodes.length) {
               //Gets Height+Width of user Avatar
               const userAvatar = mutation.addedNodes[0].firstElementChild
               const naturalHeight = userAvatar.naturalHeight
               const naturalWidth = userAvatar.naturalWidth
               const naturalBoth = naturalHeight + naturalWidth

                //Gets username from each message
                //const userName = mutation.addedNodes[0].lastElementChild.firstElementChild.firstElementChild
                //const printUserName = userName.innerText

                 //Gets text message from each message
               const userMessage = mutation.addedNodes[0].lastElementChild.lastElementChild
               const userText = userMessage.innerText 
               
                if (naturalBoth > 102 ) {
                    guess(userText)
                    
                } 
        }
    }
}

const observerOne = new MutationObserver(callbackOne);


startSecond = () => {
    observer.disconnect();
    setTimeout(() => observerOne.observe(targetNode, config) , 2000)
}

















  






