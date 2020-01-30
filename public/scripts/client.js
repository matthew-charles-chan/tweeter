$(document).ready(function() {
  const BASE_URL = "http://localhost:8080"
  
  // Calculates relative time and returns a string ('<#> <units>'s ago')
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

  // loops through tweets array, and renders each tweet
  const renderTweets = function(tweets) {
    $tweets = $("#tweets-container")
    tweets.forEach( (tweet) => {
      $tweets.prepend(createTweetElement(tweet))
    })
  }
  
  // takes in tweet-data object and returns a formatted HTML element
  const createTweetElement = function(tweet) {
    const $tweet = $('<article>').addClass('tweet')
    const timeAgo = calculateTimeAgo(Date.now(), tweet.created_at)

    // define element divisions (header, blockquote, hr, footer)
    let $header = $('<header>').addClass('tweet-header');
    let $blockquote = $('<blockquote>')
      .addClass('tweet-content')
      .text(tweet.content.text);
    let $hr = $('<hr>').addClass('ruler-line');
    let $footer = $('<footer>').addClass('tweet-footer');
   
    // adding class, values and attributes to HEADER elements
    const $leftSide = $('<div>').addClass('left-side')
    const $profileImage = $('<img>')
      .attr("src", tweet.user.avatars)
    const $name = $('<span>')
      .addClass('name')
      .text(tweet.user.name);
    const $handle = $('<span>')
      .addClass('handle')
      .text(tweet.user.handle) ; 
    $leftSide.append($profileImage, $name);
    $header.append($leftSide, $handle);

    // adding class, values and attributes to FOOTER elements
    const $time = $('<time>').text(timeAgo);
    const $heart = $('<img>').attr("src", "images/heart-black.png")
    $footer.append($time, $heart);
    
    // appends indavidual elements to article('tweet') element 
    $tweet.append($header, $blockquote, $hr, $footer);

    // return created tweet element 
    return $tweet
  }

  // POSTs form data to server and renders page with new tweet
  const $form = $('#new-tweet-form');
  $form.on('submit', (event) => {
    event.preventDefault();
    let $tweetInput = $(this).find('#text-input')
    const $counter = $('.new-tweet .counter')
    // console.log($counter.val('140'));
    if ($tweetInput.val() === "" || $tweetInput.val() === null) {
      alert("Cannot post empty tweet!")
      return;
    }
    if ($tweetInput.val().length > 140) {
      alert("Tweet exceeds 140 characters. Cannot post!")
      return;
    }
    const serialized = $form.serialize();
    $.post(`${BASE_URL}/tweets`, serialized)
    .done(() => {
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
    })
  }

  // Shows/Hides (slideUp/ slideDown) new-tweet-form 
  $("#toggle").click(()=>{
    // tweet-container is open, (hide) and remove "open" class 
    if($('#new-tweet-container').hasClass("open")) {
      $('#new-tweet-container').slideUp().removeClass("open");
      $('#new-tweet-container').find('#text-input').blur();
    } else {
      // if tweet container is closed (default), on click slideDown (show) tweet-container
      $("#new-tweet-container").slideDown().addClass("open")
      $('#new-tweet-container').find('#text-input').focus();
    }
  })
  

  //Calls loadTweets function
  loadTweets();

});