import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './components/homepage';
import SalePage from "./components/salePage";
import ProductPage from "./components/productPage";

// REDUX
import {Provider} from 'react-redux';
import {createStore, combineReducers} from 'redux';
import token from './reducers/token.reducer';
import navigation from './reducers/navigation.reducer';
import basket from './reducers/basket.reducer';

// CombineReducers token & navigation
const store = createStore(combineReducers({token, navigation, basket}));

function App() {

   return (
      <Provider store={store}>

         <Router>
            <Switch>
               <Route component={Home} path="/" exact/>
               <Route component={Home} path="/home/:category"/>
               <Route component={SalePage} path="/sale/:brand" exact/>
               <Route component={ProductPage} path="/product/"/>
            </Switch>
         </Router>

      </Provider>
   );
}

export default App;
