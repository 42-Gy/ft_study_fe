(function attachMockApi(global) {
  const MOCK_DB = {
    me: {
      success: true,
      status: 200,
      message: "Success",
      data: {
        userId: 42,
        name: "gdhong",
        email: "gdhong@student.42gyeongsan.kr",
        coin: 1500,
        role: "USER",
        penaltyDays: 0,
        monthlyLogtime: 120,
        lentCabinetId: 1004,
        visibleNum: 1004,
        section: "Oasis",
        autoExtensionEnabled: true,
        lentStartedAt: "03월 01일 12:00",
        expiredAt: "04월 01일 12:00",
        overdueDays: 3, // 연체 중이 아니면 null
        previousPassword: "1234",
        myItems: [
          {
            itemHistoryId: 1,
            itemName: "extension",
            itemType: "EXTENSION",
            purchaseAt: "2024-03-10T15:30:00",
          },
        ],
        coinHistories: [
          {
            date: "2024-03-15",
            amount: -1000,
            type: "SPEND",
            reason: "Extension Ticket",
          },
          {
            date: "2024-03-01",
            amount: 100,
            type: "EARN",
            reason: "출석 보상",
          },
        ],
        itemHistories: [
          {
            date: "2024-03-10",
            itemName: "extension",
            itemType: "EXTENSION",
            status: "UNUSED",
            usedAt: null,
          },
          {
            date: "2024-03-20",
            itemName: "move",
            itemType: "MOVE",
            status: "USED",
            usedAt: "2024-03-21T10:00:00",
          },
        ],
      },
      timestamp: "2024-03-15T14:00:00",
    },
  };

  function sleep(ms) {
    return new Promise((r) => setTimeout(r, ms));
  }

  // GET /v4/users/me
  // Authorization: Bearer {token}
  async function getUsersMe({ token } = {}) {
    await sleep(500);

    // 토큰 없으면 401
    if (!token || !token.startsWith("Bearer ")) {
      const err = new Error("UNAUTHORIZED");
      err.status = 401;
      err.code = "UNAUTHORIZED";
      err.message = "유효한 액세스 토큰이 필요합니다.";
      throw err;
    }

    // 특정 토큰 문자열이면 404
    if (token.includes("notfound")) {
      const err = new Error("USER_NOT_FOUND");
      err.status = 404;
      err.code = "USER_NOT_FOUND";
      err.message = "유저 정보를 찾을 수 없습니다.";
      throw err;
    }

    // 성공
    return structuredClone(MOCK_DB.me);
  }

  global.MockApi = {
    getUsersMe,
  };
})(window);
