import './App.css';
import Home from './components/homepage'
import Footer from './components/footer';
// import brandModal from './modals_parcels/brandModal'
import { Menu, Dropdown, Tooltip, Affix, Image, Button } from 'antd';
import {Link} from 'react-router-dom'
import brandModal from './modals_parcels/brandModal';

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

        <Home />
        <Footer />

         </div>
      </Provider>
   );
}

export default App;
