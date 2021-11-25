import React, { useState, useEffect } from "react";
import { CircularProgress } from "react-native-svg-circular-progress";
import { coachColorVar, stepVar, walkStatus, statusVar } from "../../../apollo";
import LongButton from "../../components/LongButton";

import {
  Blurgoal,
  CharacetrImage,
  GoalBox,
  Blurgoal2,
} from "../../styles/homeTheme";
import UserFail from "../../screens/home/others/UserFail";
import { Animated, View, Text } from "react-native";
import { request, PERMISSIONS } from "react-native-permissions";
import GoogleFit, { Scopes } from "react-native-google-fit";
import { TouchableOpacity } from "react-native-gesture-handler";
import { gql, useMutation, useQuery, useReactiveVar } from "@apollo/client";
import { Body1Text, H4Text, theme } from "../../styles/theme";
import { getToday } from "../../common/getToday";
import styled from "styled-components";
import Loading from "../Loading";
import { useNavigation } from "@react-navigation/core";

const opt = {
  startDate: "2021-11-10T00:00:17.971Z", // required ISO8601Timestamp
  endDate: new Date().toISOString(), // required ISO8601Timestamp
  bucketUnit: "DAY", // optional - default "DAY". Valid values: "NANOSECOND" | "MICROSECOND" | "MILLISECOND" | "SECOND" | "MINUTE" | "HOUR" | "DAY"
  bucketInterval: 1, // optional - default 1.
};
const options = {
  scopes: [
    Scopes.FITNESS_ACTIVITY_READ,
    Scopes.FITNESS_ACTIVITY_WRITE,
    Scopes.FITNESS_BODY_READ,
    Scopes.FITNESS_BODY_WRITE,
  ],
};

const StatusAndroid = ({
  props: {
    coachImg,
    cheerText,
    buttonText,
    buttonColor,
    handleGoToNext,
    disabled,
    failModalOpen,
    handleOpacity,
    fadeimage,
    fadetextwalk,
    goalText,
    fadetext,
  },
}) => {
  const step = useReactiveVar(stepVar);
  const status = useReactiveVar(statusVar);
  const [steps, setSteps] = useState({
    totalSteps: 0,
    observeSteps: "",
  });
  const navigation = useNavigation();

  useEffect(() => {
    GoogleFit.authorize(options).then((authResult) => {
      if (authResult.success) {
        GoogleFit.getDailySteps(new Date().toISOString()).then((res) => {
          if (res[2].steps.length !== 0) {
            const { date, value } = res[2].steps[0];
            console.log(value, "value");
            setSteps({ ...steps, totalSteps: value });
            if (value >= data?.getChallenge?.stepGoal) {
              walkStatus("success");
              navigation.navigate("successPopUp");
            }
            stepVar({ step: value, date: step.date });
          }
        });
      } else {
        console.log("AUTH_DENIED", authResult.message);
      }
    });
  }, [steps.observeSteps]);

  useEffect(() => {
    request(PERMISSIONS.ANDROID.ACTIVITY_RECOGNITION).then((granted) => {
      if (granted) {
        GoogleFit.startRecording(() => {
          GoogleFit.observeSteps((res) => {
            setSteps({ ...steps, observeSteps: res.steps });
          });
        });
      }
    });
  }, []);

  const GET_CHALLENGE = gql`
    query getChallenge($challengeDate: LocalDate) {
      getChallenge(challengeDate: $challengeDate) {
        step
        stepGoal
        challengeDate
      }
    }
  `;

  const { data, loading } = useQuery(GET_CHALLENGE, {
    variables: {
      challengeDate: getToday(),
    },
  });

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <GoalBox>
        <TouchableOpacity onPress={handleOpacity}>
          <CircularProgress
            percentage={
              status === "home"
                ? 0
                : step.step === 0
                ? 0
                : step.step > data?.getChallenge?.stepGoal
                ? 100
                : (step.step / data?.getChallenge?.stepGoal) * 100
            }
            donutColor={coachColorVar().color.main}
            size={350}
            progressWidth={165}
          >
            <Animated.View style={[{ opacity: fadeimage ? fadeimage : 1 }]}>
              <CharacetrImage source={coachImg} resizeMode="contain" />
            </Animated.View>
            <Animated.View
              style={[
                { opacity: fadetext ? fadetext : 0, position: "absolute" },
              ]}
            >
              <View style={{ alignItems: "center" }}>
                <Blurgoal coachColorVar={coachColorVar().color.main}>
                  0
                </Blurgoal>

                <H4Text>{goalText}</H4Text>
              </View>
            </Animated.View>
            <Animated.View
              style={[
                {
                  opacity: fadetextwalk ? fadetextwalk : 0,
                  position: "absolute",
                },
              ]}
            >
              <View style={{ alignItems: "center" }}>
                <Blurgoal coachColorVar={coachColorVar().color.main}>
                  {step.step}
                </Blurgoal>

                <View
                  style={{
                    flex: 1,
                    aligitems: "center",
                    justifyConetent: "center",
                    flexDirection: "row",
                  }}
                >
                  <GoalTextBox coachColorVar={coachColorVar().color.main}>
                    <Text
                      style={{
                        color: "white",
                        fontSize: 12,
                      }}
                    >
                      목표
                    </Text>
                  </GoalTextBox>
                  <Blurgoal2> {data?.getChallenge?.stepGoal} 걸음</Blurgoal2>
                </View>
              </View>
            </Animated.View>
          </CircularProgress>
        </TouchableOpacity>
        <Body1Text style={{ marginTop: 10, color: theme.grayScale.gray2 }}>
          {cheerText}
        </Body1Text>
      </GoalBox>
      <LongButton
        handleGoToNext={handleGoToNext}
        btnBackColor={buttonColor}
        disabled={disabled}
      >
        {buttonText}
      </LongButton>
      <UserFail
        handleFailModal={handleGoToNext}
        failModalOpen={failModalOpen}
      />
    </>
  );
};

const GoalTextBox = styled.View`
  background-color: ${(props) => props.coachColorVar};
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  padding: 5px 10px;
`;

export default StatusAndroid;