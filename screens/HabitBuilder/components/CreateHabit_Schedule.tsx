import { Button, Container, Form, Icon, Input, Item, Text } from 'native-base';
import React, { useState } from 'react';
import { ScheduleTypes, StatesEnum } from '../../../constants/interfaces';

import { StyleSheet } from 'react-native';

interface iSetScheduleTypeProps {
    onSetScheduleType: (scheduleType:ScheduleTypes, step:StatesEnum)=>void
}


const CreateHabit_Schedule = (props:iSetScheduleTypeProps) => {
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
            <Button onPress={()=>handleNextStep(ScheduleTypes.fixed,StatesEnum.setHours)} bordered><Text>Fixed</Text></Button>        
            <Button onPress={()=>handleNextStep(ScheduleTypes.fluid,StatesEnum.setHours)} bordered><Text>Fluid</Text></Button>        
            <Button onPress={()=>handleNextStep(ScheduleTypes.unknown, StatesEnum.showExamples)} bordered><Text>I don't know. Show me examples</Text></Button>
                
        </Container>
    </Container>
    )
}
export default CreateHabit_Schedule;

const styles = StyleSheet.create({
    container: {
        paddingTop:0
    }
  });
  