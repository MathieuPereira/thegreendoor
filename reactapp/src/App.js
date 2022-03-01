import './App.css';
import Home from './components/homepage'
import Footer from './modals_parcels/footer';
// import brandModal from './modals_parcels/brandModal'
import { Menu, Dropdown, Tooltip, Affix, Image, Button } from 'antd';
import {Link} from 'react-router-dom'
import brandModal from './modals_parcels/brandModal';
import SalePage from "./components/salePage";

// REDUX
import {Provider} from 'react-redux'
import {createStore, combineReducers} from 'redux'
import token from './reducers/token.reducer'
const store = createStore(combineReducers({token}))

function App() {

   return (
      <Provider store={store}>
         <div style={{backgroundColor: "#FCF5EE", height: '100%', fontFamily: 'Montserrat'}}>

        <SalePage />
        <Footer />

         </div>
      </Provider>
   );
}

export default App;
