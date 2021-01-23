import { Container, Text } from 'native-base';

import {FlatList} from 'react-native';
import React from 'react';

// import { initialProductsState } from '../../constants/Seed';

const LoginScreen = (props:any) => {
    //const products = initialProductsState; //TODO> hook this using useFetch to get data from the API! 
    return (
        <Container>
            <Text>Hi from the login screen!</Text>
        </Container>
    )
}

export default LoginScreen; 