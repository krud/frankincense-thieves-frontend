import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import FavRecipes from './FavRecipes';
import AllRecipes from './AllRecipes';

export default class PrivateRoute extends Component {

    state= {
        show: "",
        showForm: false,
    }

    loginClicked = (event) => {
        event.preventDefault();
        this.setState({show:"login"})
      }
    
    signupClicked = (event) => {
        event.preventDefault();
        this.setState({show:"signup"})
    }

    toggleForm = () => {
        console.log("hit")
        this.setState({showForm:true})
    }

    render() {
    return (
        <Route render={(routerprops) => {
            const { username} = this.props
            
            return localStorage.token
                ? (
                    <div className="profile">
                        <header>
                            <h1>Welcome, {username}!</h1>
                            <i className="far fa-plus-square" onClick={this.toggleForm}></i>
                        </header>
                        <FavRecipes />
                        <AllRecipes />
                    </div>
                )
                : <>
                    { this.state.show !== ""
                        ? this.state.show === "login"
                            ? <Redirect to='/login' />
                            : <Redirect to='/signup' />
                        : <main>
                            <h1>Frankincense & Thieves</h1>
                            <span>
                                <button onClick={this.signupClicked}>Sign Up</button>
                                <button onClick={this.loginClicked}>Login</button>
                            </span>
                        </main>
                    })
                    </>
        }}
        />
    )
    }
}