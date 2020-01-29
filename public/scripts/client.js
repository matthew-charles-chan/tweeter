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
  // const createTweetElement = function (tweet) {
  //   let $tweet = $
  // }

  // const $tweet = createTweetElement(tweetData) 


  const $input = $('input')
  $input.on('click', (event) => {
    const $tweet = $('<article>').addClass('tweet')
    let tweetElement = `
      <header class= "tweet-header">
        <div class = "creator-info">
          <span><img src=${tweetData.user.avatars}></span>
          <span class= "name">${tweetData.user.name}</span>
        </div>
        <span class= "handle">${tweetData.user.handle}</span>
      </header>
      <blockquote class="tweet-content">${tweetData.content.text}!</blockquote>
      <hr class="ruler-line">
      <footer class="tweet-footer">
        <time>10 days ago</time>
        <img src="images/heart-black.png">
      </footer>
      `
    $tweet.append(tweetElement);

    $("#tweets-container").append($tweet)

    // const renderTweets = function(tweet)



    const createTweetElement = function(tweet) {
      const $tweet = $('<article>').addClass('tweet')
      let tweetElement = `
        <header class= "tweet-header">
          <div class = "creator-info">
            <span><img src=${tweetData.user.avatars}></span>
            <span class= "name">${tweetData.user.name}</span>
          </div>
          <span class= "handle">${tweetData.user.handle}</span>
        </header>
        <blockquote class="tweet-content">${tweetData.content.text}!</blockquote>
        <hr class="ruler-line">
        <footer class="tweet-footer">
          <time>10 days ago</time>
          <img src="images/heart-black.png">
        </footer>
      `
      $tweet.append(tweetElement);
      return $tweet
    }
  })


});
