import React, {useState, useEffect} from 'react';

// Import de NOS composants
import Header from '../modals_parcels/header';
import Label from '../modals_parcels/labelBar';
import SignModal from '../modals_parcels/signModal';
import Footer from '../modals_parcels/footer';


// Import composant antd
import {Card, Col, Row, Modal, Button} from 'antd';
import {CloseOutlined} from "@ant-design/icons";

export default function Home() {

    const { Meta } = Card;

    const [salesList, setSalesList] = useState([]);

    useEffect(() => {
        async function loadData() {
        var rawResponse = await fetch('/home');
        var response = await rawResponse.json();
        setSalesList(response.sales)
       }
       loadData();

      }, [])

    console.log(salesList)

    var cardsFromDB = salesList.map((sale,i) => {
    
    var labelList = [];
    for (var i=0; i<sale.brandLabels.length; i++){
        labelList.push(<img src={`./assets/icones/${sale.brandLabels[i]}.png`} style={{height: 30, marginBottom : 5, border: '2px solid white', borderRadius : 15, backgroundColor : 'white'}}/>)
    }

    var brandImg = `./assets/${sale.brandImg}.jpeg`

        return (

            <Col span={{xs: 24, sm: 12}} style={{margin : 10}}>

                <Card

                    hoverable
                    onClick={() => onCardClick()}
                    position='relative'
                    cover={
                    <img alt="Samaya" src={brandImg} style={{height : 200, width : 470}}/>
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
                            <span>Jusqu'à -{sale.maxDiscount}%</span>
                        </div>

                        <span style={{color : 'rgba(0, 0, 0, 0.45)', marginTop : 5}}>{sale.brandFastDesc}</span>
                    </div>
                                        
                </Card>

            </Col>

          )});


    const [isModalVisible, setIsModalVisible] = useState(false);
    const [brand, setBrand] = useState('')
    const [desc, setDesc] = useState('')

    function onCardClick() {
        setIsModalVisible(true);
        console.log('Clic on card detected');
    } 

    const goToSell = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        console.log('clic supp détecté')
    };

  return (

        <div style={{backgroundColor:"#FCF5EE", fontFamily : 'Montserrat'}}>
            <Header/>
            <Label/>
            <Row style={{width : '100%', marginTop  : 10, justifyContent: 'center'}}>
                <h4 style={{fontWeight: "550", fontSize: "16px", lineHeight: "24px", cursor: "pointer", color: "#207872"}}>LES VENTES DU MOMENT</h4>
                <span style={{width: "1px", height: "30px", border: "1px black solid", marginLeft: "15px", marginRight: "15px", alignSelf: "start"}}></span>
                <h4 style={{fontWeight: "550", fontSize: "16px", lineHeight: "24px", cursor: "pointer", color: "#C4C4C4"}}>LES VENTES A VENIR</h4>
            </Row>

            <Modal 
                
                    title="Marque" 

                    width={600}
                    
                    centered 
                    
                    visible={isModalVisible}
                
                    footer={[
                        <Button key="Retour" onClick={handleCancel}>Retour</Button>,

                        <Button key="submit" style={{marginLeft : 215, backgroundColor : '#207872', borderRadius : 40, border : 0}} type="primary" onClick={goToSell}>
                        Se connecter pour accéder à la vente
                        </Button>
                    ]}
                >

                    <p>Picture Organic Clothing est la création de 3 jeunes passionnés de montagne : Jérémy, Julien et Vincent. Leur priorité : se soucier de l’environnement et le préserver. La conception des produits est la plus écologique possible : Ils sont composés de coton biologique, et de matières recyclées, mais ils sont également tous labélisés. Cette marque Française se développe très vite à l’international, grâce à ses innovations écologiques qu’elle crée chaque année. La gamme de Picture s’étend désormais aux vêtements techniques pour le ski et le snowboard, ainsi que des accessoires et vêtements streetwear.</p>

                </Modal>

            <Row style={{width : '80%', margin : 'auto', marginTop  : 10 , justifyContent: 'center'}}>

                {cardsFromDB}
      
            </Row>
            <Footer/>
        </div>
   );
}

