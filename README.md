[2021/07/26 Update] (junsang)

- 지도위에 원 누르면 modal창 뜨면서 각 marker의 세부정보를 표시하는 창 만듦
- AWS 새로운 서버 연결 수정 완료
- 백엔드에서 population(유동인구수)데이터도 받아올 수 있도록 수정

<br>
[2021/07/17 Update] (junsang)

- 지도위에 원 표시 및 재검색 구현 완료
    => 재검색 시 이전의 원들이 지워지는지 확인 필요
- 서버 연결을 통해 유동인구 데이터 얻어오기.... 구조만 잡았음
    => DB (clensingData)에 저장되어 있는 위/경도와 어떤 방법으로 기준점(현재 지도의 중심 위/경도)과 가까운 데이터들만 추출할 것인지 알고리즘 강구 필요

<br>
[2021/07/05 Update] (junsang)

- AWS서버 등록 및 연결 완료
- 로그인 확인 작업 완료
	※login.js->LoginScreen.js로 바뀜
<br>

[2021/07/03 Update] (yeonsumia)

- Login Form Established
- HomeScreen, Login Navigation
- Needs: User Database, Server AWS
- Errors: XAMPP Server Connection Issue In My MAC (→AWS Server)
<br>

[2021/06/29 Update] (junsang)

- MapView.js 생성 => 현재 지도의 위도와 경도로 이 지역 재검색까지 구현 완료
- 처음 로딩시 서버와 연결되지 않으면 앱 실행 불가 및 알림 구현
<br>

[2021/06/25 Update] (junsang)

- server repository 생성 (name: GPSserviceServer.git)
- locationData DB 저장 완료
★ 적용방법 ★
1. GPSserviceServer에 있는 파일들 다운받아서 xampp/htdocs 폴더에 넣기
2. XAMPP서버 실행
3. GPSserviceServer에 있는 파일 중 gpsservice.sql을 mysql에 적용
    1. mysql에 create database gpsservice; 명령어 실행
    2. DBconnect.php파일에 가서 new mysqli()안에 있는 파라미터 중 비번 변경 (현재 비번 sjml0724@@)
    3. use gpsservice 후 source c:/[sql파일이 있는 경로]/gpsservice.sql
    4. xampp서버의 apache와 mysql을 키고 앱 실행 => select로 location정보가 제대로 들어가는지 확인