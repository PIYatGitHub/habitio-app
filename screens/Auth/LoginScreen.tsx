import { Button, Container, Content, Form, Input, Item, Text } from 'native-base';
import { IUser, IUserStateAction } from '../../constants/interfaces';
import React, { useState } from 'react';

import { StatusBar } from 'react-native';
import { StyleSheet } from 'react-native';
import colours from '../../constants/Colours';
import { connect } from 'react-redux';
import { emptyUser } from '../../reducers/userStateReducer';
import storage from '../../constants/db';

const LoginScreen = (props: { reduxUserState: (arg0: IUserStateAction) => void; navigation: string[]; authenticatedUser:IUser }) => {
    const [email, setEmail] = useState('nacho@ntpy.com');
    const [password, setPassword] = useState('strong');

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
        "firstName": "Nacho",
        "lastName": "Tsvetkov",
        "email": "nacho@ntpy.com",
        "password": "strong",
        "preferredTags": [1, 3, 5, 6]}
        :emptyUser ;
         
        const userStatePayload:IUserStateAction = {loggedIn:isUserLoggedIn, type: "LOGIN", user:userPayload};

        props.reduxUserState(userStatePayload);
        isUserLoggedIn && props.navigation.push('TagsScreen');
    }; 
    
    const handleCancel = ()=> {
        props.navigation.push('LandingScreen');
    }

    return (
        <Container>
            <StatusBar barStyle="light-content" backgroundColor={colours.primary} />
            <Container style={styles.container}>
                <Container>
                    <Button onPress={handleCancel}><Text>Cancel</Text></Button>
                    <Button onPress={handleSubmit}><Text>Sign in</Text></Button>
                </Container>
                <Content>
                    <Form>                 
                        <Item>
                        <Input placeholder="Email" 
                        textContentType={'emailAddress'} keyboardType='email-address'
                        onChangeText={(e)=>setEmail(e)}
                        />
                        </Item>
                        <Item last>
                        <Input placeholder="Password" 
                        secureTextEntry = {true} onChangeText={(e)=>setPassword(e)}/>
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
        paddingTop:24
    }
  });
  