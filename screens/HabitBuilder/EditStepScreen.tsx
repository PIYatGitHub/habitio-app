import { Container, Text, Input, Item, Card, CardItem, Body, Icon} from 'native-base';
import { IStep, IHabit, IUser, IUserStateAction, ScheduleTypes, StatesEnum } from '../../constants/interfaces';
import React, { useState } from 'react';

import HabitEditor from './components/HabitEditor';
import HabitDetails from './components/HabitDetails';
import TopBar from './components/TopBar';
import MidSection from './components/MidSection';
import BottomBar from './components/BottomBar';
import { connect } from 'react-redux';
import { editHabitScreenStyles } from '../styles/editHabitScreenStyles';

const emptyStep:IStep =  {
    name: '',
    notes: '',
    reward: '',
    schedule: [{day:-1, fromHour:'', toHour:''}],  
}

interface IEditHabitScreenProps {
    onSetHabitGoals: (title:string, goals:string[], step:StatesEnum)=>void
    stepToEdit?: IStep; 
    navigation: string[];
}

const EditHabitScreen = (props:IEditHabitScreenProps) => {
    const [title, setTitle] = useState(props.stepToEdit? props.stepToEdit.name: ''); 
    const [notes, setNotes] = useState(props.stepToEdit? props.stepToEdit.notes: ''); 
    

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
                rightOnPress={()=>console.log('Step Creation Done')} 
                centerText='Add Step'></TopBar>
                <Text style={styles.text}>Step Name:</Text>
                <Item>
                    <Input placeholder='Open Browser' onChangeText={(e)=>handleTitleChange(e)} style={styles.borderedInput} value={title}/>
                </Item>
                <Text style={styles.text}>Notes:</Text>
                <Item>
                    <Input placeholder='You can not create big chanell if you dont open the browser' onChangeText={(e)=>handleNotesChange(e)} style={styles.borderedInput} value={notes}/>
                </Item>
                
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