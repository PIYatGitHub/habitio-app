import LandingScreen from '../screens/Landing/LandingScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import { Platform } from 'react-native';
import colours from '../constants/Colours';
import {createAppContainer} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const habitioNavigator = createStackNavigator({
    LandingScreen: {
        screen: LandingScreen,
        navigationOptions: {
            headerShown:false
        }
    },
    LoginScreen: {
        screen: LoginScreen,
        navigationOptions: {
            title:"sup?"
        }
    }
}, {
    defaultNavigationOptions: {    
        headerStyle: {
            backgroundColor: Platform.OS === 'android'? 'green': '',
        },
        headerTintColor:  Platform.OS === 'android'? 'yellow': colours.primary,
    }
});

export default createAppContainer(habitioNavigator)