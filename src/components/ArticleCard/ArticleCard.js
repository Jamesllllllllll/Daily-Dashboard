import { React } from 'react';
import { Link } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { CardActionArea, Skeleton } from '@mui/material';
import { styled } from '@mui/system';

import formatDistanceStrict from 'date-fns/formatDistanceStrict';

const ArticleCard = ({
  id,
  url,
  title,
  author,
  description,
  image,
  publishedAt,
  isLoading,
}) => {
  return (
    <NewsCard key={id} sx={{ width: '400px', height: 'auto' }}>
      <>
        <CardActionArea component={Link} to={`/article/${id}`} disableRipple>
          {!isLoading ? (
            <CardMedia
              component="img"
              image={image}
              alt={title}
              sx={{ height: '300px', objectFit: 'cover' }}
            />
          ) : (
            <Skeleton variant="rectangular" height={'300px'} sx={{}} />
          )}
          <CardContent>
            <Typography
              variant="body1"
              component="div"
              sx={{ textAlign: 'start' }}
            >
              {!isLoading ? (
                title
              ) : (
                <Skeleton variant="text" width={'100%'} height={20} sx={{}} />
              )}
            </Typography>
            <Typography variant="body2" height="2.9rem" color="text.secondary" sx={{ overflow: 'hidden', py: '0.5rem' }}>
              {!isLoading ? (
                description
              ) : (
                <Skeleton variant="text" width={'100%'} height={20} sx={{}} />
              )}
            </Typography>
          </CardContent>
          <CardContent
            sx={{
              borderTop: '0.075rem #BFBFBF solid',
              textAlign: 'start',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: '.25rem',
              paddingBottom: '.25rem',
            }}
          >
            <Typography variant="body2" color="text.secondary">
              {!isLoading ? (
                <>
                  {formatPublishedAt(publishedAt)} • {author}
                </>
              ) : (
                <Skeleton variant="text" width={'5vw'} height={20} sx={{}} />
              )}
            </Typography>
            <IconButton aria-label="more" id="long-button">
              <MoreVertIcon />
            </IconButton>
          </CardContent>
        </CardActionArea>
      </>
    </NewsCard>
  );
};

const NewsCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  borderRadius: 16,
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  '&:hover': {
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  '& .MuiCardMedia-root': {
    // paddingTop: '56.25%', // 16:9 aspect ratio for media
  },
  '& .MuiCardContent-root': {
    flexGrow: 1,
  },
}));

const formatPublishedAt = (publishedAt) => {
  const now = new Date();
  const publishedDate = new Date(publishedAt * 1000); // Convert Unix timestamp to milliseconds
  return formatDistanceStrict(publishedDate, now, { addSuffix: true });
};

export default ArticleCard;
