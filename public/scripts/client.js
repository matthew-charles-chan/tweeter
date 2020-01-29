/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  const tweetData = {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
    "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
    "created_at": 1461116232227
 }
 createTweetElement = function(data) {
   let $tweet = $("<article>").addClass("tweet")
   
   
   
   
   
   
   
   markup = `
   <div class= "tweet">
   <header class= "tweet-header">
     <span><img src=${tweetData.user.avatars}></span>
     <span class= "name">${tweetData.user.name}</span>
     <span class= "handle">${tweetData.user.handle}/span>
   </header>
   <blockquote class="tweet-content"${tweetData.content.text}!</blockquote>
   <hr class="ruler-line">
   <footer class="tweet-footer">
     <time>10 days ago</time>
     <img src="images/heart-black.png">
   </footer>
 </div>
   `

 }

// Test / driver code (temporary)
console.log($tweet); // to see what it looks like
$('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
});
