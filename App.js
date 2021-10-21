import React, { useState, useEffect } from "react";
import { Alert } from "react-native";
import AppLoading from "expo-app-loading";
import GlobalNav from "./src/navigators/GlobalNav";
import { AppearanceProvider, useColorScheme } from "react-native-appearance";
import { ApolloProvider } from "@apollo/client";
import client, { coachSelect, isLoggedInVar, tokenVar } from "./apollo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PushNotification, { Importance } from "react-native-push-notification";
import * as SplashScreen from "expo-splash-screen";
import STOARGE from "./src/constants/stoarge";
import { SafeAreaProvider } from "react-native-safe-area-context";

PushNotification.configure({
  onRegister: function (token) {
    // console.log("TOKEN:", token);
  },

  onNotification: function (notification) {
    console.log("NOTIFICATION:", notification);

    // notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  onAction: function (notification) {
    console.log("ACTION:", notification.action);
    console.log("NOTIFICATION:", notification);
  },

  onRegistrationError: function (err) {
    console.error(err.message, err);
  },

  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  popInitialNotification: true,

  requestPermissions: true,
});

PushNotification.createChannel(
  {
    channelId: "default", // (required)
    channelName: "My channel", // (required)
    channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
    playSound: false, // (optional) default: true
    soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
    importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
    vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
  },
  (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
);

export default function App() {
  const [loading, setLoading] = useState(true);
  const { TOKEN, COACH } = STOARGE;
  const onFinish = () => {
    setLoading(false);
    SplashScreen.hideAsync();
  };

  const prepare = async () => {
    try {
      await SplashScreen.preventAutoHideAsync();
      const coach = await AsyncStorage.getItem(COACH);
      if (coach) {
        await coachSelect(coach);
      }
      // await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (e) {
      console.warn(e);
    }
  };

  const preload = async () => {
    const token = await AsyncStorage.getItem(TOKEN);
    if (token) {
      isLoggedInVar(true);
      tokenVar(token);
    }
    return prepare();
  };

  let colorScheme = useColorScheme();

  if (loading) {
    return (
      <AppLoading
        startAsync={preload}
        onError={console.warn}
        onFinish={onFinish}
      />
    );
  }

  return (
    <ApolloProvider client={client}>
      <AppearanceProvider>
        <SafeAreaProvider>
          <GlobalNav />
        </SafeAreaProvider>
      </AppearanceProvider>
    </ApolloProvider>
  );
}
