import React, { useState } from 'react';
import { Menu, Badge, Affix, Card, Col, Row } from 'antd';

// Menu = au passage de souris sur Mon Compte, sous-catégories qui apparaissent
// Affix = permet de maintenir la labelBar à un endroit précis malgré le scroll

export default function Header() {

    const [basketCount, setBasketCount] = useState(0)
    var backGround = 'https://res.cloudinary.com/dknmaiec0/image/upload/c_fill,g_auto,h_1500,w_10000/v1645712418/thegreendoor/background/home_hj8f3r.jpg'
    var backGround2 = 'https://res.cloudinary.com/dknmaiec0/image/upload/c_fill,g_auto,h_150,w_1100/v1645712421/thegreendoor/background/hiking_bpqavn.jpg'
    var backGround3 = 'https://res.cloudinary.com/dknmaiec0/image/upload/c_fill,g_auto,h_1150,w_10000/v1645811634/thegreendoor/background/moutain-night_wymtkz.jpg'
  return (

    <div>
        
        <div style={{display : 'flex', flexDirection : 'row', padding : 5, marginLeft : 50, alignItems : 'center', justifyContent : 'space-between'}}>

            <img src="./assets/logo.png" alt="Logo" style={{height: 50}}/>

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

        
    
        <div style={{marginTop : 0, position : 'relative'}}>
            <img src={backGround3} alt="Outdoor background" style={{height: 200, width : '100%'}}/>
            <p style={{ position: 'absolute', top: 5, left : 170, fontWeight: "bold", fontSize : 20}}>Ventes <span style={{color : '#207872'}}>Outdoor</span> responsables</p>
        </div>


        <Menu style={{backgroundColor:"#FCF5EE", margin : 'auto', fontWeight: "bold", justifyContent: 'center', width : '70%', borderColor : 'black', fontSize : 15, padding : 5}} mode="horizontal">

            <Menu.Item >
                Mer
            </Menu.Item>

            <Menu.Item >
                Montagne
            </Menu.Item>

            <Menu.Item >
                Nature
            </Menu.Item>
            
        </Menu>  

    </div>

  );
}

{/* Sous-menu dès que l'utilisateur est connecté
<SubMenu  title="Mon compte">
        <Menu.Item key="setting:1">Mes commandes</Menu.Item>
        <Menu.Item key="setting:2">Mes informations personnelles</Menu.Item>
</SubMenu>  */}