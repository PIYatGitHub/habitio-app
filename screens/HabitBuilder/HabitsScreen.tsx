import { Container } from 'native-base';
import { IHabit, IUser, IUserStateAction, ScheduleTypes } from '../../constants/interfaces';
import React, { useState } from 'react';

import HabitEditor from './components/HabitEditor';
import HabitDetails from './components/HabitDetails';
import TopBar from './components/TopBar';
import MidSection from './components/MidSection';
import BottomBar from './components/BottomBar';
import { connect } from 'react-redux';

const emptyHabit:IHabit =  {
    title: '',
    goals: [],
    habitId:-1,
    habitScheduleType:ScheduleTypes.unknown,
    habitSchedule:[{day:-1, fromHour:'', toHour:''}]  
}

const HabitsScreen = (props: {reduxUserState: (arg0: IUserStateAction) => void, authenticatedUser: IUser; navigation: string[]}) => {
    const [selectedTab, setSelectedTab] = useState('habits'); 
    const [willEditHabit, setWillEditHabit] = useState(false); 
    const [habits, setHabits] = useState<IHabit[]>(props.authenticatedUser.habits);
    const [seclectedHabit, setSelectedHabit] = useState<IHabit | undefined>(undefined); 
    const [showDetails, setShowDetails] = useState(false); 

    const handleTriggerHabitCreate = ()=>{
        setWillEditHabit(true); 
    }

    const handleHabitChange = (habit:IHabit|null)=>{
        //so far we support only adding habits really. 
        try {
            console.log(`In here with habit=`, habit);       
            console.log(`In here with authenticatedUser=`, props.authenticatedUser);       
            console.log(`In here with authUserHabits=`, props.authenticatedUser.habits);
            
            if(props.authenticatedUser.habits === undefined) {
                props.authenticatedUser.habits = [];
            }
            
            if(habit!==null && !seclectedHabit) {
                let newHabits:IHabit[] = Object.assign([], habits);
                if(habit.habitId === -1){
                    if(!props.authenticatedUser.habits.length){
                        habit.habitId = 1; 
                        console.log(`habitId = 1`);
                        
                    } else {
                        const sorted = props.authenticatedUser.habits.sort((a,b)=> a.habitId - b.habitId);
                        const maxId =sorted[sorted.length-1].habitId;
                        habit.habitId = maxId + 1; 
                        console.log(`habitId = `, habit.habitId);
                        
                    }
                }
                newHabits.push(habit);
                setHabits(newHabits); 
                //set the habits
                const userStatePayload:IUserStateAction = {loggedIn:true, type: "SET_HABITS", user:{...props.authenticatedUser, habits: newHabits}};
    
                props.reduxUserState(userStatePayload);
            } else { // we have edited a habit and we must find it with the user's habits...
                let idx=-1; 
                let lookupHabit:IHabit|undefined = props.authenticatedUser.habits.find((h,i)=>{
                    if(h.habitId === habit?.habitId){
                        idx=i; 
                        return true;
                    }
                });
                if(!lookupHabit || !habit){
                    setWillEditHabit(false);
                    setShowDetails(false);
                    setSelectedHabit(emptyHabit)
                     throw new Error(`fatal error bad data on edit!`)
                }
                lookupHabit=habit;    //assign the new values!
                const newHabits:IHabit[] = Object.assign([], props.authenticatedUser.habits);
                
                if(idx!==-1) 
                    newHabits[idx] = lookupHabit; 
                
                const userStatePayload:IUserStateAction = {loggedIn:true, type: "SET_HABITS", user:{...props.authenticatedUser, habits: newHabits}};
                props.reduxUserState(userStatePayload);
            }
            
            setWillEditHabit(false);
            setSelectedTab('calendar');
        } catch (error) {
            console.log(`FATAL ERROR`, error);            
        }
        
    }

    const habitEditFromCalendar = (habit:IHabit)=>{
        console.log(`editing from the calendar...`);
        console.log(`>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>`);
        setWillEditHabit(true);
        setSelectedHabit(habit);
    }

    const handleShowDetails =(habit:IHabit)=>{
        console.log(`is there a habit?`, habit.title);
        
        if(habit) {
            console.log(`>>>>>>>>>>>>>>>> I am about to get that value to true!`);
            setSelectedHabit(habit);
            setShowDetails(true); 
        }
    }

    const handleHabitEditCall=()=>{
        console.log(`handleHabitEditCall`);
        
        setWillEditHabit(true);
        setShowDetails(false);
    }
    const handleEditCancel=()=>{
        setSelectedHabit(emptyHabit);
        setWillEditHabit(false); 
        setShowDetails(false);
    }

    const handleCloseDetails = ()=>{
        setShowDetails(false);
        setSelectedTab('habits');
    }

    if(showDetails){
        return  (
            <Container>
                <TopBar tab={selectedTab} show={showDetails} ></TopBar>
                <HabitDetails habit={seclectedHabit || emptyHabit} onCancel={handleEditCancel} onEditTriggered={handleHabitEditCall}/>
            </Container>
        
        )
    }

    return (
        !willEditHabit?(
            <Container>
                <TopBar tab={selectedTab} show={showDetails} ></TopBar>
                <MidSection tab={selectedTab} user={props.authenticatedUser}></MidSection>
                <BottomBar tab={selectedTab}></BottomBar>
            </Container>
        ): (
           <HabitEditor onHabitEdited={handleHabitChange} user={props.authenticatedUser} habitToEdit={seclectedHabit}/>
        )        
    )
}

const mapStateToProps = (state: { authReducer: { user:IUser }; }) => {
    return {
        authenticatedUser: state.authReducer.user
    };
};

const mapDispatchToProps = (dispatch: (arg0: any) => any) => {
    return {
        reduxUserState: (payload:IUserStateAction) => dispatch(payload),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(HabitsScreen);
