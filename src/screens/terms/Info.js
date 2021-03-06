import React from "react";
import { Text } from "react-native";
import styled from "styled-components";
import { theme } from "../../styles/theme";

const Info = () => {
  return (
    <Container
      contentContainerStyle={{
        paddingTop: 30,
        paddingBottom: 30,
      }}
    >
      <Text style={{ color: theme.grayScale.gray2 }}>
        {`walki는 개인정보보호법에 따라 이용자의 개인정보를 보호하고 이와 관련한 고충을 원활하게 처리할 수 있도록 다음과 같이 개인정보 처리방침을 수립·공개합니다. walki 개인정보 처리방침을 개정하는 경우 웹사이트 공지사항(또는 개별공지)을 통하여 공지할 것입니다.

**제1조(개인정보의 처리 목적)**
        
walki는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경될 시에는 별도 동의를 받는 등 필요한 조치를 이행할 예정입니다.

1. 서비스 회원가입 및 서비스 제공

- 소셜 로그인, 서비스 및 콘텐츠 제공

2. 이용자 관리

- 본인 식별, 분쟁조정을 위한 기록보전, 민원
처리, 고지사항 전달

3. 광고 및 마케팅 활용

- 신규 서비스 개발 및 이벤트 등 홍보·광고성 정보 전달, 이용자의 서비스 이용에 대한 통계 및 통계학적 특성에 따른 서비스 제공 및 광고 게재

**제2조(수집하는 개인정보의 항목 및 수집방법)**

1. 수집하는 개인정보 항목

1) 회원가입을 위해 수집하는 개인정보의 항목

- (필수) Apple 혹은 카카오 로그인 정보(ID, 닉네임 및 프로필 이미지 등 프로필 정보)

2) 서비스 사용 시 수집하는 개인정보의 항목

- (선택) 날씨 정보 제공을 위한 위치정보
- (필수) 걸음 수 데이터
- (필수) 서비스 이용 결과 확인 위한 이용자 운동 기록

3) 서비스 이용 시 자동으로 생성되어 수집하는 항목

- 서비스 접속·이용 기록, 쿠키, IP 주소, 디바이스 정보(모델명, OS 종류 및 버전, 기기고유번호)

2. 개인정보의 수집방법

- 서비스의 소셜 로그인 및 이용 과정에서 이용자로부터 직접 수집
- 생성 정보 수집 툴을 통한 수집

**제3조(개인정보의 보유 및 이용기간)**

이용자의 동의 하에 수집된 개인정보는 회원자격이 유지되는 동안 보유 및 이용되며, 해지를 요청하는 경우에는 재생이 불가능한 방법에 의해 파기됩니다. 단, 관계 법령의 규정에 의하여 보존할 필요가 있는 경우에는 아래와 같이 관계법령에서 정한 일정한 기간 동안 이용자 개인정보를 보관합니다.

- 계약 또는 청약철회 등에 관한 기록: 5년 (보존근거: 전자상거래등에서의 소비자보호에 관한 법률)
- 표시/광고에 관한 기록: 6개월 (보존근거: 전자상거래등에서의 소비자보호에 관한 법률)
- 소비자의 불만 또는 분쟁처리에 관한 기록: 3년 (보존근거: 전자상거래등에서의 소비자보호에 관한 법률)
- 방문기록: 3개월 (보존근거: 통신비밀보호법)

**제4조(개인정보의 파기절차 및 방법)**

이용자의 개인정보는 원칙적으로 개인정보의 수집 및 이용목적이 달성되거나 서비스를 1년 동안 이용하지 않을 경우, 지체 없이 파기합니다.

1. 파기절차

1) 이용자가 서비스 이용과정에서 제공한 목적이 달성된 후 별도의 DB로 옮겨져 내부 방침 및 기타 관계법령에 의한 정보보호 사유에 따라 일정 기간 저장된 후 파기됩니다.

2) 개인정보는 법률에 의한 경우가 아니고서는 보유되는 이외의 다른 목적으로 이용되지 않습니다.

2. 파기방법

1) 종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각을 통하여 파기됩니다.

2) 전자적 파일 형태로 저장된 개인정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제합니다.

**제5조(개인정보 보호 책임자)**

서비스를 이용하며 발생하는 모든 개인정보 보호 관련 민원은 [이메일 주소]로 접수하여 주십시오. 접수 후, 최단시간 내에 성실하게 답변해 드리겠습니다.

**제6조(고지의 의무)**

현 개인정보취급방침의 내용 추가, 삭제 및 수정이 있을 시에는 시행일자 최소 7일전부터 서비스 내 공지사항을 통해 공고할 것입니다.

[시행일] 2021년 [n]월 [n]일`}
      </Text>
    </Container>
  );
};

const Container = styled.ScrollView`
  padding: 0 30px;
  flex: 1;
`;

export default Info;
