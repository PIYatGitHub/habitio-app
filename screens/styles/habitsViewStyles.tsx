
import { Dimensions } from "react-native";
import { StyleSheet } from 'react-native';
import { commonStyles } from './commonStyles';
import colours from '../../constants/Colours';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const habitsViewStyles =  StyleSheet.create({
    blankHabitsContainer:{
        marginLeft:windowWidth*0.1,
        marginRight:windowWidth*0.1,
        marginTop:windowHeight*0.2
    },
    blankHabitsContainerText:{
        color: colours.ltGray,
        fontSize:20,
        textAlign:'center'
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
    ...commonStyles
  });