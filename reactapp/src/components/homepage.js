import React, {useState} from 'react';
import { Card, Col, Row, Modal, Button } from 'antd';
import {CloseOutlined} from "@ant-design/icons";

export default function Home() {

    const { Meta } = Card;

    const [isModalVisible, setIsModalVisible] = useState(false);

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

        <Row style={{width : '80%', margin : 'auto', marginTop  : 10 , justifyContent: 'center'}}>

        <Modal 
        
            title="Marque" 
            
            centered 
            
            visible={isModalVisible} 

            onClick={handleCancel}
        
            footer={[
                <Button key="Retour" onClick={handleCancel}>Retour</Button>,

                <Button key="submit" style={{marginLeft : 135, backgroundColor : '#207872', borderRadius : 40, border : 0}} type="primary" onClick={goToSell}>
                Se connecter pour accéder à la vente
                </Button>
            ]}
        >

            <p>Picture Organic Clothing est la création de 3 jeunes passionnés de montagne : Jérémy, Julien et Vincent. Leur priorité : se soucier de l’environnement et le préserver. La conception des produits est la plus écologique possible : Ils sont composés de coton biologique, et de matières recyclées, mais ils sont également tous labélisés. Cette marque Française se développe très vite à l’international, grâce à ses innovations écologiques qu’elle crée chaque année. La gamme de Picture s’étend désormais aux vêtements techniques pour le ski et le snowboard, ainsi que des accessoires et vêtements streetwear.</p>

        </Modal>

                <Col span={{xs: 24, sm: 12}} style={{margin : 10}}>

                    <Card
                            hoverable
                            onClick={() => onCardClick()}
                            position='relative'
                            cover={
                            <img alt="Samaya" src='./assets/samaya.jpeg' style={{height : 200, width : 470}}/>
                            }
                        >
                            <div style={{position : 'absolute', top: 10, left : 430}}>
                                <img src="./assets/icones/french_flag.png" style={{height: 30, marginBottom : 5, border: '2px solid white', borderRadius : 15, backgroundColor : 'white'}}/>
                                <img src="./assets/icones/european_flag.png"  style={{height: 30, marginBottom : 5, border: '2px solid white', borderRadius : 15, backgroundColor : 'white'}}/>
                                <img src="./assets/icones/co2_limited.png"  style={{height: 30, marginBottom : 5, border: '2px solid white', borderRadius : 15, backgroundColor : 'white'}}/>
                            </div>
                            <div 
                            style={{height : 20, padding: 0, marginTop : 0, display : 'flex', flexDirection : 'column', justifyContent : 'center' }}
                            >
                                <div style={{display : 'flex', flexDirection : 'row', justifyContent : 'space-between' }}>
                                    <span style={{fontSize : 16, fontWeight: "bold"}}>Marque</span>
                                    <span>Jusqu'à -XX%</span>
                                </div>

                                <span style={{color : 'rgba(0, 0, 0, 0.45)', marginTop : 5}}>Description rapide de la marque</span>
                            </div>
                            
                    </Card>

                </Col>

                <Col span={{xs: 24, sm: 12}} style={{margin : 10}}>

                    <Card
                        hoverable
                        onClick={() => onCardClick()}
                        position='relative'
                        cover={
                        <img alt="Samaya" src='./assets/picture.jpeg' style={{height : 200, width : 470}}/>
                        }
                    >
                        <div style={{position : 'absolute', top: 10, left : 430}}>
                            <img src="./assets/icones/biosourced_materials.png" style={{height: 30, marginBottom : 5, border: '2px solid white', borderRadius : 15, backgroundColor : 'white'}}/>
                            <img src="./assets/icones/green_delivery.png"  style={{height: 30, marginBottom : 5, border: '2px solid white', borderRadius : 15, backgroundColor : 'white'}}/>
                            <img src="./assets/icones/ong.png"  style={{height: 30, marginBottom : 5, border: '2px solid white', borderRadius : 15, backgroundColor : 'white'}}/>
                        </div>
                        <div 
                        style={{height : 20, padding: 0, marginTop : 0, display : 'flex', flexDirection : 'column', justifyContent : 'center' }}
                        >
                            <div style={{display : 'flex', flexDirection : 'row', justifyContent : 'space-between' }}>
                                <span style={{fontSize : 16, fontWeight: "bold"}}>Marque</span>
                                <span>Jusqu'à -XX%</span>
                            </div>

                            <span style={{color : 'rgba(0, 0, 0, 0.45)', marginTop : 5}}>Description rapide de la marque</span>
                        </div>
                        
                    </Card>
                
                </Col>

                <Col span={{xs: 24, sm: 12}} style={{margin : 10}}>

                    <Card
                            hoverable
                            onClick={() => onCardClick()}
                            position='relative'
                            cover={
                            <img alt="Samaya" src='./assets/norrona.jpeg' style={{height : 200, width : 470}}/>
                            }
                        >
                            <div style={{position : 'absolute', top: 10, left : 430}}>
                                <img src="./assets/icones/french_flag.png" style={{height: 30, marginBottom : 5, border: '2px solid white', borderRadius : 15, backgroundColor : 'white'}}/>
                                <img src="./assets/icones/recycle_materials.png"  style={{height: 30, marginBottom : 5, border: '2px solid white', borderRadius : 15, backgroundColor : 'white'}}/>
                            </div>
                            <div 
                            style={{height : 20, padding: 0, marginTop : 0, display : 'flex', flexDirection : 'column', justifyContent : 'center' }}
                            >
                                <div style={{display : 'flex', flexDirection : 'row', justifyContent : 'space-between' }}>
                                    <span style={{fontSize : 16, fontWeight: "bold"}}>Marque</span>
                                    <span>Jusqu'à -XX%</span>
                                </div>

                                <span style={{color : 'rgba(0, 0, 0, 0.45)', marginTop : 5}}>Description rapide de la marque</span>
                            </div>
                            
                    </Card>

                </Col>

                <Col span={{xs: 24, sm: 12}} style={{margin : 10}}>

                    <Card
                        hoverable
                        onClick={() => onCardClick()}
                        position='relative'
                        cover={
                        <img alt="Samaya" src='./assets/icebreaker.jpeg' style={{height : 200, width : 470}}/>
                        }
                    >
                        <div style={{position : 'absolute', top: 10, left : 430}}>
                            <img src="./assets/icones/vegan.png" style={{height: 30, marginBottom : 5, border: '2px solid white', borderRadius : 15, backgroundColor : 'white'}}/>
                            <img src="./assets/icones/recycle_packaging.png"  style={{height: 30, marginBottom : 5, border: '2px solid white', borderRadius : 15, backgroundColor : 'white'}}/>
                        </div>
                        <div 
                        style={{height : 20, padding: 0, marginTop : 0, display : 'flex', flexDirection : 'column', justifyContent : 'center' }}
                        >
                            <div style={{display : 'flex', flexDirection : 'row', justifyContent : 'space-between' }}>
                                <span style={{fontSize : 16, fontWeight: "bold"}}>Marque</span>
                                <span>Jusqu'à -XX%</span>
                            </div>

                            <span style={{color : 'rgba(0, 0, 0, 0.45)', marginTop : 5}}>Description rapide de la marque</span>
                        </div>
                        
                    </Card>

                </Col>

         </Row>

  );
}

