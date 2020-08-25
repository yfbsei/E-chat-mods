let completedIds = [];
let lastItem;
let listOfIds;

pmRules = () => {    
    console.log('start')
listOfIds = Array.from(document.getElementsByClassName('UsersListAvatar')).filter(id => id.naturalHeight < 51).map(id => id.src.slice(-48, -12)).filter(id => !completedIds.includes(id))

if (listOfIds.length < 1) {
setTimeout(pmRules, 10000);   
}

lastItem = listOfIds[listOfIds.length-1];

listOfIds.forEach((id, index) => {
    setTimeout(function() {

        console.log(id);
        CometdConversation.open(id);
        CometdConversation.sendMessage('Guest Account rules: No inappropriate words, no posting social media, no posting links, no asking for Pm\'s & chat and no spam. Breaking rule result will be 10 minutes ban!.', id);
        CometdConversation.close(id);
        completedIds.push(id);

        id == lastItem ? restart() : console.log('not yet');
    }, index * 8000);
}); 
};

restart = () => {console.log('completed'), listOfIds.length = 0, pmRules()};
pmRules();

setInterval(() => {completedIds.length = 0}, 86400000);

//http://jsfiddle.net/s29pbrx5/1/
