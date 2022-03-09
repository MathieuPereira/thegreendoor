import React from 'react';
import { Tooltip } from 'antd';
import '../stylesheets/labelBar.css';

export default function Label() {

  return (
      
        <div className='labelBar' >
            <Tooltip placement="left" title="Made in France" >
                <img src='/assets/Icones/french_flag.png' alt="Logo" className="label"/>
            </Tooltip>

            <Tooltip placement="left" title="Made in Europe">
                <img src='/assets/Icones/european_flag.png' alt="Logo" className="label"/>
            </Tooltip>

            <Tooltip placement="left" title="Matériaux recyclés">
                <img src='/assets/Icones/recycle_materials.png' alt="Logo" className="label"/>  
            </Tooltip>

            <Tooltip placement="left" title="Matériaux biosourcés">
                <img src='/assets/Icones/biosourced_materials.png' alt="Logo" className="label"/>  
            </Tooltip>

            <Tooltip placement="left" title="Soutien des ONG">
                <img src='/assets/Icones/ong.png' alt="Logo" className="label" />  
            </Tooltip>

            <Tooltip placement="left" title="Emballages recyclés">
                <img src='/assets/Icones/recycle_packaging.png' alt="Logo" className="label"/>  
            </Tooltip>

            <Tooltip placement="left" title="Livraison écolo">
                <img src='/assets/Icones/green_delivery.png' alt="Logo" className="label"/>  
            </Tooltip>

            <Tooltip placement="left" title="Limite ses émissions de co2">
                <img src='/assets/Icones/co2_limited.png' alt="Logo" className="label"/>  
            </Tooltip>
        
        </div>  

  );
}