import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux'; 

import App from "./components/App/App.js";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
// import darkBaseTheme from "material-ui/styles/baseThemes/darkBaseTheme";
// import lightBaseTheme from "material-ui/styles/baseThemes/lightBaseTheme";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import registerServiceWorker from "./registerServiceWorker";
import reducers from './reducers';
import reduxThunk from 'redux-thunk';


//const muiTheme = getMuiTheme(lightBaseTheme);


 const muiTheme = getMuiTheme ({
	palette: {
 		primary1Color: "#3F51B5",
 		accent1Color: "#2196F3"
 	}
 });

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
  <MuiThemeProvider muiTheme={muiTheme}>
    <Provider store={store}><App /></Provider>
  </MuiThemeProvider>,
  document.getElementById("root")
);

registerServiceWorker();
