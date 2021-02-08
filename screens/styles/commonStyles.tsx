import { Dimensions } from "react-native";
import { StyleSheet } from 'react-native';
import colours from '../../constants/Colours';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const commonStyles= StyleSheet.create({
    actionBandMultipleAction: {
        display:'flex',
        flexDirection: 'row',
        justifyContent:'space-between',
        borderBottomColor: colours.ltGray,
        borderBottomWidth: 1,
        flexGrow:1, 
        height: windowHeight *0.08,
        maxHeight: windowHeight *0.08,
        marginBottom: windowHeight*0.03
    },
    actionBandSingleAction: {
        display:'flex',
        flexDirection: 'row',
        justifyContent:'flex-end',
        borderBottomColor: colours.ltGray,
        borderBottomWidth: 1,
        flexGrow:1, 
        height: windowHeight *0.08,
        maxHeight: windowHeight *0.08,
        marginBottom: windowHeight*0.03
    },
    centeredBtnGrayText: {
        color: colours.dkGray,
        fontSize: windowHeight*0.03
    },
    centeredBtnGreenText: {
        fontSize: windowHeight*0.03,
        color: colours.green
    },
    centeredBtnGreenTextDisabled: {
        fontSize: windowHeight*0.03,
        color: colours.ltGray,
        opacity:0.7
    },
    borderedInput: {
        borderWidth: 1,
        borderColor: colours.dkGray,
        width: windowWidth*0.8,
        paddingLeft: windowWidth*0.03
    },
    noBBW: {
        borderBottomWidth:0,
        height: windowHeight*0.12
    },
    labels: {
        marginBottom: 15
    }
})