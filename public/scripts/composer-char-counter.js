console.log("composer-char-counter.js loaded");

$(document).ready(function() {
  $('.new-tweet textarea').on('input', function() {
    const maxChars = 140;
    const textLength = $(this).val().length;
    const charsLeft = maxChars - textLength;

    const $counter = $(this).closest('form').find('.counter');
    const $error = $('#error-message');
    const $button = $(this).closest('form').find('.tweet-btn');

    $counter.text(charsLeft);

    if (charsLeft < 0) {
      $counter.addClass('counter-warning');
      $error.text("Tweet exceeds the maximum allowed characters!").removeClass('hidden');
      $button.prop('disabled', true);
    } else {
      $counter.removeClass('counter-warning');
      $error.text("").addClass('hidden');
      $button.prop('disabled', false);
    }
  });
});
