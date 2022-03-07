import React, {useEffect, useState} from 'react';
import {Link, Redirect} from "react-router-dom";

// Import de NOS composants
import Header from '../modals_parcels/header';
import Footer from '../modals_parcels/footer';

// Import antd & style
import {ArrowLeftOutlined, CloseOutlined} from "@ant-design/icons";
import {connect} from "react-redux";
import {Col, Input, Row, Select, Radio, Space} from "antd";

const {Option} = Select;

function BasketPage(props) {
    const [delivery, setDelivery] = useState(1);
    const [totalDiscount, setTotalDiscount] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0)

    let basketArticles;

    useEffect(() => {
        window.scrollTo(0, 290);
        let discount = 0;
        let price = 0;
        for (let e of props.basket) {
            discount += (e.normalPrice * e.quantity - e.reducedPrice * e.quantity);
            price += e.reducedPrice * e.quantity;
        }
        setTotalDiscount(discount);
        setTotalPrice(price);
    }, [props.basket]);

    basketArticles = props.basket.map((product, i) => {

        return (

            <Col key={i}
                 style={{
                     height: 207,
                     border: '1px solid gray',
                     padding: 5,
                     backgroundColor: '#FFFFFF',
                     marginBottom: 15,
                     borderRadius : 15
                 }}>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start'}}>
                    <img style={{width: 150, height: 200}} src={`/assets/Produits/${product.img}.jpeg`}
                         href={`ALPINE PT`}/>
                    <div
                        style={{display: "flex", justifyContent: 'space-between', flexDirection: 'row', width: '100%'}}>
                        <div style={{marginLeft: 25, marginTop: 35}}>
                            <p style={{marginBottom: 0, fontSize: 18}}>{product.name}</p>
                            <div style={{marginTop: '20%'}}>
                                <p style={{marginBottom: 0}}>Taille</p>
                                <Select defaultValue={`${product.size}`}
                                        onChange={(e) => props.modifyArticleSize(i, e)}>
                                    <Option value="XS">XS</Option>
                                    <Option value="S">S</Option>
                                    <Option value="M">M</Option>
                                    <Option value="L">L</Option>
                                    <Option value="XL">XL</Option>
                                    <Option value="XXL">XXL</Option>
                                </Select>
                            </div>
                        </div>
                        <div style={{marginTop: 35}}>
                            <p style={{fontSize: 18}}>Quantité :</p>
                            <Input style={{width: 80, height: 40}} placeholder={`${product.quantity}`}
                                   onChange={(e) => props.modifyArticleQuantity(`${product.name}`, `${e.target.value}`)}/>
                        </div>
                        <div style={{marginTop: 35, marginRight: 10}}>
                            <p style={{
                                fontSize: 16,
                                fontWeight: 650,
                                color: '#207872',
                            }}>{product.reducedPrice * product.quantity},00 €</p>
                            <p style={{
                                textDecoration: "line-through",
                                fontSize: 12,
                            }}>{product.normalPrice * product.quantity},00 €</p>
                            <Row style={{marginTop: 60, display: "flex", alignItems: "center", cursor: "pointer"}}
                                 onClick={() => props.deleteArticle(i)}>
                                <CloseOutlined style={{fontSize: 16, marginRight: 2}}/>
                                <p style={{marginBottom: 0, fontSize: 16}}>Supprimer</p>
                            </Row>
                        </div>
                    </div>
                </div>
            </Col>
        );
    });

    if (basketArticles.length === 0) {
        basketArticles = <p>Votre panier est vide</p>;
    }

    let deliveryPrice = delivery === 1 ? 3.90 : 5.40


    if (props.token == null) {
        return <Redirect to="/"/>;
    } else {
        return (

            <div style={{backgroundColor: "#FCF5EE", fontFamily: 'Montserrat'}}>
                <Header/>
                <div style={{width: '70%', margin: 'auto'}}>
                    <Row>
                        <Link to={'/'}><p style={{fontSize: 18, margin: 15}}><ArrowLeftOutlined/>Retour</p></Link>
                        <h4 style={{fontSize: 26, margin: 7}}>Votre Panier 🤩 </h4>
                    </Row>
                    <div style={{display: "flex", flexDIrection: 'row', justifyContent: 'space-between'}}>
                        <Col style={{width: '65%'}}>
                            {basketArticles}
                        </Col>
                        <Col style={{
                            width: '30%',
                            border: '1px solid gray',
                            fontSize: 16,
                            fontWeight: 550,
                            padding: 25,
                            borderRadius : 15,
                            backgroundColor: 'rgba(0, 0, 0, 0.2)'
                        }}>
                            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                <p>AJOUTER UN CODE PROMO</p>
                                <Input style={{width: '80%'}} placeholder="CODE PROMOTIONNEL"></Input>
                            </div>
                            <span style={{
                                marginTop: 10,
                                marginBottom: 10,
                                marginRight: 'auto',
                                marginLeft: 'auto',
                                width: '90%',
                                height: 1,
                                border: '1px solid #AEA9A9',
                                alignSelf: 'center',
                                display: 'block',
                            }}/>
                            <div>
                                <p>CHOISIR UNE LIVRAISON</p>
                                <Radio.Group style={{marginLeft: 10}} defaultValue={1} onChange={(e) => setDelivery(e.target.value)}>
                                    <Space direction="vertical">
                                        <Radio value={1}>Standard France (3 à 5 jours)</Radio>
                                        <Radio value={2}>Repack France, l'emballage réutilisable</Radio>
                                    </Space>
                                </Radio.Group>
                            </div>
                            <span style={{
                                marginTop: 10,
                                marginBottom: 10,
                                marginRight: 'auto',
                                marginLeft: 'auto',
                                width: '90%',
                                height: 1,
                                border: '1px solid #AEA9A9',
                                alignSelf: 'center',
                                display: 'block',
                            }}/>
                            <div style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'row'}}>
                                <p style={{fontWeight: 450, marginBottom: 0}}>FRAIS DE PORT</p>
                                <p style={{fontSize: 14, marginBottom: 0}}>{deliveryPrice.toString()}€</p>
                            </div>
                            <span style={{
                                marginTop: 10,
                                marginBottom: 10,
                                marginRight: 'auto',
                                marginLeft: 'auto',
                                width: '90%',
                                height: 1,
                                border: '1px solid #AEA9A9',
                                alignSelf: 'center',
                                display: 'block',
                            }}/>
                            <div style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'row'}}>
                                <p style={{fontWeight: 450}}>TOTAL REMISE</p>
                                <p style={{fontSize: 14}}>-{totalDiscount},00€</p>
                            </div>
                            <div style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'row'}}>
                                <p style={{fontWeight: 'bold'}}>TOTAL COMMANDE</p>
                                <p style={{fontSize: 16, fontWeight: 'bold'}}>{totalPrice + deliveryPrice}€</p>
                            </div>
                            <div style={{display: 'flex', justifyContent: 'center'}}>
                                <form action="/create-checkout-session" method="POST">
                                    <input name="basket" type='hidden' value={JSON.stringify(props.basket)}/>
                                    <input name="delivery" type='hidden' value={deliveryPrice}/>
                                    <button style={{cursor:'pointer', color : 'white', fontSize : 15, backgroundColor: '#207872', borderRadius: 40, border: 0, width : 200, height : 30, marginTop : 10}} type='submit'>Passer au paiement 💳 </button>
                                </form>
                            </div>
                        </Col>
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
    };
}

function mapDispatchToProps(dispatch) {
    return {
        deleteArticle: function (index) {
            dispatch({
                type: 'deleteArticle',
                index: index,
            });
        },
        modifyArticleQuantity: function (name, value) {
            dispatch({
                type: 'modifyArticleQuantity',
                name: name,
                quantity: value,
            });
        },
        modifyArticleSize: function (index, value) {
            dispatch({
                type: 'modifyArticleSize',
                index: index,
                size: value,
            });
        },
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(BasketPage);
