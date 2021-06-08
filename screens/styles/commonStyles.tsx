import { Dimensions } from "react-native";
import { StyleSheet } from 'react-native';
import colours from '../../constants/Colours';
import { marginTop } from "../../utils/generic";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const commonStyles= StyleSheet.create({
    titleText:{
        marginLeft:5,
        color:colours.dkGray,
        fontSize:20,
        fontWeight:'bold'
    }, 
    subtitleText:{
        marginLeft:5,
        color:colours.ltGray,
        fontSize:14
    }, 
    greenBtnSelected: {
        margin:5,
        backgroundColor: colours.green,
        borderRadius:7
    },
    greenBtnUnSelected: {
        margin:5,
        backgroundColor: 'white',
        borderRadius:7
    },
    greenBtnTextSelected: {
        color:'white'
    },
    greenBtnTextUnSelected: {
        color: colours.green
    },
    actionBandMultipleAction: {
        display:'flex',
        flexDirection: 'row',
        justifyContent:'space-between',
        borderBottomColor: colours.ltGray,
        borderBottomWidth: 1,
        flexGrow:1, 
        height: windowHeight *0.08,
        maxHeight: windowHeight *0.08,
        marginBottom: windowHeight*0.03,
        marginTop: windowHeight*marginTop,
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
        marginBottom: windowHeight*0.03,
        marginTop: windowHeight*marginTop,
    },
    centeredBtnGrayText: {
        color: colours.dkGray,
        fontSize: windowHeight*0.03
    },
    centeredGreenText: {
        color: colours.green,
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
        borderColor: '#e5e3e3',
        width: windowWidth*0.8,
        paddingLeft: windowWidth*0.03,
        borderRadius:2
    },
    noBBW: {
        borderBottomWidth:0,
        height: windowHeight*0.12
    },
    labels: {
        marginBottom: 15
    },
    dkGrayHeading: {
        color:colours.dkGray,
        fontSize:20,
        paddingBottom:windowHeight*0.01
    }
})