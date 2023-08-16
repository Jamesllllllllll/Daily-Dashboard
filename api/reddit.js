export default async function handler(request, response) {
  const numPosts = request.query.numPosts;
  const queryParams = {
    limit: 25,
    after: null, // Retrieves posts after a certain post ID.
    before: null,
    count: null, // Specifies the number of items already seen in the listing
  };

  const endpoint = `https://www.reddit.com/r/aww/hot.json?limit=${queryParams.limit}`;

  try {
    const res = await fetch(endpoint);
    const jsonResponse = await res.json();
    const preprocessed = jsonResponse.data.children
      .filter((post) => post.data.preview !== undefined)
      .slice(0, numPosts);
    return response.send(preprocessed);
  } catch (e) {
    console.log(e);
  }
}
