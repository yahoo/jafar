/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/icons/Dehaze';
import PropTypes from 'prop-types';
import Menu from '../Menu';

function Options(props) {
  const [anchorEl, updateAnchorEl] = useState(null);

  const onMenuClick = (event) => {
    updateAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    updateAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      <IconButton aria-label="Options" aria-owns={open ? 'options-menu' : undefined} aria-haspopup="true"
        color="primary" onClick={onMenuClick}>
        <Icon />
      </IconButton>
      <Menu options={props.options} anchorEl={anchorEl} open={open} onClose={handleClose} />
    </div>
  );
}

Options.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
  })),
};

export default Options;
