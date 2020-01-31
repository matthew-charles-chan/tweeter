$(document).ready(function() {
  const $newTweetInput = $('#text-input');
  const $counter = $('.new-tweet .counter');
  const displayRemainingChars = function() {
    const tweetLength = $(this).val().length;
    // if over 140 chars, display counter red
    if (tweetLength > 140) {
      $counter.css("color", "red");
      $counter.text(140 - tweetLength);
    } else {
      // if undder 140 chars, display counter black 
      $counter.css("color", "black");
      $counter.text(140 - tweetLength);
    }
  };
  // on Input into form, display remainin chars
  $($newTweetInput).on('input', displayRemainingChars);
});