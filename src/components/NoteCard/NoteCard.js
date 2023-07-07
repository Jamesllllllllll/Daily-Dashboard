import { React, useState } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import RichTextEditor from '../RichTextEditor/RichTextEditor';
import PositionedMenu from '../PositionedMenu/PositionedMenu';
import getShortDescription from '../../utils/getShortDescription';

import { editNote } from '../../features/notes/notesSlice';
import { useDispatch } from 'react-redux';
import { Typography } from '@mui/material';


const NoteCard = ({
  dateTime,
  data
}) => {

  const dispatch = useDispatch();

  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    // Toggle between expanded view and collapsed view
    setExpanded(!expanded);
    // Handles edge case when user exits after clicking 'Edit'
    setAllowEdit(false);
  };

  const [newData, setNewData] = useState(data);
  const [allowEdit, setAllowEdit] = useState(false);
  const handleOnEdit = () => {
    setAllowEdit(true);
    // Automatically expand the card
    setExpanded(true);
  }
  const handleSubmit = () => {
    setAllowEdit(false);
    dispatch(editNote({ dateTime, newData }));
  }

  // Parse date and time
  const dateTimeObject = new Date(Date.parse(dateTime));
  const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const date = dateTimeObject.toLocaleDateString('en-AU', dateOptions);
  const time = dateTimeObject.toLocaleTimeString('en-AU');

  // Short description
  const shortDescription = getShortDescription(newData);

  return (
    <Card sx={cardStyles}>
      <CardHeader
        action={
          <PositionedMenu
            dateTime={dateTime}
            handleOnEdit={handleOnEdit}
          />
        }
        title={date}
        titleTypographyProps={{ variant: 'subtitle1' }}
        subheader={time}
        subheaderTypographyProps={{ variant: 'subtitle2' }}
        sx={headerStyles}
      />

      <CardContent sx={{ margin: '0 auto', padding: '0 auto', ...headerStyles }}>
        <Typography variant='body2' color="text.secondary">
          {!expanded ? shortDescription : null}
        </Typography>
      </CardContent>

      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse
        in={expanded}
        timeout="auto"
        unmountOnExit
      >
        <CardContent sx={contentStyles}>
          <RichTextEditor
            data={newData}
            setData={setNewData}
            handleSubmit={handleSubmit}
            allowEdit={allowEdit}
            newNote={false}
          />
        </CardContent>
      </Collapse>
    </Card>
  );
}


const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const cardStyles = {
  width: '60%',
  margin: '1rem'
};

const headerStyles = {
  fontSize: '1rem',
  textAlign: 'start',
  height: 'fit-content'
};

const contentStyles = {
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  justifyContent: 'end',
  overflow: 'auto'
};

export default NoteCard;