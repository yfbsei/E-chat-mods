window.setInterval(banGuest = () => {const img = new Set(Array.from(document.querySelectorAll(".message__avatar")).filter(check => check.naturalHeight < 51).map(id => id.src.slice(-48, -12))); // Filtering for guest and getting id's
const kick = Array.from(img).forEach((x, i) => {setTimeout(() => {CometdModerator.banAccount(x), CometdModerator.removeAccountMessages(x)}, i * 1000)}); img.clear(), RoomController.refresh()}, 5000); // Banning Guest accounts. Run every 5sec
window.setInterval(unBan = () => {Array.from(document.querySelectorAll(".ModeratorPanelBannedUserAvatar")).filter(check => check.naturalHeight < 51).map(id => id.src.substring(41, 77)).forEach(y => CometdModerator.unbanAccount(y))}, 1800000); // unBan guest account every 30min 