/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//any text from users (e.g. tweet content) is safely escaped 
//=>so that if they enter something like <script>alert('hacked!')</script>, 
//it will not run as code, and instead just show up as harmless text.
const escape = function(str) {
  const div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};
// Build HTML for a tweet
const createTweetElement = function(tweet) {
  const $tweet = $(`
    <article class="tweet">
      <header>
        <div class="tweet-user">
          <img src="${tweet.user.avatars}" alt="User avatar">
          <span class="tweet-name">${escape(tweet.user.name)}</span>
        </div>
        <span class="tweet-handle">${escape(tweet.user.handle)}</span>
      </header>
      <div class="tweet-content">
        <p>${escape(tweet.content.text)}</p>
      </div>
      <footer>
        <span>${timeago.format(tweet.created_at)}</span>
        <div class="tweet-actions">
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-retweet"></i>
          <i class="fa-solid fa-heart"></i>
        </div>
      </footer>
    </article>
  `);
  return $tweet;
};

// Render all tweets
const renderTweets = function(tweets) {
  for (const tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $('#tweet-container').prepend($tweet);
  }
};

// Show error message
const showError = function(message) {
  const $error = $('#error-message');
  $error.text(message).removeClass('hidden');
};

// Hide error message
const hideError = function() {
  $('#error-message').addClass('hidden').text('');
};

// Validate tweet input
const isTweetValid = function(tweetText) {
  if (!tweetText || tweetText.trim() === "") {
    showError("Your tweet cannot be empty!");
    return false;
  }
  if (tweetText.length > 140) {
    showError("Your tweet is too long! Maximum 140 characters.");
    return false;
  }
  hideError();
  return true;
};


// Main script
$(document).ready(function() {
  // Load tweets from server
  const loadTweets = function() {
    $.get('/api/tweets')
      .then((tweets) => {
        $('#tweet-container').empty();
        renderTweets(tweets);
      })
      .catch((error) => {
        console.error("Failed to fetch tweets:", error);
        showError("Error loading tweets. Please refresh the page.");
      });
  };

  // Initial load
  loadTweets();

  // Handle tweet form submission
  $('form').on('submit', function(event) {
    event.preventDefault();

    const tweetText = $('#tweet-text').val();

    if (!isTweetValid(tweetText)) {
      return;
    }

    const formData = $(this).serialize();

    $.post('/api/tweets', formData)
      .then(() => {
        loadTweets(); // Reload all tweets
        $('#tweet-text').val(""); // Clear text area
        $('.counter').text("140"); // Reset counter
      })
      .catch((error) => {
        console.error("Failed to post tweet:", error);
        showError("Oops! Something went wrong when submitting your tweet. Please try again.");
      });
  });
});
