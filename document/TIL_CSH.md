- **랜딩페이지**
  - 소개 내용
  - [https://www.i-nara.co.kr/#full0](https://www.i-nara.co.kr/#full0)
    - 위 사이트 스타일대로
  - **Start Button**
    - 로그인 페이지로 이동
- **로그인페이지**
  - [https://www.loud.kr/contest/view/65045/winner](https://www.loud.kr/contest/view/65045/winner)
  - **아이디 Input Form**
  - **비밀번호 Input Form**
  - **Login Button**
  - **아이디/비밀번호 찾기**
    - 네이버와 비슷하게
    - **아이디**
      - 아이디 찾기 페이지로 이동
    - **비밀번호 찾기**
      - 비밀번호 찾기 페이지로 이동
    - **회원가입**
      - 회원가입 페이지로 이동
- 회원가입페이지
  - **이름 Input Form**
  - **아이디 Input Form**
  - 이메일 **Input Form**
  - **비밀번호 Input Form**
  - **비밀번호 확인 Input Form**
  - **Signup Button**
- 메인페이지
  - 상단바
  - 슬라이더
    - 순위(1~3위)
    - 신규컨텐츠
    - 그림 그리기 소개 & 바로가기
    - 스크립트 말하기 소개 & 바로가기
  - 인기 애니메이션 영상
    - 많은 사용자가 본 영상
  - 그림 명예의 전당
    - 점수 높은 그림
  - footer
- 그림맞추기페이지
  - time bar
  - 영어 단어
  - 캔버스
  - 제출버튼
    - 실패
      - Fail
    - 성공
      - Success
    - 모달
      - 영어 단어
      - 단어 뜻
      - 예문
      - next button
- 애니메이션 스크립트 리스트 페이지
  - 상단바
  - 왼쪽 위에 필터 (선택)
  - 오른쪽 위에 검색바
  - 동영상 리스트 (페이지네이션)
- 애니메이션 스크립트 상세 페이지
  - 애니메이션 영상
    - 선택한 역할에 해당하는 영상 이후 자동 일시정지
  - 역할바꾸기 버튼(선택)
    - ‘처음부터 다시 시작해도 괜찮나’ 라는 alert후 처음부터 실행
  - 스크립트 창
    - 대화할 때마다 현재 말하고 있는 대사 활성화 & 스크롤 자동 이동 (선택)
  - 영상 중단 후 녹음 모달
    - 해당 문장
    - ‘지금 말해보세요’ 와 같은 문구
    - 녹음 중지 버튼
      - 클릭 → 결과 단어 (Good / Great 등) 보여주고 next버튼 있는 모달
  - 영상이 끝난 후 점수 모달
    - 점수
    - 별 (만점 3개)
- 마이페이지
  - 프로필 사진(아바타)
  - 닉네임
  - 레벨
  - 경험치바
  - 내정보보기 버튼
    - 이름
    - 닉네임
    - 이메일
    - 닉네임 수정 버튼
      - 닉네임 수정 모달
        - 닉네임 input form
        - 닉네임 중복 확인 버튼
        - 수정 버튼
    - 비밀번호 수정 버튼
      - 비밀번호 수정 모달
        - 현재 비밀번호 input form
        - 변경할 비밀번호 input form
        - 비밀번호 확인 input form
        - 수정 버튼
    - 회원 탈퇴 버튼
  - 최근 공부한 내용 버튼
    - 최근 본 애니메이션 영상 리스트
    - 최근 그린 그림 리스트
  - 아바타 수정 버튼
- 랭킹페이지
  - 랭킹 정보

# 피그마

![image](https://user-images.githubusercontent.com/46869980/224270547-b6e2a87e-fee4-4964-bf0c-12cfc14c9c43.png)

# JWT

JWT
JWT(Json Web Token)은 일반적으로 클라이언트와 서버 통신 시 권한 인가(Authorization)을 위해 사용하는 토큰이다.

현재 앱개발을 위해 REST API를 사용 중인데, 웹 상에서 Form을 통해 로그인하는 것이 아닌, API 접근을 위해 프론트엔드에게 인증 토큰을 발급하고 싶을 때, 적절한 인증 수단이라고 생각해서 이를 Spring Security와 함께 적용해보려 한다.

Spring Security + JWT의 동작 과정을 살펴보자.

Security + JWT 기본 동작 원리

![image](https://user-images.githubusercontent.com/46869980/224946707-f6a8a82a-9d2c-4b6f-b671-03f395c9bf0c.png)

기본 동작 원리는 간단하다.

1. 클라이언트에서 ID/PW를 통해 로그인을 요청하면

2. 서버에서 DB에 해당 ID/PW를 가진 User가 있다면, Access Token과 Refresh Token을 발급해준다.

3. 클라이언트는 발급받은 Access Token을 헤더에 담아서 서버가 허용한 API를 사용할 수 있게 된다.

여기서 Refresh Token은 새로운 Access Token을 발급하기 위한 토큰이다. 기본적으로 Access Token은 외부 유출 문제로 인해 유효기간을 짧게 설정하는데, 정상적인 클라이언트는 유효기간이 끝난 Access Token에 대해 Refresh Token을 사용하여 새로운 Access Token을 발급받을 수 있다. 따라서, Refresh Token의 유효기간은 Access Token의 유효기간보다 길게 설정해야 한다고 생각할 수 있다.

그런데, 만약 Refresh Token이 유출되어서 다른 사용자가 이를 통해 새로운 Access Token을 발급받았다면?
이 경우, Access Token의 충돌이 발생하기 때문에, 서버측에서는 두 토큰을 모두 폐기시켜야 한다. 국제 인터넷 표준화 기구(IETF)에서는 이를 방지하기 위해 Refresh Token도 Access Token과 같은 유효 기간을 가지도록 하여, 사용자가 한 번 Refresh Token으로 Access Token을 발급 받았으면, Refresh Token도 다시 발급 받도록 하는 것을 권장하고 있다.

새로운 Access Token + Refresh Token에 대한 재발급 원리는 다음과 같다.

Access Token + Refresh Token 재발급 과정

![image](https://user-images.githubusercontent.com/46869980/224946897-fcd0f9a5-03ec-4bad-8230-ae976390e819.png)
