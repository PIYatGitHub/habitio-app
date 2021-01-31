import { Button, Container, Text } from 'native-base';
import { StatusBar, StyleSheet } from 'react-native';

import React from 'react';
import colours from '../../constants/Colours';

const LandingScreen = (props:any) => {
    //const products = initialProductsState; //TODO> hook this using useFetch to get data from the API! 
    return (
        <Container style={styles.container}> 
        <StatusBar barStyle="light-content" backgroundColor={colours.primary} hidden={true} showHideTransition='slide'/>           
            <Text>Image placeholder</Text>
                <Button onPress={()=>{
                props.navigation.push('LoginScreen');
            }}>
            <Text>Login</Text>
            </Button>

            <Button style={{backgroundColor:colours.primary}} onPress={()=>{
                props.navigation.push('RegisterScreen');
            }}>
            <Text>Register</Text>
            </Button>
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        display:'flex',
        flexDirection:'column',
        justifyContent:'flex-start',
        borderWidth: 2,
        borderColor:'red'
    }
  });

export default LandingScreen; 