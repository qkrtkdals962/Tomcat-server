# Tomcat-server
Tomcat을 이용한 게시판 제작

## 팀장:박상민(백엔드)  팀원:김현진(DB), 최원욱(프론트엔드)

#### 커밋으로 본인이 수정한 항목을 적고 만약 좀더 설명할게 있다면 README.md에 적어주시면 됩니다.(이건 삭제하지마세요.)
#### + 나중에 폴더하나를 더 만들어서 PPT제작후 합쳐서 발표 PPT제작을 하겠습니다.

# 서버
서버구현을 위한 실행 환경
- JDK설치 : [Liberica JDK-17](https://bell-sw.com/pages/downloads/#jdk-17-lts)설치
- Tomcat설치 : [apache-tomcat-9.0.104](https://tomcat.apache.org/download-90.cgi)의 core zip파일 설치
- Eclipse설치 : [Eclipse](https://www.eclipse.org/downloads/)설치


환경변수 설정(위의 실행 환경 설치 완료 후)
1. CMD창에 `echo %JAVA_HOME%`명령어를 사용하여 JAVA_HOME의 환경변수가 나오게 되는데 이 값과 JDK위치값이 같은지 확인합니다.
2. CMD창에 `java -version`명령어를 사용하여 버전(17.0.11)을 확인합니다.
3. 만약 위의 명령어의 출력이 다르면 시작 버튼의 검색 기능을 사용하여 **시스템 환경 변수 편집**에 들어가 변수 편집을 합니다. 
   - **시스템 변수**에 변수 이름은 `JAVA_HOME` 변수 값으로는 JDK의 파일경로를 입력 후 확인을 합니다.
   - **시스템 변수**에 변수 이름이 `Path`인 항목을 찾고 편집을 누른 후 `%JAVA_HOME%\bin`항목을 만든 후 확인을 눌러 환경변수, 시스템 속성의 창을 닫습니다.
4. 이제 다시 CMD창에 `echo %JAVA_HOME%`, `java -version`를 입력하여 환경변수가 잘 적용되었는지 확인합니다.

Tomcat실행하기
   - CMD 창에서 `cd` 명령어를 사용하여 Tomcat의 `bin` 디렉터리로 이동한 후, `startup.bat` 명령어를 실행하여 Tomcat을 시작합니다.
   - 만약 Tomcat프롬포트창이 열리고 Tomcat창이 안열리면 직접 브라우저에서 http://localhost:8080 주소로 들어가면 Tomcat의 서버제작시 환영 페이지가 나오게 됩니다.
