import { Button, Container, Form, Icon, Input, Item, Text } from 'native-base';
import { IHabit, ScheduleTypes, StatesEnum } from '../../../constants/interfaces';
import React, { useState } from 'react';

import { StyleSheet } from 'react-native';

interface IEditHabitScheduleTypeProps {
    onSetScheduleType: (scheduleType:ScheduleTypes, step:StatesEnum)=>void;
    habitToEdit?:IHabit; 
}


const EditHabit_ScheduleType = (props:IEditHabitScheduleTypeProps) => {
    const selectedSchType = props.habitToEdit ? props.habitToEdit.habitScheduleType : ScheduleTypes.unknown;
    const handleNextStep = (scheduleType:ScheduleTypes, status:StatesEnum)=> {
       props.onSetScheduleType(scheduleType, status); 
    }
    
    return(
    <Container style={styles.container}>
        <Container>
            <Button onPress={()=>handleNextStep(ScheduleTypes.unknown,StatesEnum.setGoals)}><Text>Cancel</Text></Button>
        </Container>
        <Container>            
            <Text>Do you want a  fixed habit (set M-F schedule) or a fluid one (one regular appointment
                to set your weekly schedule)? 

            </Text>
            <Button 
            onPress={()=>handleNextStep(ScheduleTypes.fixed,StatesEnum.setHours)}
            bordered active = {selectedSchType === ScheduleTypes.fixed}>
                <Text>Fixed</Text>
            </Button>        
            <Button 
            onPress={()=>handleNextStep(ScheduleTypes.fluid,StatesEnum.setHours)} 
            bordered active = {selectedSchType === ScheduleTypes.fluid}>
                <Text>Fluid</Text>
            </Button>        
            <Button 
            onPress={()=>handleNextStep(ScheduleTypes.unknown, StatesEnum.showExamples)}
            bordered>
                <Text>I don't know. Show me examples</Text>
            </Button>
                
        </Container>
    </Container>
    )
}
export default EditHabit_ScheduleType;

const styles = StyleSheet.create({
    container: {
        paddingTop:0
    }
  });
  