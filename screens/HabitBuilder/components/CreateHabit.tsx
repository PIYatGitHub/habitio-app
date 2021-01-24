import { Button, Container, Form, Icon, Input, Item, Text } from 'native-base';
import { IHabit, IUser, StatesEnum } from '../../../constants/interfaces';
import React, { useState } from 'react';

import CreateHabit_Goals from './CreateHabit_Goals';
import { StyleSheet } from 'react-native';

interface iHabitCreateProps {
    user: IUser; 
    onCreateHabit: (habit:IHabit|null)=>void
}


const CreateHabit = (props:iHabitCreateProps) => {
    const [habit, setHabit] = useState<IHabit>(); 
    const [currentStep, setCurrentStep] = useState<StatesEnum>(StatesEnum.setGoals); 

    const handleHabitChange = (title:string, goals:string[], step:StatesEnum) => {
        console.log(`in here with title:string, goals:string[], step:StatesEnum: `, title, goals, step);
        setHabit({title,goals,habitId:-1})
        setCurrentStep(step); 
        if(step === StatesEnum.backToAddScreen)  props.onCreateHabit(null);
    }

    if(currentStep === StatesEnum.setGoals ) {
        return(
            <CreateHabit_Goals onSetHabit={handleHabitChange}/>
        )
    }

    if(currentStep === StatesEnum.setScheduleType) {
        return(
            <Text>Hello from scheduling</Text>
        )
    }

    if(currentStep === StatesEnum.showExamples) {
        return(
            <Text>Hello from examples</Text>
        )
    }

    if(currentStep === StatesEnum.setHours) {
        return(
            <Text>Hello from set hours!</Text>
        )
    }

    return ( 
        <Text>Cannot be here!!</Text>
    )
}
export default CreateHabit;

const styles = StyleSheet.create({
    container: {
        paddingTop:24
    },
    flexRowWrap: {
        display:'flex',
        flexDirection:'row', 
        flexWrap:'wrap'
    },
    badge:{
        marginTop: 5,
        marginBottom:5,
        marginRight:5
    },
    badgeIcon: {
        fontSize: 15,
        color: "#fff",
        lineHeight: 20
    }
  });
  