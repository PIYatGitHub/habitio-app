import { Badge, Body, Button, Card, CardItem, Container, Icon, Text } from 'native-base';
import { Dimensions, StyleSheet } from 'react-native';
import { IHabit, ScheduleTypes } from '../../../constants/interfaces';
import React, { useState } from 'react';

import colours from '../../../constants/Colours';
import { topBarStyles } from '../../styles/topBarStyles';
import { convertNumberToWeekday } from '../../../utils/convertWeekday';

interface iHabitProps {
    habits: IHabit[]; 
    filterByDay?:boolean;
    filterByWeek?:boolean; 
    onHabitDetails?: (habit:IHabit)=>void
}

const TopBar = () => {
    
    const handleTriggerHabitCreate = ()=>{
        console.log(`Create Habit Pressed`)
    }
    
    return (        
        <Container style={styles.actionBandMultipleAction}>
            <Text style={styles.placeholder} uppercase={false}>+</Text>
            <Text style={styles.centerText}>My habits</Text>
            <Button style={styles.rightActionBtn} transparent onPress = {handleTriggerHabitCreate}>
                <Text uppercase={false} style={styles.btnAddHabit}>+</Text>
            </Button> 
        </Container>
    )
}
export default TopBar;

const styles = topBarStyles;