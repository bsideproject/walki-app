import React, { useRef, useState } from "react";

import { Image, Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "../screens/home/Home";
import Ranking from "../screens/ranking";
import Report from "../screens/report";

import LogoTitle from "../components/LogoTitle";
import SettingLogoTitle from "../components/SettingLogoTitle";
import { coachColorVar } from "../../apollo";
import { useReactiveVar } from "@apollo/client";
import activehome from "../../assets/icons/activehome.png";
import inactivehome from "../../assets/icons/inactivehome.png";
import inactivestar from "../../assets/icons/inactivestar.png";
import activestar from "../../assets/icons/activestar.png";
import activemessage from "../../assets/icons/activemessage.png";
import inactivemessage from "../../assets/icons/inactivemessage.png";
import setting from "../../assets/icons/setting.png";
import bookMark from "../../assets/icons/bookmark.png";
import { theme, headerTitleStyle } from "../styles/theme";
import { month, year } from "../common/getToday";
import BottomSheetPicker from "../components/BottomSheetPicker";
import { d2p } from "../common/utils";

const Tabs = createBottomTabNavigator();

export const tabBarLabelStyle = {
  fontFamily: "NanumBarunGothic",
  fontSize: 12
}

const TabNavigator = () => {
  const bottomSheetRef = useRef(null);
  const [selectedMonth, setSelectedMonth] = useState({
    year,
    month,
  });
  const [stepInfo, setStepInfo] = useState([{}]);
  const tabColor = useReactiveVar(coachColorVar);
  return (
    <Tabs.Navigator
      sceneContainerStyle={{
        backgroundColor: theme.grayScale.white,
      }}
      screenOptions={
        Platform.OS === "android"
          ? {
            tabBarActiveTintColor: tabColor?.color?.main,
            tabBarInactiveTintColor: theme.grayScale.gray3,
            tabBarStyle: {
              height: d2p(68),
              paddingTop: d2p(10),
              paddingBottom: d2p(10),
            },
            tabBarLabelStyle: {
              fontSize: 12,
            },
          }
          : {
            tabBarActiveTintColor: tabColor?.color?.main,
            tabBarInactiveTintColor: theme.grayScale.gray3,
            tabBarLabelStyle: {
              fontSize: 12,
            },
          }
      }
    >
      <Tabs.Screen
        name="홈"
        options={{
          headerTitle: () => null,
          headerLeft: (props) => <LogoTitle {...props} />,
          headerRight: (props) => (
            <SettingLogoTitle settingIcon={bookMark} {...props} />
          ),
          headerStyle: {
            backgroundColor: "#f3f3f3",
            elevation: 0, // android
            shadowOpacity: 0, //ios
          },
          tabBarLabel: "홈",
          tabBarLabelStyle,
          tabBarIcon: ({ color, focused }) => (
            <Image
              style={{ width: d2p(30), tintColor: color }}
              resizeMode="contain"
              source={focused ? activehome : inactivehome}
            />
          ),
        }}
        component={Home}
      />
      <Tabs.Screen
        name="리포트"
        children={() => (
          <Report
            bottomSheetRef={bottomSheetRef}
            stepInfo={stepInfo}
            setStepInfo={setStepInfo}
            selectedMonth={selectedMonth}
            setSelectedMonth={setSelectedMonth}
          />
        )}
        options={{
          headerTitleAlign: "center",
          tabBarLabelStyle,
          headerTitle: () => (
            <BottomSheetPicker
              setStepInfo={setStepInfo}
              bottomSheetRef={bottomSheetRef}
              selectedMonth={selectedMonth}
            />
          ),

          headerLeft: () => null,
          headerRight: (props) => (
            <SettingLogoTitle settingIcon={setting} {...props} />
          ),
          headerStyle: {
            backgroundColor: coachColorVar()?.color?.report,
            elevation: 0, // android
            shadowOpacity: 0, //ios
          },
          tabBarIcon: ({ color, focused }) => (
            <Image
              style={{ width: d2p(30), tintColor: color }}
              resizeMode="contain"
              source={focused ? activemessage : inactivemessage}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="전체랭킹"
        component={Ranking}
        options={{
          headerTitleAlign: "center",
          tabBarLabelStyle,
          headerTitle: "랭킹",
          headerTitleStyle: {
            ...headerTitleStyle,
            color: theme.grayScale.white,
          },
          headerLeft: () => null,
          headerRight: (props) => (
            <SettingLogoTitle settingIcon={setting} {...props} />
          ),
          headerStyle: {
            backgroundColor: coachColorVar()?.color?.report,
            elevation: 0, // android
            shadowOpacity: 0, //ios
          },
          tabBarIcon: ({ color, focused }) => (
            <Image
              style={{ width: d2p(30), tintColor: color }}
              resizeMode="contain"
              source={focused ? activestar : inactivestar}
            />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};

export default TabNavigator;
