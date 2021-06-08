
import { Dimensions } from "react-native";
import { StyleSheet } from 'react-native';
import { habitsScreenStyles } from './habitsScreenStyles';
import colours from '../../constants/Colours';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const topBarStyles = StyleSheet.create({
    centerText: {
        ...habitsScreenStyles.centeredBtnGrayText,
        lineHeight:windowHeight*0.08
    },
    btnAddHabit: {
        fontSize:30,
        textAlign:'right',
        width:'100%',
        color:colours.dkGray
    },
   ...habitsScreenStyles
  });