import { Body, Button, CheckBox, Container, Form, Icon, Input, Item, ListItem, Text } from 'native-base';
import { IHabitShedule, StatesEnum, weekDayMap } from '../../../constants/interfaces';
import React, { useState } from 'react';

import { StyleSheet } from 'react-native';

interface iShowHabitsExamplesProps {
    onHasSchownHabitExamples: (step:StatesEnum)=>void
}


const CreateHabit_Examples = (props:iShowHabitsExamplesProps) => {
    const handleNextStep = (status:StatesEnum)=> {
        props.onHasSchownHabitExamples(status); 
    }

    return(
    <Container style={styles.container}>
        <Container>
            <Button onPress={()=>handleNextStep(StatesEnum.setScheduleType)}><Text>OK</Text></Button>
        </Container>
        <Container>
            <Text>Coming soon!</Text>
            
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
  