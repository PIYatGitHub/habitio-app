import { Button, Container, Icon, Text } from 'native-base';
import React, { useState } from 'react';

import { IUser } from '../../../constants/interfaces';
import Settings_DateFormat from './Settings_DateFormat';
import Settings_Prompts from './Settings_Prompts';
import { StyleSheet } from 'react-native';

interface ISettingsProps {
    authenticatedUser: IUser
}

const Settings = (props: ISettingsProps) => {
    const [willCustomizePrompts, setWillCustomizePrompts] = useState(false);
    const [willCustomizeDate, setWillCustomizeDate] = useState(false);
    const handlePromptsEdited = ()=>{
        setWillCustomizePrompts(false); 
    }

    const handleDateFormatEdited = ()=>{
        setWillCustomizeDate(false); 
    }


    if(willCustomizePrompts)
        return <Settings_Prompts onEditDone={handlePromptsEdited} authenticatedUser ={props.authenticatedUser}/>
    

    if(willCustomizeDate)
        return <Settings_DateFormat  onEditDone={handleDateFormatEdited} authenticatedUser ={props.authenticatedUser}/>
        
    return (          
        <Container>
        <Text>Settings</Text>
        <Button block bordered style = {styles.btnSpaceBtw} onPress={()=> setWillCustomizePrompts(true)}>
            <Text>Customize your prompts</Text>
            <Icon name='arrow-forward' />
       </Button>
        <Button block bordered style = {styles.btnSpaceBtw} onPress={()=> setWillCustomizeDate(true)}>
            <Text>Time preferece (MM/DD/YY)</Text>
            <Icon name='arrow-forward'/>
       </Button>        
       </Container>       
    )
}
export default Settings;

const styles = StyleSheet.create({
    container: {
        display:'flex',
        flexDirection:'column',
        justifyContent:'flex-start',
        marginLeft:20,
        marginTop:5,
        borderWidth: 2,
        borderColor:'red'
    },
    btnSpaceBtw: {
        justifyContent:'space-between'
    }
  });
  