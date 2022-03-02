import React, {useState} from 'react';
import {Menu, Badge, Carousel} from 'antd';
import {Link, Redirect} from "react-router-dom";

import {connect} from 'react-redux';

export default function Header(props) {

   var backGround1 = 'https://res.cloudinary.com/dknmaiec0/image/upload/c_fill,g_auto,h_1150,w_10000/v1645811634/thegreendoor/background/moutain-night_wymtkz.jpg';
   var backGround2 = 'https://res.cloudinary.com/dknmaiec0/image/upload/c_fill,g_auto,h_1500,w_10000/v1645712418/thegreendoor/background/home_hj8f3r.jpg'
   var surf = 'https://res.cloudinary.com/dknmaiec0/image/upload/c_fill,g_auto,h_2500,w_9000/v1646217637/thegreendoor/background/pexels-pixabay-416726_a7pgae.jpg'

   const [basketCount, setBasketCount] = useState(0);

   const onLogoClick = () => {
      props.addCategory("");
      return <Redirect to="/home" />
   };

   // Carousel
   function onChange(a, b, c) {
      console.log(a, b, c);
    }

    const settings = {
      dots:true,
      infinite:true,
      speed:1800,
      slidesToShow:1,
      autoplay:true,
      autoplaySpeed : 8000
    };


   return (

      <div style={{backgroundColor: "#FCF5EE", fontFamily: 'Montserrat'}}>

         <div span={{xs: 24}} style={{
            display: 'flex',
            flexDirection: 'row',
            padding: 5,
            marginLeft: 50,
            alignItems: 'center',
            justifyContent: 'space-between',
         }}>

            <Link to="/"><img src="/assets/logo.png" alt="Logo" onClick={onLogoClick} style={{height: 50}}/></Link>

            <div style={{
               display: 'flex',
               flexDirection: 'row',
               marginRight: 30,
               alignContent: 'center',
               alignItems: "center",
               fontSize: 15,
            }}>
               <p style={{marginBottom: 0, marginRight: 70}}>Qui sommes-nous ?</p>
               <p style={{marginLeft: 20, marginRight: 70, marginBottom: 0}}>Se connecter</p>
               <div style={{marginLeft: 50, marginRight: 30}}>
                  <Badge style={{backgroundColor: '#207872'}} count={basketCount} showZero>
                     <img src="/assets/backpack.png" alt="Basket" style={{height: 25, marginBottom: 0}}/>
                  </Badge>
               </div>
            </div>

         </div>

         <Carousel {...settings} style={{marginTop: 0, position: 'relative'}}>

            <div>
               <img src={backGround1} alt="Outdoor background" style={{height: 230, width: '100%'}}/>
            </div>
            <div>
               <img src={backGround2} alt="Outdoor background" style={{height: 230, width: '100%'}}/>
            </div>
            <div>
               <img src={surf} alt="Outdoor background" style={{height: 230, width: '100%'}}/>
            </div>

         </Carousel>

         <p style={{position: 'absolute', top: 60, left: 170, fontWeight: "bold", fontSize: 20}}>
            Ventes <span style={{color: '#207872'}}>Outdoor</span> éco-responsables</p>

         <Menu span={{xs: 24}} style={{
            backgroundColor: "#FCF5EE",
            margin: 'auto',
            fontWeight: "bold",
            justifyContent: 'center',
            width: '70%',
            borderColor: 'black',
            fontSize: 16,
            padding: 5,
         }} mode="horizontal">

            <Menu.Item style={{width: 130, textAlign: 'center'}} className="ant-menu-item" >
               <Link to="/home/Mer">Mer</Link>
            </Menu.Item>

            <Menu.Item style={{width: 130, textAlign: 'center'}} className="ant-menu-item" >
               <Link to="/home/Montagne">Montagne</Link>
            </Menu.Item>

            <Menu.Item style={{width: 130, textAlign: 'center'}} className="ant-menu-item" >
               <Link to="/home/Nature">Nature</Link>
            </Menu.Item>

         </Menu>

      </div>

   );
}

