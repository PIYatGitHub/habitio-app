import { Button, Container, Content, Icon, Text } from 'native-base';
import { Dimensions, StyleSheet } from 'react-native';
import React, { useState } from 'react';

import { IUser } from '../../../constants/interfaces';
import Settings_DateFormat from './Settings_DateFormat';
import Settings_Prompts from './Settings_Prompts';
import colours from '../../../constants/Colours';
import { commonStyles } from '../../styles/commonStyles';

interface ISettingsProps {
    authenticatedUser: IUser
}
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

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
            <Container style={styles.actionBandSingleAction}>
                <Text style={{color:'transparent', width:'33.33%'}}>Placeholder</Text>
                <Text style={{...styles.centeredBtnGrayText, lineHeight: windowHeight*0.08, textAlign:'center', width:'33.33%'}}>Settings</Text>
                <Text style={{color:'transparent', width:'33.34%'}}>Placeholder</Text>
            </Container>
            <Content>
                 <Button block bordered style = {{...styles.btnSpaceBtw, borderBottomWidth:0, borderColor: colours.dkGray}} onPress={()=> setWillCustomizePrompts(true)}>
                    <Text style={styles.centeredBtnGrayText} uppercase={false}>Customize your prompts</Text>
                    <Icon type='FontAwesome5' name='chevron-right' style={{color:colours.dkGray}} />
                </Button>
                <Button block bordered style = {{...styles.btnSpaceBtw, borderColor: colours.dkGray}} onPress={()=> setWillCustomizeDate(true)}>
                    <Text style={styles.centeredBtnGrayText} uppercase={false}>Time preferece (MM/DD/YY)</Text>
                    <Icon type='FontAwesome5' name='chevron-right' style={{color:colours.dkGray}}/>
                </Button>       
            </Content>        
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
    },
    ...commonStyles
  });
  