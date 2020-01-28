$(document).ready(function() {
  const $newTweetInput = $('.new-tweet .text-input');
  const $counter = $('.new-tweet .counter');
  const displayRemainingChars = function() {
    const tweetLength = $(this).val().length;
    if (tweetLength > 140) {
      $(this).val($(this).val().substr(0,140));
    } else {
      $counter.text(140 - tweetLength);
    }
  };
  $($newTweetInput).on('input', displayRemainingChars);
});