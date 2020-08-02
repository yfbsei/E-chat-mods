//Chrome
var y = document.getElementsByClassName('UsersListAvatar');
var x = document.getElementsByClassName('message__avatar');
var usersListAvatar = new Set();
var messageAvatar = new Set();
var validated;
    
whole = () => {

getListId = () => {
  for (i = 0; i < y.length; i++) {
    if (y[i].naturalWidth === 50 && y[i].naturalHeight === 50) {
      usersListAvatar.add(y[i].src.substring(41, 77));
    }
  }
}
getListId();


getMessageId = () => {
  for (i = 0; i < x.length; i++) {
    if (x[i].naturalWidth === 50 && x[i].naturalHeight === 50) {
      messageAvatar.add(x[i].src.substring(41, 77));
    }
  }
}
getMessageId();

validate = () => {
  const a = Array.from(usersListAvatar);
  const b = Array.from(messageAvatar);
  validated = a.filter(element => b.includes(element));
  usersListAvatar.clear();
  messageAvatar.clear();
  a.length = 0;
  b.length = 0;
}
validate();

kick = () => {
  validated.forEach(kickEach = (item) => {
    CometdModerator.removeAccountMessages(item);
    CometdModerator.kickAccount(item);
  });
}
kick();
validated.length = 0;
}

setInterval(whole, 3000);
setInterval(() => location.reload(), 200000);



/*-----------------------------------------------------------------

-------------------------------------------------------------------*/

//Edge
//setInterval(() => location.reload(), 200000)

var ava = []
var x = document.getElementsByClassName('message__avatar')

whole = () => {
for (i = 0; i < x.length; i++) {
  if (x[i].naturalWidth < 99) {
    const pu = x[i].src.substr(45, 36)
    ava.push(pu);
  }
const set = new Set(ava);
var cleanava = [...set]
}
cleanava.forEach(kick = (item, index) => { 
console.log(index + ": " + item); 
CometdModerator.kickAccount(item);
CometdModerator.removeAccountMessages(item);
});
ava.length = 0
cleanava.length = 0;
}

setInterval(whole, 1000);
