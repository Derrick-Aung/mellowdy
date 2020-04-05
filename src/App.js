import './App.css';
import React, { Component } from 'react'
import Header from './components/Header'
import Home from './components/HomePage/Home'
import { Provider } from 'react-redux'
import store from './store'

export class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Header/>
          <Home/>
        </div>
      </Provider>
      
    )
  }
}

export default App

