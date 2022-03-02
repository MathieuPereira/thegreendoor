import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './components/homepage'
import SalePage from "./components/salePage";

// REDUX
import {Provider} from 'react-redux'
import {createStore, combineReducers} from 'redux'
import token from './reducers/token.reducer';
import navigation from './reducers/navigation.reducer'

// CombineReducers token & navigation
const store = createStore(combineReducers({token, navigation}))

function App() {

   return (
      <Provider store={store}>
         
            <Router>
               <Switch>
                  <Route component={Home} path="/" exact />  
                  <Route component={Home} path="/home/:category" />
                  <Route component={SalePage} path="/sale/:brand" />
               </Switch>
            </Router>
       
      </Provider>
   );
}

export default App;
