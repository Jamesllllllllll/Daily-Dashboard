import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import unescapeURL from '../../utils/unescapeURL'

export const fetchRedditPosts = createAsyncThunk('reddit/fetchRedditPosts', async (numPosts=5, { getState }) => {
    
    const { posts } = getState()
    if(Object.keys(posts[0]).length === 0){
        return;
    }

    const queryParams = {
        limit: 25,
        after: null, // Retrieves posts after a certain post ID. 
        before: null,
        count: null, // Specifies the number of items already seen in the listing
    }

    const endpoint = `https://www.reddit.com/r/popular.json?limit=${queryParams.limit}`;
    const options = {}

    try {
        const response = await fetch(endpoint, options);
        const jsonResponse = await response.json();
        const preprocessed = jsonResponse.data.children.filter(post => post.data.preview !== undefined).slice(0,numPosts);
        return preprocessed;
    } catch (e) {
        console.log(e);
    }

});

const initialState = {
    posts: Array.from({length: 5}, ()=>({})), // show 5 placeholders posts initially
    isLoadingPosts: true,
    failedToLoadPosts: false
};

const redditSlice = createSlice({
    name: "reddit",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRedditPosts.pending, (state) => {
                state.isLoadingPosts = true;
                state.failedToLoadPosts = false;
            })
            .addCase(fetchRedditPosts.fulfilled, (state, action) => {
                state.posts = action.payload.map((post) => {
                    const imageURL = post.data.preview === undefined
                        ? null
                        : unescapeURL(post.data.preview.images[0].source.url); // decode escaped URL

                    return {
                        id: post.data.id,
                        description: post.data.description,
                        author: post.data.author,
                        title: post.data.title,
                        image: imageURL,
                        publishedAt: post.data.created_utc,
                        url: post.data.url,
                        subreddit: post.data.subreddit_name_prefixed
                    }
                });
                state.isLoadingPosts = false;
                state.failedToLoadPosts = false;
            })
            .addCase(fetchRedditPosts.rejected, (state) => {
                state.isLoadingPosts = false;
                state.failedToLoadPosts = true;
            })
    },
});


export const posts = state => state.reddit.posts;
export const isLoadingPosts = state => state.reddit.isLoadingPosts;
export const failedToLoadPosts = state => state.reddit.failedToLoadPosts;

export default redditSlice.reducer;