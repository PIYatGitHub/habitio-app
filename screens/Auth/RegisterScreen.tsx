import { Button, Container, Content, Form, Input, Item, Text } from 'native-base';
import { IUser, IUserStateAction } from '../../constants/interfaces';
import React, { useState } from 'react';

import { connect } from 'react-redux';
import storage from '../../constants/db';

const RegisterScreen = (props: { reduxUserState: (arg0: IUserStateAction) => void; navigation: string[]; }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const handleSubmit = async ()=> {
        // TODO make an api call here 
        let users: IUser[] = await storage.load({key:'users'}); 
        users.push({
             firstName,
             lastName,
             email,
             password,
            preferredTags: []
            });

        storage.save({
            key:'users',
            data: users
        });
        console.log(`user saved successfully!`);
        //TODO go to tags screen!
        // let isKey:IUser[] = await storage.getAllDataForKey('currentUser');
        // console.log('what does is key read?')

        const userStatePayload:IUserStateAction = {loggedIn:true, type: "LOGIN", user:{
            firstName,
            lastName,
            email,
            password,
            preferredTags: []
        }
    };

        props.reduxUserState(userStatePayload)
        props.navigation.push('TagsScreen');
    }

    const handleCancel = ()=> {
        props.navigation.push('LandingScreen');
    }

    return (
        <Container>
            <Container>
                <Button onPress={handleCancel}><Text>Cancel</Text></Button>
                <Button onPress={handleSubmit}><Text>Register</Text></Button>
            </Container>
            <Content>
                <Form>
                    <Item>
                    <Input placeholder="First name" value={firstName} onChangeText={(e)=>setFirstName(e)}/>
                    </Item>
                    <Item>
                    <Input placeholder="Last name" onChangeText={(e)=>setLastName(e)}/>
                    </Item>
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
    )
}

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