import { Body, Button, CheckBox, Container, Content, ListItem, Text } from 'native-base';
import { Dimensions, StyleSheet } from 'react-native';
import React, { useState } from 'react';

import { IUser } from '../../../constants/interfaces';
import colours from '../../../constants/Colours';
import { commonStyles } from '../../styles/commonStyles';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
interface IPromptsProps {
    onEditDone: ()=>void;
    authenticatedUser:IUser;
}

const Settings_Prompts = (props: IPromptsProps) => {
    const [isCarrot, setIsCarrot] = useState(true); 
    const [isCarrot1Checked, setIsCarrot1Checked] = useState(true); 
    const [isCarrot2Checked, setIsCarrot2Checked] = useState(true); 
    const [isStick1Checked, setIsStick1Checked] = useState(true); 
    const [isStick2Checked, setIsStick2Checked] = useState(true); 
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
        <Container style={{maxHeight:windowHeight, height:windowHeight}}>
            <Container style={styles.actionBandMultipleAction}>
                <Button transparent onPress={handleCancel} style={{height:'100%', width:'33.33%'}}><Text style={{...styles.centeredBtnGrayText}} uppercase={false}>Cancel</Text></Button>
                <Text style={{...styles.centeredBtnGrayText, lineHeight:windowHeight*0.08, width:'33.33%', textAlign:'center'}}>Prompts</Text>
                <Button transparent onPress={handleSave} style={{height:'100%', width:'33.33%'}}><Text style={{...styles.centeredBtnGreenText, width:'100%', textAlign:'right'}} uppercase={false}>Save</Text></Button>
            </Container>
            {/* TODO fiddle with this layout */}
            <Content style={{marginLeft:windowWidth*0.05, marginRight: windowWidth*0.05}}>
                <Text style={styles.centeredBtnGrayText}>Customize your prompts</Text>
                <Container style={styles.buttonsContainer}>
                    <Button transparent style={isCarrot?styles.btnActive:styles.btnInactive} onPress={()=>{setIsCarrot(true)}}>
                        <Text uppercase={false} style={{...styles.centeredBtnGrayText, fontSize:16, color: isCarrot? colours.dkGray: colours.ltGray}}>Carrot</Text>
                    </Button>
                    <Button transparent style={!isCarrot?styles.btnActive:styles.btnInactive} onPress={()=>{setIsCarrot(false)}}>
                        <Text uppercase={false} style={{...styles.centeredBtnGrayText, fontSize:16,color: !isCarrot? colours.dkGray: colours.ltGray}}>Stick</Text>
                    </Button>
                </Container>
                {isCarrot?(
                    <Container style={{maxHeight:windowHeight*0.35}}>
                    <Content>
                    <ListItem style={{...styles.noBBW, height:windowHeight*0.08, marginLeft:0}}  onPress={()=>setIsCarrot1Checked(!isCarrot1Checked)}>
                        <CheckBox checked={isCarrot1Checked} color={colours.green} style={{borderColor:colours.green }} onPress={()=>setIsCarrot1Checked(!isCarrot1Checked)}/>
                        <Body>
                        <Text>One foot forward. You are closer to your goal.</Text>
                        </Body>
                    </ListItem>
                    <ListItem style={{...styles.noBBW, height:windowHeight*0.08, marginLeft:0}} onPress={()=>setIsCarrot2Checked(!isCarrot2Checked)}>
                        <CheckBox checked={isCarrot2Checked} color={colours.green} style={{borderColor:colours.green }} onPress={()=>setIsCarrot2Checked(!isCarrot2Checked)}/>
                        <Body>
                        <Text>You are your own best friend.</Text>
                        </Body>
                    </ListItem>
                       
                        <Text style={styles.textTab}>Examples</Text>
                        <Text style={styles.textTab}>Are you ready to_________?</Text>
                        <Text style={styles.textTab}>How excited do you feel to_________?</Text>
                        <Text style={styles.textTab}>How do you see yourself_________?</Text>
                    </Content>
                       
                    </Container>
                ):(
                    <Container style={{maxHeight:windowHeight*0.35}}>
                        <Content>
                            <ListItem style={{...styles.noBBW, height:windowHeight*0.08, marginLeft:0}}  onPress={()=>setIsStick1Checked(!isStick1Checked)}>
                                <CheckBox checked={isStick1Checked} color={colours.green} style={{borderColor:colours.green }} onPress={()=>setIsStick1Checked(!isStick1Checked)}/>
                                <Body>
                                <Text>Get yourself together!  You can and must do this.</Text>
                                </Body>
                            </ListItem>
                            <ListItem style={{...styles.noBBW, height:windowHeight*0.08, marginLeft:0}} onPress={()=>setIsStick2Checked(!isStick2Checked)}>
                                <CheckBox checked={isStick2Checked} color={colours.green} style={{borderColor:colours.green }} onPress={()=>setIsStick2Checked(!isStick2Checked)}/>
                                <Body>
                                <Text>Never allow failure!</Text>
                                </Body>
                            </ListItem>
                             <Text style={styles.textTab}>Examples</Text>
                            <Text style={styles.textTab}>Are you giving up on_________?</Text>
                            <Text style={styles.textTab}>Why did you fail to_________?</Text>
                            <Text style={styles.textTab}>You need to act on_________now!</Text>
                        </Content>
                   
                </Container>
                )}  
                
                <Container style={{...styles.buttonsContainer, justifyContent:'space-between'}}>
                    <Button bordered style={styles.borderedCallToAction} >
                        <Text style={{color:colours.green, fontSize:16}} uppercase={false}>Try premium</Text></Button>
                    <Button bordered style={styles.borderedCallToAction}>
                        <Text style={{color:colours.green, fontSize:16}} uppercase={false}>Give feedback</Text></Button>
                </Container>
            </Content>
        </Container>
    )
}
export default Settings_Prompts;

const styles = StyleSheet.create({
    buttonsContainer: {
        display:'flex',
        flexDirection:'row',
        justifyContent:'flex-start',
        marginTop:windowHeight*0.03,
        marginBottom:windowHeight*0.03,
        maxHeight:48
    },
    textTab:{
        marginLeft: windowWidth*0.1
    },
    btnActive:{
        borderBottomColor:colours.green,
        borderBottomWidth:1
    }, 
    btnInactive:{
        borderBottomColor:'transparent',
        borderBottomWidth:1
    },
    borderedCallToAction:{
        borderColor:colours.green,
        borderRadius:20,
        borderWidth:2
    },
    ...commonStyles
  });
  