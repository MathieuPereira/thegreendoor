import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from "react-router-dom";

import {Modal, Button, Divider} from 'antd';


export default function BasketModal(props) {

    const [isModalVisible, setIsModalVisible] = useState(false);

    function onButtonClick() {
         setIsModalVisible(true);
     } 

     const handleCancel = () => {
        setIsModalVisible(false);
     };

    return (

        <div>

        <Button type="primary" onClick={onButtonClick}>
          Mettre au panier
        </Button>

        <Modal 
                
            title="Votre article a bien été ajouté au panier 😎" 

            width={600}
                    
            centered 
                    
            visible={isModalVisible}

            onCancel={handleCancel}
                
            footer={[
                <div style={{display : 'flex', flexDirection : 'row', justifyContent : 'space-between'}}>
                    <Button key="Continue" ><Link to="/">Continuer mes achats</Link></Button>

                    <Button key="submit" style={{backgroundColor: '#207872', borderRadius: 40, border: 0}}
                            type="primary" onClick={() => console.log("Kikou")}>
                        Voir mon panier
                    </Button>
                </div>
            ]}
            >
            <div style={{display : 'flex', alignItems : 'center'}}>

                <div>
                    <img style={{width: 120, height: 150, marginRight : 20}} src={`/assets/Produits/picture_1.jpeg`} alt=""/>
                </div>

                <div style={{display : 'flex', justifyContent : 'space-between', fontSize : 16, fontFamily : 'Montserrat', width : '100%'}}>
                
                    <div style={{display : 'flex', flexDirection : 'column'}}>
                        <p>NOM DU PRODUIT</p>
                        <p>TAILLE : <span style={{color : '#207872', fontWeight: 'bold'}}>M</span></p>
                    </div>

                    <div style={{display : 'flex', flexDirection : 'column', textAlign : 'right'}}>
                        <p style={{marginBottom : 5}}>Prix : <span style={{color : '#207872', fontWeight: 'bold'}}>264,00 €</span></p>
                        <p style={{fontSize: 15, textDecoration: "line-through"}}> 330,00 €</p>
                    </div>

                </div>
                
            </div>

        </Modal>

        </div>

    )
}