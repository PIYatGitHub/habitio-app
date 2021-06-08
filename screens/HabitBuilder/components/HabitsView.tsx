import { Badge, Body, Button, Card, CardItem, Container, Icon, Text } from 'native-base';
import { Dimensions, StyleSheet } from 'react-native';
import { IHabit, ScheduleTypes } from '../../../constants/interfaces';
import React, { useState } from 'react';

import colours from '../../../constants/Colours';
import { commonStyles } from '../../styles/commonStyles';
import { convertNumberToWeekday } from '../../../utils/convertWeekday';

interface iHabitProps {
    habits: IHabit[]; 
    filterByDay?:boolean;
    filterByWeek?:boolean; 
    onHabitDetails?: (habit:IHabit)=>void
}
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const HabitsView = (props:iHabitProps) => {
    let habits:IHabit[] = Object.assign([], props.habits);
    
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
               <Text style={styles.blankHabitsContainerText}>Add your first habit using the + sign.</Text>
               </Container>
           ) :null}
           
           {habits.map(habit=>{
               return (
                    <Card style={{marginLeft:windowWidth*0.05, marginRight:windowWidth*0.05, borderRadius:10}}>
                        <CardItem style={{borderRadius:10}}>
                            <Body style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                                <Text style={styles.centeredBtnGrayText} onPress= {()=>handleOpenHabitDetails(habit)}>{habit.title}</Text>
                                <Icon type='FontAwesome5' name='chevron-right' onPress= {()=>handleOpenHabitDetails(habit)}
                                style={{color:colours.ltGray, fontSize: 20}}/>
                                
                            </Body>
                        </CardItem>
                        <CardItem footer style={{borderRadius:10}}>
                            <Body style={{display:'flex', flexDirection:'row', flexWrap:'wrap', alignContent:'center'}}>
                                {habit.habitSchedule.map(habitSchedule=>{
                                    return(   
                                        <>
                                        <Icon type='FontAwesome5' name='clock' solid={false} onPress= {()=>handleOpenHabitDetails(habit)}
                                        style={{color:colours.ltGray, fontSize: 13, lineHeight:20, marginRight:'2.5%'}}/>                                                              
                                        <Text onPress= {()=>handleOpenHabitDetails(habit)} style={{lineHeight:20, maxWidth:'100%'}}>{props.filterByDay?
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
                    </Card>
               )
           })}
        </Container>
    )
}
export default HabitsView;

const styles = StyleSheet.create({
    blankHabitsContainer:{
        marginLeft:windowWidth*0.1,
        marginRight:windowWidth*0.1,
        marginTop:windowHeight*0.2
    },
    blankHabitsContainerText:{
        color: colours.ltGray,
        fontSize:20,
        textAlign:'center'
    },
    container: {
        display:'flex',
        flexDirection:'column',
        justifyContent:'flex-start',
        marginLeft:windowWidth*0.05,
        marginRight:windowWidth*0.05,
        marginTop:5,
        borderWidth: 2,
        borderColor:colours.ltGray,
        borderRadius:10,
        height: windowHeight*0.3,
        maxHeight: windowHeight*0.3     
    },
    flexRowWrap: {
        display:'flex',
        flexDirection:'row', 
        flexWrap:'wrap'
    },
    ...commonStyles
  });
  