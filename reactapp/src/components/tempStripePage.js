import React from 'react';
import { Button } from 'antd';


export default function Stripe() {
 
    return (

    <form action="/create-checkout-session" method="POST">
        <button style={{cursor:'pointer', color : 'white', fontSize : 15, backgroundColor: '#207872', borderRadius: 40, border: 0, width : 200, height : 30, marginTop : 10}} type="submit">Passer au paiement 💳 </button>
    </form>

    )

 }
 