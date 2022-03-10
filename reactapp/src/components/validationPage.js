import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Link, Redirect, useParams} from "react-router-dom";

// Import de NOS composants
import Header from '../modals_parcels/header';
import Footer from '../modals_parcels/footer';

import {Divider, Spin} from 'antd';
import deliveryService from "../reducers/delivery.reducer";

function Validation(props) {
    const [loader, setLoader] = useState(false);
    const [orderInfos, setOrderInfos] = useState([]);
    const {session} = useParams();

    let totalCmd = 0;
    let normalPrice = 0;
    let totalDiscount = 0;


    useEffect(() => {
        let data;
        async function loadData() {

            let rawData = await fetch('/users/add-order', {
                method: 'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                body: `token=${localStorage.getItem('token')}&articles=${localStorage.getItem('basket')}&deliveryService=${localStorage.getItem('deliveryService')}`,
            });
            data = await rawData.json();
            if (data.comment == 'Order saved in db') {
                rawData = await fetch('/users/add-address', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    body: `token=${localStorage.getItem('token')}&stripeSession=${session}`,
                });
                data = await rawData.json();
                if (data.comment == 'Adress saved in db') {
                    rawData = await fetch('/users/last-order', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                        body: `token=${localStorage.getItem('token')}`,
                    });
                    data = await rawData.json();
                    setOrderInfos(data.order)
                    props.removeBasket();
                    localStorage.removeItem('basket');
                    setLoader(true);
                }
            }
        }

        loadData();
    }, []);

    console.log(orderInfos);

    if (!loader) {
        return (
            <div style={{backgroundColor: "#FCF5EE", height: '100vh', fontFamily: 'Montserrat'}}>
                <Header/>
                <Spin size="large" style={{position: "absolute", left: '50%', top: '50%'}}/>
            </div>
        );
    } else {

        let order;

        order = orderInfos.articles.map((product, i) => {

            return (

                <div key={i}>

                    <div style={{display: 'flex', alignItems: 'center', height: 120}}>

                        <img style={{width: 60, height: 80, marginLeft: '5%'}}
                             src={`/assets/Produits/${product.img}.jpeg`}/>

                        <div
                            style={{
                                display: "flex",
                                alignItems: 'flex-start',
                                justifyContent: 'space-between',
                                width: '80%',
                            }}>

                            <div style={{marginLeft: 25}}>
                                <p style={{marginBottom: 0, fontSize: 18, width: 200}}>{product.name}</p>
                                <div style={{marginTop: '10%'}}>
                                    <p style={{marginBottom: 0, fontSize: 16}}>Taille
                                        : {product.size}{product.deliveryPrice}</p>
                                </div>
                            </div>

                            <div>
                                <p style={{fontSize: 16}}>Quantité : {product.quantity}</p>
                            </div>

                            <div style={{marginRight: 10}}>
                                <p style={{fontSize: 18, fontWeight: 650, color: '#207872'}}>
                                    {product.reducedPrice * product.quantity},00 €
                                </p>

                                <p style={{textDecoration: "line-through", fontSize: 14}}>
                                    {product.normalPrice * product.quantity},00 €
                                </p>
                            </div>

                        </div>

                    </div>

                    <Divider style={divider}/>

                </div>

            );

        });

        let deliveryPrice = orderInfos.deliveryService == 1 ? 3.90 : 5.40;

        for (let e of orderInfos.articles) {
            totalCmd += e.reducedPrice * e.quantity;
            normalPrice += e.normalPrice * e.quantity;
        }
        totalDiscount = normalPrice - totalCmd;

        totalCmd = totalCmd + deliveryPrice;

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
                        <p>Nous vous remercions de votre commande et vous souhaitons une bonne activité ! 🚀 </p>
                    </div>

                    <div
                        style={{
                            border: '1px solid gray',
                            padding: 5,
                            borderRadius: 5,
                            backgroundColor: '#FFFFFF',
                            marginBottom: 15,
                            textAlign: 'start',
                        }}>

                        <p style={{
                            fontFamily: 'Montserrat',
                            fontSize: 18,
                            marginTop: 15,
                            marginLeft: 15,
                            fontWeight: 450,
                        }}>Rappel de votre commande 🔍 </p>

                        {order}

                        <div style={{
                            display: 'flex',
                            fontSize: 14,
                            justifyContent: 'flex-end',
                            marginRight: '9%',
                            marginBottom: 0,
                        }}>
                            <p>Remise : </p>
                            <p style={{marginLeft: 15}}>-{totalDiscount},00€</p>
                        </div>

                        <div style={{
                            display: 'flex',
                            fontSize: 14,
                            justifyContent: 'flex-end',
                            marginRight: '9%',
                            marginBottom: 0,
                        }}>
                            <p>Frais de livraison : </p>
                            <p style={{marginLeft: 15}}>{deliveryPrice}€</p>
                        </div>

                        <div style={{
                            display: 'flex',
                            fontSize: 16,
                            justifyContent: 'flex-end',
                            marginRight: '9%',
                            marginBottom: 0,
                        }}>
                            <p>Commande totale : </p>
                            <p style={{fontWeight: 'bold', marginLeft: 15, color: '#207872'}}>{totalCmd}€</p>
                        </div>

                    </div>

                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <button style={{
                            cursor: 'pointer',
                            fontSize: 15,
                            backgroundColor: '#207872',
                            borderRadius: 5,
                            border: 0,
                            paddingLeft: 15,
                            paddingRight: 15,
                            height: 40,
                            marginTop: 10,
                            color: 'white',
                        }}><Link style={{color: 'white'}} to="/my-orders"> Voir vos commandes passées 📦 </Link></button>
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
}

function mapStateToProps(state) {
    return {
        token: state.token,
        basket: state.basket,
        deliveryService: state.deliveryService,
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
        },
        refreshDelivery: function () {
            dispatch({
                type: 'refreshDelivery'
            })
        },
    };
}


export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Validation);

const divider = {
    marginLeft: 2,
    marginTop: 3,
    marginBottom: 15,
    alignSelf: "start",
    border: "0.5px #AEA9A9 solid",
};

const linkButton = {
    color: 'white',
    fontFamily: 'Montserrat',
    cursor: 'pointer',
};