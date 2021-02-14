import { Button, Container, Icon, Text } from 'native-base';
import { Dimensions, StyleSheet } from 'react-native';
import React, { useState } from 'react';

import { IUser } from '../../../constants/interfaces';
import colours from '../../../constants/Colours';
import { commonStyles } from '../../styles/commonStyles';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
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
            <Container style={styles.actionBandMultipleAction}>
                <Button transparent onPress={handleCancel} style={{height:'100%', width:'33.33%'}}><Text style={{...styles.centeredBtnGrayText}} uppercase={false}>Cancel</Text></Button>
                <Text style={{...styles.centeredBtnGrayText, lineHeight:windowHeight*0.08, width:'33.33%', textAlign:'center'}}>Date Format</Text>
                <Button transparent onPress={handleSave} style={{height:'100%', width:'33.33%'}}><Text style={{...styles.centeredBtnGreenText, width:'100%', textAlign:'right'}} uppercase={false}>Save</Text></Button>
            </Container>
            <Container style={{marginLeft:windowWidth*0.05,marginRight:windowWidth*0.05}}>
                <Text style={styles.centeredBtnGrayText}>Enter your date preference below</Text>
                <Container style={{display:'flex', flexDirection:'row', justifyContent:'flex-start', marginTop:windowHeight*0.05}}>
                    <Button style={currentDateFormat === 'DD/MM/YY'? {backgroundColor:colours.green}: {backgroundColor:'white'}} bordered = {currentDateFormat !== 'DD/MM/YY'} 
                    onPress={()=>{setCurrentDateFormat('DD/MM/YY')}}>
                        <Text style={currentDateFormat === 'DD/MM/YY'? {color:'white'}: {color:colours.green}}>DD/MM/YY</Text>
                    </Button>
                    <Button bordered = {currentDateFormat !== 'MM/DD/YY'}
                    style={currentDateFormat === 'MM/DD/YY'? {backgroundColor:colours.green}: {backgroundColor:'white'}}
                    onPress={()=>{setCurrentDateFormat('MM/DD/YY')}}>
                        <Text style={currentDateFormat === 'MM/DD/YY'? {color:'white'}: {color:colours.green}}>MM/DD/YY</Text>
                    </Button>
                </Container>                
            </Container>
            
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
    },
    ...commonStyles
  });
  