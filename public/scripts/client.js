/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


// ↓ this function takes a tweet object and builds the html
// timeago.format() to turn the tweet's timestamp into a friendly format (like "2 hours ago").
// it returns that tweet wrapped in jQuery as $tweet.

const createTweetElement = function(tweet) {
  const $tweet = $(`
    <article class="tweet">
      <header>
        <div class="tweet-user">
          <img src="${tweet.user.avatars}" alt="User avatar">
          <span class="tweet-name">${tweet.user.name}</span>
        </div>
        <span class="tweet-handle">${tweet.user.handle}</span>
      </header>
      <div class="tweet-content">
        <p>${tweet.content.text}</p>
      </div>
      <footer>
        <span>${timeago.format(tweet.created_at)}</span></span>
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

//it loops through every tweet in the array.
//Calls createTweetElement(tweet) to build it.
//Adds it to the top of #tweet-container using .prepend() — so newest tweets show first.
const renderTweets = function(tweets) {
  for (const tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $('#tweet-container').prepend($tweet);
  }
};

const isTweetValid = function(tweetText) {
  if (!tweetText || tweetText.trim() === "") {
    alert("Your tweet cannot be empty!");
    return false;
  }
  if (tweetText.length > 140) {
    alert("Your tweet is too long! Maximum 140 characters.");
    return false;
  }
  return true;
};

//fetch tweets from server and render
$(document).ready(function() {
  const loadTweets = function() {
    $.get('/api/tweets')
      .then((tweets) => {
        $('#tweet-container').empty();
        renderTweets(tweets);
      })
      .catch((error) => {
        console.error("Failed to fetch tweets:", error);
      });
  };
  const showError = function(message) {
    const $error = $('#error-message');
    $error.text(message).removeClass('hidden');
  };
  
  const hideError = function() {
    $('#error-message').addClass('hidden').text('');
  };
  

  // Call once on page load
  loadTweets();

  // Submit tweet form without reloading the whold page
  $('form').on('submit', function(event) {
    event.preventDefault();
  
    const isTweetValid = function(tweetText) {
      if (!tweetText || tweetText.trim() === "") {
        showError("Your tweet cannot be empty!");
        return false;
      }
      if (tweetText.length > 140) {
        showError("Your tweet is too long! Maximum 140 characters.");
        return false;
      }
      hideError(); // Clear error if valid
      return true;
    };
  
    const formData = $(this).serialize();
  
    $.post('/api/tweets', formData)
    .then(() => {
      loadTweets(); // Refetch all tweets from server after posting
      $('#tweet-text').val(""); // Clear input
      $('.counter').text("140"); // Reset counter
    })
    .catch((error) => {
      console.error("Failed to post tweet:", error);
      showError("Oops! Something went wrong when submitting your tweet. Please try again.");
    });
    
  });
});