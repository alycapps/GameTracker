import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginForm from './pages/Auth/LoginForm';
import SignupForm from './pages/Auth/SignupForm';
import Nav from "./components/Nav";
import Games from './pages/Games'
import Detail from "./pages/Detail";
import Add from "./pages/Add"
import Collection from "./pages/Collection"
import NoMatch from "./pages/NoMatch";
import AUTH from './utils/AUTH';

class App extends Component {
  
  constructor() {
    super();
    
		this.state = {
			loggedIn: false,
			user: null
    };
  }
  
	componentDidMount() {
		AUTH.getUser().then(response => {
			console.log(response.data);
			if (!!response.data.user) {
				this.setState({
					loggedIn: true,
					user: response.data.user
				});
			} else {
				this.setState({
					loggedIn: false,
					user: null
				});
			}
		});
	}

	logout = (event) => {
    event.preventDefault();
    
		AUTH.logout().then(response => {
			console.log(response.data);
			if (response.status === 200) {
				this.setState({
					loggedIn: false,
					user: null
				});
			}
		});
	}

	login = (username, password) => {
		AUTH.login(username, password).then(response => {
      console.log(response);
      if (response.status === 200) {
        // update the state
        this.setState({
          loggedIn: true,
          user: response.data.user
        });
      }
    });
	}

	render() {
		return (
			<div className="App">
        { this.state.loggedIn && (
          <div>
            <Nav user={this.state.user} logout={this.logout}/>
            <div className="main-view">
              <Switch>
                <Route exact path="/" component={() => <Games user={this.state.user}/>} />
                <Route exact path="/games" component={() => <Games user={this.state.user}/>} />
                <Route exact path="/games/:id" component={Detail} />
								<Route exact path="/collection" component={Collection} />
								<Route exact path="/add" component={Add} />
                <Route component={NoMatch} />
              </Switch>
            </div>
          </div>
        )}
        { !this.state.loggedIn && (
          <div className="auth-wrapper" style={{paddingTop:40}}>
            <Route exact path="/" component={() => <LoginForm login={this.login}/>} />
            <Route exact path="/games" component={() => <LoginForm user={this.login}/>} />
            <Route exact path="/signup" component={SignupForm} />
          </div>
        )}
			</div>
		)
	}
}

export default App;
