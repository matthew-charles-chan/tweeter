$(document).ready(function() {
  const BASE_URL = "http://localhost:8080";
  
  // Calculates relative time and returns a string ('<#> <units>'s ago')
  const calculateTimeAgo = function(current, previous) {
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
  };

  // loops through tweets array, and renders each tweet
  const renderTweets = function(tweets) {
    const $tweets = $("#tweets-container");
    tweets.forEach((tweet) => {
      $tweets.prepend(createTweetElement(tweet));
    });
  };
  
  // takes in tweet-data object and returns a formatted HTML element
  const createTweetElement = function(tweet) {
    const $tweet = $('<article>').addClass('tweet');
    const timeAgo = calculateTimeAgo(Date.now(), tweet.created_at);

    // define element divisions (header, blockquote, hr, footer)
    let $header = $('<header>').addClass('tweet-header');
    let $blockquote = $('<blockquote>')
      .addClass('tweet-content')
      .text(tweet.content.text);
    let $hr = $('<hr>').addClass('ruler-line');
    let $footer = $('<footer>').addClass('tweet-footer');
   
    // adding class, values and attributes to HEADER elements
    const $leftSide = $('<div>').addClass('left-side');
    const $profileImage = $('<img>')
      .attr("src", tweet.user.avatars);
    const $name = $('<span>')
      .addClass('name')
      .text(tweet.user.name);
    const $handle = $('<span>')
      .addClass('handle')
      .text(tweet.user.handle);
    $leftSide.append($profileImage, $name);
    $header.append($leftSide, $handle);

    // adding class, values and attributes to FOOTER elements
    const $time = $('<time>').text(timeAgo);
    
    // icon svg's
    const $icons = $('<div>').addClass('icons');
    const $heart = $('<svg width="24" height="24" viewBox="0 0 24 24" fill="black" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-heart"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>')
    const $flag = $('<svg width="24" height="24" viewBox="0 0 24 24" fill="black" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-flag"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line></svg>')
    const $retweet = $('<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-repeat"><polyline points="17 1 21 5 17 9"></polyline><path d="M3 11V9a4 4 0 0 1 4-4h14"></path><polyline points="7 23 3 19 7 15"></polyline><path d="M21 13v2a4 4 0 0 1-4 4H3"></path></svg>')
    $icons.append($flag, $retweet, $heart)


    $footer.append($time, $icons);
    
    // appends indavidual elements to article('tweet') element
    $tweet.append($header, $blockquote, $hr, $footer);

    // return created tweet element
    return $tweet;
  };

  // POSTs form data to server and renders page with new tweet
  const $form = $('#new-tweet-form');
  $form.on('submit', (event) => {
    event.preventDefault();
    let $tweetInput = $(this).find('#text-input');
    const $counter = $('.new-tweet .counter');
    // if tweet empty, slide down error
    if ($tweetInput.val() === "" || $tweetInput.val() === null) {
      $('#tweet-empty').slideDown();
      setTimeout(()=>{
        $('#tweet-empty').slideUp();
      },1500);
      return;
    }
    // if tweet over 140 chars, slide down error
    if ($tweetInput.val().length > 140) {
      $('#too-long').slideDown();
      setTimeout(()=>{
        $('#too-long').slideUp();
      },1500);
      return;
    }
    const serialized = $form.serialize();
    $.post(`${BASE_URL}/tweets`, serialized)
      .done(() => {
        //resets counter to 140
        $counter.text('140');
        // calls loadtweets function on success
        loadTweets();
        // clears form field input
        $tweetInput.val('');
      })
      .fail((err) =>{
        console.log(err);
      });
  });

  // AJAX request for tweets and renders each tweet
  const loadTweets = function() {
    $.ajax({
      url: `${BASE_URL}/tweets`,
      method: 'GET',
      dataType: 'JSON',
      success: (tweets) => {
        $("#tweets-container").empty();
        renderTweets(tweets);
      }
    });
  };

  // Shows/Hides (slideUp/ slideDown) new-tweet-form
  $("#toggle").click(()=>{
    // tweet-container is open, (hide) and remove "open" class
    if ($('#new-tweet-container').hasClass("open")) {
      $('#new-tweet-container').slideUp().removeClass("open");
      $('#new-tweet-container').find('#text-input').blur();
    } else {
      // if tweet container is closed (default), on click slideDown (show) tweet-container
      $("#new-tweet-container").slideDown().addClass("open");
      $('#new-tweet-container').find('#text-input').focus();
    }
  });
  
  //Calls loadTweets function
  loadTweets();

});