import { Button, Container, Content, Form, Icon, Input, Item, Label, List, ListItem, Text } from 'native-base';
import { Dimensions, StyleSheet } from 'react-native';
import { IHabit, ScheduleTypes, StatesEnum } from '../../../constants/interfaces';
import React, { useState } from 'react';

import colours from '../../../constants/Colours';
import { commonStyles } from '../../styles/commonStyles';
import { convertNumberToWeekday } from '../../../utils/convertWeekday';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
interface IEditHabitGoalsProps {
    habit:IHabit;
    onCancel:()=>void;
    onEditTriggered: ()=>void
}

const Habit_Details = (props:IEditHabitGoalsProps) => {
    console.log(`DATA...`, props.habit);
    console.log(`>>>>>>>>>>>>>>>>>>>>>>>>>`);
    
    
    return(
    <Container style={styles.container}>
        <Container>
            <Content>
                <Container style={{marginLeft:windowWidth*0.05,marginRight:windowWidth*0.05, height:windowHeight*0.3, maxHeight:windowHeight*0.3}}>
                    <Text style={{...styles.centeredBtnGrayText, fontSize:18}}>{props.habit.title}</Text>
                    <Text>Goals</Text>
                    <List>                        
                    {props.habit.goals.map(goal=> <ListItem style={{...styles.noBBW, height:windowHeight*0.06}}><Text>{goal}</Text></ListItem>)}
                    </List>
                    <Icon onPress={props.onEditTriggered} style={{ width:'100%', textAlign: 'right',  color:colours.green}} type='FontAwesome5' name='pen'/> 
                </Container>

                <Container style={{marginLeft:windowWidth*0.05,marginRight:windowWidth*0.05, height:windowHeight*0.3, maxHeight:windowHeight*0.3}}>
                    <Text>Schedule ({props.habit.habitScheduleType})</Text>
                    <List>                        
                        {props.habit.habitSchedule.map(schedule=> <ListItem style={{...styles.noBBW, height:windowHeight*0.06}}>
                            {props.habit.habitScheduleType === ScheduleTypes.fixed?
                             <Text>{convertNumberToWeekday(schedule.day)} between {schedule.fromHour.toUpperCase()} and {schedule.toHour.toUpperCase()}</Text>
                            :<Text>{convertNumberToWeekday(schedule.day)} at {schedule.fromHour.toUpperCase()}</Text>
                            }
                            </ListItem>)}
                    </List>  
                    <Icon onPress={props.onEditTriggered} style={{width:'100%', textAlign: 'right', color:colours.green}} type='FontAwesome5' name='pen'/>                  
                </Container>

                <Button style={styles.bottomBtn} bordered block onPress={()=> props.onCancel()}><Text style={{...styles.centeredBtnGreenText}} uppercase={false}>Cancel</Text></Button>
            </Content>            
        </Container>
    
    </Container>
    )
}
export default Habit_Details;

const styles = StyleSheet.create({
    container: {
        paddingTop:0
    },
    bottomBtn: {
        borderRadius:10,
        borderWidth:2,
        borderColor:colours.green
    },
    ...commonStyles
  });
  