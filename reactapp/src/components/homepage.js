import React, {useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import {connect} from 'react-redux'

// Import de NOS composants
import Header from '../modals_parcels/header';
import Label from '../modals_parcels/labelBar';
import SignModal from '../modals_parcels/signModal';
import Footer from '../modals_parcels/footer';

// Import composant antd
import {Card, Col, Row, Modal, Button} from 'antd';

export default function Home(props) {

    var { category } = useParams();

   const {Meta} = Card;

    // Chargement des informations en DB selon la route /home
    const [salesList, setSalesList] = useState([]);
    const [filter, setFilter] = useState('')
    const [type, setType] = useState('')

    // Paramètre dynamique passé dans la route pour afficher durant toute la navigation les ventes par caté
    useEffect(() => {
        async function loadData() {
        var rawResponse = await fetch(`/home?categories=${category}`);
        var response = await rawResponse.json();
        console.log(response.sales)
        setSalesList(response.sales)
       }
       loadData();

      }, [category])

    console.log(salesList)

    // Map qui gère l'affichage des cards par rapport aux informations en DB
    var cardsFromDB = salesList.map((sale,i) => {

        var labelList = [];
        for (var i=0; i<sale.brandLabels.length; i++){
            labelList.push(<img src={`/assets/icones/${sale.brandLabels[i]}.png`} style={{height: 30, marginBottom : 5, border: '2px solid white', borderRadius : 15, backgroundColor : 'white'}}/>)
        }

        var brandImg = `/assets/${sale.brandImg}.jpeg`

        return (

            <Col span={{xs: 24, sm: 12}} style={{margin : 10}}>

                <Card

                    hoverable
                    onClick={() => onCardClick(sale.brandName, sale.brandDesc)}
                    position='relative'
                    cover={
                    <img alt={sale.brandName} src={brandImg} style={{height : 200, width : 480}}/>
                    }
                >

                    <div style={{position : 'absolute', top: 10, left : 430}}>
                        {labelList}
                    </div>

                    <div
                        style={{height : 20, padding: 0, marginTop : 0, display : 'flex', flexDirection : 'column', justifyContent : 'center' }}
                    >
                        <div style={{display : 'flex', flexDirection : 'row', justifyContent : 'space-between' }}>
                            <span style={{fontSize : 16, fontWeight: "bold"}}>{sale.brandName}</span>
                            <span style={{color: "#207872", fontWeight: "bold"}}>Jusqu'à -{sale.maxDiscount}%</span>
                        </div>

                        <span style={{color : 'rgba(0, 0, 0, 0.45)', marginTop : 5}}>{sale.brandFastDesc}</span>
                    </div>

                </Card>

            </Col>

          )});

    // Affichage de la brandModal
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [brand, setBrand] = useState('')
    const [desc, setDesc] = useState('')

    function onCardClick(name, desc) {
        setBrand(name);
        setDesc(desc);
        setIsModalVisible(true);
        console.log('Clic on card detected');
    } 

   const handleCancel = () => {
      setIsModalVisible(false);
      console.log('clic supp détecté');
   };

   // Sign Modal
   const [isModalSignVisible, setIsModalSignVisible] = useState("hidden");
   console.log(isModalSignVisible);

   var handleModalChangeVisibility = (currentState) => {
      setIsModalSignVisible(currentState);
   };

   var selectedFilter = (currentState) => {
    setFilter(currentState);
 };

  return (

        <div style={{backgroundColor:"#FCF5EE", fontFamily : 'Montserrat'}}>

            <Header/>
            <Label/>
            <Row style={{width : '100%', marginTop  : 10, justifyContent: 'center'}}>
                <h4 style={{width : 250, textAlign : 'right',fontWeight: "550", fontSize: "16px", lineHeight: "24px", cursor: "pointer", color: "#207872"}}>LES VENTES DU MOMENT</h4>
                <span style={{width: "1px", height: "30px", border: "1px black solid", marginLeft: "15px", marginRight: "15px", alignSelf: "start"}}></span>
                <h4 style={{width : 250, textAlign : 'left', fontWeight: "550", fontSize: "16px", lineHeight: "24px", cursor: "pointer", color: "#C4C4C4"}}>LES VENTES A VENIR</h4>
            </Row>

            <Modal 
                
                title={brand} 

                width={600}
                    
                centered 
                    
                visible={isModalVisible}

                onCancel={handleCancel}
                
                footer={[
                    <Button key="Retour" onClick={handleCancel}>Retour</Button>,

                    <Button key="submit" style={{marginLeft: 215, backgroundColor: '#207872', borderRadius: 40, border: 0}}
                            type="primary" onClick={() => handleModalChangeVisibility("visible")}>
                        Se connecter pour accéder à la vente
                    </Button>,
                ]}
            >
                    <p>{desc}</p>

            </Modal>

            <Row style={{width : '80%', margin : 'auto', marginTop  : 2 , justifyContent: 'center'}}>

                {cardsFromDB}

            </Row>
            <SignModal state={isModalSignVisible} changeParentState={handleModalChangeVisibility}/>
            <Footer/>
        </div>
   );
}