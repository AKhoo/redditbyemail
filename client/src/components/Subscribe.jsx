import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
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
    const { subscribed, classes } = this.props;
    if (subscribed) {
      return (
        <Dialog
          open={this.props.subscribeModalOpen}
          onClose={this.props.closeSubscribeModal}
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
    } else {
      return (
        <Dialog
          open={this.props.subscribeModalOpen}
          onClose={this.props.closeSubscribeModal}
        >
          <DialogTitle>Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText className={classes.dialogContentText}>
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
              value={this.state.email}
              onChange={this.handleInputChange}
              onKeyPress={this.handleKeyPress}
            />
          </DialogContent>
          <DialogActions className={classes.dialogActions}>
            <Button color="default" onClick={this.props.closeSubscribeModal}>
              Cancel
            </Button>
            <Button variant="contained" color="secondary" onClick={() => {this.props.handleSubscribe(this.state.email)}}>
              Subscribe
            </Button>
          </DialogActions>
        </Dialog>
      )
    }
  }
}

export default withStyles(styles)(Subscribe);
