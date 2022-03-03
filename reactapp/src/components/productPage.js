import React, {useEffect, useState} from 'react';
import {Link, Redirect, useParams} from "react-router-dom";

// Import de NOS composants
import Header from '../modals_parcels/header';
import Label from '../modals_parcels/labelBar';
import Footer from '../modals_parcels/footer';

import {Divider} from 'antd';

import {Breadcrumb, Select} from "antd";
import {connect} from "react-redux";

const {Option} = Select;

function ProductPage(props) {

    function handleChange(value) {
    }

   //  var labelList = [];
   //  for (var i = 0; i < saleLabels.length; i++) {
   //     labelList.push(<img src={`/assets/icones/${saleLabels[i]}.png`} style={{
   //        height: 30,
   //        marginBottom: 5,
   //        border: '2px solid white',
   //        borderRadius: 15,
   //        backgroundColor: 'white',
   //     }}/>);
   //  }
 
   // if (props.token == null) {
   //     return <Redirect to="/"/>;
   // } else {

   return (

      <div style={{backgroundColor: "#FCF5EE", fontFamily: 'Montserrat'}}>
         <Header/>
         <Label/>
         <div style={{width: '70%', margin: 'auto', marginTop: 10}}>

            <div style={{display: 'flex', justifyContent: 'flex-start', flexDirection: "row", flexWrap: 'nowrap'}}>
               <div style={{width: '250px', height: "100%"}}>

                   {/* Concerne l'image de la marque*/}
                  <div style={{width: 250, height: 250, position: 'relative', marginBottom : 10}}>
                     <img style={{width: "250px", height: "250px"}} src={`/assets/picture.jpeg`}
                          alt="picture"/>

                     <div style={{position: 'absolute', top: 10, right: 10, display: "flex", flexDirection: "column"}}>

                        <img src={`/assets/icones/french_flag.png`} style={{
                              height: 30,
                              marginBottom: 5,
                              border: '2px solid white',
                              borderRadius: 15,
                              backgroundColor: 'white',
                           }}/>

                        <img src={`/assets/icones/biosourced_materials.png`} style={{
                           height: 30,
                           marginBottom: 5,
                           border: '2px solid white',
                           borderRadius: 15,
                           backgroundColor: 'white',
                        }}/>

                        <img src={`/assets/icones/green_delivery.png`} style={{
                           height: 30,
                           marginBottom: 5,
                           border: '2px solid white',
                           borderRadius: 15,
                           backgroundColor: 'white',
                        }}/>

                     </div>

                  </div>

                    {/* Concerne la filterBar*/}
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
                        <Option value="prix">Prix</Option>
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
                        <Option value="Chaussures">Chaussures</Option>
                        <Option value="Vêtements">Vêtements</Option>
                        <Option value="Accessoires">Accessoires</Option>
                     </Select>
                     <Select defaultValue="Genre"
                             style={{width: "90%", marginLeft: "5%", textTransform: "uppercase", marginTop: 10}}
                             onChange={handleChange}>
                        <Option value="men">Homme</Option>
                        <Option value="women">Femme</Option>
                        <Option value="children">Enfant</Option>
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

               {/* Concerne la ProductCard dans son ensemble */}

               <div style={{width : '100%', marginLeft : 20, display: "flex", flexDirection: "column"}}>

                  <div style={{marginLeft : 20, display: "flex", flexDirection: "row"}}>
                     
                     {/* Colonne de gauche*/}
                     <div style={{
                              backgroundColor: "#FFFFFF",
                              padding: 8,
                              width: '50%',
                              margin: 0,
                     }}>

                           <div
                           style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              margin: "auto",
                              marginTop : 10,
                              marginLeft : 5
                           }}>

                              <h5 style={{fontWeight: 450, fontSize: 18, marginBottom: 0}}>NAIKOON JKT</h5>
                              <button style={{
                                 width: 80,
                                 borderRadius: 8,
                                 backgroundColor: '#000000',
                                 color: '#FFFFFF',
                                 padding: "5px 15px 5px 15px",
                                 border: "transparent",
                              }}> -20%
                              </button>

                           </div>

                           <Divider style={{margin : 5, marginTop : 10, alignSelf: "start", border: "0.5px #AEA9A9 solid"}}/>
                     
                           <img style={{width: 300, height: 435}} src={`/assets/Produits/picture_1.jpeg`} alt=""/>

                     </div>

                     {/* Concerne la colonne de droite de la productCard*/}

                     <div style={{
                              backgroundColor: "#FFFFFF",
                              padding: 8,
                              paddingTop : 0,
                              width: '50%',
                              display : 'flex',
                              flexDirection : 'column',
                              justifyContent: "space-around",
                     }}>

                           <p style={{display : 'flex', flexDirection : 'column', alignItems: 'end', fontWeight: 520, fontFamily : 'Montserrat', marginRight : 15}}><span style={{fontSize: 28, color: "#207872"}}>
                              176,00 €</span><span style={{fontSize: 15, textDecoration: "line-through"}}>220,00 €</span>
                           </p>

                           <div style={{height : 80, marginLeft : 10}}>

                              <Select defaultValue="Taille"
                                 style={{width: "40%", textTransform: "uppercase", marginTop: 20, marginBottom : 10}}
                                 onChange={handleChange}>
                                 <Option value="xs">XS</Option>
                                 <Option value="s">S</Option>
                                 <Option value="m">M</Option>
                                 <Option value="l">L</Option>
                                 <Option value="xl">XL</Option>
                                 <Option value="xxl">XXL</Option>
                              </Select>

                              <p style={{fontSize : 12, marginRight : 10, color : 'blue', textDecoration: 'underline'}}>Guide des tailles</p>
                           
                           </div>

                           <div style={{height : 200, marginLeft : 10}}>

                              <h2>Descriptif rapide</h2>

                              <p style={{fontSize : 12, marginRight : 10}}>La flexibilité haut de gamme. La Naikoon jacket inclut notre toute nouvelle technologie à base de fibres biosourcées, réalisées à partir de déchets de cannes à sucre qui sont ensuite convertis en polyester biosourcé. Cette veste intègre une shell extérieure confortable et stretch pour une liberté de mouvement absolue.</p>

                           </div>

                           <div>

                              <button className="buttonHover" style={{
                                 marginTop : 20,
                                 background: "#207872",
                                 color: '#FFFFFF',
                                 width: 180,
                                 borderRadius: 32,
                                 fontSize: 14,
                                 padding: "5px 10px 5px 10px",
                                 borderColor : '#FFFFFF',
                                 border: "solid #C4C4C4 2px",
                                 cursor: "pointer",
                                 marginLeft : 10
                              }}>
                                 Ajouter au panier
                              </button>

                           </div>

                     </div>
   
                  </div>

                  <div style={{marginLeft : 20, marginTop : 10, display: "flex", flexDirection: "column"}}>

                     <div style={{
                                 backgroundColor: "#FFFFFF",
                                 padding: 15,
                                 width: '100%',
                                 margin: 0,
                        }}>

                        <h2>Caractéristiques principales</h2>

                        <Divider style={{marginLeft : 2, marginTop : 3, marginBottom : 15, width: '50%', alignSelf: "start", border: "0.5px #AEA9A9 solid"}}/>

                        <p style={{fontSize : 12, marginRight : 10}}>La flexibilité haut de gamme. La Naikoon jacket inclut notre toute nouvelle technologie à base de fibres biosourcées, réalisées à partir de déchets de cannes à sucre qui sont ensuite convertis en polyester biosourcé. Cette veste intègre une shell extérieure confortable et stretch pour une liberté de mouvement absolue. Elle incorpore notre membrane DRYPLAY imper-respirante 20K/20K garantie sans PFOA/PFOS et qui assure une thermorégulation optimale tandis que sa doublure Coremax protège du froid les zones les plus sensibles. Pour ne laisser aucune chance à l'humidité, ses coutures sont entièrement cousues-collées et les zips YKK sont également étanches. Pour une protection additionnelle, la capuche, les manchettes et la jupe pare-neige sont ajustables.</p>
                     </div>
                  </div>

               </div>

            </div>
  
        </div>
        <Footer/>
      </div>
   );
   // }
}
// }

function mapStateToProps(state) {
   return {
      token: state.token,
      navigation: state.navigation,
   };
}

export default connect(
   mapStateToProps,
   null,
)(ProductPage);