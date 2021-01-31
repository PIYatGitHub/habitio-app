import { IHabit, IHabitShedule, IUser, ScheduleTypes, StatesEnum } from '../../../constants/interfaces';
import React, { useState } from 'react';

import CreateHabit_Examples from './CreateHabit_Examples';
import CreateHabit_Goals from './CreateHabit_Goals';
import CreateHabit_Hours from './CreateHabit_Hours';
import CreateHabit_Schedule from './CreateHabit_Schedule';
import { Text } from 'native-base';

interface iHabitCreateProps {
    user: IUser; 
    onCreateHabit: (habit:IHabit|null)=>void
}

const emptyHabit:IHabit =  {
    title: '',
    goals: [],
    habitId:-1,
    habitScheduleType:ScheduleTypes.unknown,
    habitSchedule:[{day:-1, fromHour:'', toHour:''}]  
}
const CreateHabit = (props:iHabitCreateProps) => {
    const [habit, setHabit] = useState<IHabit>(emptyHabit); 
    const [currentStep, setCurrentStep] = useState<StatesEnum>(StatesEnum.setGoals); 

    const handleHabitChange = (title:string, goals:string[], step:StatesEnum) => { //title and goals are done!
        console.log(`in here with title:string, goals:string[], step:StatesEnum: `, title, goals, step);
        const newHabit: IHabit = Object.assign({}, habit);
        newHabit.title = title; 
        newHabit.goals = goals; 
        setHabit(newHabit); 
    
        setCurrentStep(step); 
        if(step === StatesEnum.backToAddScreen)  props.onCreateHabit(null);
    }

    const handleSchedultTypeChange = (scheduleType:ScheduleTypes, step:StatesEnum) => { //schedultype has changed! 
        console.log(`I am here with... scheduleType:ScheduleTypes, step:StatesEnum`, scheduleType, step);
        const newHabit: IHabit = Object.assign({}, habit);
         newHabit.habitScheduleType = scheduleType; 
        setHabit(newHabit); 
       setCurrentStep(step); 
    }

    const handleHasShownHabitExamples = (step:StatesEnum) =>{ //Do nothing here, user just wanted to see some examples! 
        console.log(`I am here with..., step:StatesEnum`, step);
       setCurrentStep(step); 
    }

    const handleHabitHoursChange = (schedule:IHabitShedule[], step:StatesEnum) => { //finally schedule hours are set! 
        const newHabit: IHabit = Object.assign({}, habit);
         newHabit.habitSchedule = schedule; 
        setHabit(newHabit); 
        setCurrentStep(step); 
        props.onCreateHabit(newHabit);
    }

    if(currentStep === StatesEnum.setGoals ) {
        return(
            <CreateHabit_Goals onSetHabit={handleHabitChange}/>
        )
    }

    if(currentStep === StatesEnum.setScheduleType) {
        return(
           <CreateHabit_Schedule onSetScheduleType={handleSchedultTypeChange}/>
        )
    }

    if(currentStep === StatesEnum.showExamples) {
        return(
            <CreateHabit_Examples onHasSchownHabitExamples = {handleHasShownHabitExamples}/>
        )
    }

    if(currentStep === StatesEnum.setHours) {
        return(
            <CreateHabit_Hours onSetHabitHours={handleHabitHoursChange}/>
        )
    }

    return ( 
        <Text>Cannot be here!!</Text>
    )
}
export default CreateHabit;
