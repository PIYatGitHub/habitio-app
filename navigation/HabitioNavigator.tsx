import LandingScreen from '../screens/Landing/LandingScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import { Platform } from 'react-native';
import colours from '../constants/Colours';
import {createAppContainer} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const habitioNavigator = createStackNavigator({
    LandingScreen: LandingScreen,
    LoginScreen: LoginScreen
}, {
    defaultNavigationOptions: {    
        headerStyle: {
            backgroundColor: Platform.OS === 'android'? 'primary': '',
        },
        headerTintColor:  Platform.OS === 'android'? 'white': colours.primary,

    }
});

export default createAppContainer(habitioNavigator)