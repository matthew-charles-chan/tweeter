$(document).ready(function() {
  const $newTweetInput = $('#text-input');
  const $counter = $('.new-tweet .counter');
  const displayRemainingChars = function() {
    const tweetLength = $(this).val().length;
    // only accept first 140 chars into form
    if (tweetLength > 140) {
      // $(this).val($(this).val().substr(0,140));
      $counter.css("color", "red");
      $counter.text(140 - tweetLength);
    } else {
      $counter.css("color", "black");
      $counter.text(140 - tweetLength);
      // if under 140 chars, show remaining chars available
    }
  };
  // on Input into form, display remainin chars
  $($newTweetInput).on('input', displayRemainingChars);
});