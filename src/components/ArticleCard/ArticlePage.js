import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { posts } from '../../features/reddit/redditSlice';

import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ArticlePage = () => {
    const { id } = useParams();

    const article = useSelector(posts).filter(post => post.id === id)[0];


    return (
        <div>
            <Link to="/">
                <IconButton aria-label="Go back">
                    <ArrowBackIcon />
                </IconButton>
            </Link>
            <h2>{article.title}</h2>
            <p>Post ID: {article.id}</p>
        </div>
    );
};

export default ArticlePage;