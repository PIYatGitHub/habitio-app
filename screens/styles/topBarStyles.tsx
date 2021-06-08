
import { Dimensions } from "react-native";
import { StyleSheet } from 'react-native';
import { habitsScreenStyles } from './habitsScreenStyles';
import colours from '../../constants/Colours';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const topBarStyles = StyleSheet.create({
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
    centerText: {
        ...habitsScreenStyles.centeredBtnGrayText,
        lineHeight:windowHeight*0.08,
    },
    btnMenu: {
        fontSize:30,
        textAlign:'left',
        width: 10,
        color:colours.dkGray,
    },
   ...habitsScreenStyles
  });