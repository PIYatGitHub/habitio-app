import { Body, Button, CheckBox, Container, Form, Icon, Input, Item, ListItem, Text } from 'native-base';
import { IHabitShedule, ScheduleTypes, StatesEnum, weekDayMap } from '../../../constants/interfaces';
import React, { useState } from 'react';

import { StyleSheet } from 'react-native';

interface iShowHabitsExamplesProps {
    onHasSchownHabitExamples: (step:StatesEnum, scheduleType?: ScheduleTypes)=>void
}


const CreateHabit_Examples = (props:iShowHabitsExamplesProps) => {
    const handleNextStep = (step:StatesEnum, scheduleType?: ScheduleTypes)=> {
        props.onHasSchownHabitExamples(step, scheduleType); 
    }

    return(
    <Container style={styles.container}>
        <Container>
            <Button onPress={()=>handleNextStep(StatesEnum.setScheduleType)}><Text>Cancel</Text></Button>
        </Container>
        <Container>
            <Text>
                A fixed habit is something you can commit to
                at regularlyspecified intervals. For example, you
                always can access your threadmill in the basement
                at the same time every week.
            </Text>
            <Text>
                A flid habit is something you can commit to
                every week but need a little flexibility on the times.
                Say you need to work around someone else's 
                schedule or can only run when it isn't raining.
            </Text>
            <Text>
                Which do you prefer?
            </Text>
            <Button bordered onPress={()=>{
                handleNextStep(StatesEnum.setHours, ScheduleTypes.fixed); 
            }}>
                <Text>Fixed</Text>
            </Button>
            <Button bordered onPress = {()=>{
                handleNextStep(StatesEnum.setHours, ScheduleTypes.fluid); 
            }}>
                <Text>Fluid</Text>
            </Button>
            
        </Container>
    </Container>
    )
}
export default CreateHabit_Examples;

const styles = StyleSheet.create({
    container: {
        paddingTop:0
    }
  });
  