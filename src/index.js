import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment'
import { Provider } from 'react-redux';
import App from './App';
import './i18n';
import theme from './theme';
import store from './store';
import './index.css';
import * as serviceWorker from './serviceWorker';
// import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.Fragment>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <React.Fragment>
          <CssBaseline/>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <App />
          </MuiPickersUtilsProvider>
        </React.Fragment>
      </ThemeProvider>
    </Provider>
  </React.Fragment>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
serviceWorker.register();