import React, {useEffect, useState} from 'react';
import {Link, Redirect, useParams} from "react-router-dom";

// Import de NOS composants
import Header from '../modals_parcels/header';
import Label from '../modals_parcels/labelBar';
import Footer from '../modals_parcels/footer';

// Import antd & style
import {Breadcrumb, Select, Modal, Button, Statistic, Tag} from "antd";
import {connect} from "react-redux";
import '../stylesheets/salePage.css';

const {Countdown} = Statistic;
const {Option} = Select;

function SalePage(props) {
    var {brand} = useParams();
    const [saleLabels, setSaleLabels] = useState([]);
    const [saleImg, setSaleImg] = useState('');
    const [saleEnding, setSaleEnding] = useState(new Date);
    const [productsList, setProductsList] = useState([]);

    const deadline = new Date(saleEnding);
    const format = "[⏳ Plus que] D [jours] HH[h] : mm : ss";
    const counterStyle = {
        color: 'red',
    };

    useEffect(() => {
        window.scrollTo(0, 290);

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

    // Gestion de la modal de mise au panier
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalName, setModalName] = useState('');
    const [modalImg, setModalImg] = useState('');
    const [modalNormalPrice, setModalNormalPrice] = useState('');
    const [modalReducedPrice, setModalReducedPrice] = useState('');

    function onButtonClick(name, img, normalPrice, reducedPrice) {
        setModalName(name);
        setModalImg(img);
        setModalNormalPrice(normalPrice);
        setModalReducedPrice(reducedPrice);
        setIsModalVisible(true);
    }

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    // Fil d'ariane de navigation
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

        var reduction = (product.reducedPrice - product.normalPrice) / product.normalPrice * 100;

        return (
            <div key={i} className="productCard" style={productCard}>
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
                    <button style={discountButton}>
                        {reduction}%
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
                        style={{fontSize: 15, fontWeight: 500, cursor: "pointer", marginBottom: 0, marginLeft: 5}}>Voir
                        le
                        produit</p></Link>
                    <button className="buttonHover"
                            onClick={() => {
                                props.addArticle(product.name, brand, product.img, product.normalPrice, product.reducedPrice);
                                onButtonClick(product.name, product.img, product.normalPrice, product.reducedPrice);
                            }}
                            style={express}>Achat Express
                    </button>
                </div>
            </div>

        );
    });

    if (productsCards.length === 0) {
        productsCards = <p style={{color: "#000000"}}>Désolé, aucun article n'est disponible sur cette vente</p>;
    }

    var labelList = [];
    for (var i = 0; i < saleLabels.length; i++) {
        labelList.push(<img src={`/assets/Icones/${saleLabels[i]}.png`} style={label}/>);
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
                            <div className="imageBrandRightInfos" style={{}}>
                                <img className="imageRightInfos" src={`/assets/Resized/${saleImg}_sale.jpeg`}
                                     alt="picture"/>
                                <div className="infosBrandLabels">
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
                                            style={{width: "90%", textTransform: "uppercase", marginTop: 10}}
                                            onChange={handleChange}>
                                        <Option value="popularite">Popularité</Option>
                                        <Option value="prix">Prix</Option>

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
                                            style={{width: "90%", textTransform: "uppercase", marginTop: 10}}
                                            onChange={handleChange}>
                                        <Option value="Chaussures">Chaussures</Option>
                                        <Option value="Vêtements">Vêtements</Option>
                                        <Option value="Accessoires">Accessoires</Option>
                                    </Select>
                                    <Select defaultValue="Genre"
                                            style={{width: "90%", textTransform: "uppercase", marginTop: 10}}
                                            onChange={handleChange}>
                                        <Option value="men">Homme</Option>
                                        <Option value="women">Femme</Option>
                                        <Option value="women">Enfant</Option>
                                    </Select>
                                    <Select defaultValue="Taille" style={filter} onChange={handleChange}>
                                        <Option value="XS">XS</Option>
                                        <Option value="S">S</Option>
                                        <Option value="M">M</Option>
                                        <Option value="L">L</Option>
                                        <Option value="XL">XL</Option>
                                        <Option value="XXL">XXL</Option>
                                    </Select>
                                </div>
                            </div>
                        </div>
                        <div style={{marginLeft: 25}}>
                            <div className="endingDateDiv">
                                <p style={{fontSize: 18, color: '#207872', marginBottom: 0}}>
                                    ⏰ Fin le {saleEnding.toLocaleDateString('fr-FR')}
                                    <span><Tag color="black" style={{
                                        marginLeft: 10,
                                        height: 30,
                                        borderRadius: 40,
                                        textAlign: 'center',
                                    }}> <Countdown value={deadline} format={format} valueStyle={{
                                        color: 'white',
                                        fontSize: 16,
                                        fontFamily: 'Montserrat',
                                    }}/> </Tag></span>
                                </p>
                            </div>
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

                <Modal

                    title="Votre article a bien été ajouté au panier 😎"

                    width={600}

                    centered

                    visible={isModalVisible}

                    onCancel={handleCancel}

                    footer={[
                        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Button key="Continue" onClick={handleCancel}>Continuer mes achats</Button>

                            <Link to="/basket"><Button key="submit"
                                                       style={{backgroundColor: '#207872', borderRadius: 40, border: 0}}
                                                       type="primary">
                                Voir mon panier
                            </Button></Link>
                        </div>,
                    ]}
                >
                    <div style={{display: 'flex', alignItems: 'center'}}>

                        <div>
                            <img style={{width: 120, height: 150, marginRight: 20}}
                                 src={`/assets/Produits/${modalImg}.jpeg`} alt=""/>
                        </div>

                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            fontSize: 16,
                            fontFamily: 'Montserrat',
                            width: '100%',
                        }}>

                            <div style={{display: 'flex', flexDirection: 'column'}}>
                                <p>{modalName}</p>
                                <Select defaultValue={'TAILLE'} style={{width: 100}}
                                        onChange={(e) => props.modifyLastArticleSize(e)}>
                                    <Option value="XS">XS</Option>
                                    <Option value="S">S</Option>
                                    <Option value="M">M</Option>
                                    <Option value="L">L</Option>
                                    <Option value="XL">XL</Option>
                                    <Option value="XXL">XXL</Option>
                                </Select>
                            </div>

                            <div style={{display: 'flex', flexDirection: 'column', textAlign: 'right'}}>
                                <p style={{marginBottom: 5}}>Prix : <span
                                    style={{color: '#207872', fontWeight: 'bold'}}>{modalReducedPrice},00 €</span></p>
                                <p style={{fontSize: 15, textDecoration: "line-through"}}> {modalNormalPrice},00 €</p>
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
    };
}

function mapDispatchToProps(dispatch) {
    return {
        addArticle: function (name, brand, img, normalPrice, reducedPrice) {
            dispatch({
                type: 'addArticle',
                name: name,
                brand: brand,
                img: img,
                size: 'Taille',
                normalPrice: normalPrice,
                reducedPrice: reducedPrice,
            });
        },
        modifyLastArticleSize: function (size) {
            dispatch({
                type: 'modifyLastArticleSize',
                size: size,
            });
        },
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SalePage);

const label = {
    height: 30,
    marginBottom: 5,
    border: '2px solid white',
    borderRadius: 15,
    backgroundColor: 'white',
};

const productCard = {
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
};

const discountButton = {
    width: 80,
    borderRadius: 8,
    backgroundColor: '#000000',
    color: '#FFFFFF',
    padding: "5px 15px 5px 15px",
    border: "transparent",
};

const express = {
    background: "#207872",
    color: '#FFFFFF',
    borderColor: 'white',
    width: 110,
    borderRadius: 32,
    fontSize: 12,
    padding: "5px 10px 5px 10px",
    border: "solid #C4C4C4 2px",
    cursor: "pointer",
};

const filter = {
    width: '90%',
    textTransform: "uppercase",
    marginTop: 10,
};