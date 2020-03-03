/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  popper: {
    top: '-10px !important',
    '&[x-placement*="bottom"] $arrow': {
      top: 0,
      left: 0,
      marginTop: '-0.9em',
      width: '3em',
      height: '1em',
      '&::before': {
        borderWidth: '0 1em 1em 1em',
        borderColor: `transparent transparent #cecece transparent`,
      },
    },
    '&[x-placement*="top"] $arrow': {
      bottom: 0,
      left: 0,
      marginBottom: '-0.9em',
      width: '3em',
      height: '1em',
      '&::before': {
        borderWidth: '1em 1em 0 1em',
        borderColor: `#cecece transparent transparent transparent`,
        marginTop: '1px',
      },
    },
    '&[x-placement*="right"] $arrow': {
      left: 0,
      marginLeft: '-0.9em',
      height: '3em',
      width: '1em',
      '&::before': {
        borderWidth: '1em 1em 1em 0',
        borderColor: `transparent #cecece transparent transparent`,
      },
    },
    '&[x-placement*="left"] $arrow': {
      right: 0,
      marginRight: '-0.9em',
      height: '3em',
      width: '1em',
      '&::before': {
        borderWidth: '1em 0 1em 1em',
        borderColor: `transparent transparent transparent #cecece`,
      },
    },
  },
  paper: {
    maxWidth: 200,
  },
  arrow: {
    position: 'absolute',
    fontSize: 7,
    width: '3em',
    height: '3em',
    '&::before': {
      content: '""',
      margin: 'auto',
      display: 'block',
      width: 0,
      height: 0,
      borderStyle: 'solid',
    },
  },
  header: {
    borderBottom: '1px solid #e1e1e1',
    textTransform: 'uppercase',
    padding: '15px',
    fontSize: '16px !important',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  body: {
    padding: '15px',
    maxHeight: '150px',
    overflowY: 'auto',
  },
}));

export default function Popover(props) {
  const classes = useStyles();
  const [arrowRef, setArrowRef] = React.useState(null);
  const Component = props.component;

  const modifiers = {
    flip: {
      enabled: true,
    },
    preventOverflow: {
      enabled: true,
      boundariesElement: 'scrollParent',
    },
    arrow: {
      enabled: true,
      element: arrowRef,
    },
  };

  return (
    props.targetRef.current && <Popper
      id={props.id}
      open={props.open()}
      anchorEl={props.targetRef.current}
      placement="top"
      className={classes.popper}
      disablePortal={true}
      modifiers={modifiers}>
      <span className={classes.arrow} ref={setArrowRef} />
      <Paper className={classes.paper}>
        <div className={classes.header}>{props.title}</div>
        <div className={classes.body}>
          <Component { ...(props.props || {}) } />
        </div>
      </Paper>
    </Popper>
  );
}
