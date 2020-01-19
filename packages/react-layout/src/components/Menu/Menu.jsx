/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import MenuInner from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';

export const ITEM_HEIGHT = 48;

function Menu(props) {
  const onOptionClick = (option) => {
    option.onClick();
    props.onClose();
  };

  return (
    <MenuInner
      id="options-menu"
      anchorEl={props.anchorEl}
      open={props.open}
      onClose={props.onClose}
      PaperProps={{
        style: props.style,
      }}
      anchorOrigin={props.anchorOrigin}
      transformOrigin={props.transformOrigin}
      getContentAnchorEl={props.getContentAnchorEl}
    >
      {props.options.map(option => (
        <MenuItem key={option.label} disabled={option.disabled} aria-disabled={option.disabled} 
          onClick={() => { onOptionClick(option); }}>
          {option.label}
        </MenuItem>
      ))}
    </MenuInner>
  );
}

Menu.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
  })),
  anchorEl: PropTypes.object,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  style: PropTypes.object,
};

Menu.defaultProps = {
  style: {
    maxHeight: ITEM_HEIGHT * 4.5,
    width: 200,
  },
};

export default Menu;
