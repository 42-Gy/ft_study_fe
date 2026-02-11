// mockApi.js

// 설정된 시나리오:
// 사용자는 열심히 출석해서 수박씨를 모았고, 
// 사물함을 연장하기 위해 연장권을 샀으며, 과거엔 이사도 한 번 했습니다.

const MOCK_DATA = {
  user: {
    name: "안수박",
    email: "subak@student.42gy.kr",
    role: "Cadet",
    // 현재 보유 수박씨 (계산: 초기 0 + 출석들 - 구매들)
    coin: 1200, 
    rentals: [
      {
        locker: 2055,
        area: "섹션 1 - 1클러스터 앞", 
        // 연장권을 써서 날짜가 늘어난 상태라고 가정
        status: "active", 
        startDate: "2026-01-20",
        endDate: "2026-02-23" // 기본 31일 + 연장 3일
      }
    ]
  },
  // 아이템 기록 (구매/획득/사용 내역)
  items: [
    { 
      id: 1, 
      name: "연장권 (3일)", 
      date: "2026-02-02", 
      status: "사용 완료",
      desc: "대여 기간 3일 연장"
    },
    { 
      id: 2, 
      name: "연장권 (3일)", 
      date: "2026-02-02", 
      status: "보유중", // 샀는데 아직 안 씀
      desc: "최대 보유 5개 가능"
    },
    { 
      id: 3, 
      name: "이사권", 
      date: "2026-01-20", 
      status: "사용 완료",
      desc: "반납일 유지, 위치 변경"
    },
    { 
      id: 4, 
      name: "대여권 (31일)", 
      date: "2026-01-20", 
      status: "사용 완료",
      desc: "기본 대여 시작"
    }
  ],
  // 수박씨(코인) 내역 (출석 +100 / 구매 -N)
  coins: [
    { id: 1, detail: "연장권 구매", amount: -400, date: "2026-02-02" },
    { id: 2, detail: "연장권 구매", amount: -400, date: "2026-02-02" },
    { id: 3, detail: "출석 체크", amount: 100, date: "2026-02-02" },
    { id: 4, detail: "출석 체크", amount: 100, date: "2026-02-01" },
    { id: 5, detail: "출석 체크", amount: 100, date: "2026-01-31" },
    { id: 6, detail: "이사권 구매", amount: -1000, date: "2026-01-20" },
    { id: 7, detail: "출석 체크", amount: 100, date: "2026-01-20" },
  ]
};

export const MockApi = {
  getUsersMe: ({ token }) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!token) {
          reject(new Error("토큰이 입력되지 않았습니다."));
          return;
        }
        if (token === "Bearer error") {
           reject(new Error("유효하지 않은 토큰입니다. (401)"));
           return;
        }
        resolve(MOCK_DATA);
      }, 500);
    });
  }
};