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

$(document).ready(function() {
  const loadTweets = function() {
    $.get('/api/tweets')
      .then((tweets) => {
        $('#tweet-container').empty(); // Clear the old tweets
        renderTweets(tweets); // Resend with new tweets
      })
      .catch((error) => {
        console.error("Failed to fetch tweets:", error);
      });
  };

  // Call it on page load
  loadTweets();
});