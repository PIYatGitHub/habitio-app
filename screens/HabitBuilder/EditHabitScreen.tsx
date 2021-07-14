import { Container, Text, Input, Item, Card, CardItem, Body, Icon, } from 'native-base';
import { Keyboard } from 'react-native';
import { IStep, IHabit, IUser, IUserStateAction, ScheduleTypes, StatesEnum } from '../../constants/interfaces';
import React, { useState } from 'react';
import { createStackNavigator } from "react-navigation-stack";

import HabitEditor from './components/HabitEditor';
import HabitDetails from './components/HabitDetails';
import TopBar from './components/TopBar';
import MidSection from './components/MidSection';
import BottomBar from './components/BottomBar';
import { connect } from 'react-redux';
import { editHabitScreenStyles } from '../styles/editHabitScreenStyles';

const emptyHabit:IHabit =  {
    title: '',
    goals: [],
    rewards: [],
    positiveMotivators: [],
    negativeMotivators: [],
    habitId:-1,
    habitScheduleType:ScheduleTypes.unknown,
    notes: '',
    habitSchedule:[{day:-1, fromHour:'', toHour:''}],  
    steps: [], 
}

interface IEditStepScreenProps {
    onSetHabitGoals: (title:string, goals:string[], step:StatesEnum)=>void
    habitToEdit?: IHabit; 
    navigation: string[];
}

const EditHabitScreen = (props:IEditStepScreenProps) => {
    const [title, setTitle] = useState(props.habitToEdit? props.habitToEdit.title: ''); 
    const [notes, setNotes] = useState(props.habitToEdit? props.habitToEdit.notes: ''); 
    const [positiveMotivators, setPositiveMotivator] = useState<string[]>(props.habitToEdit? props.habitToEdit.positiveMotivators: ['']); 
    const [negativeMotivators, setNegativeMotivator] = useState<string[]>(props.habitToEdit? props.habitToEdit.negativeMotivators: ['']); 

    const addStep = (habitToEdit?: IHabit) => {
        console.log(`openScreen: "EditStepScreen"`);

        //props.navigation.navigate()
        console.log('navigation');
        console.log(props.navigation);
        props.navigation.push("EditStepScreen");
    }

    const handleTitleChange = (value:string) => {
        let newTitle:string = Object.assign('', title); 
        newTitle = value;
        
        setTitle(newTitle);
    }

    const handleNotesChange = (value:string) => {
        let newTitle:string = Object.assign('', title); 
        newTitle = value;
        
        setNotes(newTitle);
    }

    const handlePositiveMotivatorChange = (goalIdx:number, value:string) => {
        let newPositiveMotivators:string[] = Object.assign([], positiveMotivators); 
        newPositiveMotivators[goalIdx] = value;
        
        setPositiveMotivator(newPositiveMotivators);
    }

    const handleNegativeMotivatorChange = (goalIdx:number, value:string) => {
        let newNegativeMotivators:string[] = Object.assign([], negativeMotivators); 
        newNegativeMotivators[goalIdx] = value;
        
        setNegativeMotivator(newNegativeMotivators);
    }

    const handleAddStepPress = () => {
        console.log(`Add new step pressed!`);
    }

    const handleOpenStepDetails = (step: IStep) => {
        console.log(`Open Step Details: `, step.name);
    }

    return (
        <Container>
            <TopBar 
                leftIconName='ban' 
                //leftText='Cancel'
                leftOnPress={() => props.navigation.pop()} 
                rightIconName='check' 
                //rightText='Done'
                rightOnPress={()=>console.log('Habit Creation Done')} 
                centerText='Add Habit'></TopBar>
                <Text style={styles.text}>Name:</Text>
                <Item>
                    <Input placeholder='Doing YouTube videos' onChangeText={(e)=>handleTitleChange(e)} style={styles.borderedInput} value={title}/>
                </Item>
                <Text style={styles.text}>Notes:</Text>
                <Item>
                    <Input placeholder='I will create great and big channel' onChangeText={(e)=>handleNotesChange(e)} style={styles.borderedInput} value={notes}/>
                </Item>
                <Text style={styles.text}>What will I be if I have this habit?</Text>
                <Item>
                    <Input placeholder='Young, rich and famous' onChangeText={(e)=>handlePositiveMotivatorChange(1,e)} style={styles.borderedInput} value={positiveMotivators[1]}/>
                </Item>
                <Text style={styles.text}>What will I be if I don't build this habit?</Text>
                <Item>
                    <Input placeholder='Poor, old and alone' onChangeText={(e)=>handleNegativeMotivatorChange(1,e)} style={styles.borderedInput} value={negativeMotivators[1]}/>
                </Item>
                <Text style={styles.text}>My steps</Text>
                
                {props.habitToEdit ? props.habitToEdit.steps.map(step=>{
                    return (
                        <Card style={styles.cardStyle}>
                            <CardItem style={styles.cardItemStyle}>
                                <Body style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                                    <Text style={styles.centeredBtnGrayText} onPress= {()=>handleOpenStepDetails(step)}>{step.name}</Text>
                                    
                                </Body>
                            </CardItem>
                        </Card>
                    )
                }) : <Card key='0' style={styles.cardStyle}>
                        <CardItem style={styles.cardItemStyle}>
                            <Body style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                                <Text style={styles.centeredGreenText} onPress= {()=>addStep(props.habitToEdit)}>+ Add new step</Text>
                            </Body>
                        </CardItem>
                    </Card>}
        </Container>
    );
}

const styles = editHabitScreenStyles;

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