
import React from "react";

import { Divider } from 'antd';
  
export default function Footer() {

  return (

    <div style={{ 
      backgroundColor: '#26272b',
      padding: '45 0 20',
      fontSize: 15,
      marginTop : 100,
      color: '#737373', 
      padding : 10,
      display: 'flex'
    }}>
  

      <div style={{width : '50%', color : 'white', padding : 30, fontSize : 14, fontFamily : 'Montserrat'}}>

          <p style={{fontWeight : 'bold'}}>A PROPROS DE NOUS</p>

          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse a est at magna auctor congue vitae et diam. Fusce sagittis laoreet lacus sed hendrerit. Cras vel euismod tortor, quis rhoncus dui. In ut consequat orci. Nulla rutrum ac turpis quis volutpat. Donec auctor consequat tristique. Nulla hendrerit ex non purus malesuada auctor. Sed a ligula non nisi suscipit eleifend. Quisque tincidunt nunc at vulputate tincidunt. Curabitur tellus dolor, interdum id laoreet at, eleifend sit amet tellus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>

      <Divider type='vertical' style={divider}/>

      <div style={{width : '20%', color : 'white', padding : 30, fontSize : 14, fontFamily : 'Montserrat'}}>

          <p style={{fontWeight : 'bold'}}>NOUS CONTACTER</p>

          <p>Formulaire de contact</p>
          <p>Email</p>
          <p>Téléphone</p>
          <p>Nos réseaux sociaux</p>

      </div>

      <Divider type='vertical' style={divider}/>

      <div style={{width : '20%', color : 'white', padding : 30, fontSize : 14, fontFamily : 'Montserrat'}}>

        <p style={{fontWeight : 'bold'}}>LIENS RAPIDES</p>

        <p>Mer</p>
        <p>Montagne</p>
        <p>Nature</p>
        <p>Les ventes à venir</p>

      </div>

    </div>

  );
};

const divider = {
  marginLeft: 2,
  marginTop: 3,
  height : 200,
  marginBottom: 15,
  alignSelf: "center",
  border: "0.1px white solid"
}