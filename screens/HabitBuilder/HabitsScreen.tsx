import { Button, Container, Footer, FooterTab, Icon, Text } from 'native-base';
import {Dimensions, StyleSheet} from 'react-native';
import { IHabit, IUser, IUserStateAction, ScheduleTypes } from '../../constants/interfaces';
import React, { useState } from 'react';

import Calendar from './components/Calendar';
import HabitEditor from './components/HabitEditor';
import Habit_Details from './components/Habit_Details';
import Habits_View from './components/Habits_View';
import Habits_Home_View from './components/Habits_Home_View';
import Settings from './components/Settings';
import colours from '../../constants/Colours';
import { habitsScreenStyles } from '../styles/habitsScreenStyles';
import { connect } from 'react-redux';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

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

    const setActionBar = ()=>{
        console.log(`GOING FOR THE HEADER SETUP....`, selectedTab, showDetails);
        
        if (selectedTab!=='settings' && !showDetails){
            return (
            <Container style={habitsScreenStyles.actionBandMultipleAction}>
            <Text style={habitsScreenStyles.placeholder} uppercase={false}>+</Text>
            <Text style={{...habitsScreenStyles.centeredBtnGrayText,lineHeight:windowHeight*0.08}}>My habits</Text>
            <Button style={habitsScreenStyles.rightActionBtn} transparent onPress = {handleTriggerHabitCreate}>
                <Text uppercase={false} style={{
                    fontSize:30,
                    textAlign:'right',
                    width:'100%',
                    color:colours.dkGray
                }}>+</Text>
            </Button> 
            </Container>)
        }
        if (showDetails){
            return (
                <Container style={habitsScreenStyles.actionBandMultipleAction}>
                <Button style={{width:'33.33%', height:'100%'}} transparent> 
                    <Icon type='FontAwesome5' name='chevron-left' onPress={handleCloseDetails} style={{color:colours.dkGray}}/>
                </Button>
                
                <Text style={{...habitsScreenStyles.centeredBtnGrayText,lineHeight:windowHeight*0.08}}>Habits</Text>
                <Text style={habitsScreenStyles.placeholder} uppercase={false}>+</Text>
                </Container>)
        }
        return null; 
    }

    if(showDetails){
        return  (
            <Container>
                {setActionBar()}
                <Habit_Details habit={seclectedHabit || emptyHabit} onCancel={handleEditCancel} onEditTriggered={handleHabitEditCall}/>
            </Container>
        
        )
    }

    return (
        !willEditHabit?(
            <Container>
                {/* header bar here! valide on 2 of 3 tabs (settings excluded) */}
                {setActionBar()}

                {selectedTab === 'habits'? (
                <Habits_Home_View habits={props.authenticatedUser.habits} onHabitDetails={handleShowDetails}/>
                ):null}

                {selectedTab === 'calendar'? (
                   <Calendar onHabitEditRequired={habitEditFromCalendar} authenticatedUser = {props.authenticatedUser} onHabitDetails={handleShowDetails}/>
                ):null}

                {selectedTab === 'settings'? (
                   <Settings  authenticatedUser = {props.authenticatedUser}/>
                ):null}
                <Footer>
                <FooterTab style={{
                    backgroundColor:'white'
                }}>
                    <Button onPress={()=>{
                        setSelectedTab('habits'); 
                    }} 
                    active = {selectedTab === 'habits'}
                    style={selectedTab === 'habits'? 
                    {backgroundColor:'transparent', borderBottomColor:colours.dkGray, borderBottomWidth:3}:
                    {backgroundColor:'transparent', borderBottomColor:'transparent', borderBottomWidth:3}}
                    >
                        <Icon style={selectedTab === 'habits'?{color:colours.dkGray}: {color:colours.ltGray}} type='FontAwesome5' name='list'/>
                        <Text style={selectedTab === 'habits'?{color:colours.dkGray}: {color:colours.ltGray}} uppercase={false}>My Habits</Text>
                    </Button>
                    <Button onPress={()=>{
                        setSelectedTab('calendar'); 
                    }} active = {selectedTab === 'calendar'}                    
                    style={selectedTab === 'calendar'? 
                    {backgroundColor:'transparent', borderBottomColor:colours.dkGray, borderBottomWidth:3}:
                    {backgroundColor:'transparent', borderBottomColor:'transparent', borderBottomWidth:3}}
                    >
                        <Icon style={selectedTab === 'calendar'?{color:colours.dkGray}: {color:colours.ltGray}} type='FontAwesome5' name='calendar-check'/>
                        <Text style={selectedTab === 'calendar'?{color:colours.dkGray}: {color:colours.ltGray}} uppercase={false}>Calendar</Text>
                    </Button>
                    <Button onPress={()=>{
                        setSelectedTab('settings'); 
                    }} active = {selectedTab === 'settings'}
                    style={selectedTab === 'settings'? 
                    {backgroundColor:'transparent', borderBottomColor:colours.dkGray, borderBottomWidth:3}:
                    {backgroundColor:'transparent', borderBottomColor:'transparent', borderBottomWidth:3}}
                    >
                        <Icon style={selectedTab === 'settings'?{color:colours.dkGray}: {color:colours.ltGray}} type='FontAwesome5' name='cog'/>
                        <Text style={selectedTab === 'settings'?{color:colours.dkGray}: {color:colours.ltGray}} uppercase={false}>Settings</Text>
                    </Button>
                </FooterTab>
                </Footer>
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
