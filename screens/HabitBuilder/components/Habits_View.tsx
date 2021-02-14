import { Badge, Button, Container, Icon, Text } from 'native-base';
import { Dimensions, StyleSheet } from 'react-native';
import { IHabit, ScheduleTypes } from '../../../constants/interfaces';

import React from 'react';
import colours from '../../../constants/Colours';
import { commonStyles } from '../../styles/commonStyles';
import { convertNumberToWeekday } from '../../../utils/convertWeekday';

interface iHabitProps {
    habits: IHabit[]; 
    filterByDay?:boolean;
    filterByWeek?:boolean; 
}
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const Habits_View = (props:iHabitProps) => {
    let habits:IHabit[] = Object.assign([], props.habits);

    if(props.filterByDay){
        habits = habits.filter(habit=>habit.habitScheduleType === ScheduleTypes.fixed);
        console.log(`filtered habits by day`, habits);
        
    } else if(props.filterByWeek){
        habits = habits.filter(habit=>habit.habitScheduleType === ScheduleTypes.fluid);
        console.log(`filtered habits by week`, habits);
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
                   <Container style={styles.container}>
                       <Container style={{display:'flex', flexDirection:'row', justifyContent:'space-between', borderRadius:10, margin:10}}>
                           <Text style={styles.centeredBtnGrayText}>{habit.title}</Text>
                           <Icon type='FontAwesome5' name='chevron-right' style={{color:colours.ltGray}}/>
                       </Container>
                       
                       <Container style={{borderRadius:10,margin:10}} >
                           {habit.habitSchedule.map(habitSchedule=>{
                            return(   
                                <>                            
                                <Text>{props.filterByDay?
                                ``:
                                `Every `}
                                {convertNumberToWeekday(habitSchedule.day)}{props.filterByDay?
                                ` between ${habitSchedule.fromHour.toUpperCase()} and ${habitSchedule.toHour.toUpperCase()}.`:
                                ` at ${habitSchedule.fromHour.toUpperCase()}.`}
                                </Text>
                                </>
                                )
                            })}
                       </Container> 
                   </Container>
               )
           })}
        </Container>
    )
}
export default Habits_View;

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
  