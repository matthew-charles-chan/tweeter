$(document).ready(function() {
  const $newTweetInput = $('.new-tweet .text-input');
  const $counter = $('.new-tweet .counter');
  const displayRemainingChars = function() {
    const tweetLength = $(this).val().length;
    if (tweetLength > 140) {
      $(this).val($(this).val().substr(0,140));
    } else {
      const remainingChars = (140 - tweetLength);
      $counter.text(remainingChars);
    }
  };
  $($newTweetInput).keyup(displayRemainingChars);
  $($newTweetInput).keydown(displayRemainingChars);
});