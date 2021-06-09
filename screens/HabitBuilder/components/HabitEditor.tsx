import { IHabit, IHabitShedule, IUser, ScheduleTypes, StatesEnum } from '../../../constants/interfaces';
import React, { useState } from 'react';

import CreateHabitExamples from './CreateHabitExamples';
import EditHabitGoals from './EditHabitGoals';
import EditHabitHours from './EditHabitHours';
import EditHabitScheduleType from './EditHabitScheduleType';
import { Text } from 'native-base';

interface IEditHabitProps {
    user: IUser; 
    onHabitEdited: (habit:IHabit|null)=>void; 
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
        if(step === StatesEnum.backToAddScreen)  props.onHabitEdited(null);
    }

    const handleHabitSchedultTypeChange = (scheduleType:ScheduleTypes, step:StatesEnum) => { //schedultype has changed! 
        console.log(`I am here with... scheduleType:ScheduleTypes, step:StatesEnum`, scheduleType, step);
        const newHabit: IHabit = Object.assign({}, habit);
         newHabit.habitScheduleType = scheduleType; 
        setHabit(newHabit); 
       setCurrentStep(step); 
    }

    const handleHasShownHabitExamples = (step:StatesEnum, scheduleType?:ScheduleTypes) =>{ 
        console.log(`I am here with..., step:StatesEnum`, step);
        if(scheduleType){
         const newHabit: IHabit = Object.assign({}, habit);
         newHabit.habitScheduleType = scheduleType; 
         setHabit(newHabit); 
        }
       setCurrentStep(step); 
    }

    const handleHabitHoursChange = (schedule:IHabitShedule[], step:StatesEnum) => { //finally schedule hours are set! 
        const newHabit: IHabit = Object.assign({}, habit);
         newHabit.habitSchedule = schedule; 
        setHabit(newHabit); 
        setCurrentStep(step); 
        console.log(`>>>>>>>>>>>>>>>>>>>>>>>>>>>STEP IS`, step);
        
        if(step !== StatesEnum.setScheduleType) {
            console.log(`NEW HABBIT.................`, newHabit);
            
            props.onHabitEdited(newHabit);
        }
    }

    if(currentStep === StatesEnum.setGoals ) {
        return(
            <EditHabitGoals onSetHabitGoals={handleHabitGoalsChange} habitToEdit={habit}/>
        )
    }

    if(currentStep === StatesEnum.setScheduleType) {
        return(
           <EditHabitScheduleType onSetScheduleType={handleHabitSchedultTypeChange} habitToEdit={habit}/>
        )
    }

    if(currentStep === StatesEnum.showExamples) {
        return(
            <CreateHabitExamples onHasSchownHabitExamples = {handleHasShownHabitExamples} />
        )
    }

    if(currentStep === StatesEnum.setHours) {
        return(
            <EditHabitHours onSetHabitHours={handleHabitHoursChange} habitToEdit={habit}/>
        )
    }

    return ( 
        <Text>Cannot be here!!</Text>
    )
}
export default HabitEditor;
