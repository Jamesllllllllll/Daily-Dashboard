# Daily Dashboard

## Introduction

Daily Dashboard is a dynamic web application designed to enhance your daily routine by providing essential information at a glance. Built with React, Redux, and Jest, this application offers a user-friendly interface to display the following key features:

- **City Visualization**: Utilizing Mapbox, it renders a detailed view of the user's city.
- **Top 5 Articles**: Integrates with NewsAPI to fetch and display the top 5 articles of the day.
- **Daily Fact**: A unique and interesting fact presented daily.

This application is ideal for users who want to stay informed and connected with their surroundings with minimal effort.

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
   To fully utilize the features of Daily Dashboard, you need to obtain API keys from the following services:

   - WeatherAPI (for city visualization)
   - Mapbox (for mapping services, make sure to use the public key)
   - NewsAPI (for top articles)

   Register and create an account at each of these services to obtain your API keys.

4. **Environment Variables:**

   - Copy the `.env.example` file to a new file named `.env`.
   - Fill in your API keys in the `.env` file as follows:
     ```
     REACT_APP_WEATHER_API_KEY=your_weatherapi_key
     REACT_APP_MAPBOX_API_KEY=your_mapbox_key
     REACT_APP_NEWS_API_KEY=your_newsapi_key
     ```

5. **Running the application locally:**
   Use the Vercel CLI to run the application in a development environment:
   ```bash
   vercel dev
   ```
   This command will start the application on a local development server, usually at `http://localhost:3000`. It will also prompt you to connect the project to your vercel account.

## Usage

After setting up and running the application, you can access the Daily Dashboard in your web browser. The interface will display your city's visualization, the top 5 articles of the day, and a unique daily fact.

## Contributing

We welcome contributions to the Daily Dashboard! In order to contribute, you will have to create a PR with your changes, and try to merge it into `development`. The repo uses GitHub Actions to run tests and validate PRs. Once your PR is reviewed and passes all tests it can be merged.

Direct commits to `deployment` are not supported by the repo and will be blocked. This is to ensure safe development.