import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";

// Import de NOS composants
import Header from '../modals_parcels/header';
import Footer from '../modals_parcels/footer';

import {DownloadOutlined} from '@ant-design/icons';

export default function PastOrders() {

    const [orders, setOrders] = useState([]);

    useEffect(() => {

        let data;

        async function loadData() {

            let rawData = await fetch('/users/past-orders', {
                method: 'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                body: `token=${localStorage.getItem('token')}`,
            });
            data = await rawData.json();
            setOrders(data);

        }

        loadData();
    }, []);

    var orderList = orders.map((order, i) => {

        let totalCmd = order.deliveryPrice;
        let date = new Date(order.orderDate).toLocaleDateString('fr-FR');

        var orderArticles = order.articles.map((article, i) => {

            totalCmd += article.reducedPrice;

            return (

                <div style={{display: 'flex', alignItems: 'center', height: 120}}>

                    <img style={{width: 60, height: 80, marginLeft: '5%'}} src={`/assets/Produits/${article.img}.jpeg`}
                         alt="produit"/>

                    <div
                        style={{
                            display: "flex",
                            alignItems: 'flex-start',
                            justifyContent: 'space-between',
                            width: '80%',
                        }}>

                        <div style={{marginLeft: 25}}>
                            <p style={{marginBottom: 0, fontSize: 18, width: 200}}>{article.name}</p>
                            <div style={{marginTop: '10%'}}>
                                <p style={{marginBottom: 0, fontSize: 16}}>Taille : {article.size}</p>
                            </div>
                        </div>

                        <div>
                            <p style={{fontSize: 16}}>Quantité : {article.quantity}</p>
                        </div>

                        <div style={{marginRight: 10}}>

                            <p style={{fontSize: 16}}>
                                {article.reducedPrice},00 €
                            </p>

                        </div>

                    </div>

                </div>
            );
        });

        return (

            <div
                style={{
                    border: '1.5px solid gray',
                    borderRadius: 5,
                    backgroundColor: '#FFFFFF',
                    textAlign: 'start',
                    marginBottom: 20,
                    padding: 0,
                }}>

                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    backgroundColor: '#207872',
                    color: 'white',
                    fontFamily: 'Montserrat',
                    fontSize: 15,
                    paddingTop: 10,
                    paddingLeft: 15,
                    paddingBottom: 5,
                    paddingRight: 15,
                }}>
                    <div>
                        <p style={{marginBottom: 3}}>Date de votre commande : <span
                            style={{fontWeight: 'bold'}}>{date}</span></p>
                        <p style={{marginBottom: 3}}>Total : <span
                            style={{fontWeight: 'bold'}}> {totalCmd}€ </span> dont {order.deliveryPrice}€ de livraison
                        </p>
                    </div>

                    <div>
                        <p style={{marginBottom: 3}}>Commande N°: <span style={{fontWeight: 'bold'}}>987654321</span>
                        </p>
                        <p style={{marginBottom: 3}}><DownloadOutlined style={{marginRight: 5}}/>Téléchargez votre
                            facture</p>
                    </div>
                </div>

                {orderArticles}

            </div>

        );
    });

    return (

        <div style={{backgroundColor: "#FCF5EE", fontFamily: 'Montserrat'}}>

            <Header/>

            <div style={{display: 'flex', flexDirection: 'column', margin: 'auto', width: '60%'}}>

                <div style={{
                    fontFamily: 'Montserrat',
                    fontSize: 16,
                    marginTop: 20,
                    fontWeight: 450,
                    justifyContent: 'center',
                }}>
                    <p>Retrouvez ici la liste de vos commandes passées 👇 </p>
                </div>

                {orderList}

                <div>
                    <button style={{
                        cursor: 'pointer',
                        color: 'white',
                        fontSize: 15,
                        backgroundColor: 'black',
                        borderRadius: 5,
                        border: 0,
                        paddingLeft: 15,
                        paddingRight: 15,
                        height: 40,
                        marginTop: 10,
                    }}><Link style={{color: 'white'}} to="/"> Revenir à l'accueil 🏠 </Link></button>
                </div>

            </div>

            <Footer/>

        </div>
    );
}