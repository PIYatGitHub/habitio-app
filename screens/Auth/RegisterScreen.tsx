import { Button, Container, Content, Form, Input, Item, Label, Text } from 'native-base';
import { IUser, IUserStateAction } from '../../constants/interfaces';
import React, { useState } from 'react';
import { StatusBar, StyleSheet } from 'react-native';

import { Dimensions } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import colours from '../../constants/Colours';
import { commonStyles } from '../styles/commonStyles';
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
            <Container style={styles.actionBandMultipleAction}>
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
                            <Input style={styles.borderedInput} value={lastName} onChangeText={(e)=>setLastName(e)}/>
                        </Item>
                        <Item stackedLabel style={styles.noBBW}>
                            <Label style={styles.labels}>Email</Label>
                            <Input style={styles.borderedInput}
                            value={email}
                            textContentType={'emailAddress'} keyboardType='email-address'
                            onChangeText={(e)=>setEmail(e)}
                            />
                        </Item>
                        <Item stackedLabel style={styles.noBBW}>
                            <Label style={styles.labels}>Password</Label>
                            <Input value={password} style={styles.borderedInput} secureTextEntry = {true}
                            onChangeText={(e)=>setPassword(e)}/>
                        </Item>
                    </Form>
                </Content>       
               
            </Container>    
        </Container>
    )
}

const styles = StyleSheet.create({
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
    ...commonStyles
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