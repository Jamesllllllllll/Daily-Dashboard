# Daily Dashboard

## Introduction

Daily Dashboard is a dynamic web application designed to enhance your daily routine by providing essential information at a glance. Built with React, Redux, and Jest, this application offers a user-friendly interface to display the following key features:

- **Current Weather**: Displays current weather in your city using [WeatherAPI](https://weatherapi.com).
- - **Random Fact or Quote**: A unique and interesting fact or quote each time you visit the Dashboard using the relevant APIs from [API Ninjas}(https://api-ninjas.com).
- **Top 5 Articles**: Displays the top 5 articles of the day using [NewsAPI](https://newsapi.org/s/google-news-api).
- **Emotional Wellbeing Check-in**: Log your daily mood and energy level and see your recent history.
- **To-Do List**: Keep track of things you need to get done.
- **Notes**: Take notes and save for review.

This application is ideal for users who want to stay informed and organized with minimal effort.

## Getting Started

### Prerequisites

Before setting up the project, ensure you have the following installed:

- Node.js and npm (Node Package Manager)
- Vercel CLI (for running the app locally)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Jamesllllllllll/Daily-Dashboard
   cd Daily-Dashboard
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **API Keys Setup:**
   To use the features of Daily Dashboard, you need to obtain API keys from the following services:

   - WeatherAPI (for retrieving the current weather for the selected city)
   - Mapbox (for retrieving a list of cities for the Weather component)
   - NewsAPI (for top articles)
   - API-Ninjas (for retrieving a random quote or fact)

   Register and create an account at each of these services to obtain your API keys.

4. **Environment Variables:**

   - Copy the `.env.example` file to a new file named `.env`.
   - Fill in your API keys in the `.env` file as follows:
     ```
     REACT_APP_WEATHER_API_KEY=your_weatherapi_key
     REACT_APP_MAPBOX_API_KEY=your_mapbox_key
     REACT_APP_NEWS_API_KEY=your_newsapi_key
     REACT_APP_X_Api_Key=your_api-ninjas_key
     ```

5. **Running the application locally:**
   Use the Vercel CLI to run the application in a development environment:
   ```bash
   vercel dev
   ```
   This command will start the application on a local development server, usually at `http://localhost:3000`. It will also prompt you to connect the project to your vercel account.

## Usage

After setting up and running the application, you can access the Daily Dashboard in your web browser.

## Contributing

We welcome contributions to the Daily Dashboard! In order to contribute, you will have to create a PR with your changes, and try to merge it into `development`. The repo uses GitHub Actions to run tests and validate PRs. Once your PR is reviewed and passes all tests it can be merged.

Direct commits to `deployment` are not supported by the repo and will be blocked. This is to ensure safe development.

## Testing

This project uses a variety of tools for testing. It uses Cypress for End-to-end tests, as well as Jest for unit tests. In order to run the e2e tests locally (headless mode), you can do so through the following procedure:

1. Start the app through `npm run start`. This will use vercel to start the app
2. Assuming the app is runing at `http://localhost:3000`, you can run `npm run cypress:run`. If the app is running at a specific port, you can run `npm run cypress:run -- --p <port_number>`

Cypress is able to run the tests in headful mode as well. As in, it can spin up an Electron app and you can see cypress complete the tests yo've specificed. You can do this by running `npm cypress:open` and then navigating to the appropriate test
