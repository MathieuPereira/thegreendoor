import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux'
import {Link, Redirect} from "react-router-dom";

// Import de NOS composants
import Header from '../modals_parcels/header';
import Footer from '../modals_parcels/footer';

import {Divider} from 'antd';
import {
   DownloadOutlined
  } from '@ant-design/icons';

function PastOrders(props) {
    
    let totalCmd = 0;
    let normalPrice = 0;

    return (

        <div style={{backgroundColor:"#FCF5EE", fontFamily : 'Montserrat'}}>

            <Header/>

            <div style={{display : 'flex', flexDirection : 'column', margin : 'auto', width : '60%'}}>

                <div style={{fontFamily : 'Montserrat', fontSize : 16, marginTop : 20, fontWeight : 450, justifyContent : 'center'}}>
                        <p>Retrouvez ici la liste de vos commandes passées 👇 </p>
                </div>

                <div
                    style={{
                        border: '1px solid gray',
                        borderRadius : 5,
                        backgroundColor: '#FFFFFF',
                        textAlign : 'start',
                        padding : 0,
                        marginBottom : 10
                    }}>

                    <div style={{display : 'flex', justifyContent : 'space-between',backgroundColor : '#207872', color : 'white', fontFamily : 'Montserrat', fontSize : 15, paddingTop : 10, paddingLeft: 15, paddingBottom : 5, paddingRight : 15}}>
                        <div >
                            <p style={{marginBottom : 3}}>Date de votre commande : <span style={{fontWeight : 'bold'}}>11/03/22</span> </p>
                            <p style={{marginBottom : 3}}>Total : <span style={{fontWeight : 'bold'}}>0,00€</span></p>
                            <p style={{marginBottom : 3}}>Commande expédiée le <span style={{fontWeight : 'bold'}}>14/03/2022</span></p>
                        </div>

                        <div >
                            <p style={{marginBottom : 3}}>Commande N°: <span style={{fontWeight : 'bold'}}>123456789</span> </p>
                            <p style={{marginBottom : 3}}><DownloadOutlined style={{marginRight : 5}}/>Téléchargez votre facture</p>
                        </div>
                    </div>
                    

                    <div>

                        <div style={{display: 'flex', alignItems : 'center', height : 120}}>
                            
                            <img style={{width: 60, height: 80, marginLeft : '5%'}} src={`/assets/Produits/picture_1.jpeg`}/>

                            <div
                                style={{display: "flex", alignItems : 'flex-start', justifyContent: 'space-between', width: '80%'}}>
                                
                                <div style={{marginLeft: 25}}>
                                    <p style={{marginBottom: 0, fontSize: 18, width : 200}}>TEST</p>
                                    <div style={{marginTop: '10%'}}>
                                        <p style={{marginBottom: 0, fontSize: 16}}>Taille : M</p>
                                    </div>
                                </div>

                                <div >
                                    <p style={{fontSize: 16}}>Quantité : 1</p>
                                </div>
                                
                                <div style={{marginRight: 10}}>
                                    
                                    <p style={{fontSize: 16}}>
                                        0,00 €
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

                <div
                    style={{
                        border: '1px solid gray',
                        borderRadius : 5,
                        backgroundColor: '#FFFFFF',
                        textAlign : 'start',
                        padding : 0
                    }}>

                    <div style={{display : 'flex', justifyContent : 'space-between',backgroundColor : '#207872', color : 'white', fontFamily : 'Montserrat', fontSize : 15, paddingTop : 10, paddingLeft: 15, paddingBottom : 5, paddingRight : 15}}>
                        <div >
                            <p style={{marginBottom : 3}}>Date de votre commande : <span style={{fontWeight : 'bold'}}>02/02/22</span> </p>
                            <p style={{marginBottom : 3}}>Total : <span style={{fontWeight : 'bold'}}>0,00€</span></p>
                            <p style={{marginBottom : 3}}>Commande expédiée le <span style={{fontWeight : 'bold'}}>07/02/2022</span></p>
                        </div>

                        <div >
                            <p style={{marginBottom : 3}}>Commande N°: <span style={{fontWeight : 'bold'}}>987654321</span> </p>
                            <p style={{marginBottom : 3}}><DownloadOutlined style={{marginRight : 5}}/>Téléchargez votre facture</p>
                        </div>
                    </div>
                    

                    <div>

                        <div style={{display: 'flex', alignItems : 'center', height : 120}}>
                            
                            <img style={{width: 60, height: 80, marginLeft : '5%'}} src={`/assets/Produits/picture_1.jpeg`}/>

                            <div
                                style={{display: "flex", alignItems : 'flex-start', justifyContent: 'space-between', width: '80%'}}>
                                
                                <div style={{marginLeft: 25}}>
                                    <p style={{marginBottom: 0, fontSize: 18, width : 200}}>TEST</p>
                                    <div style={{marginTop: '10%'}}>
                                        <p style={{marginBottom: 0, fontSize: 16}}>Taille : M</p>
                                    </div>
                                </div>

                                <div >
                                    <p style={{fontSize: 16}}>Quantité : 1</p>
                                </div>
                                
                                <div style={{marginRight: 10}}>
                                    
                                    <p style={{fontSize: 16}}>
                                        0,00 €
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                    <Divider style={{width : '80%'}}/>

                    <div style={{display: 'flex', alignItems : 'center', height : 120}}>
                            
                            <img style={{width: 60, height: 80, marginLeft : '5%'}} src={`/assets/Produits/picture_2.jpeg`}/>

                            <div
                                style={{display: "flex", alignItems : 'flex-start', justifyContent: 'space-between', width: '80%'}}>
                                
                                <div style={{marginLeft: 25}}>
                                    <p style={{marginBottom: 0, fontSize: 18, width : 200}}>TEST</p>
                                    <div style={{marginTop: '10%'}}>
                                        <p style={{marginBottom: 0, fontSize: 16}}>Taille : M</p>
                                    </div>
                                </div>

                                <div >
                                    <p style={{fontSize: 16}}>Quantité : 1</p>
                                </div>
                                
                                <div style={{marginRight: 10}}>
                                    
                                    <p style={{fontSize: 16}}>
                                        0,00 €
                                    </p>

                                </div>

                            </div>

                        </div>

                </div>

                <div>
                    <button style={{cursor:'pointer', color : 'white', fontSize : 15, backgroundColor: 'black', borderRadius: 5, border: 0, paddingLeft : 15, paddingRight : 15, height : 40, marginTop : 10}} > <Link style={{color : 'white'}} to="/"> Revenir à l'accueil 🏠 </Link> </button>
                </div>

            </div>

            <Footer/>

        </div>
    )
}

function mapStateToProps(state) {
    return {
        token: state.token,
        basket: state.basket,
        fdp : state.deliveryPrice
    };
}

export default connect(
    mapStateToProps,
    null,
)(PastOrders);

const linkButton = {
    color: 'white',
    fontFamily: 'Montserrat',
    cursor: 'pointer',
 };