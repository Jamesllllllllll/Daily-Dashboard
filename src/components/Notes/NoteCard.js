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

const NoteCard = ({
  dateTime,
  data,
  handleEditNote,
  handleDeleteNote
}) => {

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
    handleEditNote(dateTime, newData);
  }

  const date = new Date(Date.parse(dateTime)).toDateString();

  return (
    <Card sx={{
      width: '60%',
      margin: '1rem'
    }}>
      <CardHeader
        action={
          <PositionedMenu
            dateTime={dateTime}
            handleDeleteNote={handleDeleteNote}
            handleOnEdit={handleOnEdit}
          />
        }
        subheader={date}
        sx={{
          fontSize: '1rem',
          textAlign: 'start',
          height: 'fit-content'
        }}
      />
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
        <CardContent
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            justifyContent: 'end',
            overflow: 'auto'
          }}
        >
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

export default NoteCard;