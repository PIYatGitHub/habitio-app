import { Badge, Body, Button, Card, CardItem, Container, Icon, Text } from 'native-base';
import React, { useState } from 'react';

import colours from '../../../constants/Colours';
import { topBarStyles } from '../../styles/topBarStyles';

interface ITopBarProps {
    leftIconName?: string;
    leftText?: string;
    leftOnPress?: Function;
    rightIconName?: string;
    rightText?: string;
    rightOnPress?: Function;
    centerText?: string;
}

const TopBar = (props:ITopBarProps) => {
    const handleCloseDetails = ()=>{
        console.log(`Close Button Pressed`)
    }
        return (
            <Container style={styles.actionBandMultipleAction}>
                <Button style={{width:'33.33%', height:'100%'}} transparent> 
                    <Icon type='FontAwesome5' name={props.leftIconName} onPress={() => props.leftOnPress && props.leftOnPress()} style={{color:colours.dkGray}}/>
                    <Text>{props.leftText}</Text>
                </Button>
                
                <Text style={{...styles.centerText, justifyContent: 'center'}}>{props.centerText}</Text>

                <Button style={{width:'33.33%', height:'100%', justifyContent: 'flex-end'}} transparent> 
                    <Text>{props.rightText}</Text>
                    <Icon type='FontAwesome5' name={props.rightIconName} onPress={() => props.rightOnPress && props.rightOnPress()} style={{color:colours.dkGray}}/>
                </Button>
            </Container>)
}
export default TopBar;

const styles = topBarStyles;