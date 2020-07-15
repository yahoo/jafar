/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import Fab from '@material-ui/core/Fab';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';

const ITEM_HEIGHT = 48;

export default function ActionsMenu({ options = [], data }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAction = (option, index) => {
    option.onClick(data, index);
    handleClose();
  };

  return (
    <div>
      <Fab
        aria-label="actions"
        color="secondary"
        size="small"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </Fab>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted={true}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: 200,
          },
        }}
      >
        {
          options.map((option, index) => { 
            const Icon = option.icon;
            return (
              <MenuItem key={index} onClick={() => handleAction(option)}>
                <ListItemIcon><Icon fontSize="small" /></ListItemIcon>
                <Typography variant="inherit" noWrap={true}>{ option.label }</Typography>
              </MenuItem>);
          })
        }
      </Menu>
    </div>
  );
}
