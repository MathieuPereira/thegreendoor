import './App.css';
import Header from './modals_parcels/header'
import Label from './modals_parcels/labelBar'
import Home from './components/homepage'
import { Menu, Dropdown, Tooltip, Affix, Image, Button } from 'antd';
import {Link} from 'react-router-dom'

function App() {

  
  return (
    <div style={{backgroundColor:"#FCF5EE", height : '100vh', fontFamily : 'Montserrat'}}>

        <Header />
        <Label />

    </div>
  );
}

export default App;
