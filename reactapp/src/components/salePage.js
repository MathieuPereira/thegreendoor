import React, {useState} from 'react';
import Header from '../modals_parcels/header';
import Label from '../modals_parcels/labelBar';
import {Breadcrumb, Select} from "antd";
import {Card, Col, Row, Modal, Button} from 'antd';

const {Option} = Select;

export default function SalePage() {

   function handleChange(value) {
   }

   return (

      <div>
         <Header/>
         <Label/>
         <div style={{width: '70%', margin: 'auto', marginTop: 10}}>

            <Breadcrumb separator=">" style={{fontSize: "16px", fontWeight: "500", width: "100%", marginBottom: 10}}>
               <Breadcrumb.Item href="">Home</Breadcrumb.Item>
               <Breadcrumb.Item href="">Categories</Breadcrumb.Item>
               <Breadcrumb.Item>Brand Name</Breadcrumb.Item>
            </Breadcrumb>
            <Row>

               <div style={{width: '250px', height: "100%"}}>
                  <img style={{width: "250px", height: "250px", marginBottom: 10}} src="./assets/picture.jpeg"
                       alt="picture"/>

                  <div style={{
                     display: "flex",
                     flexDirection: "row",
                     border: "3px #207872 solid",
                     borderRadius: 20,
                     alignItems: "center",
                     justifyContent: "space-evenly",
                     width: "80%",
                     margin: "auto",
                  }}>
                     <img src="./assets/icones/biosourced_materials.png"
                          style={{height: 35, border: '2px solid white', borderRadius: 15, backgroundColor: 'white'}}/>
                     <img src="./assets/icones/green_delivery.png"
                          style={{height: 35, border: '2px solid white', borderRadius: 15, backgroundColor: 'white'}}/>
                     <img src="./assets/icones/ong.png"
                          style={{height: 35, border: '2px solid white', borderRadius: 15, backgroundColor: 'white'}}/>
                  </div>
                  <div style={{backgroundColor: '#FFFFFF', width: "100%", marginTop: 10}}>
                     <p style={{marginLeft: "5%", paddingTop: 15, marginBottom: 0, fontWeight: 550, fontSize: 18}}>Trier
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
               <Col style={{marginLeft: 25}}>
                  <p style={{width: "100%", fontSize: 16, color: '#207872'}}>⏰ Fin le dd month yyyy</p>
                  <div style={{ display: "flex", justifyContent: 'space-around'}}>
                     <div style={{
                        backgroundColor: "#FFFFFF",
                        padding: 8,
                        height: 430,
                        width: 300,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
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
                           <h5 style={{fontWeight: 450, fontSize: 18}}>NAIKOON JKT</h5>
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
                        <span style={{width: 280, height: 0, alignSelf: "center", border: "1px #AEA9A9 solid"}}/>
                        <p style={{fontSize: 16, fontWeight: 520, marginTop: 15}}><span style={{color: "#207872"}}>264,00 €</span> au lieu
                           de <span style={{textDecoration: "line-through"}}>330,00 €</span></p>
                        <img style={{width: 230, height: 250}} src="./assets/picture.jpeg" alt=""/>
                        <div style={{
                           display: "flex",
                           justifyContent: "space-between",
                           alignItems: "center",
                           width: "95%",
                           margin: "auto",
                           marginTop: 20,
                        }}>
                           <p style={{fontSize: 14, fontWeight: 450, cursor: "pointer", marginBottom: 0}}>Voir le
                              produit</p>
                           <button style={{
                              background: "#207872",
                              color: '#FFFFFF',
                              width: 110,
                              borderRadius: 32,
                              fontSize: 12,
                              padding: "5px 30px 5px 30px",
                              border: "solid #CCCCC 2px",
                              cursor: "pointer",
                           }}>Achat Express
                           </button>
                        </div>
                     </div>
                  </div>
               </Col>
            </Row>

         </div>

      </div>
   );
}
