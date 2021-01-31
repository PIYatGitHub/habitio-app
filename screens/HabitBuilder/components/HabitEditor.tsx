import { IHabit, IHabitShedule, IUser, ScheduleTypes, StatesEnum } from '../../../constants/interfaces';
import React, { useState } from 'react';

import CreateHabit_Examples from './CreateHabit_Examples';
import EditHabit_Goals from './EditHabit_Goals';
import EditHabit_Hours from './EditHabit_Hours';
import EditHabit_ScheduleType from './EditHabit_ScheduleType';
import { Text } from 'native-base';

interface IEditHabitProps {
    user: IUser; 
    onHabitChanged: (habit:IHabit|null)=>void; 
    habitToEdit?: IHabit; 
}

const emptyHabit:IHabit =  {
    title: '',
    goals: [],
    habitId:-1,
    habitScheduleType:ScheduleTypes.unknown,
    habitSchedule:[{day:-1, fromHour:'', toHour:''}]  
}
const HabitEditor = (props:IEditHabitProps) => {
    const [habit, setHabit] = useState<IHabit>(props.habitToEdit? props.habitToEdit: emptyHabit); 
    const [currentStep, setCurrentStep] = useState<StatesEnum>(StatesEnum.setGoals); 

    const handleHabitGoalsChange = (title:string, goals:string[], step:StatesEnum) => { //title and goals are done!
        console.log(`in here with title:string, goals:string[], step:StatesEnum: `, title, goals, step);
        const newHabit: IHabit = Object.assign({}, habit);
        newHabit.title = title; 
        newHabit.goals = goals; 
        setHabit(newHabit); 
    
        setCurrentStep(step); 
        if(step === StatesEnum.backToAddScreen)  props.onHabitChanged(null);
    }

    const handleHabitSchedultTypeChange = (scheduleType:ScheduleTypes, step:StatesEnum) => { //schedultype has changed! 
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
        props.onHabitChanged(newHabit);
    }

    if(currentStep === StatesEnum.setGoals ) {
        return(
            <EditHabit_Goals onSetHabitGoals={handleHabitGoalsChange}/>
        )
    }

    if(currentStep === StatesEnum.setScheduleType) {
        return(
           <EditHabit_ScheduleType onSetScheduleType={handleHabitSchedultTypeChange} />
        )
    }

    if(currentStep === StatesEnum.showExamples) {
        return(
            <CreateHabit_Examples onHasSchownHabitExamples = {handleHasShownHabitExamples}/>
        )
    }

    if(currentStep === StatesEnum.setHours) {
        return(
            <EditHabit_Hours onSetHabitHours={handleHabitHoursChange}/>
        )
    }

    return ( 
        <Text>Cannot be here!!</Text>
    )
}
export default HabitEditor;
