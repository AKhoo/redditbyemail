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
    </Dialog>
  )
}

export default withStyles(styles)(SubscribeSuccess);
