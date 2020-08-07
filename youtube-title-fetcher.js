var youTubeTitle;
//---Dom Mutaion| 
var targetNode = document.querySelector('.chat-box-layer__messages')

var config = { attributes: true, childList: true, subtree: false };


const callback = function(mutationsList) {
    for(let mutation of mutationsList) {
        if (mutation.addedNodes.length) {

                //Gets Height+Width of user Avatar
              const userAvatar = mutation.addedNodes[0].firstElementChild
              const naturalHeight = userAvatar.naturalHeight
              const naturalWidth = userAvatar.naturalWidth

              //Gets username from each message
              const userName = mutation.addedNodes[0].lastElementChild.firstElementChild.firstElementChild
              const printUserName = userName.innerText


                //Gets text message from each message
              const userMessage = mutation.addedNodes[0].lastElementChild.lastElementChild
              const userText = userMessage.innerText     
              
              const com = new RegExp("!music:"); 
              const checkCommand = com.test(userText)

      if (naturalHeight > 100  && checkCommand === true ) {
             let url = userText.slice(8);
             var apiKey = "AIzaSyAuoPbCRVQIafk4G7VO0o5ge05qNqpvhvE";         
             
             function getVideoId(url) {
                var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
                var match = url.match(regExp);
                return (match&&match[7].length==11)? match[7] : false;
            }
            var videoId = getVideoId(url);
            
            var apiUrl ="https://www.googleapis.com/youtube/v3/videos?key=" + apiKey + "&fields=items(snippet(title,description,tags,thumbnails))&part=snippet&id=" + videoId;


            async function generateInfo(apiUrl) 
            {
              let response = await fetch(apiUrl);
              let data = await response.json();
              return data;
            }
            generateInfo(apiUrl)
            .then(data => youTubeTitle = data.items[0].snippet.title)
            setTimeout(function(){ CometdRoom.sendMessage(`${printUserName}, Title of your YouTube video is: ${youTubeTitle}`) }, 1000);
      }
        }
    }
};


const observer = new MutationObserver(callback);

observer.observe(targetNode, config);

