# Tweeter Project

Tweeter is a single-page web application that allows users to compose short tweets (under 140 characters) and view tweets posted by others. It mimics core Twitter functionality with a focus on front-end development skills and asynchronous requests using AJAX.

## Project Overview
This project was built as part of the Lighthouse Labs Web Development Bootcamp to practice:
- Responsive design using HTML and CSS
- Dynamic DOM manipulation with jQuery
- Form validation and input sanitization
- AJAX requests to interact with a Node.js/Express backend
- Time formatting using timeago.js
- Real-time character counting and form feedback
- SASS (used optionally to improve and modularize CSS)

## Feature
- Compose new tweets with live character counter
- Input validation for empty
- Error message display with smooth animations
- Tweets are displayed with timeago formatting and user metadata
- Toggle tweet input area with slide animation
- Styled with mobile-first, responsive layout

## Final Product (Screenshots)
!["tweeter_desktop_style"](https://raw.githubusercontent.com/chisu-kawahara/tweeter/main/public/images/tweeter_desktop_style.png)
!["tweeter_mobile_style_1"](https://raw.githubusercontent.com/chisu-kawahara/tweeter/main/public/images/tweeter_mobile_style_1.png)
!["tweeter_mobile_style_2"](https://raw.githubusercontent.com/chisu-kawahara/tweeter/main/public/images/tweeter_mobile_style_2.png)


## Getting Started
1. [Create](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template) a new repository using this repository as a template.
2. Clone your repository onto your local device.
3. Install dependencies with `npm install` command.
3. Start the web server with `npm start` command. The app will be served at <http://localhost:8080/>.

## Dependencies
- Node.js: 5.10.x or above
- Express: ^4.21.2
- Body-Parser: ^2.2.0
- Chance: ^1.1.13
- Nodemon: ^3.1.9
