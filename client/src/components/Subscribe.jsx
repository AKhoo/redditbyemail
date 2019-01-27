import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function Subscribe(props) {
  return (
    <Dialog
      open={props.subscribeModalOpen}
      onClose={props.closeSubscribeModal}
    >
      <DialogTitle>Subscribe</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Enter your email below. 
          We'll send you the best of Reddit daily, with the categories and subreddits you selected!
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Email Address"
          type="email"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button color="default" onClick={props.closeSubscribeModal}>
          Cancel
        </Button>
        <Button variant="contained" color="secondary">
          Subscribe
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default Subscribe;
