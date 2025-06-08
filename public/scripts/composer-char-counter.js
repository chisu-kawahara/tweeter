console.log("composer-char-counter.js loaded");

$(document).ready(function() {
  $(".new-tweet textarea").on('input', function() {
    const textLength = $(this).val().length;
    const $counter = $(this).closest('form').find('.counter');
    const charsLeft = 140 - textLength;

    $counter.text(charsLeft);

    if (charsLeft < 0) {
      $counter.addClass('counter-warning');
    } else {
      $counter.removeClass('counter-warning');
    }
  });
});
