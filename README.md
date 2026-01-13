# 🌤️ Weather App  
리얼티쓰 프론트엔드 채용 과제

- 🔗 **Live Demo**: https://k-weatherservice.netlify.app/
- 🔗 **GitHub Repository**: https://github.com/eas1w0n/realteeth-weather

---

## 📌 프로젝트 개요

본 프로젝트는 **리얼티쓰 프론트엔드 채용 과제**로,  
사용자의 현재 위치 및 검색한 지역의 날씨 정보를 제공하는 웹 애플리케이션입니다.

과제 요구사항을 충족하는 것을 기본 목표로 하되,  
날씨 데이터 조회 과정에서의 **상태 관리**, **데이터 흐름** 을 중점적으로 고려하여 구현했습니다.

## 🛠️ 기술 스택

| 구분 | 사용 기술 |
|---|---|
| Framework | React |
| Language | TypeScript |
| Styling | Tailwind CSS, shadcn/ui |
| Data Fetching | TanStack Query |
| State Management | Zustand |
| Architecture | Feature-Sliced Design (FSD) |
| Build Tool | Vite |
| Deployment | Netlify |

---

## ▶️ 프로젝트 실행 방법


# 1. 레포지토리 클론
```bash
git clone https://github.com/your-id/realteeth-weather.git
```

# 2. 패키지 설치
```bash
npm install
```

# 3. 환경 변수 설정
# .env 파일 생성 후 아래 값 추가
```bash
VITE_WEATHER_API_KEY=YOUR_API_KEY
```

# 4. 개발 서버 실행
```bash
npm run dev
```

---

## 구현 기능

### 1. 현재 위치 기반 날씨 조회

- 앱 최초 진입 시 **Geolocation API**를 이용해 사용자의 현재 위치 요청
- 위치 좌표를 기반으로 날씨 API 호출
- 현재 기온, 당일 최저 / 최고 기온, 시간대별 기온 정보 표시

**UI 예시**  
<img width="1919" height="907" alt="image" src="https://github.com/user-attachments/assets/aa0710aa-07e8-4989-b1a7-69393d710276" />

---

### 2. 지역 검색 기능 (대한민국 한정)

- 제공된 `korea_districts.json` 데이터를 활용하여 지역 검색 구현
- 시 / 군 / 구 / 동 단위 구분 없이 검색 가능
- 검색어 입력 시 매칭되는 장소 리스트 표시
- 리스트에서 장소 선택 시 해당 지역 날씨 상세 조회
- 날씨 정보가 없는 경우 안내 문구 표시

**UI 예시**  
<img width="1918" height="902" alt="image" src="https://github.com/user-attachments/assets/89a530fa-3a32-4758-9ea5-9cd0caea45e1" />

<img width="1918" height="903" alt="image" src="https://github.com/user-attachments/assets/7761afd7-8813-4ba4-a6fe-0e34b28689e8" />

---

### 3. 날씨 상세 페이지

- 선택한 지역의 상세 날씨 정보 제공
  - 현재 기온
  - 당일 최저 / 최고 기온
  - 시간대별 기온 정보
- 홈 / 검색 / 즐겨찾기 페이지에서 공통으로 접근 가능

**UI 예시**  
<img width="1869" height="901" alt="image" src="https://github.com/user-attachments/assets/36bd7d93-4c98-4d2e-b3aa-126943a58b8b" />


---

### 4. 즐겨찾기 기능

- 검색한 장소를 즐겨찾기에 추가 / 삭제 가능
- 즐겨찾기는 최대 **6개까지 등록 가능**
- 카드 UI 형태로 즐겨찾기 리스트 구성
- 즐겨찾기 카드에 다음 정보 표시
  - 장소 이름
  - 현재 기온
  - 당일 최저 / 최고 기온
- 즐겨찾기 카드 클릭 시 해당 장소의 상세 페이지로 이동
- 즐겨찾기 장소의 **별칭 수정 기능** 제공

**UI 예시**  
<img width="1860" height="900" alt="image" src="https://github.com/user-attachments/assets/4802f9f2-77c7-4bb5-bb63-ad6b57c36268" />
<img width="1871" height="894" alt="image" src="https://github.com/user-attachments/assets/15085f26-b3b4-4458-9eb1-cd1877b017f1" />

---

## 🧩 기술적 의사결정

### 1. Feature-Sliced Design (FSD) 적용

- 기능 단위로 관심사를 분리하여 폴더 구조를 구성
- `pages / widgets / features / entities / shared` 레이어로 역할을 명확히 분리
- UI와 비즈니스 로직을 분리해 유지보수성과 재사용성 향상

### 2. TanStack Query를 사용한 서버 상태 관리

- 날씨 API 호출 결과를 서버 상태로 분리해 관리
- 로딩 / 에러 / 성공 상태를 명확히 표현
- 동일한 날씨 데이터를 여러 화면에서 재사용할 수 있도록 구성

### 3. 즐겨찾기 상태 관리에 Zustand 사용

- 즐겨찾기 목록과 별칭 정보가 여러 페이지에서 공유됨
- 전역 상태 관리가 필요하다고 판단하여 Zustand 도입
- 단순한 상태 구조로 데이터 흐름을 직관적으로 유지

### 4. UI 컴포넌트 분리 전략

- 날씨 정보 UI는 여러 페이지에서 사용되므로 공통 컴포넌트로 분리
- 화면별 책임을 명확히 나누어 가독성과 확장성 고려
- Tailwind CSS를 활용해 디자인 일관성 유지

### 5. shadcn/ui를 사용한 UI 구성

- Button, Input, Dialog 등 기본 UI 컴포넌트의 **접근성과 기본 동작을 빠르게 확보**하기 위해 shadcn/ui를 사용했습니다.
- shadcn/ui는 라이브러리 형태가 아닌, **프로젝트 내부에 컴포넌트 코드가 직접 포함되는 구조**로 제공되어
  디자인 요구사항에 맞게 Tailwind 기반 커스터마이징이 용이하다고 판단했습니다.
- 공통 UI 요소를 일관된 인터페이스로 재사용할 수 있어
  개발 생산성과 유지보수성을 함께 고려할 수 있었습니다.
- 외부 스타일 의존도가 낮아, 과제 이후에도 UI 수정이나 기능 확장이 필요한 경우
  코드 레벨에서 직접 제어 가능하다는 점을 장점으로 고려했습니다.
  
---

## 📱 반응형 대응

- 데스크탑 / 모바일 환경 모두 고려하여 UI 구성
- Tailwind의 반응형 유틸리티를 활용해 화면 크기별 레이아웃 조정

---

## 📂 폴더 구조

```txt
src/
 ┣ pages/
 ┣ widgets/
 ┣ features/
 ┣ entities/
 ┣ shared/
 ┗ app/
```

