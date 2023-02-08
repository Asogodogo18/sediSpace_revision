import React, { useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";
import { toastError, toastSuccess } from "../utils/toastHandler";

export const NetworkContext = React.createContext({ isConnected: true });

export const NetworkProvider = (props) => {
  const [isConnected, setIsConnected] = useState(null);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
    //   console.log("Is connected?", state.isConnected);
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (isConnected) toastSuccess("Vous êtes connectés");
    else toastError("Vous êtes hors ligne");
    return () => {};
  }, [isConnected]);

  return (
    <NetworkContext.Provider value={{ isConnected }}>
      {props.children}
    </NetworkContext.Provider>
  );
};
