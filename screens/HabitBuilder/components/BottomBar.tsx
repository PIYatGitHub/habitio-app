import { Button, Footer, FooterTab, Icon, Text } from 'native-base';
import React, { useState } from 'react';

import colours from '../../../constants/Colours';
import { IUser, IUserStateAction } from '../../../constants/interfaces';

const BottomBar = (props: { reduxUserState: (arg0: IUserStateAction) => void, authenticatedUser: IUser; navigation: string[]}) => {
    const openScreen = (screenName:string) => {
        console.log(`openScreen: `, screenName);

        props.navigation.push(screenName);
    }

    return (
        <Footer>
            <FooterTab style={{
                backgroundColor:'white'
            }}>
                <Button onPress={()=>{openScreen("ShopScreen")}}>
                    <Icon style={{color:colours.dkGray}} type='FontAwesome5' name='cart-plus'/>
                    <Text style={{color:colours.dkGray}} uppercase={false}>Discover</Text>
                </Button>

                <Button onPress={()=>{openScreen("EditStepScreen");}}>
                    <Icon style={{color:colours.dkGray}} type='FontAwesome5' name='plus'/>
                    <Text style={{color:colours.dkGray}} uppercase={false}>Add Step</Text>
                </Button>
                
                <Button onPress={()=>{openScreen("EditHabitsScreen");}}>
                    <Icon style={{color:colours.dkGray}} type='FontAwesome5' name='user-plus'/>
                    <Text style={{color:colours.dkGray}}>Add Habit</Text>
                </Button>
            </FooterTab>
        </Footer>
    );
}
export default BottomBar;