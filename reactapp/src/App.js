import './App.css';
import Header from './modals_parcels/header';
import Label from './modals_parcels/labelBar';
import Home from './components/homepage';
import {Menu, Dropdown, Tooltip, Affix, Image, Button} from 'antd';
import {Link} from 'react-router-dom';
import SignModal from './modals_parcels/signModal';

// REDUX
import {Provider} from 'react-redux'
import {createStore, combineReducers} from 'redux'

// Generate store
import token from './reducers/token.reducer'
const store = createStore(combineReducers({token}))

function App() {

   return (
      <Provider store={store}>
         <div style={{backgroundColor: "#FCF5EE", height: '100vh', fontFamily: 'Montserrat'}}>

            <SignModal/>

         </div>
      </Provider>
   );
}

export default App;
