import { Button, Container, Content, Form, Input, Item, Label, Text } from 'native-base';
import { IUser, IUserStateAction } from '../../constants/interfaces';
import React, { useState } from 'react';
import { StatusBar, StyleSheet } from 'react-native';

import { Dimensions } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import colours from '../../constants/Colours';
import { connect } from 'react-redux';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const RegisterScreen = (props: { reduxUserState: (arg0: IUserStateAction) => void; navigation: string[]; }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const handleSubmit = async ()=> {
        const newUser: IUser  = {
            firstName,
            lastName,
            email,
            password,
            preferredTags: [],
            habits: [],
            motivation: [],
            userId: Number(Math.ceil(Math.random()*123873.4458)) 
        };

        console.log(`user saved successfully!`);
        const userStatePayload:IUserStateAction = {loggedIn:true, type: "LOGIN", user: newUser};
        props.reduxUserState(userStatePayload)
        props.navigation.push('TagsScreen');
    }

    const handleCancel = ()=> {
        props.navigation.push('LandingScreen');
    }

    const setDisabled = ()=>{
        return firstName.length === 0 || email.length === 0 || password.length === 0
    }

    return (
        <Container>
             <StatusBar barStyle="dark-content" backgroundColor={'white'}  hidden={false}/>
            <Container style={styles.actionBand}>
                <Button transparent onPress={handleCancel}>
                    <Text style={styles.centeredBtnGrayText} uppercase={false}>Cancel</Text>
                </Button>
                <Button transparent onPress={handleSubmit} disabled={setDisabled()}>
                    <Text style={setDisabled()?styles.centeredBtnGreenTextDisabled:styles.centeredBtnGreenText} uppercase={false}>Register</Text>
                </Button>
            </Container>
            <Container style={styles.formContainer}>
                <Content>
                        <Form>
                        <Item stackedLabel style={styles.noBBW} >
                            <Label style={styles.labels}>First name</Label>
                            <Input style={styles.borderedInput} value={firstName} onChangeText={(e)=>setFirstName(e)}/>
                        </Item>
                        <Item stackedLabel style={styles.noBBW}>
                            <Label style={styles.labels}>Last name</Label>
                            <Input style={styles.borderedInput} onChangeText={(e)=>setLastName(e)}/>
                        </Item>
                        <Item stackedLabel style={styles.noBBW}>
                            <Label style={styles.labels}>Email</Label>
                            <Input style={styles.borderedInput}
                            textContentType={'emailAddress'} keyboardType='email-address'
                            onChangeText={(e)=>setEmail(e)}
                            />
                        </Item>
                        <Item stackedLabel style={styles.noBBW}>
                            <Label style={styles.labels}>Password</Label>
                            <Input style={styles.borderedInput} secureTextEntry = {true}
                            onChangeText={(e)=>setPassword(e)}/>
                        </Item>
                    </Form>
                </Content>       
               
            </Container>    
        </Container>
    )
}

const styles = StyleSheet.create({
    actionBand: {
        display:'flex',
        flexDirection: 'row',
        justifyContent:'space-between',
        borderBottomColor: colours.ltGray,
        borderBottomWidth: 1,
        flexGrow:1, 
        height: windowHeight *0.08,
        maxHeight: windowHeight *0.08,
        marginBottom: windowHeight*0.03
    },
    formContainer: {
        display:'flex',
        flexGrow:1, 
        height: windowHeight *0.6,
        maxHeight: windowHeight *0.6,
    },
    canecelBtn: {
        borderRadius: 20,
        width: windowWidth * 0.6,
        marginLeft: windowWidth *0.2,
        marginBottom: windowHeight*0.05
    },
    centeredBtnGrayText: {
        color: colours.dkGray,
        fontSize: windowHeight*0.03
    },
    centeredBtnGreenText: {
        fontSize: windowHeight*0.03,
        color: colours.green
    },
    centeredBtnGreenTextDisabled: {
        fontSize: windowHeight*0.03,
        color: colours.ltGray,
        opacity:0.7
    },
    borderedInput: {
     borderWidth: 1,
     borderColor: colours.dkGray,
     width: windowWidth*0.8,
     paddingLeft: windowWidth*0.03
    },
    noBBW: {
        borderBottomWidth:0,
        height: windowHeight*0.12
    },
    labels: {
        marginBottom: 15
    }
  });

const mapStateToProps = (state: { authReducer: { user:IUser }; }) => {
    return {
        authenticatedUser: state.authReducer.user // potentially keeep that for reference
    };
};

const mapDispatchToProps = (dispatch: (arg0: any) => any) => {
    return {
        reduxUserState: (payload:IUserStateAction) => dispatch(payload),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);