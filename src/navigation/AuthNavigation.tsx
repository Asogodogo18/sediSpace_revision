import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  OnboardingScreen,
  AuthScreen,
  ForgotPasswordScreen,
  ProfileUpdate,
  SignUp,
  Aide,
} from "../screens";
import { AuthProvider } from "../Context";

const AuthStack = createNativeStackNavigator();

const AuthNavigation = () => {
  return (
    <AuthProvider>
      <AuthStack.Navigator
        initialRouteName="Authentification"
        screenOptions={{ headerShown: false }}
      >
        <AuthStack.Screen name="Onboarding" component={OnboardingScreen} />
        <AuthStack.Screen name="Authentification" component={AuthScreen} />
        <AuthStack.Screen name="Inscription" component={SignUp} />
        <AuthStack.Screen name="ProfileUpdate" component={ProfileUpdate} />
        <AuthStack.Screen name="Mpo" component={ForgotPasswordScreen} />
        <AuthStack.Group screenOptions={{ presentation: "fullScreenModal",animation:"slide_from_bottom" }} >
          <AuthStack.Screen name="Aide" component={Aide}   />
        </AuthStack.Group>
      </AuthStack.Navigator>
    </AuthProvider>
  );
};

export default AuthNavigation;
