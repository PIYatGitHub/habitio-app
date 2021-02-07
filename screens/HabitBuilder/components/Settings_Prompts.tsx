import { Button, Container, Icon, Text } from 'native-base';
import React, { useState } from 'react';

import { IUser } from '../../../constants/interfaces';
import { StyleSheet } from 'react-native';

interface IPromptsProps {
    onEditDone: ()=>void;
    authenticatedUser:IUser;
}

const Settings_Prompts = (props: IPromptsProps) => {
    const handleCancel = ()=>{
        console.log(`cancel here...`);
        props.onEditDone(); // user canceled that, so he lost his input 
        
    }
    const handleSave = () =>{
        console.log(`saving here...`);
        //TODO add the save to the user state here!!! 
        props.onEditDone(); 
    }

    return(
        <Container>
            <Container>
                <Button transparent onPress={handleCancel}><Text>Cancel</Text></Button>
                <Text>Prompts</Text>
                <Button transparent onPress={handleSave}><Text>Save</Text></Button>
            </Container>
            <Text>Customize your prompts</Text>
            <Button><Text>Carrot</Text></Button>
            <Button><Text>Stick</Text></Button>
            <Container>
                <Text>Examples</Text>
                <Text>Carrots</Text>
                <Text>Are you ready to_________?</Text>
                <Text>How excited do you feel to_________?</Text>
                <Text>How do you see yourself_________?</Text>
            </Container>
            <Container>
                <Button><Text>Try premium</Text></Button>
                <Button><Text>Give feedback</Text></Button>
            </Container>
        </Container>
    )
}
export default Settings_Prompts;

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
  