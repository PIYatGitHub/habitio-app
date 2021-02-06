import { Button, Container, Content, Footer, FooterTab, Text } from 'native-base';
import { IHabit, ITag, IUser, IUserStateAction, ScheduleTypes } from '../../constants/interfaces';
import React, { Fragment, useState } from 'react';

import HabitEditor from './components/HabitEditor';
import Habits_View from './components/Habits_View';
import { connect } from 'react-redux';
import { max } from 'react-native-reanimated';

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
    const [seclectedHabit, setSelectedHabit] = useState(emptyHabit); 

    const handleTriggerHabitCreate = ()=>{
        setWillEditHabit(true); 
    }

    const handleHabitChange = (habit:IHabit|null)=>{
        //so far we support only adding habits really. 
        console.log(`In here with habit=`, habit);       
        if(habit!==null && seclectedHabit.habitId === -1 && seclectedHabit.habitSchedule[0].day === -1) {
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
            console.log(`we should not be here at all!`, props.authenticatedUser.habits);
        }
        setWillEditHabit(false);
        setSelectedTab('calendar'); 
    }

    return (
        !willEditHabit?(
            <Container>
                {selectedTab === 'habits'? (
                <Habits_View habits={props.authenticatedUser.habits} onCreateHabitTriggered = {handleTriggerHabitCreate}/>
                ):null}

                {selectedTab === 'calendar'? (
                    <Fragment>
                        <Text>Hey from calendar!</Text>
                        <Text>Hey from calendar!line 2</Text>
                        <Text>Hey from calendar!line 3</Text>
                    </Fragment>
                    
                ):null}

                {selectedTab === 'settings'? (
                   <Fragment>
                   <Text>Hey from settings!</Text>
                   <Text>Hey from settings!line 2</Text>
                   <Text>Hey from settings!line 3</Text>
               </Fragment>
                ):null}
                <Footer>
                <FooterTab>
                    <Button onPress={()=>{
                        setSelectedTab('habits'); 
                    }} 
                    active = {selectedTab === 'habits'}>
                        <Text>My Habits</Text>
                    </Button>
                    <Button onPress={()=>{
                        setSelectedTab('calendar'); 
                    }} active = {selectedTab === 'calendar'}>
                        <Text>Calendar</Text>
                    </Button>
                    <Button onPress={()=>{
                        setSelectedTab('settings'); 
                    }} active = {selectedTab === 'settings'}>
                        <Text>Settings</Text>
                    </Button>
                </FooterTab>
                </Footer>
            </Container>
        ): (
           <HabitEditor onHabitEdited={handleHabitChange} user={props.authenticatedUser}/>
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
