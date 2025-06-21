/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//any text from users (e.g. tweet content) is safely escaped
//=>so that if they enter something like <script>alert('hacked!')</script>,
//it will not run as code, and instead just show up as harmless text.
const escape = function (str) {
	const div = document.createElement("div");
	div.appendChild(document.createTextNode(str));
	return div.innerHTML;
};
// Build HTML for a tweet
const createTweetElement = function (tweet) {
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
const renderTweets = function (tweets) {
	for (const tweet of tweets) {
		const $tweet = createTweetElement(tweet);
		$(".tweet-container").prepend($tweet);
	}
};

// Shows the error message by setting the text and sliding it down smoothly
const showError = function (message) {
	const $error = $("#error-message");
	$error.text(message).slideDown();
};

// Hides the error message by sliding it up and clearing text
const hideError = function () {
	$("#error-message").slideUp().text("");
};

// Validate tweet input
const isTweetValid = function (tweetText) {
	if (!tweetText || tweetText.trim() === "") {
		showError("Your tweet cannot be empty!");
		return false;
	}
	if (tweetText.length > 140) {
		showError("Your tweet is too long! Maximum 140 characters.");
		return false;
	}
	hideError(); // no errors
	return true;
};

// Main script
let arrowDown = false;
$(document).ready(function () {
	// Load tweets from server and render them
	const loadTweets = function () {
		$.get("/api/tweets")
			.then((tweets) => {
				$(".tweet-container").empty();
				renderTweets(tweets);
			})
			.catch((error) => {
				console.error("Failed to fetch tweets:", error);
				showError("Error loading tweets. Please refresh the page.");
			});
	};

	// Attach click handler to the compose button (once)
	$("#compose-toggle").on("click", function () {
		const $newTweetSection = $(".new-tweet");
		$newTweetSection.slideToggle("fast", function () {
			if ($newTweetSection.is(":visible")) {
				$("#tweet-text").focus();
			}
		});

		const $arrow = $("#slide-arrow");
		if (!arrowDown) {
			$arrow.animate({ top: "10px" }, 200);
		} else {
			$arrow.animate({ top: "10px" }, 200);
		}
		arrowDown = !arrowDown;
	});

	//hover handler
	$("#compose-toggle").hover(
		function () {
			$("#slide-arrow").fadeIn(200);
		},
		function () {
			$("#slide-arrow").fadeOut(200);
		}
	);

	// $('#tweet-text').on('input', function() {
	//   const maxChars = 140;
	//   const textLength = $(this).val().length;
	//   const charsLeft = maxChars - textLength;
	//   const $counter = $(this).closest('form').find('.counter');

	//   $counter.text(charsLeft);

	//   if (charsLeft < 0) {
	//     $counter.addClass('counter-warning');
	//   } else {
	//     $counter.removeClass('counter-warning');
	//   }
	// });

	// Initial page loadå
	loadTweets();

	// Handle tweet form submission
	$("form").on("submit", function (event) {
		event.preventDefault();

		hideError(); // First of all, hide error.

		const tweetText = $("#tweet-text").val();

		if (!isTweetValid(tweetText)) {
			return; //stops if the validation fails
		}

		const formData = $(this).serialize();

		$.post("/api/tweets", formData)
			.then(() => {
				loadTweets(); // Reload all tweets
				$("#tweet-text").val(""); // Clear text area
				$(".counter").text("140"); // Reset counter
			})
			.catch((error) => {
				console.error("Failed to post tweet:", error);
				showError(
					"Oops! Something went wrong when submitting your tweet. Please try again."
				);
			});
	});
});
