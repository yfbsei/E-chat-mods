setInterval( x = () => {const img = new Set(Array.from(document.querySelectorAll(".message__avatar")).filter(check => check.naturalHeight < 51).map(id => id.src.substring(41, 77)));
const kick = Array.from(img).forEach((x, i) => {setTimeout(() => {CometdModerator.banAccount(x), CometdModerator.removeAccountMessages(x)}, i * 1000)}); img.clear(), RoomController.refresh()}, 3000);
