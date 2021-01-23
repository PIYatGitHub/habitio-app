import { Button, Container, Content, Text } from 'native-base';
import { ITag, IUser, IUserStateAction } from '../../constants/interfaces';
import React, { useState } from 'react';

import { connect } from 'react-redux';

const generateTags = (name:string):ITag[]=> {
    return [
        {"tagId": 1, "tagName": `Hey ${name}!`},
        {"tagId": 2, "tagName":"Hey mister!"},
        {"tagId": 3, "tagName":"Hey lady!"},
        {"tagId": 4, "tagName":"Bruh"},
        {"tagId": 5, "tagName":"Bae"},
        {"tagId": 6, "tagName":"Hey sexy"},
        {"tagId": 7, "tagName": "Yo bitch"},
        {"tagId": 8, "tagName": "Chica"},
        {"tagId": 9, "tagName": "Chico"},
        {"tagId": 10, "tagName": "Chicx"},
        {"tagId": 11, "tagName": "Dude"},
        {"tagId": 12, "tagName": "Dudette"},
        {"tagId": 13, "tagName": "Viking"},
        {"tagId": 14, "tagName": "Future world dominator"},
        {"tagId": 15, "tagName": "Warrior"},
        {"tagId": 16, "tagName": "Warrior princess"},
        {"tagId": 17, "tagName": "Warrior prince"}
    ]
}


const TagsScreen = (props: { authenticatedUser: IUser; navigation: string[]}) => {
    const [selectedMotivations, setSelectedMotivations] = useState<number []>([]);
    const tags = generateTags(props.authenticatedUser.firstName); 
     
    const handleSubmit = async ()=> {
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
            <Container>
                <Button onPress={handleSubmit}><Text>Next</Text></Button>
            </Container>
            <Container>
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
export default connect(mapStateToProps, mapDispatchToProps)(TagsScreen);