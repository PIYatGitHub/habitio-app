import { Button, Container, Text } from "native-base";
import { StatusBar, StyleSheet } from "react-native";
import React, { useState } from "react";
import colours from "../../constants/Colours";
import { useTranslation } from "react-i18next";

const LandingScreen = (props: any) => {
  const { t, i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState("bg");

  const changeLanguage = () => {
    const language = currentLanguage === "bg" ? "en" : "bg";

    setCurrentLanguage(language);
    i18n.changeLanguage(language);
  };

  return (
    <Container style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colours.primary}
        hidden={true}
        showHideTransition="slide"
      />
      <Text style={styles.title}>Just Doooooo it</Text>
      <Button
        bordered
        onPress={() => changeLanguage()}
        style={styles.authButton}
      >
        <Text uppercase={false} style={styles.centeredBtnText}>
          {t("hello")}
        </Text>
      </Button>

      <Button
        bordered
        onPress={() => {
          props.navigation.push("LoginScreen");
        }}
        style={styles.authButton}
      >
        <Text uppercase={false} style={styles.centeredBtnText}>
          Login
        </Text>
      </Button>

      <Button
        style={styles.authButton}
        onPress={() => {
          props.navigation.push("RegisterScreen");
        }}
      >
        <Text uppercase={false} style={styles.centeredBtnText}>
          Register
        </Text>
      </Button>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    backgroundColor: colours.dkGray,
  },
  title: {
    color: "white",
    textAlign: "center",
    fontSize: 14,
    marginTop: "35%",
    marginBottom: "20%",
  },
  authButton: {
    borderRadius: 20,
    width: "60%",
    marginLeft: "20%",
    marginBottom: "5%",
  },
  centeredBtnText: {
    color: "white",
    width: "100%",
    textAlign: "center",
    fontSize: 12,
  },
});

export default LandingScreen;
