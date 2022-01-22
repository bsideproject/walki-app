import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import styled from "styled-components";
import { coachColorVar } from "../../../apollo";
import { H2Text, H4Text, theme } from "../../styles/theme";
import chat from "../../../assets/icons/chat.png";
import tokiHappy from "../../../assets/images/ranking/toki_happy.png";
import tokiFail from "../../../assets/images/toki_fail.png";
import tokiDefault from "../../../assets/images/toki_default.png";
import bukiDefault from "../../../assets/images/buki_default.png";
import bukiHappy from "../../../assets/images/ranking/buki_happy.png";
import bukiFail from "../../../assets/images/buki_fail.png";
import { day, getYesterday, month } from "../../common/getToday";
import { d2p, h2p } from "../../common/utils";

const RankingHeader = ({ rankingData }) => {
  const [rank, setRank] = useState(null);
  const [upDown, setUpDown] = useState("");

  useEffect(() => {
    console.log(rankingData, "rankingData");
    let rankData =
      (rankingData.length === 0
        ? 0
        : rankingData.length === 1 &&
          rankingData[0].challenge.challengeDate === getYesterday()
          ? rankingData[0].number
          : 0) -
      (rankingData.length === 0
        ? 0
        : rankingData.length === 1 &&
          rankingData[0].challenge.challengeDate === getYesterday()
          ? 0
          : rankingData[0].number);
    if (rankData < 0) {
      rankData = -rankData;
      setUpDown("down");
    } else if (rankData === 0) {
      setUpDown("same");
    } else if (rankData > 0) {
      setUpDown("up");
    }
    setRank(rankData);
  }, []);

  return (
    <Conatiner coachColor={coachColorVar().color.report}>
      <View>
        <TextWrap>
          <Image
            source={chat}
            resizeMode="contain"
            style={{
              width: d2p(20),
              height: d2p(20),
              tintColor: "white",
              marginRight: 5,
            }}
          />
          <H4Text style={{ color: theme.grayScale.white }}>
            {upDown === "same" ? null : `지난 랭킹보다${" "}`}
            <Text style={{ color: "#FFED4B" }}>
              {upDown === "same" ? "" : `${rank}위`}{" "}
              {upDown === "up" ? "상승" : upDown === "same" ? "" : "하락"}
            </Text>
            {upDown === "up"
              ? "했어요!"
              : upDown === "same"
                ? "지난 랭킹이랑 같은 순위에요!"
                : "했어요"}
          </H4Text>
        </TextWrap>
        <RankingWrap>
          <RankingBox style={{ opacity: 0.6, marginRight: d2p(8) }}>
            <Text>
              {month}/{day - 2}
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <H2Text style={{ color: coachColorVar().color.main }}>
                {rankingData.length === 0
                  ? 0
                  : rankingData.length === 1 &&
                    rankingData[0].challenge.challengeDate === getYesterday()
                    ? 0
                    : rankingData[0].number}
              </H2Text>
              <Text> 위</Text>
            </View>
          </RankingBox>
          <RankingBox>
            <Text>
              {month}/{day - 1}
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <H2Text style={{ color: coachColorVar().color.main }}>
                {rankingData.length === 0
                  ? 0
                  : rankingData.length === 1 &&
                    rankingData[0].challenge.challengeDate === getYesterday()
                    ? rankingData[0].number
                    : 0}
              </H2Text>
              <Text> 위</Text>
            </View>
          </RankingBox>
        </RankingWrap>
      </View>
      {coachColorVar().coach === "toki" ? (
        <Image
          source={
            upDown === "up"
              ? tokiHappy
              : upDown === "same"
                ? tokiDefault
                : tokiFail
          }
          resizeMode="contain"
          style={{ width: d2p(90) }}
        />
      ) : (
        <Image
          source={
            upDown === "up"
              ? bukiHappy
              : upDown === "same"
                ? bukiDefault
                : bukiFail
          }
          resizeMode="contain"
          style={{ width: d2p(90) }}
        />
      )}
    </Conatiner>
  );
};

const Conatiner = styled.View`
  height: ${h2p(152)}px;
  flex-direction: row;
  padding: 0 ${d2p(20)}px;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.coachColor};
`;

const TextWrap = styled.View`
  flex-direction: row;
  align-items: flex-end;
  margin-bottom: ${h2p(8)}px;
`;

const RankingWrap = styled.View`
  flex-direction: row;
`;

const RankingBox = styled.View`
  flex: 1;
  align-items: center;
  padding: ${d2p(10)}px;
  background-color: ${theme.grayScale.white};
  border-radius: 8px;
`;

export default RankingHeader;
