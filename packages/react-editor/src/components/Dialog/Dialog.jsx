import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

export default ({ title, onCancel, onConfirm, confirmText = 'OK', cancelText = 'Cancel', children }) => (<Dialog open={true} onClose={onCancel}>
  <DialogTitle>{title}</DialogTitle>
  <DialogContent>
    { typeof children === 'string' ? <DialogContentText>{children}</DialogContentText> : <>{ children }</>}
  </DialogContent>
  <DialogActions>
    <Button onClick={onCancel}>{cancelText}</Button>
    <Button onClick={onConfirm} color="primary" variant="contained">{confirmText}</Button>
  </DialogActions>
</Dialog>);
