import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "@vkontakte/vkui/dist/vkui.css"
import {NavigationProvider} from "./context/NavigationContext";
import {Provider} from "react-redux";
import store from "./redux"

ReactDOM.render(
    <Provider store={store}>
        <NavigationProvider><App/></NavigationProvider>
    </Provider>
    ,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
