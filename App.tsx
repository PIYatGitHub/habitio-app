import { Root, Spinner } from "native-base";
import { persistor, store } from "./constants/store";
import "./i18n";
import HabitioNavigator from "./navigation/HabitioNavigator";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import React from "react";
import { StyleSheet } from "react-native";
import { useFonts } from "expo-font";

const App = () => {
  let [fontsLoaded] = useFonts({
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    Roboto_medium: require("./assets/fonts/Roboto-Medium.ttf"),
  });

  if (!fontsLoaded) {
    return <Spinner color="green" />;
  }

  return (
    <Root>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <HabitioNavigator />
        </PersistGate>
      </Provider>
    </Root>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
