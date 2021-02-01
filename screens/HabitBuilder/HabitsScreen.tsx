import { Button, Container, Content, Footer, FooterTab, Text } from 'native-base';
import { IHabit, ITag, IUser, IUserStateAction, ScheduleTypes } from '../../constants/interfaces';
import React, { Fragment, useState } from 'react';

import HabitEditor from './components/HabitEditor';
import Habits_View from './components/Habits_View';
import { connect } from 'react-redux';

const emptyHabit:IHabit =  {
    title: '',
    goals: [],
    habitId:-1,
    habitScheduleType:ScheduleTypes.unknown,
    habitSchedule:[{day:-1, fromHour:'', toHour:''}]  
}

const HabitsScreen = (props: { authenticatedUser: IUser; navigation: string[]}) => {
    const [selectedTab, setSelectedTab] = useState('habits'); 
    const [willEditHabit, setWillEditHabit] = useState(false); 
    const [habits, setHabits] = useState<IHabit[]>(props.authenticatedUser.habits);
    const [seclectedHabit, setSelectedHabit] = useState(emptyHabit); 

    const handleTriggerHabitCreate = ()=>{
        setWillEditHabit(true); 
    }
    const handleHabitChange = (habit:IHabit|null)=>{
        console.log(`In here with habit=`, habit);       
        if(habit!==null) {
            let newHabits:IHabit[] = Object.assign([], habits);
            newHabits.push(habit);
            setHabits(newHabits); 
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
