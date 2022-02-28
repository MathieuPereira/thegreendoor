import React from 'react';
import { Card, Col, Row } from 'antd';

export default function Home() {

  return (

        <Row style={{width : '70%', margin : 'auto', justifyContent: 'center'}}>
                
                <Col span={{xs: 24, sm: 12}} style={{margin : 10}}>
                    <Card 
                    hoverable
                    cover={<img alt="example" src='./assets/samaya.jpeg' style={{height : 150, width : 400}}/>}
                    >
                    Samaya
                    </Card>
                </Col>

                <Col span={{xs: 24, md: 12}} style={{margin : 10}}>
                    <Card 
                    hoverable
                    cover={<img alt="example" src='./assets/patagonia.jpeg' style={{height : 150, width : 400}}/>}
                    >
                    Patagonia
                    </Card>
                </Col>

                <Col span={{xs: 24, sm: 12}} style={{margin : 10}}>
                    <Card 
                    hoverable
                    cover={<img alt="example" src='./assets/samaya.jpeg' style={{height : 150, width : 400}}/>}
                    >
                    Samaya
                    </Card>
                </Col>

                <Col span={{xs: 24, md: 12}} style={{margin : 10}}>
                    <Card 
                    hoverable
                    cover={<img alt="example" src='./assets/patagonia.jpeg' style={{height : 150, width : 400}}/>}
                    >
                    Patagonia
                    </Card>
                </Col>

         </Row>

  );
}

