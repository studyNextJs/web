# 프로젝트 이름

이 프로젝트는 설문 조사를 관리하고 응답을 분석하는 데 사용됩니다.

## 프로젝트 구조

- **.env**: 환경 변수 파일입니다. 프로젝트 설정을 포함할 수 있습니다.
- **.gitignore**: Git으로 추적하지 않을 파일을 지정하는 파일입니다.
- **survey-frontend/**: 프론트엔드 코드 및 리소스를 포함하는 디렉토리입니다.
- **surveyor/**: 백엔드 코드 및 리소스를 포함하는 디렉토리입니다.

## 설치

1. 이 프로젝트를 클론합니다:
2. cd surveyor
3. python3 -m venv venv
    source venv/bin/activate
4. python surveyor/server.py
5. cd survey-frontend/
6. npm install
   npm start
