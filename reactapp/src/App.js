import './App.css';
import Header from './modals_parcels/header'
import Label from './modals_parcels/labelBar'
import Home from './components/homepage'
import Footer from './components/footer';
// import brandModal from './modals_parcels/brandModal'
import { Menu, Dropdown, Tooltip, Affix, Image, Button } from 'antd';
import {Link} from 'react-router-dom'
import brandModal from './modals_parcels/brandModal';

function App() {

  return (
    <div style={{backgroundColor:"#FCF5EE", height : '100%', fontFamily : 'Montserrat'}}>

        <Header />
        <Label />
        <Home />
        <Footer />

    </div>
  );
}

export default App;
