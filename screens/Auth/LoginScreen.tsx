import { Button, Container, Content, Form, Input, Item, Label, Text } from 'native-base';
import { IUser, IUserStateAction } from '../../constants/interfaces';
import React, { useState } from 'react';

import { StatusBar } from 'react-native';
import { StyleSheet } from 'react-native';
import colours from '../../constants/Colours';
import { commonStyles } from '../styles/commonStyles';
import { connect } from 'react-redux';
import { emptyUser } from '../../reducers/userStateReducer';
import storage from '../../constants/db';

const LoginScreen = (props: { reduxUserState: (arg0: IUserStateAction) => void; navigation: string[]; authenticatedUser:IUser }) => {
    const [email, setEmail] = useState('test@ntpy.com');//todo remove thse! 
    const [password, setPassword] = useState('test');

    const handleSubmit = async()=> {
        console.log(`the reducer did work!!!!`, props.authenticatedUser);
        let users:IUser[] = await storage.load({key:'users'});
        console.log(`users...`, users);
        const user = users.find(u=> u.email === email);
        
        let isUserLoggedIn = false; 
        if(user?.password === password) {
            //LOGGED IN
            console.log(`logged in!`);
            isUserLoggedIn = true;
        } else if(!user || user.password!== password) {
            // wrong pass! 
            console.log(`wrong username or pass!`);
            isUserLoggedIn = false; 
        }   

        const userPayload:IUser = isUserLoggedIn? { 
            userId: 1, 
            firstName: "Test",
            lastName: "User",
            email: "test@ntpy.com",
            password: "test",
            preferredTags: [1, 3, 5, 6],
            habits: [],
            motivation: [1]
        }
        :emptyUser ;
         
        const userStatePayload:IUserStateAction = {loggedIn:isUserLoggedIn, type: "LOGIN", user:userPayload};

        props.reduxUserState(userStatePayload);
        isUserLoggedIn && props.navigation.push('TagsScreen');
    }; 
    
    const handleCancel = ()=> {
        props.navigation.push('LandingScreen');
    }

    const setDisabled = ()=>{
        return email.length === 0 || password.length === 0
    }

    return (
        <Container>
            <StatusBar barStyle="dark-content" backgroundColor='white' hidden={false}/>
            <Container style={styles.container}>
                <Container style={styles.actionBandMultipleAction}>
                    <Button transparent onPress={handleCancel}><Text style={styles.centeredBtnGrayText} uppercase={false}>Cancel</Text></Button>
                    <Button transparent onPress={handleSubmit}><Text
                     style={setDisabled()?styles.centeredBtnGreenTextDisabled:styles.centeredBtnGreenText} 
                     uppercase={false}>
                         Sign in
                     </Text>
                     </Button>
                </Container>
                <Content>
                    <Form>
                        <Item stackedLabel style={styles.noBBW} >
                            <Label style={styles.labels}>First name</Label>
                            <Input 
                            textContentType={'emailAddress'} keyboardType='email-address'
                            value = {email}
                            style={styles.borderedInput}
                            onChangeText={(e)=>setEmail(e)}
                            />                
                        </Item>
                        <Item stackedLabel style={styles.noBBW}>
                            <Label style={styles.labels}>Password</Label>
                            <Input style={styles.borderedInput} secureTextEntry = {true}
                            value={password}
                            onChangeText={(e)=>setPassword(e)}/>
                        </Item>
                    </Form>
                </Content>
                </Container>
            </Container>
            
    )
}

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
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

const styles = StyleSheet.create({
    container: {
        paddingTop:0
    },
    ...commonStyles
  });
  