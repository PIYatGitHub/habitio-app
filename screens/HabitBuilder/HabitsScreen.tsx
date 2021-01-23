import { Button, Container, Content, Footer, FooterTab, Text } from 'native-base';
import { IHabit, ITag, IUser, IUserStateAction } from '../../constants/interfaces';
import React, { useState } from 'react';

import CreateHabit from './components/CreateHabit';
import Habits from './components/Habits';
import { connect } from 'react-redux';

const dummyHabits: IHabit[] = [{
    habitId: 1,
    title: 'Runing',
    goals:['Be healthy', 'Buns of Steel', 'feeling great about myself']
},
{
    habitId: 2,
    title: 'Read one book a month',
    goals:['Keep up with lexie', 'Big brain move', 'Getting ahead of the crowd', 'Books are the best!']
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
        setWillCreateHabit(!habit)
        if(habit) {
            let newHabits:IHabit[] = Object.assign([], habits);
            newHabits.push(habit);
            setHabits(newHabits); 
        }
    }

    return (
        !willCreateHabit?(
            <Container>
                {selectedTab === 'habits'? (
                <Habits habits={[]} onCreateHabitTriggered = {handleTriggerHabitCreate}/>
                ):null}

                {selectedTab === 'calendar'? (
                    <Text>Hey from calendar!</Text>
                ):null}

                {selectedTab === 'settings'? (
                    <Text>Hey from settings!</Text>
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
