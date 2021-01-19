import { Container, Text } from 'native-base';

import React from 'react';

//import { initialProductsState } from '../../constants/Seed';

const LandingScreen = (props:any) => {
    //const products = initialProductsState; //TODO> hook this using useFetch to get data from the API! 
    return (
        <Container>
             <Text>Hello from the landing screen!</Text>
        </Container>
    )
}

LandingScreen.navigationOptions = {
    headerTitle: 'LandingScreen' //TODO change that from the json!
}

export default LandingScreen; 