import React, {useEffect, useState} from 'react';
import {Link, Redirect} from "react-router-dom";
import {connect} from 'react-redux';

// Import de NOS composants
import SignModal from '../modals_parcels/signModal';

// Imports antd & CSS
import {Menu, Badge, Carousel, Popover, Divider} from 'antd';
import '../stylesheets/header.css';

function Header(props) {

    const [basketCount, setBasketCount] = useState(0);
    const [isModalSignVisible, setIsModalSignVisible] = useState("hidden");
    const [isLogged, setIsLogged] = useState(false);

    // Affichage du panier en fonction de la connexion (via Token)
    useEffect(() => {
        props.refreshBasket();
        props.refreshToken();
        props.refreshDelivery();
    }, []);

    var disconnect = () => {
        props.removeToken();
        props.removeBasket();
        localStorage.removeItem('basket');
        localStorage.removeItem('deliveryService')
        setIsLogged(false);
    };

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
                <p><Link style={menuHeader} to="/basket">Voir mon panier 🛒 </Link></p>
            </div>
        </>
    );

   // Carousel
   var imgMontagne = 'https://res.cloudinary.com/dknmaiec0/image/upload/c_fill,g_auto,h_1150,w_10000/v1645811634/thegreendoor/background/moutain-night_wymtkz.jpg';
   var imgNature = 'https://res.cloudinary.com/dknmaiec0/image/upload/c_fill,g_auto,h_1500,w_10000/v1645712418/thegreendoor/background/home_hj8f3r.jpg';
   var imgMer = 'https://res.cloudinary.com/dknmaiec0/image/upload/c_fill,g_auto,h_500,w_1700/v1646652566/thegreendoor/background/surf_ieqxyt.jpg'

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
            <p><Link className='menuHeader' to="/my-orders">Mes commandes passées 📦 </Link></p>
            <Divider style={divider}/>
            <p><Link className='menuHeader' to="/">Mes informations personnelles 📬 </Link></p>
            <Divider style={divider}/>
            <p className='menuHeader' onClick={() => disconnect()}><Link to="/">Déconnexion 👋</Link></p>
        </div>
      </>
   );

    // Redirection au clic sur Logo
    const onLogoClick = () => {
        props.addCategory("");
        return <Redirect to="/home"/>;
    };

    // Gestion de l'affichage du Header en fonction de la connexion ou non de l'utilisateur
    if (localStorage.getItem('token') == null) {

        return (

            <div span={{xs: 24}} style={{backgroundColor: "#FCF5EE", fontFamily: 'Montserrat'}}>

               <div style={header}>

                  <Link to="/"><img className="logo" src="/assets/logo.png" alt="Logo" onClick={onLogoClick}/></Link>

                  <div style={textHeader}>

                     <p className="headerText" >Qui sommes-nous ?</p>
                     <p className="headerText" onClick={() => handleModalChangeVisibility("visible")} >Se connecter</p>

                     <div style={{marginLeft: 50, marginRight: 30}}>
                        <Badge style={{backgroundColor: '#207872'}} count={basketCount} showZero>
                           <img src="/assets/backpack.png" alt="Basket" className="backpack"/>
                        </Badge>
                     </div>
                  </div>

               </div>

               <Carousel {...settings} className='carousel'>

                  <div>
                     <img src={imgMontagne} alt="Outdoor background" className="imgCarousel"/>
                  </div>
                  <div>
                     <img src={imgNature} alt="Outdoor background" className="imgCarousel" />
                  </div>
                  <div>
                     <img src={imgMer} alt="Outdoor background" className="imgCarousel" />
                  </div>

               </Carousel>

               <p className="baseline" >
                  Ventes <span style={{color: '#207872'}}>Outdoor</span> éco-responsables
               </p>

               <Menu span={{xs: 24}} className="menuNavBar" mode="horizontal">

                  <Menu.Item className="catMenu">
                     <Link to="/home/Mer">Mer</Link>
                  </Menu.Item>

                  <Menu.Item className="catMenu">
                     <Link to="/home/Montagne">Montagne</Link>
                  </Menu.Item>

                  <Menu.Item className="catMenu">
                     <Link to="/home/Nature">Nature</Link>
                  </Menu.Item>

               </Menu>

               <SignModal state={isModalSignVisible} changeParentState={handleModalChangeVisibility}/>
            </div>

         );

      } else {

         return (

            <div span={{xs: 24}} style={{backgroundColor: "#FCF5EE", fontFamily: 'Montserrat'}}>

               <div style={header}>

                  <Link to="/"><img className="logo" src="/assets/logo.png" alt="Logo" onClick={onLogoClick} /></Link>

                  <div style={textHeader}>

                     <p className="headerText">Qui sommes-nous ?</p>

                     <Popover placement="bottom" content={content} trigger="click">
                        <p className="headerText">
                           Mon compte
                        </p>
                     </Popover>

                     <Popover placement="bottom" content={contentBasket} trigger="click">
                        <div style={{marginLeft: 50, marginRight: 30, cursor: 'pointer'}}>
                           <Badge style={{backgroundColor: '#207872'}} count={props.basket.length} showZero>
                              <img src="/assets/backpack.png" alt="Basket" className="backpack"/>
                           </Badge>
                        </div>
                     </Popover>
                  </div>

               </div>

               <Carousel {...settings} className='carousel'>

                  <div>
                     <img src={imgMontagne} alt="Outdoor background" className="imgCarousel"/>
                  </div>
                  <div>
                     <img src={imgNature} alt="Outdoor background" className="imgCarousel"/>
                  </div>
                  <div>
                     <img src={imgMer} alt="Outdoor background" className="imgCarousel"/>
                  </div>

               </Carousel>

               <p className="baseline">
                  Ventes <span style={{color: '#207872'}}>Outdoor</span> éco-responsables</p>

               <Menu span={{xs: 24}} className="menuNavBar" mode="horizontal">

                  <Menu.Item  className="catMenu">
                     <Link to="/home/Mer">Mer</Link>
                  </Menu.Item>

                  <Menu.Item className="catMenu">
                     <Link to="/home/Montagne">Montagne</Link>
                  </Menu.Item>

                  <Menu.Item className="catMenu">
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

function mapDispatchToProps(dispatch) {
    return {
        refreshBasket: function () {
            dispatch({
                type: 'refreshBasket',
            });
        },
        refreshToken: function () {
            dispatch({
                type: 'refreshToken',
            });
        },
        removeToken: function () {
            dispatch({
                type: 'removeToken',
            });
        },
        removeBasket: function () {
            dispatch({
                type: 'removeBasket',
            });
        }, refreshDelivery: function () {
            dispatch({
                type: 'refreshDelivery'
            })
        }
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
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

const divider = {
   marginLeft: 2,
   marginTop: 3,
   marginBottom: 15,
   width: '50%',
   alignSelf: "start",
   border: "0.5px #AEA9A9 solid"
}