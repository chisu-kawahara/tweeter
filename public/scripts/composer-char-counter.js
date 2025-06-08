console.log("composer-char-counter.js loaded");

$(document).ready(function() {
  $('.new-tweet textarea').on('input', function() {
    const maxChars = 140;
    const textLength = $(this).val().length;
    const charsLeft = maxChars - textLength;

    const $counter = $(this).closest('form').find('.counter');
    $counter.text(charsLeft);

    if (charsLeft < 0) {
      $counter.addClass('counter-warning');
    } else {
      $counter.removeClass('counter-warning');
    }
  });
});
