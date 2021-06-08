import { Badge, Body, Button, Card, CardItem, Container, Icon, Text } from 'native-base';
import { Dimensions, StyleSheet } from 'react-native';
import { IHabit, ScheduleTypes } from '../../../constants/interfaces';
import React, { useState } from 'react';

import colours from '../../../constants/Colours';
import { topBarStyles } from '../../styles/topBarStyles';
import { convertNumberToWeekday } from '../../../utils/convertWeekday';

interface ITopBarProps {
    tab: string;
    show: boolean;
}

const TopBar = (props:ITopBarProps) => {
    
    const handleTriggerHabitCreate = ()=>{
        console.log(`Menu Button Pressed`)
    }
    
    const handleCloseDetails = ()=>{
        console.log(`Menu Button Pressed`)
    }

    if (props.tab !== 'settings' && !props.show){
        return (
            <Container style={styles.actionBandMultipleAction}>
                <Button style={styles.rightActionBtn} transparent onPress = {handleTriggerHabitCreate}>
                    <Icon style={styles.btnMenu} type='FontAwesome5' name='ellipsis-v'/>
                </Button> 
                <Text style={styles.centerText}>My habits</Text>
                <Text style={styles.placeholder} uppercase={false}>+</Text>
            </Container>
        )
    }

    if (props.show){
        return (
            <Container style={styles.actionBandMultipleAction}>
                <Button style={{width:'33.33%', height:'100%'}} transparent> 
                    <Icon type='FontAwesome5' name='chevron-left' onPress={handleCloseDetails} style={{color:colours.dkGray}}/>
                </Button>
                
                <Text style={styles.centerText}>Habits</Text>
                <Text style={styles.placeholder} uppercase={false}>+</Text>
            </Container>)
    }
    return null; 
}
export default TopBar;

const styles = topBarStyles;