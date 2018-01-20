import React, { Component } from 'react';
import { Route,  Redirect, Switch } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage';
import NotHomePage from './components/NotHomePage';
import DashBoardCont from './containers/DashboardCont';
import DashBoard from './components/DashBoard';
import RegisterCont from './containers/RegisterCont';
import NotFound from './components/NotFound';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducer from './reducer/index';
import LoginCont from './containers/LoginCont';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import CreateVoteCont from './containers/CreateVoteCont';
import AppHeaderCont from './containers/AppHeaderCont';
import VoteCont from './containers/VoteCont';
import UserCont from './containers/UserCont';
import AppFooter from './components/AppFooter';
import {loadState, saveState} from './localStorage';
//creating store and applyng middlware
// router historymiddleware
//creating enhanced history
const history = createHistory();
const historyMiddleware = routerMiddleware(history);
const persistedState =loadState();

const store = createStore(reducer,persistedState,composeWithDevTools(
   applyMiddleware(thunk,logger,historyMiddleware)
));


store.subscribe(()=>{
  saveState(store.getState());
})

//checking authorization
function requireAuth(){
   return !sessionStorage.getItem('JWT')
}


class App extends Component {
  render() {
    return (
    <Provider store = {store}>
      <ConnectedRouter  history={history}>
      <div>
      <div id='main-wrapper'>
       <AppHeaderCont></AppHeaderCont>

        <Switch>
      //requireAuth()
        <Route exact path='/' component = {HomePage} />
        <Route exact path="/dashboard/:user" render={routePaths => (
             requireAuth()? (
           <Redirect to="/login"/>
         ) : (  <div>
                <UserCont/>
                 <DashBoardCont {...routePaths} />
                 </div>
                )
               )}/>
          <Route exact path="/newpoll" render={() => (
                //requireAuth()
                requireAuth()? (
             <Redirect to="/login"/>
                ) : (
                      <CreateVoteCont/>
                      )
                    )}/>
        <Route exact path='/poll/:id' render={routePaths=>(<VoteCont {...routePaths}/>)} />
        <Route exact path ='/register' component={RegisterCont} />
        <Route exact path ='/login' component = {LoginCont} />
        <Route  path= '/notHomePage' component ={NotHomePage} />
        <Route path="*" exact={true} component={NotFound} />
         </Switch>
         </div>
         <AppFooter />
        </div>
      </ConnectedRouter>
    </Provider>
    );
  }
}

export default App;
