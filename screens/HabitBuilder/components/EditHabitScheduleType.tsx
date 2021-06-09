import { Button, Container, Content, Form, Icon, Input, Item, Text } from 'native-base';
import { Dimensions, StyleSheet } from 'react-native';
import { IHabit, ScheduleTypes, StatesEnum } from '../../../constants/interfaces';
import React, { useState } from 'react';

import colours from '../../../constants/Colours';
import { commonStyles } from '../../styles/commonStyles';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
interface IEditHabitScheduleTypeProps {
    onSetScheduleType: (scheduleType:ScheduleTypes, step:StatesEnum)=>void;
    habitToEdit?:IHabit; 
}


const EditHabitScheduleType = (props:IEditHabitScheduleTypeProps) => {
    const selectedSchType = props.habitToEdit ? props.habitToEdit.habitScheduleType : ScheduleTypes.unknown;
    const handleNextStep = (scheduleType:ScheduleTypes, status:StatesEnum)=> {
       props.onSetScheduleType(scheduleType, status); 
    }
    
    return(
    <Container style={styles.container}>
        <Container style={{...styles.actionBandSingleAction, justifyContent:'flex-start'}}>
            <Button transparent onPress={()=>handleNextStep(ScheduleTypes.unknown,StatesEnum.setGoals)}>
                <Text style={styles.centeredBtnGrayText} uppercase={false}><Icon style={{color:colours.dkGray, fontSize:20}} type='FontAwesome5' name='chevron-left'/></Text>
            </Button>
        </Container>
        <Container style={{marginLeft:windowWidth*0.05, marginRight:windowWidth*0.05}}>    
            <Content>        
                <Text style={{color:colours.ltGray, marginBottom:40}}>Do you want a  fixed habit (set M-F schedule) or a fluid one (one regular appointment
                    to set your weekly schedule)? 
                </Text>
                <Button 
                block
                style={styles.borderedBtn}
                onPress={()=>handleNextStep(ScheduleTypes.fixed,StatesEnum.setHours)}
                bordered active = {selectedSchType === ScheduleTypes.fixed}>
                    <Text uppercase={false} style={styles.centeredBtnGreenText}>Fixed</Text>
                </Button>        
                <Button 
                block
                style={styles.borderedBtn}
                onPress={()=>handleNextStep(ScheduleTypes.fluid,StatesEnum.setHours)} 
                bordered active = {selectedSchType === ScheduleTypes.fluid}>
                    <Text uppercase={false} style={styles.centeredBtnGreenText}>Fluid</Text>
                </Button>        
                <Button 
                block
                style={styles.borderedBtn}
                onPress={()=>handleNextStep(ScheduleTypes.unknown, StatesEnum.showExamples)}
                bordered>
                    <Text uppercase={false} style={styles.centeredBtnGreenText}>I don't know. Show me examples</Text>
                </Button>
            </Content>
        </Container>
    </Container>
    )
}
export default EditHabitScheduleType;

const styles = StyleSheet.create({
    container: {
        paddingTop:0
    },
    borderedBtn:{
        borderRadius:20,
        borderColor:colours.green,
        marginBottom:10,
        marginTop:10
    },
    ...commonStyles
  });
  