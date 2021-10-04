import React, { useState, useEffect } from "react";
import { CircularProgress } from "react-native-svg-circular-progress";
import Svg, { Path } from "react-native-svg";
import { coachColorVar, statusVar } from "../../apollo";
import LongButton from "../components/LongButton";

import {
  Blurgoal,
  CharacetrImage,
  GoalBox,
  Blurgoal2,
} from "../styles/homeTheme";
import UserFail from "../screens/home/others/UserFail";
import { Animated, View, Text } from "react-native";

import { Pedometer } from "expo-sensors";
import { request, PERMISSIONS } from "react-native-permissions";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { gql, useMutation, useQuery, useReactiveVar } from "@apollo/client";
import { Body1Text, H4Text, theme } from "../styles/theme";
import { getToday } from "../common/getToday";
const StatusVariable = ({
  coachImg,
  goalText,
  cheerText,
  buttonText,
  buttonColor,
  handleGoToNext,
  disabled,
  failModalOpen,
  handleOpacity,
  fadeimage,
  fadetext,
}) => {
  const navigation = useNavigation();
  const percentage = 66;
  // const percentage = currentStepCount / data?.getChallenge?.stepGoal;
  const status = useReactiveVar(statusVar);

  const getSteps = () => {
    Pedometer.watchStepCount(result => {
      if (status === "walking") {
        setSteps(steps => ({
          ...steps,
          currentStepCount: result.steps,
        }));
      }
    });
  };

  const [steps, setSteps] = useState({
    isPedometerAvailable: "checking",
    pastStepCount: 0,
    currentStepCount: 0,
  });

  useEffect(() => {
    request(PERMISSIONS.ANDROID.ACTIVITY_RECOGNITION).then(granted => {
      if (granted) {
        getSteps();
      }
    });
  }, []);

  const { currentStepCount, isPedometerAvailable } = steps;

  const PUT_CHALLENGE = gql`
    mutation putChallenge($challenge: ChallengeInput) {
      putChallenge(challenge: $challenge) {
        step
      }
    }
  `;
  const GET_CHALLENGE = gql`
    query getChallenge($challengeDate: LocalDate) {
      getChallenge(challengeDate: $challengeDate) {
        step
        stepGoal
      }
    }
  `;
  const { data } = useQuery(GET_CHALLENGE, {
    variables: {
      challengeDate: getToday(),
    },
    onCompleted: data => {
      console.log(data, "data1");
    },
  });
  const [putChallengeMutation, { loading }] = useMutation(PUT_CHALLENGE, {
    onCompleted: data => {
      console.log(data, "data");
    },
  });

  // useEffect(() => {
  //   const putStep = async () => {
  //     await putChallengeMutation({
  //       variables: {
  //         challenge: {
  //           step: currentStepCount,
  //           challengeDate: getToday(),
  //         },
  //       },
  //     });
  //     stepVar(currentStepCount);
  //   };
  //   putStep();
  // }, [currentStepCount]);
  // * 12시전에 (11시59분59초) 한번 업데이트 해야됨
  // * 종료시점을 알수있으면 종료하기전에 스탭 보내기
  // * 아니면 asyncStorage에 스탭 넣어두기

  return (
    <>
      <GoalBox>
        <TouchableOpacity onPress={handleOpacity}>
          <CircularProgress
            percentage={percentage}
            donutColor={coachColorVar().color.main}
            size={350}
            progressWidth={165}>
            <Animated.View style={[{ opacity: fadeimage ? fadeimage : 1 }]}>
              <CharacetrImage source={coachImg} resizeMode="contain" />
            </Animated.View>
            <Animated.View
              style={[
                { opacity: fadetext ? fadetext : 0, position: "absolute" },
              ]}>
              <View style={{ alignItems: "center" }}>
                <Blurgoal coachColorVar={coachColorVar().color.main}>
                  {currentStepCount}
                </Blurgoal>

                <H4Text>{goalText}</H4Text>
                <View
                  style={{
                    flex: 1,
                    aligitems: "center",
                    justifyConetent: "center",
                    flexDirection: "row",
                  }}>
                  <View
                    style={{
                      width: "20%",
                      height: "120%",
                      backgroundColor: coachColorVar().color.main,
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 20,
                    }}>
                    <Text
                      style={{
                        color: "white",
                        fontSize: 10,
                      }}>
                      목표
                    </Text>
                  </View>

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
        disabled={disabled}>
        {buttonText}
      </LongButton>
      <UserFail
        navigation={navigation}
        handleFailModal={handleGoToNext}
        failModalOpen={failModalOpen}
      />
    </>
  );
};

export default StatusVariable;
