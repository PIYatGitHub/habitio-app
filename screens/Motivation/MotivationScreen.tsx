import { Button, Container, Content, Text } from 'native-base';
import {Dimensions, StyleSheet} from 'react-native';
import { IUser, IUserStateAction } from '../../constants/interfaces';
import React, { useState } from 'react';

import { commonStyles } from '../styles/commonStyles';
import { connect } from 'react-redux';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

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
        <Container>
            <Container style={styles.actionBandSingleAction}>
                <Button onPress={handleSubmit} transparent><Text style={styles.centeredBtnGreenText} uppercase={false}>Next</Text></Button>
            </Container>
                
            <Content style={{paddingLeft:10}}>
                <Text style={styles.titleText}>What motivates you?</Text>
                <Text style={styles.subtitleText}>Select one or both. You can edit later in settings.</Text>
                
                <Container style={styles.buttonRowContainer}>
                <Button 
                style={!selectedMotivations.includes(1) ? styles.greenBtnUnSelected: styles.greenBtnSelected}
                onPress = {()=>{handleMotivationClick(1)}}
                key={1}
                bordered = {!selectedMotivations.includes(1)}>
                    <Text uppercase={false} 
                     style={!selectedMotivations.includes(1) ? styles.greenBtnTextUnSelected: styles.greenBtnTextSelected}
                    >
                        The Carrot
                    </Text>
                </Button>     

                <Button 
                style={!selectedMotivations.includes(2) ? styles.greenBtnUnSelected: styles.greenBtnSelected}
                onPress = {()=>{handleMotivationClick(2)}}
                key={2}
                bordered = {!selectedMotivations.includes(2)}>
                    <Text uppercase={false} 
                     style={!selectedMotivations.includes(2) ? styles.greenBtnTextUnSelected: styles.greenBtnTextSelected}
                    >
                        The Stick
                    </Text>
                </Button>     
                </Container>
                

                 <Button key={3} transparent>
                    <Text uppercase={false} style={{...styles.centeredBtnGreenText, marginLeft:0,paddingLeft:5, marginTop:20}}>Request add custom</Text>
                </Button>  
            </Content>
        </Container>
    )
}

const styles = StyleSheet.create({
    buttonRowContainer: {
        display:'flex',
        flexDirection:'row',
        height: 48,
        marginTop:20, 
        marginBottom:0,
    },
   ...commonStyles
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