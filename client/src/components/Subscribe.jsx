import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class Subscribe extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      email: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleInputChange(e) {
    this.setState({email: e.target.value});
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      console.log('foo');
      // this.props.handleSubscribe(this.state.email);
    }
  }

  render() {
    return (
      <Dialog
        open={this.props.subscribeModalOpen}
        onClose={this.props.closeSubscribeModal}
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
            value={this.state.email}
            onChange={this.handleInputChange}
            onKeyPress={this.handleKeyPress}
          />
        </DialogContent>
        <DialogActions>
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

export default Subscribe;
