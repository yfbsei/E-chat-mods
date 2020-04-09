
//reloads page every 3min
setInterval(() => location.reload(), 200000)

// Gets all guest accounts usernames from main chat

let userListArray = []

guestPush = () => {
  const avatar = document.getElementsByClassName('message__avatar')

  for (let i = 0; i < avatar.length; i++) {

    if (avatar[i].naturalHeight < 99 && avatar[i].naturalWidth < 99 ) {
      const blueUserNames = document.getElementsByClassName('message__username')
      userListArray.push(blueUserNames[i].textContent)
    }

  }

}

let userList;

checkDuplicities = () => {
  const userListSet = new Set(userListArray)
  userList = [...userListSet]
}


// kicks and remove messages
function modAction() {
  setTimeout(() => document.getElementById('account-popup__room-kick').click(), 200); // change 'account-popup__room-kick' to 'account-popup__room-ban' if want to ban and vice versa

  setTimeout(() => document.getElementById('account-popup__room-kick').click(), 200); // change 'account-popup__room-kick' to 'account-popup__room-ban' if want to ban and vice versa

  setTimeout(() => document.getElementById('account-popup__room-remove-messages').click(), 400);

  setTimeout(() => document.getElementById('account-popup__room-remove-messages').click(), 400);


}

// Search Users in search box
function searchUser() {

  const writeInsbox = document.getElementById('UserSearchInput')
  const searchSubmit = document.getElementById("UserSearchSubmitImg")


  for (let i = 0; i < userList.length; i++) {
    task(i);
  }

  function task(i) {
    setTimeout(function() {
      writeInsbox.value = userList[i]
      searchSubmit.click()
      setTimeout(() => document.getElementById("account-search__result").querySelector(".UsersListAvatar").click(), 2000);
      setTimeout(modAction, 2500);
    }, 4500 * i);
  }
}


// runs every 5sec
start = () => {
  userListArray.length = 0
  guestPush()
  setTimeout(checkDuplicities, 1000)
  setTimeout(searchUser, 2000)
}

setInterval(start, 5000);


