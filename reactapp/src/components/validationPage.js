import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux'
import {Link, Redirect} from "react-router-dom";

// Import de NOS composants
import Header from '../modals_parcels/header';
import Footer from '../modals_parcels/footer';

import {Divider} from 'antd';

export default function Validation(props) {

    return (

        <div style={{backgroundColor:"#FCF5EE", fontFamily : 'Montserrat'}}>

            <Header/>

            <div style={{display : 'flex', flexDirection : 'column', margin : 'auto', width : '60%'}}>

                <div style={{fontFamily : 'Montserrat', fontSize : 16, marginTop : 20, fontWeight : 450, justifyContent : 'center'}}>
                        <p >Nous vous remercions de votre commande et vous souhaitons une bonne activité ! 🚀 </p>
                </div>

                <div
                    style={{
                        border: '1px solid gray',
                        padding: 5,
                        borderRadius : 5,
                        backgroundColor: '#FFFFFF',
                        marginBottom: 15,
                        textAlign : 'start',
                    }}>
                     
                    <p style={{fontFamily : 'Montserrat', fontSize : 18, marginTop : 15, marginLeft : 15, fontWeight : 450}}>Rappel de votre commande 🔍 </p>

                    <div style={{display: 'flex', alignItems : 'center', height : 120}}>
                        <img style={{width: 60, height: 80, marginLeft : '5%'}} src={`/assets/Produits/picture_1.jpeg`}/>
                        <div
                            style={{display: "flex", alignItems : 'flex-start', justifyContent: 'space-between', width: '80%'}}>
                            <div style={{marginLeft: 25}}>
                                <p style={{marginBottom: 0, fontSize: 18}}>NOM</p>
                                <div style={{marginTop: '20%'}}>
                                    <p style={{marginBottom: 0}}>Taille</p>
                                </div>
                            </div>
                            <div >
                                <p style={{fontSize: 18}}>Quantité :</p>
                            </div>
                            <div style={{marginRight: 10}}>
                                <p style={{
                                    fontSize: 16,
                                    fontWeight: 650,
                                    color: '#207872',
                                }}>XX,00 €</p>
                                <p style={{
                                    textDecoration: "line-through",
                                    fontSize: 12,
                                }}>XX,00 €</p>
                            </div>

                        </div>

                    </div>

                    <Divider style={divider}/>

                    <div style={{display: 'flex', alignItems : 'center', height : 120}}>
                        <img style={{width: 60, height: 80, marginLeft : '5%'}} src={`/assets/Produits/picture_2.jpeg`}/>
                        <div
                            style={{display: "flex", alignItems : 'flex-start', justifyContent: 'space-between', width: '80%'}}>
                            <div style={{marginLeft: 25}}>
                                <p style={{marginBottom: 0, fontSize: 18}}>NOM</p>
                                <div style={{marginTop: '20%'}}>
                                    <p style={{marginBottom: 0}}>Taille</p>
                                </div>
                            </div>
                            <div >
                                <p style={{fontSize: 18}}>Quantité :</p>
                            </div>
                            <div style={{marginRight: 10}}>
                                <p style={{
                                    fontSize: 16,
                                    fontWeight: 650,
                                    color: '#207872',
                                }}>XX,00 €</p>
                                <p style={{
                                    textDecoration: "line-through",
                                    fontSize: 12,
                                }}>XX,00 €</p>
                            </div>

                        </div>

                    </div>

                    <Divider style={divider}/>

                    <div style={{display: 'flex', fontSize : 16, width : '90%', justifyContent : 'flex-end'}}>
                                <p >TOTAL COMMANDE : </p>
                                <p style={{fontWeight: 'bold', marginLeft : 15}}>XXX,OO€</p>
                            </div>

                </div>

                <div style={{display : 'flex', justifyContent : 'space-between'}}>
                    <button style={{cursor:'pointer', fontSize : 15, backgroundColor: '#207872', borderRadius: 5, border: 0, paddingLeft : 15, paddingRight : 15, height : 40, marginTop : 10, color : 'white'}} >Voir vos commandes passées  📦 </button>
                    <button style={{cursor:'pointer', color : 'white', fontSize : 15, backgroundColor: 'black', borderRadius: 5, border: 0, paddingLeft : 15, paddingRight : 15, height : 40, marginTop : 10}} > Revenir à l'accueil 🏠 </button>
                </div>

            </div>

            <Footer/>

        </div>
    )
}

const divider = {
    marginLeft: 2,
    marginTop: 3,
    marginBottom: 15,
    alignSelf: "start",
    border: "0.5px #AEA9A9 solid"
 }

const linkButton = {
    color: 'white',
    fontFamily: 'Montserrat',
    cursor: 'pointer',
 };