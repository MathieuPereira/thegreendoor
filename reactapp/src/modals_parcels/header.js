import React, {useState} from 'react';
import {Menu, Badge, Carousel, Popover, Divider} from 'antd';
import {Link, Redirect} from "react-router-dom";

import {connect} from 'react-redux';
import SignModal from '../modals_parcels/signModal';

function Header(props) {

   const [basketCount, setBasketCount] = useState(0);
   const [isModalSignVisible, setIsModalSignVisible] = useState("hidden");

   function onSignClick() {
      setIsModalSignVisible(true);
   } 

   var handleModalChangeVisibility = (currentState) => {
      setIsModalSignVisible(currentState);
   };

   // Pop-up "Panier"
   const contentBasket = (
      <>
         <div style={{height: 20}}>
            <p><Link style={menuHeader} to="/basket">Voir mon panier  🛒 </Link></p>
         </div>
      </>
   );

   // Carousel
   var imgMontagne = 'https://res.cloudinary.com/dknmaiec0/image/upload/c_fill,g_auto,h_1150,w_10000/v1645811634/thegreendoor/background/moutain-night_wymtkz.jpg';
   var imgNature = 'https://res.cloudinary.com/dknmaiec0/image/upload/c_fill,g_auto,h_1500,w_10000/v1645712418/thegreendoor/background/home_hj8f3r.jpg';
   var imgMer = 'https://res.cloudinary.com/dknmaiec0/image/upload/c_fill,g_auto,h_2500,w_9000/v1646217637/thegreendoor/background/pexels-pixabay-416726_a7pgae.jpg';

   function onChange(a, b, c) {
      console.log(a, b, c);
   }

   const settings = {
      dots: true,
      infinite: true,
      speed: 1800,
      slidesToShow: 1,
      autoplay: true,
      autoplaySpeed: 8000,
   };

   // Sous-menu "Mon compte"
   const content = (
      <>
         <div style={{height: 130}}>
            <p><Link style={menuHeader} to="/">Mes commandes passées 📦 </Link></p>
            <Divider style={divider}/>
            <p><Link style={menuHeader} to="/">Mes informations personnelles 📬 </Link></p>
            <Divider style={divider}/>
            <p><Link style={menuHeader} to="/">Déconnexion 👋 </Link></p>
         </div>
      </>
   );

   // Redirection au clic sur Logo
   const onLogoClick = () => {
      props.addCategory("");
      return <Redirect to="/home"/>;
   };

   // Gestion de l'affichage du Header en fonction de la connexion ou non de l'utilisateur
   if (props.token == null) {

      return (

         <div style={{backgroundColor: "#FCF5EE", fontFamily: 'Montserrat'}}>

            <div span={{xs: 24}} style={header}>

               <Link to="/"><img src="/assets/logo.png" alt="Logo" onClick={onLogoClick} style={{height: 50}}/></Link>

               <div style={textHeader}>

                  <p style={{marginBottom: 0, marginRight: 70, cursor : 'pointer'}}>Qui sommes-nous ?</p>
                  <p style={{marginLeft: 20, marginRight: 70, marginBottom: 0, cursor : 'pointer'}} onClick={() => handleModalChangeVisibility("visible")} >Se connecter</p>

                  <div style={{marginLeft: 50, marginRight: 30}}>
                     <Badge style={{backgroundColor: '#207872'}} count={basketCount} showZero>
                        <img src="/assets/backpack.png" alt="Basket" style={{height: 25, marginBottom: 0}}/>
                     </Badge>
                  </div>
               </div>

            </div>

            <Carousel {...settings} style={{marginTop: 0, position: 'relative'}}>

               <div>
                  <img src={imgMontagne} alt="Outdoor background" style={{height: 230, width: '100%'}}/>
               </div>
               <div>
                  <img src={imgNature} alt="Outdoor background" style={{height: 230, width: '100%'}}/>
               </div>
               <div>
                  <img src={imgMer} alt="Outdoor background" style={{height: 230, width: '100%'}}/>
               </div>

            </Carousel>

            <p style={{position: 'absolute', top: 60, left: 170, fontWeight: "bold", fontSize: 20}}>
               Ventes <span style={{color: '#207872'}}>Outdoor</span> éco-responsables</p>

            <Menu span={{xs: 24}} style={menuNavBar} mode="horizontal">

               <Menu.Item style={{width: 130, textAlign: 'center'}} className="ant-menu-item">
                  <Link to="/home/Mer">Mer</Link>
               </Menu.Item>

               <Menu.Item style={{width: 130, textAlign: 'center'}} className="ant-menu-item">
                  <Link to="/home/Montagne">Montagne</Link>
               </Menu.Item>

               <Menu.Item style={{width: 130, textAlign: 'center'}} className="ant-menu-item">
                  <Link to="/home/Nature">Nature</Link>
               </Menu.Item>

            </Menu>
            <SignModal state={isModalSignVisible} changeParentState={handleModalChangeVisibility}/>
         </div>

      );

   } else {

      return (

         <div style={{backgroundColor: "#FCF5EE", fontFamily: 'Montserrat'}}>

            <div span={{xs: 24}} style={header}>

               <Link to="/"><img src="/assets/logo.png" alt="Logo" onClick={onLogoClick} style={{height: 50}}/></Link>

               <div style={textHeader}>

                  <p style={{marginBottom: 0, marginRight: 70, cursor: 'pointer'}}>Qui sommes-nous ?</p>

                  <Popover placement="bottom" content={content} trigger="click">
                     <p style={{marginLeft: 20, marginRight: 70, marginBottom: 0, cursor: 'pointer'}}>Mon compte</p>
                  </Popover>

                  <Popover placement="bottom" content={contentBasket} trigger="click">
                  <div style={{marginLeft: 50, marginRight: 30, cursor: 'pointer'}}>
                     <Badge style={{backgroundColor: '#207872'}} count={props.basket.length} showZero>
                        <img src="/assets/backpack.png" alt="Basket" style={{height: 25, marginBottom: 0}}/>
                     </Badge>
                  </div>
                  </Popover>
               </div>

            </div>

            <Carousel {...settings} style={{marginTop: 0, position: 'relative'}}>

               <div>
                  <img src={imgMontagne} alt="Outdoor background" style={{height: 230, width: '100%'}}/>
               </div>
               <div>
                  <img src={imgNature} alt="Outdoor background" style={{height: 230, width: '100%'}}/>
               </div>
               <div>
                  <img src={imgMer} alt="Outdoor background" style={{height: 230, width: '100%'}}/>
               </div>

            </Carousel>

            <p style={{position: 'absolute', top: 60, left: 170, fontWeight: "bold", fontSize: 20}}>
               Ventes <span style={{color: '#207872'}}>Outdoor</span> éco-responsables</p>

            <Menu span={{xs: 24}} style={menuNavBar} mode="horizontal">

               <Menu.Item style={{width: 130, textAlign: 'center'}} className="ant-menu-item">
                  <Link to="/home/Mer">Mer</Link>
               </Menu.Item>

               <Menu.Item style={{width: 130, textAlign: 'center'}} className="ant-menu-item">
                  <Link to="/home/Montagne">Montagne</Link>
               </Menu.Item>

               <Menu.Item style={{width: 130, textAlign: 'center'}} className="ant-menu-item">
                  <Link to="/home/Nature">Nature</Link>
               </Menu.Item>

            </Menu>

         </div>

      );
   }
}

function mapStateToProps(state) {
   return {
      token: state.token,
      basket: state.basket,
   };
}

export default connect(
   mapStateToProps,
   null,
)(Header);

const header = {
   display: 'flex',
   flexDirection: 'row',
   padding: 5,
   marginLeft: 50,
   alignItems: 'center',
   justifyContent: 'space-between',
};

const textHeader = {
   display: 'flex',
   flexDirection: 'row',
   marginRight: 30,
   alignContent: 'center',
   alignItems: "center",
   fontSize: 15,
};

const menuHeader = {
   color: 'black',
   fontFamily: 'Montserrat',
   cursor: 'pointer',
};

const menuNavBar = {
   backgroundColor: "#FCF5EE",
   margin: 'auto',
   fontWeight: "bold",
   justifyContent: 'center',
   width: '70%',
   borderColor: 'black',
   fontSize: 16,
   padding: 5,
};

const divider = {
   marginLeft: 2,
   marginTop: 3,
   marginBottom: 15,
   width: '50%',
   alignSelf: "start",
   border: "0.5px #AEA9A9 solid"
}