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
 const styledEmail = (categoriesSelected, callback) => {
 const html = ReactDOMServer.renderToString(
    <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
      <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>
        <Email categoriesSelected={categoriesSelected}/>
      </MuiThemeProvider>
    </JssProvider>
  )
  // Grab the CSS from our sheetsRegistry.
  const css = sheetsRegistry.toString();
  callback(html, css);
 }


module.exports = styledEmail;
