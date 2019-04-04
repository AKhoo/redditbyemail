import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

function Subscribe() {
  const [count, setCount] = useState(0);
}

// const styles = {
//   container: {
//     marginBottom: 45,
//   },
//   textField: {
//     margin: 0,
//   },
//   cta: {
//     marginBottom: 5,
//   },
//   emailInput: {
//     width: 275,
//     height: 15,
//   },
//   heroButton: {
//     marginTop: 6,
//     marginLeft: 10,
//     marginRight: 5
//   },
// };

// const Subscribe = (props) => {
//   const { classes, openSubscribeModal } = props;
//   const [email, setEmail] = useState(0);
//   return (
//     <div className={classes.container}>
//       <div>
//       <Typography variant="h6" className={classes.cta}> 
//       Preview below. Join our free newsletter today!
//       </Typography>
//       </div>
//       <div>
//         <TextField
//           id="outlined-email-input"
//           label="Enter your email address"
//           className={classes.textField}
//           type="email"
//           name="email"
//           autoComplete="email"
//           margin="normal"
//           variant="outlined"
//           InputProps={{ classes: { input: classes.emailInput } }}
//         />
//         <Button variant="contained" color="secondary" className={classes.heroButton} onClick={openSubscribeModal}>subscribe</Button>
//       </div>
//     </div>
//   )
// }

// export default withStyles(styles)(Subscribe);
export default Subscribe;
