[2021/07/05] (junsang)
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
[2021/06/29 업데이트] (junsang)
- MapView.js 생성 => 현재 지도의 위도와 경도로 이 지역 재검색까지 구현 완료
- 처음 로딩시 서버와 연결되지 않으면 앱 실행 불가 및 알림 구현
<br>
[2021/06/25 업데이트] (junsang)
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