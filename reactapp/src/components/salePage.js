import React, {useEffect, useState} from 'react';
import {Link, Redirect, useParams} from "react-router-dom";

// Import de NOS composants
import Header from '../modals_parcels/header';
import Label from '../modals_parcels/labelBar';
import Footer from '../modals_parcels/footer';

// Import antd & style
import {Breadcrumb, Select} from "antd";
import {connect} from "react-redux";
import '../stylesheets/salePage.css';

const {Option} = Select;

function SalePage(props) {
   var {brand} = useParams();
   const [saleLabels, setSaleLabels] = useState([]);
   const [saleImg, setSaleImg] = useState('');
   const [saleEnding, setSaleEnding] = useState(new Date);
   const [productsList, setProductsList] = useState([]);

   useEffect(() => {
      async function loadData() {
         var rawResponse = await fetch(`/show-sale?brandName=${brand}`);
         var response = await rawResponse.json();
         setProductsList(response.products);
         setSaleLabels(response.saleLabels);
         setSaleImg(response.saleImg);
         setSaleEnding(new Date(response.saleEnding));
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

   var productsCards = productsList.map((product, i) => {

      var reduction = (product.reducedPrice - product.normalPrice) / product.reducedPrice * 100;

      return (
         <div key={i} className="productCard" style={{
            backgroundColor: "#FFFFFF",
            padding: 8,
            height: 450,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: 5,
            marginRight: 5,
            marginTop: 10,
            marginBottom: 10,
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
               }}> {reduction}%
               </button>
            </div>
            <span style={{width: '95%', height: 0, alignSelf: "center", border: "1px #AEA9A9 solid"}}/>
            <p style={{fontSize: 16, fontWeight: 520, marginTop: 15}}><span
               style={{color: "#207872"}}>{product.reducedPrice},00 €</span> au
               lieu
               de <span style={{textDecoration: "line-through"}}>{product.normalPrice},00 €</span></p>
            <img style={{width: 230, height: 250}} src={`/assets/Produits/${product.img}.jpeg`} alt=""/>
            <div style={{
               display: "flex",
               justifyContent: "space-between",
               alignItems: "center",
               width: "95%",
               margin: "auto",
               marginTop: 20,
            }}>
               <Link to={`/sale/${props.navigation.brand}/${product.name}`}><p
                  style={{fontSize: 15, fontWeight: 500, cursor: "pointer", marginBottom: 0}}>Voir le
                  produit</p></Link>
               <button className="buttonHover"
                       onClick={props.addArticle(product.name, product.img, product.normalPrice, product.reducedPrice)}
                       style={{
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

   if (productsCards.length === 0) {
      productsCards = <p style={{color: "#000000"}}>Désolé, aucun article disponible sur cette vente</p>;
   }

   var labelList = [];
   for (var i = 0; i < saleLabels.length; i++) {
      labelList.push(<img src={`/assets/icones/${saleLabels[i]}.png`} style={{
         height: 30,
         marginBottom: 5,
         border: '2px solid white',
         borderRadius: 15,
         backgroundColor: 'white',
      }}/>);
   }

   if (props.token == null) {
      return <Redirect to="/"/>;
   } else {
      return (

         <div style={{backgroundColor: "#FCF5EE", fontFamily: 'Montserrat'}}>
            <Header/>
            <Label/>
            <div style={{margin: 'auto', marginTop: 10}} className="showProduct">
               {breadCrumb}
               <div className="displayProducts">
                  <div style={{height: "100%"}} className="rightInfosProductPage">
                     <div style={{width: "100%", height: 250, position: 'relative'}}>
                        <img style={{width: "100%", height: "250px", marginBottom: 10}} src={`/assets/${saleImg}.jpeg`}
                             alt="picture"/>
                        <div style={{position: 'absolute', top: 4, right: 4, display: "flex", flexDirection: "column"}}>
                           {labelList}
                        </div>
                     </div>

                     <div className="displayFilterProducts">
                        <div style={{
                           display: "flex",
                           justifyContent: 'center',
                           flexDirection: "column",
                           alignItems: "center",
                        }}>
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
                        </div>
                        <div style={{
                           display: "flex",
                           justifyContent: 'center',
                           flexDirection: "column",
                           alignItems: "center",
                        }}>

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
                  </div>
                  <div style={{marginLeft: 25}}>
                     <p style={{fontSize: 16, color: '#207872', marginBottom: 0}}>⏰ Fin
                        le {saleEnding.toLocaleDateString('fr-FR')}</p>
                     <div
                        style={{
                           display: "flex",
                           justifyContent: 'space-around',
                           flexDirection: 'row',
                           flexWrap: 'wrap',
                        }}>
                        {productsCards}
                     </div>
                  </div>
               </div>
            </div>
            <Footer/>
         </div>
      );
   }
}

function mapStateToProps(state) {
   return {
      token: state.token,
      navigation: state.navigation,
   };
}

function mapDispatchToProps(dispatch) {
   return {
      addArticle: function (name, img, normalPrice, reducedPrice) {
         dispatch({
            type: 'addArticle',
            name: name,
            img: img,
            size: 'M',
            normalPrice: normalPrice,
            reducedPrice: reducedPrice,
         });
      },
   };
}

export default connect(
   mapStateToProps,
   mapDispatchToProps,
)(SalePage);
