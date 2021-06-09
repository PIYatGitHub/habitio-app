import HabitsScreen from "../screens/HabitBuilder/HabitsScreen";
import EditHabitsScreen from "../screens/HabitBuilder/EditHabitScreen";
import LandingScreen from "../screens/Landing/LandingScreen";
import LoginScreen from "../screens/Auth/LoginScreen";
import MotivationScreen from "../screens/Motivation/MotivationScreen";
import RegisterScreen from "../screens/Auth/RegisterScreen";
import TagsScreen from "../screens/Tags/TagsScreen";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

const habitioNavigator = createStackNavigator(
  {
    // LandingScreen is disabled until we have back-end connectivity. Not Needed for the client atm 
    // LandingScreen: {
    //   screen: LandingScreen,
    //   navigationOptions: {
    //     headerShown: false,
    //   },
    // },
    // LoginScreen: {
    //   screen: LoginScreen,
    //   navigationOptions: {
    //     title: "",
    //   },
    // },
    // RegisterScreen: {
    //   screen: RegisterScreen,
    //   navigationOptions: {
    //     title: "",
    //   },
    // },
    // TagsScreen: {
    //   screen: TagsScreen,
    //   navigationOptions: {
    //     title: "",
    //   },
    // },
    // MotivationScreen: {
    //   screen: MotivationScreen,
    //   navigationOptions: {
    //     title: "",
    //   },
    // },
    HabitsScreen: {
      screen: HabitsScreen,
      navigationOptions: {
        title: "Test",
      },
    },
    EditHabitsScreen: {
      screen: EditHabitsScreen,
      navigationOptions: {
        title: "Edit Test",
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
