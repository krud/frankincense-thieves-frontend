import React, { Component } from 'react'
import './styles/App.scss';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute';
import Login from './components/Login'
import Signup from './components/Signup'

export default class App extends Component {

  state = {
    favorite_recipes: [],
    username: "",
    id: "",
  }

  componentDidMount(){
    let {token} = localStorage
    fetch('http://localhost:3000/api/v1/profile', {
      method: 'GET',
      headers: {
        'Authorization':`Bearer ${token}`
      }
    })
    .then(response => response.json())
    .then(result => {
      return result.user 
      ? this.setState({ username: result.user.username, id: result.user.id })
      : null
    })
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <PrivateRoute exact 
              path='/' 
              // rooms={this.state.rooms}
              username={this.state.username}
              // deleteRoom={this.deleteRoom} 
              // updateRoom={this.updateRoom} 
              // roomAction={this.addRoom} 
              />
            <Route path='/signup' render={(routerprops) => <Signup {...routerprops} signup={this.signup}/>}/>
            <Route path='/login' render={(routerprops) => <Login {...routerprops} login={this.login}/>}/>
          </Switch>
        </div>
      </Router>
    )
  }

  login = (user, history) => {
    fetch('http://localhost:3000/api/v1/login', {
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify({user})
    })
    .then(response => response.json())
    .then(({user, user: {username, id}, jwt}) => {
      localStorage.setItem('token', jwt)
      this.setState({username, id})
      history.push('/')
    })
  }

  signup = (user, history) => {
    fetch('http://localhost:3000/api/v1/users', {
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify({user})
    })
    .then(response => response.json())
    .then(({user, user: {username, id}, jwt}) => {
      localStorage.setItem('token', jwt)
      this.setState({username, id})
      history.push('/')
    })
  }

}


        // <h1>Frankincense & Thieves</h1>

