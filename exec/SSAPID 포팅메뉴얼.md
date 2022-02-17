# SSAPID 포팅 매뉴얼 💻

## 1. 빌드 및 배포 문서

1. JVM, 웹서버, WAS 종류 및 설정값, 버전(IDE 버전)

   - JVM
     - openJDK 1.8.0_312(Zulu 8)
   - 웹서버
     - NGINX(nginx/1.18.0(Ubuntu))
   - WAS 제품 종료 및 설정값
     - SpringBoot 내장 톰캣 : spring-boot-starter-tomcat-2.4.5.jar
   - 버전(IDE 버전)
     - Gradle : 4.4.1
     - IntelliJ IDEA : Ultimate, 2021.3
     - Visual Studio Code : 1.64.2

2. 빌드 시 사용되는 환경 변수

   - nohup java -jar /var/lib/jenkins/workspace/SSAPID/backend-java/build/libs/ssafy-web-project-1.0-SNAPSHOT.jar &

   - application.properties 참조

3. 배포 시 특이사항

   - FrontEnd 배포 시 -> NGINX
   - BackEnd 배포 시 -> Spring Boot 내장 톰캣

4. 데이터베이스 접속 정보

   - application.properties

   ```java
   #database

   #spring.jpa.show-sql=true
   #spring.jpa.properties.hibernate.format_sql=true

   spring.jpa.hibernate.naming.implicit-strategy=org.springframework.boot.orm.jpa.hibernate.SpringImplicitNamingStrategy
   spring.jpa.hibernate.naming.physical-strategy=org.springframework.boot.orm.jpa.hibernate.SpringPhysicalNamingStrategy
   spring.jpa.hibernate.ddl-auto=update
   spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
   spring.data.web.pageable.one-indexed-parameters=true
   #Syntax Error: Error: PostCSS received undefined instead of CSS string
   spring.datasource.url=jdbc:mysql://stg-yswa-kr-practice-db-master.mariadb.database.azure.com:3306/S06P12D205?serverTimezone=UTC&useUnicode=true&characterEncoding=utf8
   spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
   spring.datasource.hikari.username=S06P12D205@stg-yswa-kr-practice-db-master.mariadb.database.azure.com/S06P12D205?serverTimezone=UTC&useUnicode=true&characterEncoding=utf8
   spring.datasource.hikari.password=ssafy
   ```

## 2. 사용하는 외부 서비스 정보

- Amazon EC2

  - SSH를 이용해 클라우드 서버 접속 => ssh -i i6d205.p.ssafy.io

- Docker
  - EC2에서 Docker를 이용하여 MariaDB를 실행
- jenkins
  - 빌드/배포 자동화를 위해 jenkins 이용

3. 배포 시 특이사항
4. 데이터베이스 접속 정보

## 2. 사용하는 외부 서비스 정보

## 3. 데이터베이스

1. 덤프 파일
2. 파일 테이블 구조도(ERD)

## 4. 시연 시나리오

1. 시연 순서에 따른 Site 화면별 설명

- 로그인

  <img src="https://lab.ssafy.com/s06-webmobile1-sub2/S06P12D205/-/raw/develop/exec/img/%EB%A1%9C%EA%B7%B8%EC%9D%B8.png" width="400">

  로그인시 Githup, Google, Facebook을 이용한 소셜로그인이 가능합니다.

- 회원가입

  <img src="https://lab.ssafy.com/s06-webmobile1-sub2/S06P12D205/-/raw/develop/exec/img/%ED%9A%8C%EC%9B%90%EA%B0%80%EC%9E%85.png" width="500">

  회원가입은 email, nickname 중복체크 및 유효성체크를 통해 진행됩니다.

- 아이디 찾기

  <img src="https://lab.ssafy.com/s06-webmobile1-sub2/S06P12D205/-/raw/develop/exec/img/%EC%95%84%EC%9D%B4%EB%94%94%EC%B0%BE%EA%B8%B0.png" width="800">

  아이디 찾기는 이름과 휴대폰 번호를 활용해 찾을 수 있습니다.

- 비밀번호 찾기

  <img src="https://lab.ssafy.com/s06-webmobile1-sub2/S06P12D205/-/raw/develop/exec/img/%EB%B9%84%EB%B0%80%EB%B2%88%ED%98%B8%20%EC%B0%BE%EA%B8%B0.png" width="800">

  비밀번호 찾기는 메일의 인증번호를 입력하면 비밀번호 재설정을 할 수 있습니다.

- 메인페이지

  <img src="https://lab.ssafy.com/s06-webmobile1-sub2/S06P12D205/-/raw/develop/exec/img/%EB%A9%94%EC%9D%B8%ED%8E%98%EC%9D%B4%EC%A7%80.png" width="800">

  검색기능을 활용하면 원하는 게시글로 필터링 할 수 있습니다.

  모집마감제외를 활성화 하면 마감된 게시글을 필터링 할 수 있습니다.

  햄버그 버튼을 누르면 사이드 바가 나옵니다.

- 사이드 바

  <img src="https://lab.ssafy.com/s06-webmobile1-sub2/S06P12D205/-/raw/develop/exec/img/%EC%82%AC%EC%9D%B4%EB%93%9C%EB%B0%94.png" width="800">

  사이드 바에서는 즐겨찾기, 채팅 기능을 사용할 수 있습니다.

- 게시글 작성

  <img src="img/게시글 작성.png" width="800">

  게시글을 작성하면 유저에게 팀원모집 글을 알릴 수 있습니다.

  수정, 삭제도 할 수 있습니다.

  참여하기를 투르면 화상회의 방으로 이동합니다.

- 화상회의

  <img src="https://lab.ssafy.com/s06-webmobile1-sub2/S06P12D205/-/raw/develop/exec/img/%ED%99%94%EC%83%81%ED%9A%8C%EC%9D%98.png" width="800">
