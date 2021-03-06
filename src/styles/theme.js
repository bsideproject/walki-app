import styled from "styled-components/native";

export const headerTitleStyle = {
  fontFamily: "NanumBarunGothicBold",
  fontSize: 16
}

export const Setting = styled.Text`
  font-size: 64px;
  font-family: "NanumBarunGothicBold";
`;

export const HomeText = styled.Text`
  font-size: 54px;
  font-family: "NanumBarunGothicBold";
`;

export const H1Text = styled.Text`
  font-size: 30px;
  line-height: 45px;
  font-family: "NanumBarunGothicBold";
`;

export const H2Text = styled.Text`
  font-size: 24px;
  font-family: "NanumBarunGothicBold";
`;

export const H3Text = styled.Text`
  font-size: 18px;
  line-height: 27px;
  font-family: "NanumBarunGothicBold";
`;

export const H4Text = styled.Text`
  font-size: 16px;
  font-family:"NanumBarunGothicBold";
`;

export const Body1Text = styled.Text`
  font-size: 16px;
  line-height: 24px;
  font-family:"NanumBarunGothic";
`;

export const Body2Text = styled.Text`
  font-size: 14px;
  line-height: 21px;
  font-family:"NanumBarunGothicBold";
`;

export const Body3Text = styled.Text`
  font-size: 14px;
  line-height: 21px;
  font-family:"NanumBarunGothic";
`;

export const Caption = styled.Text`
  font-size: 12px;
  font-family:"NanumBarunGothic";
`;

export const FontWeight = {
  Bold: "NanumBarunGothicBold",
  Regular: "NanumBarunGothic"
};


const grayScale = {
  black: "#000000",
  gray1: "#333333",
  gray2: "#4f4f4f",
  gray3: "#828282",
  gray4: "#bdbdbd",
  gray5: "#e0e0e0",
  gray6: "#f2f2f2",
  gray7: "#f7f7f7",
  white: "#ffffff",
};

const TextColor = "#999999";

const toki = {
  coach: "toki",
  color: {
    main: "#f22764",
    sub: "#f750a0",
    report: "#f750a0",
    character: {
      main: "#f2aacb",
      sub: "#ffcfe5",
    },
    chart: {
      main: "#51b5ff",
      sub: "#8ec9f5",
    },
    primary: {
      tap: "rgba(242,39,100,0.6)",
      disable: "rgba(242,39,100,0.3)",
    },
  },
};

const booki = {
  coach: "booki",
  color: {
    main: "#8ad10a",
    sub: "#ade051",
    report: "#8ad10a",
    character: {
      main: "#b1d66e",
      sub: "#d9edb4",
    },
    chart: {
      main: "#51b5ff",
      sub: "#8ec9f5",
    },
    primary: {
      tap: "rgba(138,209,10,0.6)",
      disable: "rgba(138,209,10,0.3)",
    },
  },
};

export const theme = {
  toki,
  booki,
  grayScale,
  TextColor,
};
