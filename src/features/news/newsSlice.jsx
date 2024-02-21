import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import unescapeURL from '../../utils/unescapeURL';

export const fetchNewsPosts = createAsyncThunk(
  'news/fetchNewsPosts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/news');
      if (response.ok) {
        const jsonResponse = await response.json();
        console.log('jsonResponse: ')
        console.log(jsonResponse)
        return jsonResponse;
      }
    } catch (e) {
      console.log('Error in newsSlice.jsx: ')
      console.log(e)
      return rejectWithValue(e.response.data);
    }
  }
);

const initialState = {
  posts: Array.from({length: 5}, ()=>({})), // show 5 placeholders posts initially
  isLoadingPosts: true,
  failedToLoadPosts: false,
};

const newsSlice = createSlice({
  name: 'news',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewsPosts.pending, (state) => {
        state.isLoadingPosts = true;
        state.failedToLoadPosts = false;
      })
      .addCase(fetchNewsPosts.fulfilled, (state, action) => {
        if (action.payload === undefined) {
          state.failedToLoadPosts = true;
          state.isLoadingPosts = false;
          return
        }
        state.posts = action.payload.map((post) => {
          return {
            source: post.source,
            title: post.title,
            image: post.og,
            url: post.link,
          };
        });
        state.isLoadingPosts = false;
        state.failedToLoadPosts = false;
      })
      .addCase(fetchNewsPosts.rejected, (state) => {
        state.isLoadingPosts = false;
        state.failedToLoadPosts = true;
      });
  },
});

export const postSelector = (state) => state.news.posts;
export const isLoadingPosts = (state) => state.news.isLoadingPosts;
export const failedToLoadPosts = (state) => state.news.failedToLoadPosts;

export default newsSlice.reducer;
