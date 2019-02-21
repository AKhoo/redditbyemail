import Email from './components/Email.jsx';
import React from 'react';
import ReactDOMServer from 'react-dom/server'
import { SheetsRegistry } from 'jss';
import JssProvider from 'react-jss/lib/JssProvider';
import {
  MuiThemeProvider,
  createMuiTheme,
  createGenerateClassName,
} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';


 // Create a sheetsRegistry instance.
 const sheetsRegistry = new SheetsRegistry();

 // Create a sheetsManager instance.
 const sheetsManager = new Map();

 // Create a theme instance.
 const theme = createMuiTheme({
   palette: {
     type: 'light',
   },
 });

 // Create a new class name generator.
 const generateClassName = createGenerateClassName();

 // Render the component to a string.
 const styledEmail = (emailAddress, categoriesSelected, callback) => {
  const today = new Date();
  const dateString = `${today.toLocaleString('en', { weekday: 'long'})} ${today.toLocaleString('en', { year: 'numeric', month: 'long', day: 'numeric' })}`;
  const html = ReactDOMServer.renderToString(
      <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
        <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>
          <Typography variant="h4" align="center">Reddit By Email</Typography>
          <Typography variant="subtitle2" align="center">{dateString}</Typography>
          <Email categoriesSelected={categoriesSelected}/>
          <Typography variant="caption" align="center">You're receiving this email because you subscribed to Reddit By Email.</Typography>
          <Link href={`/unsubscribe?email=${emailAddress}`}>Click here to unsubscribe.</Link>
        </MuiThemeProvider>
      </JssProvider>
    )
    // Grab the CSS from our sheetsRegistry.
    const css = sheetsRegistry.toString();
    callback(html, css);
 }


module.exports = styledEmail;
