'use strict';

/* Global varables */
/* --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
let blueFilterLoop;
const modId = document.querySelector('.UsersListStarIcon').parentNode.firstChild.src.slice(-48, -12);

const getId = name => {
    return Array.from(document.querySelectorAll(".UsersListUserWrapper")).filter(check => check.children[1].innerText === name).map(id => id.children[0].src.slice(-48, -12)).toString();
};

const getRankFromMessage = name => {
    const listOfUsers = JSON.parse(localStorage.getItem("ranks"));
    if (listOfUsers === null) {
        return false
    } else {
        const singleOut = listOfUsers.filter(user => user._name === name);
        return singleOut.length > 0 ? singleOut[0]._rank : false
    }
};
/* --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */

/* Classes */
class Rank {
    constructor(id, name, rank) {
        this._id = id;
        this._name = name;
        this._rank = rank;
    }
    get userName() {
        return this._name, this._rank;
    }
    set userName(updateRank) {
        this._rank = updateRank;
    }

}

class UserProp {
    constructor(id, userName, diminson, message) {
        this.id = id,
            this.userName = userName,
            this.diminson = diminson,
            this.message = message
    }
};
/* --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */

/* Holding all commands needed for user OBJECTS */
const userCommands = {
    adminPanel: {

        addUsers(id, addName) {
            if (id === undefined || addName === undefined || id.length < 6) {
                CometdRoom.sendMessage('User not found')
            }
            const ranks = JSON.parse(localStorage.getItem("ranks"))

            if (ranks === null) {
                const listOfUsers = [];
                listOfUsers.push(new Rank(id, addName, 0));
                localStorage.setItem("ranks", JSON.stringify(listOfUsers));
                this.retrieve(addName);
            } else {
                ranks.push(new Rank(id, addName, 0));
                localStorage.setItem("ranks", JSON.stringify(ranks));
                this.retrieve(addName);

                const y = Array.from(new Set(ranks.map(o => JSON.stringify(o)))).map(x => JSON.parse(x))
                localStorage.setItem("ranks", JSON.stringify(y));
            };
        },

        removeAllUsers() {
            localStorage.removeItem("ranks");
        },

        retrieve(name) {
            setTimeout(() => {
                const listOfUsers = JSON.parse(localStorage.getItem("ranks"));
                const singleOut = listOfUsers.filter(user => user._name === name);
                if (singleOut.length >= 1) {
                    singleOut[0]._name === name ? CometdRoom.sendMessage(`Username: ${singleOut[0]._name} Rank: ${singleOut[0]._rank}`) : CometdRoom.sendMessage('User not found Or wrong command entered');
                } else {
                    CometdRoom.sendMessage('User not added or not found')
                }
            }, 2000);
        },

        rankUpDown(upOrdown, name) {
            const listOfUsers = JSON.parse(localStorage.getItem("ranks"));
            for (const user of listOfUsers) {
                user._name === name && upOrdown === 'up' ? user._rank = user._rank + 1 :
                    user._name === name && upOrdown === 'down' ? user._rank = user._rank - 1 :
                    false;
            }
            setTimeout(() => localStorage.setItem("ranks", JSON.stringify(listOfUsers)), this.retrieve(name), 2000);
        }
    },

    roomController: {

        blueFilterOnOff: {
            blueFilter() {
                Array.from(new Set(Array.from(document.querySelectorAll('.message__avatar')).filter(x => x.naturalHeight < 51).map(x => x.src.slice(-48, -12)))).forEach(id => {
                    CometdModerator.banAccount(id), CometdModerator.removeAccountMessages(id)
                })
            },
            blueFilterOn() {
                blueFilterLoop = setInterval(()=>{userCommands.roomController.blueFilterOnOff.blueFilter()}, 3333)
            },
            blueFilterOff() {
                clearInterval(blueFilterLoop)
            }
        },

        spamFilterOnOff: {
            count: 0,
            messages: [],

            spamFilter: new MutationObserver(mutationsList => {
                for (const mutation of mutationsList) {
                    userCommands.roomController.spamFilterOnOff.messages.includes(mutation.addedNodes[0].lastElementChild.lastElementChild.textContent) ? userCommands.roomController.spamFilterOnOff.count++ : userCommands.roomController.spamFilterOnOff.count = 0, userCommands.roomController.spamFilterOnOff.messages.length = 0;
                    userCommands.roomController.spamFilterOnOff.messages.push(mutation.addedNodes[0].lastElementChild.lastElementChild.textContent);
                    if (userCommands.roomController.spamFilterOnOff.count === 2) {
                        CometdModerator.banAccount(mutation.addedNodes[0].firstElementChild.src.slice(-48, -12)), CometdModerator.removeAccountMessages(mutation.addedNodes[0].firstElementChild.src.slice(-48, -12)), userCommands.roomController.spamFilterOnOff.count = 0, userCommands.roomController.spamFilterOnOff.messages.length = 0
                    }
                }
            }),

            spamFilterOn() {
                userCommands.roomController.spamFilterOnOff.spamFilter.observe(document.querySelector('.chat-box-layer__messages'), {
                    attributes: true,
                    childList: true
                })
            },
            spamFilterOff() {
                userCommands.roomController.spamFilterOnOff.spamFilter.disconnect()
            }

        },

        wordFilterOnOff: {

            count: 0,

            wordFilter: new MutationObserver(mutationsList => {
                for (const messages of mutationsList) {
                    const wordList = JSON.parse(localStorage.getItem("wordList"))
                    const banWord = (id, message) => {
                        CometdConversation.open(id), CometdConversation.sendMessage('Message which was flagged:', id), CometdConversation.sendMessage(message, id), CometdConversation.close(id), CometdModerator.banAccount(id), CometdModerator.removeAccountMessages(id)
                    };

                    if (wordList.length >= 1) {
                        const regxList = wordList.map(item => RegExp("\\b" + item + "\\b", 'gi'));
                        regxList.some(rx => rx.test(messages.addedNodes[0].children[1].lastChild.textContent)) ? banWord(messages.addedNodes[0].children[0].src.slice(-48, -12), messages.addedNodes[0].children[1].lastChild.textContent) : false;
                    };
                }
            }),

            checkAdded() {
                const wordList = [];
                "wordList" in localStorage ? true : localStorage.setItem("wordList", JSON.stringify(wordList));
            },

            wordFilterOn() {
                userCommands.roomController.wordFilterOnOff.count = 1;

                userCommands.roomController.wordFilterOnOff.checkAdded()
                userCommands.roomController.wordFilterOnOff.wordFilter.observe(document.querySelector('.chat-box-layer__messages'), {
                    attributes: true,
                    childList: true
                });
            },

            wordFilterOff() {
                userCommands.roomController.wordFilterOnOff.count = 0;
                userCommands.roomController.wordFilterOnOff.wordFilter.disconnect();
            },

            addWord(word) {
                if (userCommands.roomController.wordFilterOnOff.count === 1) {
                    userCommands.roomController.wordFilterOnOff.wordFilterOff();

                    const wordList = JSON.parse(localStorage.getItem("wordList"));
                    wordList.push(word);
                    localStorage.setItem("wordList", JSON.stringify(wordList));

                    userCommands.roomController.wordFilterOnOff.wordFilterOn()
                } else {
                    CometdRoom.sendMessage('Word filter seems to be off. Turn it on.')
                }
            },

            removeWord(word) {
                if (userCommands.roomController.wordFilterOnOff.count === 1) {
                    userCommands.roomController.wordFilterOnOff.wordFilterOff();

                    const wordListt = JSON.parse(localStorage.getItem("wordList"));
                    const wordList = wordListt.filter(item => item !== word);

                    localStorage.wordList = JSON.stringify(wordList);
                    userCommands.roomController.wordFilterOnOff.wordFilterOn()

                } else {
                    CometdRoom.sendMessage('Word filter seems to be off. Turn it on.')
                }
            },

            removeAllWord() {
                localStorage.removeItem("wordList");
            }
        },

        banOrKickAccount(banOrkick, id) {
            if (banOrkick === 'ban') {
                CometdModerator.banAccount(id)
                CometdModerator.removeAccountMessages(id)
            }
            if (banOrkick === 'kick') {
                CometdModerator.kickAccount(id)
                CometdModerator.removeAccountMessages(id)
            };
        },

        unBanUser(unban, min) {
        setInterval(() => {
          if (document.querySelector('#moderator-page__banned').childElementCount >= 1) {
            unban === 'all' ? Array.from(document.querySelectorAll('.ModeratorPanelBannedUserAvatar')).map(id => id.src.slice(-48, -12)).forEach(id => CometdModerator.unbanAccount(id)) :
            unban === 'guests' ? Array.from(document.querySelectorAll('.ModeratorPanelBannedUserAvatar')).filter(diminson => diminson.naturalHeight <= 51).map(id => id.src.slice(-48, -12)).forEach(id => CometdModerator.unbanAccount(id)) :
            unban === 'users' ? Array.from(document.querySelectorAll('.ModeratorPanelBannedUserAvatar')).filter(diminson => diminson.naturalHeight >= 51).map(id => id.src.slice(-48, -12)).forEach(id => CometdModerator.unbanAccount(id)) 
            : false
          };
        }, min*60000);  
          }

    }

};
Object.freeze(userCommands);
/* --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */

const forGenralUsers = userInfo => {
    /^rankOf:\s/i.test(userInfo.message) === true && userInfo.diminson > 51 ? userCommands.adminPanel.retrieve(userInfo.message.slice(8)) : false;
    /^!commands/i.test(userInfo.message) === true && userInfo.diminson > 51 ? CometdRoom.sendMessage('https:///github.com/yfbsei/E-chat-mods') : false;
};

const forRankUsers = (userInfo, rank) => {
    if (userInfo.diminson > 51 && rank >= 0 || userInfo.id === modId) {
        //Main       
        /^addUser:\s/i.test(userInfo.message) === true && rank >= 6 || /^addUser:\s/i.test(userInfo.message) === true && userInfo.id === modId ? userCommands.adminPanel.addUsers(getId(userInfo.message.slice(9)), userInfo.message.slice(9)) :
            /^rankUp:\s/i.test(userInfo.message) === true && rank >= 6 || /^rankUp:\s/i.test(userInfo.message) === true && userInfo.id === modId ? userCommands.adminPanel.rankUpDown('up', userInfo.message.slice(8)) :
            /^rankDown:\s/i.test(userInfo.message) === true && rank >= 6 || /^rankDown:\s/i.test(userInfo.message) === true && userInfo.id === modId ? userCommands.adminPanel.rankUpDown('down', userInfo.message.slice(10))
            //Room utilities
            :
            /^blueFilterOn/i.test(userInfo.message) === true && rank >= 4 || /^blueFilterOn/i.test(userInfo.message) === true && userInfo.id === modId ? userCommands.roomController.blueFilterOnOff.blueFilterOn() :
            /^blueFilterOff/i.test(userInfo.message) === true && rank >= 4 || /^blueFilterOff/i.test(userInfo.message) === true && userInfo.id === modId ? userCommands.roomController.blueFilterOnOff.blueFilterOff() :
            /^wordFilterOn/i.test(userInfo.message) === true && rank >= 4 || /^wordFilterOn/i.test(userInfo.message) === true && userInfo.id === modId ? userCommands.roomController.wordFilterOnOff.wordFilterOn() :
            /^wordFilterOff/i.test(userInfo.message) === true && rank >= 4 || /^wordFilterOff/i.test(userInfo.message) === true && userInfo.id === modId ? userCommands.roomController.wordFilterOnOff.wordFilterOff() :
            /^spamFilterOn/i.test(userInfo.message) === true && rank >= 3 || /^spamFilterOn/i.test(userInfo.message) === true && userInfo.id === modId ? userCommands.roomController.spamFilterOnOff.spamFilterOn() :
            /^spamFilterOff/i.test(userInfo.message) === true && rank >= 3 || /^spamFilterOff/i.test(userInfo.message) === true && userInfo.id === modId ? userCommands.roomController.spamFilterOnOff.spamFilterOff()
            //User utilities
            :
            /^removeAllUsers/i.test(userInfo.message) === true && rank >= 5 || /^removeAllUsers/i.test(userInfo.message) === true && userInfo.id === modId ? userCommands.adminPanel.removeAllUsers() :
            /^removeAllWords/i.test(userInfo.message) === true && rank >= 5 || /^removeAllWords/i.test(userInfo.message) === true && userInfo.id === modId ? userCommands.roomController.wordFilterOnOff.removeAllWord() :
            /^removeWord:\s/i.test(userInfo.message) === true && rank >= 5 || /^removeWord:\s/i.test(userInfo.message) === true && userInfo.id === modId ? userCommands.roomController.wordFilterOnOff.removeWord(userInfo.message.slice(12)) :
            /^addWord:\s/i.test(userInfo.message) === true && rank >= 5 || /^addWord:\s/i.test(userInfo.message) === true && userInfo.id === modId ? userCommands.roomController.wordFilterOnOff.addWord(userInfo.message.slice(9)) :
            /^ban:\s/i.test(userInfo.message) === true && rank >= 4 || /^ban:\s/i.test(userInfo.message) === true && userInfo.id === modId ? userCommands.roomController.banOrKickAccount('ban', getId(userInfo.message.slice(5))) :
            /^kick:\s/i.test(userInfo.message) === true && rank >= 3 || /^kick:\s/i.test(userInfo.message) === true && userInfo.id === modId ? userCommands.roomController.banOrKickAccount('kick', getId(userInfo.message.slice(6))) :
            false;
    }
};
