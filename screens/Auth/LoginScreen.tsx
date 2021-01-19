import { Container, Text } from 'native-base';

import {FlatList} from 'react-native';
import React from 'react';

// import { initialProductsState } from '../../constants/Seed';

const LoginScreen = (props:any) => {
    //const products = initialProductsState; //TODO> hook this using useFetch to get data from the API! 
    return (
        <Container>
            <Text>Hi from the landing screen!</Text>
        </Container>
    )
}

LoginScreen.navigationOptions = {
    headerTitle: '' //TODO change that from the json!
}

export default LoginScreen; 