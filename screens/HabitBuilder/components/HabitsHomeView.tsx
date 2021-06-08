import { Badge, Body, Button, Card, CardItem, Container, Icon, Text } from 'native-base';
import { Dimensions, StyleSheet } from 'react-native';
import { IHabit, ScheduleTypes } from '../../../constants/interfaces';
import React, { useState } from 'react';

import colours from '../../../constants/Colours';
import { habitsHomeViewStyles } from '../../styles/habitsHomeViewStyles';
import { convertNumberToWeekday } from '../../../utils/convertWeekday';
import autoMergeLevel1 from 'redux-persist/es/stateReconciler/autoMergeLevel1';
import { marginTop } from '../../../utils/generic';

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
           
           {habits.length ?(
                [
                <Card key='0' style={{marginLeft:windowWidth*0.05, marginRight:windowWidth*0.05, borderRadius:10}}>
                    <CardItem style={{borderRadius:10}}>
                        <Body style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                            <Text style={styles.centeredGreenText} onPress= {()=>handleOpenHabitDetails(firstHabit)}>Next Step</Text>
                            <Icon type='FontAwesome5' name='chevron-right' onPress= {()=>handleOpenHabitDetails(firstHabit)}
                            style={{color:colours.ltGray, fontSize: 20}}/>
                            
                        </Body>
                    </CardItem>
                    <CardItem style={{borderRadius:10}}>
                        <Body style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                            <Text style={styles.centeredBtnGrayText} onPress= {()=>handleOpenHabitDetails(firstHabit)}>{firstHabit.title}</Text>
                        </Body>
                    </CardItem>
                    <CardItem footer style={{borderRadius:10}}>
                        <Body style={{display:'flex', flexDirection:'row', flexWrap:'wrap', alignContent:'center'}}>
                            {firstHabit.habitSchedule.map(habitSchedule=>{
                                return(   
                                    <>
                                    <Icon type='FontAwesome5' name='clock' solid={false} onPress= {()=>handleOpenHabitDetails(firstHabit)}
                                    style={{color:colours.ltGray, fontSize: 13, lineHeight:20, marginRight:'2.5%'}}/>                                                              
                                    <Text onPress= {()=>handleOpenHabitDetails(firstHabit)} style={{lineHeight:20, maxWidth:'100%'}}>{props.filterByDay?
                                    ``:
                                    `Every `}
                                    {convertNumberToWeekday(habitSchedule.day)}{props.filterByDay?
                                    ` between ${habitSchedule.fromHour.toUpperCase()} and ${habitSchedule.toHour.toUpperCase()}.`:
                                    ` at ${habitSchedule.fromHour.toUpperCase()}.`}
                                    </Text>
                                    </>
                                )
                            })}
                        </Body>
                        
                    </CardItem>
                </Card>,


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
                </Card>]
           ): null}
        </Container>
    )
}
export default HabitsHomeView;

const styles = habitsHomeViewStyles;
  