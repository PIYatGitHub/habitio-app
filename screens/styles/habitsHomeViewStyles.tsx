
import { Dimensions } from "react-native";
import { StyleSheet } from 'react-native';
import { commonStyles } from './commonStyles';
import colours from '../../constants/Colours';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const habitsHomeViewStyles = StyleSheet.create({
    blankHabitsContainer:{
        marginLeft:windowWidth*0.1,
        marginRight:windowWidth*0.1,
        marginTop:windowHeight*0.2
    },
    blankHabitsContainerText:{
        color: colours.ltGray,
        fontSize:20,
        textAlign:'center',
        marginBottom: 10,
    },
    container: {
        display:'flex',
        flexDirection:'column',
        justifyContent:'flex-start',
        marginLeft:windowWidth*0.05,
        marginRight:windowWidth*0.05,
        marginTop:5,
        borderWidth: 2,
        borderColor:colours.ltGray,
        borderRadius:10,
        height: windowHeight*0.3,
        maxHeight: windowHeight*0.3     
    },
    flexRowWrap: {
        display:'flex',
        flexDirection:'row', 
        flexWrap:'wrap'
    },
    
    nextStepSection: {
        backgroundColor: colours.green, 

        display:'flex',
        flexDirection: 'row',
        justifyContent:'space-between',
        borderBottomColor: colours.ltGray,
        borderBottomWidth: 1,
        flexGrow:1, 
        height: windowHeight *0.07,
        maxHeight: windowHeight *0.07,
        marginBottom: windowHeight*0.03,
        //For IPhone it breaks with small top marign
        marginTop: windowHeight*0.05,
    },
    ...commonStyles
  });