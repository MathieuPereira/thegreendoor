import React, { useState } from 'react';
import { Menu, Badge } from 'antd';
import {Link} from "react-router-dom";

import {connect} from 'react-redux'

export default function Header(props) {

    var backGround = 'https://res.cloudinary.com/dknmaiec0/image/upload/c_fill,g_auto,h_1150,w_10000/v1645811634/thegreendoor/background/moutain-night_wymtkz.jpg'

    const [basketCount, setBasketCount] = useState(0)

    // Gestion des clics Catégories et Logos, qui font transiter l'info en Reverse Data Flow au composant Home
    const onSeaClick = () => {
        console.log('Clic sur catégorie Mer détecté')
        props.changeParentFilter('Mer')
    };

    const onMountainClick = () => {
        console.log('Clic sur catégorie Montagne détecté')
        props.changeParentFilter('Montagne')
    };
    
    const onNatureClick = () => {
        console.log('Clic sur catégorie Nature détecté')
        props.changeParentFilter('Nature')
    };

    const onLogoClick = () => {
        console.log('Clic sur le logo détecté')
        props.changeParentFilter('non-categorized')
    };

  return (

    <div style={{backgroundColor:"#FCF5EE", fontFamily : 'Montserrat'}}>
        
        <div span={{xs: 24}} style={{display : 'flex', flexDirection : 'row', padding : 5, marginLeft : 50, alignItems : 'center', justifyContent : 'space-between'}}>

            <Link to="/"><img src="./assets/logo.png" alt="Logo" onClick={onLogoClick} style={{height: 50}}/></Link>

            <div style={{display : 'flex', flexDirection : 'row', marginRight : 30, alignContent : 'center', alignItems : "center", fontSize : 15}}>
                <p style={{marginBottom : 0, marginRight : 70}}>Qui sommes-nous ?</p>
                <p style={{marginLeft : 50, marginRight : 20, marginBottom : 0}}>S'inscrire</p>
                <p style={{marginLeft : 20, marginRight : 70, marginBottom : 0}}>Se connecter</p>
                <div style={{marginLeft : 50, marginRight : 30}} >
                    <Badge style={{backgroundColor : '#207872' }}count={basketCount} showZero>
                    <img src="./assets/backpack.png" alt="Basket" style={{height: 25, marginBottom : 0}}/>
                    </Badge>
                </div>
            </div>

        </div>

        <div span={{xs: 24}} style={{marginTop : 0, position : 'relative'}}>
            <img src={backGround} alt="Outdoor background" style={{height: 200, width : '100%'}}/>
            <p style={{ position: 'absolute', top: 10, left : 170, fontWeight: "bold", fontSize : 20}}>Ventes <span style={{color : '#207872'}}>Outdoor</span> éco-responsables</p>
        </div>

        <Menu span={{xs: 24}} style={{backgroundColor:"#FCF5EE", margin : 'auto', fontWeight: "bold", justifyContent: 'center', width : '70%', borderColor : 'black', fontSize : 16, padding : 5}} mode="horizontal">

            <Menu.Item style={{width : 130, textAlign : 'center'}} className="ant-menu-item" onClick={onSeaClick} >
                Mer
            </Menu.Item>

            <Menu.Item style={{width : 130, textAlign : 'center'}} className="ant-menu-item" onClick={onMountainClick}>
                Montagne
            </Menu.Item>

            <Menu.Item style={{width : 130, textAlign : 'center'}} className="ant-menu-item" onClick={onNatureClick}>
                Nature
            </Menu.Item>
            
        </Menu>  

    </div>

  );
}

// function mapDispatchToProps(dispatch) {
//     return {
//        addFilter: function (filter) {
//           dispatch({type: 'add-filter', filter : filter});
//        },
//     };
//  }
 
//  export default connect(
//     null,
//     mapDispatchToProps,
//  )(Header);
