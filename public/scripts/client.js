/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]
  // const createTweetElement = function (tweet) {
  //   let $tweet = $
  // }

  // const $tweet = createTweetElement(tweet) 


  const $input = $('input')
  $input.on('click', (event) => {
    const $tweet = $('<article>').addClass('tweet')
    let tweetElement = `
    <header class= "tweet-header">
      <img src = ${tweet.user.avatars}>
      <span class= "name">${tweet.user.name}</span>
      <span class= "handle">${tweet.user.handle}</span>
    </header>

    <blockquote class="tweet-content">${tweet.content.text}</blockquote>

    <hr class="ruler-line">

    <footer class="tweet-footer">
      <time>10 days ago</time>
      <img src="images/heart-black.png">
    </footer>
      `
    $tweet.append(tweetElement);

    $("#tweets-container").append($tweet)

    // const renderTweets = function(tweet)

    

  })
  const renderTweets = function(tweets) {
    $tweets = $("#tweets-container")
    tweets.forEach( (tweet) => {
      $tweets.append(createTweetElement(tweet))
    })
  }

  const createTweetElement = function(tweet) {
    const $tweet = $('<article>').addClass('tweet')
    let tweetElement = `
      <header class= "tweet-header">
        <img src=${tweet.user.avatars}>
        <span class= "name">${tweet.user.name}</span>
        <span class= "handle">${tweet.user.handle}</span>
      </header>
      <blockquote class="tweet-content">${tweet.content.text}!</blockquote>
      <hr class="ruler-line">
      <footer class="tweet-footer">
        <time>10 days ago</time>
        <img src="images/heart-black.png">
      </footer>
    `
    $tweet.append(tweetElement);
    return $tweet
  }
  renderTweets(data);
});
