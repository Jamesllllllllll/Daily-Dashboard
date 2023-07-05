# Serverless Functions

To completely hide our API keys, we need to use serverless functions.

The API keys will be stored in the project Settings -> Environment Variables on Vercel.com in order to work in deployments.

You should still use a **.env** file in your root directory to store your API keys.

---

## Implementation

### .ENV

Your **.env** file will contain:

`REACT_APP_WEATHER_API_KEY = 'abcde12345'`

Your feature.jsx will contain:

`const API_KEY = process.env.REACT_APP_WEATHER_API_KEY`

### Vercel Settings

We will add to the project Environment Variables in Vercel:

Key: REACT_APP_WEATHER_API_KEY
Value: abcde12345

### Set up API route

Create a **route.jsx** in the /api folder, where **route** is a descriptive term for your API call

The file must contain a function called *handler* like so:

```js
export default async function handler(request, response) {
    // API fetch logic
}
```

> Note: There is an issue with using Axios, so I switched the weather's serverless functions call using the Fetch() API instead.

It should return a stringified JSON object, which can be parsed with `response.json()` in the component

See /api/weather.js for an example.

### Development

**IMPORTANT!** - In order for serverless functions to work in development, you must run `vercel dev` in the terminal instead of `npm start`


Vercel Docs: [Serverless Functions](https://vercel.com/docs/concepts/functions/serverless-functions)