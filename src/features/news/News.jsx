import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {
  postSelector,
  isLoadingPosts,
  failedToLoadPosts,
  fetchNewsPosts,
} from './newsSlice';
import Box from '@mui/material/Box';
import { Alert } from '@mui/material';
import { Skeleton } from '@mui/material';
import StyledCard from '../../components/LayoutComponents/FeatureCard';
import Typography from '@mui/material/Typography';
import styles from './news.module.css';

const News = () => {
  const posts = useSelector(postSelector);
  const isLoading = useSelector(isLoadingPosts);
  const failedToLoad = useSelector(failedToLoadPosts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNewsPosts());
  }, [dispatch]);

  const length = [70, 90, 95, 60, 75];

  const LoadingArticles = () => {
    return (
      <div className={styles.loadingArticles} data-testid='loading-articles'>
        {length.map((titleLength) => {
          return (
            <div className={styles.singleLoadingArticle} key={titleLength}>
              <Skeleton
                variant='rounded'
                height='60px'
                width='100px'
                animation='wave'
                sx={{ flexShrink: 0 }}
              />
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                }}
              >
                <Skeleton
                  variant='rounded'
                  height={'1.25rem'}
                  width={`${titleLength}%`}
                  animation='wave'
                  sx={{ mb: '.75rem' }}
                />
                <Skeleton
                  variant='rounded'
                  height={'1rem'}
                  width='20%'
                  animation='wave'
                  sx={{ m: 0 }}
                />
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <Box className='cardContainer' data-testid='news-widget'>
      <h2 className='cardTitle'>Latest Headlines</h2>
      <StyledCard
        content={
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {isLoading && !failedToLoad && <LoadingArticles />}
            {failedToLoad && (
              <Alert severity='warning' data-testid='failed-to-load'>Failed to load new articles</Alert>
            )}
            {!isLoading && posts[0].title && 
              posts.map((post, index) => {
                return (
                  <div
                    key={index}
                    className={styles.singleArticle}
                    data-testid={`article-${index}`}
                  >
                    <img src={`${post.image}`} alt={`${post.title}`} />
                    <div>
                      <a
                        href={`${post.url}`}
                        target='_blank'
                        rel='noreferrer nofollow'
                      >
                        <Typography>{post.title}</Typography>
                      </a>
                      <Typography sx={{ color: '#666', fontSize: '.8rem' }}>
                        {post.source}
                      </Typography>
                    </div>
                  </div>
                );
              })}
          </div>
        }
      />
    </Box>
  );
};

export default News;
