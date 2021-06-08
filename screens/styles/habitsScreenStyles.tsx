
import { Dimensions } from "react-native";
import { StyleSheet } from 'react-native';
import { commonStyles } from './commonStyles';
import colours from '../../constants/Colours';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const habitsScreenStyles = StyleSheet.create({
    placeholder:{
        color:'transparent',
        width:'33.33%'
    },
    centeredActionBarText:{
        width:'33.33%',
        color:colours.dkGray,
        textAlign:'center',
        lineHeight:windowHeight*0.08
    },
    rightActionBtn:{
        width:'33.34%',
        height: windowHeight*0.08
    },
    rightActionBtnText:{
        fontSize:30,
        textAlign:'right',
        width:'100%',
        color:colours.dkGray
    },
    buttonRowContainer: {
        display:'flex',
        flexDirection:'row',
        height: 48,
        marginTop:20, 
        marginBottom:0,
    },
   ...commonStyles
  });