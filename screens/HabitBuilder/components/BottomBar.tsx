import { Button, Footer, FooterTab, Icon, Text } from 'native-base';
import React, { useState } from 'react';

import colours from '../../../constants/Colours';

const BottomBar = () => {
    const [selectedTab, setSelectedTab] = useState('habits'); 

    return (
        <Footer>
            <FooterTab style={{
                backgroundColor:'white'
            }}>
                <Button onPress={()=>{ setSelectedTab('shop'); }}>
                    <Icon style={{color:colours.dkGray}} type='FontAwesome5' name='cart-plus'/>
                    <Text style={{color:colours.dkGray}} uppercase={false}>Discover</Text>
                </Button>

                <Button onPress={()=>{setSelectedTab('step');}}>
                    <Icon style={{color:colours.dkGray}} type='FontAwesome5' name='plus'/>
                    <Text style={{color:colours.dkGray}} uppercase={false}>Add Step</Text>
                </Button>
                
                <Button onPress={()=>{setSelectedTab('habit');}}>
                    <Icon style={{color:colours.dkGray}} type='FontAwesome5' name='user-plus'/>
                    <Text style={{color:colours.dkGray}}>Add Habit</Text>
                </Button>
            </FooterTab>
        </Footer>
    );
}
export default BottomBar;