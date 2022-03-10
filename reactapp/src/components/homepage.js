import React, {useState, useEffect} from 'react';
import {Link, useParams} from "react-router-dom";
import {connect} from 'react-redux';

// Import de NOS composants
import Header from '../modals_parcels/header';
import Label from '../modals_parcels/labelBar';
import SignModal from '../modals_parcels/signModal';
import Footer from '../modals_parcels/footer';

// Import composant antd & CSS
import {Card, Col, Row, Modal, Button} from 'antd';
import '../stylesheets/homepage.css';

function Home(props) {

    var {category} = useParams();
    var {date} = useParams();

    const {Meta} = Card;

    // Chargement des informations en DB selon la route /home
    const [salesList, setSalesList] = useState([]);

    // Paramètre dynamique passé dans la route pour afficher durant toute la navigation les ventes par caté
    useEffect(() => {
        window.scrollTo(0, 0);
        props.addCategory(category);

        async function loadData() {
            if (date === 'to-be-started') {
                var rawResponse = await fetch(`/home?categories=${category}&date=to-be-started`);
            } else {
                var rawResponse = await fetch(`/home?categories=${category}`);
            }
            var response = await rawResponse.json();
            setSalesList(response.sales);
        }

        loadData();

    }, [category, date]);

    // Map qui gère l'affichage des cards par rapport aux informations en DB
    var cardsFromDB = salesList.map((sale, i) => {

        var labelList = [];
        for (var i = 0; i < sale.brandLabels.length; i++) {
            labelList.push(<img src={`/assets/Icones/${sale.brandLabels[i]}.png`} style={{
                height: 30,
                marginBottom: 5,
                border: '2px solid white',
                borderRadius: 15,
                backgroundColor: 'white',
            }}/>);
        }

        var brandImg = `/assets/${sale.brandImg}.jpeg`;

        return (

            <Col span={{xs: 24, sm: 12}} className="cards">

                <Card

                    hoverable
                    onClick={() => onCardClick(sale.brandName, sale.brandDesc)}
                    position="relative"
                    cover={
                        <img alt={sale.brandName} src={brandImg} style={{height: 200, width: 480}}/>
                    }
                >

                    <div style={{position: 'absolute', top: 10, left: 430}}>
                        {labelList}
                    </div>

                    <div
                        style={{
                            height: 20,
                            padding: 0,
                            marginTop: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                        }}
                    >
                        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                            <span style={{fontSize: 16, fontWeight: "bold"}}>{sale.brandName}</span>
                            <span style={{color: "#207872", fontWeight: "bold"}}>Jusqu'à -{sale.maxDiscount}%</span>
                        </div>

                        <span style={{color: 'rgba(0, 0, 0, 0.45)', marginTop: 5}}>{sale.brandFastDesc}</span>
                    </div>

                </Card>

            </Col>

        );
    });

    // Affichage de la brandModal
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [brand, setBrand] = useState('');
    const [desc, setDesc] = useState('');

    function onCardClick(name, desc) {
        props.addBrand(name);
        setBrand(name);
        if (date != 'to-be-started')
            setDesc(desc);
        setIsModalVisible(true);
    }

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    // Sign Modal
    const [isModalSignVisible, setIsModalSignVisible] = useState("hidden");

    var handleModalChangeVisibility = (currentState) => {
        if (date != 'to-be-started') {
            setIsModalSignVisible(currentState);
        }
    };

    // Gestion de l'affichage du texte du bouton de la brandModal
    var buttonBrandModal;
    if (date != 'to-be-started') {
        buttonBrandModal = localStorage.getItem('token') ? 'Accéder à la vente' : 'Se connecter pour accéder à la vente';
    } else {
        buttonBrandModal = 'Vente pas encore commencée';
    }

    // Gestion couleur Ventes en cours / Ventes à venir
    let saleOngoingColor = {
        width: 250,
        textAlign: 'right',
        fontWeight: "550",
        fontSize: "16px",
        lineHeight: "24px",
        cursor: "pointer",
        color: "#207872",
    };
    let saleUpcomingColor = {
        width: 250,
        textAlign: 'left',
        fontWeight: "550",
        fontSize: "16px",
        lineHeight: "24px",
        cursor: "pointer",
        color: "#C4C4C4",
    };
    if (date === 'to-be-started') {
        saleOngoingColor.color ="#C4C4C4";
        saleUpcomingColor.color ="#207872";
    }

    return (

        <div style={{backgroundColor: "#FCF5EE", fontFamily: 'Montserrat'}}>

            <Header/>
            <Label/>
            <Row style={{width: '100%', marginTop: 10, justifyContent: 'center'}}>
                <Link to={`/home/${category}`}><h4 style={saleOngoingColor}>LES VENTES DU MOMENT</h4></Link>
                <span style={{
                    width: "1px",
                    height: "30px",
                    border: "1px black solid",
                    marginLeft: "15px",
                    marginRight: "15px",
                    alignSelf: "start",
                }}/>
                <Link to={`/home/${category}/to-be-started`}><h4 style={saleUpcomingColor}>LES VENTES A VENIR</h4></Link>
            </Row>

            <Modal

                title={brand}

                width={600}

                centered

                visible={isModalVisible}

                onCancel={handleCancel}

                footer={[
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Button key="Retour" onClick={handleCancel}>Retour</Button>

                        <Button key="submit" style={{backgroundColor: '#207872', borderRadius: 40, border: 0}}
                                type="primary" onClick={() => handleModalChangeVisibility("visible")}>
                            {buttonBrandModal}
                        </Button>
                    </div>,
                ]}
            >
                <p>{desc}</p>

            </Modal>

            <Row className="cardsContainer">

                {cardsFromDB}

            </Row>
            <SignModal state={isModalSignVisible} changeParentState={handleModalChangeVisibility}/>
            <Footer/>
        </div>
    );
}

function mapDispatchToProps(dispatch) {
    return {
        addBrand: function (brand) {
            dispatch({type: 'add-brand', brand: brand});
        },
        addCategory: function (category) {
            dispatch({type: 'add-category', category: category});
        },
    };
}

function mapStateToProps(state) {
    return {
        token: state.token,
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Home);
