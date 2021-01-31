import { Button, Container, Content, Text } from 'native-base';
import { IUser, IUserStateAction } from '../../constants/interfaces';
import React, { useState } from 'react';

import {StyleSheet} from 'react-native';
import { connect } from 'react-redux';

const TagsScreen = (props: { reduxUserState: (arg0: IUserStateAction) => void, authenticatedUser: IUser; navigation: string[]}) => {
    const [selectedMotivations, setSelectedMotivations] = useState<number []>(props.authenticatedUser.motivation);

    const handleSubmit = async ()=> {
        const userPayload:IUser = Object.assign({}, props.authenticatedUser); 
        userPayload.motivation = selectedMotivations; 
        const userStatePayload:IUserStateAction = {loggedIn:true, type: "SET_MOTIVAITON", user:userPayload};

        props.reduxUserState(userStatePayload);
        props.navigation.push('HabitsScreen');
    }
    const handleMotivationClick = (motivationId:number)=>{
        console.log(`clicking on motivation with id...`, motivationId);
        let newMotivations:number[] = Object.assign([], selectedMotivations); 

        if(!selectedMotivations.includes(motivationId)) {
            newMotivations.push(motivationId);
        } else{
            const spliceIdx = selectedMotivations.indexOf(motivationId); 
            if(spliceIdx !== -1){
                newMotivations.splice(spliceIdx,1);               
            }
        }
        newMotivations = newMotivations.sort((a,b) =>a-b);
        setSelectedMotivations(newMotivations); 
        console.log(`selected tags rewored`, newMotivations);          
    }

    return (
        <Container style = {styles.container}>
                <Button onPress={handleSubmit} transparent><Text>Next</Text></Button>
                 <Content>
                 <Text>What motivates you</Text>
                 <Text>Select one or both. You can edit later in settings.</Text>
                 <Button onPress = {()=>{handleMotivationClick(1)}} key={1} bordered = {!selectedMotivations.includes(1)}>
                    <Text>The carrot</Text>
                </Button>     

                <Button onPress = {()=>{handleMotivationClick(2)}} key={2} bordered = {!selectedMotivations.includes(2)}>
                    <Text>The stick</Text>
                </Button>     
                </Content>
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        display:'flex',
        flexDirection:'column',
        justifyContent:'flex-start'
    }
  });

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
export default connect(mapStateToProps, mapDispatchToProps)(TagsScreen);