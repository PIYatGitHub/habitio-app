import { Button, Container, Content, Text } from 'native-base';
import { ITag, IUser, IUserStateAction } from '../../constants/interfaces';
import React, { useState } from 'react';

import {StyleSheet} from 'react-native';
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


const TagsScreen = (props: {reduxUserState: (arg0: IUserStateAction) => void, authenticatedUser: IUser; navigation: string[]}) => {
    const [selectedTags, setSelectedTags] = useState<number []>(props.authenticatedUser.preferredTags);
    const tags = generateTags(props.authenticatedUser.firstName); 
     
    const handleSubmit = async ()=> {
        // TODO make an api call here 
       
        //TODO go to motivation screen!
        const userPayload:IUser = Object.assign({}, props.authenticatedUser); 
        userPayload.preferredTags = selectedTags; 
        const userStatePayload:IUserStateAction = {loggedIn:true, type: "SET_TAGS", user:userPayload};

        props.reduxUserState(userStatePayload);
        props.navigation.push('MotivationScreen');
    }
    const handleTagClick = (tagId:number)=>{
        console.log(`clicking on tag with id...`, tagId);
        let newTags:number[] = Object.assign([], selectedTags); 

        if(!selectedTags.includes(tagId)) {
            newTags.push(tagId);
        } else{
            const spliceIdx = selectedTags.indexOf(tagId); 
            if(spliceIdx !== -1){
                newTags.splice(spliceIdx,1);               
            }
        }
        newTags = newTags.sort((a,b) =>a-b);
        setSelectedTags(newTags); 
        console.log(`selected tags rewored`, newTags);        
    }

    return (
        <Container style={styles.container}>
            <Button onPress={handleSubmit} transparent><Text>Next</Text></Button>
            <Container style={styles.tagList}>
                {tags.map(tag=>{
                    return(
                        <Button style={styles.tag} onPress = {()=>{handleTagClick(tag.tagId)}} key={tag.tagId} bordered = {!selectedTags.includes(tag.tagId)}>
                            <Text>{tag.tagName}</Text>
                        </Button>                            
                    )
                })}
            </Container>
            <Button>
                <Text>Add your own</Text>
            </Button>
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        display:'flex',
        flexDirection:'column',
        justifyContent:'flex-start',
        alignContent:'flex-start',
        alignItems:'flex-start'
    },
    tagList: {
        marginTop:0,
        display: 'flex',
        flexDirection:'row',
        flexWrap:'wrap',
        alignContent:'center'
    }, 
    tag: {
        margin:5
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