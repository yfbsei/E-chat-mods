 //Reloads page every 3min
setInterval(() => location.reload(), 200000)

//Selects chatbox
const messageBox = document.querySelector('.chat-box-layer__messages')

//Observes each new added messages in chatbox
const config = {
    attributes: false,
    childList: true,
    subtree: false
};

const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (mutation.addedNodes.length) {

            //Username from message 
            const userName = mutation.addedNodes[0].lastElementChild.firstElementChild.firstElementChild
            const printUserName = userName.textContent


            //Users avatar  
            const userAvatar = mutation.addedNodes[0].firstElementChild

            check(userAvatar, printUserName)

        }
    })

});

observer.observe(messageBox, config)


//Array of bluehead user Names from chatbox
var userListArray = []

//Checks if users avatar is a bluehead
check = (img, userName) => {

            //If user avatar naturalHeight and naturalWidth less than 99
            if (img.naturalHeight < 99 && img.naturalWidth < 99) {

                //Pushes the bluehead user's username to userListArray     
                userListArray.push(userName)

                //For each bluehead user name in array. Run kickBan function 
                userListArray.forEach((name, i) => {
                    setTimeout(() => {
                        kickBan(name);
                    }, i * 2000);
                })
            }
        }


//Kicks or bans the bluehead
kickBan = userName => {
    //Selects all People in chatroom   
    var allUserInChat = document.querySelectorAll('.UsersListUsername')

    //Searchs bluehead user name from all user names in chat
    for (i = 0; i < allUserInChat.length; i++) {

        //If found kick or ban the bluehead
        if (allUserInChat[i].textContent == userName) {
            allUserInChat[i].click()
            setTimeout(removeMessagesKick, 1000)
            setTimeout(removeMessagesKick, 1300)
            setTimeout(() => userListArray.shift(), 1500)
        }
    }
}

removeMessagesKick = () => {
    document.querySelector('#account-popup__room-remove-messages').click() // change 'account-popup__room-kick' to 'account-popup__room-ban' if want to ban and vice versa
    document.querySelector('#account-popup__room-kick').click() // change 'account-popup__room-kick' to 'account-popup__room-ban' if want to ban and vice versa
}