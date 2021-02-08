import { Button, Container, Content, Icon, Text } from 'native-base';
import {Dimensions, StyleSheet} from 'react-native';
import { ITag, IUser, IUserStateAction } from '../../constants/interfaces';
import React, { useState } from 'react';

import colours from '../../constants/Colours';
import { commonStyles } from '../styles/commonStyles';
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

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const TagsScreen = (props: {reduxUserState: (arg0: IUserStateAction) => void, authenticatedUser: IUser; navigation: string[]}) => {
    const [selectedTags, setSelectedTags] = useState<number []>(props.authenticatedUser.preferredTags);
    const tags = generateTags(props.authenticatedUser.firstName); 
     
    const handleSubmit = async ()=> {
        const userPayload:IUser = Object.assign({}, props.authenticatedUser); 
        userPayload.preferredTags = selectedTags; 
        const userStatePayload:IUserStateAction = {loggedIn:true, type: "SET_TAGS", user:userPayload};

        props.reduxUserState(userStatePayload);
        props.navigation.push('MotivationScreen');
    }
    const handleTagClick = (tagId:number)=>{
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
        <Container>
            <Container style={styles.actionBandSingleAction}>
                <Button onPress={handleSubmit} transparent><Text style={styles.centeredBtnGreenText} uppercase={false}>Next</Text></Button>
            </Container>
            <Container>
                <Text>How can we adddress you?</Text>
                <Text>Select all that apply. You can edit later in settings.</Text>
            </Container>
            <Container style={styles.tagList}>    
            {tags.map(tag=>{
            return(
                <Button style={!selectedTags.includes(tag.tagId) ? styles.tagBtnUnSelected: styles.tagBtnSelected} onPress = {()=>{handleTagClick(tag.tagId)}} key={tag.tagId} bordered = {!selectedTags.includes(tag.tagId)}>
                    <Text 
                    style={!selectedTags.includes(tag.tagId) ? styles.tagTextUnSelected: styles.tagTextSelected}
                    uppercase={false}>
                    {tag.tagName}
                    </Text>
                </Button>                            
                )
            })}
               
            </Container>
            <Button transparent>
                <Icon name='add-circle' style={{color: colours.green, marginRight:0}}/>
                <Text uppercase={false} style={styles.centeredBtnGreenText}>Add Your Own</Text>
            </Button>
        </Container>
    )
}

const styles = StyleSheet.create({
    tagList: {
        marginTop:0,
        display: 'flex',
        flexDirection:'row',
        flexWrap:'wrap',
        alignContent:'center',
        flexGrow:1, 
        height: windowHeight *0.65,
        maxHeight: windowHeight *0.65,
        marginBottom: windowHeight*0.03
    }, 
    tagBtnSelected: {
        margin:5,
        backgroundColor: colours.green,
        borderRadius:7
    },
    tagBtnUnSelected: {
        margin:5,
        backgroundColor: 'white',
        borderRadius:7
    },
    tagTextSelected: {
        color:'white'
    },
    tagTextUnSelected: {
        color: colours.green
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