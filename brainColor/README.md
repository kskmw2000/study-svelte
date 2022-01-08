# 주요사항
- 이 프로젝트는 길벗의 가장 빨리 만나는 스벨트 책의 두뇌개발 게임만들기(20챕터를 실행한 부분입니다.)

## 변경사항
- 책에서는 mongodb를 cloud를 이용하여 작성하였지만, 현 프로젝트에는 docker를 사용하여 mongo db를 설치하였습니다.
- mongo db 사용한 사항에 대해서는 docker 폴더를 확인해 주시기 바랍니다.
  - docker의 mongodb 사용은 docker/mongodb-sample.sh를 통해서 docker를 생성해 주시기 바랍니다.

## 주요 사용 모듈
- mongodb : mongo db를 연결하기 위한 라이브러리입니다.
  - https://www.npmjs.com/package/mongodb
- nanoid : UUID와 비슷하지만 크기가 작고, 더 안전하며, 빠르기 때문에 사용하는 라이브러리입니다.
  - https://www.npmjs.com/package/nanoid

## 특이사항
- 토이프로젝트이므로 mongodb에 아이디 또는 암호를 사용하지 않았지만, 만들어서 사용해야함.