import { Body, Button, Card, CardItem, Container, Content, Form, Icon, Input, Item, Label, List, ListItem, Text } from 'native-base';
import { Dimensions, StyleSheet } from 'react-native';
import { IHabit, ScheduleTypes, StatesEnum } from '../../../constants/interfaces';
import React, { Fragment, useState } from 'react';

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

const HabitDetails = (props:IEditHabitGoalsProps) => {
    return(
    <Container style={styles.container}>
        <Container>
            <Content>
                <Card style={{marginLeft:windowWidth*0.05,marginRight:windowWidth*0.05, borderRadius:10}}>
                    <CardItem style={{ borderRadius:10}}>
                        <Body>
                            <Text style={{...styles.centeredBtnGrayText, fontSize:18}}>{props.habit.title}</Text>
                            <Text>Goals: </Text>
                            <List style={{maxWidth:'100%'}}>                        
                            {props.habit.goals.map(goal=> <ListItem style={{...styles.noBBW, height:windowHeight*0.06}}>
                                <Icon type='FontAwesome5' name='bullseye' solid={false} style={{marginRight: '2.5%', fontSize:13}}/>
                                <Text>{goal}</Text>
                            </ListItem>)}
                            </List>
                            <Icon onPress={props.onEditTriggered} style={{ width:'100%', textAlign: 'right',  color:colours.green, fontSize:18}} type='FontAwesome5' name='pen'/> 
                        </Body>
                    </CardItem>
                </Card>
                {/* <Container style={{marginLeft:windowWidth*0.05,marginRight:windowWidth*0.05, height:windowHeight*0.3, maxHeight:windowHeight*0.3}}>
                    <
                </Container> */}
                <Card style={{marginLeft:windowWidth*0.05,marginRight:windowWidth*0.05, borderRadius:10, marginTop:windowHeight*0.05}}>
                    <CardItem style={{ borderRadius:10}}>
                        <Body>
                            <Text>Schedule ({props.habit.habitScheduleType})</Text>
                            <List style={{maxWidth:'100%'}}>                        
                                {props.habit.habitSchedule.map(schedule=> <ListItem style={{...styles.noBBW, height:windowHeight*0.06}}>                            
                                    <Icon type='FontAwesome5' name='clock' style = {{fontSize:13, marginRight: '2.5%'}} solid={false}/>
                                    {props.habit.habitScheduleType === ScheduleTypes.fixed?
                                    <Text>{convertNumberToWeekday(schedule.day)} between {schedule.fromHour.toUpperCase()} and {schedule.toHour.toUpperCase()}</Text>
                                    :<Text>{convertNumberToWeekday(schedule.day)} at {schedule.fromHour.toUpperCase()}</Text>
                                    }
                                </ListItem>)}
                            </List>  
                            <Icon onPress={props.onEditTriggered} style={{width:'100%', textAlign: 'right', color:colours.green, fontSize:18}} type='FontAwesome5' name='pen'/>                  
                        </Body>
                    </CardItem>
                </Card>
            </Content>            
        </Container>
    
    </Container>
    )
}
export default HabitDetails;

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
  