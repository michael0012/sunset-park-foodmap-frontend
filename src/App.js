import React from "react";
import axios from './api';
import i18n from './i18n';
import { getCookie } from './utils';
import { connect } from 'react-redux';
import LoadingScreen from './screens/LoadingScreen';
import LoggedInRoutes from './LoggedInRoutes';
import LoggedOutRoutes from './LoggedOutRoutes';
import { LOGIN, LOGOUT } from './reducers/loggedIn';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
      logIn: (user) =>  dispatch({
          type: LOGIN,
          email: user.email,
          admin: user.admin,
      }),
      logOut: () => dispatch({
        type: LOGOUT,
      })
  };
}

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      loading: true,
    };
  }

  async componentDidMount(){
    
    this.setState({
      ...this.state,
      loading: true,
    });
    let user = null;
    const csrftoken = getCookie("csrftoken") || "";
    try{
      const response = await axios.post('/auth/me', {}, {responseType: 'json', withCredentials: true, credentials: 'include', headers:{'X-CSRFToken': csrftoken, "Accept-Language": i18n.language}});
      if( response.data.loggedIn){
        this.props.logIn(response.data.user);
        user = response.data.user;
      }
    }catch{
      // nothing needed... for now
    }
    if(user === null)
      this.props.logOut();
    
    this.setState({
      ...this.state,
      loading: false,
    });
  }

   render(){  
    if(this.state.loading)
      return <LoadingScreen/>;
    
    const Routing = this.props.loggedIn ? LoggedInRoutes : LoggedOutRoutes;
    return (
      <Router>
        <Switch>
          <Route component={Routing}/>
        </Switch>
      </Router>
    );
  }

}

const mapStateToProps = state => ({ loggedIn: state.loggedIn.loggedIn })

export default connect(mapStateToProps, mapDispatchToProps)(App);
