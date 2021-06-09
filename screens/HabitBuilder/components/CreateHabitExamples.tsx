import { Body, Button, CheckBox, Container, Form, Icon, Input, Item, ListItem, Text } from 'native-base';
import { Dimensions, StyleSheet } from 'react-native';
import { IHabitShedule, ScheduleTypes, StatesEnum, weekDayMap } from '../../../constants/interfaces';
import React, { useState } from 'react';

import colours from '../../../constants/Colours';
import { commonStyles } from '../../styles/commonStyles';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
interface iShowHabitsExamplesProps {
    onHasSchownHabitExamples: (step:StatesEnum, scheduleType?: ScheduleTypes)=>void
}


const CreateHabitExamples = (props:iShowHabitsExamplesProps) => {
    const handleNextStep = (step:StatesEnum, scheduleType?: ScheduleTypes)=> {
        props.onHasSchownHabitExamples(step, scheduleType); 
    }

    return(
    <Container style={styles.container}>
        <Container style={styles.actionBandMultipleAction}>
            <Button style={{width:'33.33%', height:'100%'}} transparent onPress={()=>handleNextStep(StatesEnum.setScheduleType)}>
                <Text style={styles.centeredBtnGrayText} uppercase={false}>Cancel</Text>
            </Button>
            <Text style={{...styles.centeredBtnGrayText, width: '33.33%', textAlign:'center', lineHeight: windowHeight*0.08}}>Add Habit</Text>
            <Text style={{width:'33.34%', color:'transparent'}}>Cancel</Text>
        </Container>
        <Container style={{
            marginLeft: windowWidth*0.05,
            marginRight: windowWidth*0.05
        }}>
            <Text style={styles.texts}>
                A fixed habit is something you can commit to
                at regularlyspecified intervals. For example, you
                always can access your threadmill in the basement
                at the same time every week.
            </Text>
            <Text style={styles.texts}>
                A flid habit is something you can commit to
                every week but need a little flexibility on the times.
                Say you need to work around someone else's 
                schedule or can only run when it isn't raining.
            </Text>
            <Text  style={styles.texts}>
                Which do you prefer?
            </Text>
            <Button bordered block style={styles.borderedBtn} onPress={()=>{
                handleNextStep(StatesEnum.setHours, ScheduleTypes.fixed); 
            }}>
                <Text uppercase={false} style={styles.centeredBtnGreenText}>Fixed</Text>
            </Button>
            <Button bordered style={styles.borderedBtn} block onPress = {()=>{
                handleNextStep(StatesEnum.setHours, ScheduleTypes.fluid); 
            }}>
                <Text uppercase={false} style={styles.centeredBtnGreenText}>Fluid</Text>
            </Button>
            
        </Container>
    </Container>
    )
}
export default CreateHabitExamples;

const styles = StyleSheet.create({
    container: {
        paddingTop:0
    },
    texts: {
        color:colours.ltGray,
         marginBottom: 20
    },
    borderedBtn:{
        borderRadius:20,
        borderColor:colours.green,
        marginBottom:10,
        marginTop:10
    },
    ...commonStyles
  });
  