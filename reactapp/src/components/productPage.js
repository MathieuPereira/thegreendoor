import React, {useEffect, useState} from 'react';
import {Link, Redirect, useParams} from "react-router-dom";

// Import de NOS composants
import Header from '../modals_parcels/header';
import Label from '../modals_parcels/labelBar';
import Footer from '../modals_parcels/footer';

import {Select, Breadcrumb, Divider, Modal, Button} from "antd";
import {ArrowLeftOutlined} from "@ant-design/icons";
import {connect} from "react-redux";

const {Option} = Select;

function ProductPage(props) {
    var {brand} = useParams();
    var {product} = useParams();

   // Gestion de la modal de mise au panier
   const [isModalVisible, setIsModalVisible] = useState(false);
   const [size, setSize] = useState('')

   function onButtonClick() {
       props.addArticle(productConsulted.name, brand, productConsulted.img, size, productConsulted.normalPrice, productConsulted.reducedPrice)
       setIsModalVisible(true);
    }

    const handleCancel = () => {
       setIsModalVisible(false);
    };



   const [productConsulted, setProductConsulted] = useState([]);
   const [saleLabels, setSaleLabels] = useState([]);
   const [saleImg, setSaleImg] = useState('');

   useEffect(() => {
       window.scrollTo(0, 290);
      async function loadData() {
         var rawResponse = await fetch(`/show-sale?brandName=${brand}&productName=${product}`);
         var response = await rawResponse.json();
         // console.log(response)
         setProductConsulted(response.products);
         setSaleLabels(response.saleLabels);
         setSaleImg(response.saleImg);
      }

      loadData();
   }, []);

   var reduction = (productConsulted.reducedPrice - productConsulted.normalPrice) / productConsulted.reducedPrice * 100;

    var labelList = [];
    for (var i = 0; i < saleLabels.length; i++) {
       labelList.push(<img src={`/assets/icones/${saleLabels[i]}.png`} style={label}/>);
    }
 
   function handleChange(value) {
   }

   var breadCrumb;
   if (props.navigation.category != null) {
      breadCrumb =
         <Breadcrumb span={24} separator=">" style={{fontSize: "16px", fontWeight: "500", width: "100%", marginBottom: 10}}>
            <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
            <Breadcrumb.Item>
               <Link to={`/home/${props.navigation.category}`}>{props.navigation.category}</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
               <Link to={`/sale/${brand}`}>{brand}</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{product}</Breadcrumb.Item>
         </Breadcrumb>;
   } else {
      breadCrumb =
         <Breadcrumb separator=">" style={{fontSize: "16px", fontWeight: "500", width: "100%", marginBottom: 10}}>
            <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
            <Breadcrumb.Item>
               <Link to={`/sale/${brand}`}>{brand}</Link></Breadcrumb.Item>
            <Breadcrumb.Item>{product}</Breadcrumb.Item>
         </Breadcrumb>;
   }
   
   if (props.token == null) {
       return <Redirect to="/"/>;
   } else {

   return (

      <div style={{backgroundColor: "#FCF5EE", fontFamily: 'Montserrat'}}>
         <Header/>
         <Label/>

         <div style={{width: '70%', margin: 'auto', marginTop: 10}}>
            {breadCrumb}
            <div style={{display: 'flex', justifyContent: 'flex-start', flexDirection: "row", flexWrap: 'nowrap'}}>
               
            <div style={{width: '250px', height: "100%"}}>

                   {/* Concerne l'image de la marque*/}
            <div style={{width: 250, height: 250, position: 'relative', marginBottom : 10}}>
                <img style={{width: "250px", height: "250px"}} src={`/assets/Resized/${saleImg}_sale.jpeg`} alt="picture"/>

                <div style={{position: 'absolute', top: 10, right: 10, display: "flex", flexDirection: "column"}}>

                    {labelList}

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
                }}>
                    Trier par
                </p>

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
                }}>
                    Affiner votre recherche
                </p>
                
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
                
                <Select defaultValue="Taille" style={filter} onChange={handleChange}>
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

                              <h5 style={{fontWeight: 450, fontSize: 18, marginBottom: 0}}>{productConsulted.name}</h5>
                              <button style={discountButton}> 
                                 {reduction}%
                              </button>

                           </div>

                           <Divider style={{margin : 5, marginTop : 10, alignSelf: "start", border: "0.5px #AEA9A9 solid"}}/>
                     
                           <img style={{width: 300, height: 435}} src={`/assets/Produits/${productConsulted.img}.jpeg`} alt=""/>

                     </div>

                     {/* Concerne la colonne de droite de la productCard*/}

                     <div style={rightColumn}>

                        <p style={{display : 'flex', flexDirection : 'column', alignItems: 'end', fontWeight: 520, fontFamily : 'Montserrat', marginRight : 15}}><span style={{fontSize: 28, color: "#207872"}}>
                           {productConsulted.reducedPrice},00 €</span><span style={{fontSize: 15, textDecoration: "line-through"}}> {productConsulted.normalPrice},00 €</span>
                        </p>

                        <div style={{height : 80, marginLeft : 10}}>

                           <Select defaultValue="Taille"
                                 style={{width: "40%", textTransform: "uppercase", marginTop: 20, marginBottom : 10}}
                                 onChange={(e) => setSize(e)}>
                                 <Option value="XS">XS</Option>
                                 <Option value="S">S</Option>
                                 <Option value="M">M</Option>
                                 <Option value="L">L</Option>
                                 <Option value="XL">XL</Option>
                                 <Option value="XXL">XXL</Option>
                           </Select>

                           <p style={{fontSize : 12, marginRight : 10, color : 'blue', textDecoration: 'underline'}}>Guide des tailles</p>
                           
                        </div>

                        <div style={{height : 200, marginLeft : 10}}>
                           <h2>Descriptif rapide</h2>
                           <p style={{fontSize : 12, marginRight : 10}}> {productConsulted.fastDesc}</p>
                        </div>

                           <div>
                              <button style={addButton} onClick={onButtonClick}>
                                 Ajouter au panier
                              </button>
                           </div>

                     </div>
   
                  </div>

                  <div style={{marginLeft : 20, marginTop : 10, display: "flex", flexDirection: "column"}}>

                     <div style={{backgroundColor: "#FFFFFF", padding: 15,width: '100%', margin: 0}}>

                        <h2>Caractéristiques principales</h2>

                        <Divider style={{marginLeft : 2, marginTop : 3, marginBottom : 15, width: '50%', alignSelf: "start", border: "0.5px #AEA9A9 solid"}}/>
                        
                        <p style={{fontSize : 12, marginRight : 10}}>{productConsulted.fastDesc}</p>

                        <div style={{display : 'flex', justifyContent : 'space-around', marginTop : 20}}>

                           <div style={{ display : 'flex', flexDirection : 'column', alignItems : 'center'}} > 
                              <img src='/assets/Icones/waterproof.png' alt="Imperméabilité" style={{width : 50, height : 50, marginBottom : 10}}/>
                              <p style={{fontWeight : 'bold', marginBottom : 5}}>Imperméabilité : </p>
                              <p>20.000 schmerber</p>
                           </div>

                          <div style={{display : 'flex', flexDirection : 'column', alignItems : 'center'}}>
                             <img src='/assets/Icones/wind.png' alt="Respirabilité" style={{width : 50, height : 50, marginBottom : 10}}/> 
                              <p style={{fontWeight : 'bold', marginBottom : 5}}>Respirabilité : </p>
                              <p>20.000 schmerber</p>
                           </div>

                           <div style={{display : 'flex', flexDirection : 'column', alignItems : 'center'}}>
                              <img src='/assets/Icones/temperature.png' alt="Indice de chaleur" style={{width : 50, height : 50, marginBottom : 10}}/>  
                              <p style={{fontWeight : 'bold', marginBottom : 5}}>Indice de chaleur : </p>
                              <p>5/10</p>
                           </div>
                           
 
                        </div>

                     </div>

                  </div>

               </div>

            </div>
  
        </div>
        <Footer/>

        <Modal 
                
                title="Votre article a bien été ajouté au panier 😎" 
    
                width={600}
                        
                centered 
                        
                visible={isModalVisible}
    
                onCancel={handleCancel}
                    
                footer={[
                    <div style={{display : 'flex', flexDirection : 'row', justifyContent : 'space-between'}}>
                        <Button key="Continue" ><Link to={`/sale/${brand}`}>Continuer mes achats</Link></Button>
    
                        <Button key="submit" style={{backgroundColor: '#207872', borderRadius: 40, border: 0}}
                                type="primary">
                            <Link to="/basket">Voir mon panier</Link>
                        </Button>
                    </div>
                ]}
                >
                <div style={{display : 'flex', alignItems : 'center'}}>
    
                    <div>
                        <img style={{width: 120, height: 150, marginRight : 20}} src={`/assets/Produits/${productConsulted.img}.jpeg`} alt=""/>
                    </div>
    
                    <div style={{display : 'flex', justifyContent : 'space-between', fontSize : 16, fontFamily : 'Montserrat', width : '100%'}}>
                    
                        <div style={{display : 'flex', flexDirection : 'column'}}>
                            <p>{productConsulted.name}</p>
                            <p>TAILLE : <span style={{color : '#207872', fontWeight: 'bold'}}>{size}</span></p>
                        </div>
    
                        <div style={{display : 'flex', flexDirection : 'column', textAlign : 'right'}}>
                            <p style={{marginBottom : 5}}>Prix : <span style={{color : '#207872', fontWeight: 'bold'}}>{productConsulted.reducedPrice},00 €</span></p>
                            <p style={{fontSize: 15, textDecoration: "line-through"}}> {productConsulted.normalPrice},00 €</p>
                        </div>
    
                    </div>
                    
                </div>
    
            </Modal>
      </div>
   );
}
}

function mapStateToProps(state) {
   return {
      token: state.token,
      navigation: state.navigation,
       basket: state.basket,
   };
}

function mapDispatchToProps(dispatch) {
    return {
        addArticle: function (name, brand, img, size, normalPrice, reducedPrice) {
            dispatch({
                type: 'addArticle',
                name: name,
                brand: brand,
                img: img,
                size: size,
                normalPrice: normalPrice,
                reducedPrice: reducedPrice,
            });
        },
    };
}

export default connect(
   mapStateToProps,
   mapDispatchToProps,
)(ProductPage);


const label = {
   height: 30,
   marginBottom: 5,
   border: '2px solid white',
   borderRadius: 15,
   backgroundColor: 'white',
}

const rightColumn = {
      backgroundColor: "#FFFFFF",
      padding: 8,
      paddingTop : 0,
      width: '50%',
      display : 'flex',
      flexDirection : 'column',
      justifyContent: "space-around"
}

const discountButton = {
   width: 80,
   borderRadius: 8,
   backgroundColor: '#000000',
   color: '#FFFFFF',
   padding: "5px 15px 5px 15px",
   border: "transparent"
}

const addButton = {
   marginTop : 20,
   background: "#207872",
   color: '#FFFFFF',
   width: 180,
   borderRadius: 32,
   fontSize: 14,
   padding: "5px 10px 5px 10px",
   borderColor : 'white',
   border: "solid #C4C4C4 2px",
   cursor: "pointer",
   marginLeft : 10
}

const filter = {
   width: "90%",
   marginLeft: "5%",
   textTransform: "uppercase",
   marginTop: 10,
   marginBottom : 10
}

const iconDiv = {
  
}