import { Badge, Body, Button, Card, CardItem, Container, Icon, Text } from 'native-base';
import { Dimensions, StyleSheet } from 'react-native';
import { IHabit, ScheduleTypes } from '../../../constants/interfaces';
import React, { useState } from 'react';

import colours from '../../../constants/Colours';
import { habitsHomeViewStyles } from '../../styles/habitsHomeViewStyles';
import NextStepView from './NextStepView';

interface iHabitProps {
    habits: IHabit[]; 
    filterByDay?:boolean;
    filterByWeek?:boolean; 
    onHabitDetails?: (habit:IHabit)=>void
}
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const HabitsHomeView = (props:iHabitProps) => {
    let habits:IHabit[] = Object.assign([], props.habits);
    
    // Remove after debug
    if (habits.length === 0) {
        console.log(`No Habits!`);

        let exampleHabit:IHabit = {
            title: "Work on HabitIO",
            goals: ["Hard working"],
            rewards: ["Play some guitar"],
            positiveMotivators: [],
            negativeMotivators: [],
            notes: '',
            habitId: 0,
            habitSchedule: [{day: 1, fromHour:"10:10", toHour:"10:13"}],
            habitScheduleType: ScheduleTypes.fixed,  
            steps: [],
        } 

        habits.push(exampleHabit)
    }
    let firstHabit:IHabit = habits[0];

    console.log(firstHabit)
    
    if(props.filterByDay){
        habits = habits.filter(habit=>habit.habitScheduleType === ScheduleTypes.fixed);
    } else if(props.filterByWeek){
        habits = habits.filter(habit=>habit.habitScheduleType === ScheduleTypes.fluid);
    }

    const handleOpenHabitDetails =(habit:IHabit) =>{
        console.log(`selectedHabit is: `, habit.habitId);        
        props&& props.onHabitDetails && props.onHabitDetails(habit);
    }
    
    return (        
        <Container>
           {!habits.length ?(
                <Container style={styles.blankHabitsContainer}>               
                    <Text style={styles.blankHabitsContainerText}>You don't have any habits yet.</Text>
                    <Text style={styles.blankHabitsContainerText}>Add your first habit by pressing</Text>
                    <Text style={styles.blankHabitsContainerText}><Icon style={{color:colours.dkGray}} type='FontAwesome5' name='user-plus'/></Text>
                </Container>
           ) :null}
           
           {habits.length ?([
                <NextStepView key='0' habits={props.habits} filterByDay={props.filterByDay} filterByWeek={props.filterByWeek} onHabitDetails={props.onHabitDetails}></NextStepView>,


                <Card key='1' style={{marginLeft:windowWidth*0.05, marginRight:windowWidth*0.05, borderRadius:10}}>
                    <CardItem style={{borderRadius:10}}>
                        <Body style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                            <Text style={styles.centeredGreenText} onPress= {()=>handleOpenHabitDetails(firstHabit)}>Today</Text>
                            <Icon type='FontAwesome5' name='chevron-right' onPress= {()=>handleOpenHabitDetails(firstHabit)}
                                style={{color:colours.ltGray, fontSize: 20}}/>
                        </Body>
                    </CardItem>
                </Card>,


                <Card key='2' style={{marginLeft:windowWidth*0.05, marginRight:windowWidth*0.05, borderRadius:10}}>
                    <CardItem style={{borderRadius:10}}>
                        <Body style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                            <Text style={styles.centeredGreenText} onPress= {()=>handleOpenHabitDetails(firstHabit)}>All Habits</Text>
                            <Icon type='FontAwesome5' name='chevron-right' onPress= {()=>handleOpenHabitDetails(firstHabit)}
                                style={{color:colours.ltGray, fontSize: 20}}/>
                        </Body>
                    </CardItem>
                </Card>
            ]): null}
        </Container>
    )
}
export default HabitsHomeView;

const styles = habitsHomeViewStyles;
  