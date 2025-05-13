import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RegistrationScreen from "../screens/register.jsx";
import LoginScreen from "../screens/login.jsx";
import HomeScreen from "../screens/homescreen.jsx";
import VoteNowScreen from "../screens/VoteNowScreen.jsx";
import VoteElectionScreen from "../screens/VoteElectionScreen.jsx";
import ProfileScreen from "../screens/ProfileScreen.jsx";
const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Registration" component={RegistrationScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="VoteNow" component={VoteNowScreen} />
      <Stack.Screen name="VoteElection" component={VoteElectionScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

export default Navigation;
