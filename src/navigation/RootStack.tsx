import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import AuthNavigation from "./AuthNavigation";
import AppStack from "./AppStack";
import { useUserContext } from "../Context";
import { getDataObject } from "../services/storage";
import { USER_KEY } from "../constants/general-constants";

const rootStack = createNativeStackNavigator();

const RootStack = () => {
  const { signedIn } = useUserContext();

  return (
    <rootStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="AuthNavigation"
    >
      {!signedIn ? (
        <rootStack.Screen name="AuthNavigation" component={AuthNavigation} />
      ) : (
        <rootStack.Screen name="AppStack" component={AppStack} />
      )}
    </rootStack.Navigator>
  );
};

export default RootStack;
