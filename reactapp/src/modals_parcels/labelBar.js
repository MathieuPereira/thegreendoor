import React from 'react';
import { Tooltip, Affix } from 'antd';

export default function Label() {

  return (
    <Affix>
        <div style={{display : 'flex', flexDirection : 'column', justifyContent: 'center', paddingTop : 10, paddingBottom : 'auto', marginLeft : '95%', width : 53, position : 'relative', borderRadius : 50, backgroundColor : 'white', border: '3px solid #207872'}}>
            <Tooltip placement="left" title="Made in France" >
                <img src='./assets/Icones/french_flag.png' alt="Logo" style={{height: 30, margin : 7}}/>
            </Tooltip>

            <Tooltip placement="left" title="Made in Europe">
                <img src='./assets/Icones/european_flag.png' alt="Logo" style={{height: 30, margin : 7}}/>
            </Tooltip>

            <Tooltip placement="left" title="Matériaux recyclés">
                <img src='./assets/Icones/recycle_materials.png' alt="Logo" style={{height: 30, margin : 7}}/>  
            </Tooltip>

            <Tooltip placement="left" title="Matériaux biosourcés">
                <img src='./assets/Icones/biosourced_materials.png' alt="Logo" style={{height: 30, margin : 7}}/>  
            </Tooltip>

            <Tooltip placement="left" title="Soutien des ONG">
                <img src='./assets/Icones/ong.png' alt="Logo" style={{height: 30, marginBottom : 10, margin : 7}}/>  
            </Tooltip>

            <Tooltip placement="left" title="Emballages recyclés">
                <img src='./assets/Icones/recycle_packaging.png' alt="Logo" style={{height: 30, margin : 7}}/>  
            </Tooltip>

            <Tooltip placement="left" title="Livraison écolo">
                <img src='./assets/Icones/green_delivery.png' alt="Logo" style={{height: 35, margin : 7}}/>  
            </Tooltip>

            <Tooltip placement="left" title="Limite ses émissions de co2">
                <img src='./assets/Icones/co2_limited.png' alt="Logo" style={{height: 30, margin : 7}}/>  
            </Tooltip>
        
        </div>  
    </Affix> 

  );
}