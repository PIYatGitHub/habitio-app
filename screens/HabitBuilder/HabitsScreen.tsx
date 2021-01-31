import { Button, Container, Content, Footer, FooterTab, Text } from 'native-base';
import { IHabit, ITag, IUser, IUserStateAction, ScheduleTypes } from '../../constants/interfaces';
import React, { Fragment, useState } from 'react';

import CreateHabit from './components/CreateHabit';
import Habits_View from './components/Habits_View';
import { connect } from 'react-redux';

const dummyHabits: IHabit[] = [{
    habitId: 1,
    title: 'Runing',
    goals:['Be healthy', 'Buns of Steel', 'feeling great about myself'],
    habitScheduleType:ScheduleTypes.fixed,
    habitSchedule:[{
        day:0, fromHour:'10:00 AM',toHour:'11:00 AM'
    }]
},
{
    habitId: 2,
    title: 'Read one book a month',
    goals:['Keep up with lexie', 'Big brain move', 'Getting ahead of the crowd', 'Books are the best!'],
    habitScheduleType:ScheduleTypes.fluid,
    habitSchedule:[{
        day:0, fromHour:'10:00 AM',toHour:'11:00 AM'
    }]
}
]
const HabitsScreen = (props: { authenticatedUser: IUser; navigation: string[]}) => {
    const [selectedTab, setSelectedTab] = useState('habits'); 
    const [willCreateHabit, setWillCreateHabit] = useState(false); 
    const [habits, setHabits] = useState<IHabit[]>(dummyHabits);

    const handleTriggerHabitCreate = ()=>{
        setWillCreateHabit(true); 
    }
    const handleHabitCreated = (habit:IHabit|null)=>{
        console.log(`In here with habit=`, habit);       
        if(habit!==null) {
            let newHabits:IHabit[] = Object.assign([], habits);
            newHabits.push(habit);
            setHabits(newHabits); 
        }
        setWillCreateHabit(false);
        setSelectedTab('calendar'); 
    }

    return (
        !willCreateHabit?(
            <Container>
                {selectedTab === 'habits'? (
                <Habits_View habits={[]} onCreateHabitTriggered = {handleTriggerHabitCreate}/>
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
           <CreateHabit onCreateHabit={handleHabitCreated} user={props.authenticatedUser}/>
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
