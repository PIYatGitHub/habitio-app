
import { Dimensions } from "react-native";
import { StyleSheet } from 'react-native';
import { commonStyles } from './commonStyles';
import colours from '../../constants/Colours';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const editHabitScreenStyles = StyleSheet.create({
    text:{
        ...commonStyles.centeredBtnGrayText, 
        lineHeight:windowHeight*0.08, 
        marginLeft: 10,
        color: colours.green,
    },
    cardStyle:{marginLeft:windowWidth*0.05, 
        marginRight:windowWidth*0.05, 
        borderRadius:10
    },
    cardItemStyle:{
        borderRadius:10
    },
    ...commonStyles
  });