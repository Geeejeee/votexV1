// src/navigation/Navigation.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import RegistrationScreen from "../screens/register.jsx";
import LoginScreen from "../screens/login.jsx";
import HomeScreen from "../screens/homescreen.jsx";
import VoteNowScreen from "../screens/VoteNowScreen.jsx";
import votenow from "../styles/votenow.js";
const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Registration" component={RegistrationScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="VoteNow" component={VoteNowScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
