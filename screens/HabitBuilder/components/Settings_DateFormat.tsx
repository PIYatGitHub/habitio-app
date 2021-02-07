import { Button, Container, Icon, Text } from 'native-base';
import React, { useState } from 'react';

import { IUser } from '../../../constants/interfaces';
import { StyleSheet } from 'react-native';

interface IDateFormatProps {
    onEditDone: ()=>void;
    authenticatedUser: IUser; 
}

const Settings_DateFormat = (props: IDateFormatProps) => {
    const [currentDateFormat, setCurrentDateFormat] = useState('DD/MM/YY')
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
                <Text>Date format</Text>
                <Button transparent onPress={handleSave}><Text>Save</Text></Button>
            </Container>
            <Text>Enter your date preference below</Text>
            <Button bordered = {currentDateFormat !== 'DD/MM/YY'} 
            onPress={()=>{setCurrentDateFormat('DD/MM/YY')}}>
                <Text>DD/MM/YY</Text>
            </Button>
            <Button bordered = {currentDateFormat !== 'MM/DD/YY'}
            onPress={()=>{setCurrentDateFormat('MM/DD/YY')}}>
                <Text>MM/DD/YY</Text>
            </Button>
        </Container>
    )
}
export default Settings_DateFormat;

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
  