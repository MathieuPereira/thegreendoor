import React, {useEffect, useState} from 'react';
import {Link, Redirect, useParams} from "react-router-dom";

// Import de NOS composants
import Header from '../modals_parcels/header';
import Label from '../modals_parcels/labelBar';
import Footer from '../modals_parcels/footer';

// Import antd
import {Breadcrumb, Select} from "antd";
import {connect} from "react-redux";

const {Option} = Select;

function SalePage(props) {
   var { brand } = useParams();
   const [isLogged, setIsLogged] = useState(false);
   const [brandInfos, setBrandInfos] = useState({});
   const [productsList, setProductsList] = useState([]);
   console.log(brand);

   useEffect(() => {
      async function loadData() {
         var rawResponse = await fetch(`/show-sale?brandName=${brand}`);
         var response = await rawResponse.json();
         setProductsList(response.products);
         setBrandInfos(response.sale);
      }
      loadData();
   }, []);

   var breadCrumb;
   if (props.navigation.category != null) {
      breadCrumb =
         <Breadcrumb separator=">" style={{fontSize: "16px", fontWeight: "500", width: "100%", marginBottom: 10}}>
            <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
            <Breadcrumb.Item><Link
               to={`/home/${props.navigation.category}`}>{props.navigation.category}</Link></Breadcrumb.Item>
            <Breadcrumb.Item>{brand}</Breadcrumb.Item>
         </Breadcrumb>;
   } else {
      breadCrumb =
         <Breadcrumb separator=">" style={{fontSize: "16px", fontWeight: "500", width: "100%", marginBottom: 10}}>
            <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
            <Breadcrumb.Item>{brand}</Breadcrumb.Item>
         </Breadcrumb>;
   }

   // Function for the <Select/>
   function handleChange(value) {
   }

   console.log(productsList);

   var productsCards = productsList.map((product, i) => {

      var reduction = 'faire calcul';

      return (
         <div key={i} style={{
            backgroundColor: "#FFFFFF",
            padding: 8,
            height: 450,
            width: 340,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            margin: 15,
         }}>
            <div
               style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "95%",
                  margin: "auto",
                  marginBottom: 10,
               }}>
               <h5 style={{fontWeight: 450, fontSize: 18, marginBottom: 0}}>{product.name}</h5>
               <button style={{
                  width: 80,
                  borderRadius: 8,
                  backgroundColor: '#000000',
                  color: '#FFFFFF',
                  padding: "5px 15px 5px 15px",
                  border: "transparent",
               }}> -{reduction}%
               </button>
            </div>
            <span style={{width: 280, height: 0, alignSelf: "center", border: "1px #AEA9A9 solid"}}/>
            <p style={{fontSize: 16, fontWeight: 520, marginTop: 15}}><span
               style={{color: "#207872"}}>{product.normalPrice},00 €</span> au
               lieu
               de <span style={{textDecoration: "line-through"}}>{product.reducedPrice},00 €</span></p>
            <img style={{width: 250, height: 250}} src={`/assets/Produits/picture_1.jpeg`} alt=""/>
            <div style={{
               display: "flex",
               justifyContent: "space-between",
               alignItems: "center",
               width: "95%",
               margin: "auto",
               marginTop: 20,
            }}>
               <p style={{fontSize: 15, fontWeight: 500, cursor: "pointer", marginBottom: 0}}>Voir le
                  produit</p>
               <button className="buttonHover" style={{
                  background: "#207872",
                  color: '#FFFFFF',
                  width: 110,
                  borderRadius: 32,
                  fontSize: 12,
                  padding: "5px 10px 5px 10px",
                  border: "solid #C4C4C4 2px",
                  cursor: "pointer",
               }}>Achat Express
               </button>
            </div>
         </div>

      );
   });
/*
   var labelList = [];
   for (var i = 0; i < brandInfos.brandLabels.length; i++){
      labelList.push(<img src={`/assets/icones/${brandInfos.brandLabels[i]}.png`} style={{height: 30, marginBottom : 5, border: '2px solid white', borderRadius : 15, backgroundColor : 'white'}}/>)
   }
*/
   console.log(isLogged);
   // if (isLogged) {
   //   return <Redirect to="/"/>;
   // } else {
   return (

      <div style={{backgroundColor: "#FCF5EE", fontFamily: 'Montserrat'}}>
         <Header/>
         <Label/>
         <div style={{width: '70%', margin: 'auto', marginTop: 10}}>

            {breadCrumb}
            <div style={{display: 'flex', justifyContent: 'flex-start', flexDirection: "row", flexWrap: 'nowrap'}}>
               <div style={{width: '250px', height: "100%"}}>
                  <div style={{width: 250, height: 250, position: 'relative'}}>
                     <img style={{width: "250px", height: "250px", marginBottom: 10}} src={`/assets/${brandInfos.brandImg}.jpeg`}
                          alt="picture"/>
                     <div style={{position: 'absolute'}}>

                     </div>
                  </div>

                  <div style={{
                     display: "flex",
                     flexDirection: "row",
                     border: "3px #207872 solid",
                     borderRadius: 20,
                     alignItems: "center",
                     justifyContent: "space-evenly",
                     width: "70%",
                     margin: "auto",
                     backgroundColor: '#FFFFFF',
                  }}>
                     <img src="/assets/icones/green_delivery.png"
                          style={{
                             height: 35,
                             border: '2px solid white',
                             borderRadius: 15,
                             backgroundColor: '#FFFFFF',
                          }}/>
                     <img src="/assets/icones/ong.png"
                          style={{
                             height: 35,
                             border: '2px solid white',
                             borderRadius: 15,
                             backgroundColor: '#FFFFFF',
                          }}/>
                  </div>
                  <div style={{backgroundColor: '#FFFFFF', width: "100%", marginTop: 10}}>
                     <p style={{
                        marginLeft: "5%",
                        paddingTop: 15,
                        marginBottom: 0,
                        fontWeight: 550,
                        fontSize: 18,
                     }}>Trier
                        par</p>
                     <Select defaultValue="popularite"
                             style={{width: "90%", marginLeft: "5%", textTransform: "uppercase", marginTop: 10}}
                             onChange={handleChange}>
                        <Option value="popularite">Popularité</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="Yiminghe">yiminghe</Option>
                     </Select>
                     <p style={{
                        marginLeft: "5%",
                        paddingTop: 15,
                        marginBottom: 0,
                        fontWeight: 500,
                        fontSize: 16,
                     }}>Affiner votre recherche</p>
                     <Select defaultValue="Type de produits"
                             style={{width: "90%", marginLeft: "5%", textTransform: "uppercase", marginTop: 10}}
                             onChange={handleChange}>
                        <Option value="popularite">POPULARITE</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="Yiminghe">yiminghe</Option>
                     </Select>
                     <Select defaultValue="Genre"
                             style={{width: "90%", marginLeft: "5%", textTransform: "uppercase", marginTop: 10}}
                             onChange={handleChange}>
                        <Option value="men">Homme</Option>
                        <Option value="women">Femme</Option>
                     </Select>
                     <Select defaultValue="Taille" style={{
                        width: "90%",
                        marginLeft: "5%",
                        textTransform: "uppercase",
                        paddingBottom: 15,
                        marginTop: 10,
                     }} onChange={handleChange}>
                        <Option value="xs">XS</Option>
                        <Option value="s">S</Option>
                        <Option value="m">M</Option>
                        <Option value="l">L</Option>
                        <Option value="xl">XL</Option>
                        <Option value="xxl">XXL</Option>
                     </Select>
                  </div>
               </div>
               <div style={{marginLeft: 25}}>
                  <p style={{fontSize: 16, color: '#207872'}}>⏰ Fin le dd month yyyy</p>
                  <div style={{display: "flex", justifyContent: 'space-around', flexDirection:'row', flexWrap:'wrap'}}>
                     {productsCards}
                  </div>
               </div>
            </div>
         </div>
         <Footer/>
      </div>
   );
   // }
}

function mapStateToProps(state) {
   return {
      token: state.token,
      navigation: state.navigation,
   };
}

export default connect(
   mapStateToProps,
   null,
)(SalePage);
