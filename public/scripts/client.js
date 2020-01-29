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


  const renderTweets = function(tweets) {
    $tweets = $("#tweets-container")
    tweets.forEach( (tweet) => {
      $tweets.prepend(createTweetElement(tweet))
    })
  }

  const createTweetElement = function(tweet) {
    const $tweet = $('<article>').addClass('tweet')
    const calculateTimeAgo = function (current, previous) {
      let minute = 60 * 1000;
      let hour = minute * 60;
      let day = hour * 24;
      let month = day * 30;
      let year = day * 365;
      
      const elapsed = current - previous;

      if (elapsed < minute) {
        return Math.round(elapsed / 1000) + ' seconds ago';
      } else if (elapsed < hour) {
        return (Math.round(elapsed / minute) + ' minutes ago');
      } else if (elapsed < day) {
        return (Math.round(elapsed / hour) + ' hours ago');
      } else if (elapsed < month) {
        return (Math.round(elapsed / day) + ' days ago');
      } else if (elapsed < year) {
        return (Math.round(elapsed / month) + ' months ago');
      } else {
        return (Math.round(elapsed / year)  + ' years ago');
      }
    }
    const timeAgo = calculateTimeAgo(Date.now(), tweet.created_at)


    let $header = $('<header>').addClass('tweet-header');
    let $blockquote = $('<blockquote>')
      .addClass('tweet-content')
      .text(tweet.content.text);
    let $hr = $('<hr>').addClass('ruler-line');
    let $footer = $('<footer>').addClass('tweet-footer');
    
    const $profileImage = $('<img>')
      .attr("src", tweet.user.avatars)
    const $name = $('<span>')
      .addClass('name')
      .text(tweet.user.name);
    const $handle = $('<span>')
      .addClass('handle')
      .text(tweet.user.handle) ; 
    $header.append($profileImage, $name, $handle);

    let $time = $('<time>').text(timeAgo);
    let $heart = $('<img>').attr("src", "images/heart-black.png")
    $footer.append($time, $heart);
    $tweet.append($header, $blockquote, $hr, $footer);
    return $tweet
  }
  renderTweets(data);
});

// STRING LITERAL
// `
//   <header class= "tweet-header">
//     <img src=${tweet.user.avatars}>
//     <span class= "name">${tweet.user.name}</span>
//     <span class= "handle">${tweet.user.handle}</span>
//   </header>
//   <blockquote class="tweet-content">${tweet.content.text}!</blockquote>
//   <hr class="ruler-line">
//   <footer class="tweet-footer">
//     <time>${timeAgo}</time>
//     <img src="images/heart-black.png">
//   </footer>
// `