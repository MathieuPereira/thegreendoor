import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './components/homepage';
import SalePage from "./components/salePage";
import ProductPage from "./components/productPage";
import BasketPage from "./components/basketPage";
import ValidationPage from "./components/validationPage";

// REDUX
import {Provider} from 'react-redux';
import {createStore, combineReducers} from 'redux';
import token from './reducers/token.reducer';
import navigation from './reducers/navigation.reducer';
import basket from './reducers/basket.reducer';
import PastOrders from './components/pastOrders';
import deliveryService from './reducers/delivery.reducer';

// CombineReducers token & navigation
const store = createStore(combineReducers({token, navigation, basket, deliveryService}));

function App() {

   return (
      <Provider store={store}>
         
            <Router>
               <Switch>
                  <Route component={Home} path="/" exact />  
                  <Route component={Home} path="/home/:category" exact/>
                  <Route component={Home} path="/home/:category/:date" />
                  <Route component={SalePage} path="/sale/:brand" exact />
                  <Route component={ProductPage} path="/sale/:brand/:product"/>
                  <Route component={BasketPage} path="/basket"/>
                  <Route component={PastOrders} path="/my-orders"/>
                  <Route component={ValidationPage} path="/order-validated/:session"/>
               </Switch>
            </Router>
       
      </Provider>
   );
}

export default App;
