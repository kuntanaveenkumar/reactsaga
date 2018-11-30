import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App'
import { applyMiddleware, createStore } from 'redux';
import store from "./store/store"
import './style.default.css'
import 'babel-polyfill' 
import "isomorphic-fetch"
import '../node_modules/font-awesome/css/font-awesome.min.css'
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('app'));
module.hot.accept();