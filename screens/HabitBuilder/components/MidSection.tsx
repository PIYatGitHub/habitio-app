import { IUser } from '../../../constants/interfaces';
import React, { useState } from 'react';
import Calendar from './Calendar';
import HabitsHomeView from './HabitsHomeView';
import Settings from './Settings';

import colours from '../../../constants/Colours';

interface IMidSectionProps {
    tab: string;
    user: IUser;
}

const MidSection = (props:IMidSectionProps) => {
    const handleShowDetails = ()=>{
        console.log(`Handle Show Details`)
    }
    const habitEditFromCalendar = ()=>{
        console.log(`Habit Edit Form`)
    }

    if(props.tab === 'habits') { return (<HabitsHomeView habits={props.user.habits} onHabitDetails={handleShowDetails}/>) }
    if(props.tab === 'calendar') { return (<Calendar onHabitEditRequired={habitEditFromCalendar} authenticatedUser = {props.user} onHabitDetails={handleShowDetails}/>) }
    if(props.tab === 'settings') { return (<Settings  authenticatedUser = {props.user}/>) }
    
    return null;
}
export default MidSection;