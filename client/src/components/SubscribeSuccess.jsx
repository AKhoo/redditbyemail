import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
  dialogContentText: {
    marginBottom: 15,
  },
  dialogActions: {
    marginBottom: 20,
    marginRight: 20
  }
});

const successContent = (
  <DialogTitle>Please Check Your Inbox Now</DialogTitle>
  <DialogContent>
    <DialogContentText className={classes.dialogContentText}>
      We sent you a test email but it's likely in your Spam folder. 
    </DialogContentText>
    <DialogContentText className={classes.dialogContentText}>
      If you don't see an email within the next few minutes, go to your Spam folder and mark Reddit By Email as 'Not Spam'. 
    </DialogContentText>
    <DialogContentText className={classes.dialogContentText}>
      Once you've whitelisted us, our emails should appear in your inbox!
    </DialogContentText>
  </DialogContent>
  <DialogActions className={classes.dialogActions}>
    <Button variant="contained" color="primary" onClick={this.props.closeSubscribeModal}>
      I've Whitelisted Reddit By Email
    </Button>
  </DialogActions>
);

const errorContent = (
  <DialogTitle>Uh Oh!</DialogTitle>
  <DialogContent>
    <DialogContentText className={classes.dialogContentText}>
      It looks like you're already subscribed to Reddit By Email so we are unable to re-subscribe you.
    </DialogContentText>
    <DialogContentText className={classes.dialogContentText}>
      If you would like to edit your subscription settings, please first click the unsubscribe link at the bottom of one of our emails and then try subscribing here again.
    </DialogContentText>
  </DialogContent>
  <DialogActions className={classes.dialogActions}>
    <Button variant="contained" color="primary" onClick={this.props.closeSubscribeModal}>
      Close
    </Button>
  </DialogActions>
)

const SubscribeSuccess = (props) => {
  const { classes } = props;
  return (
    <Dialog
      open={this.props.subscribeModalOpen}
      onClose={this.props.closeSubscribeModal}
      PaperProps={{
        style: {
          backgroundColor: 'white',
        }
      }}
    >
    {props.subscribed}
    </Dialog>
  )
}

export default withStyles(styles)(SubscribeSuccess);
