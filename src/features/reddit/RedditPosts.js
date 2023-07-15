import { React, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRedditPosts, posts, isLoadingPosts } from './redditSlice';
import ArticleCard from '../../components/ArticleCard/ArticleCard';
import { Stack } from '@mui/material'

const RedditPosts = () => {

    const dispatch = useDispatch();
    const featuredPosts = useSelector(posts);
    const isLoading = useSelector(isLoadingPosts);

    useEffect(() => {
        dispatch(fetchRedditPosts());
    }, [dispatch]);

    return (
        <>
            <h1>Articles</h1>
            <Stack spacing={2}>
                {featuredPosts.map(({ id, url, description, author, title, image, publishedAt }) =>
                    <ArticleCard
                        id={id}
                        url={url}
                        title={title}
                        description={description}
                        author={author}
                        image={image}
                        publishedAt={publishedAt}
                        isLoading={isLoading}
                    />
                )}
                {/* } */}
            </Stack>
        </>
    )
};

export default RedditPosts;


