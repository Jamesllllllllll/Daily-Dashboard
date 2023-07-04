import { React, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function PositionedMenu({
    dateTime,
    handleDeleteNote,
    handleOnEdit
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    // Sets menu's anchor element
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    // Resets anchor element so the menu is no longer rendered 
    setAnchorEl(null);
  };

  const handleEdit = () => {
    handleOnEdit();
    // Close menu when clicked
    handleClose();
  }

  const handleDelete = () => {
    handleDeleteNote(dateTime);
    handleClose();
  }


  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        
      >
        <MenuItem sx={{ fontSize: "0.75rem" }} onClick={handleEdit}>Edit</MenuItem>
        <MenuItem sx={{ fontSize: "0.75rem" }} onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </div>
  );
}