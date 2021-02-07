import { Button, Container, Text } from 'native-base';
import { StatusBar, StyleSheet } from 'react-native';

import { Dimensions } from 'react-native';
import React from 'react';
import colours from '../../constants/Colours';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const LandingScreen = (props:any) => {
    return (
        <Container style={styles.container}> 
        <StatusBar barStyle="light-content" backgroundColor={colours.primary} hidden={true} showHideTransition='slide'/>           
            <Text style={styles.title}>Just Doooooo it</Text>
            <Button bordered onPress={()=>{
                props.navigation.push('LoginScreen');
            }} style={styles.authButton}>
                <Text uppercase={false} style = {styles.centeredBtnText}>Login</Text>
            </Button>

            <Button style={styles.authButton} onPress={()=>{
                props.navigation.push('RegisterScreen');
            }}>
            <Text uppercase={false} style = {styles.centeredBtnText}>Register</Text>
            </Button>
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        display:'flex',
        flexDirection:'column',
        justifyContent:'flex-start',
        backgroundColor: colours.dkGray
    }, 
    title: {
        color: 'white',
        textAlign:'center',
        fontSize: windowWidth*0.12,
        marginTop: windowHeight*0.35,
        marginBottom: windowHeight*0.2,
    },
    authButton: {
        borderRadius: 20,
        width: windowWidth * 0.6,
        marginLeft: windowWidth *0.2,
        marginBottom: windowHeight*0.05
    },
    centeredBtnText: {
        color:'white',
        width: '100%',
        textAlign: 'center',
        fontSize: windowHeight*0.03
    }
  });

export default LandingScreen; 