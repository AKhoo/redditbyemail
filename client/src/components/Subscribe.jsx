import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  container: {
    marginBottom: 45,
  },
  textField: {
    margin: 0,
  },
  cta: {
    marginBottom: 5,
  },
  emailInput: {
    width: 275,
    height: 15,
    backgroundColor: 'floralwhite',
  },
  heroButton: {
    marginTop: 6,
    marginLeft: 10,
    marginRight: 5
  },
  dialogContentText: {
    marginBottom: 15,
  },
  dialogActions: {
    marginBottom: 20,
    marginRight: 20
  }
};

class Subscribe extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      email: '',
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleInputChange(e) {
    this.setState({email: e.target.value});
  }

  handleKeyPress(e) {
    if (e.key === 'Enter' && !this.props.subscribed) {
      this.props.handleSubscribe(this.state.email);
    }
  }

  render() {
    const { classes, handleSubscribe, subscribeModalOpen, closeSubscribeModal, subscribed } = this.props;

    const subscribeButton = <Button variant="contained" color="secondary" className={classes.heroButton} onClick={() => {handleSubscribe(this.state.email)}}>subscribe</Button>
    const subscribedButton = <Button variant="contained" color="default" className={classes.heroButton} disabled>subscribed!</Button>
    
    const subscribedDialog = (
      <React.Fragment>
        <DialogTitle>Please Check Your Inbox Now</DialogTitle>
        <DialogContent>
          <DialogContentText className={classes.dialogContentText}>
            Thanks for subscribing! We sent you an email but it might be in your Spam folder. 
          </DialogContentText>
          <DialogContentText className={classes.dialogContentText}>
            If you don't see an email within the next few minutes, go to your Spam folder and mark Reddit By Email as 'Not Spam'. 
          </DialogContentText>
          <DialogContentText className={classes.dialogContentText}>
            Once you've whitelisted us, our emails should appear in your inbox!
          </DialogContentText>
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
          <Button variant="contained" color="primary" onClick={closeSubscribeModal}>
            I've Whitelisted Reddit By Email
          </Button>
        </DialogActions>
      </React.Fragment>
    );
    const errorDialog = (
      <React.Fragment>
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
          <Button variant="contained" color="primary" onClick={closeSubscribeModal}>
            Close
          </Button>
        </DialogActions>
      </React.Fragment>
    );

    return (
      <React.Fragment>
        <div className={classes.container}>
          <div>
          <Typography variant="h6" className={classes.cta}> 
          Preview below. Join our free newsletter today!
          </Typography>
          </div>
          <div>
            <TextField
              id="outlined-email-input"
              label="Enter your email address"
              className={classes.textField}
              type="email"
              name="email"
              autoComplete="email"
              margin="normal"
              variant="outlined"
              InputProps={{ classes: { input: classes.emailInput } }}
              value={this.state.email}
              onChange={this.handleInputChange}
              onKeyPress={this.handleKeyPress}
            />
            {subscribed ? subscribedButton : subscribeButton}
          </div>
        </div>

        <Dialog
        open={subscribeModalOpen}
        onClose={closeSubscribeModal}
        PaperProps={{
          style: {
            backgroundColor: 'white',
          }
        }}
        >
        {subscribed ? subscribedDialog : errorDialog}
        </Dialog>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(Subscribe);
