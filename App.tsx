import "react-native-gesture-handler";
import React from "react";
import Toast from "react-native-toast-message";
import { ThemeProvider } from "@shopify/restyle";
import { StatusBar } from "react-native";
import { MenuProvider } from "react-native-popup-menu";
import { SafeAreaProvider } from "react-native-safe-area-context";

import theme from "./src/theme";
import useCachedResources from "./src/hooks/useCachedResources";
import useColorScheme from "./src/hooks/useColorScheme";
import Navigation from "./src/navigation";
import { RootStack } from "./src/navigation";
import { NavigationContainer } from "@react-navigation/native";
import { UserProvider } from "./src/Context";
import { Provider } from "react-redux";
import store from "./src/store/store";
import { toastConfig } from "./src/utils/toastHandler";
import { NetworkProvider } from "./src/Context/NetworkProvider";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <ThemeProvider theme={theme}>
        <SafeAreaProvider>
          {/* <Navigation colorScheme={colorScheme} /> */}
          <NavigationContainer>
            <StatusBar backgroundColor="black" barStyle={"light-content"} />
            <Provider store={store}>
              <UserProvider>
                <MenuProvider>
                  <NetworkProvider>
                    <RootStack />
                  </NetworkProvider>
                </MenuProvider>
              </UserProvider>
            </Provider>
          </NavigationContainer>
          <Toast config={toastConfig} position="top" bottomOffset={20} />
        </SafeAreaProvider>
      </ThemeProvider>
    );
  }
}
