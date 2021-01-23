import { Button, Container, Text } from 'native-base';

import React from 'react';
import colours from '../../constants/Colours';

const LandingScreen = (props:any) => {
    //const products = initialProductsState; //TODO> hook this using useFetch to get data from the API! 
    return (
        <Container>
            <Container>
                <Text>Image placeholder</Text>
            </Container>
             <Container>
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
             
        </Container>
    )
}


export default LandingScreen; 