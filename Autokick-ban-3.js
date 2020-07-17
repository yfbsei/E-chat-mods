//Chrome
setInterval(() => location.reload(), 200000)

var ava = []
var cleanava;
var x = document.getElementsByClassName('message__avatar')

getId = () => {
for (i = 0; i < x.length; i++) {
  if (x[i].naturalWidth === 50 && x[i].naturalHeight === 50) {
    const pu = x[i].src.substr(41, 36)
    ava.push(pu);
  }
}
}

clean = () => {
var set = new Set(ava);
cleanava = [...set]
cleanava.forEach(kick = (item, index) => { 
//console.log(index + ": " + item); 
CometdModerator.kickAccount(item);
CometdModerator.removeAccountMessages(item);
});
cleanava.length = 0;
ava.length = 0;
}

setInterval(getId, 1000);
setInterval(clean, 2000);


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
