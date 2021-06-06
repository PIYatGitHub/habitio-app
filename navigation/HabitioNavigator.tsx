import HabitsScreen from "../screens/HabitBuilder/HabitsScreen";
import LandingScreen from "../screens/Landing/LandingScreen";
import LoginScreen from "../screens/Auth/LoginScreen";
import MotivationScreen from "../screens/Motivation/MotivationScreen";
import RegisterScreen from "../screens/Auth/RegisterScreen";
import TagsScreen from "../screens/Tags/TagsScreen";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

const habitioNavigator = createStackNavigator(
  {
    LandingScreen: {
      screen: LandingScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    LoginScreen: {
      screen: LoginScreen,
      navigationOptions: {
        title: "",
      },
    },
    RegisterScreen: {
      screen: RegisterScreen,
      navigationOptions: {
        title: "",
      },
    },
    TagsScreen: {
      screen: TagsScreen,
      navigationOptions: {
        title: "",
      },
    },
    MotivationScreen: {
      screen: MotivationScreen,
      navigationOptions: {
        title: "",
      },
    },
    HabitsScreen: {
      screen: HabitsScreen,
      navigationOptions: {
        title: "",
      },
    },
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
    },
  }
);

export default createAppContainer(habitioNavigator);
