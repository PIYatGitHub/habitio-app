import { Badge, Body, Button, Card, CardItem, Container, Icon, Text } from 'native-base';
import { Dimensions, StyleSheet } from 'react-native';
import { IHabit, ScheduleTypes } from '../../../constants/interfaces';
import React, { useState } from 'react';
import { topBarStyles } from '../../styles/topBarStyles';
import { convertNumberToWeekday } from '../../../utils/convertWeekday';

import colours from '../../../constants/Colours';

interface INextStepViewProps {
    habits: IHabit[]; 
    filterByDay?:boolean;
    filterByWeek?:boolean; 
    onHabitDetails?: (habit:IHabit)=>void
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const NextStepView = (props:INextStepViewProps) => {

    const handleOpenHabitDetails =(habit:IHabit) =>{
        console.log(`selectedHabit is: `, habit.habitId);        
        props&& props.onHabitDetails && props.onHabitDetails(habit);
    }
    
    let habits:IHabit[] = Object.assign([], props.habits);
    // Remove after debug
    if (habits.length === 0) {
        console.log(`No Habits!`);

        let exampleHabit:IHabit = {
            title: "Work on HabitIO",
            goals: ["Hard working"],
            rewards: ["Play some guitar"],
            habitId: 0,
            habitSchedule: [{day: 1, fromHour:"10:10", toHour:"10:13"}],
            habitScheduleType: ScheduleTypes.fixed
        } 

        habits.push(exampleHabit)
    }
    let firstHabit:IHabit = habits[0];

    console.log(firstHabit)

    return (
        <Card style={{marginLeft:windowWidth*0.05, marginRight:windowWidth*0.05, borderRadius:10}}>
            <CardItem style={{borderRadius:10}}>
                <Body style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style={styles.centeredGreenText} onPress= {()=>handleOpenHabitDetails(firstHabit)}>Next Step</Text>
                    <Icon type='FontAwesome5' name='chevron-right' onPress= {()=>handleOpenHabitDetails(firstHabit)}
                    style={{color:colours.ltGray, fontSize: 20}}/>
                    
                </Body>
            </CardItem>
            <CardItem style={{borderRadius:10}}>
                <Body style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style={styles.centeredBtnGrayText} onPress= {()=>handleOpenHabitDetails(firstHabit)}>I'm becoming even more {firstHabit.goals[0]}</Text>
                </Body>
            </CardItem>
            <CardItem style={{borderRadius:10}}>
                <Body style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style={styles.centeredBtnGrayTextSmall} onPress= {()=>handleOpenHabitDetails(firstHabit)}>And I {firstHabit.title}</Text>
                </Body>
            </CardItem>
            <CardItem footer style={{borderRadius:10}}>
                <Body style={{display:'flex', flexDirection:'row', flexWrap:'wrap', alignContent:'center'}}>
                    {firstHabit.habitSchedule.map((habitSchedule, index)=>{
                        return(   
                            <Text key={index}>
                                <Icon type='FontAwesome5' name='clock' solid={false} onPress= {()=>handleOpenHabitDetails(firstHabit)}
                                    style={{color:colours.ltGray, fontSize: 13, lineHeight:20, marginRight:'2.5%'}}/>                                                              
                                <Text onPress= {()=>handleOpenHabitDetails(firstHabit)} style={{lineHeight:20, maxWidth:'100%'}}>{props.filterByDay?
                                ``:
                                `Every `}
                                {convertNumberToWeekday(habitSchedule.day)}{props.filterByDay?
                                ` between ${habitSchedule.fromHour.toUpperCase()} and ${habitSchedule.toHour.toUpperCase()}.`:
                                ` at ${habitSchedule.fromHour.toUpperCase()}.`}
                                </Text>
                            </Text>
                        )
                    })}
                </Body>
                
            </CardItem>
            <CardItem style={{borderRadius:10}}>
                <Body style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style={styles.centeredBtnGrayTextSmall} onPress= {()=>handleOpenHabitDetails(firstHabit)}>And when i'm done I will {firstHabit.rewards[0]}</Text>
                </Body>
            </CardItem>
            
            <CardItem style={{borderRadius:10}}>
                <Body style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                    <Button>
                        <Text>Done</Text>
                        <Icon type='FontAwesome5' name='check'/>
                    </Button>
                    <Button>
                        <Icon type='FontAwesome5' name='forward'/>
                        <Text>Skip</Text>
                    </Button>
                </Body>
            </CardItem>
        </Card>
    );
}
export default NextStepView;

const styles = topBarStyles;