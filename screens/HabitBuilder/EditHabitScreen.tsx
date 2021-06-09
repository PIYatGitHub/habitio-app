import { Container, Text } from 'native-base';
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
    rewards: [],
    habitId:-1,
    habitScheduleType:ScheduleTypes.unknown,
    habitSchedule:[{day:-1, fromHour:'', toHour:''}]  
}

interface IEditHabitScreenProps {reduxUserState: (arg0: IUserStateAction) => void, authenticatedUser: IUser; navigation: string[]}

const EditHabitScreen = (props:IEditHabitScreenProps) => {
    const [selectedTab, setSelectedTab] = useState('habits'); 
    const [showDetails, setShowDetails] = useState(false); 

    return (
        <Container>
            <TopBar tab={selectedTab} show={showDetails} ></TopBar>
            <Text> Add Habit Window </Text>
        </Container>
    );
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
export default connect(mapStateToProps, mapDispatchToProps)(EditHabitScreen);